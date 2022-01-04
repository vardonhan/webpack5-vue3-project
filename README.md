## 一. 初始化
1. 新建项目
    ``` js
    git init // 初始化git仓库
    npm init -y // 初始化package.json
    // 为确保你运行我们刚刚在本地安装的TypeScript编译器，应在命令前加上 npx。
    // npx是个很棒的工具，它将在node_modules 文件夹中查找你提供的命令，因此，通
    // 过在命令前面加上前缀，可以确保我们使用的是本地版本，而不是你可能已安装的
    // TypeScript的任何其他全局版本。
    // 这将创建一个 tsconfig.json 文件，该文件负责配置我们的TypeScript项目。
    // 您会看到该文件具有数百个选项，其中大多数选项已被注释掉（TypeScript支持 
    // tsconfig.json 文件中的注释）。
    npx tsc --init
    ```
2. src文件夹下新建入口文件index.ts
    ``` ts
    const testName = 'Jupiter';
    ```
3. 添加build脚本并执行
    ``` json
    "scripts": {
      "build": "webpack"
    },
    ```
    ``` js
    // Can't resolve './src' in 'xxx'
    // 未找到入口文件
    // 默认值是 ./src/index.js
    ```
4. 添加ts-loader
    ``` js
    // 安装依赖ts-loader
    // 根目录新建webpack.config.js
    // 添加配置
    module.exports = {
      entry: './src/index.ts',
      module: {
        rules: [
          {
            test: /\.ts$/,
            exclude: '/node_modules/', // 注意这里必须是绝对路径
            use: 'ts-loader',
          }
        ]
      }
    }
    // 再次执行build脚本 可以在控制台看到
    // The 'mode' option has not been set
    // webpack will fallback to 'production' for this value.
    // 同时在输出文件夹dist下的main.js文件中我们看不到任何内容
    // 这是因为我们没有指定模式，webpack将默认使用生产模式，
    // 而生产模式会使用tree-shaking
    // 我们在index.ts中只声明了一个变量，而没有任何地方使用这个变量，
    // 生成的main.js文件中就把这部分内容给“去掉”了
    ```
5. 添加配置
    ``` json
    {
      mode: 'development',
      ......
    }
    ```
