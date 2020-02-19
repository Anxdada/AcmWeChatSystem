-- ----------------------------
-- Table structure for `announcementTag`
-- ----------------------------
DROP TABLE IF EXISTS `announcementTag`;
CREATE TABLE `announcementTag` (
  `announcementTagId` bigint(20) NOT NULL AUTO_INCREMENT,
  `announcementTagName` varchar(50) DEFAULT NULL,
  `announcementTagColor` varchar(50) DEFAULT NULL,
  `createUser` bigint(20) DEFAULT NULL,
  `createTime` datetime DEFAULT NULL,
  `updateUser` bigint(20) DEFAULT NULL,
  `updateTime` datetime DEFAULT NULL,
  `isEffective` bigint(11) DEFAULT '1',
  PRIMARY KEY (`announcementTagId`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of announcementTag
-- ----------------------------
INSERT INTO `announcementTag` VALUES ('1', '讲座', '#3ce016', '1', '2020-01-11 17:15:28', '1', '2020-01-11 17:15:28', '1');
INSERT INTO `announcementTag` VALUES ('2', '校赛', '#16c4e0' , '1', '2019-11-11 19:15:28', '2', '2020-12-11 08:15:28', '1');
INSERT INTO `announcementTag` VALUES ('3', '社团活动', '#9932CC', '1', '2019-12-25 13:25:28', '1', '2019-12-25 13:25:2', '1');
INSERT INTO `announcementTag` VALUES ('4', '通知', '#00FFFF', '1', '2020-01-11 17:15:28', '1', '2020-01-11 17:15:28', '1');
INSERT INTO `announcementTag` VALUES ('5', '会议', '#FFFACD', '1', '2020-01-11 17:15:28', '1', '2020-01-11 17:15:28', '1');
INSERT INTO `announcementTag` VALUES ('6', '个人训练赛', '#e01639', '1', '2020-01-11 17:15:28', '1', '2020-01-11 17:15:28', '1');
INSERT INTO `announcementTag` VALUES ('7', '组队训练赛', '#16e0c4', '1', '2020-01-11 17:15:28', '1', '2020-01-11 17:15:28', '1');