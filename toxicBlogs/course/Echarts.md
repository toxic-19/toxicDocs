---
title: ECharts图表
date: 2023-10-20
categories:	
 - 项目
sidebar: 'auto'
---



参考文档[快速上手 - Handbook - Apache ECharts](https://echarts.apache.org/handbook/zh/get-started/)

根据西餐厅管理系统中的图表进行复习。

## 0. 安装

参考[在项目中引入 ECharts - 入门篇 - Handbook - Apache ECharts](https://echarts.apache.org/handbook/zh/basics/import)

```sh
npm install echarts --save
```

 ![image-20231029153819870](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20231029153819870.png)

**在`utils > ui`中按需导入配置：**

```js
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core'
// 引入各种图表，图表后缀都为 Chart【BarChart柱状图，LineChart折线图，和PieChart饼状图】
import { BarChart, LineChart, PieChart } from 'echarts/charts' // 这里引用两个类型的图表
// 引入提示框，标题，直角坐标系等组件，组件后缀都为 Component
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  ToolboxComponent,
  MarkPointComponent,
  MarkLineComponent
} from 'echarts/components'
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers'

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  BarChart,
  PieChart,
  LineChart,
  CanvasRenderer,
  MarkLineComponent,
  MarkPointComponent,
  ToolboxComponent
])

export default echarts
```

**在`main.js`中全局导入**

```js
import echarts from './utils/ui/echarts5.js' // 引入echarts
Vue.prototype.$echarts = echarts // 全局替换
```





## 1. 圆环图

相对饼图，中间会空出区域用于一些额外信息。

**子组件中饼图的默认配置：`type = 'pie'`**  饼图的`data`最后也是放在`series[0]`里面的。

```js
pieOption: { // 饼图配置
  title: {
    text: "热卖菜品分析报表",
    left: "center",
  },
  tooltip: {
    trigger: "item",
  },
  legend: { // 图例
    orient: "vertical", // 朝向。vertical是垂直方向; horizontal是横向也是默认值。
    left: "left", // 图例组件离容器左侧的距离。
  },
  toolbox: { // 右上角的三个图表三种操作
    show: true,
    feature: {
      mark: { show: true },
      ataView: { show: true, readOnly: false },
      restore: { show: true },
      saveAsImage: { show: true },
    },
  }, 
  series: [
    {
      type: "pie",
      center: ["50%", "50%"], // 圆心的位置。可以取值像素或百分比
      radius: ["40%", "70%"], // 饼图半径。内半径增大就变成圆环图。如果是[0, '70%']就是基础饼图。
      avoidLabelOverlap: false, // 是否启用防止标签重叠策略，默认开启
      itemStyle: { // 图形样式
        // 没有设置color 默认从全局调色盘 option.color 获取颜色。
        borderRadius: 10,
        borderColor: "#fff",
        borderWidth: 2,
      },
      emphasis: { // 高亮状态的扇区和标签样式。
        label: {
          show: true,
          fontSize: 16,
          fontWeight: "bold",
        }
      }
    }
  ]
}
```

 <img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20231028142835571.png" alt="image-20231028142835571" style="zoom:67%;" /><img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20231029014305440.png" alt="image-20231029014305440" style="zoom:67%;" />

父组件中传递的数据和额外配置：

```html
<my-echarts
  type="pie"
  :chart-data="percentageChart.pieData"
  :other-options="percentageChart.pieOption"
  :style-object="{ width: '350px', height: '300px', padding: '20px' }"
>
```

```js
percentageChart: { // 利润全年对比
  pieData: [],
  pieOption: {
    title: {
       text: "全年利润占比",
    },
    series: [
      {
        color: ["#d5def6", "#487560"],
      }
    ]
  }
} 
```

```js
overheadChart: { // 基本开销支出
  pieStyle: {
    width: "680px",
    height: "400px",
    backgroundColor: "rgba(246,143,214,0.18)",
    padding: "20px",
    paddingBottom: "0",
  },
  pieData: [],
  pieOption: {
    title: {
      text: "餐厅基本开销支出分析",
    },
    series: [
      {
        color: [ // 给每一项设置颜色
          "#0c5b8a",
          "#d711a4",
          "#b5e8bd",
          "#35be92",
          "#827f7f",
          "rgba(231,127,15,0.8)",
          "#066c3e",
          "#00208a",
          "#487560",
        ],
        center: ["55%", "55%"], // 饼图的中心（圆心）坐标，数组的第一项是横坐标，第二项是纵坐标。
        // 可以设置像素或百分比
      }
    ]
  }
} 
```

只要将`title`中`text`属性和`series`的`color`属性进行替代原有配置。就能得到定制的圆环图。只有有重复属性都代替掉。

父组件中获取饼图所需的数据：

```js
this.percentageChart.pieData = [
  { value: 88500, name: "全年收入" },
  { value: 41700, name: "全年利润" }
]
this.overheadChart.pieData = [
  { value: 34248, name: "员工工资" },
  { value: 16230, name: "福利支出" },
  { value: 17113, name: "税费" },
  { value: 7343, name: "硬件软件费用" },
  { value: 5173, name: "房屋水电" },
  { value: 2373, name: "推广费" },
  { value: 12373, name: "食材采购费" },
  { value: 1258, name: "通讯宽带费" }
]
```



## 2.  南丁格尔玫瑰图

`roseType`：是否展示成南丁格尔图，通过半径区分数据大小。可选择两种模式`radius` `area`

相对于饼图多了一个`roseType`属性。该属性在`series[0]`下。

```js
pieChart: {
  pieStyle: {
    width: "450px",
    height: "400px",
    background: "rgba(221, 245, 229, 0.4)",
    padding: "20px",
    paddingBottom: "0",
  },
  pieData: [],
  pieOption: {
    title: {
      text: "餐厅收入来源"
    },
    series: [
      { 
        // 没有设置color属性。使用的是默认的随机颜色。
        label: {
          show: false // 饼图图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等。
        },
        roseType: "area" // 圆心角相同，仅通过半径展现数据大小
      }
    ]
  }
}
```

 <img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20231028232644919.png" alt="image-20231028232644919" style="zoom:67%;" />

赋值`pieData`：饼图一般都是 `value-name`的形式。

```js
this.pieChart.pieData = [
  { value: 48, name: "微信" },
  { value: 60, name: "支付宝" },
  { value: 73, name: "现金" },
  { value: 58, name: "银行卡" }
]
```



饼图最后的结果应该：参考[Examples - Apache ECharts](https://echarts.apache.org/examples/zh/editor.html?c=pie-simple)

 ![image-20231029141415441](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20231029141415441.png)

## 3. 柱状图

直角坐标系中拥有`x`和`y`轴。分别是`xAxis`和`yAxis`，与`series`同级。

一般在配置的时候直接设置横轴的类型和代表的类别。比如：

```js
xAxis: [{
  type: "category", // 坐标轴类型。category表示类目轴。有[value, time, log, category]
  data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  // 类目数据，在类目轴（type: 'category'）中有效。
}],
yAxis: [{
  type: "value" // 数值轴，适用于连续数据
}]
```

**子组件中默认配置**：柱状图中的`series`存放的是横纵轴上的数据和配置。是两个对象。

在这里为了省事，直接让数据和配置都在父组件中完成，再传递过来。而不是像饼图一样相同属性覆盖。

```js
barOption: {
  title: {
    text: "Rainfall vs Evaporation", // 主标题
    subtext: "Fake Data" // 副标题
  },
  tooltip: {
    trigger: "axis",
  },
  legend: {
    top: "5%", // 图例组件离容器上侧的距离。
    data: ["", ""],
    // 图例的数据数组。数组项通常为一个字符串，每一项代表一个系列的 name
  },
  toolbox: {
    show: true,
    feature: {
      dataView: { show: true, readOnly: false },
      magicType: { show: true, type: ["line", "bar"] }, // 可以切换为折线图和柱状图
      restore: { show: true },
      saveAsImage: { show: true },
    },
  },
  calculable: true,
  xAxis: [{
    type: "category",
    data: [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ],
  }], 
  yAxis: [{
    type: "value",
  }],
  series: []
}
```

**父组件传递的额外配置**，包括数据和`series`。

```js
barChart: {  // 今去两年收入对比
  barData: [
    {
      name: "去年",
      type: "bar",
      color: ["#72acd1"],
      data: [] // 第一份数据
    }, 
    {
      name: "今年",
      type: "bar",
      color: ["#a62745"],
      data: [] // 第二份数据
    }, 
  ],
  barOption: {
    title: {
      text: "今年与去年存利润对比图",
      left: "left"
    },
    legend: {
      data: ["今年", "去年"]
    },
    xAxis: {
      type: "category",
      data: [
        "1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月","12月"
      ],
    },
    yAxis: {
      type: "value",
    }
  }
}
```

![image-20231029021149715](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20231029021149715.png)

父组件获取的柱状图所需数据：

```js
getBarData() {
  // 两组数据
  const data1 = [
    5222.0, 41313.9, 71113.0, 22313.2, 21215.6, 23376.7, 31315.6, 16212.2,
    32312.6, 22310.0, 6231.4, 13233.3,
  ]
  const data2 = [
    13212.6, 51321.9, 92313.0, 23136.4, 11128.7, 73210.7, 13275.6, 13182.2,
    13248.7, 11328.8, 13236.0, 12332.3,
  ]
  this.barChart.barData.forEach((item, index) => {
    item.data = index === 0 ? data1 : data2 // 分别赋值给barData的xy对象数据
    // 对两组的配置，都要显示max和min以及平均值
    item.markPoint = {
      data: [
        { type: "max", name: "Max" },
        { type: "min", name: "Min" },
      ]
    }
    item.markLine = { data: [{ type: "average", name: "Avg" }] }
  })
}
```

柱状图的最后配置结果应该：参考：[Examples - Apache ECharts](https://echarts.apache.org/examples/zh/editor.html?c=bar1)

  ![image-20231029141541032](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20231029141541032.png)

## 4. 配置

**初始化图表**

```html
  <div
    ref="chart"
    :style="styleObject"
    :chartData="chartData"
    :type="type"
    :otherOptions="otherOptions"
  ></div>
```

```js
// 使用ref拿到dom元素来进行初始化
initChart() {
  this.chart = this.$echarts.init(this.$refs.chart)
  this.setOptions(this.chartData, this.otherOptions) // 填充完整配置
}
```

**子组件中`props`**

```js
  props: {
    styleObject: {
      // 该图表的宽高
      type: Object,
      default: () => {
        return {
          width: "500px",
          height: "400px"
        }
      }
    },
    chartData: {
      // 父组件传递过来的图标数据
      type: Array,
      required: true
    },
    type: {
      // 判断要渲染的图表的类型
      type: String // pie是饼图 line是折线图 bar是柱状图
      required: true
    },
    otherOptions: {
      // 对图表额外的配置
      type: Object
    }
  }
```

根据`props.type`来判断需要使用的是哪个`options`

```js
  computed: {
    lastOptions() {
      // 最终使用的图表配置
      if (this.type === "pie") return this.pieOption
      if (this.type === "bar") return this.barOption
    }
  }
```

**配置：相同属性替代等等**

```js
setOptions(data, otherOptions) {
  let options = {
    ...this.lastOptions
  }
  // 图表数据添加，需要将series属性或者其他同级属性进行覆盖
  if (this.type === "pie") { // 饼图
    for (const key in otherOptions) {
      if (key !== "series") // 比如title。使用对象属性解构，后者覆盖前者
        options[key] = { ...options[key], ...otherOptions[key] }
      if (key === "series") // series是[]。配置主要是在第一个对象中
        options.series[0] = {
          ...options.series[0],
          ...otherOptions.series[0],
        }
    }
    options.series[0].data = data; // 饼图数据在 [{}] 中第一个对象里面的data
  }
  if (this.type === "bar") { // 柱状图
    options.series = data;
    options = { ...options, ...otherOptions };
  }
  this.chart.setOption(options);
}
```

**实时监听`props`的值，进行渲染**

```js
watch: {
  chartData: {
    // 后台获取ECharts数据，监听到变化就重新渲染图表
    handler(val) {
      this.setOptions(val, this.otherOptions);
    },
    deep: true,
  }
}
```

**销毁图表实例：**

```js
beforeDestroy() {
  if (!this.chart) {
    return
  }
  this.chart.dispose() // 释放内部占用的一些资源和事件绑定 无法解除实例的引用
  this.chart = null // 重置为null
}
```

