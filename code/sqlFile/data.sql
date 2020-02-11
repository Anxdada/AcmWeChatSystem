-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `userId` bigint(11) NOT NULL AUTO_INCREMENT,
  `openId` varchar(100) DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `classNum` int(11) DEFAULT '0',
  `grade` int(11) DEFAULT '0',
  `mobile` varchar(20) DEFAULT NULL,
  `realname` varchar(50) DEFAULT NULL,
  `studentId` bigint(20) DEFAULT NULL,
  `createDay` datetime DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `auth` int(11) DEFAULT NULL,
  `isEffective` int(11) DEFAULT NULL,
  `unionid` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('2', '', 'gyt', '123456', '4', '2015', '17700000000', '张三', '2015000000', '2019-01-13 15:31:06', 'http://thirdwx.qlogo.cn/mmopen/vi_32/TVAicR3KQSMfNBX0j4uJibQfZhribgx3sAn7sztUItwDFhmZMdz1NuBW73qR4bjAOxNntxZWQOKm6k2nxo6icHW27A/132', '5', '1', null);
INSERT INTO `user` VALUES ('3', '', 'watermelon', '1234561', '3', '2015', '17700000001', '袁曦焜', '2015000003', '2019-01-17 21:40:19', 'http://localhost:9999/image/cd8b89fc-b3b7-4c69-bd06-d7a5c8f28289.jpg', '4', '1', null);
INSERT INTO `user` VALUES ('4', '', 'www', '123456', '4', '2019', '17700000002', '官怡婷', '2015000002', '2019-01-23 22:55:53', 'http://localhost:9999/image/photo/981d4cc6-7b18-4315-b08a-90dcbf4c3ad0.png', '2', '1', null);
INSERT INTO `user` VALUES ('5', 'olD4e0x14bo2CRMHAJiNgweDKaG4', 'amy', '123456', '4', '2015', '17700000003', '王五', '2015000001', '2019-04-16 17:02:37', 'http://localhost:9999/image/photo/f873cb13-f962-4c9e-a4fd-642ab090044d.png', '2', '1', null);
INSERT INTO `user` VALUES ('6', '', 'gytd', '123456', '0', '2002', '17716164149', '王麻子', '2015081159', '2019-05-28 19:19:17', 'http://localhost:9999/image/a6fc0d36-bde3-4fc1-8a4b-3af832d7a900.jpg', '0', '1', null);
INSERT INTO `user` VALUES ('7', 'olD4e0_cnxwigLLZSJiK2r7scYdc', 'hhhhh_12', '123456', '0', '0', '18064955179', '马华', '2015082053', '2019-05-31 08:08:55', 'http://localhost:9999/image/4492e40e-18bb-431f-8cc8-afb35e05f010.jpg', '2', '1', null);





