//{{}}，待编译的模板
let template = '我是{{name}},年龄{{age}},性别{{sex}}'; 

let data = {
    name: '赵丽颖',
    age: 18,
    sex: '女'
}

function render(template,data) {
    const reg = /\{\{(\w+)\}\}/;  //转译;不做贪婪匹配
    if (reg.test(template)) {  //退出条件
        // 是否需要翻译
        // exec方法：vue 源码里模板编译用的正则方法
        //模板编译需要进行正则测试
        const key = reg.exec(template)[1]; 
        // console.log(key);
        template = template.replace(reg,data[key]);
        return render(template,data); //递归渲染，自己调用自己
    }
    return template;
    // 用什么方法？
    // 正则 + replace {{}}；单项数据流;规则
    // 1.{{(?)+}}
    // 2.$1  data[key]，拿到数据
    // 3.replace,替换
}
console.log(render(template,data));
// vue的第一个功能render()
// new VTTCue({
//     el:'#app',
//     data() {
        // return{
            
        // }
//     }
// })