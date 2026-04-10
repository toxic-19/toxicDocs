---
title: typescript继承
date: 2022-12-8
tags:
 - TypeScript
categories:
 - 前端
sidebar: 'auto'
---



## 1. 面向对象`OOD`

### 概念

:facepunch: : **1. 什么是对象？**

:page_with_curl: : 任何事物到了程序中就变成了一个对象。程序是对事物的抽象。

1. 操作浏览器要使用`window`对象
2. 操作网页要使用`document`对象
3. 操作控制台要使用`console`对象

  **一切操作都要通过对象。**



:punch: : **2. 属性与方法**

:page_with_curl: : 在程序中所有的对象都被分成了两个部分数据和功能。

​        以人为例，人的姓名、性别、年龄、身高、体重等属于数据，人可以说话、走路、吃饭、睡觉这些属于人的功能。

​        **数据在对象中被成为属性，而功能就被称为方法。所以简而言之，在程序中一切皆是对象。**



## 2. 类

**类是对象的抽象，对象是类的实例。**要创建对象，必须先定义类。可以把类理解为对象的模型。

### 2.1 属性

```ts
// 使用class关键字定义一个类
class Person{
    // 使用static关键字可以定义类属性【静态属性】：不需要新建对象就可以使用的属性
    // 实例属性
    name:string = "孙悟空";
    age:number = 17;
    static sex : string = "male";
}
// 实例化
const person1 = new Person();
console.log(person1); // 访问不到静态属性【类属性】
console.log(person1.name,person1.age);// 实例属性可以访问到。
```

![image-20221223004055248](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20221223004055248.png)

:punch: **【类属性】需要通过类去访问。**`Person.sex` 不用实例化就可以访问。

:punch: **【只读属性`readonly`】: 无法被修改。**要是和`static`连用，需要写在`static`后面。



### 2.2 方法

```ts
// 使用class关键字定义一个类
class Person{
    sayHello(){
        console.log("hello");
    };
    static staticHello(){
        console.log("staticFunction");
    }
}
// 实例化
const person1 = new Person();
console.log(person1); // 访问不到静态方法【类方法】
Person.staticHello(); // 使用类直接访问。
```

![image-20221223004934104](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20221223004934104.png)



### 2.3 构造函数

:punch: 一个类可能创建多个对象。**希望这个类用来创建不同的对象**，而不是一模一样的对象。

```ts
// 使用class关键字定义一个类
class Dog {
    name: string;
    age: number;

    bark() {
        alert("汪汪汪");
    };

    // 调用new关键字就是执行构造函数。
    constructor(name:string,age:number) {
        // 构造函数中有this关键字。就表示当前实例，我们可以通过this向新建的对象中添加属性。
        this.name = name;
        this.age = age;
    }
}

const dog = new Dog("旺财",2);
console.log(dog);
```

:punch: 构造函数的简化形式

```ts
class Dog{
    constructor(public name:string,public age:number){}
    // 方法体中可以是空的。
}
```



## 3. 继承

:page_facing_up: 1. **继承是面向对象的又一个特性**；通过继承可以将其他类中的属性和方法引入到当前类中。

### 3.1 梗概

```ts
// 立即执行函数
(function(){
    
})();
```

```ts
// 引入继承
(function () {
    // 使用class关键字定义一个类
    class Dog {
        name: string;
        age: number;

        bark() {
            console.log("汪汪汪");
        };

        // 调用new关键字就是执行构造函数。
        constructor(name:string,age:number) {
            // 构造函数中有this关键字。就表示当前实例，我们可以通过this向新建的对象中添加属性。
            this.name = name;
            this.age = age;
        }
    }

    class Cat{
        name: string;
        age: number;

        bark() {
            console.log("喵喵喵");
        };

        // 调用new关键字就是执行构造函数。
        constructor(name:string,age:number) {
            // 构造函数中有this关键字。就表示当前实例，我们可以通过this向新建的对象中添加属性。
            this.name = name;
            this.age = age;
        }
    }
    const dog = new Dog("旺财",6);
    const cat = new Cat("喵喵",5);
    dog.bark();
    cat.bark();
})();
```

 ![image-20221223144644383](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20221223144644383.png)

