**acm**: 项目后端代码. 采用的Spring boot搭建, 更多配置信息请看相关配置文件描述. Maven包管理器.

**front_end_PC**: 前端样式-综合了PC和mobile, 名字就不改了, 具体的如下
* src/mobile 下都是手机端的样式代码
* src/pages 下都是PC端的代码
* PC的url以admin打头, mobile的以mobile打头
* 预期不会使用电脑登录mobile打头的, 毕竟这只是给微信公众号使用的, 不会有url改变的情况
* 其余公用
* 进入本文件夹先执行 npm install 安装所有react中使用到的包. 再进行启动

**front_end_mobile**: 手机端样式[已废弃]

**sqlFile**: 项目中相关的数据库文件