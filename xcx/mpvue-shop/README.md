# 小程序页面的构建 mpvue
- 目录结构
    - app.json 进行小程序的修改
        - window 主页面
        - tabBar 底栏
            - list[{}] 列表形式显示选项
                - pagePath 页面路径
                - iconPath 未选择的图片
                - selectedIconPath 选择是的图片
                - text 页面描述 
    - pages 页面具体操作；引用pages里的文件需提前声明
    - static 提供静态资源（图片）

- 首页设计，
- 地图定位设计
    - 样式设计，引入less插件
    1. 安装less到项目中。 
    npm install less less-loader --save
    2. 配置webpack.base.conf.js
    { test: /.less$/, loader: "style-loader!css-loader!less-loader", }
    3. 在pages/index下新建style.less，负责页面的样式设计
    4. 在pages/index/index.vue中引入style.less
    <style lang="less">
    // scoped样式私有化; 引入样式文件style.less
    @import "./style.less";
    </style>
- 首页的搜索框（放大镜），位置设计
    - 使用div盒子，定位搜索框，和放大镜
    <div>
        <input type="text" placeholder="搜索商品" />
        <!-- 放大镜位置，放置图片，用position定位到input输入框中 -->
        <span class="icon"></span>
    </div>
    