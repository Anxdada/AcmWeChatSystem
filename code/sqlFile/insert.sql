

INSERT INTO `onDuty` VALUES ('14', '咖喱酱', '11111111111', '2020-07-01 00:00:00', '2020-07-01 00:00:00', '1', '2020-01-11 17:15:28', '1', '2020-01-11 17:15:28', '1');

ALTER TABLE user ADD sex bigint(11) DEFAULT '0';


ALTER TABLE news ADD fristImg varchar(200) DEFAULT NULL;

ALTER TABLE news ADD fromWhere varchar(50) DEFAULT '未知';
ALTER TABLE news ADD newslike bigint(11) DEFAULT '0';

ALTER TABLE news CHANGE newslike newsLike bigint(11) DEFAULT '0';

ALTER TABLE announcement CHANGE announcementTitle announcementTitle VARCHAR(200);

ALTER TABLE news ADD view bigint(11) DEFAULT '0';