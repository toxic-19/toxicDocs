---
title: 初始化nest项目
date: 2023-06-09
tags:
 - node
categories:
 - 项目
sidebar: 'auto'
---

## 1. 初始化`nest`项目

1. `Nest `是一个用于构建高效，可扩展的 [Node.js](https://link.juejin.cn?target=http%3A%2F%2Fnodejs.cn%2F) 服务器端应用程序的框架。它使用渐进式 `JavaScript`，内置并完全支持 [TypeScript](https://link.juejin.cn?target=https%3A%2F%2Fwww.tslang.cn%2F)**（但仍然允许开发人员使用纯 JavaScript 编写代码）**并结合了 OOP（面向对象编程），FP（函数式编程）和 FRP（函数式响应编程）的元素。

```sh
# 安装 nest
$ npm i -g @nestjs/cli 

# 查看 nest 版本
$ nest -v

$ nest g --help 或 nest -h # 可以查看所有的快捷命令

# 创建nest项目
$ nest new project-name # 可以使用pnpm作为包管理工具

```

2. 使用快捷键在 `src/module`  下创建`user`模块

```sh
$ nest g co user module # controller
$ nest g s user module  # service
$ nest g mo user module # module
```

 ![image-20230806143019401](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230806143019401.png)

这种方式的创建模块会将`User`模块下的`controller`和`service`和`module`都导入到 `app.module.ts` 中

```ts
// 在userModule 文件中导入该模块的service和controller
// 在app.module.js中就只导入user.module就可以了。
import { Module } from '@nestjs/common';

import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}

```

3. 定义增删改查接口

```ts
import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';

/**
 * 常见的四种请求类型装饰器: Get Post Put Delete
 * 常见的四种参数获取装饰器: Query Param Body Headers
 * 全部都是从@nestjs/common这个包导出
 */
@Controller('user')
export class UserController {
  /**
   * 获取查询字符串, user?limit=5&offset=5
   * @param query
   */
  @Get()
  getUser(@Query() query) {
    return query; // 一般是调用service的方法，service用来查询数据库写业务
    //  { "limit": "5", "offset": "5" }
  }

  /**
   * 获取查询路径参数 user/1
   * @param userId
   */
  @Get(':id')
  getUserById(@Param('id') userId) {
    // path定义的id与Param装饰器的property的id要保持一致
    return userId;
  }

  /**
   * 获取请求体
   * @param user
   */
  @Post()
  createUser(@Body() user) {
    return user;
  }

  /**
   * 通过路径参数userId并获取要更改的user请求体
   * @param user
   * @param userId
   */
  @Put(':id')
  updateUserById(@Body() user, @Param('id') userId) {
    return {
      user,
      userId,
    };
    // { "user": { "name": "jack", "age": 10 }, "userId": "1" }
  }
}
```

## 2. 接口执行流程

+ 管道：数据处理与转换 数据验证
+ 守卫：验证用户登录，保护路由
+ 拦截器：对请求响应进行拦截，统一响应内容
+ 过滤器：异常捕获
+ 装饰器：获取数据，实现守卫

统一在` main.ts `中使用

 ![image-20230806161809892](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230806161809892.png)

### 2.1 中间件

快速生成中间件文件： `nest g mi logger common/middleware`

```ts
// 简单的中间件应用：
import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  /**
   * 自定义中间件
   * @param req 请求参数
   * @param res 响应参数
   * @param next 执行下一个中间件
   */
  use(req: any, res: any, next: () => void) {
    const { method, path } = req;
    console.log(`${method} ${path}`);
    next();
  }
}
```



```ts
// 在app.module.ts 中注册

import { LoggerMiddleware } from './common/middleware/logger.middleware';

export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware) // 中间件全局应用
      .exclude({
        path: '/user',
        method: RequestMethod.POST, // 排除user的post方法
      })
      .forRoutes('user'); // 监听路径
  }
}

```



### 2.2 守卫

快速生成： `nest g gu userGuard common/guards`



### 2.3 拦截器

### 2.4 管道

带上装饰器 `@Injectable()` 并实现了 `PipeTransform` 接口的类，就是管道。

全局管道：`ParseIntPipe`这意味着，在任何路由处理程序中，当您接收到一个需要转换为整数的参数时，该管道将自动尝试将其转换为整数类型。

```ts
// main.ts 中
import { ParseIntPipe } from '@nestjs/common'; // 1. 导入

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 全局使用管道
  // 内置管道：ParseIntPipe 将字符串数字转为数字 ValidationPipe: 验证管道
  app.useGlobalPipes(new ParseIntPipe()); // 2. 全局使用
}
```



 ![image-20230806164028609](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230806164028609.png)



自定义管道： `nest g pi userPipe common/pipes`  在`src`下.

```ts
import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
// 自定义管道必须实现来自 pipeTransform 且需要有一个transform方法
@Injectable()
export class UserPipe implements PipeTransform {
  /**
   *
   * @param value 使用UserPipe所传递的值；可以是Param传递的查询路径参数 也可以是body的请求体
   * @param metadata 元数据 可以判断参数是来自Param还是body
   */
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type === 'body') {
      console.log('来自请求体', value);
    }
    if (metadata.type === 'param') {
      console.log('来自路由路径参数', value);
      const val = parseInt(value, 10);
      console.log(val);
      // 如果传递的不是一个数字，抛出错误
      if (isNaN(val)) {
        throw new BadRequestException('validation failed');
      }
      return val;
    }
    return value;
  }
}
```

局部使用管道：


```ts
@Controller('user')
@UsePipes(new UserPipe()) // 1. 匹配整个/user路径下的路由
export class UserController {
  @Get(':id')
  getUserById(@Param('id', new ParseIntPipe()) userId) {
    // 2. 只匹配该路由获取参数时匹配 使用内置管道
    return userId;
  }
  @Put(':id')
  @UsePipes(new UserPipe()) // 3. 只匹配该接口
  updateUserById(@Body() user, @Param('id') userId) {
    return {
      user,
      userId,
    };
  }
}
```



### 2.5 过滤器



## 3.

### 3.1

### 3.2

### 3.3



## 4.

### 4.1

### 4.2

### 4.3

## 5. `upload` 上传模块

### 5.1 准备

下载依赖：

```bash
yarn add multer
yarn add @types/multer
```

### 5.2

### 5.3



## 6.  项目环境切换

```tsx
await app.listen(3000, () => {
  Logger.log('服务已经启动'); // 启动HTTP侦听器并输出启动提示
});
```

```sh
npm install @nestjs/config # 内部是使用dotenv实现的
```

参考：[技术 (nestjs.cn)](https://docs.nestjs.cn/8/techniques?id=配置)

应用程序通常在不同的**环境**中运行。根据环境的不同应该使用不同的环境配置。

### 6.1 在`App.module.ts`中添加：

```tsx
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
})
```



### 6.2 安装`yarn`

[Yarn 的安装与使用 - 掘金 (juejin.cn)](https://juejin.cn/post/7022086426904756255)

```sh
> npm i -g yarn # 使用npm安装yarn
> yarn config set npmRegistryServer https://registry.npmmirror.com/ # 配置镜像
yarn config v1.22.19
warning package.json: No license field
success Set "npmRegistryServer" to "https://registry.npmmirror.com/".
Done in 0.06s.
```

### 6.3 `nest`快捷键

```sh
> nest -h # help
> nest g co user # controller
> nest g mo user # module
> nest g s user # service
> nest g mi logger # 中间件
> nest g gu role # 守卫
> nest g res product # 生成一个CRUD的API模块
```

  <img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230610173037416.png" alt="image-20230610173037416" style="zoom:80%;" />

### 6.4 `sequelize`集成

```sh
yarn add --save @nestjs/sequelize sequelize sequelize-typescript mysql2
yarn add --dev @types/sequelize
```

### 6.5 `Swagger`

```sh
yarn add --save @nestjs/swagger swagger-ui-express
```



 <img src="../../../../Download/1694769127365.png" alt="http://localhost:3001/doc/1711865017798.jpg" style="zoom: 25%;" />
