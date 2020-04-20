//入口文件
import Carousel from './src/main'; //将main.vue引入
//在组件上添加install方法，是一个静态方法，要安装到哪里去？
Carousel.install = function(Vue){
    Vue.component(Carousel.name,Carousel)
}
export default Carousel;//向外输出