import XButton from './src' //引入组件
//要能被npm安装，肯定要有一个install方法
//Vue.use()
XButton.install = function (Vue){  //接受外界传过来的Vue
    Vue.component(XButton.name,XButton) //调用Vue的component方法，全局注册组件
}
//向外输出组件
export default XButton