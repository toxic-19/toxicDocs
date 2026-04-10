## 1. 参考链接

1. 官网：https://www.eggjs.org/zh-CN/intro/quickstart
2. B站视频：[打开bilibili，观看网课😀](https://www.bilibili.com/video/BV1s3411C71V/?spm_id_from=333.337.search-card.all.click&vd_source=fd483034c51a8aa4f43cf44d83bc54a0)



## 2. 初始化

**项目目录结构：**

 ![image-20240714174307073](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/202407141743153.png)

1. app 是开发工作目录
2. config 文件夹中是放配置和插件等的
3. test 是存放单元测试的目录 😀



**比较：**

> 相对于 Express / Koa 框架：
>
> 1. Egg.js 是符合MVC模式的，使用控制层、服务层、视图层等
> 2. 拥有扩展机制、创建机制；多线程管理；HTTPClient集成。



**运行脚本：**

```json
"scripts": {
  "start": "egg-scripts start --daemon --title=egg-server-init-egg-project",
  "stop": "egg-scripts stop --title=egg-server-init-egg-project",
  "dev": "egg-bin dev",
},
```

开发中是使用`dev`，拥有监视、热更新机制。

在开发完成之后使用的是`start`命令，以服务的形式运行，不会占用终端。停止服务的时候需要使用命令 `npm run stop`



## 3. 接口

### 3.1. Get

传参分为 自由传参即为query参数；和严格传参即为params参数

```js
  async index() {
    const { ctx } = this;
    ctx.body = ctx.query;
    /* query参数 -- 自由传参模式
     * 紧接着接口后的问号?
     * 如 http://127.0.0.1:7001/?query=111
     * 返回的query即为{query: '111'} 拿到的默认是字符串
     */
  }
```

**严格传参模式**：需要在路径声明时一起确定传递的参数

```js
router.get('/:name/:age', controller.home.index) // 此时路由传递name和age两个参数 多传或者少传都会报错 404NotFound
/* 使得ctx.body = ctx.params
 * 传递接口路由为：http://127.0.0.1:7001/amy/19
 * 返回的值为{"name":"amy","age":"19"}
 */
```



### 3.2. Post

> 会报错 **安全威胁 csrf 的防范**
>
> 需要在 `config.local.js`中配置

```js
  // 避免CSRF跨域导致的问题
  config.security = {
    csrf: {
      enable: false,
    },
    domainWhitelist: [ 'http://127.0.0.1:7001' ], // 主要还是要配置这个白名单，只配置enable是不够的无法生效。
  }
```

```js
  async add() {
    const { ctx } = this;
    ctx.body = {
      code: 200,
      data: ctx.request.body,
    }
  } // 记得要在router.js中声明路由
```



可以下载插件 `REST Client`：然后在文件 `project.http` 中编写请求：

```http
POST http://127.0.0.1:7001/add
Content-Type: application/json

{
  "name": "hello world Post Http Request",
  "age": 1
}
```

### 3.3. 配合Service

1. 在`app`目录下创建`service`文件夹。创建与``controller`中的同名`js`文件。

```js
// 文件名 service/home.js
'use strict';

const Service = require('egg').Service;

class HomeService extends Service {
  getInfo(dataDto) {
    return {
      code: 200,
      data: dataDto,
    };
  }
}

module.exports = HomeService;
```

2. 在`controller`中调用：

```js
// 文件名 controller/index.js
async add() {
  const { ctx } = this;
  ctx.body = ctx.service.home.getInfo(ctx.request.body); // 直接从上下文的service目录下找home.js
}
```



## 4. `EJS`模板

> 简单介绍：
>
> 1. `EJS`是`Embedded JavaScript`的缩写。是通过在HTML内容写JavaScript代码来进行HTML模板的渲染。
> 2. 可以不破坏HTML文档结构的情况下去渲染。

官网链接：https://ejs.bootcss.com/

安装 `npm i egg-view-ejs --save --registry=https://registry.npmmirror.com`

配置：

1. 在`plugin.js`中注册插件

```js
exports.ejs = {
  enable: true,
  package: 'egg-view-ejs',
};
```

2. 在`config.local.js`中配置：

```js
config.view = {
  mapping: {
    '.html': 'ejs',
  },
};
config.ejs = {};
```

3. 准备工作：在`app`下创建`view`文件夹，存放`html`文件
4. 发送Get请求：

```js
async page() {
  const { ctx } = this;
  await ctx.render('home.html'); // 该home.html是view文件夹下存放的
}
// 声明路由：一般是get请求
router.get('/page', controller.home.page); // 服务器端渲染！
```

5. 这样就可以通过 http://127.0.0.1:7001/page 去访问了。

### 4.1 渲染数据

```js
// controller或者service
async page() {
  const { ctx } = this;
  await ctx.render('home.html', {
    id: 'EJS',
    content: 'the first time using EJS',
    time: '2024年7月18号',
    subjects: [ '数学', '语文', '英语', '物理', '化学', '生物', '地理', '历史', '政治' ],
  });
}
// 向html页面中传递三个参数 id content time
```

```html
<!-- 在html中接收 使用固定语法-->
<!-- 语法：<%= key%> -->
<!-- 该html页面可以不需要写 html标签和body标签。可以只写以下代码 -->
<ul>
  <li><%= id%></li>
  <li><%= content%></li>
  <li><%= time%></li>
</ul>
```

**接收数组，进行循环：**

其实是JavaScript使用`<%` 和`%>`包起来。涉及到需要使用变量的时候就使用 `<%= %>`

```ejs
<ul>
  <% for (var i = 0; i < subjects.length; i++) { %>
  	<li><%= subjects[i]%></li>
  <% } %>
</ul>
```

### 4.2. 嵌入`html`页面

同样使用`<% include xxx.html %>`模板

但是被嵌入的那个页面必须是完整的`html`代码页面

这部分有问题，我暂时不看了。主要是做服务端渲染的

## 5. Cookie

在该`html`文件中书写点击事件：必须使用`onclick`且该绑定的事件需要加括号`()`

```html
<button onclick="add()">add cookie</button>
<button onclick="del()">del cookie</button>
<button onclick="update()">update cookie</button>
<button onclick="get()">get cookie</button>
```

在该`<script>`脚本中可以直接调用`route.js`中路由模块的接口。

### 5.1. 增删改查

```js
ctx.cookies.set('cookie', 'egg'); // 增加Cookie
ctx.cookies.set('cookie', null); // 设置为null即为删除
ctx.cookies.set('cookie', 'egg-update'); // 修改Cookie的值
ctx.cookies.get('cookie'); // 获取Cookie的值
```

### 5.2. Cookie配置和加密

```js
ctx.cookies.set('cookie', '鸡蛋', {
  maxAge: 1000 * 60,
  httpOnly: true,
  encrypt: true,
});
ctx.cookies.get('cookie', {
  encrypt: true,
}),
```

1. `maxAge`：设置`cookie`的生命周期，此时为2s，就会自动删除

2. `httpOnly`：是否只能服务器设置。防止在浏览器设置Cookie从而逃避登录的权限控制。

3. `encrypt`：`cookie`的设置是不允许中文的，但是设置了`encrypt`就可以进行加密，就可以设置

   在获取Cookie的时候也要加入该配置，否则无法获取到该Cookie的值。

 ![image-20240728155336023](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/202407281553176.png)

## 6. Session

### 6.1. 存储

> 存储在和Cookie一样的位置上。会自动加密。与Cookie不同的时候可以直接支持中文。
>

 ![image-20240728155504677](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/202407281555124.png)

```js
ctx.session.user = {
  name: 'egg',
  age: 18, // 设置之后在Cookie中可以看到加密的user
};
// 获取的时候直接获取，不需要解密
```

 ![image-20240728155902961](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/202407281559004.png)

```js
// add session config in config.default.js
config.session = {
  key: 'EGG_SESS', // session的标识符，在Cookie中存储的键名
  maxAge: 24 * 3600 * 1000, // session的最大存活时间，以毫秒为单位。此时是24小时
  httpOnly: true, // 设置后无法通过浏览器访问该Cookie
  encrypt: true, // 是否进行加密存储提高安全性
  renew: true, // 是否在session快过期的时候自动更新session的过期时间
};
```

## 7. 中间件

> 允许开发者在 <u>请求处理的各个阶段</u> 进行自定义处理和扩展。
>
> 1. 每个中间件都是一个函数,接受两个参数:`ctx`(当前上下文) 和 `next`(传递给下一个中间件的函数)。
>
> 2. 在 `app.js` 文件中,您可以配置中间件的加载顺序和参数。使用`app.use`进行加载。会按照书写顺序进行加载
>
> 3. 中间件可以用于执行各种任务,如日志记录、错误处理、权限验证、响应转换等。
>
>    它们可以修改 `ctx` 对象,并决定是否继续传递给下一个中间件。

声明一个中间件：

```js
// 中间件
module.exports = options => {
  // 返回的方法是异步的方法 接收两个固定的参数 上下文和next函数
  return async (ctx, next) => {
    let counter = ctx.session;
    if (counter) counter++;
    else ctx.session.counter = 1;
    await next();
  };
};
```

在`config.default.js`中声明配置，**即将该中间件进行全局使用**。

```js
// add your middleware config here
config.middleware = [ 'counter' ];
// 不需要引入counter，直接使用即可
```

在使用任意一个接口时，会响应的执行该counter中间件。



**只对指定的接口使用：**

```js
// 首先注释掉config.default.js中的配置
// add your middleware config here
config.middleware = [ ];
// 在router.js中引入
const counter = app.middleware.counter();
// 作为第二个参数传递给接口
router.get('/page', counter, controller.home.page);
```

这样只有在调用`/page`路由的时候才会触发中间件`counter`

## 8. extend

> 必须写在 `app` 文件夹下的 `extend` 文件夹下。
>
> 比如需要扩展的是application，那么该`extend`文件夹下必须是`application.j`

### 8.1. application

> 对 application 这个全局对象的扩展