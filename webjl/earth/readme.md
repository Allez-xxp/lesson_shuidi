-旋转的地球
three.js,用于小游戏开发，虚拟建造
cdn:内容分发网络，部署的服务器（机房）
cdn--Content Delivery Network

src => 请求和响应的过程
url =>通过cdn,解析成为IP地址

例子：
京东  iPhone11
www.jd.com/js/a.js
localhost--www.a.com
www.jd.com 主站点，后端业务（任务很重，css，js,image）
解决：将静态资源独立出来（快速），运用cdn网络分发
询问 cdn.bootcss.com,转发给你一个IP地址

-PerspectiveCamera:透视摄像机
camera = new THREE.PerspectiveCamera(60, window.innerWidth/innerHeight,1,2000);
第一个参数：可视角度
第二个参数：横纵拍摄比例
第四个参数：最小距离（大于）
第四个参数：最远距离（小于）

-SphereGeometry(200,20,20)：球体
第一个参数：半径
第二三个参数：水平方向和垂直方向上分段数

-three.min.js 很大，交给cdn
上传图片，交给cdn 七牛云

-canvas + camera + scene（场景）>group(分组)>mesh>geometry(形状)+material(材质) （衣服和形状可以分开来的）
renderer(渲染)

-webjl,3d编程
以相机视角来构建的真实世界
