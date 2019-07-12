# webpack
## 全局安装webpack
 > npm i webpack -g

## 本地初始化项目
 > npm init
 > 项目目录下生成package.json

## 本地安装webpack
 > npm i webpack --save-dev | npm i webpack -S
 > 将webpack注入到项目开发依赖中
 
## 使用webpack构建文件
 > web 源文件 目标文件 --mode=development | --mode=production
 
 问题：
 ```
    webpack .\src\main.js .\dist\bundle.js --mode=development
    dist：只生成了main.js,而bundle.js没有内容
    直接引用dist下的main.js可以使用
 ```

## 直接使用`webpack`命令
 > 再项目根路径下新建webpack.config.js文件
 ```js
    // 导入处理路径的模块
    var path = require('path');
    // 导出一个配置对象，将来webpack在启动的时候，会默认来查找webpack.config.js，并读取这个文件中导出的配置对象，来进行打包处理
    module.exports = {
        entry: path.resolve(__dirname, 'src/main.js'), // 项目入口文件
        output: { // 配置输出选项
            path: path.resolve(__dirname, 'dist'), // 配置输出的路径
            filename: 'bundle.js' // 配置输出的文件名
        }
    }
 ```

## webpack-dev-server实时构建
 > cnpm i webpack-dev-server --D
- 由于每次重新修改代码之后，都需要手动运行webpack打包的命令，比较麻烦，所以使用`webpack-dev-server`来实现代码实时打包编译，当修改代码之后，会自动进行打包构建
- 安装完成之后，在命令行直接运行`webpack-dev-server`来进行打包，发现报错，此时需要借助于`package.json`文件中的指令，来进行运行`webpack-dev-server`命令，在`scripts`节点下新增`"dev": "webpack-dev-server"`指令，发现可以进行实时打包，但是dist目录下并没有生成`bundle.js`文件，这是因为`webpack-dev-server`将打包好的文件放在了内存中
- 把`bundle.js`放在内存中的好处是：由于需要实时打包编译，所以放在内存中速度会非常快
- 这个时候访问webpack-dev-server启动的`http://localhost:8080/`网站，发现是一个文件夹的面板，需要点击到src目录下，才能打开我们的index首页，此时引用不到bundle.js文件，需要修改index.html中script的src属性为:`<script src="../bundle.js"></script>`
- 为了能在访问`http://localhost:8080/`的时候直接访问到index首页，可以使用`--contentBase src`指令来修改dev指令，指定启动的根目录
- package.json添加内容：
```
    "dev": "webpack-dev-server --contentBase src"
```

- 执行命令 `npm run dev` 报错:本地没有webpack-cli
```
    > webpack-01@1.0.0 dev E:\zf-nvm\webpack-01
    > webpack-dev-server --contentBase src

    The CLI moved into a separate package: webpack-cli
    Please install 'webpack-cli' in addition to webpack itself to use the CLI
    -> When using npm: npm i -D webpack-cli
    -> When using yarn: yarn add -D webpack-cli
    internal/modules/cjs/loader.js:584
        throw err;
        ^

    Error: Cannot find module 'webpack-cli/bin/config-yargs'
        at Function.Module._resolveFilename (internal/modules/cjs/loader.js:582:15)
        at Function.Module._load (internal/modules/cjs/loader.js:508:25)
        at Module.require (internal/modules/cjs/loader.js:637:17)
        at require (internal/modules/cjs/helpers.js:22:18)
        at Object.<anonymous> (E:\zf-nvm\webpack-01\node_modules\webpack-dev-server\bin\webpack-dev-server.js:60:1)
        at Module._compile (internal/modules/cjs/loader.js:701:30)
        at Object.Module._extensions..js (internal/modules/cjs/loader.js:712:10)
        at Module.load (internal/modules/cjs/loader.js:600:32)
        at tryModuleLoad (internal/modules/cjs/loader.js:539:12)
        at Function.Module._load (internal/modules/cjs/loader.js:531:3)
```

- 开发环境安装webpack-cli
 > cnpm i webpack-cli -D
 
- 再次运行 `npm run dev` 执行成功
```
    PS E:\zf-nvm\webpack-01> npm run dev

    > webpack-01@1.0.0 dev E:\zf-nvm\webpack-01
    > webpack-dev-server --contentBase src

    i ｢wds｣: Project is running at http://localhost:8080/
    i ｢wds｣: webpack output is served from /
    i ｢wds｣: Content not from webpack is served from E:\zf-nvm\webpack-01\src
    i ｢wdm｣: Hash: 3c272c24a173a6b3d9dc
    Version: webpack 4.35.3
    Time: 669ms
    Built at: 2019-07-11 16:28:22
        Asset     Size  Chunks             Chunk Names
    bundle.js  670 KiB    main  [emitted]  main
    ...........................
        * 19 hidden modules
    i ｢wdm｣: Compiled successfully.
```

