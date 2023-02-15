---
title: xiaoxiao-wxapp 开发思路
date: 2023-01-26
tags:
 - 开发
categories:
 - 教程
sidebar: 'auto'
---

## 1. 个人中心

> 小程序上 "我的" 上即为 个人中心。

个人中心 点进去为 个人主页。目前我的目录结构为：

![image-20230126223048840](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230126223048840.png)



### 1.1 个人中心

登录状态与未登录状态。

先写登录状态。

问题1：个人中心与个人主页关于 头像与信息 是一致的。那么两个页面有相同的一块。应该怎么做。

:punch: 在个人中心跳转到个人主页，可以把信息携带过去。减少多一次的数据请求。

​      点击收藏同样触发该方法。不过要将个人主页的tabs跳到收藏那边。

### 1.2 草稿箱编辑

bug：选中一个，再点击全选，再点击全选，还是选中状态。

1. 复选框状态

   通过点击，将value值加入到checkedList中。draftList中的属性checked可以自己加上去。

   选中时将 checked属性改为 true。

   注意：**只有点击了复选框才会改变checkedList** ，后面我们需要通过checkedList来删除draftList的选中项。

   方法逻辑是：遍历每一项，如果checkedList包含了该项的id，说明选中，就令checked为true。

   :heavy_exclamation_mark: 是不是可以反过来。通过checked的值来更新checkedList。但是checked的值初始为false。需要逻辑更改。

      现在只有e.detail.value是跟随选中状态而checkedList变化。直接点击全选不会导致change事件的变化。

2. 全选框

   绑定isAllSelected属性，我们是通过value值来判断是否被选中。被选中就改变isAllSelected属性值。true or false。

3. 监听全选框状态：

   属性值为true，即全选激活。复选框要全部选中，即改变每一项checked为true。**但是checkedList没有相应改变**。

   全选不激活，复选框全部不选中，即改变每一项checked为false。

4. 监听复选框状态：

   是为了激活全选框。前提：draftList全部被选中，即checkedList的长度与draftList的一致。



**问题：代码很累赘。自定义导航栏和小程序自带的标题大小不同**

![image-20230128214939467](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230128214939467.png)



#### 草稿箱优化

草稿箱页面和草稿箱编辑页面存在共同之处。

1. 草稿箱页面【draft/index】的数据【是api请求的数据】是要传给草稿箱编辑页【draft/edit/index】的。

   属于两个页面，不是父子组件。即进行 uniapp 中页面传值。应该说是页面通讯。

> 使用页面`uni.$emit uni.$on`传值成功。
>
>    <img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230129185449108.png" alt="image-20230129185449108" style="zoom:67%;" />

```js
// 在 draft/index 页面要将draftList传出去
toEditDraftPage(){
    // 跳转到编辑页面时，将draftList传递过去
    uni.$emit('postDraftList',{draftList:this.draftList})
    uni.navigateTo({
        url:'/pages/mine/draft/edit/index'
    })
}
```

```js
// 在 edit/index 页面接收draftList
onLoad() {
    // console.log(this.draftList)
    // 接收草稿箱页面传递过来的draftList
    uni.$on('postDraftList',(res)=>{
        this.draftList = res.draftList; 
    })

},
onUnload() {
    uni.$off('postDraftList')
},
```

