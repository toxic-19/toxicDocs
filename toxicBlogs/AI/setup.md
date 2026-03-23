# 记录Macbook安装开发环境 2026版

系统设置：macOS版本26.3.2 芯片Apple M4

## 1. 安装Xcode 

运行该命令后会弹出一个 command line developer tools的安装。Mac需要安装一个命令行工具，耗时较长。同意即可。

```bash
> xcode-select --install # 安装命令行工具
xcode-select: note: install requested for command line developer tools
# 核心作用是：告诉系统和其他开发工具（如Git,clang,llvm,gcc,make,ld,Homebrew等）应该去哪个路径下寻找编辑环境和开发头文件。
# 本命令行工具路径放在（/Library/Developer/CommandLineTools）
```

获取xcode运行的路径：`xcode-select -p`。大概只有1GB左右。

确认是否安装成功：

```bash
git --version
clang --version
```

## 2.  安装HomeBrew

### 2.1. 设置代理

通过在shell配置文件中（默认zsh）设置alias，实现一键开启和关闭proxy。

1. 手动创建一个新空文件 `touch ~/.zshrc`

2. 使用系统自带记事本打开 `open -e ~/.zshrc`

3. 粘贴并保存

   ```bash
   # 开启代理
   alias proxy='export http_proxy=http://127.0.0.1:6789; export https_proxy=http://127.0.0.1:6789; echo "Terminal Proxy On"'
   
   # 关闭代理
   alias unproxy='unset http_proxy; unset https_proxy; echo "Terminal Proxy Off"'
   
   # 查看当前代理状态
   alias checkproxy='env | grep -i proxy'
   ```

4. 激活配置`source ~/.zshrc`

5. 打开代理 `proxy` 为下面安装 Homebrew 做准备

### 2.2. 安装

#### 安装Homebrew

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

1. 需要输入Mac的开机密码
2. 确认安装按下enter
3. 最好启动全局代理，规则代理会出现部分下载问题。

安装结束后，最后会有一些提示：

```bash
==> Next steps:
- Run these commands in your terminal to add Homebrew to your PATH:
    echo >> /Users/wu/.zprofile
    echo 'eval "$(/opt/homebrew/bin/brew shellenv zsh)"' >> /Users/wu/.zprofile
    eval "$(/opt/homebrew/bin/brew shellenv zsh)"
- Run brew help to get started
- Further documentation:
    https://docs.brew.sh
```

按照提示内容进行操作。

```bash
brew -v
Homebrew 5.1.0
# 输入该命令成功即可。
```

#### 安装其他软件

**1. 下载iterm2**

```bash
brew install --cask iterm2
==> Downloading https://iterm2.com/downloads/stable/iTerm2-3_6_6.zip
######################################################################################################################################################################################################## 100.0%
==> Installing Cask iterm2
==> Moving App 'iTerm.app' to '/Applications/iTerm.app'
🍺  iterm2 was successfully installed!
```

之后就可以正常在应用程序中看到了。

快捷键功能`Cmd + T 新建标签页`Cmd + N`新建窗口`Cmd + W`关闭当前标签`Cmd + Q`退出 iTerm2`Cmd + 数字键`切换到第 N 个标签`Cmd + ←/→`切换标签`Cmd + Shift + I`广播输入到所有标签

可以参考教程：https://blog.brmys.cn/iterm2-complete-guide#31-智能选择smart-selection

**2. 下载截图工具pixpin**

```bash
toxic@toxic1901 ~ % brew install --cask pixpin
✔︎ JSON API formula.jws.json                          Downloaded   32.0MB/ 32.0MB
✔︎ JSON API cask.jws.json                             Downloaded   15.3MB/ 15.3MB
==> Downloading https://download.pixpin.cn/PixPin_cn_zh-cn_2.4.9.1_uni.dmg
######################################################################### 100.0%
==> Installing Cask pixpin===
==> Moving App 'PixPin.app' to '/Applications/PixPin.app'
🍺  pixpin was successfully installed!
```

**3. 下载剪贴板工具**

```bash
toxic@toxic1901 ~ % brew install --cask maccy # 采用--cask命令是带图形界面的macOS界面（就像.dmg一样）
Warning: formula.jws.json: update failed, falling back to cached version.-------
✔︎ JSON API formula.jws.json                          Downloaded   32.0MB/ 32.0MB
✔︎ JSON API cask.jws.json                             Downloaded   15.3MB/ 15.3MB
==> Downloading https://github.com/p0deje/Maccy/releases/download/2.6.1/Maccy.ap
==> Downloading from https://release-assets.githubusercontent.com/github-product
######################################################################### 100.0%
==> Installing Cask maccy
==> Moving App 'Maccy.app' to '/Applications/Maccy.app'
🍺  maccy was successfully installed!
```

## 3. 前端环境

### 3.1. `fnm` 包管理器

使用Rust编写的，极速性能，异步加载 （Fast Node Manager）Node.js包管理工具，比起nvm更快，更轻量。

```bash
brew install fnm # 直接使用HomeBrew安装
# 使用
fnm install 18
fnm use 18
# 在项目中使用，可以自动扫描到node-version后自动进入该版本
echo "20" > .node-version
```

为了每次打开都能激活fnm，需要写入到`.zshrc` 中。记得让配置文件生效

```bash
echo 'eval "$(fnm env --use-on-cd)"' >> ~/.zshrc  # 由于我们之前修改过zshrc，导致本行会没有换行加入到文件中，报错
echo -e '\n# fnm初始化\neval "$(fnm env --use-on-cd)"' >> ~/.zshrc # 添加换行、注释
# 检查
tail -n 3 ~/.zshrc
# 安装最新LTS版本的node
fnm install --lts
```

验证是否安装成功

```bash
toxic@toxic1901 ~ % fnm install --lts
Installing Node v24.13.0 (arm64)
00:00:03 ██████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████ 25.01 MiB/25.01 MiB (8.00 MiB/s, 0s)

