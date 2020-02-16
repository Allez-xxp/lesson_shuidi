 # material design（安卓） 来自Google的UI风格
 特点：1.css风格
       2.组件化
       3.react入门
 - 灵魂，在于对交互的创新
    波浪感，进度条的进度感
    移动端细节，cursor：pointer用的是非button组件
    user-select：none；
    stylus 嵌入式 ::after,:active::after

 
 1. css风格
  - 波浪感
  background-image
   - 背景图片 url 引入方式，在移动时代，渐变也可以生成；即生成了背景，同时又没有用图片。
   - 10%的白色，1%的透明，
   - transform scale（12），12->0

 2. 组件化（做一堆的按钮）
 - 为开发准备好基础组件，小程序里用过组件，要用到的按钮，这里都会有，warning？大一些，块级，
 提供通用的，变通的，各种常见要求（70%的业务开发），就叫组件
 自己写这个组件，以后用就好了，可以实现复用.
 - css 有些变化（状态，primary circle block），如何变化封装进去？
 - 组件与HTML之间的区别
 1. 把它的样式封装进去
 button？ 样式是样式
 组件（组合的HTML，css.js）成为一个组件
 - ReactDOM
 ReactDOM.render(组件 ，结点),React跟DOM交互的库
 基本语法：
    组件式强大的，定义了一个button组件
    type-文字，block...有通用性的需求
    1. ReactDOM.render(<div><button></button></div>,document.getElementById('root))
    JSX语法，才可以在root里面显示组件，组件要编译
    2. function Button(props) { //定义组件好方便
        let { } = props
        return (
            <div></div>
        )
    }
    3. 组件式开发，只需要写一次，使用按钮就用它...


    
