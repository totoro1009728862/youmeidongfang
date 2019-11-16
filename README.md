# hxtrip-touch-web

> 移动站点源码

## 1009728862@qq.com

## 2019-07-18

### 项目技术点描述

> 1、nuxt

> 2、vue ssr

> 3、vant-ui

## 初始化

### 安装

> ## yarn 方式

```js
/* install & config */
npm install yarn -g

yarn

/*development*/
yarn run dev

/* eslint test */
yarn run lint

/* eslint fix */
yarn run lintfix

/*构建且上传静态资源*/
yarn run build

/*仅仅用于上传静态资源*/
yarn run upload

/*启动项目*/
yarn run start

```

> ## npm 方式

> 1.  普通方式

```js

    /* install & config */
    npm config set registry http://192.168.213.158:4873/

    npm i

    /*development*/
    npm run dev

    /* eslint test */
    npm run lint

    /* eslint fix */
    npm run lintfix

    /*构建且上传静态资源*/
    npm run build

    /*仅仅用于上传静态资源*/
    npm run upload

    /*启动项目*/
    npm run start
```

> 2.  nrm 方式

```js
    /* install & config */
    npm i nrm -g

    nrm add hxtrip http://192.168.213.158:4873/

    nrm use hxtrip

    npm i

    /*development*/
    npm run dev

    /* eslint test */
    npm run lint

    /* eslint fix */
    npm run lintfix

    /*构建且上传静态资源*/
    npm run build

    /*仅仅用于上传静态资源*/
    npm run upload

    /*启动项目*/
    npm run start

```

### 文件目录说明

> 以下存在 src 目录下：

| 文件夹     | 存放功能                | 备注                                                                                                                     |
| ---------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| api        | serveice API            | 所有的 http 请求（或其他异步、网络请求）代码放此处                                                                       |
| assets     | css、img、font          | 业务代码的所有公用文件资源                                                                                               |
| components | vue components          | 通用组件，没有业务逻辑                                                                                                   |
| layouts    | all Page layout         | 如果有 2 或 2 个以上页面存在公用的布局代码，需要提到 layouts 来                                                          |
| middleware | nuxt koa2 middleware    | 中间件，常常用来服务端初始化数据用                                                                                       |
| modules    | common code             | 如果有 2 或 2 个以上页面存在公用的业务代码，需要提到 modules 来，这里不能使用 vux 只能使用 props 和\$emit 来处理数据交互 |
| pages      | pages                   | 项目入口页面                                                                                                             |
| plugins    | nuxt plugins            | 全局的插件，常常用来全局引用资源用                                                                                       |
| router     | custom routers          | 自定义页面路由，这里重置了 nuxt-router                                                                                   |
| static     | application http static | 当前 host 下静态资源 http 服务                                                                                           |
| store      | vuex                    | 状态机，子页面需要使用 vux 的 modules 来存储                                                                             |
| app.html   | application template    | 项目主入口模板                                                                                                           |
