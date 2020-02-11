-- ----------------------------
-- Table structure for `friendUrl`
-- ----------------------------
DROP TABLE IF EXISTS `friendUrl`;
CREATE TABLE `friendUrl` (
  `friendUrlId` bigint(20) NOT NULL AUTO_INCREMENT,
  `friendUrlName` varchar(50) DEFAULT NULL,
  `friendUrlAddress` varchar(50) DEFAULT NULL,
  `friendUrlTag` varchar(50) DEFAULT NULL,
  `createUser` bigint(20) DEFAULT NULL,
  `createTime` datetime DEFAULT NULL,
  `updateUser` bigint(20) DEFAULT NULL,
  `updateTime` datetime DEFAULT NULL,
  `isEffective` int(11) DEFAULT '1',
  PRIMARY KEY (`friendUrlId`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of friendUrl
-- ----------------------------
INSERT INTO `friendUrl` VALUES ('1', '龙龙龙', 'www.jianshu.com/u/fd36ed1f2555', '个人博客', '1', '2020-01-11 17:15:28', '1', '2020-01-11 17:15:28', '1');
INSERT INTO `friendUrl` VALUES ('2', '谢仁义', 'anxdada.github.io', '个人博客', '1', '2019-11-11 19:15:28', '2', '2020-12-11 08:15:28', '1');
INSERT INTO `friendUrl` VALUES ('3', 'Codeforces', 'codeforces.com', '竞赛网站', '1', '2019-12-25 13:25:28', '1', '2019-12-25 13:25:2', '1');
INSERT INTO `friendUrl` VALUES ('4', 'kuangbin', 'www.cnblogs.com/kuangbin', '圈内知名博客', '1', '2020-01-11 17:15:28', '1', '2020-01-11 17:15:28', '1');
INSERT INTO `friendUrl` VALUES ('5', '测试', 'www.google.com', '个人博客', '1', '2020-01-11 17:15:28', '1', '2020-01-11 17:15:28', '1');
INSERT INTO `friendUrl` VALUES ('6', '测试', 'www.google.com', '个人博客', '1', '2020-01-11 17:15:28', '1', '2020-01-11 17:15:28', '1');
INSERT INTO `friendUrl` VALUES ('7', '测试', 'www.google.com', '个人博客', '1', '2020-01-11 17:15:28', '1', '2020-01-11 17:15:28', '1');
INSERT INTO `friendUrl` VALUES ('8', '测试', 'www.google.com', '个人博客', '1', '2020-01-11 17:15:28', '1', '2020-01-11 17:15:28', '1');
INSERT INTO `friendUrl` VALUES ('9', '测试', 'www.google.com', '个人博客', '1', '2020-01-11 17:15:28', '1', '2020-01-11 17:15:28', '0');
INSERT INTO `friendUrl` VALUES ('10', '测试', 'www.google.com', '个人博客', '1', '2020-01-11 17:15:28', '1', '2020-01-11 17:15:28', '1');
INSERT INTO `friendUrl` VALUES ('11', '测试', 'www.google.com', '个人博客', '1', '2020-01-11 17:15:28', '1', '2020-01-11 17:15:28', '1');
INSERT INTO `friendUrl` VALUES ('12', '测试', 'www.google.com', '个人博客', '1', '2020-01-11 17:15:28', '1', '2020-01-11 17:15:28', '1');
INSERT INTO `friendUrl` VALUES ('13', '测试', 'www.google.com', '个人博客', '1', '2020-01-11 17:15:28', '1', '2020-01-11 17:15:28', '0');

