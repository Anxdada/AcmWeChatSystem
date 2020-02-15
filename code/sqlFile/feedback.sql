-- ----------------------------
-- Table structure for `feedback`
-- ----------------------------
DROP TABLE IF EXISTS `feedback`;
CREATE TABLE `feedback` (
  `feedbackId` bigint(20) NOT NULL AUTO_INCREMENT,
  `feedbackAvatar` varchar(255) DEFAULT NULL,
  `feedbackUser` bigint(20) DEFAULT NULL,
  `feedbackBody` text,
  `feedbackTime` datetime DEFAULT NULL,
  `isEffective` int(11) DEFAULT '1',
  PRIMARY KEY (`feedbackId`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;


-- ----------------------------
-- Records of feedback
-- ----------------------------
INSERT INTO `feedback` VALUES ('1', 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png', '2', '我觉得这个系统做的一般, 建议有个评论回复功能, 不然真的麻烦~~~', '2020-01-01 23:09', '1');
INSERT INTO `feedback` VALUES ('2', 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png', '8', '律政先锋在此~~~', '2020-01-02 23:09', '1');
INSERT INTO `feedback` VALUES ('3', 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png', '9', '好男人就是我, 我就是~~~', '2020-01-03 23:09', '1');
INSERT INTO `feedback` VALUES ('4', 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png', '10', '我是一个大学教授, 我最棒~~~', '2020-01-04 23:09', '1');
INSERT INTO `feedback` VALUES ('5', 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png', '11', '浪里小白龙~~~', '2020-01-05 23:09', '1');
INSERT INTO `feedback` VALUES ('6', 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png', '12', '我的数学很差, 是个雪茶~~~', '2020-01-06 23:09', '1');
INSERT INTO `feedback` VALUES ('7', 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png', '13', '完美人设, 你们就想想就好~~~', '2020-01-12 23:09', '1');
INSERT INTO `feedback` VALUES ('8', 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png', '14', '我是个富二代, 很有钱, 很喜欢大力~~~', '2020-02-01 23:09', '1');
INSERT INTO `feedback` VALUES ('9', 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png', '15', '我很喜欢吃东西, 就是有点黑~', '2020-02-11 23:09', '1');

