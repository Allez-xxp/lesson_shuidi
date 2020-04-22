//这是一个配置文件 首先修改入口文件地址为examples下的main.js,其次将packages加入打包编译任务中。
module.exports = {
    pages:{ //pages 声明入口，原来是在src/main.js下
        index:{
            entry: 'examples/main.js', //入口选项，为examples/main.js。因为要打包到npm，所以不能叫src。要打包的文件是packages。
            templete: 'public/index.html',  //入口的模板是html文件，就是有root id="app"的
            filename: 'index.html' 
        }
    },
    // webpack打包器。我们的项目只会针对src下面的编译，要把webpack的编译就要加这个，
    // webpack的链。扩展 webpack 配置，使 packages 加入打包编译任务中.
    chainWebpack: config =>{
        config.module //配置的模块
        .rule('js') //里面包含js的配置
        .include
            .add('/packages') //让他添加packages目录
            .end() //编译完了之后向外输出
        .use('babel') //用Babel让他能从es6变成es5
            .loader('babel-loader')
    }
}