---
title: 04. VueX
date: 2022-12-8
tags:
 - vue
categories:
 - 前端
sidebar: 'auto'
---


## 1. 前言
### 1.1 使用Vuex 统一管理状态的好处
> ① 能够在vuex 中集中管理共享的数据， 易于开发和后期维护
> ② 能够高效地实现组件之间的数据共享提高开发效率
> ③ 存在vuex中的数据都是响应式的，能够实时保持页面和数据的同步

### 1.2 数据前提
> **什么样的数据才适合存储在Vuex中?**

只有实现组件之间互相通信的数据，即该数据是组件之间共享的。

## 2. 基本使用
### 2.1 下载vuex
```javascript
npm install vuex --save   // 有时会因为版本号报错   vue2只能使用vuex3 vue3可以使用vuex4
```
### 2.2 导入并使用vuex
```javascript
import Vue from 'vue'
import Vuex from 'vuex'
// 将vuex插件安装到vue上 
Vue.use(Vuex)
// 创建一个store对象，并导出
const store = new Vuex.Store({
  state:{},
  getters:{},
  mutations:{},
  actions:{},
  modules:{}
})
export default store;
```
### 2.3 挂载到vue实例上
```javascript
// 将上面导入并使用vuex的文化导入 
import store from './store'
// 将导入的store实例【共享数据对象】挂载到vue实例上，
// 即可在全局使用$store对象 来获取store中的数据
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
```
## 3. 核心概念
### 3.1 state
> state提供唯一的数据源，所有共享数据都要统一存放到state中进行存储
> **重点️️️️️️️️️：state中的数据不可以被直接更改，只能通过mutation来变更数据**

#### 访问state中数据的方式：
①  **直接访问**
```vue
this.$store.state.全局数据名称  //可以直接使用插值语法进行访问
```
②  **使用mapState函数**
> **mapState函数作用：将当前你所需要的全局数据，通过mapState映射为该组件的计算属性。**
> **展开运算符：映射**

```javascript
// 导入vuex中的mapState函数  
import {mapState} from "vuex"
export default{
  computed:{
    // 比如你需要 使用到state中的count 就将其映射为计算属性
    ...mapState(["count"])                        
  }                           
}
```
### 3.2 mutation
> ① 用于变更state中的数据
> ② 可以集中观察数据的变化

#### 触发mutation的方式：
① 直接访问：commit
```vue
this.$store.commit("mutation中定义的方法")
this.$store.commit("mutation中定义的方法",传递的参数)
```
② 使用mapMutations函数
> 调用mapMutations函数，将当前所需要的更改state中数据的mutation函数映射为当前组件的
> methods方法。

```javascript
//  导入vuex中的mapState函数  
import {mapMutations} from "vuex"
export default{
  methods:{
    // 比如你需要 更改到state中的数据 就将其映射为方法，绑定到view里面直接进行使用
    // 或者在别的方法中使用 this.add();this.plus()这样使用
    ...mapMutations(["add","plus"])                        
  }                           
}
```
> mutation在处理异步操作的时候，页面会发生改变，但是vuex中的数据保护发生改变。

### 3.3 Action
> Action 用于处理异步任务。
> 如果要通过异步操作来变更数据，一定要通过action 触发mutation来更改数据。
> action不能直接变更数据，mutation不能执行异步操作。

```javascript
// 其他组件调用Mutation的方法this.$store.commit('xxx')
mutations: {
  SET_NAME: (state, userName) => {
    state.userName = userName
  }
},

// 其他组件调用Action方法需使用this.$store.dispatch('xxx')
actions: {
  // 异步操作必须在actions 通过异步操作变更数据必须在actions中commit mutations中的函数。
  updateUserName({commit}, newName) {
    commit("SET_NAME", newName)
  }
},
```
#### 触发actions的方式：
① 直接访问：
```javascript
this.$store.dispatch("actions中的函数",或者携带参数) // 参数可能是传递给mutations
```
② 使用mapActions函数访问
```javascript
//  导入vuex中的mapState函数  
import {mapActions} from "vuex"
export default{
  methods:{
    // 如果你需要执行一个异步操作之后才能更改数据，必须调用actions的函数
    // 或者在别的方法中使用 this.add();this.plus()这样使用
    // 将当前你所需要的 通过mapActions映射到当前组件的methods
    ...mapActions(["add","plus"])                        
  }                           
}
```
### 3.4 Getter
> Getter 用于对Store 中的数据进行加工处理形成新的数据。类似于vue中的计算属性