## html-webpack-plugin 插件配置启动页面
 - 安装到开发依赖
 > cnpm i html-webpack-plugin -D
 - 修改`webpack.config.js`配置文件如下
 ```js
    // 导入处理路径的模块
    var path = require('path');
    // 导入自动生成HTMl文件的插件
    var htmlWebpackPlugin = require('html-webpack-plugin');

    // 导出一个配置对象，将来webpack在启动的时候，会默认来查找webpack.config.js，并读取这个文件中导出的配置对象，来进行打包处理
    module.exports = {
        entry: path.resolve(__dirname, 'src/main.js'), // 项目入口文件
        output: { // 配置输出选项
            path: path.resolve(__dirname, 'dist'), // 配置输出的路径
            filename: 'bundle.js' // 配置输出的文件名
        }
        ,
        plugins:[ // 添加plugins节点配置插件
            new htmlWebpackPlugin({
                template:path.resolve(__dirname, 'src/index.html'),//模板路径
                filename:'index.html'//自动生成的HTML文件的名称
            })
        ]
    }
 ```
 - 修改`package.json`中`script`节点中的dev指令如下：
 ```js
    "dev": "webpack-dev-server --open --port 3000 --contentBase src --hot"
 ```
 > --open 浏览器自动打开
 > --port 端口号
 > --contentBase 项目路径（浏览器访问路径）
 > --hot 热部署（修改样式时不用刷新浏览器）

## 使用webpack打包css文件
 - 运行`cnpm i style-loader css-loader --save-dev`
 - 修改`webpack.config.js`这个配置文件：
```js
module: { // 用来配置第三方loader模块的
        rules: [ // 文件的匹配规则
            { test: /\.css$/, use: ['style-loader', 'css-loader'] }//处理css文件的规则
        ]
    }
```
 - 注意：`use`表示使用哪些模块来处理`test`所匹配到的文件；`use`中相关loader模块的调用顺序是从后向前调用的；

## 使用webpack打包less文件
 - 运行`cnpm i less-loader less -D`
 - less是less-loader默认依赖，不用再项目中引入
 - 修改`webpack.config.js`这个配置文件：
```
{ test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
```

## 使用webpack打包sass文件
 - 运行`cnpm i sass-loader node-sass --save-dev`
 - node-sass是sass-loader的默认依赖，项目不用引入
 - 在`webpack.config.js`中添加处理sass文件的loader模块：
```
{ test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] }
```

## 使用webpack处理css中的路径
 - 运行`cnpm i url-loader file-loader --save-dev`
 - file-loader是url-loader的默认依赖，不用引入
 - 在`webpack.config.js`中添加处理url路径的loader模块：
```js
{ test: /\.(png|jpg|gif)$/, use: 'url-loader' }
```

 - 可以通过`limit`指定进行base64编码的图片大小；只有小于指定字节（byte）的图片才会进行base64编码：
```js
{ test: /\.(jpg|png|gif|bmp|jpeg)$/, use: 'url-loader?limit=7631&name=[hash:8]-[name].[ext]' }, 
  // 处理 图片路径的 loader
  // limit 给定的值，是图片的大小，单位是 byte， 如果我们引用的 图片，大于或等于给定的 limit值，则不会被转为base64格式的字符串， 如果 图片小于给定的 limit 值，则会被转为 base64的字符串
```
 - 处理字体文件的url
```js
    { test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader' },
    // 处理 字体文件的 loader 
```

## 使用babel处理高级JS语法
 - 运行`cnpm i babel-loader @babel/core  @babel/plugin-transform-runtime --save-dev`安装babel的相关loader包
 - 上一条命令提示缺少`@babel/core@^7.0.0` 执行`cnpm i @babel/core@^7.0.0 -D`
 - 运行`cnpm i @babel/preset-env @babel/preset-stage-0 --save-dev`安装babel转换的语法
 - 在`webpack.config.js`中添加相关loader模块，其中需要注意的是，一定要把`node_modules`文件夹添加到排除项：
```js
{ test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }
// 配置 Babel 来转换高级的ES语法
```
 - 在项目根目录中添加`.babelrc`文件，并修改这个配置文件如下：
```js
{
  "presets": ["@babel/preset-env"],
  "plugins": ["@babel/plugin-transform-runtime"]
}

'@babel/preset-stage-0 --save-dev':有问题
```
 - **注意：语法插件`babel-preset-es2015`可以更新为`babel-preset-env`，它包含了所有的ES相关的语法；**

## 在webpack中配置.vue组件页面的解析
 - 运行`cnpm i vue -S`将vue安装为运行依赖；
 - 运行`cnpm i vue-loader vue-template-compiler -D`将解析转换vue的包安装为开发依赖；
 - 在`webpack.config.js`中，添加如下`module`规则：
 ```js
     { test: /\.vue$/, use: 'vue-loader' } // 处理 .vue 文件的 loader
 ```

