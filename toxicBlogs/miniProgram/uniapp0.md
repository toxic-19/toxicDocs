---
title: uniapp笔记
date: 2023-1-9
tags:
 - uniapp
 - 小程序
categories:
 - 小程序
sidebar: 'auto'
---

## 1. uniapp介绍

:punch: [uniapp官网](https://uniapp.dcloud.net.cn/)  :punch: b站up主的接口 [有道云笔记 (youdao.com)](https://note.youdao.com/ynoteshare/index.html?id=67403c0c586166f508eb962d39a323c9&type=note&_time=1673624518997)

:punch: b站视频链接 [2022新课uniapp零基础入门到项目打包（微信小程序/H5/vue/安卓apk）](https://www.bilibili.com/video/BV1mT411K7nW/?spm_id_from=333.788.recommend_more_video.2&vd_source=fd483034c51a8aa4f43cf44d83bc54a0)

### 1.1 优势

:page_with_curl: 1. `uni-app`是一个使用 `vue.js` 开发所有前端应用的框架。

:page_with_curl: 2. 一套代码运行到多个平台。

### 1.2 安装

:page_with_curl: 1. `HBuilderX`可视化界面

:page_with_curl: 2. 安装`vue-cli`脚手架一样：

```sh
# 全局安装vue-cli
npm install -g @vue/cli
# 使用HBuilder正式版安装uniapp项目
vue create -p dcloudio/uni-preset-vue project-name
# 安装vue-cli项目时：
vue create project-name
```



## 2. 查漏补缺

### 2.1 `pages.json`查漏

1. `pages.json`中的`pages`数组中第一项表示应用启动页面。
2. 在`pages.json`中的`globalStyle`节点设置，要不与`pages`节点冲突才生效。页面设置了就看页面的，没有设置就看全局的。

 <img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230110160018217.png" alt="image-20230110160018217" style="zoom:67%;" />



### 2.2 组件

:punch:**uView组件库** [uView 2.0 - 全面兼容nvue的uni-app生态框架 - uni-app UI框架 (uviewui.com)](https://www.uviewui.com/)

#### 2.2.1 零散组件知识

1. `icon` 组件：字体图标

```html
<!-- 微信小程序支持 type : success, success_no_circle, info, warn, waiting, cancel, download, search, clear -->
<icon type="info" size="14"></icon>
```

2. `text`组件内属性有：`user-select[false]`【文本是否可选】
3. `white-space:nowrap`  子容器不换行。

```html
<!-- 演示横向滚动；纵向相同 -->
<!-- 一定记住使用的是scroll-view不是view-->
<scroll-view class="scroll" scroll-x>
    <view class="group">
        <view class="item">
            111
        </view>
        <view class="item">
            222
        </view>
        <view class="item">
            333
        </view>
        <view class="item">
            444
        </view>
        <view class="item">
            555
        </view>
    </view>
</scroll-view>
```

```scss
.scroll {
    // 定义滚动容器
    border: 1rpx solid red;
    box-sizing: border-box;
    .group {
        // 定义滚动内容
        white-space: nowrap;
        .item {
            width: 220rpx;
            height: 220rpx;
            background-color: antiquewhite;
            margin-right: 10rpx;
            display: inline-block;
        }
    }
}
```

 ![image-20230110163730973](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230110163730973.png)

4. `image`组件中的`mode`属性值：默认是`320px × 240px`

:punch: `aspectFit `: 纵横比，长边完全显示【假设长边为高】会在默认宽高中自动居中

:punch: `heightFix`：宽高比不变，高度不变，宽度自变化。会改变默认宽高

 ![image-20230110175010934](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230110175010934.png)

:punch: 同理: `aspectFill `依然是默认宽高不变，短边完全显示；但`widthFix`就是宽度不变，高度自适应，会改变默认宽高。

5. `navigator`组件进行跳转的时候，`url`的值不要带有后缀名。否则无法实现跳转。

```html
<!-- /表示的是项目主体 -->
<navigator url="/pages/list/list">新闻列表</navigator>
```



#### 2.2.2 导航组件`tabBar`

:punch:  配置`tabBar` 练手导航组件的属性等。

:red_circle: 微信小程序仅支持tabBar图标是 `.jpg ，.png，.jpeg`  格式。

 <img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230110221044050.png" alt="image-20230110221044050" style="zoom:67%;" />

1. `tabBar`页面之间进行跳转：使用`open-type="switchTab|reLaunch"`
2. 在`tabBar`页面跳转到非tabBar页面使用：`reLaunch|redirect`
2. 在`tabBar`配置`iconfont`的优先级大于`iconPath`。`iconfont`下载的`ttf`文件需要配置在`tabBar`标签里面。注意在使用Unicode时，将前三位改为 `\u`，才可生效
2. 注意小程序不支持 `iconfont `只能使用` iconPath` 等。

```json
"tabBar": {
    "iconfontSrc": "/static/font/iconfont.ttf",
    "color": "#5b5a67",
    "selectedColor": "#55a45b",
    "list": [
        {
            "text": "首页",
            "pagePath": "pages/index/index",
            "iconPath": "/static/tabBar/home.png",
            "selectedIconPath": "static/tabBar/home-h.png",
            "iconfont": {
                "text": "\ue6cb",
                "selectedText": "\ue6cb",
                "selectedColor": "#1f6f25"
            }
    	},
        {
            "text": "列表",
            "pagePath": "pages/list/list",
            "iconPath": "static/tabBar/list.png",
            "selectedIconPath": "static/tabBar/list-h.png"
        },
        {
            "text": "关于",
            "pagePath": "pages/about/about",
            "iconPath": "static/tabBar/about.png",
            "selectedIconPath": "static/tabBar/about-h.png"
        }
    ]
}
```

:punch: 使用`uniapp`的`api`进行配置`tabBar`.

​	 :small_red_triangle: 注意：`pages.json`中的`tabBar`节点也是需要的，否则不起效果。

​	 :small_red_triangle: 感觉是替代。 

```js
onLoad() {
    // 在随便一个页面只能配置一个，主要依靠index来看配置的是哪一个
    uni.setTabBarItem({
        index:0,
        text:"首页api设置",
        iconPath:'/static/tabBar/home.png',
        selectedIconPath:'/static/tabBar/home-h.png'
    })
}
```



:punch:**小红点或数字标**

```js
// 在app.vue上设置：编译完成就出现
onShow: function() {
    console.log('App Show');
    uni.setTabBarBadge({
        index:1,
        text:"6"
    })
},
// 在list.vue上设置：一点进去该页面，就清除未读图标
onLoad() {
    uni.removeTabBarBadge({
        index:1
    })
}
```



### 2.3 指令

1. `v-if` 和 `v-else` 必须挨在一起。否则就会爆错。空格可以
2. `v-for`：对对象进行一个循环

```html
<view v-for="(index,name,value) in obj" :key="index">
    {{index}}--{{name}}:{{value}}
</view>
```

```js
export default {
    data(){
        return{
            obj:{name:"jack",age:12}
        }
    }
}
```

在小程序中渲染结果为：`index`并不能被渲染出来。在H5中可以：

 <img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230110230549282.png" alt="image-20230110230549282" style="zoom:80%;" />![image-20230111000257682](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230111000257682.png)

3. `{{}}`不可以解析`html`标签；`v-html`可以解析`html`标签

4. 内联样式绑定时使用：`:style="{background:'blue'}"` 或者 `:style="'background: blue'"` 



### 2.4 例子

#### 2.4.1 导航切换高亮样例

```html
<!-- 演示导航栏高亮转变 -->
<view class="nav">
    <view class="item" :class="clickIndex===index ? 'active':''" v-for="(item,index) in navArr" :key="index"
          @click="handleBgcolor(index)">
        {{item.title}}
    </view>
</view>
```

```js
export default {
    data() {
        return {
            // 导航栏
            navArr: [{
                title: "首页"
            }, {
                title: "介绍"
            }, {
                title: "教程"
            }, {
                title: "API"
            }],
            clickIndex: 0,
            // 表单
        }
    },
    methods: {
        handleBgcolor(e) {
            this.clickIndex = e;
            console.log(this.clickIndex);
        }
    }
}
```

```scss
.nav {
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: antiquewhite;

    .item {
        flex: 1;
        height: 100rpx;
        line-height: 100rpx;
        text-align: center;

        &.active {
            background: #457534;
            color: white;
            font-size: 32rpx;
            border-radius: 10rpx;
        }
    }
}
```

 <img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230111152426351.png" alt="image-20230111152426351" style="zoom:80%;" />



#### 2.4.2 表单样例

:punch: `submit`事件自带参数`e` 。 `e.detail.value`是一个包含`input`中所有内容的对象。

:punch: 前提是 在每一个 表单组件中 设置 `name` 属性即为上述对象的键。输入的为值。

```html
<!-- 演示表单信息提交 -->
<form class="form" @submit="onsubmit">

    <view class="item">
        姓名：<input type="text" name="name" placeholder="请输入姓名...">
    </view>

    <view class="item">
        <radio-group name="gender">
            性别：
            <label>
                <radio value="男" /><text>男</text>
            </label>
            <label>
                <radio value="女" /><text>女</text>
            </label>
        </radio-group>
    </view>

    <view class="item">
        <picker name="scholar" :range="pickerArr" :value="pickerIndex" @change="handlePicker">
            文化程度：<text>{{pickerArr[pickerIndex]}}</text>
        </picker>
    </view>

    <view class="item">
        <textarea name="comment" placeholder="请输入建议..."></textarea>
    </view>

    <view class="item">
        <button form-type="submit" size="mini" type="primary">提交</button>
        <button form-type="reset" size="mini">重置</button>
    </view>
</form>
		
```

```js
export default {
    data() {
        return {
            formData: {
                name: "",
                gender: "",
                scholar: "",
                comment: ""
            },
            pickerArr: ["小学", "初中", "高中", "本科"],
            pickerIndex: 0,
        }
    },
    methods: {
        handlePicker(e) {
            this.pickerIndex = e.detail.value;
        },
        onsubmit(e) {
            this.formData = e.detail.value;
            this.formData.scholar = this.pickerArr[this.pickerIndex];
        }
    }
}
```

### 2.5 计算属性

:pick: **计算属性是基于它们的响应式依赖进行缓存的**。只在相关响应式依赖发生改变时它们才会重新求值。



### 2.6 组件【uniapp】:punch:

1. 引入方式 `easycom`：不需要引用和注册可以直接在页面中使用。
2. **easycom**是自动开启的。打包时会自动剔除没有使用的组件。

:japanese_goblin: 规定：

+ 存放在规定目录下：

```html
│─components            	符合vue组件规范的uni-app组件目录
│  └─componentA         	符合‘components/组件名称/组件名称.vue’目录结构，easycom方式可直接使用组件
│  		└─componentA.vue    可复用的componentA组件
│  └─component-a.vue      可复用的component-a组件
```



#### 2.6.1 props

1. **单向数据流**：是在子组件中定义，在父组件中赋值。父级prop的更新会向下流动到子组件中。可以防止从子组件意外变更父级组件的状态。

2. 在子组件中声明`props`对象的时候，如果该属性的类型是`Array or Object` ，其默认值需要使用函数`return`出来。`default(){ return [1,2,3] }`

:japanese_goblin: 示例1：props父向子传值

+ 子组件 `myItem.vue`

```vue
<template>
	<view class="item">
		<view class="big">
			{{title}}
		</view>
		<view class="small">
			{{subTitle}}
		</view>
		<view class="line"></view>
	</view>
</template>

<script>
	export default {
		name: "myItem",
		props: {
			title: {
				type: String,
				default: "文章大标题"
			},
			subTitle: {
				type: String,
				default: "文章副标题"
			}
		}
	}
</script>
// 省略了style
```

+ 父组件即使用该`myItem.vue`的组件：

```vue
<template>
	<view class="container">
		<myItem :title="title" :subTitle="subTitle"></myItem>
	</view>
</template>

<script>
export default {
    data() {
        return {
            title:"第十三届军事爱好者协会招新",
            subTitle:"2020-10-19"
        }
    },
}
</script>
```

+ 效果如下：

 <img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230112015718232.png" alt="image-20230112015718232" style="zoom: 67%;" />



#### 2.6.2 `.native`   和  `.sync`

1. 如果想在组件的根元素上直接监听一个原生事件。可以使用@事件的`.native`修饰符。

2. 当一个子组件改变了一个 `prop` 的值时，这个变化也会同步到父组件中所绑定。 `.sync` 它会被扩展为一个自动更新父组件属性的 `v-on` 监听器。

:japanese_goblin: 示例：实则是省略子组件传值给父组件的步骤

```html
<!--1.不使用.sync-->
① 在子组件上定义事件绑定。该事件为向父组件传值。
<button size="mini" @click="onClose">
    关闭
</button>
② 父组件接收该值即false【子组件名称myBox】
changeToFalse是子组件定义的，changeState是父组件定义的。传过来的值即为该事件的event。通过父组件定义的changeState来获取子组件传过来的值。
<myBox :state="state" @changeToFalse="changeState"></myBox>
```

```js
① 子组件上定义的点击事件
onClose(){
	this.$emit("changeToFalse",false);
}
```

```html
<!--使用.sync-->
① 子组件绑定的点击事件改变
<button size="mini" @click="onClose">关闭</button>
② 父组件不需要定义其他方法。来获取到这个传值了。
<myBox :state.sync="state"></myBox>
```

```js
onClose(){			
   // 更新父组件的值state为false 
    this.$emit("update:state",false);
}
```



## 3. 生命周期



## 4. 路由

### 4.1 路由信息

1. H5在`mounted`函数中可以输出本页面的路由信息：由list页面跳转到my页面

 ![image-20230112162930287](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230112162930287.png)

```js
// 注意该语句是在跳转终点页面进行的。即在my页面进行。
mounted() {
    console.log(this.$route);
}
```

:red_circle: 注意uniapp小程序中是不支持这种做法的；只会返回`undefined`

2. uniapp小程序需要在 onLoad函数中声明。参数event即为路由携带的参数。在页面栈`return Array`的`_page_`属性中可以看到和`this.$route`一致的路由信息。

 ![image-20230112163201758](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230112163201758.png)<img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230112163339157.png" alt="image-20230112163339157" style="zoom:67%;" />

```js
// my页面
onLoad(e) {
    console.log(e);
    console.log(getCurrentPages()); // 页面栈
}
```



### 4.2 交互

```vue
<template>
	<view>
		交互演示：
		<button @click="showToast">弹窗:<text>{{itemList[itemIndex]}}</text> </button>
	</view>
</template>

<script>
    export default {
        data() {
            return {
                itemList:['A', 'B', 'C'],
                itemIndex:-1,
            }
        },
        methods: {
            showToast(){
                uni.showActionSheet({
                    itemList: this.itemList,
                    success: (res)=>{
                        console.log(this);  // 是vm组件实例
                        this.itemIndex = res.tapIndex;
                    },
                    fail: function (res) {
                        console.log(this);  // 此时的this是fail这个function
                        console.log(res.errMsg);
                    }
                });
            }
        },
    }
</script>
```

 <img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230112172437633.png" alt="image-20230112172437633" style="zoom:60%;" />



## 5. 网络请求

### 5.1 获取qq头像

```vue
<template>
	<view>
		<view v-html="imgSrc"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgSrc:""
			}
		},
		methods: {
			getImgSrc(){
				uni.showLoading({
					title:"数据加载中..."
				})
				uni.request({
					url:"https://v.api.aa1.cn/api/qqimg/index.php?qq=3468528598",
					timeout:1500,
					method:"GET",
					success: (res) => {
						this.imgSrc = res.data;
					},
					fail: (res) => {
						uni.showToast({
							title:res.errMsg,
							icon:'error'
						})
					},
					complete: () => {
						uni.hideLoading();
					}
				})
			}
		},
		onLoad() {
			this.getImgSrc();
		}
	}
</script>
```

 ![image-20230113004547312](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230113004547312.png)



### 5.2 获取微博热搜

```vue
<template>
	<view class="weibo">
		<view class="top">
			<view class="num">序号</view>
			<view class="key-title">关键词</view>
		</view>
		<view class="item" v-for="item in resoDate" :key="item.index" @click="onClick">
			<view class="number">
				{{item.index}}
			</view>
			<view class="title">
				{{item.title}}
			</view>
			<view class="hot">
				{{item.hot}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				resoDate: []
			}
		},
		methods: {
			getReso() {
				uni.showLoading({
					title:"数据加载中..."
				})
				uni.request({
					url: 'https://zj.v.api.aa1.cn/api/weibo-rs/',
					method: 'GET',
					success: (res) => {
						this.resoDate = res.data.data;
						
					},
					complete: () => {
						uni.hideLoading()
					}
				})
			},
			onClick(){
				uni.navigateTo({
					url:'/pages/detail/detail'
				})
			}
		},
		onLoad() {
			uni.removeTabBarBadge({
					index: 1
				}),
				uni.setTabBarItem({
					index: 1,
					text: "微博热搜"
				}),
				this.getReso();
		}
	}
</script>

<style lang="scss">
	.top {
		font-size: 30rpx;
		color: #8f8f8f;
		font-weight: bold;
		padding: 15rpx 10rpx;
		display: flex;
		.num{
			flex: 1;
		}
		.key-title{
			flex: 6;
		}
	}

	.item{
		display: flex;
		justify-content: space-between;
		padding: 15rpx;
		box-sizing: border-box;
		font-size: 26rpx;
		.number {
			flex: 1;
			text-align: left;
			padding-left: 5rpx;
			color: #f26d5f;
			font-weight: bold;
		}

		.title {
			flex: 5;
			color: #0078b6;
		}
		.hot{
			color: #8f8f8f;
		}
	}
</style>
```

 ![image-20230113004707660](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230113004707660.png)
