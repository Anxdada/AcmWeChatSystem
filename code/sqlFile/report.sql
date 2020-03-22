-- ----------------------------
-- Table structure for `report`
-- ----------------------------
DROP TABLE IF EXISTS `report`;
CREATE TABLE `report` (
  `reportId` bigint(20) NOT NULL AUTO_INCREMENT,
  `type` varchar(50) NOT NULL,
  `typeId` int(20) NOT NULL,
  `reportBody` varchar(200) DEFAULT NULL,
  `reason` varchar(50) DEFAULT NULL,
  `createUser` bigint(20) DEFAULT NULL,
  `createTime` datetime DEFAULT NULL,
  `handleUser` bigint(20) DEFAULT NULL,
  `handleTime` datetime DEFAULT NULL,
  `result` varchar(200) DEFAULT NULL,
  `isHandle` int(11) DEFAULT '0',
  `isEffective` int(11) DEFAULT '1',
  PRIMARY KEY (`reportId`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of report
-- ----------------------------
INSERT INTO `report` VALUES ('1', 'post', '2', '具有严重的挑衅行为', '不友善/色情/低俗内容', '14', '2020-03-02 00:00:00', '2', '2020-03-02 01:00:00', '对不起, 经查证不存在该行为', '1', '1');
INSERT INTO `report` VALUES ('2', 'post', '2', '双标狗', '其它', '15', '2020-02-29 14:51:23', NULL, NULL, NULL, '0', '1');