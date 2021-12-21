一. 初始化
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
const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, './src/index.ts'),
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: path.resolve(__dirname, './node_modules'),
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
6. 添加html模板
``` js
// 在根目录下新建index.html模板
// 安装依赖
// npm install --save-dev html-webpack-plugin
// 添加配置
const HtmlWebpackPlugin = require('html-webpack-plugin');
......
plugins: [new HtmlWebpackPlugin({
  title: 'webpack5-vue3-project',
  template: path.resolve(__dirname, './index.html'),
})],
```