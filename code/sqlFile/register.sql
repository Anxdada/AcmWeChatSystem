-- ----------------------------
-- Table structure for `register`
-- ----------------------------
DROP TABLE IF EXISTS `register`;
CREATE TABLE `register` (
  `registerId` bigint(20) NOT NULL AUTO_INCREMENT,
  `announcementId` bigint(20) DEFAULT NULL,
  `registerTime` datetime DEFAULT NULL,
  `userId` bigint(20) DEFAULT NULL,
  `studentId` bigint(20) DEFAULT NULL,
  `realName` varchar(50) DEFAULT NULL,
  `updateUser` bigint(20) DEFAULT NULL,
  `updateTime` datetime DEFAULT NULL,
  `isEffective` bigint(11) DEFAULT '1',
  PRIMARY KEY (`registerId`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of register
-- ----------------------------
INSERT INTO `register` VALUES ('1', '7', '2020-01-11 17:15:28', '2', '2016081187', '谢仁义', '1', '2020-02-03 00:00:00', '1');
INSERT INTO `register` VALUES ('2', '7', '2020-01-11 19:15:28', '5', '2017081175', '闫国龙', '1', '2020-02-03 00:00:00', '1');
INSERT INTO `register` VALUES ('3', '7', '2020-01-11 09:25:28', '16', '2017091113', '左一凡', '1', '2020-02-03 00:00:00', '1');
INSERT INTO `register` VALUES ('4', '7', '2020-01-11 11:15:28', '17', '2017091114', '彭峰云', '1', '2020-02-03 00:00:00', '1');
INSERT INTO `register` VALUES ('5', '7', '2020-01-11 13:15:28', '18', '2017091115', '杨浩', '1', '2020-02-03 00:00:00', '1');
INSERT INTO `register` VALUES ('6', '7', '2020-01-11 13:16:28', '19', '2017091116', '陶博', '1', '2020-02-03 00:00:00', '1');
INSERT INTO `register` VALUES ('7', '7', '2020-01-11 22:15:28', '4', '2016051227', '林胡龙', '1', '2020-02-03 00:00:00', '1');