-- ----------------------------
-- Table structure for `label`
-- ----------------------------
DROP TABLE IF EXISTS `label`;
CREATE TABLE `label` (
  `labelId` bigint(20) NOT NULL AUTO_INCREMENT,
  `labelName` varchar(50) DEFAULT NULL,
  `labelColor` varchar(50) DEFAULT NULL,
  `flag` bigint(30) NOT NULL,
  `createUser` bigint(20) DEFAULT NULL,
  `createTime` datetime DEFAULT NULL,
  `updateUser` bigint(20) DEFAULT NULL,
  `updateTime` datetime DEFAULT NULL,
  `isEffective` bigint(11) DEFAULT '1',
  PRIMARY KEY (`labelId`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of label
-- ----------------------------
INSERT INTO `label` VALUES ('1', '情感', '#b86234', '1', '1', '2020-02-11 17:15:28', '1', '2020-02-11 17:15:28', '1');
INSERT INTO `label` VALUES ('2', '线段树', '#e01639' , '2', '1', '2020-01-11 19:15:28', '2', '2020-02-11 08:15:28', '1');
INSERT INTO `label` VALUES ('3', '动态规划', '#16e0c4', '3', '1', '2020-01-01 13:25:28', '1', '2020-02-11 13:25:21', '1');
INSERT INTO `label` VALUES ('4', '博弈论', '#16c4e0', '4', '1', '2019-02-11 17:15:28', '1', '2020-02-11 17:15:28', '1');