6. 添加html模板 [更多配置](https://github.com/jantimon/html-webpack-plugin#options)
    ``` js
    // 在根目录下新建index.html模板
    // 安装依赖
    // npm install --save-dev html-webpack-plugin
    // 添加配置
    const HtmlWebpackPlugin = require('html-webpack-plugin');
    ......
    plugins: [new HtmlWebpackPlugin({
      title: 'webpack5-vue3-project',
      template: './index.html',
    })],
    ```
    ``` html
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title><%= htmlWebpackPlugin.options.title %></title>
    </head>
    <body>
      <div id="app" />
    </body>
    </html>
    ```
## 二. 配置开发服务器
1. 安装webpack-dev-server
    ``` js
    npm install -D webpack-dev-server
1. 添加配置
    ``` js
    // webpack.dev.js
    devServer: {
      hot: true,
      port: 9000
    }
    ```
1. 添加脚本
    ``` json
    "dev": "webpack serve"
    ```
## 三. 配置拆分
在根目录新建build文件夹，在文件夹内新建webpack.base.js、webpack.dev.js和webpack.prod.js分别对应基础配置、开发配置和线上配置。需要使用webpack-merge
``` js
npm install webpack-merge -D
```
1. webpack.base.js (可以看到配置中的路径并没有因为多一级文件夹而改变 [说明](https://webpack.docschina.org/configuration/entry-context/#context))
    ``` js
    const HtmlWebpackPlugin = require('html-webpack-plugin');

    module.exports = {
      entry: './src/index.ts',
      module: {
        rules: [
          {
            test: /\.ts$/,
            exclude: '/node_modules/', // 注意这里必须是绝对路径
            use: 'ts-loader',
          }
        ]
      },
      plugins: [
        new HtmlWebpackPlugin({
          title: 'webpack5-vue3-project',
          template: './index.html',
        }),
      ],
    }
    ```
2. webpack.dev.js
    ``` js
    const { merge } = require('webpack-merge');
    const base = require('./webpack.base');
    
    module.exports = merge(base, {
      mode: 'development',
      devServer: {
        hot: true,
        port: 9000
      },
    });
    ```
3. webpack.prod.js
    ``` js
    const { merge } = require('webpack-merge');
    const base = require('./webpack.base');
    
    module.exports = merge(base, {
      mode: 'production',
    });
    ```
4. 修改脚本：
    ``` json
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1",
      "build": "webpack --config './build/webpack.prod.js'",
      "dev": "webpack serve --config './build/webpack.dev.js'"
    },
    ```
## 四. 编译各类文件
1. vue 需要安装的包 [文档](https://v3.cn.vuejs.org/guide/installation.html#%E4%B8%8B%E8%BD%BD%E5%B9%B6%E8%87%AA%E6%89%98%E7%AE%A1)
    - npm install vue@next
    - npm install -D @vue/compiler-sfc
    - npm install -D vue-loader
    ``` js
    // webpack.base.js
    module.exports = {
      ...
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            loader: 'ts-loader',
            options: {
              // 配置 ' ts-loader ' 来解析 vue 文件里的 <script lang="ts"> 代码块
              // https://v3.cn.vuejs.org/guide/typescript-support.html#%E6%8E%A8%E8%8D%90%E9%85%8D%E7%BD%AE 
              appendTsSuffixTo: [/\.vue$/],
            },
            exclude: /node_modules/,
          },
          {
            test: /\.vue$/,
            loader: 'vue-loader',
          },
          ...,
        ]
      },
      plugins: [
        new VueLoaderPlugin(),
        ...,
      ]
    ```
    坑： 
    - vue3 用@vue/compiler-sfc 替换掉了 vue-template-compiler
    - 默认安装vue-loader是15.x版本的，会有报错，需要指定16.x以上版本
    - 报错TS2307: Cannot find module './App.vue' or its corresponding type declarations. [说明](https://github.com/Microsoft/TypeScript-Vue-Starter#typescript-vue-starter)
    - 浏览器控制台警告：You are running the esm-bundler build of Vue. It is recommended to configure your bundler to explicitly replace feature flag globals with boolean literals to get proper tree-shaking in the final bundle... [说明](https://github.com/vuejs/vue-next/tree/master/packages/vue#bundler-build-feature-flags)

2. scss(css) 安装：style-loader css-loader [postcss-loader](https://github.com/postcss/postcss/blob/HEAD/docs/README-cn.md) sass sass-loader [postcss-preset-env: 允许你使用未来的CSS特性 包含了autoprefixer的添加前缀功能](https://github.com/csstools/postcss-preset-env)
    ``` js
    // webpack.base.js中添加
    {
      test: /\.(sa|sc|c)ss$/,
      use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      exclude: /node_modules/,
    },
    ```
    ``` js
    // 项目根目录新建postcss.config.js
    module.exports = {
      plugins: [
        require('postcss-preset-env'),
      ],
    };
    ```
3. ts
    为了兼容旧浏览器需要将ts-loader替换为babel来处理ts文件：
    安装相关依赖
    - [babel-loader](https://github.com/babel/babel-loader)
    - @babel/core
    - @babel/preset-env
    - @babel/preset-typescript
    ``` js
    // webpack.base.js
    {
      test: /\.(t|j)s$/,
      use: {
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        }
      }
      exclude: /node_modules/,
    },
    ```
    ``` js
    // 根目录新建babel.config.js
    module.exports = {
      presets: [
        "@babel/preset-env",
        [
          // https://babeljs.io/docs/en/babel-preset-typescript
          "@babel/preset-typescript",
          {
            allExtensions: true, //支持所有文件扩展名
          },
        ],
      ],
    };
    ```
4. img [文档](https://webpack.docschina.org/guides/asset-modules/)
    ``` js
    // webpack.base.js
    // 不需要配置url-loader等
    {
      test: /\.(png|svg|jpe?g|gif)$/,
      type: 'asset',
    },
    ```
5. font
    ``` js
    // webpack.base.js
    ```
    // TODO:
## 五. 各种配置
1. 设置路径别名
2. 提取CSS文件
3. 注入环境变量