#### 触发Getters的方式
① 直接访问
```javascript
// 通过属性来访问
this.$store.getters.getter属性名称
// 通过方法来访问
this.$store.getters.getTodoById(2)
```
```javascript
getTodoById: (state) => (id) => {
  return state.todos.find(todo => todo.id === id)
}
// 用来实现对store中数据的查询
```
② 使用辅助函数mapGetters来访问
```javascript
import { mapGetters } from 'vuex'

export default {
  computed: {
  // 使用对象展开运算符将 getter 混入 computed 对象中 和state中使用辅助函数是一致的
    ...mapGetters([
      'doneTodosCount',
      'anotherGetter',
      // ...
    ])
  }
}
```
## 4. 公共配置
### 4.1 .prettierrc
```vue
{
  "semi":false,     // 格式化的时候取消 双引号 改为单引号
  "singleQuote":true
}
```
## 5. ToDo案例
### 5.1 Ant-Design-Vue使用
**网址：**[**https://www.antdv.com/docs/vue/getting-started-cn**](https://www.antdv.com/docs/vue/getting-started-cn)
> 我使用按需导入。但是下载babel-plugin-import配置会导致报错。所以在antd.js文件中直接导入css

```javascript
import Vue from "vue";
import "ant-design-vue/dist/antd.css";
import {
  Button,
  Icon,
  Input,
  List,
  Checkbox,
  message
} from "ant-design-vue";

Vue.use(Button);
Vue.use(Icon);
Vue.use(Input);
Vue.use(List);
Vue.use(Checkbox);
Vue.prototype.$message = message;
```
> 之后在main.js 中导入，即可使用组件库

```javascript
import "./ui/antd.js"
```
### 5.2 案例步骤
 ![image.png](https://cdn.nlark.com/yuque/0/2022/png/32615238/1664818104742-c3b7fb7a-61c0-4482-8ad1-8d139ed330f8.png)
#### 5.2.1  axios使用获取列表
> 将list组件中所渲染的list数组对象 变为可动态绑定的数据。创建文件list.json

```json
[
  {
    "id": 0,
    "info": "Racing car sprays burning fuel into crowd.",
    "done": true
  },
  {
    "id": 1,
    "info": " Japanese princess to wed commoner.",
    "done": false
  },
  {
    "id": 2,
    "info": "Australian walks 100km after outback crash.",
    "done": true
  },
  {
    "id": 3,
    "info": "Man charged over missing wedding girl.",
    "done": false
  },
  {
    "id": 4,
    "info": "Los Angeles battles huge wildfires.",
    "done": false
  }
]
```
> 获取list.json 存于vuex库中为list数组
> 由于 axios请求是异步请求，所以在index.js中的actions进行请求  

```javascript
state: {
  list: [],
},
mutations: {
  // 3. 定义initList 将传过来的参数赋值给 list
  initList(state, list) {
    state.list = list;
  },
}
actions: {
    //  1. 调用异步操作
    getList(context) {
      axios.get("/list.json").then(({ data }) => {
        console.log(data);
        // 2. 更改state的数据 必须通过mutations
        context.commit("initList", data);
      });
    }
  },
```
#### 5.2.2   添加事件项

1. 要获取到 输入框的 value 值，因为要将该value值添加到 list 中，所以也应该存储于vuex的state中
```javascript
// vue中监听文本框内容的变化
handleInputChange(e) {
  // 更改文本框内容 为state中的inputValue 重新赋值
  this.changeInputValue(e.target.value);  // changeInputValue是vuex的mutations
}

// index.js中
state:{
  inputValue:''
}
mutations:{
  changeInputValue(state, value) {
  	state.inputValue = value;
	}
}
```

2. 点击按钮添加事件项 id自增  info为文本框内容 done默认为false
3. id自增：每添加一个list中的对象，就使 nextId ++；
```javascript
// 添加事件项
addItemToList() {
  // trim 去除前后空格
  if (this.inputValue.trim().length <= 0) {
    return this.$message.warning("文本框内容不能为空");
  }
  // 文本框不为空的话，就直接 提交给 addItem
  this.$store.commit("addItem");
}

// index.js中的state 设置 id为自增 添加state值 nextId,
// index.js中的mutations
mutations:{
  addItem(state) {
    // 定义一个新增对象
    const obj = {+
      "id": state.nextId,
      "info": state.inputValue,
      "done": false
    };
    // 将obj 添加到数组中
    state.list.push(obj);
    // 将nextId自增加 inputValue清空
    state.nextId++;
    state.inputValue = "";
  },
}
```
#### 5.2.3   删除事件项

1. 需要获取到该删除项的 id值 ，index索引值
```javascript
// template 中 传实参 item.id 即该项的id值
<a slot="actions" @click="removeItemById(item.id)">删除</a>

// script 中
// 删除事件项 将参数传递给mutations的函数
removeItemById(id) {
  this.$store.commit("removeItem", id);
}
```

2. 通过索引 删除掉list中的该项
```javascript
// index.js 中的mutations
removeItem(state, id) {
  // 首先根据id找到该项的索引
  // findIndex 遍历数组的每一次 直到找到与 所传过来的id一致的 item
  const index = state.list.findIndex(item => item.id == id);
  // 之后把该项从list中移除
  // 删除 index 索引之后的一位 包括自己
  state.list.splice(index, 1);
}
```
#### 5.2.4  计算剩余列表数量
```javascript
getters: {
  // 统计未完成任务的条数
  unDoneLength(state){
    const newList = state.list.filter(item=>item.done === false);
    return newList.length;
  },
}
```
> 在App.vue中使用，将getters函数映射为computed计算属性，可以直接使用插值语法进行渲染

```vue
computed: {
  ...mapGetters(["unDoneLength"])
}
```
#### 5.2.5  清除已完成项目
> 将list过滤掉那些 done 为true 的数组即可 重新赋值给state的list

```vue
<!-- template 中 -->
<a @click="cleanDoneItem">清除已完成</a>
  
// script中
  
// 清除 已完成的任务
cleanDoneItem() {
  // 过滤done 为 true，重新赋值给list
  this.$store.commit("cleanDone");
}

// index.js中的mutations
cleanDone(state){
  state.list = state.list.filter(item => !item.done)
}
```
#### 5.2.6  复选框点击
> 绑定checked 属性为动态的 由list的done值所决定；
> 点击该项复选框 使得done值发生改变 才能使得复选框发生改变。所以需要该项的id值

```html
<!-- 复选框 -->
<a-checkbox 
  :checked="item.done" 
  @change="(e)=>{cbStatusChanged (e,item.id)}">
    {{ item.info }}
</a-checkbox>
```
```javascript
// 更改复选框状态
cbStatusChanged(e, id) {
  // e.target.checked 可以获取到点击的 checked属性  
  // 一点击 虽然一开始没有绑定时，是没有发生变化的，但点击就会使得checked变为true
  const param = {
    id: id,
    status: e.target.checked
  };
  // 需要在 vuex 中 找到list对应的 对象，并将它的 done 改为 e.target.checked
  this.$store.commit("changeStatus", param);
},
```
> 传参id 找到该项。并将该项的 done改为 param.status

```javascript
changeStatus(state, param) {
  // 找到要更改 状态的 对象索引
  const index = state.list.findIndex(item =>
    item.id === param.id
  );
  // 找到
  if(index !== -1){
    // 更改
    state.list[index].done = param.status;
  }
},
```
#### 5.2.7 切换高亮状态
> 1. 为每一个按钮命名一个属性。设置为公共属性

```javascript
state: {
  viewKey:'all'
},
```
> 2. 为一个按钮绑定事件，传参不同的key值来区分。
> 3. 点击该按钮，传参给vuex，更改viewKey值。
> 
  实现效果：一点击该按钮，vuex中的viewKey值会随之改变。

```html
<a-button-group>
  <a-button  @click="changeBtn('all')">全部</a-button>
  <a-button  @click="changeBtn('undone')">未完成</a-button>
  <a-button  @click="changeBtn('done')">已完成</a-button>
</a-button-group>
```
```javascript
// 更改 footer按钮的 高亮
changeBtn(key) {
  // 将 key 存为state中 ，根据state中的key值来更改 高亮的状态
  this.$store.commit("changeViewKey", key);
}

// index.js中的mutations
changeViewKey(state,key){
  state.viewKey = key
}
```
 ![image-20221206235427078](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20221206235427079.png)
> 4. 使用三元运算符 ： 若当前是 符合该属性 就为高亮 不符合就不高亮
> 
  动态绑定type  :type="viewKey==='all'?'primary':'default'"：viewKey值为all 就高亮

```html
<a-button-group>
  <a-button :type="viewKey==='all'?'primary':'default'" @click="changeBtn('all')">全部</a-button>
  <a-button :type="viewKey==='undone'?'primary':'default'" @click="changeBtn('undone')">未完成</a-button>
  <a-button :type="viewKey==='done'?'primary':'default'" @click="changeBtn('done')">已完成</a-button>
</a-button-group>
```
#### 5.2.8 切换完成状态
> 完成5.2.7的高亮状态之后，实际上list表是没有任何变化的。因为没有更改list的值

1. 要通过viewKey的值来筛选 list的值。
2. 如果我们直接使用filter方法过滤是不可以的，因为该方法会改变原数组。
3. 点击下一个按钮的时候，只能从过滤过的数组进行筛选。而不是在list中进行筛选。
4. 所以我们需要一个过渡数组 即infoList来通过done值的不同，从list过滤之后赋值给infoList
```javascript
  getters: {
    infoList(state){
      if(state.viewKey==='all'){
        return state.list;
      }
      if(state.viewKey==='undone'){
        return state.list.filter(item=>!item.done)
      }
      if(state.viewKey==='done'){
        return state.list.filter(item=>item.done)
      }
      return state.list;
    }
  }
```
**记得在template中渲染 list的时候要改为 infoList**

 <img src="https://cdn.nlark.com/yuque/0/2022/png/32615238/1664818136829-ec3f88c6-aee3-41f7-894c-f0ed40eafa72.png" alt="image.png" style="zoom:50%;" /><img src="https://cdn.nlark.com/yuque/0/2022/png/32615238/1664818153997-a9e87a75-11d7-4646-b228-12d4ea8aafd3.png" alt="image.png" style="zoom: 67%;" /><img src="https://cdn.nlark.com/yuque/0/2022/png/32615238/1664818177377-45e41492-5d8c-4612-ac56-6a91df4a7f99.png" alt="image.png" style="zoom:80%;" />

### 5.3 素材
#### 5.3.1 关于antd.js按需导入的全部组件：参考 [GitHub链接](https://github.com/vueComponent/ant-design-vue/blob/master/components/index.js) [CSDN链接](https://blog.csdn.net/baidu_39169957/article/details/120796112)
```javascript
import Vue from 'vue'
import Antd from 'ant-design-vue'
 
const {
  Affix,
  BackTop,
  ConfigProvider,
  Layout,
  Input,
  InputNumber,
  Pagination,
  Button,
  Switch,
  Radio,
  Checkbox,
  Select,
  Card,
  Form,
  Row,
  Col,
  Modal,
  Table,
  Tabs,
  Icon,
  Badge,
  Popover,
  Dropdown,
  List,
  Avatar,
  Breadcrumb,
  Steps,
  Spin,
  Menu,
  Drawer,
  Tooltip,
  Alert,
  Tag,
  Tree,
  TreeSelect,
  Divider,
  DatePicker,
  TimePicker,
  Carousel,
  Upload,
  Progress,
  Skeleton,
  Popconfirm,
  message
  notification,
  Spin
} = Antd
 
Vue.use(Affix)
Vue.use(BackTop)
Vue.use(ConfigProvider)
Vue.use(Pagination)
Vue.use(Layout);
Vue.use(Input)
Vue.use(InputNumber);
Vue.use(Button)
Vue.use(Switch)
Vue.use(Radio);
Vue.use(Checkbox);
Vue.use(Select)
Vue.use(Card)
Vue.use(Form)
Vue.use(Row)
Vue.use(Col)
Vue.use(Modal);
Vue.use(Table)
Vue.use(Tabs);
Vue.use(Icon)
Vue.use(Badge);
Vue.use(Popover);
Vue.use(Dropdown);
Vue.use(List);
Vue.use(Avatar);
Vue.use(Breadcrumb);
Vue.use(Steps)
Vue.use(Spin);
Vue.use(Menu);
Vue.use(Drawer)
Vue.use(Tooltip)
Vue.use(Alert);
Vue.use(Tag);
Vue.use(Tree);
Vue.use(TreeSelect);
Vue.use(Divider)
Vue.use(DatePicker)
Vue.use(TimePicker);
Vue.use(Upload);
Vue.use(Progress);
Vue.use(Skeleton);
Vue.use(Popconfirm);
Vue.use(Carousel);
Vue.use(Spin)
 
Vue.prototype.$confirm = Modal.confirm;
Vue.prototype.$message = message
Vue.prototype.$notification = notification
Vue.prototype.$info = Modal.info;
Vue.prototype.$success = Modal.success;
Vue.prototype.$error = Modal.error;
Vue.prototype.$warning = Modal.warning;
Vue.prototype.$form = Form
```
#### 5.3.2 案例素材
[参考链接 CSDN](https://blog.csdn.net/weixin_44747173/article/details/119185883?spm=1001.2014.3001.5502)
> main.js中的代码

```javascript
import Vue from 'vue'
import App from './App.vue'

//1、导入ant-design-vue 组件库
import Antd from 'ant-design-vue'

//2、导入组件库的样式表
import 'ant-design-vue/dist/antd.css'

Vue.config.productionTip = false
//3、安装组件库
Vue.use(Antd)

new Vue({
  render: h => h(App)
}).$mount('#app')
```
> App.vue中的代码

```vue
<template>
  <div id="app">
    <a-input placeholder="请输入任务" class="my_ipt" />
    <a-button type="primary">添加事项</a-button>

    <a-list bordered :dataSource="list" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 复选框 -->
        <a-checkbox>{{ item.info }}</a-checkbox>
        <!-- 删除链接 -->
        <a slot="actions">删除</a>
      </a-list-item>

      <!-- footer区域 -->
      <div class="footer" slot="footer">
        <span>0条剩余</span>
        <a-button-group>
          <a-button type="primary">全部</a-button>
          <a-button>未完成</a-button>
          <a-button>已完成</a-button>
        </a-button-group>
        <a>清除已完成</a>
      </div>
    </a-list>
  </div>
</template>
<script>
export default {
  name: "app",
  data() {
    return {
      list: [
        {
          id: 0,
          info: "Racing car sprays burning fuel into crowd.",
          done: false,
        },
        {
          id: 1,
          info: " Japanese princess to wed commoner.",
          done: false,
        },
        {
          id: 2,
          info: "Australian walks 100km after outback crash.",
          done: false,
        },
        {
          id: 3,
          info: "Man charged over missing wedding girl.",
          done: false,
        },
        {
          id: 4,
          info: "Los Angeles battles huge wildfires.",
          done: false,
        },
      ],
    };
  },
};
</script>
<style scoped>
#app {
  padding: 10px;
}
.my_ipt {
  width: 500px;
  margin-right: 10px;
}
.dt_list {
  width: 500px;
  margin-top: 10px;
}
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>

```
