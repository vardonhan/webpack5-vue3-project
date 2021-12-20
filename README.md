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