2. 产生异步渲染的问题。页面已经渲染好了，但是传递过来的数组还没赋值。

   :punch:[解决请求异步渲染问题](https://blog.csdn.net/SongXJ_01/article/details/119000120?spm=1001.2101.3001.6650.14&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-14-119000120-blog-122703948.pc_relevant_default&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-14-119000120-blog-122703948.pc_relevant_default&utm_relevant_index=15) : 主要是api请求数据的赋值，用在页面传值无法生效。

   正常逻辑应该是在草稿箱页请求数据，再将请求的数据传递给草稿箱编辑页。**不使用Vuex吗？**  之后进行删除草稿箱信息的时候，也要将删除完之后的数组传递给 草稿箱页。

   [使用本地缓存解决异步渲染问题](https://blog.csdn.net/weixin_45788691/article/details/109069273)

```js
uni.setStorage({
	key: 'storage_key',
	data: 'hello',
	success: function () {
		console.log('success');
	}
});
uni.getStorage({
	key: 'storage_key',
	success: function (res) {
		console.log(res.data);
	}
});
```



> 分别对两个页面进行数据缓存

 <img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230129164542092.png" alt="image-20230129164542092" style="zoom:67%;" />



3. **草稿箱与草稿箱编辑页合二为一**

   “管理”与“完成”按钮要写在下面，不能在自定义导航条上了。

   使用v-show来控制 管理与完成的区别。在同一个页面上避免了信息的传递，其次使用的是同一个列表。因此可以直接进行编辑删除。

4. 对草稿编辑日期：

```js
// 将时间戳转换为时间
export function changeToDate(timestamp) {
	// 默认这个参数是毫秒级别的时间戳
	let newDate = new Date(timestamp).toLocaleDateString().replace(/\//g, "-") + " " +
		new Date(timestamp).toTimeString().substr(0, 8);
	// 这个时间的形式是：2023-1-1 08:00:00
	return newDate;
}

// 判断是否属于一月之内的时间戳,只需相差时间戳即可
export function oneMonth(timestamp) {
	return Date.now() - timestamp < 60 * 60 * 24 * 30 * 1000;
}

// 判断三天之内和之外的不同时间描述
// 同一天：new Date().toDateString() === new Date(timestamp).toDateString()
export function diffDays(timestamp) {
	const diff = Date.now() - timestamp;
	const diffDays = diff / (60 * 60 * 24 * 1000);
	let decription = "";
	if(diffDays<1){
		decription = "今天 "
	}else if(diffDays<2){
		decription = "昨天 "
	}else if(diffDays<3){
		decription = "前天 "
	}else{
		decription = new Date(timestamp).toLocaleDateString().replace(/\//g, "-")+" "
	}
	return decription + new Date(timestamp).toTimeString().substr(0, 8);
}

```

5. 在手机上 `new Date(timestamp).toLocaleDateString().replace(/\//g, "-")+" "` 显示出来的是 Sun Jan 01 2023

```js
// 将时间戳转换为时间
function changeToDate(timestamp) {
	// 转换为Date对象
	let date = new Date(timestamp);
	// 默认这个参数是毫秒级别的时间戳
	let newDate = date.toLocaleDateString().replace(/\//g, "-");
	// 这个时间在开发者工具的形式是：2023-1-1
	// 在手机上预览时出现 Sun Jan 01 2023
	// newDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
	let month = date.getMonth() >= 9 ? date.getMonth() + 1 + "-" : "0" + (date.getMonth() + 1) + "-";
	let day = date.getDate() > 10 ? date.getDate() : "0" + date.getDate();
	newDate = date.getFullYear() + "-" + month + day;
	return newDate;
}
// 最后一个else中
decription = changeToDate(timestamp) + " ";
```

6. 在手机上 button的disabled属性不生效。原因不知。打算给个不同的颜色来区别一下

```html
<u-button text="删除" shape="circle" :color="disabled?'#ccc':'lightBlue'" :disabled="disabled"></u-button>
```

       做完之后感觉是可以生效的，可能是没有刷新

### 1.3 浏览记录页

1. 遇到css省略号的问题：

   ```css
   .content{
       max-width: 11em;          /*设置好容器的宽度，超过这个宽度再作打算*/
       white-space: nowrap;      /*超出容器宽度也不换行*/
       overflow: hidden;         /*超出容器部分隐藏*/
       text-overflow: ellipsis;  /*超出容器部分使用...替代*/
   }
   ```

2. 但是页面要求是 `正文显示限制：只显示10字以内，超出字数以省略号显示` 限制的不是宽度，而是字符个数

   目前我想不到使用 css 来实现。

   2.1 我第一个想法是：在css中将宽度设置为11em。因为em就是一个字符大小。

   2.2 我第二个想法是：在JavaScript中对 `item.content ` 进行编辑，截取为前10个字数，再进行赋值。但是这个时候已经无法被页面               

   ​       进行渲染了。

   2.3 我现在实施的是：直接在 template 中对 `item.content` 进行编辑 。即：`{{item.content.substring(0,10)+'...'}}`

3. 修改为：20个字符以内。采用正则表达式

4. 在浏览记录页中中间使用scroll-view。但是在未填满的情况下也发生了滚动。

   [scroll-view未填满发生滚动，子元素使用了margin](https://blog.csdn.net/u011295864/article/details/114306069)

   [(60条消息) 小程序 scroll-view 出现滚动卡顿解决_pspxuan的博客-CSDN博客](https://blog.csdn.net/pspxuan/article/details/108020985)

5. 只保存一个月内的浏览记录。

   ```js
   // 相差时间戳
   humandate(time1, time2) {
       var s = time1 - time2;
       if (s < 0) {
           s = Math.abs(s);
       }
       if (s > 31536000) {
           return formatDate(new Date(time2 * 1000));
       } else if (s > 2592000) {
           return parseInt(s / 2592000) + '月';
       } else if (s > 86400) {
           return parseInt(s / 86400) + '天';
       } else if (s > 3600) {
           return parseInt(s / 3600) + '小时';
       } else if (s > 60) {
           return parseInt(s / 60) + '分钟';
       } else {
           return parseInt(s) + '秒';
       }
   }
   ```

   [(60条消息) JS计算两个时间戳相差月数、天数、时数、分钟、秒数_royal-的博客-CSDN博客_js 根据两个时间戳判断中间间隔多少天](https://blog.csdn.net/qq_46003166/article/details/106057558)

   [(60条消息) JS-计算日期差值；计算日期之间的月数_雪心玉竹的博客-CSDN博客_js计算两个日期之间的月数](https://blog.csdn.net/rongxiang111/article/details/81346320#:~:text=%2F%2F返回 两个日期 相差的 月数 function MonthsBetw (date1%2C date2),parseInt (date1)%2C m... JS计算两个 时间相差分钟 数 的方法示例 10-18)

   [(60条消息) JavaScript 获取指定日期到今天的相差天数_Nick_Monkey的博客-CSDN博客](https://blog.csdn.net/Nick_Li_/article/details/86508608)

   [(60条消息) JS判断两个时间戳是否为同一天_我姓王的博客-CSDN博客_js判断两个日期是否是同一天](https://blog.csdn.net/qq_37634366/article/details/114886660)

   [(60条消息) 5种获取JavaScript时间戳函数的方法_普通网友的博客-CSDN博客](https://blog.csdn.net/snsHL9db69ccu1aIKl9r/article/details/122592650)

   [JavaScript 时间戳转换日期格式 | 菜鸟教程 (runoob.com)](https://www.runoob.com/w3cnote/js-timestamp2date.html)

    ![image-20230211121817560](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230211121817560.png)

   

### 1.4 匿名身份页

1. 删除匿名身份

```js
// 删除匿名身份
deleteIdentity(id) {
    for (let i = 0; i < this.identityList.length; i++) {
        let item = this.identityList[i];
        if (item.id === id) {
            uni.showModal({
                title: "警告",
                content: `是否要删除“${item.name}"这个匿名身份`,
                success: (res) => {
                    if (res.confirm) {
                        this.identityList.splice(i, 1);
                        i--;
                    }
                }
            })
        }
    }
},
```



2. upload的样式更改

```html
<view class="avatar">
    <u-avatar :src="item.avatar" shape="circle" size='80rpx'
              default-url="https://img.zcool.cn/community/01460b57e4a6fa0000012e7ed75e83.png@1280w_1l_2o_100sh.png">
    </u-avatar>
    <!-- 编辑图标 -->
    <view class="editIcon">
        <u-upload width="40rpx" height="40rpx" previewFullImage @afterRead="afterRead">
        </u-upload>
    </view>
</view>
```

```scss
.info {
    display: flex;
    align-items: center;
    justify-content: start;
    padding: 10rpx 0;

    .avatar {
        padding: 0 20rpx;
        position: relative;

        .editIcon {
            position: absolute;
            right: 10rpx;
            bottom: -10rpx;

            /deep/.u-upload__button {
                margin: 0;
                border-radius: 50%;
                background-color: #f8f8f8;
            }

            /deep/.u-upload span {
                font-size: 32rpx;
                color: #000;
            }
        }
    }

```



## 知识点

1. 对封装好的组件的样式进行修改，比如说 **view-ui **或 **element-ui **等等。

 ![image-20230208104911232](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230208104911232.png)

其实就是希望这个upload上传组件的样式得到改变。但是使用  `.u-upload` 是无法定位到的。 所以可以使用`/deep/`强制更新。

2. [Vue实战：文件上传组件 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/267683616) 希望有时间可以看一下

3. 微信小程序登录 [(60条消息) 微信小程序获取用户信息（getUserProfile接口回收后）——通过头像昵称填写获取用户头像和昵称_小野oo的博客-CSDN博客_getuserprofile](https://blog.csdn.net/m0_58440770/article/details/128005824?spm=1001.2101.3001.6650.2&utm_medium=distribute.pc_relevant.none-task-blog-2~default~CTRLIST~Rate-2-128005824-blog-127786640.pc_relevant_recovery_v2&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2~default~CTRLIST~Rate-2-128005824-blog-127786640.pc_relevant_recovery_v2&utm_relevant_index=5)

4. 正则表达式：[正则表达式同时匹配中英文_，还控制长度](https://blog.csdn.net/dl020840504/article/details/8880603)

  [限制输入框30个字符/字节或15个汉字等等 - 掘金 (juejin.cn)](https://juejin.cn/post/6931690539960139790)

  [input输入框限制20个字符，十个汉字 - FEDeveloper - 博客园 (cnblogs.com)](https://www.cnblogs.com/yzhihao/p/7422432.html)

  ASCII编码包括：控制字符，专用字符，大小写字母，标点，运算。

```sh
0～31及127(共33个)是控制字符或通信专用字符（其余为可显示字符）
如控制符：LF(换行)、CR(回车)、FF(换页)、DEL(删除)、BS(退格)、BEL(响铃)等；
通信专用字符：SOH（文头）、EOT（文尾）、ACK（确认）等；
ASCII值为8、9、10 和13 分别转换为退格、制表、换行和回车字符。它们并没有特定的图形显示，但会依不同的应用程序，而对文本显示有不同的影响 [1]  。

32～126(共95个)是字符(32是空格)，其中48～57为0到9十个阿拉伯数字。

65～90为26个大写英文字母，97～122号为26个小写英文字母，其余为一些标点符号、运算符号等。
```



## 笔记

改动：1. mine/index 添加了登录热区以及登录方法

2. 进入学校认证页面
3. history/index 添加无内容提示，设置scroll-view无充满不滚动
4. draft/index 删除管理完成按钮改为长按触发，底部固定栏添加完成按钮
5. 浏览记录页也应该设置页面不滚动