toxic@toxic1901 ~ % node -v
v24.13.0
toxic@toxic1901 ~ % npm -v
11.6.2
```

### 3.2. 安装`pnpm`

解决项目 `node_modules` 文件夹动辄几百 MB 占硬盘的问题，且安装速度极快。

```bash
toxic@toxic1901 ~ % brew install pnpm
Warning: cask.jws.json: update failed, falling back to cached version.                                                                                                               Downloading  32.0MB/-------
✔︎ JSON API cask.jws.json                                                                                                                                                             Downloaded   15.3MB/ 15.3MB
✔︎ JSON API formula.jws.json                                                                                                                                                          Downloaded   32.0MB/ 32.0MB
==> Fetching downloads for: pnpm
✔︎ Bottle Manifest pnpm (10.28.1)                                                                                                                                                     Downloaded    7.4KB/  7.4KB
✔︎ Bottle pnpm (10.28.1)                                                                                                                                                              Downloaded    3.8MB/  3.8MB
==> Pouring pnpm--10.28.1.arm64_tahoe.bottle.tar.gz
==> Caveats
pnpm requires a Node installation to function. You can install one with:
  brew install node
==> Summary
🍺  /opt/homebrew/Cellar/pnpm/10.28.1: 1,077 files, 16.5MB
==> Running `brew cleanup pnpm`...
Disable this behaviour by setting `HOMEBREW_NO_INSTALL_CLEANUP=1`.
Hide these hints with `HOMEBREW_NO_ENV_HINTS=1` (see `man brew`).
==> Caveats
zsh completions have been installed to:
  /opt/homebrew/share/zsh/site-functions
```

进行初始化

```bash
toxic@toxic1901 ~ % pnpm setup
Appended new lines to /Users/toxic/.zshrc

Next configuration changes were made:
export PNPM_HOME="/Users/toxic/Library/pnpm"
case ":$PATH:" in
  *":$PNPM_HOME:"*) ;;
  *) export PATH="$PNPM_HOME:$PATH" ;;
esac

To start using pnpm, run:
source /Users/toxic/.zshrc # 激活配置
```

配置npm源

```bash
pnpm config set registry https://registry.npmmirror.com # 设置国内源
pnpm config get registry # 查看配置是否设置成功
pnpm store prune # 清空缓存
pnpm install # 重新下载
```

- `brew -v` (包管理)
- `fnm --version` (Node 管理)
- `node -v` (JavaScript 环境)
- `pnpm -v` (包下载神器)

## 4. python环境

安装uv python版本管理工具，同样使用rust进行编写

```bash
toxic@toxic1901 ~ % brew install uv # 直接install是命令行工具
✔︎ JSON API formula.jws.json                                                                                                                                                          Downloaded   32.0MB/ 32.0MB
✔︎ JSON API cask.jws.json                                                                                                                                                             Downloaded   15.3MB/ 15.3MB
==> Fetching downloads for: uv
✔︎ Bottle Manifest uv (0.9.26)                                                                                                                                                        Downloaded    8.1KB/  8.1KB
✔︎ Bottle uv (0.9.26)                                                                                                                                                                 Downloaded   18.8MB/ 18.8MB
==> Pouring uv--0.9.26.arm64_tahoe.bottle.tar.gz
🍺  /opt/homebrew/Cellar/uv/0.9.26: 17 files, 44.6MB
==> Running `brew cleanup uv`...
Disable this behaviour by setting `HOMEBREW_NO_INSTALL_CLEANUP=1`.
Hide these hints with `HOMEBREW_NO_ENV_HINTS=1` (see `man brew`).
==> Caveats
zsh completions have been installed to:
  /opt/homebrew/share/zsh/site-functions