:paintbrush: 观察：两个类的大部分代码几乎一模一样。可以将一样的代码抽象为一个`Animal`类。由`dog`和`cat`去继承`Animal`的属性与方法。

```ts
(function () {
    // 使用class关键字定义一个类
    class Animal {
        name: string;
        age: number;

        bark() {
            console.log("Animal在叫");
        };

        // 调用new关键字就是执行构造函数。
        constructor(name: string, age: number) {
            // 构造函数中有this关键字。就表示当前实例，我们可以通过this向新建的对象中添加属性。
            this.name = name;
            this.age = age;
        }
    }

    class Dog extends Animal {

    }

    class Cat extends Animal {

    }

    const dog = new Dog("旺财", 6);
    const cat = new Cat("喵喵", 5);
    console.log(dog);
    console.log(cat);
    dog.bark();
    cat.bark();
})();

```

 ![image-20221223144857909](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20221223144857909.png)

:point_right: **继承作用：** 通过继承可以将多个类中共有的代码写在一个父类中，这样只需要写一次即可让所有的子类都同时拥有父类中的属性和方法。

:interrobang: 子类也可以写父类没有的属性与方法。是独有的。

:interrobang: 但是执行`bark()`函数时都变为了一样的`Animal在叫`

:punch: **重写：继承过程中子类的方法会覆盖掉父类的同名方法。**

```ts
class Dog extends Animal {
    bark() {
        console.log("汪汪汪！")
    }
}
```

 ![image-20221223214150040](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20221223214150040.png)



### 3.2 `super`

:page_with_curl: `super`表示就是当前类的父类。

```ts
class Dog extends Animal {
    bark() {
        super.bark();// 其实引用的就是父类的bark函数。
    }
}
```

:interrobang: 子类写构造函数时，会覆盖掉父类的构造函数。所以必须调用父类的构造函数。

```ts
class Dog extends Animal {
    // 2. 子类独有的属性也需要声明。
    sex:string;
    constructor(name:string,age:number,sex:string) {
        super(name,age);  // 1. 父类的构造函数中有属性name和age。所以需要在子类的构造函数也声明。
        // 3. 再添加上子类需要的属性。
        this.sex = sex;
    };
    bark() {
        console.log("汪汪汪！")
    }
}
```

 ![image-20221223215101827](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20221223215101827.png)



## 4. 接口

### 4.1 抽象类

:page_with_curl: 按道理来说：父类如`Animal`也是一个类，也可以用来创建对象。但是我们不希望它被用来创建对象，它是作为一个超类被继承。

:punch: 在超类的前面加上**`abstact`**关键字将它变为抽象类。抽象类不能被用来创建对象。

:punch: **抽象类就是专门用来继承的类。**抽象类中可以添加抽象方法【也是在函数前面加上关键字`abstact`，且没有方法体】。具体实现必须由子类实行。

```ts
// 使用class关键字定义一个类
abstract class Animal {
    name: string;

    // 调用new关键字就是执行构造函数。
    constructor(name: string) {
        // 构造函数中有this关键字。就表示当前实例，我们可以通过this向新建的对象中添加属性。
        this.name = name;
    };

    abstract bark(): void;
}
```

:interrobang: 定义抽象方法时必须 添加返回值类型。如：` abstract bark(): void;` 表示返回值为 `void`。

```ts
// 子类继承
class Dog extends Animal {
    bark() {
        console.log("汪汪汪！")
    }
}

class Cat extends Animal {
    bark() {
        console.log("喵喵喵！")
    }
}
```

 ![image-20221223220511169](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20221223220511169.png)



### 4.2 接口

:page_with_curl: 定义一个类的结构。`interface`关键字开头。同时接口也可以当成类型声明使用。类型别名和接口很相似。区别如下：

