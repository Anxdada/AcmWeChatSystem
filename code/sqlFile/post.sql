-- ----------------------------
-- Table structure for `post`
-- ----------------------------
DROP TABLE IF EXISTS `post`;
CREATE TABLE `post` (
  `postId` bigint(20) NOT NULL AUTO_INCREMENT,
  `postTag` int(11) DEFAULT NULL,
  `postTitle` varchar(50) DEFAULT NULL,
  `postBody` text,
  `createUser` bigint(20) DEFAULT NULL,
  `createTime` datetime DEFAULT NULL,
  `updateUser` bigint(20) DEFAULT NULL,
  `updateTime` datetime DEFAULT NULL,
  `like` int(11) DEFAULT '0',
  `comments` int(11) DEFAULT '0',
  `views` int(11) DEFAULT '0',
  `isGreat` int(11) DEFAULT '0',
  `isHot` int(11) DEFAULT '0',
  `isHead` int(11) DEFAULT '0',
  `isEffective` int(11) DEFAULT '1',
  PRIMARY KEY (`postId`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of post
-- ----------------------------
INSERT INTO `post` VALUES ('1', '0', '参与讨论区必须知道的一些事情', '遵守规则', '1', '2020-01-01 00:00:00', '1', '2020-01-01 00:00:00', '0', '0', '100', '0', '0', '0', '1');
INSERT INTO `post` VALUES ('2', '7', '面试题求解', '地球上有多少个井盖', '8', '2020-02-29 14:51:23', '8', '2020-02-29 14:51:23', '0', '0', '10', '0', '0', '0', '1');
INSERT INTO `post` (postId, postTag, postTitle, postBody) VALUES ('3', '7', 'test', 'just test delete');