```

修改配置 .zshrc 添加以下

```bash
eval "$(uv generate-shell-completion zsh) # 自动补全
```

初始化项目：

```bash
uv init # 会生成pyproject.toml 文件
uv add requests # 添加依赖
uv run hello.py # 运行文件
```

## 5. Docker环境

```bash
toxic@toxic1901 ~ % brew install --cask docker
==> Downloading https://desktop.docker.com/mac/main/arm64/215387/Docker.dmg
==> Installing Cask docker-desktop
==> Moving App 'Docker.app' to '/Applications/Docker.app'
==> Linking Bash Completion 'docker-compose.bash-completion' to '/opt/homebrew/etc/bash_completion.d/docker-compose'
==> Linking Bash Completion 'docker.bash-completion' to '/opt/homebrew/etc/bash_completion.d/docker'
==> Linking Fish Completion 'docker-compose.fish-completion' to '/opt/homebrew/share/fish/vendor_completions.d/docker-compose.fish'
==> Linking Fish Completion 'docker.fish-completion' to '/opt/homebrew/share/fish/vendor_completions.d/docker.fish'
==> Linking Zsh Completion 'docker-compose.zsh-completion' to '/opt/homebrew/share/zsh/site-functions/_docker-compose'
==> Linking Zsh Completion 'docker.zsh-completion' to '/opt/homebrew/share/zsh/site-functions/_docker'
==> Linking Binary 'docker-compose' to '/usr/local/cli-plugins/docker-compose'
Password:
==> Linking Binary 'hub-tool' to '/usr/local/bin/hub-tool'
==> Linking Binary 'kubectl' to '/usr/local/bin/kubectl.docker'
==> Linking Binary 'docker' to '/usr/local/bin/docker'
==> Linking Binary 'docker-credential-desktop' to '/usr/local/bin/docker-credential-desktop'
==> Linking Binary 'docker-credential-ecr-login' to '/usr/local/bin/docker-credential-ecr-login'
==> Linking Binary 'docker-credential-osxkeychain' to '/usr/local/bin/docker-credential-osxkeychain'
🍺  docker-desktop was successfully installed!
```

安装可视化界面的docker，需要输出mac的密码

添加配置并激活 `source ~/.zshrc`

```bash
# 开启 Docker
alias dkon='open --background -a Docker'
# 关闭 Docker
alias dkoff="pkill -f Docker && echo 'Docker closed.'"
```



启动后报错：显示Rostta安装失败：

Mac 使用的是 Apple Silicon（M 系列）芯片，而 Docker 需要 **Rosetta 2** 环境来兼容运行那些为 Intel 芯片设计的容器镜像。

需要手动安装：

Rostta是指令集转换层。它只会在你运行 Intel 应用时，动态地把指令“翻译”给你的 M 芯片听，所以它本身并不存储大量数据。

```bash
toxic@toxic1901 ~ % softwareupdate --install-rosetta --agree-to-license
By using the agreetolicense option, you are agreeing that you have run this tool with the license only option and have read and agreed to the terms.
If you do not agree, press CTRL-C and cancel this process immediately.
2026-01-25 21:11:15.853 softwareupdate[56080:2609861] Package Authoring Error: 093-50752: Package reference com.apple.pkg.RosettaUpdateAuto is missing installKBytes attribute
Install of Rosetta 2 finished successfully
```



## 6. Typora + PicList

gitee token：57bc3a1b9a4852383e592161da8d8179

PicList-Core 依赖 sharp 库。不设置直接下载会报错。参考 https://www.npmjs.com/package/piclist

```bash
pnpm config set sharp_binary_host "https://npmmirror.com/mirrors/sharp"  
pnpm config set sharp_libvips_binary_host "https://npmmirror.com/mirrors/sharp-libvips"  
pnpm install sharp
# 实际本地部署的粘贴效果：
wu@wudeMacBook-Air typora-user-images % pnpm add -g piclist
Downloading text-to-svg@3.1.5: 8.74 MB/8.74 MB, done
 WARN  1 deprecated subdependencies found: node-domexception@1.0.0
Downloading @img/sharp-libvips-darwin-arm64@1.2.3: 7.57 MB/7.57 MB, done
Packages: +339
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
Downloading typescript@4.9.5: 11.62 MB/11.62 MB, done
Progress: resolved 360, reused 28, downloaded 312, added 339, done