### 项目导入vue及导入.vue说明
 - 安装vue的包：  cnpm i vue -S
 - 由于 在 webpack 中，推荐使用 .vue 这个组件模板文件定义组件，所以，需要安装 能解析这种文件的 loader  `cnpm i vue-loader vue-template-compiler -D`
 - webpack.config.js中配置
     + var VueLoaderPlugin = require('vue-loader/lib/plugin');
     + plugins中加入`new VueLoaderPlugin(),`
     + rules中加入`{ test:/\.vue$/, use: 'vue-loader' }`
 - 在 main.js 中，导入 vue 模块  import Vue from 'vue'
 - 定义一个 .vue 结尾的组件，其中，组件有三部分组成： template script style
 - 使用 import login from './login.vue' 导入这个组件
 - 创建 vm 的实例 var vm = new Vue({ el: '#app', render: c => c(login) })
 - 在页面中创建一个 id 为 app 的 div 元素，作为我们 vm 实例要控制的区域；
 
 ```js
    import Vue from 'vue'
    // import Vue from '../node_modules/vue/dist/vue.js'
    // 回顾 包的查找规则：
    // 1. 找 项目根目录中有没有 node_modules 的文件夹
    // 2. 在 node_modules 中 根据包名，找对应的 vue 文件夹
    // 3. 在 vue 文件夹中，找 一个叫做 package.json 的包配置文件
    // 4. 在 package.json 文件中，查找 一个 main 属性【main属性指定了这个包在被加载时候，的入口文件】

    // var login = {
    //   template: '<h1>这是login组件，是使用网页中形式创建出来的组件</h1>'
    // }


    // 1. 导入 login 组件
    import login from './login.vue'
    // 默认，webpack 无法打包 .vue 文件，需要安装 相关的loader： 
    //  cnpm i vue-loader vue-template-compiler -D
    //  在配置文件中，新增loader哦配置项 { test:/\.vue$/, use: 'vue-loader' }
 ```

 > import Vue from 'vue'
 > 根据搜索规则默认寻找node_modules\vue\package.json中的main节点
 > vue组件中main节点：`"main": "dist/vue.runtime.common.js",`
 > 
 > 如果想要使用vue.js|vue.min.js配置如下：
 >  1：入口函数中使用相对路径导入： import Vue from '../node_modules/vue/dist/vue.js'
 >  2：在webpack.config.js中配置
 >  resolve: {
        alias: { // 修改 Vue 被导入时候的包的路径
          // "vue$": "vue/dist/vue.js"
        }
      }

## 集成vue-router路由模块
- cnpm i vue-router -S
- main.js入口文件引入配置
```js
    // 1. 导入 vue-router 包
    import VueRouter from 'vue-router'
    // 2. 手动安装 VueRouter 
    Vue.use(VueRouter)

    // 导入根组件
    import login from './App.vue'
    // 导入组件对象
    import account from './main/account.vue'
    import goodlist from './main/goodList.vue'

    // 导入子组件
    import zLogin from './submain/login.vue'
    import register from './submain/register.vue'
    // 3. 创建路由对象
    var router = new VueRouter({
        routes: [
            {
                path: '/account',
                component:account,
                children: [
                    {path:'login', component:zLogin},
                    {path:'register', component:register},
                ]
            },
            {path: '/goodlist', component:goodlist}
        ]
    });

    // 4. 创建vue实例对象
    var vm = new Vue({
        el: '#app',
        data: {},
        methods: {},
        // 使用render挂载组件，会覆盖掉#app
        render: c => c(login),
        // 使用router组件必要要挂在vue实例上 也可以直接写成router es6新语法
        router:router
    });
```
- 抽离router模块
    + 在main.js同级目录下新建router.js
```js
    // 抽离路由模块

    // 导入vue-router模块
    import VueRouter from 'vue-router'

    // 导入组件对象
    import account from './main/account.vue'
    import goodlist from './main/goodList.vue'

    // 导入子组件
    import zLogin from './submain/login.vue'
    import register from './submain/register.vue'
    // 3. 创建路由对象
    var router = new VueRouter({
        routes: [
            {
                path: '/account',
                component:account,
                children: [
                    {path:'login', component:zLogin},
                    {path:'register', component:register},
                ]
            },
            {path: '/goodlist', component:goodlist}
        ]
    });

    export default router
```
    + main.js添加 `import router from './router.js'`
    
```js
    // 导入vue
    import Vue from 'vue'
    // 1. 导入 vue-router 包
    import VueRouter from 'vue-router'
    // 2. 手动安装 VueRouter 
    Vue.use(VueRouter)

    // 导入组件
    import login from './App.vue'
    // 导入router模块
    import router from './router.js'

    // 3. 创建vue实例
    var vm = new Vue({
        el: '#app',
        data: {},
        methods: {},
        render: c => c(login),
        router:router
    });
```

## 使用mint-ui
- npm i mint-ui --save
- 组件导入
```js
// 导入样式
import 'mint-ui/lib/style.css'
// 按需导入 Mint-UI组件
import { Button } from 'mint-ui'
// 使用 Vue.component 注册 按钮组件
Vue.component(Button.name, Button)
```

## 使用mui
- 手动导入资源包
- 组件导入
```js
import './lib/mui/css/mui.min.css'
```