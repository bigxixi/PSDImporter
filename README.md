![banner](https://raw.githubusercontent.com/bigxixi/PSDImporter/master/assets/banner.png)  
 ## PSD Importer
默认情况下，如果一个 PSD 文件存在一个或多个画板，在导入 AE 的时候画板区域是不会被裁切的，需要手工处理，不是很方便。
这个扩展可以在导入 PSD 文件的同时自动识别画板并裁切为对应宽高的合成。

![操作演示](https://raw.githubusercontent.com/bigxixi/PSDImporter/master/assets/intro.gif)  

操作演示  

 ## 如何安装
1. 下载 `PSDImporter.zxp` 文件，[`在这里右键 - 链接另存为`](https://raw.githubusercontent.com/bigxixi/PSDImporter/master/PSDImporter.zxp).</br>
2. 根据自己的操作系统下载 ZXP 安装工具：  
https://aescripts.com/learn/zxp-installer/  
然后将 `PSDImporter.zxp` 拖进安装工具（或者通过 File -> Open 选择该文件安装）  

 ## 使用步骤：
1、在「窗口」-「扩展」中运行「PSDImporter」。  
2、点击「点击打开PSD文件」，并打开需要导入的 PSD 文件。  
3、Enjoy。

 ## 制作思路
 利用 [PSD.js](https://raw.githubusercontent.com/bigxixi/PSDImporter/master/assets/intro.gif) 读取画板的宽高、坐标数据，然后通过 AE 脚本导入对应的 PSD 文件并计算和裁切对应合成，感兴趣可以看下代码的实现。

 ## Donation - 求打赏:
如果您觉得本插件好用，欢迎打赏，感谢您的支持！  

[<img src="https://raw.githubusercontent.com/bigxixi/bigxixi.github.io/master/donate/index.hyperesources/wechat.png" width="30%" height="30%">](http://bigxixi.com/donate/index.html)
[<img src="https://raw.githubusercontent.com/bigxixi/bigxixi.github.io/master/donate/index.hyperesources/alipay%402x.jpg" width="30%" height="30%">](http://bigxixi.com/donate/index.html)  

也欢迎使用 PayPal：  

[<img src="https://raw.githubusercontent.com/bigxixi/bigxixi.github.io/master/donate/index.hyperesources/paypal.png" width="30%" height="30%">](https://www.paypal.me/bigxixi/)  
