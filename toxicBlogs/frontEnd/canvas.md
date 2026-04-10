---
title: canvas
date: 2023-10-20
tags:
 - HTML和CSS
categories:
 - 前端
---

[16个富有创意的HTML5 Canvas动画特效集合 | HTML5资源教程 (html5tricks.com)](https://www.html5tricks.com/16-html5-canvas-animation.html)

## 1. 概念与使用

`Canvas`元素用于图形绘制，通过脚本*JavaScript*来完成。只是一个图形容器，本身并没有绘画能力。

需要在`canvas`标签定义`id`和`width``height`。因为画布是没有边框和内容的。·`id` 是用来脚本的操作。

默认是`300px * 150px`的宽高。颜色默认填充黑色。

**基本使用：**

```js
const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')
context.fillStyle = '#FF0000'
context.fillRect(100, 100, 200, 100) // (x, y, width, height) 绘制一个填充的矩形
context.strokeRect(100, 100, 200, 100) // 绘制一个矩形的边框 
// clearRect清除一块区域变透明
```



**直线：**  `strokeStyle`：线条样式（颜色）   `lineWidth`：线条宽度

```js
context.moveTo(100, 100) // 定义起点坐标
context.lineTo(300, 200) // 定义终点坐标
context.stroke() // 连线
```



**折线：**

```js
// lineTo 可以连续定义转折点
context.moveTo(100, 100) // 起点
context.lineTo(300, 200) // 转折点1
context.lineTo(100, 300) // 转折点2
context.stroke() // 连续
```

也可以通过两个直线

```js
context.moveTo(100, 100) // 定义起点坐标
context.lineTo(300, 200) // 定义终点坐标
context.stroke() // 此时是一条直线
context.lineTo(100, 300) // 以上一条直线的终点为起点，进行连线
context.stroke()
```



**三角形：**

```js
// 1. 最后一条线回到原点。然后描边
context.moveTo(100, 100) // 起点
context.lineTo(300, 200) // 转折点1
context.lineTo(100, 300) // 转折点2
context.lineTo(100, 100) // 回到起点形成闭合
context.stroke()
```

```js
// 2. 绘制一条path 然后拿到三个点后进行闭合路径
context.beginPath()
context.moveTo(100, 100) // 起点
context.lineTo(300, 200) // 转折点1
context.lineTo(100, 300) // 转折点2
context.closePath() // 闭合路径
context.stroke() // 连线

context.fill() // 如果没有闭合路径，但是填充了也看不出来没有闭合。还是可以看出是三角形的
```



**使用线性渐变：**

 那么`stokeStyle`的属性值为 `CanvasGradient`对象。

```js
let gradient = context.createLinearGradient(0, 0, 400, 300)
gradient.addColorStop(0, 'red') // 添加起始位置的颜色，中间渐变
gradient.addColorStop(1, 'blue')
// 再设置线条样式为渐变对象
context.strokeStyle = gradient
```



**使用径向渐变：**

```js
let gradient = context.createRadialGradient(100, 100, 20, 100, 100, 80)
gradient.addColorStop(0, 'red')
gradient.addColorStop(1, 'blue')
context.fillStyle = gradient
context.fillRect(0, 0, 200, 200)
```

 <img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20231022173703346.png" alt="image-20231022173703346" style="zoom:70%;" />![image-20231028013432399](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20231028013432399.png)   <img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20231023010229445.png" alt="image-20231023010229445" style="zoom: 50%;" /><img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20231023011605148.png" alt="image-20231023011605148" style="zoom:64%;" /><img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20231023013000827.png" alt="image-20231023013000827" style="zoom:80%;" />



**重复元图像：**

```js
let image = new Image()
image.src = 'https://www.w3school.com.cn/i/lamp.gif'
image.onload = function() {
    let p = context.createPattern(image, 'repeat')
    context.fillStyle = p
    context.fillRect(0, 0, 200, 200)
}
// 尝试使用页面上的已有的DOM元素进行填充，但是不行
```



**折线的转折点样式：**

其他属性值可看MDN：[CanvasRenderingContext2D: lineJoin property - Web APIs | MDN (mozilla.org)](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineJoin)

```js
context.lineCap = 'round' // 首尾
context.lineJoin = 'round' // 转折点
```

不一定折线。直线使用`lineCap`就相当于拥有`border-radius`

 ![image-20231031140610587](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20231031140610587.png)



**圆弧：**

弧度（θ度角）=（θ / 180）* π。即：`θ * Math.PI / 180`

```js
context.arc(100, 100, 40, 0, 90 * Math.PI / 180, true) // 从0到90度的逆时针的一个圆弧。false就是顺时针
context.stroke()
```



**椭圆：**

```js
context.beginPath()
context.ellipse(300, 230, 30, 60, Math.PI / 2, 0, 2 * Math.PI)
// 第五个参数是：整个椭圆旋转的角度是180度
// 第6和7是：起始弧度和终止弧度，顺时针和逆时针省略
context.stroke()
```

如果`radiusX`小于`radiusY`，那么在不旋转椭圆的情况下，椭圆是竖着的，相反则是横着的。



**笑脸：**

```js
const canvas = document.getElementById('myCanvas')
const context = canvas.getContext('2d')

context.arc(300, 200, 180, 0, 2 * Math.PI) // 画出大圆作为笑脸
context.stroke()
let gradient = context.createRadialGradient(210, 110, 80, 270, 180, 260)
// 径向渐变需要x和y的圆心在同一个位置。不同的半径即可。
gradient.addColorStop(0, 'yellow')
gradient.addColorStop(1, 'red')
context.fillStyle = gradient // 给笑脸添加颜色
context.fill() // fill方法默认是黑色，如果需要修改，需要对fillStyle进行赋值。

context.beginPath()
context.arc(230, 130, 40, 0, 2 * Math.PI)
context.stroke()

context.beginPath()
context.arc(370, 130, 40, 0, 2 * Math.PI)
context.stroke()

context.beginPath()
context.ellipse(300, 230, 50, 30, Math.PI / 2, 0, 2 * Math.PI)
context.stroke()

context.beginPath()
context.arc(300, 220, 130, 0, Math.PI)
context.stroke()
```

 <img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20231023162337557.png" alt="image-20231023162337557" style="zoom:67%;" />

**阴影：**

```js
context.shadowBlur = 4 // 阴影模糊程度
context.shadowColor = '#333333'
context.shadowOffsetX = 4 // 偏移程度
context.shadowOffsetY = 4
```

**贝赛尔曲线：**

[用canvas绘制一个曲线动画——深入理解贝塞尔曲线 - 掘金 (juejin.cn)](https://juejin.cn/post/6844903544181506055)

```js
// 二阶贝赛尔曲线
context.moveTo(100, 200) // 起始点坐标
context.quadraticCurveTo(400, 100, 300, 300) // 分别是控制点坐标和终点坐标
context.stroke()

// 三阶贝塞尔曲线
context.moveTo(10, 100)
context.bezierCurveTo(200, 30, 200, 300, 400, 300) // 分别是控制点1和控制点2以及终点坐标
context.stroke()
```



 ![image-20231024232353847](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20231024232353847.png)<img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20231025014246552.png" alt="image-20231025014246552" style="zoom: 76%;" />

**爱心：**

```js
context.beginPath()
context.moveTo(300, 200)
context.bezierCurveTo(100, 100, 100, 340, 300, 450)
context.stroke()
context.beginPath()
context.moveTo(300, 200)
context.bezierCurveTo(500, 100, 500, 340, 300, 450)
context.stroke()
```

 <img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20231025154047134.png" alt="image-20231025154047134" style="zoom:50%;" />



**画图片：**

```js
const img = new Image()
img.src = 'img/1.png'
img.onload = function() {
    // 调用drawImage
    context.drawImage(img, 100, 100) // 距离canvas坐标0,0的位置
    context.drawImage(img, 10, 10, 300, 400) // 在canvas的距离  图片展示的宽高
    context.drawImage(img, 180, 290, 300, 160, 150, 200, 300, 160) // 截取图片的一部分
    // 参数：截取部分在图片中的左标，截取部分的宽高，在canvas上的位置 占据canvas的宽高
}
```

 <img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20231025170124715.png" alt="image-20231025170124715" style="zoom: 50%;" /><img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20231025170515871.png" alt="image-20231025170515871" style="zoom:50%;" /><img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20231025170618318.png" alt="image-20231025170618318" style="zoom:50%;" />



**给图片添加滤镜：**

[CanvasRenderingContext2D.filter - Web API 接口参考 | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/filter#语法)

1. `blur(px)`：高斯模糊
2. `brightness(%)`：图像亮度 0%的时候图像完全变黑
3. `contrast(%)`：对比度  0%的时候图像完全变黑
4. `grayscale(%)`：灰度 **100%的时候图像完全变灰**
5. `hue-rotate(deg)`：色彩旋转 <u>0%的时候没有变化</u>
6. `invert(60%)`：呈现照片底片的效果  50%的时候是中间由正常值转变为底片效果
7. `opacity(%)`：透明度 0%的时候图像完全透明
8. `sepia(%)`：怀旧效果 <u>0%的时候没有变化</u>
9. `saturate(%)`：饱和度效果  0%的时候图像完全不饱和



**绘制文字：**

```js
context.font = '100px sans-serif' // 默认字体 大小是10px
// 实体版本：
context.fillText('TOXIC', 50, 100, 120)
// 线框版本：
context.strokeText('TOXIC', 50, 200)
```

坐标是根据整个字体的左下角为准的。

 <img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20231025173133476.png" alt="image-20231025173133476" style="zoom:67%;" /><img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20231025173423757.png" alt="image-20231025173423757" style="zoom:80%;" />



**给文字添加颜色：**

```js
// 创建一个渐变
let gradient = context.createLinearGradient(10, 10, 400, 100)
gradient.addColorStop(0, 'red')
gradient.addColorStop(1, 'yellow')
context.fillStyle = gradient
context.font = '100px sans-serif' // 默认字体 大小是10px
context.fillText('TOXIC', 50, 100, 120)
context.strokeStyle = gradient
context.strokeText('TOXIC', 50, 200)
```

 ![image-20231025175654227](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20231025175654227.png)



**位移**

`context`默认的原点是在`(0, 0)`的位置。本质上位移就是原点的位移。

注意：在绘制之前进行位移才生效。一次改变，永久生效。

```js
context.translate(100, 100) // 原点移动到了100,100的位置
context.fillRect(0, 0, 200, 200) // 0, 0就是基于原点的相对位置。
// 也就是基于现在的100, 100的位置。
context.arc(0, 0, 60, 0, 2 * Math.PI)
context.stroke()
```

 ![image-20231031000229757](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20231031000229757.png)<img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20231031001620069.png" alt="image-20231031001620069" style="zoom:80%;" />



**旋转**

绕着原点进行旋转。希望可以沿着原点进行旋转，需要将原点放到形状的中心位置。

```js
context.translate(200, 200)
context.fillRect(0, 0, 100, 100)

context.fillStyle = 'green'
context.rotate(Math.PI / 4)
context.fillRect(-50, -50, 100, 100) // 将原点设置在-radius/2的位置，即中心位置

// 原点的位置
context.beginPath()
context.fillStyle = 'red'
context.arc(0, 0, 6, 6, 0, 2 * Math.PI)
context.fill()
```



**缩放：**

```js
context.scale(1, 1) // 1, 1的情况是不放大也不缩小
context.fillRect(0, 0, 100, 100)
```



**`transform`使用：**集以上位移、旋转、缩放等效果于一体。

[CanvasRenderingContext2D.transform() - Web API 接口参考 | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/transform)

语法：`transform(a, b, c, d, e, f)` 参数分别是水平的缩放，垂直倾斜，水平倾斜，垂直缩放，水平移动和垂直移动。

```js
context.transform(1.5, Math.PI / 4, 0, 1, 100, 0)
context.fillRect(0, 0, 100, 100)
```

 ![image-20231031142941555](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20231031142941555.png)



## 2. 五子棋

### 2.1. 棋盘

共14格子*14格子  实则横纵各画15条线。每个格子50px。上下左右空出50px。

```html
<canvas id="myCanvas" width="800" height="800"></canvas>
```

```js
const canvas = document.getElementById('myCanvas')
const context = canvas.getContext('2d')

function underline(n = 16) {
  while (n--) {
    context.moveTo(50, 50 * n) // 定义起点坐标
    context.lineTo(750, 50 * n) // 定义终点坐标
    context.stroke() // 连线

    context.moveTo(50 * n, 50) // 定义起点坐标
    context.lineTo(50 * n, 750) // 定义终点坐标
    context.stroke() // 连线
  }
}
underline()
```

 <img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20231028014258338.png" alt="image-20231028014258338" style="zoom:67%;" />

### 2.2. 棋子

```js
function playChess(x, y) {
  context.beginPath()
  context.arc(x, y, 20, 0, 2 * Math.PI) // 画圆 半径20
  context.fillStyle = useDifferentChess(x, y) // 白棋和黑棋使用不同的填充
  context.shadowBlur = 4 // 棋子阴影
  context.shadowColor = '#333333'
  context.shadowOffsetX = 4
  context.shadowOffsetY = 4
  context.fill()
  context.stroke()
}
```

```js
let isBlack = true
const map = new Map([
  ['black', 1],
  ['white', 2]
])

function useDifferentChess(x, y) {
  const dotX = isBlack ? x - 10 : x + 10
  const dotY = isBlack ? y - 10 : y + 10
  let gradient = context.createRadialGradient(dotX, dotY, 0, dotX, dotY, 30)
  gradient.addColorStop(0, isBlack ? 'white' : '#6b6b6b')
  gradient.addColorStop(1, isBlack ? 'black' : 'white')
  return gradient
}
```

 <img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20231028014322308.png" alt="image-20231028014322308" style="zoom:184%;" /><img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20231028014454040.png" alt="image-20231028014454040" style="zoom:180%;" />

### 2.3. 储存棋子

```js
const chesses = new Array(15).fill(0).map(() => new Array(15).fill(0)); // 存储落子
function addToChesses(gridNumX, gridNumY) {
  chesses[gridNumY][gridNumX] = isBlack ? map.get('black') : map.get('white')
}
```

### 2.4. 成功

1. 纵向检查是否连为5个

```js
function checkVertical(gridNumX, gridNumY) {
  let count = 1 // 在纵向上目前连在一起的棋子数。自己要算上为1
  let up = 0 // 向上查找
  let down = 0 // 向下查找
  let times = 0
  let target = isBlack ? map.get('black') : map.get('white')
  while (times < 25) {
    times++
    up++
    down++
    // 确保数组边界不超出。
    if (gridNumY - up >= 0) {
      if (chesses[gridNumY - up][gridNumX] === target) count++
      else break // 代表在向上寻找的过程中出现了不连续的状态。就跳出循环
    }

    if (gridNumY + down <= chesses.length) {
      if (chesses[gridNumY + down][gridNumX] === target) count++
      else break // 代表在向下寻找的过程中出现了不连续的状态。就跳出循环

    }
    if (count >= 5) break
  }
  return count >= 5
}
```

2. 检查横线是否有连续相同棋子5个

```js
function checkCross(gridNumX, gridNumY) {
  let count = 1
  let left = 0
  let right = 0
  let times = 0
  let target = isBlack ? map.get('black') : map.get('white')
  while (times < 25) {
    times++
    left++
    if (gridNumX - left >= 0 && chesses[gridNumY][gridNumX - left] === target) {
      count++
    }
    right++
    if (gridNumX + right <= chesses[0].length && chesses[gridNumY][gridNumX + right] === target) {
      count++
    }
    if (count >= 5) break

    if (chesses[gridNumY][gridNumX - left] !== target && chesses[gridNumY][gridNumX + right] !== target) {
      // 两侧都为真的时候，就跳出循环。处理不连续状态
      // 白子 2 !== 1 空格 0 !== 1
      break
    }
  }
  return count >= 5
}
```

3. 检查从左上到右下的斜线上是否有相同棋子连续5个

```js
function checkLToR(gridNumX, gridNumY) {
  let count = 1
  let lt = 0 // 左上
  let rb = 0 // 右下
  let times = 0
  let target = isBlack ? map.get('black') : map.get('white')
  while (times < 25) {
    times++
    lt++
    rb++
    if (gridNumX - lt >= 0 && gridNumY - lt > 0) {
      if (chesses[gridNumY - lt][gridNumX - lt] === target) count++
      else break
    }

    if (gridNumX + rb <= chesses[0].length && gridNumY + rb < chesses.length) {
      if (chesses[gridNumY + rb][gridNumX + rb] === target) count++
      else break
    }
    if (count >= 5) break
  }
  return count >= 5
}
```

4. 检查从左下到右上的斜线上有无相同棋子连续5个

```js
function checkBToT(gridNumX, gridNumY) {
  let count = 1
  let lb = 0
  let rt = 0
  let times = 0
  let target = isBlack ? map.get('black') : map.get('white')
  while (times < 25) {
    times++
    lb++
    rt++
    if (gridNumX - lb >= 0 && gridNumY + lb <= chesses.length) {
      if (chesses[gridNumY + lb][gridNumX - lb] === target) count++
      else break
    }
    if (gridNumX + rt <= chesses[0].length && gridNumY - rt >= 0) {
      if (chesses[gridNumY - lb][gridNumX + lb] === target) count++
      else break
    }
    if (count >= 5) break
  }
  return count >= 5
}
```

### 2.5. 落子

希望每个棋子都落在棋盘的线交接处。如 `[0, 50, 100, 150...]`

```js
let hasWon = false
canvas.addEventListener('click', e => {
  const {
    offsetX,
    offsetY
  } = e
  // 边界判断
  if (offsetX <= 25 || offsetX >= 775) return
  if (offsetY <= 25 || offsetY >= 775) return
  // 最终的x和y必须都在线上 50的倍数，误差为25
  const gridNumX = Math.floor((offsetX + 25) / 50)
  const gridNumY = Math.floor((offsetY + 25) / 50)
  const x = 50 * gridNumX
  const y = 50 * gridNumY
  if (chesses[gridNumY - 1][gridNumX - 1]) { // 不重复落子
    return
  }
  if (!hasWon) {
    playChess(x, y)
    addToChesses(gridNumX - 1, gridNumY - 1)
    hasWon = checkVertical(gridNumX - 1, gridNumY - 1) || checkCross(gridNumX - 1, gridNumY - 1) ||
      checkLToR(gridNumX - 1, gridNumY - 1) || checkBToT(gridNumX - 1, gridNumY - 1)
  }

  // 落子后判断是否成功
  isBlack = !isBlack
})
```

 ![image-20231028015640631](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20231028015640631.png)



## 3. 绘制动画

`requestAnimationFrame`该API需要传递一个`callback`回调函数，然后使用递归调用来实现动画。

随机生成颜色：`Math.random().substring(16).substring(2, 8)`

**简单实现方块的移动：**

```js
let x = 0
requestAnimationFrame(function step() {
  context.clearRect(0, 0, canvas.width, canvas.height) // 在绘制新的图形前要把之前的
  x += 1
  context.fillRect(x, 0, 100, 100)
  requestAnimationFrame(step)
})
```



### 3.1. 星球环绕

**绘制太阳和地球运行轨道**

```js
function drawSun() {
  context.beginPath()
  context.fillStyle = '#ff6e1a'
  context.strokeStyle = '#4a0904' // 轨道颜色
  context.shadowColor = '#ff6e1a'
  context.shadowBlur = 50
  context.arc(400, 400, 160, 0, 2 * Math.PI)
  context.fill()
  context.beginPath()
  context.arc(400, 400, 300, 0, 2 * Math.PI)
  context.stroke()
  context.closePath()
}
```

**地球绕太阳旋转**

```js
let i = 0
function drawEarth() {
  context.save() // 保存当前的绘图状态
  context.beginPath()
  context.translate(400, 400) // 太阳的原点
  context.fillStyle = '#005c87'
  context.shadowColor = '#9e9e9e'
  context.rotate(i * Math.PI / 180)
  context.translate(300, 0) // 地球的原点，为了月亮的绕地环行
  context.arc(0, 0, 40, 0, 2 * Math.PI)
  context.fill()
  drawMoon(i += 0.6) // 画出月亮并旋转
  context.closePath()
  context.restore() // 恢复Canvas的先前状态，也就是恢复到调用 context.save() 时保存的状态。
}
```

**月亮绕地球旋转**

```js
function drawMoon() {
  context.beginPath()
  context.fillStyle = '#fff2a5'
  context.shadowColor = '#9e9e9e'
  context.shadowBlur = 30
  context.rotate(i * Math.PI / 180)
  context.arc(80, 0, 12, 0, 2 * Math.PI)
  context.fill()
  context.closePath()
}
```

**执行**

```js
function step() {
  context.clearRect(0, 0, canvas.width, canvas.height)
  drawSun()
  drawEarth(i += 0.1)
  requestAnimationFrame(step)
}
requestAnimationFrame(step)
```

 ![动图](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/ezgif.com-gif-maker.gif)



### 3.2. 时钟

