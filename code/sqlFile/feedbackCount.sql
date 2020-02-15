-- ----------------------------
-- Table structure for `feedbackCount`
-- ----------------------------
DROP TABLE IF EXISTS `feedbackCount`;
CREATE TABLE `feedbackCount` (
  `feedbackCountId` bigint(20) NOT NULL AUTO_INCREMENT,
  `feedbackId` bigint(20) NOT NULL,
  `userId` bigint(20) NOT NULL,
  `operateTime` Date DEFAULT NULL,
  `type` bigint(11) DEFAULT '0',
  `isEffective` bigint(11) DEFAULT '1',
  PRIMARY KEY (`feedbackCountId`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of feedbackCount
-- ----------------------------
INSERT INTO `feedbackCount` VALUES ('1', '1', '2', '2020-01-01 12:23', '1', '1');
INSERT INTO `feedbackCount` VALUES ('2', '3', '2', '2020-01-01 12:23', '1', '1');
INSERT INTO `feedbackCount` VALUES ('3', '5', '2', '2020-01-01 12:23', '-1', '0');
INSERT INTO `feedbackCount` VALUES ('5', '5', '2', '2020-01-02 12:23', '1', '1');
INSERT INTO `feedbackCount` VALUES ('4', '9', '2', '2020-01-01 12:23', '-1', '1');
