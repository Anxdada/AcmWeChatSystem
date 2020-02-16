


主要寄一个关于时间的坑, 字段中免不了使用时间字段

主要是我使用的框架是antd, 里面默认和时间相关的都用的是moment.js

数据库中存放的时间还不准, 以见到的为实际, 不知道是不是我的本地mysql有问题还是显示有问题

主要就是区分现在表示时间的点是moment, date 还是 string ?

前台显示 -> 接收的string, 格式在接收的时候转好(moment.format), 显示前转成moment即可

传递给后台 -> 是传string, 格式也是在传递的时候用moment.format() 转好, 后台接受的是个string! 

存到数据库 -> 数据库的字段还是Date, 而我们拿到的是string, 所以在后台使用SimpleDateFormat parse 为Date格式, 存到数据库

返回数据给前台 -> 此时是从数据库拿到的数据, 所以类型为Date, 返回前处理数据为String, 使用转换工具类

...

moment.format() 的结果是String 而不再是moment !!!