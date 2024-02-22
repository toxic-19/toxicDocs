(window.webpackJsonp=window.webpackJsonp||[]).push([[67],{462:function(s,t,a){"use strict";a.r(t);var e=a(2),r=Object(e.a)({},(function(){var s=this,t=s._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h2",{attrs:{id:"_1-概念"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-概念"}},[s._v("#")]),s._v(" 1. 概念")]),s._v(" "),t("blockquote",[t("p",[s._v("Docker是一个开源的应用容器引擎，相对虚拟机，少了一层虚拟机OS，达到秒启动。")]),s._v(" "),t("p",[s._v("我们需要部署的是应用程序，要用的也是应用程序而不是操作系统。")]),s._v(" "),t("p",[s._v("容器技术：既可以获得虚拟机的好处又可以克服操作系统的笨重。")])]),s._v(" "),t("p",[s._v("现代软件开发的一大目的就是隔离，应用程序在运行时相对独立互不干扰。")]),s._v(" "),t("p",[t("img",{attrs:{src:"https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20231115201321862.png",alt:"image-20231115201321862"}})]),s._v(" "),t("p",[s._v("容器技术只隔离应用程序的运行时环境，但是容器之间可以共享同一个操作系统。")]),s._v(" "),t("p",[s._v("运行时环境指的是：程序运行时依赖的各种库以及配置。")]),s._v(" "),t("p",[s._v("注意：容器只是一种通用技术，docker是其中的一种实现。")]),s._v(" "),t("h3",{attrs:{id:"_1-1-如何使用"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-1-如何使用"}},[s._v("#")]),s._v(" 1.1. 如何使用")]),s._v(" "),t("p",[s._v("三个概念：")]),s._v(" "),t("ul",[t("li",[t("code",[s._v("dockerfile")]),s._v("：运行程序的源代码")]),s._v(" "),t("li",[t("code",[s._v("image")]),s._v("（镜像）：可执行程序")]),s._v(" "),t("li",[t("code",[s._v("container")]),s._v("（容器）：运行起来的进程")]),s._v(" "),t("li",[t("code",[s._v("Respository")]),s._v("（仓库）：保存镜像的代码控制中心")])]),s._v(" "),t("p",[s._v("所以说："),t("code",[s._v("dockerfile")]),s._v("是"),t("code",[s._v("image")]),s._v("的源代码，"),t("code",[s._v("docker")]),s._v("就是“编译器”。")]),s._v(" "),t("p",[s._v("我们只需要在"),t("code",[s._v("dockerfile")]),s._v("中制定需要的程序，依赖的配置，之后就可以交给"),t("code",[s._v("docker")]),s._v("进行编译了，即"),t("code",[s._v("docker build")]),s._v("。")]),s._v(" "),t("p",[s._v("之后生成的可执行程序就是"),t("code",[s._v("image")]),s._v("，使用"),t("code",[s._v("docker run")]),s._v(" 运行该"),t("code",[s._v("image")]),s._v("，该程序运行起来就是"),t("code",[s._v("docker container")]),s._v("。")]),s._v(" "),t("p",[t("strong",[s._v("FinalShell")])]),s._v(" "),t("h3",{attrs:{id:"_1-2-docker工作流程"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-2-docker工作流程"}},[s._v("#")]),s._v(" 1.2. "),t("code",[s._v("docker")]),s._v("工作流程")]),s._v(" "),t("p",[s._v("前提：docker使用了常见的CS架构即 client-server 模式。client输出各种docker命令，server负责执行。")]),s._v(" "),t("h4",{attrs:{id:"_1-docker-build"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-docker-build"}},[s._v("#")]),s._v(" 1. docker build")]),s._v(" "),t("h4",{attrs:{id:"_2-docker-run"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-docker-run"}},[s._v("#")]),s._v(" 2. docker run")]),s._v(" "),t("h4",{attrs:{id:"_3-docker-pull"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_3-docker-pull"}},[s._v("#")]),s._v(" 3. docker pull")]),s._v(" "),t("h2",{attrs:{id:"_2-dockerfile"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-dockerfile"}},[s._v("#")]),s._v(" 2. DockerFile")]),s._v(" "),t("blockquote",[t("p",[s._v("该文件从上往下的顺序执行")])]),s._v(" "),t("ol",[t("li",[t("p",[s._v("镜像操作指令")]),s._v(" "),t("p",[t("code",[s._v("copy")]),s._v("：从构建主机复制文件到镜像中")]),s._v(" "),t("p",[t("code",[s._v("add")]),s._v("：")]),s._v(" "),t("p",[t("code",[s._v("ENV")]),s._v("：设置环境变量")]),s._v(" "),t("p",[t("code",[s._v("WORKDIR")]),s._v("：工作目录，相当于 cd")]),s._v(" "),t("p",[t("code",[s._v("run")])])]),s._v(" "),t("li",[t("p",[s._v("启动 "),t("code",[s._v("ENTRYPOINT")])])]),s._v(" "),t("li",[t("p",[s._v("docker run [OPTIONS] IMAGE [COMMAND] [ARG...]")]),s._v(" "),t("p",[s._v("-v：目录映射")]),s._v(" "),t("p",[s._v("-p：指定端口映射")]),s._v(" "),t("p",[s._v("-u：用什么用户身份")])])]),s._v(" "),t("h2",{attrs:{id:"_3-操作"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_3-操作"}},[s._v("#")]),s._v(" 3. 操作")]),s._v(" "),t("h3",{attrs:{id:"_1-安装docker"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-安装docker"}},[s._v("#")]),s._v(" 1. 安装"),t("code",[s._v("docker")])]),s._v(" "),t("ol",[t("li",[s._v("下载"),t("code",[s._v("docker-ce")]),s._v("的"),t("code",[s._v("yum")]),s._v("源。地址就是："),t("code",[s._v("/etc/yum.repos.d/docker-ce.repo")])])]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("wget")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-O")]),s._v(" /etc/yum.repos.d/docker-ce.repo https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("p",[t("img",{attrs:{src:"https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20231116212400192.png",alt:"image-20231116212400192"}})]),s._v(" "),t("ol",{attrs:{start:"2"}},[t("li",[s._v("安装"),t("code",[s._v("Docker")])])]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" yum "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-y")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" docker-ce\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("p",[t("img",{attrs:{src:"https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20231116213322794.png",alt:"image-20231116213322794"}})]),s._v(" "),t("p",[t("img",{attrs:{src:"https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20231116212507284.png",alt:"image-20231116212507284"}})]),s._v(" "),t("ol",{attrs:{start:"3"}},[t("li",[s._v("检查安装成功")])]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-v")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("p",[t("img",{attrs:{src:"https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20231116212628298.png",alt:"image-20231116212628298"}})]),s._v(" "),t("ol",{attrs:{start:"4"}},[t("li",[s._v("启动并设置开启自启动")])]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" systemctl start "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 启动")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" systemctl "),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("enable")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 开机自启动")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br")])]),t("ol",{attrs:{start:"5"}},[t("li",[s._v("检查是否启动")])]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" systemctl status "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("p",[t("img",{attrs:{src:"https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20231116212905253.png",alt:"image-20231116212905253"}})]),s._v(" "),t("ol",{attrs:{start:"6"}},[t("li",[s._v("查看已有镜像")])]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" images\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("p",[t("img",{attrs:{src:"https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20231116213015274.png",alt:"image-20231116213015274"}})]),s._v(" "),t("ol",{attrs:{start:"7"}},[t("li",[s._v("docker 运行一个镜像")])]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" run hello-world\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),s._v(" "),t("img",{staticStyle:{zoom:"80%"},attrs:{src:"https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20231118144104400.png",alt:"image-20231118144104400"}}),s._v(" "),t("h3",{attrs:{id:"_2-常用命令"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-常用命令"}},[s._v("#")]),s._v(" 2. 常用命令")]),s._v(" "),t("ol",[t("li",[s._v("关于"),t("code",[s._v("docker")]),s._v("：")])]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" systemctl start "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v("     "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#运行Docker守护进程")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" systemctl stop "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v("      "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#停止Docker守护进程")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" systemctl restart "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v("   "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#重启Docker守护进程")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" systemctl "),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("enable")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v("    "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#设置Docker开机自启动")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" systemctl status "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v("    "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#查看Docker的运行状态")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br")])]),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" port "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("container_name"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("    "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 查看容器映射的端口")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("netstat")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-tuln")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("grep")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("8089")]),s._v("       "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 确定你的服务器启动并正在监听8089端口 返回Listen")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br")])]),t("p",[t("img",{attrs:{src:"https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20231119014211251.png",alt:"image-20231119014211251"}})]),s._v(" "),t("p",[t("img",{attrs:{src:"https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20231119111130689.png",alt:"image-20231119111130689"}})]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" images\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("ps")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br")])]),t("p",[t("img",{attrs:{src:"https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20231119111443751.png",alt:"image-20231119111443751"}})]),s._v(" "),t("ol",{attrs:{start:"2"}},[t("li",[s._v("关于编辑文件")])]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("cat")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("fileName"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 可以看到文件内容，但是不能编辑。也不会在新页面打开")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("vi")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("fileName"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("  "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 进入新页面，还不可以编辑。有光标可以移动")]),s._v("\ni              "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 出现Insert标志，表示可以进行编辑")]),s._v("\nEsc            "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 退出编辑模式")]),s._v("\n:q / :wq       "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 不保存退出文件 和 保存退出文件")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br")])]),t("ol",{attrs:{start:"3"}},[t("li",[s._v("其他操作：")])]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[s._v("ipconfig       "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 查看本机地址")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("h3",{attrs:{id:"_3-安装-docker-compose"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_3-安装-docker-compose"}},[s._v("#")]),s._v(" 3. 安装 "),t("code",[s._v("docker-compose")])]),s._v(" "),t("blockquote",[t("p",[s._v("安装完 "),t("code",[s._v("docker")]),s._v(" 之后并不会自动安装 "),t("code",[s._v("docker-compose")]),s._v(" ，需要手动安装。")])]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("curl")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-L")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"https://github.com/docker/compose/releases/download/1.29.2/docker-compose-'),t("span",{pre:!0,attrs:{class:"token variable"}},[t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$(")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("uname")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-s")]),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v(")")])]),s._v("-"),t("span",{pre:!0,attrs:{class:"token variable"}},[t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$(")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("uname")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-m")]),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v(")")])]),s._v('"')]),s._v(" "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-o")]),s._v(" /usr/local/bin/docker-compose \n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("p",[s._v("直接使用 Github 的链接地址，有些国内镜像虽然快，但是可能出现其他的问题。如下：")]),s._v(" "),t("p",[t("img",{attrs:{src:"https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20231118162126772.png",alt:"image-20231118162126772"}})]),s._v(" "),t("p",[t("img",{attrs:{src:"https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20231118161443917.png",alt:"image-20231118161443917"}})]),s._v(" "),t("p",[s._v("使用 Github 的链接安装成功后：")]),s._v(" "),t("p",[t("img",{attrs:{src:"https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20231118161558053.png",alt:"image-20231118161558053"}})]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("chmod")]),s._v(" +x /usr/local/bin/docker-compose "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 添加权限")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker-compose")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("--version")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 查看是否安装成功")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br")])]),t("p",[t("img",{attrs:{src:"https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20231118161930037.png",alt:"image-20231118161930037"}})]),s._v(" "),t("blockquote",[t("p",[s._v("安装成功后，看到的 "),t("code",[s._v("ls")]),s._v(" 都是亮的。")])]),s._v(" "),t("h3",{attrs:{id:"_4-安装milvus"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_4-安装milvus"}},[s._v("#")]),s._v(" 4. 安装"),t("code",[s._v("Milvus")])]),s._v(" "),t("blockquote",[t("p",[s._v("使用Docker Compose独立安装Milvus")]),s._v(" "),t("p",[s._v("参考："),t("a",{attrs:{href:"https://milvus.io/docs/install_standalone-docker.md",target:"_blank",rel:"noopener noreferrer"}},[s._v("Install Milvus Standalone with Docker Compose (CPU) Milvus documentation"),t("OutboundLink")],1)]),s._v(" "),t("p",[t("a",{attrs:{href:"https://blog.csdn.net/sinat_39620217/article/details/131847096",target:"_blank",rel:"noopener noreferrer"}},[s._v("一文带你入门向量数据库milvus：含docker安装、milvus安装使用、attu 可视化，启动 Milvus _CSDN博客"),t("OutboundLink")],1)])]),s._v(" "),t("h4",{attrs:{id:"_4-1-下载yml文件"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_4-1-下载yml文件"}},[s._v("#")]),s._v(" 4.1. 下载"),t("code",[s._v("yml")]),s._v("文件")]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("wget")]),s._v(" https://github.com/milvus-io/milvus/releases/download/v2.2.11/milvus-standalone-docker-compose.yml "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-O")]),s._v(" docker-compose.yml\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("p",[s._v("其实下载的是 ==milvus-standalone-docker-compose.yml==，然后重命名为 ==docker-compose==")]),s._v(" "),t("p",[t("img",{attrs:{src:"https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20231116225449773.png",alt:"image-20231116225449773"}})]),s._v(" "),t("p",[s._v("完了之后就可以启动 milvus 了。")]),s._v(" "),t("h4",{attrs:{id:"_4-2-启动milvus"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_4-2-启动milvus"}},[s._v("#")]),s._v(" 4.2. 启动"),t("code",[s._v("Milvus")])]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker-compose")]),s._v(" up "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-d")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 启动")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker-compose")]),s._v(" up "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-d")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 出错：command not found")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br")])]),t("p",[t("img",{attrs:{src:"https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20231118170635785.png",alt:"image-20231118170635785"}})]),s._v(" "),t("p",[t("img",{attrs:{src:"https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20231118171512151.png",alt:"image-20231118171512151"}})]),s._v(" "),t("blockquote",[t("p",[s._v("有点慢，耐心等待。")])]),s._v(" "),t("p",[t("strong",[s._v("检查容器是否启动并在后台运行：")])]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker-compose")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("ps")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 可以看到有milvus-standalone和两个依赖项正在运行")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("p",[t("img",{attrs:{src:"https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20231118172711032.png",alt:"image-20231118172711032"}})]),s._v(" "),t("p",[t("strong",[s._v("检查"),t("code",[s._v("milvus-standalone")]),s._v("正在监听本地的哪个端口")])]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" port milvus-standalone "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("19530")]),s._v("/tcp "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 可以通过该命令返回的本地IP地址和端口号连接到Milvus集群。")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("p",[t("img",{attrs:{src:"https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20231118192116724.png",alt:"image-20231118192116724"}})]),s._v(" "),t("h4",{attrs:{id:"_4-3-使用attu"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_4-3-使用attu"}},[s._v("#")]),s._v(" 4.3. 使用Attu")]),s._v(" "),t("ol",[t("li",[t("code",[s._v("47.120.1.75")]),s._v("是你的云服务器的公网"),t("code",[s._v("ip")])]),s._v(" "),t("li",[t("code",[s._v("8089:3000")]),s._v("：是"),t("code",[s._v("docker")]),s._v("容器中暴露出的端口是 "),t("code",[s._v("3000/tcp")]),s._v("，然后映射到主机的"),t("code",[s._v("8089")]),s._v("端口")]),s._v(" "),t("li",[s._v("注意："),t("code",[s._v("8089")]),s._v("端口需要在云服务器安全组中添加入方向的"),t("code",[s._v("8089")]),s._v("端口。")])]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" run "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-p")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("8089")]),s._v(":3000 "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-e")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("HOST_URL")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("http://47.120.1.75:8089 "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-e")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("MILVUS_URL")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("47.120")]),s._v(".1.75:19530 zilliz/attu:latest\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("p",[s._v("使用以上命令：安装成功后：打开："),t("a",{attrs:{href:"http://47.120.1.75:8089/#/connect",target:"_blank",rel:"noopener noreferrer"}},[s._v("Attu：47.120.1.75:8089"),t("OutboundLink")],1)]),s._v(" "),t("p",[t("img",{attrs:{src:"https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20231119012316879.png",alt:"image-20231119012316879"}})]),s._v(" "),t("p",[s._v("然后使用 "),t("a",{attrs:{href:"47.120.1.75:19530"}},[s._v("地址：47.120.1.75:19530")]),s._v(" 进入"),t("code",[s._v("milvus")]),s._v("数据库：")]),s._v(" "),t("p",[t("img",{attrs:{src:"https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20231119013110717.png",alt:"image-20231119013110717"}})]),s._v(" "),t("p",[t("strong",[s._v("删除"),t("code",[s._v("attu")]),s._v("：")])]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 先暂停镜像使用 docker ps可以看到 CONTAINER ID")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" stop "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("CONTAINER ID"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 删除容器")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("rm")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("CONTAINER ID"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 删除镜像")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" rmi zilliz/attu:lastest\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br")])]),t("p",[t("img",{attrs:{src:"https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20231119001001567.png",alt:"image-20231119001001567"}})]),s._v(" "),t("h2",{attrs:{id:"_4-milvus"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_4-milvus"}},[s._v("#")]),s._v(" 4. Milvus")]),s._v(" "),t("p",[s._v("关于milvus的安装："),t("RouterLink",{attrs:{to:"/toxicBlogs/tutorials/docker.html"}},[s._v("docker 3.4. 安装milvus")])],1),s._v(" "),t("h3",{attrs:{id:"_1-attu使用"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-attu使用"}},[s._v("#")]),s._v(" 1. "),t("code",[s._v("attu")]),s._v("使用")]),s._v(" "),t("ol",[t("li",[t("p",[s._v("创建"),t("code",[s._v("collection")])])]),s._v(" "),t("li",[t("p",[s._v("创建完 "),t("code",[s._v("field")]),s._v("字段后")])])]),s._v(" "),t("p",[s._v("​       "),t("strong",[s._v("必须添加 index Type：创建索引")]),s._v("，不然加载时就发生下面的错误："),t("code",[s._v("index doesn't exist")])]),s._v(" "),t("p",[t("img",{attrs:{src:"https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20231119161144043.png",alt:"image-20231119161144043"}})]),s._v(" "),t("p",[t("img",{attrs:{src:"https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20231119161131153.png",alt:"image-20231119161131153"}})]),s._v(" "),t("ol",{attrs:{start:"3"}},[t("li",[s._v("导入预定义的向量数据：(但是我没有，所以止步于此)")])]),s._v(" "),t("p",[t("img",{attrs:{src:"https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20231119161834270.png",alt:"image-20231119161834270"}})]),s._v(" "),t("h3",{attrs:{id:"_2-原理"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-原理"}},[s._v("#")]),s._v(" 2. 原理")]),s._v(" "),t("h3",{attrs:{id:"_3-demo"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_3-demo"}},[s._v("#")]),s._v(" 3. Demo")]),s._v(" "),t("p",[s._v("项目目录：D:\\Desktop\\graduation，首先初始化"),t("code",[s._v("npm init")])]),s._v(" "),t("ol",[t("li",[s._v("在项目中下载"),t("code",[s._v("milvus")]),s._v("依赖以及"),t("code",[s._v("typescript")])]),s._v(" "),t("li",[s._v("运行"),t("code",[s._v("tsc -v")]),s._v("看到版本号代表安装成功")])]),s._v(" "),t("p",[t("img",{attrs:{src:"https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20231119195920797.png",alt:"image-20231119195920797"}})]),s._v(" "),t("p",[t("img",{attrs:{src:"https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20231119203728198.png",alt:"image-20231119203728198"}})]),s._v(" "),t("ol",{attrs:{start:"2"}},[t("li",[s._v("参考"),t("a",{attrs:{href:"https://github.com/milvus-io/milvus-sdk-node/tree/main/examples/milvus",target:"_blank",rel:"noopener noreferrer"}},[s._v("milvus-sdk-node/examples/milvus at main · milvus-io/milvus-sdk-node · GitHub"),t("OutboundLink")],1),s._v("下载"),t("code",[s._v("HelloMilvus.ts")]),s._v("进行实验。")]),s._v(" "),t("li",[s._v("运行"),t("code",[s._v("typescript")]),s._v("文件的话：")])]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[s._v("tsc hello.ts\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("node")]),s._v(" hello.js\nts-node hello.ts "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 使用编译并运行的方式")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br")])]),t("p",[s._v("​\t或者采取编译与运行相结合的方式："),t("code",[s._v("npm install ts-node")])]),s._v(" "),t("p",[t("img",{attrs:{src:"https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20231119204229830.png",alt:"image-20231119204229830"}})]),s._v(" "),t("ol",{attrs:{start:"4"}},[t("li",[s._v("运行"),t("code",[s._v("HelloMilvus.ts")]),s._v("得到结果：")])]),s._v(" "),t("div",{staticClass:"language-ts line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-ts"}},[t("code",[s._v(" "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// do the search 分别查询找到各自的最相似的1条向量 输出name字段")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token builtin"}},[s._v("console")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("time")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'Search time'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("const")]),s._v(" search "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("await")]),s._v(" milvusClient"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("search")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    collection_name"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token constant"}},[s._v("COLLECTION_NAME")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    vector"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" vectorsData"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'vector'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 去搜索第一个向量")]),s._v("\n    output_fields"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'name'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 输出字段name")]),s._v("\n    limit"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 限制最相似向量条数")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token builtin"}},[s._v("console")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("timeEnd")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'Search time'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token builtin"}},[s._v("console")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("log")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'Search result'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" search"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br")])]),t("p",[t("img",{attrs:{src:"https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20231119205304568.png",alt:"image-20231119205304568"}})]),s._v(" "),t("h3",{attrs:{id:"_4-langchain"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_4-langchain"}},[s._v("#")]),s._v(" 4. LangChain")]),s._v(" "),t("p",[s._v("参考链接："),t("a",{attrs:{href:"https://js.langchain.com/docs/get_started/introduction",target:"_blank",rel:"noopener noreferrer"}},[s._v("LangChain - JS"),t("OutboundLink")],1)]),s._v(" "),t("p",[s._v("Node.js 18+")]),s._v(" "),t("p",[t("strong",[s._v("chunking 分块")]),s._v("：https://blog.csdn.net/lichunericli/article/details/134253386")]),s._v(" "),t("h2",{attrs:{id:"参考链接"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#参考链接"}},[s._v("#")]),s._v(" 参考链接")]),s._v(" "),t("ol",[t("li",[t("a",{attrs:{href:"https://zhuanlan.zhihu.com/p/187505981",target:"_blank",rel:"noopener noreferrer"}},[s._v("什么是Docker？看这一篇干货文章就够了！ - 知乎 (zhihu.com)"),t("OutboundLink")],1)]),s._v(" "),t("li",[t("a",{attrs:{href:"https://blog.csdn.net/zhangmingfie/article/details/130693070",target:"_blank",rel:"noopener noreferrer"}},[s._v("安装docker-compose出现错误html: No such file or directory syntax error near unexpected token - CSDN博客"),t("OutboundLink")],1)]),s._v(" "),t("li",[t("a",{attrs:{href:"https://blog.csdn.net/adminkeys/article/details/123380570",target:"_blank",rel:"noopener noreferrer"}},[s._v("【精选】Docker&Docker-compose的安装及部署-CSDN博客"),t("OutboundLink")],1)]),s._v(" "),t("li",[t("a",{attrs:{href:"https://blog.csdn.net/sinat_39620217/category_12376440.html",target:"_blank",rel:"noopener noreferrer"}},[s._v("Milvus_汀、人工智能的博客-CSDN博客"),t("OutboundLink")],1)]),s._v(" "),t("li",[t("a",{attrs:{href:"https://blog.csdn.net/Andrwin/article/details/124567338",target:"_blank",rel:"noopener noreferrer"}},[s._v("如何通过Milvus-Attu访问远程Milvus数据库？_訢詡的博客-CSDN博客"),t("OutboundLink")],1)])])])}),[],!1,null,null,null);t.default=r.exports}}]);