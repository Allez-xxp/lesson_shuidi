# 开发一套UI框架
- 知识点
    1. vue-cli搭建团队的组件库并发布到npm
    2. npm发包的常用基础知识

- 为什么开发UI框架？
某公司的element-ui框架满足大部分需求，部分需求可能不满足；将新的UI框架发布到npm，公司会 npm install allezui
- 调整开发目录结构
    1. 将src重命名为examples 用于存放开发UI框架的例子目录（如何用）
    2. 新建packages文件夹  npm约定,用于UI开发库；为开发目录（与平时开发的区别）,用来存放我们的自定义组件.
    3. 手动创建vue.config.js(因为cli默认会启动src下的服务,如果目录名变了,我们需要手动修改配置,vue-cli3中提供自定义打包配置项目的文件) 
    4. 修改入口文件地址为examples下的main.js,其次将packages加入打包编译任务中（引入）.
    5. 配置package.json文件
        - 在"scripts"下添加："lib": "vue-cli-service build --target lib --name hubutui --dest lib packages/index.js"
        - 然后执行 yarn lib 命令
        - 其次我们需要编写package文件的description,keywords等,
        "description":"the first ui write by huhuilin",
        "keywords":[
            "component",
            "components",
            "vue",
            "vue-component"
        ],
        "homepage":"https://github.com/hhl1206",
        "license":"MIT",
    6. 来到npmjs.org，发布allezui
    发布命令： 
        // 本地编译组件库代码
        yarn lib
        // 登录
        npm login
        // 发布
        npm publish
        // 如果发布失败提示权限问题,请执行以下命令
        npm publish --access public
    7. 发布过程中遇到的问题
        - 私有属性要注释
        - 运行的源是淘宝源，无法发布包；注意将npm 源改回 npmjs.org
        npm config set registry http://registry.npmjs.org
        - 邮箱需要验证 登录npmjs.com
        注意：电脑登录，可能会被标记为垃圾邮件
    8. 可以在其它项目中引用安装
    步骤：
    - yarn add allezui
    main.js中引入
    import alllezui from 'allezui'
    // css也要引入,在node_modules中
    import 'allezui/lib/allezui.css'

    Vue.use(allezui);//这里就会调用之前写的install方法，将所有组件装上来
    然后就能去应用层使用App.vue
    <x-button type="primary" >x-button按钮</x-button>
        