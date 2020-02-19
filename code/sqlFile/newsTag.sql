-- ----------------------------
-- Table structure for `newsTag`
-- ----------------------------
DROP TABLE IF EXISTS `newsTag`;
CREATE TABLE `newsTag` (
  `newsTagId` bigint(20) NOT NULL AUTO_INCREMENT,
  `newsTagName` varchar(50) DEFAULT NULL,
  `newsTagColor` varchar(50) DEFAULT NULL,
  `createUser` bigint(20) DEFAULT NULL,
  `createTime` datetime DEFAULT NULL,
  `updateUser` bigint(20) DEFAULT NULL,
  `updateTime` datetime DEFAULT NULL,
  `isEffective` bigint(11) DEFAULT '1',
  PRIMARY KEY (`newsTagId`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of newsTag
-- ----------------------------
INSERT INTO `newsTag` VALUES ('1', '时事新闻', '#3ce016', '1', '2020-01-11 17:15:28', '1', '2020-01-11 17:15:28', '1');
INSERT INTO `newsTag` VALUES ('2', '竞赛', '#e01639' , '1', '2019-11-11 19:15:28', '2', '2020-12-11 08:15:28', '1');
INSERT INTO `newsTag` VALUES ('3', '获奖', '#16e0c4', '1', '2019-12-25 13:25:28', '1', '2019-12-25 13:25:2', '1');
INSERT INTO `newsTag` VALUES ('4', '未分类', '#16c4e0', '1', '2020-02-11 17:15:28', '1', '2020-01-11 17:15:28', '1');