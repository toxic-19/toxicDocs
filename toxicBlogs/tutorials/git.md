---
title: git
date: 2022-12-8
tags:
 - 教程
categories:
 - 教程
sidebar: 'auto'
---
## 1. 下载git

### [点击淘宝镜像下载](https://npm.taobao.org/mirrors/git-for-windows/)  
### [2022-4-24日最新下载](https://registry.npmmirror.com/binary.html?path=git-for-windows/v2.36.0.windows.1/)
![git最新安装包](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/downloads.png)  
注意：最新安装包截图来源：[【git官网下载】](https://git-scm.com/download/win) 审查元素

## 2. 使用 Git 管理项目
### 本地管理
 ![Git.png](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/Git.png)
#### 1. 解决git使用commit命令后显示Author identity unknown
打开Git Bash 
```
Toxic@LAPTOP-1AN9SJJM MINGW32 ~ (main)
$ git config --global user.email "3468528598@qq.com"

Toxic@LAPTOP-1AN9SJJM MINGW32 ~ (main)
$ git config --global user.name "toxic"
```
#### 2. 解决切换根目录打开终端无法解析git
打开Git CMD切换到uniapp目录下
```
1. 切换到D盘  
> C:\Users\知著>D:

2. cd 目录 输入要切换的目录  
> D:\>cd D:\Visual Studio Code\HBuilderProjects\uni_shop  

3. 成功
> D:\Visual Studio Code\HBuilderProjects\uni_shop>
```

1.成功打开后 初始化本地 Git 仓库, 并检查文件状态:  
``D:\Visual Studio Code\HBuilderProjects\uni_shop>git init``  
``D:\Visual Studio Code\HBuilderProjects\uni_shop>git status``  
![文件状态](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/status.png)

2.将所有文件都加入到暂存区，再次检查，所有文件变绿即可：  
``D:\Visual Studio Code\HBuilderProjects\uni_shop>git add .``

3.本地提交更新并再次检查：  
`D:\Visual Studio Code\HBuilderProjects\uni_shop>git commit -m "init project"`  
![commit.png](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/commit.png)  
``D:\Visual Studio Code\HBuilderProjects\uni_shop>git status``  
![img_2.png](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/status1.png)

### 把项目托管到码云
#### [点击查看生成并配置 SSH 公钥](https://gitee.com/help/articles/4181)
1. 打开 Git Bash  
输入：ssh-keygen -t ed25519 -C "xxxxx@xxxxx.com"  
![生成公钥.png](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/ssh.png)
2. 如果存在该目录，表明之前生成果SSH Key，利用`ll`命令即可以查看  
![查看公钥生成的目录.png](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/ll%E6%9F%A5%E7%9C%8B.png)  
3. 成功添加公钥
![SSH.png](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/SSH1.png)
4. 验证 打开Git Bash 输入：`$ ssh -t git@gitee.com`  
后面再输入 yes 出现successfully 即是成功添加
```shell
Toxic@LAPTOP-1AN9SJJM MINGW32 ~/.ssh (main)
$ ssh -t git@gitee.com
The authenticity of host 'gitee.com (180.97.125.228)' can't be established.
ED25519 key fingerprint is SHA256:+ULzij2u99B9eWYFTw1Q4ErYG/aepHLbu96PAUCoV88.
This key is not known by any other names
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Warning: Permanently added 'gitee.com' (ED25519) to the list of known hosts.
Hi 姜糖! You've successfully authenticated, but GITEE.COM does not provide shell access.
Connection to gitee.com closed.
```
5. 将代码导入GitHub仓库中
```shell
git remote add origin git@gitee.com:zhizhu_wlz/uni_shop.git   本地仓库和码云仓库做了关联
git push -u origin "master"   把本地仓库的代码push到码云上
```
注意：“master”改成了"main" (安装Git的时候就设置了main)
<img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/push1.png" alt="push.png" style="zoom:80%;" />



## 3. tabBar
### 使用git创建tabBar子分支
**注意：使用Git CMD**  
创建tabBar分支命令： `git checkout -b tabbar`  
查看分支命令：`git branch`  
输出：一一对应

```shell
Switched to a new branch 'tabbar'
main
* tabbar  
# *号表示当前所处分支
```
### 将本地tabBar分支进行本地提交  
`git add .`  
`git commit -m "完成tabBar的开发"`
```shell
D:\Visual Studio Code\HBuilderProjects\uni_shop>git add .
D:\Visual Studio Code\HBuilderProjects\uni_shop>git commit -m "完成tabBar的开发"
[tabbar eb41feb] 完成了tabBar的开发
20 files changed, 148 insertions(+), 31 deletions(-)
```
### 将本地tabBar推送到GitHub远程仓库  
`git push -u origin tabbar`  
```shell
D:\Visual Studio Code\HBuilderProjects\uni_shop>git push -u origin tabbar
Enumerating objects: 33, done.
Counting objects: 100% (33/33), done.
Delta compression using up to 12 threads
Compressing objects: 100% (25/25), done.
Writing objects: 100% (29/29), 49.68 KiB | 1.27 MiB/s, done.
Total 29 (delta 5), reused 0 (delta 0), pack-reused 0
remote: Powered by GITEE.COM [GNK-6.3]
remote: Create a pull request for 'tabbar' on Gitee by visiting:
remote:     https://gitee.com/zhizhu_wlz/uni_shop/pull/new/zhizhu_wlz:tabbar...zhizhu_wlz:main
To gitee.com:zhizhu_wlz/uni_shop.git
 * [new branch]      tabbar -> tabbar
branch 'tabbar' set up to track 'origin/tabbar'.
```
### 将本地的 tabbar 分支合并到本地的 master 分支  
`git checkout master`  
`git merge tabbar`  
```shell
# 可以先Git branch 查看现在是处于哪一个分支
# 再切换到主分支
D:\Visual Studio Code\HBuilderProjects\uni_shop>git checkout main
Switched to branch 'main'
Your branch is up to date with 'origin/main'.
```
```shell
# 实现本地tabBar合并到main分支里面
D:\Visual Studio Code\HBuilderProjects\uni_shop>git merge tabbar
Updating fe2a746..eb41feb
Fast-forward
 index.html                       |  14 -------
 pages.json                       |  85 ++++++++++++++++++++++++++++++++-------
 pages/cart/cart.vue              |  19 +++++++++
 pages/cate/cate.vue              |  19 +++++++++
 pages/home/home.vue              |  19 +++++++++
 pages/my/my.vue                  |  19 +++++++++
 static/cart_border@2x.png        | Bin 0 -> 2758 bytes
 static/my-icons/icon1.png        | Bin 0 -> 1889 bytes
 static/my-icons/icon2.png        | Bin 0 -> 1825 bytes
 static/my-icons/icon3.png        | Bin 0 -> 2027 bytes
 static/my-icons/icon4.png        | Bin 0 -> 1469 bytes
 static/tab_icons/cart-active.png | Bin 0 -> 2195 bytes
 static/tab_icons/cart.png        | Bin 0 -> 2873 bytes
 static/tab_icons/cate-active.png | Bin 0 -> 3330 bytes
 static/tab_icons/cate.png        | Bin 0 -> 4219 bytes
 static/tab_icons/home-active.png | Bin 0 -> 2210 bytes
 static/tab_icons/home.png        | Bin 0 -> 3305 bytes
 static/tab_icons/my-active.png   | Bin 0 -> 2691 bytes
 static/tab_icons/my.png          | Bin 0 -> 3997 bytes
 static/uni.ttf                   | Bin 0 -> 26164 bytes
 20 files changed, 146 insertions(+), 29 deletions(-)
```
### 合并后再将main分支push到GitHub上  `git push`
```shell
D:\Visual Studio Code\HBuilderProjects\uni_shop>git checkout main
Already on 'main'
Your branch is ahead of 'origin/main' by 1 commit.
  (use "git push" to publish your local commits)

D:\Visual Studio Code\HBuilderProjects\uni_shop>git push
Total 0 (delta 0), reused 0 (delta 0), pack-reused 0
remote: Powered by GITEE.COM [GNK-6.3]
To gitee.com:zhizhu_wlz/uni_shop.git
   fe2a746..eb41feb  main -> main
```
### 删除本地的 tabbar 分支：
```shell
D:\Visual Studio Code\HBuilderProjects\uni_shop>git branch
* main
  tabbar

D:\Visual Studio Code\HBuilderProjects\uni_shop>git branch -d tabbar
Deleted branch tabbar (was eb41feb).
```

## 4. home
### 创建 home 分支
```shell
D:\Visual Studio Code\HBuilderProjects\uni_shop>git checkout -b home
Switched to a new branch 'home'

D:\Visual Studio Code\HBuilderProjects\uni_shop>git branch
* home
  main
```

## 5. git下载项目
### clone-->选择http下面的网址-->打开Git Bash
```shell
$ git clone https网址
```
 <img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/download.png" alt="img_1.png" style="zoom:80%;" />
### 修改默认下载目录
```shell
# 以下目录是我要修改到这里的目录
$ cd D:\git_project 
$ git init
```



## 6. 查漏补缺『230116』

### 6.1 创建版本库

1. 因不知名原因，`Git Bash` 不再在右键管理中出现。默认目录是：`c/Users/用户名`

 <img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230116233651964.png" alt="image-20230116233651964" style="zoom:80%;" />

所以进入某一目录常用命令：使用`D:/git_project/newGit-study`目录进行测试；

:small_red_triangle: `git cmd` 和 `git bash` 的区别： ？

 <img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230117002334116.png" alt="image-20230117002334116" style="zoom:80%;" />

:small_red_triangle: 记住修改目录时是和`cmd`一致的。原本在`c`盘，要先改到`d`盘，才可以找到。

 <img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230117003927433.png" alt="image-20230117003927433" style="zoom:80%;" />

2. 初始化仓库 `git init`

```sh
Toxic@LAPTOP-1AN9SJJM MINGW32 /d/git_project/newGit-Study
$ git init # 初始化本地git仓库:输入的命令行
Initialized empty Git repository in D:/git_project/newGit-Study/.git/
```

结果：在该目录下生成 `.git` 文件夹： `objects`文件夹和`refs`文件夹是空的。git用来跟踪管理版本库的。

 <img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230117004417809.png" alt="image-20230117004417809" style="zoom:80%;" />

 <img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230117141847178.png" alt="image-20230117141847178" style="zoom:77%;" />



3. 查看状态 `git status`

```sh
Toxic@LAPTOP-1AN9SJJM MINGW32 /d/git_project/newGit-Study (master)
$ git status # 输入该命令行
On branch master  # 回应：处于master分支

No commits yet    # 暂存区还没有文件

nothing to commit (create/copy files and use "git add" to track)   # 工作区没有东西可以被commit到暂存区 后有提示
```

4. 添加到本地暂存区：` git add` `git commit`

:repeat_one:   查看当前目录下的文件：`ls` `dir`

 <img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230117012958277.png" alt="image-20230117012958277" style="zoom:80%;" />

:repeat_one:   把文件添加到本地仓库『`.git`』

:one: 在添加到仓库之前可以 查看当前仓库的 状态。可以看到有哪些文件 `Untracked`  『未被追踪的』

『后面测试的，顺序有点不对。主要是为了说明修改保存文件之后的状态：红色指的是还没被添加』

 <img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230117014730443.png" alt="image-20230117014730443" style="zoom:80%;" />

:two:` git add` ：将修改后的文件放入待提交状态。

```sh
$ git add . # 将目录下所有文件都添加到仓库，注意后面要加 .
$ git add fileName # 添加目录下的某几个文件  add多个文件的时候，要使用空格隔开
```

 <img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230117013544276.png" alt="image-20230117013544276" style="zoom:80%;" />

:three:  在添加完文件之后，再测试 `git status` :

 <img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230117014953293.png" alt="image-20230117014953293" style="zoom:80%;" />



> 总结一下，git add用于将修改行为放入待提交状态
>
> git commit用于将待提交修改正式提交入git
>
> git status用于检查是否有未提交的修改，是否有未放入待提交状态的修改以及，哪些文件被修改了



:repeat_one: 把文件提交到本地仓库 『 `git commit `』

```sh
$ git commit -m "description" 
```

 <img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230117013954443.png" alt="image-20230117013954443" style="zoom:80%;" />



### 6.2 本地仓库—时光回溯

#### 6.2.1 版本回退 

**`git reset --hard <commit id>`**

1. 修改了`readme.md` 查看一下状态：新添加的`hello.html`还没`commit`，修改的`readme.md`还未`add` ，`commit`

 ![image-20230117020222293](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230117020222293.png)

我们希望不止是看到这个文件被修改，我们还希望看到具体修改了什么内容。



2. 使用 `git diff`：查看difference ; 再将其放入待提交状态。再查看状态。

   **红色文件**：未放入待提交状态的『没有执行`git add`』； **绿色文件** ：未将待提交状态的文件提交到git本地仓库中。

 <img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230117020800039.png" alt="image-20230117020800039" style="zoom:65%;" /><img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230117021102686.png" alt="image-20230117021102686" style="zoom:70%;" />



3. 查看`commit`的历史记录  `git log`。 目前我们就提交了一次。还有上面的待提交状态。

   我们先看一下是怎么样的。再将待提交状态的文件提交到git本地仓库的master分支上。

 <img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230117022740882.png" alt="image-20230117022740882" style="zoom:80%;" /><img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230117022922857.png" alt="image-20230117022922857" style="zoom:70%;" />
再  	查看一次历史记录：应该出现两个记录。有简便的历史记录查看 `git log --pretty=oneline` 『之前不起效果，maybe我打错了』

 <img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230117023342026.png" alt="image-20230117023342026" style="zoom:70%;" /><img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230117211303314.png" alt="image-20230117211303314" style="zoom:67%;" />

> 历史记录从上往下：是时间上从近到远。有具体的Date



4. 现在我们尝试回退到上一个版本。`git reset --hard HEAD^`

  `HEAD`表示当前版本，`HEAD^`表示上一个版本，`HEAD^^`表示上上个版本。前第10个版本：`HEAD~10`

```sh
$ git reset --hard HEAD^
HEAD is now at 48a2eb8 提交readme文件和创建learnGit文件夹
```

​     现在git log查看的历史记录又是只有一项了。

 <img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230117120106623.png" alt="image-20230117120106623" style="zoom:80%;" />



5. 现在我们又想找回刚刚被回退掉的记录。前提：`commit id`

   在之前找到两个历史记录的时候，其 commit id 是 `9bc98` 开头。

```sh
# 回到未来的某个版本【commit id来确定版本】
Toxic@LAPTOP-1AN9SJJM MINGW32 /d/git_project/newGit-Study (master)
$ git reset --hard 9bc98     # 输入命令行，回到以9bc98开头的版本
HEAD is now at 9bc98cd 新建hello.html文件，修改readme文件
```

​      历史记录又变为原来的两个了。



6. 那如果之前并没有查找过历史记录，那自然是不知道 commit id 的，那应该如何回到未来的某个版本呢。

   使用 `git reflog` 可以记录你的每一次命令：

 ![image-20230117131838821](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230117131838821.png)

> 可以在你执行过的命令里看到每一次提交commit，即在这里可以获取到你要回到的版本 commit id 的前几位。当然这已经够使用。



#### 6.2.2 版本管理

1. **管理修改**：在暂存区中，相同文件的修改会被覆盖。

> 测试：目前暂存区应该是清空的。使用 `git status `查看一下
>
> 修改：在index.html中添加一行。目前状态是：`modified:   learnGit/hello.html  ` 

```sh
Toxic@LAPTOP-1AN9SJJM MINGW32 /d/git_project/newGit-Study (master)
$ git status
On branch master                                                           # 目前所处的分支master
nothing to commit, working tree clean                                      # 工作树是干净的，没有修改的文件

Toxic@LAPTOP-1AN9SJJM MINGW32 /d/git_project/newGit-Study (master)
$ git status
On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   learnGit/hello.html                                    # 被修改的文件名

no changes added to commit (use "git add" and/or "git commit -a")

Toxic@LAPTOP-1AN9SJJM MINGW32 /d/git_project/newGit-Study (master)
$ git diff
diff --git a/learnGit/hello.html b/learnGit/hello.html
index 82cbe8a..f634043 100644
--- a/learnGit/hello.html
+++ b/learnGit/hello.html
@@ -8,5 +8,6 @@
 </head>
 <body>
     <h1>hello world</h1>
+    <h2>第一次修改,添加到暂存区,暂不提交</h2>                                   # 修改的具体内容
 </body>
 </html>
\ No newline at end of file
```

> 添加到暂存区；再进行一次修改。
>
>  <img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230117150758995.png" alt="image-20230117150758995" style="zoom:77%;" />
>
> **流程**：第一次修改 ==> 添加到暂存区 ==> 第二次修改 ==> 提交。最终提交的是第一次修改的内容。
>
> ​           第一次修改 ==> 添加到暂存区 ==> 第二次修改 ==> 添加到暂存区 ==> 提交。最终提交的是两次合并之后的内容。
>
> **注意**：如果没有 git add 添加到暂存区，那么 git commit 也不会添加到仓库分支。



2. **撤销修改**：撤销在工作区的修改；撤销已经提交到暂存区的修改；撤销已经提交到版本库的修改『前提：没有提交到远程仓库』

   :o2: **撤销在工作区的修改**：git diff 可以看到具体修改的内容；git status 可以看到被修改的工作区文件。

    <img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230117160147446.png" alt="image-20230117160147446" style="zoom:70%;" /><img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230117160512769.png" alt="image-20230117160512769" style="zoom:45%;" />

   现在执行命令行 `git checkout -- <fileName>` 可以撤销在工作区对 `<fileName>`文件的修改。

   **`git checkout` 其实是用版本库里的版本替换工作区的版本，无论工作区是修改还是删除，都可以“一键还原”。**

   ```sh
   Toxic@LAPTOP-1AN9SJJM MINGW32 /d/git_project/newGit-Study (master)
   $ git checkout -- learnGit/hello.html                          # 要撤销的工作区文件
   
   Toxic@LAPTOP-1AN9SJJM MINGW32 /d/git_project/newGit-Study (master)
   $ git diff                                                     # 无内容；工作区和暂存区没有差异
   ```

    如右上图：文件已经还原到修改前的样子。

   当然还有另一种情况：某一个文件已经被添加到暂存区，又做了修改。此时还原到的是暂存区的代码状态。

   

   :one: **撤销已经提交到暂存区的修改**

   前提：如下

    <img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230117161256606.png" alt="image-20230117161256606" style="zoom:60%;" /><img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230117161335200.png" alt="image-20230117161335200" style="zoom:77%;" />

   撤销：命令` git reset HEAD <fileName>` 可以把暂存区的修改撤销掉

   ```sh
   Toxic@LAPTOP-1AN9SJJM MINGW32 /d/git_project/newGit-Study (master)
   $ git reset HEAD learnGit/hello.html                            # 将暂存区的 learnGit/hello.html 修改撤销掉
   Unstaged changes after reset:                                   # 撤销成功
   M       learnGit/hello.html
   ```

   查看 `git status` ：工作区有修改，暂存区无。再将工作区的修改撤销掉。

    <img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230117162441541.png" alt="image-20230117162441541" style="zoom:80%;" />

   

   :two: **撤销已经提交到版本库的修改『前提：没有提交到远程仓库』** : 直接使用版本回退 `git reset --hard <commit id>`

   

3.  **删除文件**：已经被commit到本地仓库的文件，希望删除并使工作区和版本库状态一致。

    <img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230117175120104.png" alt="image-20230117175120104" style="zoom:80%;" />

> 在文件管理器中删除。相当于在工作区中进行删除。其实也是一种修改。所以查看状态会出现删除文件的提示信息。
>
>  <img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230117175148224.png" alt="image-20230117175148224" style="zoom:80%;" />
>
> 根据提示：
>
> 1. 使用命令行 `git restore uselessText.txt` , 删除被撤销了。同理` git checkout -- uselessText.txt` 也可以达到。
> 2. 可以不需要在工作区删除；执行 `git rm <fileName>` 删除版本库中的内容，再进行`git commit`。
>
>  <img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230117180144948.png" alt="image-20230117180144948" style="zoom:90%;" />



### 6.3 远程仓库

1. 远程库的名字是 `origin `这是默认的。

2. 把本地库的内容推送到远程，用`git push`命令，实际上是把当前分支`master`推送到远程。

3. 流程：首先要在平台上创建一个仓库。repo SSH：`git@gitee.com:zhizhu_wlz/git.git`

   ​            将本地仓库与远程仓库进行关联：`git remote add origin git@gitee.com:zhizhu_wlz/git.git`

   ​            将本地分支的内容第一次推送到远程分支：`git push -u origin "master"`

   ​            推送命令：`git push origin master`

              查看远程库信息： `git remote -v`

    <img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230117191243144.png" alt="image-20230117191243144" style="zoom:80%;" />



### 6.4 分支管理

#### 6.4.1 创建合并分支

![image-20230117192921534](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230117192921534.png)

链接 [廖雪峰的官方网站——创建与合并分支](https://www.liaoxuefeng.com/wiki/896043488029600/900003767775424) 在这关于master分支和新分支的合并图解很清晰。

1. 创建分支是在 master 指针的位置创建新指针 dev，即dev分支。再将head指向dev指针。此时dev和master都指向最新提交。
2. 在dev分支上进行开发，master还停留在原地。开发结束，进行dev和master的合并。只需要将master指向dev的当前提交。再将head指向master即可。
3. 合并结束后可以删除dev分支，即删除dev指针即可。

```sh
Toxic@LAPTOP-1AN9SJJM MINGW32 /d/git_project/newGit-Study (master)
$ git checkout -b dev                             # 表示创建并切换到dev分支。git branch dev + git checkout dev
Switched to a new branch 'dev'

Toxic@LAPTOP-1AN9SJJM MINGW32 /d/git_project/newGit-Study (dev)
$ git branch                                      # 查看当前项目的分支
* dev                                             # *绿色字体 ：表示这是当前分支
  master
```

 ![image-20230117194437008](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230117194437008.png)

:arrow_up_small:   可以看到其实在 commit 时会显示在哪个分支上。同时也会有commit id的后几位。不知道有没有用

 ![image-20230117194658332](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230117194658332.png)

:arrow_up_small:   切换回master分支：查看刚刚修改的文件，发现没有存dev时修改的内容。master和dev分支是相互独立的。

将dev上的内容合并到master上：`git merge dev`    『**当前分支是master**』合并成功后，查看文件，果然修改出现了。

 ![image-20230117195137968](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230117195137968.png)

**`git merge`命令用于合并指定分支到当前分支。**

:arrow_up_small: 删除当前分支：记住要切换到master分支上，再进行删除。

 <img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230117203222113.png" alt="image-20230117203222113" style="zoom:80%;" />



#### 6.4.2 解决冲突

分别在feature1分支和master分支添加最后一行，但内容不同。均分别进行commit提交到本地分支上。

这种情况可能会出现合并的冲突。

 ![image-20230117204259799](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230117204259799.png)

进行合并命令。产生冲突，git status 也展示了详细的冲突信息。

 <img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230117205219125.png" alt="image-20230117205219125" style="zoom:77%;" />

在产生冲突的文件可以看到：需要手动修改冲突，以下有四个按钮可以点击。随缘选择采用当前更改。冲突就消失了。

 <img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230117205329265.png" alt="image-20230117205329265" style="zoom:80%;" />

再进行提交。使用 `git log --graph` 可以看到分支的合并情况。

 ![image-20230117210247441](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230117210247441.png)

 <img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230117210653683.png" alt="image-20230117210653683" style="zoom:80%;" />



#### 6.4.3 多人协作

- `master`分支是主分支，因此要时刻与远程同步；
- `dev`分支是开发分支，团队所有成员都需要在上面工作，所以也需要与远程同步；

现在在 gitte 远程仓库新建了分支 dev。

**需要在本地创建和远程分支对应的分支：**`git checkout -b branch-name origin/branch-name `



## 7. 命令行总结：

### 7.1 基本命令行：

1. 本地仓库进行：**工作区===>暂存区===>仓库分支**

```sh
# 1. 初始化本地仓库 生成.git
$ git init

# 2. 对该目录下的文件进行增删改查之后 查看该仓库下状态。显示当前分支和修改的文件及提示信息。
$ git status 

# 3. 将修改后的文件添加到 待提交状态。不显示就是添加成功。实际上就是把文件修改添加到暂存区
$ git add .                              # 全部添加
$ git add <file1Name> <file2Name>        # 添加部分

# 4. 将 处于待提交状态 的文件提交到本地仓库。实际上就是把暂存区的所有内容提交到当前分支。
$ git commit -m "description"

# 5. 回退到上一版本|某一版本
$ git reset --hard HEAD^
$ git reset --hard HEAD~n
$ git reset --hard <commit id>

# 6. 撤销修改
$ git checkout -- <fileName>            # 撤销工作区的修改
$ git reset HEAD <fileName>             # 在工作区的修改提交到了暂存区。回退到git commit之前的状态。此时工作区还有修改。
$ git reset --hard <commit id>          # 其中一种。参考5.版本回退。这个修改被提交到了本地仓库分支。

# 7. 删除一个多余的被commit的文件
$ git rm <fileName>                     # 直接删除版本库中的文件
$ git commit -m "description"           # 删除掉该文件之后，应该提交删除的信息。

# 8. 关联远程仓库
$ git remote add origin <ssh repo address>

# 9. 向远程推送本地仓库分支的代码
$ git push -u origin master             # 将当前分支的代码推送到origin的master分支上。

# 10. 创建并切换分支dev
$ git checkout -b dev                   # 创建并切换
$ git switch -c dev                     # 创建并切换分支的另一个命令
$ git branch dev  | $ git checkout dev  # 创建和切换分支是两个命令，切换当然可以使用switch

# 11. 合并某分支dev到当前分支master
$ git merge dev                         # 注意当前要切换到master分支，再进行合并

# 12. 删除开发分支 dev
$ git branch -d dev
```

2. 本地仓库进行：**其他命令行**

```sh
# 1. 查看当前目录下所有文件
$ ls
$ dir

# 2. 查看具体修改内容
$ git diff                              # 查看工作区和暂存区『执行过git add的文件』的差异

# 3. 查看某一次提交的commit id
$ git log                               # 希望回到过去某个版本。可以查到目前所有版本的历史记录。
$ git log --pretty=oneline              # 查看历史记录，比git log更简便。只有commit id和description
$ git reflog                            # 目前处于回退状态。希望回到未来某个版本。可以记录每一次命令执行的结果

# 4. 查看远程仓库的信息
$ git remote -v                         # 返回一些远程仓库可以clone和push的origin的地址
$ git remote                            # 返回origin仓库名

# 5. 从远程库克隆
$ git clone <ssh repo address>

# 6. 查看分支以及当前分支
$ git branch                            # 当前分支前会有*号，字体为绿色

# 7. 切换已有分支
$ git checkout dev
$ git switch dev                        # 使用新的git switch命令，比git checkout要更容易理解。

# 8. 冲突分支的合并情况
$ git log --graph

# 9. 将本地代码推送到开发分支上
$ git push origin dev
```

有点累不看了 [廖雪峰的官方网站](https://www.liaoxuefeng.com/) 大概看到标签。