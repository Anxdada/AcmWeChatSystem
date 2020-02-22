-- ----------------------------
-- Table structure for `news`
-- ----------------------------
DROP TABLE IF EXISTS `news`;
CREATE TABLE `news` (
  `newsId` bigint(20) NOT NULL AUTO_INCREMENT,
  `newsTitle` varchar(50) DEFAULT NULL,
  `newsBody` text,
  `newsTagId` bigint(20) DEFAULT NULL,
  `createUser` bigint(20) DEFAULT NULL,
  `createTime` datetime DEFAULT NULL,
  `updateUser` bigint(20) DEFAULT NULL,
  `updateTime` datetime DEFAULT NULL,
  `isPublish` bigint(11) DEFAULT '1',
  `isEffective` bigint(11) DEFAULT '1',
  PRIMARY KEY (`newsId`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of news
-- ----------------------------
INSERT INTO `news` VALUES ('1', '时事突击', '测试', '1', '1', '2020-01-11 00:00:00', '1', '2020-01-11 00:00:00', '1', '1');
INSERT INTO `news` VALUES ('2', '我校将继续承担2020CCCC成都赛区的赛点之一', '测试', '2', '1', '2020-01-11 00:00:00', '1', '2020-01-11 00:00:00', '0', '1');
INSERT INTO `news` VALUES ('3', '我校ACM首获区域赛金牌!', '测试', '3', '1', '2020-01-11 00:00:00', '1', '2020-01-11 00:00:00', '1', '1');
INSERT INTO `news` VALUES ('4', '震惊! 居然做出这种事情分类', '测试', '4', '1', '2020-01-11 00:00:00', '1', '2020-01-11 00:00:00', '1', '1');