/Users/wu/Library/pnpm/global/5:
+ piclist 2.3.4

╭ Warning ──────────────────────────────────────────────────────────────────────────────────────╮
│                                                                                               │
│   Ignored build scripts: sharp@0.34.4, ssh2-no-cpu-features@2.0.0.                            │
│   Run "pnpm approve-builds -g" to pick which dependencies should be allowed to run scripts.   │
│                                                                                               │
╰───────────────────────────────────────────────────────────────────────────────────────────────╯
Done in 11.9s using pnpm v10.32.1
```

之后直接输入 picgo 会显示命令帮助之类的就代表安装成功的。

使用命令行进行安装插件，和配置gitee仓库地址。

```bash
# 下载插件
picgo install gitee-uploader
added 4 packages in 789ms
[PicList SUCCESS]: 插件安装成功
# 使用一个上传方式：gitee
picgo use uploader
? Use an uploader 
  腾讯云COS 
  又拍云 
  WebDAV 
❯ gitee 
  高级自定义 
  AList 
  阿里云OSS 
(Move up and down to reveal more choices)
# 开始配置
wu@wudeMacBook-Air typora-user-images % picgo set uploader gitee         
? repo: zhizhu_wlz/picgo. # 直接使用地址栏上的路径
? branch: master
? token: 57bc3a1b9a4852383e592161da8d8179
? path: setup
? customPath: default
? customUrl: 
[PicList SUCCESS]: Created new config "Default" for gitee
[PicList SUCCESS]: Configure config done
```

验证配置：`picgo config-show gitee`

### 最终改为 picList 下载了

主要还是之前repo写错了，才导致上面👆这种方式一直报错。

```bash
wu@Sylvia ~ % brew install piclist --cask
✔︎ JSON API cask.jws.json                                                                     Downloaded   15.4MB/ 15.4MB
✔︎ JSON API formula.jws.json                                                                  Downloaded   32.0MB/ 32.0MB
==> Fetching downloads for: piclist
✔︎ Cask piclist (3.3.2)                                                                       Verified    148.4MB/148.4MB
==> Installing Cask piclist
==> Moving App 'PicList.app' to '/Applications/PicList.app'
🍺  piclist was successfully installed!
```



## 7. 安装Claude code

安装命令：

```bash
# 使用pnpm安装
pnpm add -g @anthropic-ai/claude-code

# 可以在pnpm安装路径下看到命令
wu@Sylvia pnpm % pnpm bin -g
/Users/wu/Library/pnpm
wu@Sylvia pnpm % ls /Users/wu/Library/pnpm
claude	global	store

# 验证安装是否成功
claude --version
# 初始化
claude init
# 常见命令
claude chat
claude init
claude settings
claude fix   # 自动修复项目错误
claude ask   # 一次性问答模式
```



```bash
wu@Sylvia Application Support % curl -fsSL https://claude.ai/install.sh | bash
Setting up Claude Code...
✔ Claude Code successfully installed!
  Version: 2.1.81
  Location: ~/.local/bin/claude

  Next: Run claude --help to get started

⚠ Setup notes:
  • Native installation exists but ~/.local/bin is not in your PATH. Run:

  echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc && source ~/.zshrc

✅ Installation complete!
```





### 7.1. 安装CC Switch

安装cc-switch以便于快速同步多个工具之间的skills等。需要提前安装好Claude code。

```bash
# 把 GitHub 用户 farion1231 提供的 Homebrew 软件仓库加入到本地，让 Homebrew 能安装其中的软件（例如 ccswitch）
wu@Sylvia pnpm % brew tap farion1231/ccswitch
✔︎ JSON API cask.jws.json                                                                                              Downloaded   15.4MB/ 15.4MB
✔︎ JSON API formula.jws.json                                                                                           Downloaded   32.0MB/ 32.0MB
==> Tapping farion1231/ccswitch
Cloning into '/opt/homebrew/Library/Taps/farion1231/homebrew-ccswitch'...
remote: Enumerating objects: 89, done.
remote: Counting objects: 100% (22/22), done.
remote: Compressing objects: 100% (6/6), done.
remote: Total 89 (delta 21), reused 16 (delta 16), pack-reused 67 (from 1)
Receiving objects: 100% (89/89), 9.38 KiB | 2.35 MiB/s, done.
Resolving deltas: 100% (21/21), done.
Tapped 1 cask (14 files, 18.0KB).
```

```bash
brew install --cask cc-switch
```

安装完之后打开 cc-switch 会显示无法打开。需要打开系统设置>隐私与安全性中最下面同意仍要打开该软件。
