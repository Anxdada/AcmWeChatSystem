-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `userId` bigint(20) NOT NULL AUTO_INCREMENT,
  `userName` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `auth` int(11) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `studentId` varchar(20) DEFAULT NULL,
  `grade` int(11) DEFAULT NULL,
  `createTime` datetime DEFAULT NULL,
  `telephone` varchar(20) DEFAULT NULL,
  `realName` varchar(50) DEFAULT NULL,
  `openId` varchar(100) DEFAULT NULL,
  `isEffective` int(11) DEFAULT '1',
  `sex` int(11) DEFAULT '0',
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('2', 'xiexie', '123456', '1', 'https://b-ssl.duitang.com/uploads/item/201608/21/20160821194924_UCvFZ.jpeg', '2016081187', '2016', '2020-01-01 23:09', '18200326751', '谢仁义', '', '1');
INSERT INTO `user` VALUES ('3', 'xgg', '123456', '2', 'http://tupian.qqjay.com/tou2/2018/0410/be014063cbdd18680247e73104273d51.jpg', '2015081032', '2015', '2020-01-13 23:09', '13434218932', '袁喜宽', '', '1');
INSERT INTO `user` VALUES ('4', 'fold', '123456', '3', 'http://image.biaobaiju.com/uploads/20180803/23/1533308847-sJINRfclxg.jpeg', '2016051227', '2016', '2020-01-23 23:09', '15890110923', '诸葛大力', '', '1');
INSERT INTO `user` VALUES ('5', 'yanguolong', '123456', '4', 'http://img3.imgtn.bdimg.com/it/u=3783120155,1061441906&fm=26&gp=0.jpg', '2017081175', '2017', '2020-02-09 23:09', '13467859101', '陈旭', '', '1');
INSERT INTO `user` VALUES ('6', 'qiqi', '123456', '5', 'http://img2.imgtn.bdimg.com/it/u=1678948314,1083480950&fm=26&gp=0.jpg', '2016033012', '2016', '2020-02-13 23:09', '18064955179', '张伟', '', '1');
INSERT INTO `user` VALUES ('7', 'xixi', '123456', '0', 'http://img0.imgtn.bdimg.com/it/u=2841648446,236398816&fm=26&gp=0.jpg', '2019011198', '2019', '2020-05-31 08:08', '18299830012', '路人', 'olD4e0_cnxwigLLZSJiK2r7scYdc', '1');

INSERT INTO `user` VALUES ('1', 'admin', '123456', '1', 'https://b-ssl.duitang.com/uploads/item/201608/21/20160821194924_UCvFZ.jpeg', '6666666666', '1000', '1978-01-01 00:00', '66666666666', '超级管理员', '', '1');

INSERT INTO `user` VALUES ('16', '左一凡', '123456', '8', 'http://localhost:9999/avatar/zuoyifan.jpg', '2017091113', '2017', '2020-04-08 11:09', '18200126951', '左一凡', '', '1', '0');
INSERT INTO `user` VALUES ('17', '彭峰云', '123456', '8', 'http://localhost:9999/avatar/pengfengyun.jpg', '2017091114', '2017', '2020-04-08 12:09', '13203526950', '彭峰云', '', '1', '0');
INSERT INTO `user` VALUES ('18', '杨浩', '123456', '8', 'http://localhost:9999/avatar/yanghao.jpg', '2017091115', '2017', '2020-04-08 13:09', '15689102651', '杨浩', '', '1', '0');
INSERT INTO `user` VALUES ('19', '陶博', '123456', '8', 'http://localhost:9999/avatar/taobo.jpg', '2017091116', '2017', '2020-04-08 14:09', '134803128901', '陶博', '', '1', '0');