```tsx
// 接口：
interface Animal{
    name: string
}
interface Bear extends Animal{   // 继承扩展Bear的类型
    honey: bolean
}
const bear : Bead = {
    name: 'whine',
    honey: false
}
// 类型别名
type Animal = {
    name: string
}
type Bear = Animal & {
    honey: boolean
}
const bear : Bear = {
    name: 'whine',
    honey: false
}

// 定义相同的接口，不同的类型。可以算是添加字段。
interface MyWindow{
    name: string
}
interface MyWindow{
    count: number
}
const w: MyWindow = {
    name: 'kal',
    count: 4
}
// 定义相同的类型，会导致重复标识符报错。
```



:punch: **接口可以重复声明。不会覆盖，会添加上去。**

:punch: **接口中所有方法都是抽象方法，所有属性都没有具体值。**

```ts
// 有点像抽象类。
// 使用关键字定义接口
interface MyInterface{
    // 接口属性声明
    name:string;
    // 接口方法是抽象方法，要写返回值，不写方法体
    bark():void;
}

// 抽象类也是类。需要class
abstract class Animal{
    // 声明属性
    name:string;
    // 声明属性之后需要写构造函数。
    protected constructor(name:string) {
        this.name = name;
    }
    // 只要加上abstract关键字变为抽象方法，才可以不写方法体。
    // 一般的方法还是要写的，但接口中天然是抽象方法。
    abstract bark():void;
}
```

:punch: 接口就是定义一个规范，只要你实现了我的接口，就是符合我的规范和标准。

**实现接口：**

```ts
class MyClass implements MyInterface{
    // implements all members 只有属性与方法。
    name: string;
    // 需要为属性书写构造函数。
    constructor(name:string) {
        this.name = name;
    }
    // 实现接口的抽象方法
    bark(): void {
        console.log(this.name+"在叫");
    }
}
const dog = new MyClass("旺财");
dog.bark();  // 输出 “旺财在叫”
```






## 5. 泛型

### 5.1 属性封装

:punch: 现在属性是在对象中设置的。属性可以通过对象被任意地修改。导致对象中的数据变得非常不安全。

```ts
class MyClass implements MyInterface{
    name: string;
    constructor(name:string) {
        this.name = name;
    }
}
const dog = new MyClass("旺财");
dog.name = "喵咪咪";
console.log(dog); // 输出 Object { name: "喵咪咪" }
```

:page_facing_up: 1. 使得类中的属性变为私有属性，就不会被任意修改。

:page_facing_up: 2. 私有属性之后，添加 `getter,setter【属性的存取器】`方法，使得属性可以被访问和修改。

:page_facing_up: 3. 访问属性时会自执行get方法。

```ts
// 属性name的读取。是函数但是可以通过 xxx.name 属性的形式来读取。
get name(){
    return this._name;
}
```

:arrow_double_down: 使用`getter setter`方式：同 `java `中的形式。

:arrow_double_down: 使用`get 属性|set 属性`方式：

​	:punch: 使用 **Alt+Insert** 可以快捷键添加。

```ts
class MyClass implements MyInterface{
    constructor(public _name:string) {
    }
    // 实现接口的抽象方法
    bark(): void {
        console.log(this._name+"在叫");
    }

    get name(): string {
        console.log("get name()被执行啦");
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }
}
const dog = new MyClass("旺财");
console.log(dog.name)  // 输出 get name()被执行啦 旺财
// 通过访问属性name，即为调用get name()函数。
```



### 5.2 泛型

:punch: 在定义函数或者类时，如果类型不明确就可以使用泛型。

```ts
function fn<T>(a:T):T{
    // fn后的<T>是定义T类型。形参为T类型，返回类型也为T类型
    // T类型是尚不明确的类型。
    return a;
}
// 调用该函数时，会自动判断参数的类型。
fn(10);
fn<string>("hello");
```

:punch: 可以指定多个泛型。

```ts
function fn<T,K>(a:T,b:K):T{
}
```

:punch: 泛型也可以是类。

```ts
interface Animal{
    name:string;
}
// 指定的形参是T类型；T是继承接口的子类。
function fn<T extends Animal>(a:T):string{
    return a.name;
}
```

```ts
class MyClass<T>{
    // 是你的属性希望使用泛型。就必须在类声明
    name:T;
    constructor(name:T){
        this.name = name;
    }
}
```

