# 简介
这是区块链与数字货币课程的大作业Dapp

# 前端搭建
进入前端根目录，打开控制台输入```npm i```安装node_modules，安装完成后输入npm start运行。

# 智能合约搭建
本项目的智能合约搭建于本地ganache中。
首先打开ganache新建项目，选择智能合约目录中的truffle-config.js，然后将端口设置为7545，启动项目。
在智能合约根目录中打开控制台，输入```truffle migrate```，即可将智能合约部署在ganache中。
注意部署后需要在前端的caller.js文件中修改合约地址才可正常运行。
