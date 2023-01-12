# vue-frontend

前端

过滤器

svgIcon

路由模块化：共有、按角色分配路由

vuex：处理路由；存储token、roles等用户信息

utils：全局工具类





路由守卫 8.26

第一次登录

​	token存入vuex、cookie；用户名、角色存入vuex、localStorage，登录成功进入首页

刷新页面

​	token存在，vuex中的信息不存在，去localStorage中找，找不到获取，存入vuex；

​	找到，存入vuex，路由跳转

layout布局 8.27

​	

## svg

###	安装依赖

> yarn add svg-sprite-loader -D

### 封装SvgIcon.vue组件

```vue
<template>
  <svg :class="svgClass" aria-hidden="true" v-on="$listeners">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    name: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    }
  },
  computed: {
    iconName() {
      return `#icon-${this.name}`
    },
    svgClass() {
      if (this.className) {
        return 'scoped-svg-icon ' + this.className
      } else {
        return 'scoped-svg-icon'
      }
    }
  }
}
</script>

<style lang="less">
  .scoped-svg-icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
</style>

```

### 建目录

src项目下，创建目录icons放置svg相关配置

icons目录下创建目录svg，用来存放svg源文件

icons目录下新建文件index.js

index.js文件相关内容如下

``` javascript
import Vue from 'vue'

// 引入SvgIcon组件
import SvgIcon from '@/components/SvgIcon'
// 全局注册
Vue.component('SvgIcon', SvgIcon)

const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
```

### vue.config.js中添加如下配置

``` javascript
// svg图片配置
chainWebpack(config) {
    // set svg-sprite-loader
    config.module
        .rule('svg')
        .exclude.add(resolve('src/icons'))
        .end()
    config.module
        .rule('icons')
        .test(/\.svg$/)
        .include
        .add(resolve('src/icons'))
        .end()
        .use('svg-sprite-loader')
        .loader('svg-sprite-loader')
        .options({ symbolId: 'icon-[name]' })
        .end()
}
```

### main.js当中引入

> import './icons'

- 使用：

1. iconfont官网，找到需要的图标，加入项目中

2. 下载图标svg文件，

3. 修改svg文件名，保持和iconfont项目中文件名一致，方便其他人使用

4. 将修改好文件名的svg图片放入项目src/icons/svg目录中

5. 在需要使用图标的地方，使用组件

   > ​	<svg-icon name="bind"></svg-icon>

## 安装依赖

###	cookie

>npm install --save js-cookie

###	antd / elementui

> yarn add  element-ui -S

####	main.js中引入

> import ElementUI from 'element-ui'
>
> import 'element-ui/lib/theme-chalk/index.css'
>
> Vue.use(ElementUI)

### i18n

>yarn add vue-i18n

### axios

>yarn add axios --save

### lodash

>yarn add lodash

### nprogress

>yarn add nprogress

### echarts

版本：

"echarts": "^5.0.2",   // 引入map JSON 文件

 "echarts-wordcloud": "^2.0.0",

old version：

<!-- map 5.0+ 不支持 -->
> yarn add echarts@4.8.0 --save

echarts、echarts-wordcloud 依赖

echarts版本高map

echarts-wordcloud 版本低 不支持词云颜色自定义多种颜色

### enquireJs 

>npm install enquire.js --save
>
>import enquireJs from 'enquire.js'

### vue ant design 改变主题

>npm i webpack-theme-color-replacer

###  fast-deep-equalvar 深比较

> yarn add  fast-deep-equalvar

## 全局过滤器

> filter：*.js

### main.js引入

```vue
// 引入全局过滤器
import filters from './filters'
Vue.use(filters)
```

## 路由vue-router

router：modules

模块化路由文件：*.js

> 路由定义得越早，优先级就越高

## vuex

modules

## utils

### auth.js

​	token处理

### request.js

​	请求拦截

## permission.js

​	permission主要负责全局路由守卫和登录判断

​	/**

​	*  先判断是否登录，是都有token

​	 \* 若已登录，判断目标地址是否为登录页面

​	 \*     是登录页面则重定向到首页，避免重复登录

​	 \*     不是登录页面则直接跳转

 	\* 未登录，判断目标地址是否在白名单里

​	 \*    是在白名单里则直接跳转

​	 \*    不在白名单里则重定向到登录页面

 */

> 旧版本下，addRoutes的使用方法
> // accessRoutes为路由对象数组
>
> router.addRoutes(accessRoutes)



> 新版本下，addRoute的使用方法，对路由对象数组进行解构
> router.addRoute(...accessRoutes)

## views

### Login

​	登录页面





# 功能

- 项目框架
- 锚点
- jsmind