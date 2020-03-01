-- ----------------------------
-- Table structure for `comment`
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `commentId` bigint(20) NOT NULL AUTO_INCREMENT,
  `commentBody` text,
  `postId` int(11) DEFAULT '-1',
  `replyCommentId` int(11) DEFAULT '-1',
  `createUser` bigint(20) DEFAULT NULL,
  `createTime` datetime DEFAULT NULL,
  `updateUser` bigint(20) DEFAULT NULL,
  `updateTime` datetime DEFAULT NULL,
  `like` int(11) DEFAULT '0',
  `isEffective` int(11) DEFAULT '1',
  PRIMARY KEY (`commentId`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of comment
-- ----------------------------
INSERT INTO `comment` VALUES ('1', '大概是1个', '2', '-1', '2', '2020-03-01 00:00:00', '2', '2020-03-01 00:00:00', '0', '1');
INSERT INTO `comment` VALUES ('2', '为什么了?', '-1', '1', '8', '2020-03-01 09:00:00', '8', '2020-03-01 09:00:00', '0', '1');