
#include "../js/json2.js"

var os = $.os.toLowerCase().indexOf('mac') >= 0 ? "mac": "win",
thisFile = new File($.fileName),
osSlash = os=="mac" ? "/": "\\",
desktop = File(File("~").fsName + osSlash + "Desktop" + osSlash).fsName;

function getPSDPath(){
    var lastPath = checkSettings("PSDImporter","PSDPath");
    if(lastPath==false){
        lastPath = desktop;
    }
    var psdFile = new File(lastPath);
    var curPSD = psdFile.openDlg("选择一个psd文件","Photoshop:*.psd;");
    var curPSDPath = curPSD.fsName;
    var ext = curPSDPath.substring(curPSDPath.lastIndexOf("."),curPSDPath.length).toLowerCase();
    if(ext!= ".psd"){
        alert("请选择正确的psd文件");
        return "0";
    }else{
        saveSettings("PSDImporter","PSDPath",curPSDPath);
        return curPSDPath;
    }
}

function getPath(path){
    var tempFile = new File(path);
    var theLocation = tempFile.saveDlg("选择文件保存地址");
    if(theLocation != null){
        return decodeURIComponent(theLocation.fsName);
    }else{
        return null;
    }
}

function checkAccess(){
    return app.preferences.getPrefAsLong("Main Pref Section", "Pref_SCRIPTING_FILE_NETWORK_SECURITY");
}

function checkSettings(v1,v2){
    if(app.settings.haveSetting(v1,v2)){
        return decodeURIComponent(app.settings.getSetting(v1,v2));
    }else{
        return false;
    }
}

function saveSettings(v1,v2,v3){
    app.settings.saveSetting(v1,v2,encodeURIComponent(v3));
}

function savePNGsequence(lcs){
    var temp = savePNG(app.project.activeItem,lcs);
    return temp;
}

function newFolder(location){
    var tempFolder = new Folder(location);
        tempFolder.create();
}

function fileExist(path){
    var tempFile = new File(path);
    return tempFile.exists;
}
function genNoteAlert(al){
    alert(al,"PSD Importer");
}
function importPSDandSplit(path,abg){
    var item = importPSD(path);
    app.beginUndoGroup("split");
    abg = JSON.parse(abg);
    for(var i=0;i<abg.length;i++){
        if(abg[i]!=""){
            corpComp(item.layer(i+1),
            abg[i].coords.top,
            abg[i].coords.left,
            abg[i].coords.right,
            abg[i].coords.bottom)
        }
    }
    app.endUndoGroup();
}
function importPSD(path){
    app.beginUndoGroup("import");
    var io = new ImportOptions(new File(path));
    if (io.canImportAs(ImportAsType.COMP_CROPPED_LAYERS)) {
        io.importAs = ImportAsType.COMP_CROPPED_LAYERS;
    }
    var psdIn = app.project.importFile(io);
        psdIn.openInViewer();
    app.endUndoGroup();
    return psdIn;
}
function corpComp(comp,top,left,right,bottom){
    var compSource = comp.source;
    if(compSource instanceof CompItem){
        var tempComp = app.project.items.addComp("corpRegion", (right-left), (bottom-top), 1,1, 25);
        var corp = compSource.layers.add(tempComp);
            corp.transform.position.setValue([(right+left)/2,(bottom+top)/2]);
        for(var i=0;i<compSource.layers.length;i++){
            if(compSource.layer(i+1).index!=corp.index){
                compSource.layer(i+1).parent = corp;
            }
        }
        compSource.width = corp.width;
        compSource.height = corp.height;
        comp.transform.position.setValue([(right+left)/2,(bottom+top)/2]);
        corp.transform.position.setValue([corp.width/2,corp.height/2]);
        corp.remove();
        tempComp.remove();
    }else{
        alert("画板没有导入为合成，有问题！");
    }
}