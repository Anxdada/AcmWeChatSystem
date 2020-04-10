-- ----------------------------
-- Table structure for `forumTotalReply`
-- ----------------------------
DROP TABLE IF EXISTS `forumTotalReply`;
CREATE TABLE `forumTotalReply` (
  `forumTotalReplyId` bigint(20) NOT NULL AUTO_INCREMENT,
  `replyUserId` bigint(20) DEFAULT NULL,
  `type` int(11) DEFAULT '0',
  `typeCorrespondId` bigint(20) DEFAULT NULL,
  `forumTotalReplyBody` text,
  `createUser` bigint(20) DEFAULT NULL,
  `createTime` datetime DEFAULT NULL,
  `updateUser` bigint(20) DEFAULT NULL,
  `updateTime` datetime DEFAULT NULL,
  `isEffective` int(11) DEFAULT '1',
  PRIMARY KEY (`forumTotalReplyId`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;


INSERT INTO `forumTotalReply` VALUES ('1', '2', '1', '31', '多田便利店', '9', '2020-04-10 23:25:00', '9', '2020-04-10 23:25:00', '1');
INSERT INTO `forumTotalReply` VALUES ('2', '2', '1', '35', '你写日记吗?', '9', '2020-04-10 23:25:00', '9', '2020-04-10 23:25:00', '1');
INSERT INTO `forumTotalReply` VALUES ('3', '2', '0', '48', '正经人谁写日记啊?', '9', '2020-04-10 23:25:00', '9', '2020-04-10 23:25:00', '1');
INSERT INTO `forumTotalReply` VALUES ('4', '2', '1', '31', '我想要在茅亭里看雨、假山边看蚂蚁，看蝴蝶恋爱，看蜘蛛结网，看水，看船，看云，看瀑布，看宋清如甜甜地睡觉', '2', '2020-03-02 23:00:00', '2', '2020-03-02 23:00:00', '1');