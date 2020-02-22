-- ----------------------------
-- Table structure for `announcement`
-- ----------------------------
DROP TABLE IF EXISTS `announcement`;
CREATE TABLE `announcement` (
  `announcementId` bigint(20) NOT NULL AUTO_INCREMENT,
  `announcementTitle` varchar(50) DEFAULT NULL,
  `announcementBody` text,
  `announcementTagId` bigint(20) DEFAULT NULL,
  `createUser` bigint(20) DEFAULT NULL,
  `createTime` datetime DEFAULT NULL,
  `updateUser` bigint(20) DEFAULT NULL,
  `updateTime` datetime DEFAULT NULL,
  `isRegister` bigint(11) DEFAULT '0',
  `registerStartTime` datetime DEFAULT NULL,
  `registerEndTime` datetime DEFAULT NULL,
  `startTime` datetime DEFAULT NULL,
  `lastTime` varchar(50) DEFAULT NULL,
  `isPublish` bigint(11) DEFAULT '1',
  `isEffective` bigint(11) DEFAULT '1',
  PRIMARY KEY (`announcementId`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of announcement
-- ----------------------------
INSERT INTO `announcement` VALUES ('1', 'DFS新生讲座', '测试(后面加图片)', '1', '1', '2020-01-11 17:15:28', '1', '2020-01-11 17:15:28', '0', NULL, NULL, NULL, NULL, '1', '1');
INSERT INTO `announcement` VALUES ('2', '西南民大新生赛', '测试', '2', '1', '2019-11-11 19:15:28', '2', '2020-12-11 08:15:28', '0', NULL, NULL, NULL, NULL, '1', '1');
INSERT INTO `announcement` VALUES ('3', '招新', '测试', '3', '1', '2019-12-25 13:25:28', '1', '2019-12-25 13:25:2', '0', NULL, NULL, NULL, NULL, '1', '1');
INSERT INTO `announcement` VALUES ('4', '最近的比赛汇总', '测试', '4', '1', '2020-01-11 17:15:28', '1', '2020-01-11 17:15:28', '0', NULL, NULL, NULL, NULL, '1', '1');
INSERT INTO `announcement` VALUES ('5', '关于暑假集训的安排', '测试', '5', '1', '2020-01-11 17:15:28', '1', '2020-01-11 17:15:28', '0', NULL, NULL, NULL, NULL, '1', '1');
INSERT INTO `announcement` VALUES ('6', '训练赛10', '测试', '6', '1', '2020-01-11 17:15:28', '1', '2020-01-11 17:15:28', '0', NULL, NULL, NULL, NULL, '1', '1');
INSERT INTO `announcement` VALUES ('7', '讲座报名', '测试', '1', '1', '2020-02-02 17:15:28', '1', '2020-02-18 11:16:00', '1', '2020-02-18 10:00', '2020-02-20 10:00', '2020-02-22 09:00', '大约两小时', '1', '1');
INSERT INTO `announcement` VALUES ('9', '讲座报名', '测试', '1', '1', '2020-02-02 17:15:28', '1', '2020-02-18 11:16:00', '0', NULL, NULL, NULL, NULL, '0', '1');
INSERT INTO `announcement` VALUES ('10', '讲座报名', '测试', '1', '1', '2020-02-02 17:15:28', '1', '2020-02-18 11:16:00', '0', NULL, NULL, NULL, NULL, '0', '0');
INSERT INTO `announcement` VALUES ('11', '讲座报名', '测试', '1', '1', '2020-02-02 17:15:28', '1', '2020-02-18 11:16:00', '1', '2020-02-18 10:00', '2020-02-20 10:00', '2020-02-22 09:00', '大约两小时', '0', '1');