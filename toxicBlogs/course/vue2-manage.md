---
title: vue2后台管理系统
date: 2023-03-06
tags:
 - 开发总结
categories:
 - 项目
sidebar: 'auto'
---

## 1. 登录

### 1.1. 登录逻辑

 ![image-20230306193102030](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230306193102030.png)

1. 这个`token`是登录成功之后由后端返回的。

```js
// 我们这里使用mock进行模拟,menu数组就不展示出来了。
getMenu: config => {
    const { username, password } = JSON.parse(config.body)
    // 先判断用户是否存在
    // 判断账号和密码是否对应
    if (username === 'admin' && password === 'admin') {
      return {
        code: 20000,
        data: {
          menu: [],
          token: Mock.Random.guid(),
          message: '获取成功'
        }
      }
    }
}
```



2. 然后将该 `token` 存进 `cookie`里边。其后再将其作为接口的请求头，验证判断。

   [js-cookie - npm (npmjs.com)](https://www.npmjs.com/package/js-cookie) ：`A simple, lightweight JavaScript API for handling cookies`

   此时我们使用 `cookie`是为了将获取到的`token`能够跨页面传参，实现不同页面间的通信。

   ```sh
   # 使用npm下载
   $ npm install js-cookie
   ```

   ```js
   // 全局使用
   // main.js
   import jsCookie from 'js-cookie'
   Vue.prototype.$cookie = jsCookie;  // 在页面里可直接用 this.$cookie 调用
   ```

   ```js
   // 按需使用
   import Cookies from 'js-cookie';
   // 有效期为7天
   Cookies.set('key', 'value',{ expires: 7});
   console.log(Cookies.get('key')); // value
   // 注意 : 删除不存在的 cookie 不会报错也不会有返回。
   ```

   :punch: **expires** : 定义有效期。

   如传入Number，则单位为天，也可传入一个Date对象，表示有效期至Date指定时间。默认情况下cookie有效期截止至用户退出浏览器。

   
   

 ![image-20230306203019092](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230306203019092.png)

​		参考 [Vue中 引入使用 js-cookie - 掘金 (juejin.cn)](https://juejin.cn/post/6996697320322498574)



3. 设置全局前置导航守卫。

   ```js
   // main.js
   router.beforeEach((to, from, next) => {
     store.commit('getToken')
     const token = store.state.user.token
     if (!token && to.name !== 'login') {
       next({ name: 'login' })
     } else if (token && to.name === 'login') {
       next({ name: 'home' })
     }else {
       next()
     }
   })
   ```

   ```js
   // main.js中
   // 登录逻辑：我们给系统添加一个登录凭证叫'token'，这个token在登录的时候通过接口请求将用户名和密码传给后端，
   // 后端在数据库中匹配成功后
   // 返回一个凭证，前端再把token缓存起来，再调用接口时传给后端验证时建立了登录权限验证
   
   // 路由访问权限：token值通过localStorage
   // 路由访问权限：token值通过Cookie
   router.beforeEach((to, from, next) => {
     // 防止刷新后vuex里丢失token
     store.commit("getToken");
     // 防止刷新后vuex里丢失标签列表tagList
     store.commit("getMenu");
   
     // 拿到store中的token值
     let token = store.state.user.token;
     // 过滤登录页，因为去登陆页不需要token(防止死循环)
     if (!token && to.name !== "login") {
       next({ name: "login" });
     }
     // 防止重复登录
     else if (token && to.name === 'login') {
       next({ name: 'home' })
     } else {
       next();
     }
   });
   
   ```

   :punch:参考链接：[导航守卫 | Vue Router (vuejs.org)](https://v3.router.vuejs.org/zh/guide/advanced/navigation-guards.html)

![image-20230306221312637](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230306221312637.png)



### 1.2. 模拟后端登录

1. 使用`mockjs`来模拟生成的`token`,当然其他接口的数据需要模拟，但此处的不同账号对应的菜单权限不同。

```js
// 简单来说：
export default {
    getMenu: (config) => {
        return {
            code: 200,
            data:[],
            token: Mock.Random.guid(),
            message: '登录成功'
        }
    }
}
```

:notebook_with_decorative_cover: 这只是根据不同的账号给的不同的菜单权限。

```js
// 登录接口
import Mock from "mockjs";

export default {
  getMenu: (config) => {
    // JSON.parse() 会把一个字符串解析成 JSON 对象。如果字符串正确，那么其将会被解析成一个有效的 JSON，但是这个字符串被检测出错误语法的时候将会抛出错误。
    // 例如：JSON.parse()不允许在末尾添加多余的逗号、JSON 的属性名必须使用双引号......等等。
    const { username, password } = JSON.parse(config.body);
    // JSON.parse(config.body);

    // 判断用户是否存在
    // 判断账号和密码是否对应
    if (username === "admin" && password === "123") {
      return {
        code: 200,
        data: {
          menu: [
            {
              path: "/main/home",
              name: "home",
              label: "首页",
              icon: "s-home",
              url: "Home/Home",
            },
            {
              path: "/main/mall",
              name: "mall",
              label: "商品管理",
              icon: "goods",
              url: "MallManage/MallManage",
            },
            {
              path: "/main/user",
              name: "user",
              label: "用户管理",
              icon: "user",
              url: "UserManage/UserManage",
            },
            {
              label: "其他",
              icon: "location",
              children: [
                {
                  path: "/main/other/page1",
                  name: "page1",
                  label: "页面1",
                  icon: "setting",
                  url: "Other/PageOne",
                },
                {
                  path: "/main/other/page2",
                  name: "page2",
                  label: "页面2",
                  icon: "setting",
                  url: "Other/PageTwo",
                },
              ],
            },
          ],
          token: Mock.Random.guid(),
          message: "获取成功",
        },
      };
    } else if (username === "xiao" && password === "xiao") {
      return {
        code: 200,
        menu: [
          {
            path: "/",
            name: "home",
            label: "首页",
            icon: "s-home",
            url: "Home/Home",
          },
          {
            path: "/main/mall",
            name: "mall",
            label: "商品管理",
            icon: "goods",
            url: "MallManage/MallManage",
          },
        ],
        token:Mock.Random.guid(),
        message:'获取成功'
      };
    }else{
        return{
            code:-999,
            data:{
                message:'密码错误'
            }
        }
    }
  },
};

```

2. `api`定义

```js
import axios from './axios'
// 定义接口
export const getMenu = (data)=>{
    return axios.request({
        url:'/permission/getMenu',
        method:'post',
        data:data
    })
}
```

3. 绑定登录事件

```js
// 登录
login() {
    this.$refs.nameValidateForm.validate(valid => {
        if (valid) {
            getMenu(this.nameValidateForm).then(res => {
                if (res.data.code === 200) {
                    // 通过Mock随机生成一个token数:Random大写
                    const token = Mock.Random.guid();
                    // 通过commit来更改,把随机生成的token值设置给setToken
                    this.$store.commit("setToken", token);
                    
                    this.$router.push({
                        name: "main",
                        params: { name: this.nameValidateForm.username },
                    });
                    
                } else {
                    Message.warning(res.data.data.message);
                }
            });
        }

    })

}
```

### 1.3. 动态菜单数据
