---
title: 系统修复之后重装
date: 2022-12-8
tags:
 - 教程
categories:
 - 教程
sidebar: 'auto'
---
## 1.  node 环境变量消失

### 1.1 配置安装根目录

 ![image-20231203143943186](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20231203143943186.png)
**视为安装成功：**
![image.png](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/1665908400357-18cf04fb-b870-4a9f-890b-ba3ee53cf034.png)

### 1.2 查看全局安装路径
```powershell
npm root -g
```
 ![image.png](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/1665909631012-f9d1a300-0fd3-48cd-87c3-b81e83a5e1a9.png)
### 1.3 全局下载安装包路径
 ![image.png](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/1665915777306-0c23e24b-7194-41d6-926c-555105999404.png)
> 用来告诉系统，下载的模块或者包都在该路径下了。
> 测试下载，可看到安装在该路径下即可。

## 1.0 使用nvm管理node版本

正常下载nvm，手动安装。

到设置node路径时，设置为你原本安装好的nodeJs路径下。弹出管理该版本的弹窗。

设置环境变量。将包依赖的位置更改。

[(66条消息) 安装nvm下载node，npm以及配置的全过程。解析npm下载包使用 -v指令 发现下载的包不存在的原因。_QAQshift的博客-CSDN博客](https://blog.csdn.net/o_0ava0_o/article/details/116025980#:~:text=输入以下两个指令 npm config set prefix "D%3Anvmnodejsnode_modulesnode_global",此指令表示npm下载的依赖包，将会放在node_global文件下 C%3AUsers86153>npm config set cache "D%3Anvmnodejsnode_modulesnode_cache")

node安装包：[下载 | Node.js 中文网 (nodejs.cn)](https://nodejs.cn/download/)

[nvm安装使用详解，以及gnvm简单介绍 - 掘金 (juejin.cn)](https://juejin.cn/post/7246416857309855801#heading-8)

## 2. java安装

参考链接 
### 2.1 下载
参考连接：
下载安装包如图：
![image.png](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/1665926228818-b2ad037b-0b7f-451d-b12b-a91ca79d178e.png)

默认路径安装：

![image-20231203144520929](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20231203144520929.png)
安装成功：
<img src="https://cdn.nlark.com/yuque/0/2022/png/32615238/1665926288311-63ca2ac0-585f-4b6c-8b99-20e0fbebb34e.png#averageHue=%23a5814d&clientId=uf1ace7c5-74a8-4&crop=0&crop=0&crop=1&crop=1&errorMessage=unknown error&from=paste&height=167&id=u0449b9b5&margin=[object Object]&name=image.png&originHeight=209&originWidth=708&originalType=binary&ratio=1&rotation=0&showTitle=false&size=24134&status=error&style=none&taskId=u5ccb5698-9d98-4b77-936d-415e25fccf8&title=&width=566.4" alt="image.png" style="zoom:67%;" />

### 2.2 环境配置
![image.png](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/1665923987287-15923645-eb94-4635-bbfb-4838b346ff88.png)
![image.png](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/1665924009549-68b13633-dc77-46d3-a211-2575d12aba41.png)

## 3. idea和webstorm
### 3.1 配置git

> 打开idea和webstorm变为：
>
>  ![image.png](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/1665927755320-134e9be5-f9e6-4fe9-bcf5-656edf3a6cde.png)
>
> 在git上补充：
>
>  ![image.png](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/1665927816963-9710b864-18fb-4a15-84f6-fe4ab215b091.png)

 

### 3.2 环境变量

 ![image.png](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/1665927923701-6ff54365-ca59-4a06-9f90-d10a33529c70.png)
## 4. OneNote重新下载
参考：下载 OfficeSetUp.exe  
直接点击运行即可 出现：
![image.png](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/1666018308692-4d7454dd-4015-4ae1-9321-78ddce72cf30.png)
应该是OneNote2016版本吧。
## 5. MySQL重装
从 Mysql [官网](https://dev.mysql.com/downloads/installer/)下载 mysql 或者 [点击此处下载各种版本的mysql](https://downloads.mysql.com/archives/installer/)
 ![图片.png](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/1667579118235-43b6ad1a-9274-438b-9b57-d24ef686c2a8.png) ![图片.png](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/1667579154172-d8a47e6f-98e8-40e1-932f-3a73cc0829fb.png)
非关键步骤参考 

### 5.1 关键步骤：
![image.png](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/1666018847648-1a687185-766b-44a7-8c5d-5766cd5a566e.png)
![image.png](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/1666019746920-15d93e0f-db23-45d5-87b8-e1eeda72a186.png)
![image.png](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/1666019857226-170cba5b-d9d1-4fe4-b356-ae22dee89bd4.png)

> 进度条之后让你下载c++
> 参考：Microsoft Visual C++ Redistributable 2019
> x86: [https://aka.ms/vs/16/release/VC_redist.x86.exe](https://aka.ms/vs/16/release/VC_redist.x86.exe)
> x64: [https://aka.ms/vs/16/release/VC_redist.x64.exe](https://aka.ms/vs/16/release/VC_redist.x64.exe)

![image.png](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/1666021098769-58e6cd61-5b3b-421d-8b1b-b418c294c72a.png)
![image.png](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/1666021191190-d0242e00-0b2b-4420-a941-bdfe06ac6fae.png)
![image.png](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/1666021316157-4ad120a6-9f1a-41ad-ba83-5ce10e28be0c.png)
![image.png](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/1666021359798-debf9d5b-7a6a-4090-bf3f-919c8266ab4a.png)

### 5.2 环境变量意思一下
 ![image.png](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/1666021505801-e41352ad-f1f0-4535-a68d-2c898c293987.png)
## 6. navicat安装
### 6.1 在qq文件里面找到之前邓老师的安装包，进行安装即可
![image.png](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/1666068262728-9db9861e-a749-4411-800c-998dcb9fda71.png)
第一个文件是破解，第二个是安装包。

> 1. 先安装，然后打开“激活”
> 2. 再点击破解
> 
![image.png](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/1666090689884-778db89c-6013-4a18-88eb-eab7efcf3b87.png)


## 7. tomcat
### 7.1 尝试添加环境变量
![image.png](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/1666091051468-f7e627e1-b54b-47fd-abb0-b252d9214950.png)
### 7.2 开启tomcat服务
注意先不要关闭
![image.png](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/1666091260372-91f170fa-6aa7-457e-9122-efaf7731c9c3.png)
访问端口8080，视为成功：
![image.png](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/1666091369720-f0455ef8-6334-42cd-adf2-b96c876552b2.png)