-- ----------------------------
-- Table structure for `friendurl`
-- ----------------------------
DROP TABLE IF EXISTS `friendurl`;
CREATE TABLE `friendurl` (
  `friendurlId` bigint(20) NOT NULL AUTO_INCREMENT,
  `friendTitle` text,
  `friendBody` text,
  `createUser` bigint(20) DEFAULT NULL,
  `createDate` datetime DEFAULT NULL,
  `updateUser` bigint(20) DEFAULT NULL,
  `updateDate` datetime DEFAULT NULL,
  `isEffective` int(11) DEFAULT '1',
  PRIMARY KEY (`friendurlId`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of friendurl
-- ----------------------------
INSERT INTO `friendurl` VALUES ('1', '1', 'www.baidu.com', '2', '2019-03-24 17:15:28', '2', '2019-05-30 21:05:15', '0');
INSERT INTO `friendurl` VALUES ('2', '1111', '11', '2', '2019-03-24 17:16:07', '2', '2019-03-31 14:55:43', '0');
INSERT INTO `friendurl` VALUES ('3', 'sgf', 'dsg1', '2', '2019-03-31 14:51:31', '2', '2019-04-18 23:57:03', '0');
INSERT INTO `friendurl` VALUES ('4', '2', 'www.baidu.com', '2', '2019-04-18 23:57:13', '2', '2019-05-30 21:05:17', '0');
INSERT INTO `friendurl` VALUES ('5', '发送到', '士大夫', '2', '2019-05-28 13:58:09', '2', '2019-05-28 13:59:44', '0');
INSERT INTO `friendurl` VALUES ('6', '发送到', 'https://www.baidu.com', '2', '2019-05-28 13:59:58', '2', '2019-05-30 21:05:19', '0');
INSERT INTO `friendurl` VALUES ('7', '本地址', 'https://github.com/gggyt/acm_front/blob/master/acm_wei_account/my-app2/src/mobile/index.js', '2', '2019-05-28 14:04:53', '2', '2019-05-30 21:05:04', '0');
INSERT INTO `friendurl` VALUES ('8', '但是', 'http://www.baidu.com', '2', '2019-05-28 14:08:19', '2', '2019-05-30 21:05:01', '0');
INSERT INTO `friendurl` VALUES ('9', 'fsd ', 'http://www.baidu.com', '2', '2019-05-28 14:09:02', '2', '2019-05-30 21:04:58', '0');
INSERT INTO `friendurl` VALUES ('10', '测试', 'http://192.168.1.113:3000/Aside/manageFriendurl', '2', '2019-05-30 18:03:25', '2', '2019-05-30 21:04:14', '0');
INSERT INTO `friendurl` VALUES ('11', '牛客网-深圳校招', 'https://www.nowcoder.com/discuss/154351', '2', '2019-05-30 21:04:10', '2', '2019-05-30 21:04:10', '1');
INSERT INTO `friendurl` VALUES ('12', '百度', 'http://www.baidu.com', '2', '2019-05-30 21:05:44', '2', '2019-05-30 21:05:44', '1');
INSERT INTO `friendurl` VALUES ('13', '淘宝', 'https://uland.taobao.com/sem/tbsearch?refpid=mm_26632258_3504122_32538762', '2', '2019-05-30 21:06:33', '2', '2019-05-30 21:06:33', '1');
INSERT INTO `friendurl` VALUES ('14', '京东', 'https://www.jd.com/?cu=true', '2', '2019-05-30 21:07:09', '2', '2019-05-30 21:07:09', '1');
INSERT INTO `friendurl` VALUES ('15', '亚马逊', 'https://www.amazon.cn/', '2', '2019-05-30 21:11:38', '2', '2019-05-30 21:11:38', '1');
INSERT INTO `friendurl` VALUES ('16', '博客园', 'https://www.cnblogs.com/', '2', '2019-05-30 21:12:29', '2', '2019-05-30 21:12:29', '1');
INSERT INTO `friendurl` VALUES ('17', '牛客网', 'https://www.nowcoder.com/', '2', '2019-05-30 21:12:43', '2', '2019-05-30 21:12:43', '1');
INSERT INTO `friendurl` VALUES ('18', 'CSDN', 'https://www.csdn.net/', '2', '2019-05-30 21:12:59', '2', '2019-05-30 21:12:59', '1');
INSERT INTO `friendurl` VALUES ('19', '慕课网', 'https://class.imooc.com/?mc_marking=4e0b0537f151197140fed11920097988', '2', '2019-05-30 21:13:16', '2', '2019-05-30 21:13:16', '1');
INSERT INTO `friendurl` VALUES ('20', '教程网', 'http://www.jcwcn.com/', '2', '2019-05-30 21:14:33', '2', '2019-05-30 21:14:41', '0');
INSERT INTO `friendurl` VALUES ('21', '教程网', 'http://www.jcwcn.com/', '2', '2019-05-30 21:14:33', '2', '2019-05-30 21:14:43', '0');
INSERT INTO `friendurl` VALUES ('22', '教程网', 'http://www.jcwcn.com/', '2', '2019-05-30 21:14:33', '2', '2019-05-30 21:14:33', '1');
INSERT INTO `friendurl` VALUES ('23', '杭电oj', 'http://acm.hdu.edu.cn/', '2', '2019-05-30 21:15:21', '2', '2019-05-30 21:15:21', '1');





-- ----------------------------
-- Table structure for `invitation`
-- ----------------------------
DROP TABLE IF EXISTS `invitation`;
CREATE TABLE `invitation` (
  `invitationId` bigint(20) NOT NULL,
  `invitationTitle` varchar(100) DEFAULT NULL,
  `invitationBody` text,
  `createUser` int(11) DEFAULT NULL,
  `createDate` datetime DEFAULT NULL,
  `updateUser` int(11) DEFAULT NULL,
  `updateDate` datetime DEFAULT NULL,
  `readNum` int(11) DEFAULT NULL,
  `agreeNum` int(11) DEFAULT NULL,
  `isFirst` int(11) DEFAULT NULL,
  `isGreate` int(11) DEFAULT NULL COMMENT '是否加精',
  `isEffective` int(11) DEFAULT NULL,
  PRIMARY KEY (`invitationId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of invitation
-- ----------------------------
INSERT INTO `invitation` VALUES ('1071434009936', '第一次来到ACM', '<p>&nbsp;&nbsp;&nbsp;&nbsp;这是我第一次参加学习集体活动，开始前内心还是不安，难耐，甚至激动的，参加之后才发现自己不虚此行。</p><p>&nbsp; &nbsp; ACM校队的同学都很友善，大家都乐于帮助他人，还有每周的讲座让我收获良多。<br></p><p>&nbsp; &nbsp; 非常感谢我校ACM校队给了我这么完美的体验。<br></p><p><img src=\"http://localhost:9999/image/c2813c9f-7911-44f7-b167-6f364fc569f2.png\" style=\"max-width:100%;\"><br></p>', '3', '2019-05-29 20:20:19', '3', '2019-05-29 20:20:19', '0', '0', '0', '0', '1');
INSERT INTO `invitation` VALUES ('1295658576479', '发送到', '<p>防守打法&nbsp;<img src=\"http://localhost:9999/image/1f1bdc67-ff0b-419e-b7e3-cdfad3f7bb1b.png\" style=\"max-width: 100%;\"></p>', '2', '2019-05-29 18:38:18', '2', '2019-05-29 18:38:18', '2', '0', '0', '0', '0');
INSERT INTO `invitation` VALUES ('1859766857732', '关于CUIT-ACM的一些小规则', '<p>&nbsp; &nbsp; 非常感谢大家信任并使用ACM公众号，并在论坛区域永远发言，让我们感受到了我校对ACM感兴趣的学生的热血。</p><p>&nbsp; &nbsp; 但是没有规矩不成方圆，也请各位积极配合我们小队成员遵守以下规则：</p><ol><li>请文明用语</li><li>请勿发布违法犯忌的帖子</li><li>尊重他人劳动成果</li><li>切勿灌水</li><li>文明和谐友爱互助</li></ol>', '2', '2019-05-29 19:14:15', '2', '2019-05-30 16:23:52', '31', '0', '1', '1', '1');
INSERT INTO `invitation` VALUES ('2473559903859', '你是你是你是你是你是你是你是你是你是你是', 'nishishei 是否是<p>反倒是但是啊阿萨德</p>', '3', '2019-05-28 17:26:52', '3', '2019-05-28 18:56:07', '55', '0', '0', '0', '1');
INSERT INTO `invitation` VALUES ('2879753588515', '测试添加帖子', '<p>发送到发送到<img src=\"http://localhost:9999/image/8a5c60b9-242e-49f8-8159-b6b535467918.png\" style=\"max-width: 100%;\"></p>', '5', '2019-05-31 13:49:51', '5', '2019-05-31 13:49:51', '2', '0', '0', '0', '1');
INSERT INTO `invitation` VALUES ('3404944572162', '防守打法', '<p>反倒是</p>', '4', '2019-05-29 23:06:26', '4', '2019-05-29 23:06:26', '2', '0', '0', '0', '0');
INSERT INTO `invitation` VALUES ('3868474992461', '测试帖子', '<p><img src=\"http://localhost:9999/image/ca54c0eb-8055-46da-b2ad-4088531a2ddd.png\" style=\"max-width:100%;\">你好，测试帖子<br></p>', '6', '2019-05-28 21:12:39', '6', '2019-05-28 21:12:39', '4', '0', '0', '0', '0');
INSERT INTO `invitation` VALUES ('4730740970628', '防守打法  ', '<p>&nbsp;&nbsp;<img src=\"http://localhost:9999/image/e84472c1-98f8-4472-b420-cc516c3d768e.png\" style=\"max-width: 100%;\">&nbsp;防守打法</p>', '2', '2019-05-29 18:42:48', '2', '2019-05-29 18:42:48', '0', '0', '0', '0', '0');
INSERT INTO `invitation` VALUES ('5265346118918', '你们对我校ACM有什么建议呢？', '<p>rt，大家畅所欲言。</p>', '2', '2019-05-27 20:54:38', '2', '2019-05-27 20:54:38', '2', '0', '0', '1', '1');
INSERT INTO `invitation` VALUES ('5628795717575', '61快乐|寻找消失的童年', '<div>你的童年是什么样的？</div><div>是春天的风筝蚂蚱？还是夏天的冰棍西瓜？</div><div>是放学后为了五点半的动漫飞奔回家？</div><div>还是偷偷攒下的几毛钱买来辣条和头花？</div><div><br></div><div>你还记得，</div><div>你的童年是什么模样吗？</div><ul><li>参与下方有奖竞答（共12题），并将你的答案<strong>直接回复在本帖下</strong></li><li>每位牛友仅有<strong>1次</strong>参与机会，多次回复以<strong>最早发布的答案</strong>作为最终参与结果</li><li>6月1日公布中奖名单及正确答案~</li></ul><p>活动奖励：</p><ul><li>全部猜对的前5个牛友，送<strong>童年掌上游戏机（图左）</strong>一台！</li><li>每10个参与者（以id计算），抽1个牛友送<strong>牛可乐T恤（图右）</strong>一件！</li></ul><p><img src=\"http://localhost:9999/image/1b952547-07c5-4990-bed9-852ba81c11f6.png\" style=\"max-width:100%;\"><br></p>', '4', '2019-05-30 19:40:20', '4', '2019-05-30 19:40:20', '3', '0', '0', '0', '1');
INSERT INTO `invitation` VALUES ('5976062703079', '测试', '<p>士大夫但是</p>', '3', '2019-05-28 14:37:12', '3', '2019-05-28 14:37:12', '0', '0', '0', '0', '0');
INSERT INTO `invitation` VALUES ('8123709015376', '测试发布帖子', '<p>分类考试的 &nbsp;&nbsp;<img src=\"http://localhost:9999/image/ced27c81-cf97-4c66-a945-829cd0df9f10.png\" style=\"max-width: 100%;\"></p><p>&nbsp; dskajd &nbsp;大 &nbsp;大&nbsp;</p><ol><li>&nbsp; 撒的的<br></li><li>大</li></ol>', '6', '2019-05-29 19:02:06', '6', '2019-05-29 19:02:49', '3', '0', '0', '0', '0');
INSERT INTO `invitation` VALUES ('8403266149230', '大家好，测试添加帖子', '<p>', '2', '2019-05-29 16:20:30', '2', '2019-05-29 16:22:08', '4', '0', '0', '0', '1');
INSERT INTO `invitation` VALUES ('9511674303056', '发的所发生的', '<p>防守打法<img src=\"http://localhost:9999/image/ffb83cdf-03b3-4e6b-8538-b40035dc8ab4.png\" style=\"max-width: 100%;\"></p>', '5', '2019-05-31 12:40:37', '5', '2019-05-31 12:40:37', '2', '0', '1', '0', '1');
INSERT INTO `invitation` VALUES ('9605454425196', '测试添加帖子2', '<p>副书记&nbsp; 少奋斗</p><p>&nbsp;&nbsp;</p><table border=\"0\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\"><tbody><tr><th>&nbsp;撒</th><th>撒的&nbsp;</th></tr><tr><td>&nbsp;爱迪生</td><td>&nbsp;是大11111111111111<br>11111111111111111<br>11111111111111111111111111111111111<br>1111111111</td></tr></tbody></table><p><br></p><p>绕弯儿&nbsp; &nbsp;<span style=\"font-style: italic;\">而我&nbsp; &nbsp;</span></p><p><img src=\"http://localhost:9999/image/ebd6a2ea-2a10-4840-84e1-bd86ad018fba.png\" style=\"max-width:100%;\"><span style=\"font-style: italic;\"><br></span></p>', '2', '2019-05-29 16:24:54', '2', '2019-05-29 16:28:37', '3', '0', '0', '0', '1');
INSERT INTO `invitation` VALUES ('9816595231865', '大家好，我是Amy', '<p>很高兴认识大家 &nbsp; 我是Amy &nbsp;今年21岁</p><p>&nbsp; 下面是我的自拍照~</p><p><img src=\"http://localhost:9999/image/40ec0cb6-1dde-423a-9f41-da6e42bff51b.png\" style=\"max-width:100%;\"><br></p>', '5', '2019-05-31 00:07:51', '5', '2019-05-31 00:07:51', '3', '0', '0', '0', '1');
INSERT INTO `invitation` VALUES ('230990923462386', '大家好', '<p>&nbsp; 大家好，我是对ACM感兴趣的王五，我们交个朋友吧~</p>', '2', '2019-02-05 17:20:42', '2', '2019-05-30 19:51:54', '4', '0', '0', '1', '1');
INSERT INTO `invitation` VALUES ('308897914006141', '嘻嘻', '<p>嘿嘿</p>', '2', '2019-02-05 17:04:21', '2', '2019-02-05 17:04:21', '0', '0', '0', '1', '0');
INSERT INTO `invitation` VALUES ('536675195929624', '快女老款车型', '<p>防守打法is的士大夫<img src=\"http://localhost:9999/image/17335ddf-8415-4da9-8261-b9a3d410d5d9.png\" style=\"max-width: 100%;\"></p>', '3', '2019-05-23 17:42:55', '3', '2019-05-23 17:43:30', '2', '0', '0', '0', '0');
INSERT INTO `invitation` VALUES ('718016987019500', '法国韩国', '<p>的VS地方</p>', '2', '2019-04-18 12:42:56', '2', '2019-04-18 12:42:56', '0', '0', '0', '0', '1');
INSERT INTO `invitation` VALUES ('954727870691122', '大家喜欢猫吗？', '<p>今天看了只特别可爱的猫咪，大家喜欢猫吗？<img src=\"http://localhost:9999/image/00fd63cd-5cbe-4ecf-aa01-41a80de4aa2b.png\" style=\"max-width: 100%;\"></p>', '2', '2019-04-18 18:24:25', '2', '2019-04-18 18:24:25', '11', '0', '1', '1', '1');
INSERT INTO `invitation` VALUES ('1119390155742060', '恶趣味', '<p>发生的</p>', '2', '2019-02-05 17:10:26', '2', '2019-02-05 17:10:26', '0', '0', '0', '0', '0');
INSERT INTO `invitation` VALUES ('1435700423676110', 'vcxv 地方', '<p>生巅峰 是的</p>', '2', '2019-02-05 17:08:01', '2', '2019-02-05 17:08:01', '0', '0', '0', '0', '0');
INSERT INTO `invitation` VALUES ('1883505665513026', '今天天气真好', '<p>今天天气很好，心情也不错</p>', '2', '2019-04-17 09:11:11', '2', '2019-04-17 09:11:11', '0', '0', '0', '0', '0');
INSERT INTO `invitation` VALUES ('1892537549045909', '测试修改操作', '<p>你好啊是的范德萨</p>', '2', '2019-05-23 17:27:44', '2', '2019-05-23 17:27:47', '0', '0', '0', '0', '1');
INSERT INTO `invitation` VALUES ('2036456520214558', '士大夫', '<p>第三方防守打法</p>', '2', '2019-05-25 12:22:42', '2', '2019-05-27 20:55:59', '0', '0', '0', '0', '1');
INSERT INTO `invitation` VALUES ('2051039313976054', '梵蒂冈', '<p>电饭锅地方</p>', '2', '2019-05-25 12:22:26', '2', '2019-05-25 12:22:26', '0', '0', '0', '0', '1');
INSERT INTO `invitation` VALUES ('2364247792080840', '徐', '<p><img src=\"http://192.168.1.113:9999/image/3b0f2364-4e2d-4fcb-9e92-21a9cce028d7.jpg\" style=\"max-width:100%;\">执行程序士大夫<br></p>', '2', '2019-04-18 12:43:53', '2', '2019-05-23 17:35:26', '0', '0', '0', '0', '0');
INSERT INTO `invitation` VALUES ('2781522274799428', '124', '<p>地方</p>', '2', '2019-02-05 17:36:03', '2', '2019-02-05 17:36:03', '0', '0', '0', '0', '0');
INSERT INTO `invitation` VALUES ('3066211832274202', 'qq', 'qq', '2', '2019-02-05 16:41:30', '2', '2019-02-05 16:41:30', '0', '0', '0', '0', '0');
INSERT INTO `invitation` VALUES ('3219305957921195', '嘻嘻', '<p>会计法</p>', '2', '2019-02-05 17:22:38', '2', '2019-02-05 17:22:38', '0', '0', '0', '0', '0');
INSERT INTO `invitation` VALUES ('3279702978103125', '你好啊', '<p>罚款是假的回复</p>', '2', '2019-04-16 21:51:00', '2', '2019-04-16 21:51:00', '0', '0', '0', '0', '1');
INSERT INTO `invitation` VALUES ('3310312877769883', '呵呵', '<p><img src=\"http://localhost:9999/image/b0b9c996-6578-45ae-8200-dd57210b3b8c.png\" style=\"max-width:100%;\">嘻嘻<br></p>', '2', '2019-02-06 21:48:03', '2', '2019-02-06 21:48:03', '0', '0', '0', '0', '0');
INSERT INTO `invitation` VALUES ('3413284815091624', 'vcxv ', '<p>生巅峰', '2', '2019-02-05 17:07:42', '2', '2019-02-05 17:07:42', '0', '0', '0', '0', '1');
INSERT INTO `invitation` VALUES ('3703306343577686', '嘻嘻', '<p>你好</p>', '2', '2019-02-05 17:14:10', '2', '2019-02-05 17:14:10', '0', '0', '0', '0', '0');
INSERT INTO `invitation` VALUES ('4155492829009686', '124地方', '<p>苟富贵</p>', '2', '2019-02-05 17:29:35', '2', '2019-02-05 17:29:35', '0', '0', '0', '0', '0');
INSERT INTO `invitation` VALUES ('4845929065595230', 'vfg', '<p>苟富贵</p>', '2', '2019-02-05 17:24:26', '2', '2019-02-05 17:24:26', '0', '0', '0', '0', '0');
INSERT INTO `invitation` VALUES ('4855373045447920', '你好', '<p>分手的范德萨</p>', '3', '2019-05-23 17:40:35', '3', '2019-05-23 17:40:35', '0', '0', '0', '0', '0');
INSERT INTO `invitation` VALUES ('4915790288345535', '嘻嘻看', '<p>见覅</p>', '2', '2019-02-05 17:26:43', '2', '2019-02-05 17:26:43', '0', '0', '0', '0', '0');
INSERT INTO `invitation` VALUES ('5133061676258650', '234', '<p><img src=\"http://localhost:9999/image/6d963855-5967-4384-92ca-7a20c7dbee04.png\" style=\"max-width:100%;\">而对方<br></p>', '2', '2019-02-05 17:38:04', '2', '2019-02-05 17:38:04', '0', '0', '0', '0', '0');
INSERT INTO `invitation` VALUES ('5293074972392059', '你好，测试添加帖子功能', '<p><img src=\"http://localhost:9999/image/34e6ca56-5ba3-4133-bb1a-c45593642177.png\" style=\"max-width:100%;\"><span style=\"font-weight: bold;\">测试添加帖子成功</span><br></p>', '2', '2019-05-23 17:15:35', '2', '2019-05-23 17:15:35', '0', '0', '0', '0', '1');
INSERT INTO `invitation` VALUES ('5546779890534882', '嘻嘻', '<p>你好</p>', '2', '2019-02-05 17:38:20', '2', '2019-02-05 17:38:20', '0', '0', '0', '0', '0');
INSERT INTO `invitation` VALUES ('5703840197657974', '你好', '<p>你好</p>', '2', '2019-02-05 17:00:28', '2', '2019-02-05 17:00:28', '0', '0', '0', '0', '1');
INSERT INTO `invitation` VALUES ('5936212477099181', 'heheh ', '<p>dgf</p>', '3', '2019-02-06 21:52:54', '3', '2019-02-06 21:52:54', '0', '0', '0', '0', '0');
INSERT INTO `invitation` VALUES ('5937175664957778', '23', '<p>对方的</p>', '2', '2019-02-05 17:21:12', '2', '2019-02-05 17:21:12', '0', '0', '0', '0', '0');
INSERT INTO `invitation` VALUES ('6187656966395760', '测试', '<p>123456789的风格和健康</p>', '2', '2019-02-06 23:16:33', '2', '2019-02-06 23:16:33', '0', '0', '0', '0', '0');
INSERT INTO `invitation` VALUES ('6474734052243360', 'heihei', '<p><img src=\"http://localhost:9999/image/d59dd404-a192-4a2c-a5a9-440e0ad50a83.png\" style=\"max-width:100%;\">hehe<br></p>', '2', '2019-02-10 15:21:26', '2', '2019-02-10 15:21:26', '0', '0', '0', '0', '0');
INSERT INTO `invitation` VALUES ('6564625526063640', '12', '<p>32</p>', '2', '2019-02-05 17:18:08', '2', '2019-02-05 17:18:08', '0', '0', '0', '0', '0');
INSERT INTO `invitation` VALUES ('7564953237786583', '12', '<p>2564</p>', '2', '2019-02-05 17:33:20', '2', '2019-02-05 17:33:20', '0', '0', '0', '0', '0');
INSERT INTO `invitation` VALUES ('7809472500934933', '你好测试', '<h1>vkjdf;gl</h1><p>嘻嘻<img src=\"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/3c/pcmoren_wu_org.png\" alt=\"[污]\" data-w-e=\"1\"></p><table border=\"0\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\"><tbody><tr><th>1', '2', '2019-02-08 20:14:59', '2', '2019-02-08 20:14:59', '0', '0', '0', '0', '0');
INSERT INTO `invitation` VALUES ('8045674857017881', '你好', '<p>你好啊</p>', '2', '2019-02-05 17:38:58', '2', '2019-02-05 17:38:58', '0', '0', '0', '0', '0');
INSERT INTO `invitation` VALUES ('8054001019179922', 'xgg', '<p>1234567890qwertyuiopsdfghjklzxcvbnm,wghjkl;dfghjklfghjkldfghjkl;zxcvbnm,rtk</p>', '3', '2019-02-06 21:51:27', '3', '2019-02-06 21:51:27', '0', '0', '0', '0', '0');
INSERT INTO `invitation` VALUES ('8210395643038462', '你你你你你你你你你你你你你你你你你你你你', '<p>你好啊</p>', '2', '2019-05-25 12:22:02', '2', '2019-05-25 12:22:13', '0', '0', '0', '0', '1');
INSERT INTO `invitation` VALUES ('8719956916988658', '户口挂靠', '<p>交互接口和</p>', '2', '2019-02-05 17:33:33', '2', '2019-02-05 17:33:33', '0', '0', '0', '0', '0');
INSERT INTO `invitation` VALUES ('9042283187470908', '表格', '<table border=\"0\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\"><tbody><tr><th>', '2', '2019-02-08 20:15:53', '2', '2019-02-08 20:15:53', '0', '0', '0', '0', '0');
INSERT INTO `invitation` VALUES ('9184881617885980', '今天5.22', '<p>我在测试添加帖子功能<img src=\"http://localhost:9999/image/d7d8bdba-126f-4841-9613-f3d5dc642514.png\" style=\"max-width: 100%;\">地方少</p>', '2', '2019-05-22 13:14:12', '2', '2019-05-22 13:14:16', '0', '0', '0', '0', '1');
INSERT INTO `invitation` VALUES ('9202820631981456', '231', '<p>反倒是</p>', '2', '2019-02-05 17:06:59', '2', '2019-02-05 17:06:59', '0', '0', '0', '0', '1');
INSERT INTO `invitation` VALUES ('9315430920657146', '你好，这是测试', '<p>你好，这是测试添加帖子的帖子</p>', '2', '2019-05-03 13:54:56', '2', '2019-05-03 13:54:56', '0', '0', '0', '0', '1');
INSERT INTO `invitation` VALUES ('9524921355119727', '13规范', '<p>地方法规</p>', '2', '2019-02-05 17:28:28', '2', '2019-02-05 17:28:28', '0', '0', '0', '0', '1');
INSERT INTO `invitation` VALUES ('9807265304226575', '漆味', '<p>负担</p>', '2', '2019-02-05 17:02:57', '2', '2019-02-05 17:02:57', '0', '0', '0', '0', '1');
INSERT INTO `invitation` VALUES ('9924427597017446', 'qq', 'qq', '2', '2019-05-17 20:56:26', '2', '2019-05-17 20:56:26', '0', '0', '0', '0', '0');





-- ----------------------------
-- Table structure for `comment`
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `commentId` bigint(20) NOT NULL AUTO_INCREMENT,
  `invitationId` bigint(20) DEFAULT NULL,
  `p_commentId` bigint(20) DEFAULT NULL,
  `commentBody` text,
  `createUser` int(11) DEFAULT NULL,
  `createDate` datetime DEFAULT NULL,
  `isEffective` int(11) DEFAULT NULL,
  PRIMARY KEY (`commentId`),
  KEY `invitationId` (`invitationId`),
  CONSTRAINT `invitationId` FOREIGN KEY (`invitationId`) REFERENCES `invitation` (`invitationId`)
) ENGINE=InnoDB AUTO_INCREMENT=131 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of comment
-- ----------------------------
INSERT INTO `comment` VALUES ('2', '230990923462386', '0', 'xxx111111xxx11111111111111111111111111111111111111111111111111111111111xxx11111111111111111111111111111111111111111111111111111111111xxx11111111111111111111111111111111111111111111111111111111111xxx11111111111111111111111111111111111111111111111111111111111xxx11111111111111111111111111111111111111111111111111111111111xxx11111111111111111111111111111111111111111111111111111111111xxx11111111111111111111111111111111111111111111111111111111111xxx11111111111111111111111111111111111111111111111111111111111xxx11111111111111111111111111111111111111111111111111111111111xxx11111111111111111111111111111111111111111111111111111111111xxx11111111111111111111111111111111111111111111111111111111111xxx11111111111111111111111111111111111111111111111111111111111xxx11111111111111111111111111111111111111111111111111111111111xxx11111111111111111111111111111111111111111111111111111111111xxx11111111111111111111111111111111111111111111111111111111111xxx11111111111111111111111111111111111111111111111111111111111xxx1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111x', '2', '2019-02-09 16:31:05', '0');
INSERT INTO `comment` VALUES ('3', '230990923462386', '0', 'xxxxxxx11111111111111111111111111111111111111111111111111111111111xxx11111111111111111111111111111111111111111111111111111111111xxx11111111111111111111111111111111111111111111111111111111111xxx11111111111111111111111111111111111111111111111111111111111xxx11111111111111111111111111111111111111111111111111111111111xxx11111111111111111111111111111111111111111111111111111111111xxx11111111111111111111111111111111111111111111111111111111111xxx11111111111111111111111111111111111111111111111111111111111xxx11111111111111111111111111111111111111111111111111111111111xxx11111111111111111111111111111111111111111111111111111111111xxx11111111111111111111111111111111111111111111111111111111111xxx11111111111111111111111111111111111111111111111111111111111xxx11111111111111111111111111111111111111111111111111111111111xxx11111111111111111111111111111111111111111111111111111111111xxx11111111111111111111111111111111111111111111111111111111111xxx11111111111111111111111111111111111111111111111111111111111', '3', '2019-02-09 16:37:55', '0');
INSERT INTO `comment` VALUES ('4', '8054001019179922', '0', 'ces测', '2', '2019-02-09 16:55:51', '1');
INSERT INTO `comment` VALUES ('5', '230990923462386', '3', 'xxxx', '2', '2019-02-09 16:56:32', '1');
INSERT INTO `comment` VALUES ('6', '230990923462386', '3', 'xxxx', '2', '2019-02-09 16:56:47', '1');
INSERT INTO `comment` VALUES ('7', '230990923462386', '3', '123', '2', '2019-02-09 21:37:10', '1');
INSERT INTO `comment` VALUES ('8', '230990923462386', '3', '123', '2', '2019-02-09 21:39:24', '1');
INSERT INTO `comment` VALUES ('9', '230990923462386', '3', '123', '2', '2019-02-09 21:39:57', '1');
INSERT INTO `comment` VALUES ('10', '230990923462386', '3', '124', '2', '2019-02-09 21:40:06', '1');
INSERT INTO `comment` VALUES ('11', '230990923462386', '10', '嘻嘻', '2', '2019-02-09 21:42:11', '1');
INSERT INTO `comment` VALUES ('12', '230990923462386', '9', '3', '2', '2019-02-09 21:43:02', '1');
INSERT INTO `comment` VALUES ('13', '230990923462386', '3', '123', '2', '2019-02-09 21:44:05', '1');
INSERT INTO `comment` VALUES ('14', '230990923462386', '3', '123', '2', '2019-02-09 21:44:37', '1');
INSERT INTO `comment` VALUES ('15', '230990923462386', '13', '123567', '2', '2019-02-09 21:44:44', '1');
INSERT INTO `comment` VALUES ('16', '230990923462386', '3', '12345', '2', '2019-02-09 21:45:48', '1');
INSERT INTO `comment` VALUES ('17', '230990923462386', '3', '测试', '2', '2019-02-09 21:46:10', '1');
INSERT INTO `comment` VALUES ('18', '230990923462386', '3', '测试', '2', '2019-02-09 21:46:33', '1');
INSERT INTO `comment` VALUES ('19', '230990923462386', '3', '123', '2', '2019-02-09 21:48:09', '1');
INSERT INTO `comment` VALUES ('20', '230990923462386', '3', '12', '2', '2019-02-09 21:48:44', '1');
INSERT INTO `comment` VALUES ('21', '230990923462386', '0', '123', '2', '2019-02-09 21:48:48', '0');
INSERT INTO `comment` VALUES ('22', '230990923462386', '21', '嘻嘻', '2', '2019-02-09 21:48:54', '1');
INSERT INTO `comment` VALUES ('23', '230990923462386', '21', '嘻嘻', '2', '2019-02-09 21:49:11', '1');
INSERT INTO `comment` VALUES ('24', '230990923462386', '21', '12cxc ', '2', '2019-02-09 21:52:19', '1');
INSERT INTO `comment` VALUES ('25', '230990923462386', '3', 'xzcf ', '2', '2019-02-09 21:53:19', '1');
INSERT INTO `comment` VALUES ('26', '230990923462386', '0', 'gg', '2', '2019-02-09 21:55:43', '1');
INSERT INTO `comment` VALUES ('27', '230990923462386', '26', '123', '2', '2019-02-09 21:55:58', '1');
INSERT INTO `comment` VALUES ('28', '230990923462386', '26', '123', '2', '2019-02-09 21:58:27', '1');
INSERT INTO `comment` VALUES ('29', '230990923462386', '26', '123', '2', '2019-02-09 21:58:38', '1');
INSERT INTO `comment` VALUES ('30', '230990923462386', '0', '1', '2', '2019-02-09 21:58:41', '1');
INSERT INTO `comment` VALUES ('31', '230990923462386', '30', '123', '2', '2019-02-09 21:58:46', '1');
INSERT INTO `comment` VALUES ('32', '230990923462386', '30', '123', '2', '2019-02-09 22:00:14', '1');
INSERT INTO `comment` VALUES ('33', '230990923462386', '30', '123', '2', '2019-02-09 22:00:18', '1');
INSERT INTO `comment` VALUES ('34', '230990923462386', '0', '1', '2', '2019-02-09 22:00:21', '0');
INSERT INTO `comment` VALUES ('35', '230990923462386', '30', '1', '2', '2019-02-09 22:01:14', '1');
INSERT INTO `comment` VALUES ('36', '230990923462386', '34', '1', '2', '2019-02-09 22:01:25', '1');
INSERT INTO `comment` VALUES ('37', '230990923462386', '34', '1', '2', '2019-02-09 22:01:34', '1');
INSERT INTO `comment` VALUES ('38', '230990923462386', '34', '1', '2', '2019-02-09 22:02:19', '1');
INSERT INTO `comment` VALUES ('39', '230990923462386', '34', '1', '2', '2019-02-09 22:03:51', '1');
INSERT INTO `comment` VALUES ('40', '230990923462386', '0', '1', '2', '2019-02-09 22:03:55', '0');
INSERT INTO `comment` VALUES ('41', '230990923462386', '40', '1', '2', '2019-02-09 22:04:03', '1');
INSERT INTO `comment` VALUES ('42', '230990923462386', '0', 'xxxxxxxxxxxxx', '2', '2019-02-09 22:05:40', '0');
INSERT INTO `comment` VALUES ('43', '230990923462386', '0', 'ceshi', '2', '2019-02-09 22:06:05', '1');
INSERT INTO `comment` VALUES ('44', '230990923462386', '43', '1', '2', '2019-02-09 22:06:09', '1');
INSERT INTO `comment` VALUES ('45', '230990923462386', '0', '123fd ', '2', '2019-02-09 22:06:52', '1');
INSERT INTO `comment` VALUES ('46', '230990923462386', '45', '123', '2', '2019-02-09 22:08:03', '1');
INSERT INTO `comment` VALUES ('47', '230990923462386', '0', 'xuxuha ', '2', '2019-02-09 22:08:49', '1');
INSERT INTO `comment` VALUES ('48', '230990923462386', '0', '12dsf gret ', '2', '2019-02-09 22:10:02', '1');
INSERT INTO `comment` VALUES ('49', '230990923462386', '0', 'grhgthytu', '2', '2019-02-09 22:10:11', '1');
INSERT INTO `comment` VALUES ('50', '230990923462386', '0', 'dffdg', '2', '2019-02-09 22:10:51', '1');
INSERT INTO `comment` VALUES ('51', '230990923462386', '0', 'dfg', '2', '2019-02-09 22:11:17', '1');
INSERT INTO `comment` VALUES ('52', '230990923462386', '51', '123', '2', '2019-02-09 22:11:37', '1');
INSERT INTO `comment` VALUES ('53', '230990923462386', '0', '1234', '2', '2019-02-09 22:11:42', '1');
INSERT INTO `comment` VALUES ('54', '230990923462386', '0', '士大夫', '2', '2019-02-09 22:13:08', '1');
INSERT INTO `comment` VALUES ('55', '230990923462386', '51', '·1323', '2', '2019-02-09 22:13:14', '1');
INSERT INTO `comment` VALUES ('56', '230990923462386', '0', '你好', '2', '2019-02-09 22:13:39', '1');
INSERT INTO `comment` VALUES ('57', '230990923462386', '56', '你好', '2', '2019-02-09 22:13:46', '1');
INSERT INTO `comment` VALUES ('58', '8054001019179922', '0', '你好啊', '2', '2019-02-09 22:14:16', '1');
INSERT INTO `comment` VALUES ('59', '230990923462386', '0', 'heihi', '3', '2019-02-09 22:16:28', '1');
INSERT INTO `comment` VALUES ('60', '230990923462386', '56', '回复@gyt: hehe', '3', '2019-02-09 22:16:35', '0');
INSERT INTO `comment` VALUES ('61', '230990923462386', '0', 'xgsb', '3', '2019-02-09 23:29:11', '0');
INSERT INTO `comment` VALUES ('62', '230990923462386', '61', '回复@xgg: qwerty', '3', '2019-02-09 23:29:23', '1');
INSERT INTO `comment` VALUES ('63', '3279702978103125', '0', '什么时候', '2', '2019-04-16 21:51:07', '1');
INSERT INTO `comment` VALUES ('64', '3279702978103125', '0', '你好', '2', '2019-04-16 21:51:36', '1');
INSERT INTO `comment` VALUES ('65', '230990923462386', '0', '你好呀', '2', '2019-04-17 09:17:01', '1');
INSERT INTO `comment` VALUES ('66', '230990923462386', '0', '爱的色放', '2', '2019-04-18 12:43:17', '1');
INSERT INTO `comment` VALUES ('67', '230990923462386', '0', '你好', '2', '2019-04-18 23:27:00', '0');
INSERT INTO `comment` VALUES ('68', '230990923462386', '0', '嘿嘿', '2', '2019-04-18 23:27:21', '1');
INSERT INTO `comment` VALUES ('69', '2364247792080840', '0', '你', '2', '2019-04-18 23:27:45', '1');
INSERT INTO `comment` VALUES ('70', '230990923462386', '0', '什么', '2', '2019-04-18 23:27:54', '1');
INSERT INTO `comment` VALUES ('71', '230990923462386', '0', '的功夫', '2', '2019-04-18 23:29:04', '1');
INSERT INTO `comment` VALUES ('72', '230990923462386', '0', '？？', '2', '2019-04-18 23:29:21', '1');
INSERT INTO `comment` VALUES ('73', '230990923462386', '0', '阿斯蒂芬', '2', '2019-04-18 23:30:01', '1');
INSERT INTO `comment` VALUES ('74', '230990923462386', '73', '回复@gyt: a案发当时', '2', '2019-04-18 23:30:06', '0');
INSERT INTO `comment` VALUES ('75', '230990923462386', '0', '夫是德国', '2', '2019-04-18 23:30:12', '1');
INSERT INTO `comment` VALUES ('76', '230990923462386', '0', '双方的', '2', '2019-05-22 14:39:30', '1');
INSERT INTO `comment` VALUES ('77', '954727870691122', '0', '我喜欢英短', '2', '2019-05-25 12:49:17', '1');
INSERT INTO `comment` VALUES ('78', '954727870691122', '0', '的方式', '2', '2019-05-25 12:49:32', '1');
INSERT INTO `comment` VALUES ('79', '954727870691122', '77', '回复@gyt: 我喜欢银渐层', '2', '2019-05-25 12:49:44', '1');
INSERT INTO `comment` VALUES ('80', '954727870691122', '77', '的撒', '2', '2019-05-25 12:49:51', '1');
INSERT INTO `comment` VALUES ('81', '954727870691122', '78', '回复@gyt: 什么，你在说什么，我听补丁呢？', '2', '2019-05-25 12:52:00', '1');
INSERT INTO `comment` VALUES ('82', '230990923462386', '67', '回复@gyt: 1', '2', '2019-05-25 12:59:00', '1');
INSERT INTO `comment` VALUES ('83', '230990923462386', '73', '回复@gyt: 1', '2', '2019-05-25 12:59:10', '0');
INSERT INTO `comment` VALUES ('84', '230990923462386', '73', '回复@gyt: 1', '2', '2019-05-25 12:59:13', '0');
INSERT INTO `comment` VALUES ('85', '230990923462386', '73', '1', '2', '2019-05-25 12:59:16', '1');
INSERT INTO `comment` VALUES ('86', '230990923462386', '73', '1', '2', '2019-05-25 12:59:19', '1');
INSERT INTO `comment` VALUES ('87', '230990923462386', '73', '1', '2', '2019-05-25 12:59:23', '1');
INSERT INTO `comment` VALUES ('88', '230990923462386', '73', '1', '2', '2019-05-25 12:59:30', '1');
INSERT INTO `comment` VALUES ('89', '230990923462386', '73', '2', '2', '2019-05-25 12:59:34', '1');
INSERT INTO `comment` VALUES ('90', '230990923462386', '73', '回复@gyt: 2', '2', '2019-05-25 13:01:26', '1');
INSERT INTO `comment` VALUES ('91', '230990923462386', '72', '回复@gyt: 发士大夫', '2', '2019-05-25 13:03:41', '0');
INSERT INTO `comment` VALUES ('92', '954727870691122', '0', '真爽', '2', '2019-05-25 13:11:23', '1');
INSERT INTO `comment` VALUES ('93', '954727870691122', '0', '的撒', '2', '2019-05-25 13:11:32', '1');
INSERT INTO `comment` VALUES ('94', '954727870691122', '0', '打算', '2', '2019-05-25 13:11:38', '1');
INSERT INTO `comment` VALUES ('95', '954727870691122', '0', '多少分', '2', '2019-05-25 13:11:43', '1');
INSERT INTO `comment` VALUES ('96', '954727870691122', '0', '十大', '2', '2019-05-25 13:11:55', '1');
INSERT INTO `comment` VALUES ('97', '954727870691122', '78', '回复@gyt: 打算', '2', '2019-05-25 13:12:13', '1');
INSERT INTO `comment` VALUES ('98', '954727870691122', '0', 'vxc', '2', '2019-05-25 18:45:54', '1');
INSERT INTO `comment` VALUES ('99', '230990923462386', '0', '是否', '2', '2019-05-25 18:47:08', '1');
INSERT INTO `comment` VALUES ('100', '230990923462386', '56', '回复@gyt: 11', '2', '2019-05-27 17:00:56', '1');
INSERT INTO `comment` VALUES ('101', '954727870691122', '98', '回复@gyt: 你在说什么', '2', '2019-05-28 12:56:31', '1');
INSERT INTO `comment` VALUES ('102', '954727870691122', '98', '回复@gyt: 111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111', '2', '2019-05-28 14:16:18', '1');
INSERT INTO `comment` VALUES ('103', '954727870691122', '0', '111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111', '2', '2019-05-28 14:18:57', '1');
INSERT INTO `comment` VALUES ('104', '536675195929624', '0', '呵呵', '3', '2019-05-28 14:34:23', '1');
INSERT INTO `comment` VALUES ('105', '2473559903859', '0', '你是什么呢', '6', '2019-05-28 20:30:02', '1');
INSERT INTO `comment` VALUES ('106', '1859766857732', '0', '好的，听管理员的话', '6', '2019-05-29 19:16:32', '1');
INSERT INTO `comment` VALUES ('107', '1859766857732', '0', '同意楼上', '6', '2019-05-29 19:16:38', '1');
INSERT INTO `comment` VALUES ('108', '1859766857732', '0', ' 1', '6', '2019-05-29 19:16:47', '1');
INSERT INTO `comment` VALUES ('109', '1859766857732', '108', '回复@gytd: 你是？', '6', '2019-05-29 19:16:55', '1');
INSERT INTO `comment` VALUES ('110', '1859766857732', '0', '好的，我会认真遵守ACM的纪律。', '3', '2019-05-29 20:26:52', '1');
INSERT INTO `comment` VALUES ('111', '5265346118918', '0', '我觉得应该加大对应的训练强度', '3', '2019-05-29 20:34:47', '1');
INSERT INTO `comment` VALUES ('112', '1859766857732', '0', '你好，我是第一次使用微信公众号，请各位多多指教。你好，我是第一次使用微信公众号，请各位多多指教。你好，我是第一次使用微信公众号，请各位多多指教。你好，我是第一次使用微信公众号，请各位多多指教。', '4', '2019-05-30 19:09:21', '1');
INSERT INTO `comment` VALUES ('113', '5628795717575', '0', '大家快来积极参与呀\n', '4', '2019-05-30 19:40:40', '1');
INSERT INTO `comment` VALUES ('114', '1859766857732', '108', '回复@gytd: 为什么不认真回复呢', '4', '2019-05-30 19:52:40', '1');
INSERT INTO `comment` VALUES ('115', '1859766857732', '108', '回复@gytd: 好好学习吧~', '4', '2019-05-30 19:52:48', '1');
INSERT INTO `comment` VALUES ('116', '1859766857732', '107', '回复@gytd: 我也同意', '4', '2019-05-30 19:53:07', '1');
INSERT INTO `comment` VALUES ('117', '1859766857732', '107', '佛挡杀佛', '4', '2019-05-30 19:53:14', '1');
INSERT INTO `comment` VALUES ('118', '1859766857732', '107', ' 分手的范德萨', '4', '2019-05-30 19:53:21', '1');
INSERT INTO `comment` VALUES ('119', '1859766857732', '108', '开开心心', '4', '2019-05-30 19:53:29', '1');
INSERT INTO `comment` VALUES ('120', '1859766857732', '108', '回复@gytd: 好的', '4', '2019-05-30 19:54:12', '1');
INSERT INTO `comment` VALUES ('121', '1859766857732', '108', '回复@gytd: 嘿嘿', '4', '2019-05-30 19:54:18', '1');
INSERT INTO `comment` VALUES ('122', '1859766857732', '0', '好的，我会遵守的', '5', '2019-05-30 19:59:27', '1');
INSERT INTO `comment` VALUES ('123', '1859766857732', '122', '回复@amy: 希望和大家和平相处', '5', '2019-05-30 19:59:43', '1');
INSERT INTO `comment` VALUES ('124', '1859766857732', '0', '士大夫', '5', '2019-05-30 19:59:50', '1');
INSERT INTO `comment` VALUES ('125', '1295658576479', '0', '发送到', '5', '2019-05-30 20:00:25', '1');
INSERT INTO `comment` VALUES ('126', '3868474992461', '0', '是的范德萨', '5', '2019-05-30 20:01:01', '1');
INSERT INTO `comment` VALUES ('127', '5628795717575', '113', '回复@www: 就很贵', '5', '2019-05-30 20:04:08', '1');
INSERT INTO `comment` VALUES ('128', '1859766857732', '0', '是的范德萨', '5', '2019-05-31 09:03:03', '1');
INSERT INTO `comment` VALUES ('129', '9511674303056', '0', '放到沙发上', '5', '2019-05-31 12:40:44', '1');
INSERT INTO `comment` VALUES ('130', '9511674303056', '129', '回复@amy: 是的法定', '5', '2019-05-31 12:40:49', '1');





-- ----------------------------
-- Table structure for `dayduty`
-- ----------------------------
DROP TABLE IF EXISTS `dayduty`;
CREATE TABLE `dayduty` (
  `dayDutyId` int(11) NOT NULL AUTO_INCREMENT,
  `dayName` varchar(50) DEFAULT NULL,
  `dutyUserNames` varchar(200) DEFAULT NULL,
  `createUser` int(11) DEFAULT NULL,
  `createDate` datetime DEFAULT NULL,
  `updateUser` int(11) DEFAULT NULL,
  `updateData` datetime DEFAULT NULL,
  `isEffective` int(11) DEFAULT '1',
  PRIMARY KEY (`dayDutyId`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dayduty
-- ----------------------------
INSERT INTO `dayduty` VALUES (1,'星期一','关关关',2,'2019-02-14 21:36:32',2,'2019-05-23 16:01:03',1);
INSERT INTO `dayduty` VALUES (2,'星期二','西瓜',2,'2019-02-14 21:36:56',2,'2019-02-14 21:37:05',1);
INSERT INTO `dayduty` VALUES (3,'星期三','二狗',2,'2019-02-14 21:37:32',2,'2019-02-14 21:37:36',1);
INSERT INTO `dayduty` VALUES (4,'星期四','村花',2,'2019-02-14 21:37:51',2,'2019-02-14 21:37:55',1);
INSERT INTO `dayduty` VALUES (5,'星期五','大哥',2,'2019-02-14 21:38:03',2,'2019-02-14 21:38:00',1);
INSERT INTO `dayduty` VALUES (6,'星期六','富婆',2,'2019-02-14 21:38:45',2,'2019-02-14 21:38:52',1);
INSERT INTO `dayduty` VALUES (7,'星期天','学姐',2,'2019-02-14 21:38:48',2,'2019-02-14 21:38:56',1);





-- ----------------------------
-- Table structure for `attendance`
-- ----------------------------
DROP TABLE IF EXISTS `attendance`;
CREATE TABLE `attendance` (
  `attendenceId` bigint(20) NOT NULL AUTO_INCREMENT,
  `createUser` bigint(20) DEFAULT NULL,
  `createDate` datetime DEFAULT NULL,
  `sumDay` int(11) DEFAULT '1',
  `isEffective` int(11) DEFAULT '1',
  PRIMARY KEY (`attendenceId`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of attendance
-- ----------------------------
INSERT INTO `attendance` VALUES (1,2,'2019-03-27 17:27:37',1,1),(3,2,'2019-03-28 17:32:44',1,1);
INSERT INTO `attendance` VALUES (7,2,'2019-03-29 17:35:18',2,1),(8,3,'2019-03-28 17:35:50',1,1);
INSERT INTO `attendance` VALUES (9,3,'2019-03-29 17:36:07',2,1),(10,3,'2019-03-30 17:30:48',1,1);
INSERT INTO `attendance` VALUES (11,3,'2019-03-31 17:31:15',2,1),(12,3,'2019-04-01 20:41:46',3,1);
INSERT INTO `attendance` VALUES (13,13,'2019-04-02 22:35:25',1,1),(14,13,'2019-04-08 23:37:29',1,1);
INSERT INTO `attendance` VALUES (15,13,'2019-04-09 21:02:31',2,1),(16,13,'2019-04-10 13:52:47',3,1);
INSERT INTO `attendance` VALUES (17,12,'2019-04-10 17:23:13',1,1),(18,12,'2019-04-11 18:11:17',2,1);
INSERT INTO `attendance` VALUES (19,3,'2019-04-12 21:45:29',1,1),(20,6,'2019-04-17 19:28:38',1,1);
INSERT INTO `attendance` VALUES (21,6,'2019-04-18 14:05:41',2,1),(22,6,'2019-04-19 11:01:06',3,1);
INSERT INTO `attendance` VALUES (23,6,'2019-04-19 11:01:06',3,1),(24,6,'2019-05-10 01:07:31',1,1);
INSERT INTO `attendance` VALUES (25,6,'2019-05-10 01:07:31',1,1),(26,6,'2019-05-28 21:05:05',1,1);
INSERT INTO `attendance` VALUES (27,6,'2019-05-28 21:05:05',1,1),(28,6,'2019-05-28 21:05:05',1,1);
INSERT INTO `attendance` VALUES (29,6,'2019-05-31 09:10:48',1,1),(30,6,'2019-05-31 09:10:48',1,1);





-- ----------------------------
-- Table structure for `announcementcategory`
-- ----------------------------
DROP TABLE IF EXISTS `announcementcategory`;
CREATE TABLE `announcementcategory` (
  `classId` bigint(20) NOT NULL AUTO_INCREMENT,
  `className` varchar(255) DEFAULT NULL,
  `isEffective` int(11) DEFAULT NULL,
  `updateTime` datetime DEFAULT NULL,
  `createTime` datetime DEFAULT NULL,
  `createBy` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`classId`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of announcementcategory
-- ----------------------------
INSERT INTO `announcementcategory` VALUES (1,'讲座',1,'2019-01-22 21:21:21','2019-01-22 21:21:21',2);
INSERT INTO `announcementcategory` VALUES (2,'个人训练赛',1,'2019-01-22 21:21:27','2019-01-22 21:21:27',2);
INSERT INTO `announcementcategory` VALUES (3,'组队训练赛',1,'2019-01-22 23:10:58','2019-01-22 23:10:58',2);
INSERT INTO `announcementcategory` VALUES (4,'校赛',1,'2019-01-22 21:21:27','2019-01-22 21:21:27',2);
INSERT INTO `announcementcategory` VALUES (5,'开会',0,'2019-05-27 15:15:54','2019-05-27 15:15:50',2);




-- ----------------------------
-- Table structure for `announcement`
-- ----------------------------
DROP TABLE IF EXISTS `announcement`;
CREATE TABLE `announcement` (
  `announceId` bigint(20) NOT NULL AUTO_INCREMENT,
  `announceTitle` varchar(50) DEFAULT NULL,
  `announceBody` text,
  `announceCreateUser` bigint(20) DEFAULT NULL,
  `announceCreateTime` datetime DEFAULT NULL,
  `announceUpdateUser` bigint(20) DEFAULT NULL,
  `announceUpdateTime` datetime DEFAULT NULL,
  `isEffective` int(11) DEFAULT NULL,
  `isFirst` int(11) DEFAULT NULL,
  `isPublic` int(11) DEFAULT NULL,
  PRIMARY KEY (`announceId`)
) ENGINE=InnoDB AUTO_INCREMENT=9000000853939657 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of announcement
-- ----------------------------
INSERT INTO `announcement` VALUES (1,'2','2',2,'2019-01-13 17:05:16',2,'2019-01-13 22:17:13',0,0,0);
INSERT INTO `announcement` VALUES (2,'sdf2','sdf',2,'2019-01-13 17:32:55',2,'2019-01-13 17:32:55',1,0,1);
INSERT INTO `announcement` VALUES (3,'1','1',2,'2019-01-13 17:34:56',2,'2019-01-13 17:34:56',1,0,1);
INSERT INTO `announcement` VALUES (4,'gh','<p>fdf</p>',2,'2019-01-13 17:35:45',2,'2019-01-13 17:35:45',1,0,1);
INSERT INTO `announcement` VALUES (5,'1','<p>fdf<img src=\"http://localhost:9999/image/c4596f9e-a98f-4be3-b19b-8661c796b9fb.png\" style=\"max-width: 100%;\"></p>',2,'2019-01-13 17:40:29',2,'2019-01-13 17:40:29',1,0,1);
INSERT INTO `announcement` VALUES (6,'','<p><img src=\"http://localhost:9999/image/ae727715-db1e-48c4-84e9-50a3f71ec851.png\" style=\"max-width:100%;\"><br></p>',2,'2019-01-13 17:42:26',2,'2019-01-13 17:42:26',1,0,1);
INSERT INTO `announcement` VALUES (7,'g','<p><br></p>',2,'2019-01-13 17:45:30',2,'2019-01-13 17:45:30',1,0,1);
INSERT INTO `announcement` VALUES (8,'g','<p><br></p>',2,'2019-01-13 17:45:32',2,'2019-01-13 17:45:32',1,0,1);
INSERT INTO `announcement` VALUES (9,'fdg','',2,'2019-01-13 17:47:25',2,'2019-01-13 17:47:25',1,0,0);
INSERT INTO `announcement` VALUES (10,'fdg','',2,'2019-01-13 17:47:44',2,'2019-01-13 17:47:44',1,0,1);
INSERT INTO `announcement` VALUES (11,'f','',2,'2019-01-13 17:48:15',2,'2019-01-13 17:48:15',1,0,1);
INSERT INTO `announcement` VALUES (12,'f','',2,'2019-01-13 17:48:31',2,'2019-01-13 17:48:31',1,0,0);
INSERT INTO `announcement` VALUES (13,'cv','<p>xcv</p>',2,'2019-01-13 17:49:17',2,'2019-01-13 17:49:17',1,0,1);
INSERT INTO `announcement` VALUES (14,'sdf','<p>sdf</p>',2,'2019-01-13 17:50:00',2,'2019-01-13 17:50:00',1,0,1);
INSERT INTO `announcement` VALUES (15,'dg','<p>fgh</p>',2,'2019-01-13 17:50:39',2,'2019-01-13 17:50:39',1,0,1);
INSERT INTO `announcement` VALUES (16,'ghf','',2,'2019-01-13 17:51:06',2,'2019-01-13 17:51:06',1,0,1);
INSERT INTO `announcement` VALUES (17,'cxv','<p>xcv</p>',2,'2019-01-13 17:51:39',2,'2019-01-13 17:51:39',1,0,1);
INSERT INTO `announcement` VALUES (18,'adsf','<p>adsfds</p>',2,'2019-01-13 22:01:14',2,'2019-01-13 22:01:14',1,0,1);
INSERT INTO `announcement` VALUES (19,'vzcx','<p>zcvxxcv</p>',2,'2019-01-13 22:06:56',2,'2019-01-13 22:06:56',1,0,1);
INSERT INTO `announcement` VALUES (20,'2','2',2,'2019-01-13 22:16:34',2,'2019-01-13 22:16:34',1,0,0);
INSERT INTO `announcement` VALUES (21,'fhfgh','<p>dghgfhdgh</p>',2,'2019-01-13 22:17:39',2,'2019-01-13 22:17:39',1,0,1);
INSERT INTO `announcement` VALUES (22,'sdfgfdsg','<p>sfdgsdf</p>',2,'2019-01-13 22:19:10',2,'2019-01-13 22:19:10',1,0,1);
INSERT INTO `announcement` VALUES (23,'dghgfsgfety','<p><span style=\"font-weight: bold;\">dsdgety</span></p>',2,'2019-01-13 22:19:51',2,'2019-01-16 20:28:24',1,0,1);
INSERT INTO `announcement` VALUES (24,'sfgfsd','<p>gsfdgfdsh sgf</p>',2,'2019-01-13 22:20:53',2,'2019-01-13 22:20:56',0,0,1);
INSERT INTO `announcement` VALUES (25,'西瓜傻逼','<p>如题<img src=\"http://localhost:9999/image/656aa91b-5d10-4b9c-9c56-7190364111c7.png\" style=\"max-width: 100%;\"></p>',2,'2019-01-13 22:21:43',2,'2019-01-13 22:21:54',0,0,1);
INSERT INTO `announcement` VALUES (26,'test','<p>body</p>',2,'2019-01-16 20:26:12',2,'2019-01-16 20:26:22',0,0,1);
INSERT INTO `announcement` VALUES (27,'litest','<p>xixi</p><p><span style=\"font-weight: bold;\">zheshiyigeceshi</span></p><p><img src=\"http://localhost:9999/image/2d160e36-bd91-41f9-a1bb-a96c9488f4f3.png\" style=\"max-width:100%;\">rwe<br></p>',2,'2019-01-16 21:54:55',2,'2019-01-16 21:55:09',1,0,1);
INSERT INTO `announcement` VALUES (28,'测试','<p>嘻嘻<img src=\"http://localhost:9999/image/2dd0720b-1a26-4e4b-910f-07738aee015f.png\" style=\"max-width: 100%;\"></p>',2,'2019-01-17 21:30:41',2,'2019-01-17 21:31:00',1,0,1);
INSERT INTO `announcement` VALUES (29,'我是西瓜','<p>我是西瓜</p>',3,'2019-01-17 21:41:14',3,'2019-01-17 21:41:14',1,0,1);
INSERT INTO `announcement` VALUES (30,'西瓜sb','<p>测试<img src=\"http://localhost:9999/image/1b3dbb27-955c-4304-ae9f-e9cc194f6fc4.png\" style=\"max-width: 100%;\"></p>',2,'2019-01-19 21:23:46',2,'2019-01-19 21:24:04',1,0,1);
INSERT INTO `announcement` VALUES (31,'nbv','<p>nbcnv</p>',2,'2019-01-19 21:24:58',2,'2019-01-19 21:24:58',1,0,0);
INSERT INTO `announcement` VALUES (32,'1','1',2,'2019-01-19 22:28:22',2,'2019-01-19 22:28:22',1,0,1);
INSERT INTO `announcement` VALUES (33,'1','1',2,'2019-01-19 22:30:13',2,'2019-01-19 22:30:13',1,0,1);
INSERT INTO `announcement` VALUES (39,'1','1',2,'2019-01-19 22:41:03',2,'2019-01-19 22:41:03',1,0,1);
INSERT INTO `announcement` VALUES (40,'1','1',2,'2019-01-19 22:44:26',2,'2019-01-19 22:44:26',1,0,1);
INSERT INTO `announcement` VALUES (41,'1','1',2,'2019-01-19 22:45:40',2,'2019-01-19 22:45:40',1,0,1);
INSERT INTO `announcement` VALUES (42,'gsfd','<p>gsfdgfsd</p>',2,'2019-01-19 22:49:01',2,'2019-01-19 22:49:27',0,0,1);
INSERT INTO `announcement` VALUES (43,'gsfd','<p>gsfdgfsd</p>',2,'2019-01-19 22:49:01',2,'2019-01-19 22:49:01',1,0,1);
INSERT INTO `announcement` VALUES (44,'gsfd','<p>gsfdgfsd</p>',2,'2019-01-19 22:49:57',2,'2019-01-19 22:49:57',1,0,1);
INSERT INTO `announcement` VALUES (6126251720999,'请想来参加ACM集训的同学注意','<p>由于本群欲满，请想接下来参加ACM集训的同学加群<br>点击链接加入群聊【CUIT/ACM - ICPC FM 3群】：<a href=\"https://jq.qq.com/?_wv=1027&amp;k=57sSzRQ\" target=\"_blank\">https://jq.qq.com/?_wv=1027&amp;k=57sSzRQ</a><br></p>',2,'2019-05-29 21:15:54',2,'2019-05-29 21:15:54',1,1,1);
INSERT INTO `announcement` VALUES (476508870399734,'今晚开会','<p>今晚18点半请所有实验室人员到6301A开会！请后面要参加暑假集训的同学也要来！主要讲一下实验室搬迁问题。最好来。不然后面实验室在哪你都不知道－_－<br></p>',2,'2019-05-23 17:26:46',2,'2019-05-30 18:26:48',1,1,1);
INSERT INTO `announcement` VALUES (952213157827301,'领取CCCC奖状','<p>请参加了CCCC的人员到实验室领取奖状，(进门直走的那张桌子上，然后还有PAT代金券，按照自己获奖的等级领取就行)</p>',2,'2019-01-20 22:48:37',2,'2019-05-30 18:27:27',1,0,1);
INSERT INTO `announcement` VALUES (1332218935152135,'新生请注意，训练开始啦','<p><img width=\"24\" height=\"24\" src=\"https://s1.url.cn/qqun/web/announce/img/47@2x.gif\">我们放了3套最基础的入门题，你们有足够的时间慢慢做<br>如果没有任何基础的可以重点看第一套上面的链接，你们不懂的上面都有，<br>有基础的，还想训练的可以私聊我,单独布置训练计划<br>有什么问题私聊答疑组(看群名片，基本上都是管理员)</br><a href=\"https://vjudge.net/contest/253497\" target=\"_blank\">https://vjudge.net/contest/253497</a><br><a href=\"https://vjudge.net/contest/253498\" target=\"_blank\">https://vjudge.net/contest/253498</a><br></p>',2,'2019-01-20 23:12:33',2,'2019-05-30 18:26:08',1,0,1);
INSERT INTO `announcement` VALUES (2271552792347669,'6.10-训练赛','<p>时间: 6月10日(周日)12:00-17:00<br>链接:&nbsp;<a href=\"http://acm.zju.edu.cn/onlinejudge/contestInfo.do?contestId=379\" target=\"_blank\">http://acm.zju.edu.cn/onlinejudge/contestInfo.do?contestId=379</a>&nbsp;<br>【ZOJ月赛】<br>地点: 实验室6301A<br>可以组队, 可以单刷, 题目英文, 欢迎AK<br></p>',2,'2019-05-23 17:26:22',2,'2019-05-30 18:27:07',1,0,1);
INSERT INTO `announcement` VALUES (3000001014459809,'1','1',2,'2019-01-19 22:56:50',2,'2019-01-19 22:56:50',1,0,1);
INSERT INTO `announcement` VALUES (3000001989394877,'1','1',2,'2019-01-19 22:56:43',2,'2019-01-19 22:56:43',1,0,1);
INSERT INTO `announcement` VALUES (3000002061424000,'saf','<p>adgdfsg</p>',2,'2019-01-19 22:57:12',2,'2019-01-19 22:57:16',1,0,1);
INSERT INTO `announcement` VALUES (3426715813036022,'fd','<p>fgd</p>',2,'2019-01-19 23:09:47',2,'2019-01-19 23:09:47',1,0,1);
INSERT INTO `announcement` VALUES (3994966884781117,'组队训练赛3','<p>比赛网址: https://vjudge.net/contest/231802<br>比赛地点: 6301A<br>比赛时间: 明天12:00 - 17:00<br></p>',4,'2019-04-18 22:54:59',4,'2019-04-18 22:55:31',1,1,1);
INSERT INTO `announcement` VALUES (9000000853939656,'1','1',2,'2019-01-19 22:56:58',2,'2019-01-19 22:56:58',0,0,1);





-- ----------------------------
-- Table structure for `newscategory`
-- ----------------------------
DROP TABLE IF EXISTS `newscategory`;
CREATE TABLE `newscategory` (
  `classId` bigint(20) NOT NULL AUTO_INCREMENT,
  `className` varchar(255) DEFAULT NULL,
  `isEffective` int(11) DEFAULT NULL,
  `updateTime` datetime DEFAULT NULL,
  `createTime` datetime DEFAULT NULL,
  `createBy` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`classId`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of newscategory
-- ----------------------------
INSERT INTO `newscategory` VALUES (34,'时事新闻',1,'2019-01-22 21:21:21','2019-01-22 21:21:21',2);
INSERT INTO `newscategory` VALUES (35,'竞赛',1,'2019-01-22 21:21:27','2019-01-22 21:21:27',2);
INSERT INTO `newscategory` VALUES (36,'未分类',1,'2019-01-22 23:10:58','2019-01-22 23:10:58',2);
INSERT INTO `newscategory` VALUES (37,'获奖',0,'2019-05-27 15:15:54','2019-05-27 15:15:50',2);
INSERT INTO `newscategory` VALUES (38,'获奖',1,'2019-05-27 15:15:57','2019-05-27 15:15:57',2);




-- ----------------------------
-- Table structure for `news`
-- ----------------------------
DROP TABLE IF EXISTS `news`;
CREATE TABLE `news` (
  `newsId` bigint(20) NOT NULL AUTO_INCREMENT,
  `newsTitle` varchar(100) DEFAULT NULL,
  `newsBody` text,
  `createUser` bigint(20) DEFAULT NULL,
  `createDate` datetime DEFAULT NULL,
  `updateUser` bigint(20) DEFAULT NULL,
  `updateDate` datetime DEFAULT NULL,
  `isPublic` int(11) DEFAULT NULL,
  `isEffective` int(11) DEFAULT NULL,
  PRIMARY KEY (`newsId`)
) ENGINE=InnoDB AUTO_INCREMENT=9983416287760016 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of news
-- ----------------------------
INSERT INTO `news` VALUES (1,'test','11',2,'2019-01-19 22:14:28',2,'2019-01-21 21:32:41',1,0);
INSERT INTO `news` VALUES (2,'test','11',2,'2019-01-19 22:15:12',2,'2019-01-19 22:15:12',1,1);
INSERT INTO `news` VALUES (3,'test','11',2,'2019-01-19 22:17:20',2,'2019-01-19 22:17:20',1,1);
INSERT INTO `news` VALUES (4,'test','11',2,'2019-01-19 22:17:53',2,'2019-01-19 22:17:53',1,1);
INSERT INTO `news` VALUES (5,'test','11',2,'2019-01-19 22:19:15',2,'2019-01-19 22:19:15',1,1);
INSERT INTO `news` VALUES (6,'test','11',2,'2019-01-19 22:21:15',2,'2019-01-19 22:21:15',1,1);
INSERT INTO `news` VALUES (7,'test','111',2,'2019-01-19 22:24:49',2,'2019-01-19 22:24:49',1,1);
INSERT INTO `news` VALUES (8,'test','111',2,'2019-01-19 22:25:29',2,'2019-01-19 22:25:29',1,1);
INSERT INTO `news` VALUES (9,'test','111',2,'2019-01-19 22:27:53',2,'2019-01-19 22:27:53',1,1);
INSERT INTO `news` VALUES (123,'测试id','<p>xssd</p>',2,'2019-01-21 22:51:30',2,'2019-01-21 22:51:30',1,1);
INSERT INTO `news` VALUES (1517188452594,'学校ACM校队参加中国大学生程序设计竞赛全国邀请赛首战告捷','<p>&nbsp;&nbsp;&nbsp;&nbsp;5月13日，2018年“三盟科技杯”中国大学生程序设计竞赛全国邀请赛（湖南）暨第十届湘潭市大学生程序设计大赛在湘潭大学落下帷幕，来自全国60所高校的177支队伍参加了比赛。我校派出了三支参赛队共9名选手参赛，软件工程学院教师黄健为带队教师，经过5小时的激烈角逐，我校三支参赛队伍获得了两银一铜的优异成绩。</p><p align=\"center\"><img title=\"\" alt=\"\" src=\"https://www.cuit.edu.cn/News/image/2018/05/15/%E6%B9%98%E6%BD%AD%E5%8F%82%E8%B5%9B%E7%85%A7%E7%89%87.jpg\" width=\"500\" height=\"375\"></p><p align=\"center\">获奖团队</p>',2,'2019-05-30 21:10:53',2,'2019-05-30 21:10:53',1,1);
INSERT INTO `news` VALUES (2645030820395,'大犇助阵，萌新来袭——2015年校ACM招新宣讲会成功举行','<p>11月26日，校ACM队招新宣讲会在航空港校区学术报告厅召开，来自各学院的300多名同学参加了宣讲会。宣讲会介绍了ACM国际大学生程序竞赛的竞赛形式，培养方式，以及我校的发展情况。宣讲会还邀请到曾经的四川大学ACM校队成员，现“百词斩”公司的CTO王波为同学们分享当年的竞赛经历和感悟。</p><p>此次招新面向全校同学，以至于会议还未开始，学术报告厅已是座无虚席。校ACM总教练杜晓宇老师以风趣幽默的演讲，为大家简单介绍了ACM作为本校一等竞赛的实力，以及建队之后取得的骄人成绩。“百词斩”CTO王波先生向同学们分享了一些参加ACM竞赛的经历，以及参加工作之后的一些人生经验。之后，由本届ACM校队学生教练文欣以及前队员彭萧同学为大家介绍了新生如何入门以及后续的培训计划。整个宣讲会也落下帷幕。</p><p><br></p><p><img src=\"http://localhost:9999/image/bfcdb483-6007-4ea3-8aa7-c68c1bf7dab5.jpg\" style=\"max-width:100%;\"><br></p><p style=\"text-align: center;\">宣讲会现场<br></p>',2,'2019-05-31 12:32:05',2,'2019-05-31 12:32:05',1,1);
INSERT INTO `news` VALUES (5190007975145,'我校学子ACM-ICPC亚洲区域赛再创佳绩','<p>【本网讯】10月18日，第40届ACM国际大学生程序设计竞赛亚洲区域赛长春站（The 2015 ACM-ICPC Asia Changchun Regional Contest）在东北师范大学举行，从来自亚洲百余所高校的上千支队伍中脱颖而出的220支队伍，参加了该次亚洲区域赛。我校“BreadDog”代表队伍经过激烈的角逐，在该次区域赛上喜获佳绩。<br></p><p><img src=\"https://www.cuit.edu.cn/News/image/2015/10/21/%E5%9B%BE%E4%B8%80.jpg\" width=\"500\" alt=\"\"></p><p>合影</p><p>软件工程学院2013级本科生黄坤，王璨，黄宁桥组成名为“BreadDog”的参赛队伍，在ACM团队总教练杜晓宇老师的带领下，凭借扎实的编程功底、强大的心理素质和精诚合作的团队精神，经过5个小时的激烈角逐，最终代表学校获得我校在ACM-ICPC历史上的第二个亚洲区域赛铜奖，这是我校在ACM竞赛历史上的一次进步，肯定了我校在ACM-ICPC竞赛上的实力。</p><p>ACM团队欢迎对ACM竞赛感兴趣的成信学子加入进来，在来年的ACM竞赛中代表我校再创辉煌！</p><p><br></p><p>ACM-ICPC简介：</p><p>ACM国际大学生程序设计竞赛(英文全称：ACM International Collegiate Programming Contest（ACM-ICPC或ICPC）是由美国计算机协会（ACM）主办的，一项旨在展示大学生创新能力、团队精神和在压力下编写程序、分析和解决问题能力的年度竞赛。</p><p>CUIT ACM团队简介：</p><p>ACM-ICPC竞赛是学校支持的一级竞赛。学校教务处已开始重视ACM团队。2015年学校教务处将ACM-ICPC竞赛定为学校支持的一级竞赛，支持经费也逐年增加。</p><p>校ACM团队在总教练杜晓宇老师的带领下，连获佳绩，曾获亚洲区现场赛铜奖，四川省省赛金奖，以及其他奖项若干。</p><p>加入条件：有兴趣，会自学，能思考，肯坚持！</p><p>团队地点：6301A</p><p>联系方式：</p><p>QQ群：392397904&nbsp;&nbsp;</p><p>邮箱：<a href=\"mailto:acmicpc@cuit.edu.cn\">acmicpc@cuit.edu.cn</a></p><p>官网：<a href=\"http://acm.cuit.edu.cn/\">http://acm.cuit.edu.cn/</a></p><p><br></p>',2,'2019-05-29 21:16:58',2,'2019-05-29 21:16:58',1,1);
INSERT INTO `news` VALUES (23103533601218,'测试所有功能','<p>测试</p>',2,'2019-01-21 22:30:17',2,'2019-01-21 22:30:17',1,1);
INSERT INTO `news` VALUES (58888816835064,'1234567','<p>qwertyu</p>',2,'2019-01-22 23:28:07',2,'2019-01-22 23:28:07',1,1);
INSERT INTO `news` VALUES (288235061461258,'阿萨德','<p>撒的</p>',2,'2019-01-21 23:00:58',2,'2019-01-21 23:00:58',1,1);
INSERT INTO `news` VALUES (466954228002649,'12345678','<p>sdfghjkl</p>',2,'2019-01-21 23:00:00',2,'2019-01-21 23:00:00',1,1);
INSERT INTO `news` VALUES (476745955194897,'测试','<p>框架</p>',2,'2019-01-22 21:21:58',2,'2019-01-22 21:21:58',1,1);
INSERT INTO `news` VALUES (520587737856497,'阿斯蒂芬规划局快乐','<p>沃尔特与欧普同一人v会更好</p>',2,'2019-01-21 23:00:25',2,'2019-01-21 23:00:25',1,1);
INSERT INTO `news` VALUES (574085881622370,'sfgh','<p>fdh</p>',2,'2019-01-19 23:21:41',2,'2019-01-19 23:21:41',0,1);
INSERT INTO `news` VALUES (615456943753521,'我校在第8届四川省ACM大学生程序设计大赛中取得骄人成绩','<p>【本网讯】6月4日，第十届四川省大学生程序设计竞赛在西南科技大学隆重举行，本届大赛由四川省教育厅主办，西南科技大学承办。大赛参赛选手达800余人，分别来自省外的6所高校和省内的41所高校，两所中学，共计214支参赛队伍。</p><p>我校共派出6支队伍参加，经过5小时的激烈角逐，ACM校队继上月在中国大学生程序设计竞赛全国邀请赛（湖南站）首战告捷后，这次省赛中再创佳绩，取得了一金三银一铜的优异成绩，再次体现了我校ACM校队的蓬勃发展。</p><p align=\"center\"><img title=\"\" alt=\"\" src=\"https://www.cuit.edu.cn/News/image/2018/06/04/QQ%E5%9B%BE%E7%89%8720180604142307.jpg\" width=\"500\" height=\"375\"></p><p align=\"center\">参赛合影</p>',2,'2019-02-18 21:28:16',2,'2019-05-30 18:22:03',1,1);
INSERT INTO `news` VALUES (832243484382114,'cnvb，','<p>cnvbvcnbv</p>',2,'2019-01-20 22:48:10',2,'2019-01-21 22:33:34',1,0);
INSERT INTO `news` VALUES (918842042779163,'去问人体与','<p>微软推</p>',2,'2019-01-22 23:44:52',2,'2019-01-22 23:45:03',1,1);
INSERT INTO `news` VALUES (1127463142849624,'gfhf','<p>dghgf</p>',2,'2019-01-19 23:22:36',2,'2019-01-19 23:22:36',0,1);
INSERT INTO `news` VALUES (1486280699314100,'1234567','<p>我是的风格和健康</p>',2,'2019-01-22 23:17:06',2,'2019-01-22 23:17:06',1,1);
INSERT INTO `news` VALUES (1666044887726313,'hkjl','<p>hjkl</p>',2,'2019-01-19 23:20:17',2,'2019-01-21 22:04:54',0,0);
INSERT INTO `news` VALUES (1694761640784318,'dhdgf','<p>dghgfhd</p>',2,'2019-01-19 23:23:18',2,'2019-01-19 23:23:18',0,1);
INSERT INTO `news` VALUES (2003718480108017,'gkgjkhj','<p>gkgkgjkhj12345678复活甲</p>',2,'2019-01-20 22:51:43',2,'2019-01-21 22:33:00',1,0);
INSERT INTO `news` VALUES (2111629352597230,'??','<p>??</p>',4,'2019-04-18 21:36:51',4,'2019-04-18 22:02:45',1,0);
INSERT INTO `news` VALUES (2115709589119289,'sfgh','<p>fdh</p>',2,'2019-01-19 23:21:45',2,'2019-01-19 23:21:45',0,1);
INSERT INTO `news` VALUES (2170351519086310,'test','111',2,'2019-01-19 23:15:59',2,'2019-01-19 23:15:59',1,1);
INSERT INTO `news` VALUES (2524757246249168,'????','<p>???</p>',2,'2019-04-18 19:07:00',4,'2019-04-18 21:33:46',1,0);
INSERT INTO `news` VALUES (2613299761978444,'测试update','<p>测试updatedsfgdh嘻嘻</p>',2,'2019-01-20 22:43:57',2,'2019-01-21 22:25:45',1,1);
INSERT INTO `news` VALUES (2855748976886812,'dgh','<p>dg</p>',2,'2019-01-19 23:26:12',2,'2019-01-19 23:26:12',1,1);
INSERT INTO `news` VALUES (3157925388267298,'hkjl','<p>hjklyuio</p>',2,'2019-01-19 23:20:43',2,'2019-01-19 23:20:43',0,1);
INSERT INTO `news` VALUES (3595350440472641,'额外热吻','<p>刚好</p>',2,'2019-01-21 23:01:22',2,'2019-01-21 23:01:29',1,1);
INSERT INTO `news` VALUES (3609542720551855,'k;;lk;','<p>hjk</p>',2,'2019-01-19 23:23:40',2,'2019-01-19 23:23:40',0,1);
INSERT INTO `news` VALUES (3673118662725316,'成信学子在第十届四川省ACM大学生程序设计竞赛中再创佳绩','<nav role=\"navigation\"><p>&nbsp;&nbsp;&nbsp;&nbsp;6月4日，第十届四川省大学生程序设计竞赛在西南科技大学隆重举行，本届大赛由四川省教育厅主办，西南科技大学承办。大赛参赛选手达800余人，分别来自省外的6所高校和省内的41所高校，两所中学，共计214支参赛队伍。</p><p>我校共派出6支队伍参加，经过5小时的激烈角逐，ACM校队继上月在中国大学生程序设计竞赛全国邀请赛（湖南站）首战告捷后，这次省赛中再创佳绩，取得了一金三银一铜的优异成绩，再次体现了我校ACM校队的蓬勃发展。</p><p align=\"center\"><img title=\"\" alt=\"\" src=\"https://www.cuit.edu.cn/News/image/2018/06/04/QQ%E5%9B%BE%E7%89%8720180604142307.jpg\" width=\"500\" height=\"375\"></p><p align=\"center\">参赛合影</p></nav>',2,'2019-02-18 21:26:15',2,'2019-05-30 16:24:04',1,1);
INSERT INTO `news` VALUES (3740043760300607,'dgh','<p><br></p>',2,'2019-01-19 23:18:31',2,'2019-01-19 23:18:31',0,1);
INSERT INTO `news` VALUES (3790048991184523,'测试add','<p>;jgkfdj你好dsj\</p>',2,'2019-01-20 23:13:15',2,'2019-01-21 22:01:30',1,0);
INSERT INTO `news` VALUES (4084108371974949,'gfhf','<p>dghgf</p>',2,'2019-01-19 23:22:46',2,'2019-01-19 23:22:46',0,1);
INSERT INTO `news` VALUES (4282146827149258,'test','111',2,'2019-01-19 23:04:10',2,'2019-01-19 23:04:10',1,1);
INSERT INTO `news` VALUES (4722741468344091,'???','<p>???</p>',4,'2019-04-18 21:52:26',4,'2019-04-18 22:02:42',1,0);
INSERT INTO `news` VALUES (5000001760903345,'test','111',2,'2019-01-19 22:58:18',2,'2019-01-19 22:58:18',1,1);
INSERT INTO `news` VALUES (5587044386368135,'234567','<p>123456789</p>',2,'2019-01-22 23:02:52',2,'2019-01-22 23:02:52',1,1);
INSERT INTO `news` VALUES (5892677681313045,'减肥的','<p>刚发的</p>',2,'2019-01-21 22:58:14',2,'2019-01-21 22:58:14',1,1);
INSERT INTO `news` VALUES (6036210639757074,'??','<p>??</p>',4,'2019-04-18 21:33:56',4,'2019-04-18 22:02:48',1,0);
INSERT INTO `news` VALUES (6087502645468537,'dgh','<p>hfhg</p>',2,'2019-01-19 23:19:27',2,'2019-01-19 23:19:27',0,1);
INSERT INTO `news` VALUES (6799851663161896,'1234567','<p>qwertyui</p>',2,'2019-01-22 23:09:07',2,'2019-01-22 23:09:07',1,1);
INSERT INTO `news` VALUES (7069976714793927,'我校学子ACM-ICPC亚洲区域赛首站再创佳绩','<p>10月14日，第43届ACM—ICPC国际大学生程序设计竞赛亚洲区域赛南京站的比赛在南京航空航天大学举办。来自全国186所高校的共计310支参赛队伍齐聚一堂，参加了该次亚洲区域赛。</p><p>ACM校队学生袁曦焜、林湖龙、谢仁义三人组成的参赛队伍，凭借扎实的编程功底、强大的心理素质和精诚合作的团队精神，经过5个小时的激烈角逐，在该次区域赛上喜获佳绩，最终为我校斩获一枚银奖，再次证明了我校ACM校队在ACM-ICPC竞赛上的实力。这是该赛事的第一站，队员们也将继续努力，在接下来的各赛站中力争取得更好的成绩。</p><p><img src=\"http://localhost:9999/image/314182f0-ecfd-4675-9838-5ced687d9a64.jpg\" style=\"max-width:100%;\"><br></p>',4,'2019-04-18 22:06:50',4,'2019-04-18 22:06:50',1,1);
INSERT INTO `news` VALUES (7086654937396236,'dgh','<p>hfhg</p>',2,'2019-01-19 23:19:38',2,'2019-01-19 23:19:38',0,1);
INSERT INTO `news` VALUES (7180713708457525,'qwertyu','<p>wertyui</p>',2,'2019-01-22 23:41:55',2,'2019-01-22 23:42:35',1,1);
INSERT INTO `news` VALUES (7207239899042788,'这是目录','<p>去微软推</p>',2,'2019-01-23 21:59:55',2,'2019-01-23 22:00:07',1,1);
INSERT INTO `news` VALUES (8000001278093941,'test','111',2,'2019-01-19 23:02:43',2,'2019-01-19 23:02:43',1,1);
INSERT INTO `news` VALUES (8306185870253192,'我校团队2017年第42届ACM国际大学生程序设计竞赛亚洲区域赛(青岛站)荣获金牌','<p>【本网讯】11月5日，2017年第42届ACM国际大学生程序设计竞赛亚洲区域赛(青岛站)中国石油大学（华东）落下帷幕。来自225所高校的365支参赛队伍1095名程序设计精英们齐聚一堂。我校软件工程学院教师张海清带队，学生陈啸宇、寇寅、唐俊组成的“火锅底料”队伍，经过5个小时的激烈角逐，最终从百余所高校中脱颖而出，斩获金牌。由此，我校ACM代表队在2017年ACM-ICPC亚洲区域赛和中国大学生程序设计大赛中已连续获得1枚金牌、2枚银奖和2枚铜奖。&nbsp;&nbsp;</p><p>经过40多年的发展，ACM国际大学生程序设计竞赛已经发展成为较具影响力的大学生计算机竞赛，被誉为计算机软件领域的奥林匹克竞赛。比赛注重创新精神和团队精神，着重考察参赛队员的逻辑分析能力、团队协作能力、策略制定能力。为大学生提供了一个展示和提高自我解题与编程能力的机会，同时也为学生编程爱好者提供了一个交流学术和增进友谊的平台。&nbsp;</p><p align=\"center\"><img alt=\"\" src=\"https://www.cuit.edu.cn/News/image/2017/11/06/11_1_%E5%89%AF%E6%9C%AC_1.jpg\"></p><p align=\"center\">合影</p>',2,'2019-05-22 13:31:02',2,'2019-05-30 16:15:19',1,1);
INSERT INTO `news` VALUES (8507358794497788,'test','111',2,'2019-01-19 23:16:58',2,'2019-01-19 23:16:58',1,1);
INSERT INTO `news` VALUES (8602343863622932,'萨达','<p>萨达</p>',2,'2019-01-21 23:01:55',2,'2019-01-21 23:01:55',1,1);
INSERT INTO `news` VALUES (8729990684056559,'12345678','<p>微软体育</p>',2,'2019-01-22 23:48:43',2,'2019-01-22 23:49:09',1,1);
INSERT INTO `news` VALUES (8749517125875989,'1234567','<p>qwertyui</p>',2,'2019-01-22 23:08:26',2,'2019-01-22 23:08:26',1,1);
INSERT INTO `news` VALUES (9428232542528741,'哈哈哈哈','<p>哈哈哈哈</p>',4,'2019-04-18 22:01:46',4,'2019-04-18 22:01:46',1,0);
INSERT INTO `news` VALUES (9449032646433144,'西瓜瓜皮','<p>嘿嘿 二狗z真可爱</p>',2,'2019-01-21 22:49:15',2,'2019-01-21 22:49:15',1,0);
INSERT INTO `news` VALUES (9657152853485864,'???','<p>???</p>',4,'2019-04-18 21:52:21',4,'2019-04-18 22:02:44',1,0);
INSERT INTO `news` VALUES (9715244296908737,'dhdgf','<p>dghgfhd</p>',2,'2019-01-19 23:23:20',2,'2019-01-19 23:23:20',0,0);
INSERT INTO `news` VALUES (9861521129611960,'如题所示','<p>测试功能<img src=\"http://localhost:9999/image/854fcef4-b26d-432e-9615-4ac43bc86f48.png\" style=\"max-width: 100%;\"></p>',2,'2019-01-21 22:32:01',2,'2019-01-21 22:32:48',1,0);
INSERT INTO `news` VALUES (9983416287760015,'1234567','<p>qwertyu</p>',2,'2019-01-22 23:27:46',2,'2019-01-22 23:27:46',1,0);
