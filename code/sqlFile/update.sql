

UPDATE user tt SET tt.avatar = 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' WHERE tt.userId = 1;
UPDATE user tt SET tt.avatar = 'http://localhost:9999/avatar/touxiang1.jpg' WHERE tt.userId = 2;
UPDATE user tt SET tt.avatar = 'http://localhost:9999/avatar/touxiang2.jpg' WHERE tt.userId = 3;
UPDATE user tt SET tt.avatar = 'http://localhost:9999/avatar/touxiang3.jpg' WHERE tt.userId = 4;
UPDATE user tt SET tt.auth = 4 WHERE tt.userId = 6;
UPDATE user tt SET tt.avatar = 'http://localhost:9999/avatar/touxiang5.jpg' WHERE tt.userId = 6;
UPDATE user tt SET tt.avatar = 'http://localhost:9999/avatar/touxiang6.jpg' WHERE tt.userId = 7;
UPDATE user tt SET tt.avatar = 'http://localhost:9999/avatar/zhangwei.jpg' WHERE tt.userId = 8;
UPDATE user tt SET tt.avatar = 'http://localhost:9999/avatar/xiaoxian.jpg' WHERE tt.userId = 9;
UPDATE user tt SET tt.avatar = 'http://localhost:9999/avatar/yifei.jpg' WHERE tt.userId = 10;
UPDATE user tt SET tt.avatar = 'http://localhost:9999/avatar/ziqiao.jpg' WHERE tt.userId = 11;
UPDATE user tt SET tt.avatar = 'http://localhost:9999/avatar/meijiao.jpg' WHERE tt.userId = 12;
UPDATE user tt SET tt.avatar = 'http://localhost:9999/avatar/dali.jpg' WHERE tt.userId = 13;
UPDATE user tt SET tt.avatar = 'http://localhost:9999/avatar/haitang.jpg' WHERE tt.userId = 14;
UPDATE reply tt SET tt.replyCommentId = 8 where tt.replyId = 4;

26 - 31

UPDATE announcement tt SET tt.view = 201 where tt.announcementId = 26;
UPDATE announcement tt SET tt.view = 102 where tt.announcementId = 27;
UPDATE announcement tt SET tt.view = 88 where tt.announcementId = 28;
UPDATE announcement tt SET tt.view = 67 where tt.announcementId = 29;
UPDATE announcement tt SET tt.view = 15 where tt.announcementId = 30;
UPDATE announcement tt SET tt.view = 31 where tt.announcementId = 31;

UPDATE news tt SET tt.createTime = "2020-03-16 08:46:26" where tt.newsId = 41;

UPDATE news tt SET tt.fromWhere = "测试";

UPDATE news tt SET tt.fromWhere = "学校官网" where newsId = 46;

UPDATE news tt SET tt.fromWhere = "知乎" where newsId = 45;
UPDATE news tt SET tt.fromWhere = "个人写手" where newsId = 44;
UPDATE news tt SET tt.fromWhere = "快手" where newsId = 43;
UPDATE news tt SET tt.fromWhere = "字节跳动" where newsId = 42;
UPDATE news tt SET tt.fromWhere = "学校官网" where newsId = 41;

UPDATE user tt SET tt.sex = 1 where userId = 10;

UPDATE news tt SET tt.firstImg = NULL where newsId = 49;

UPDATE post tt SET tt.firstImg = "http://localhost:9999/photo/1fad4f93-59e2-4661-b1e4-3a38e21f6c9f.jpg" where tt.postId = 28;
UPDATE post tt SET tt.firstImg = "http://localhost:9999/photo/074c3eb1-17cd-49ca-becf-ea565bafdf76.jpg" where tt.postId = 30;
UPDATE post tt SET tt.firstImg = "http://localhost:9999/photo/d7c17ffd-5370-4002-97e0-bc6753c6cc7a.jpg" where tt.postId = 31;
UPDATE post tt SET tt.firstImg = "http://localhost:9999/photo/17c0bdc8-65d0-4d5f-9c15-d98dad48bee3.jpg" where tt.postId = 32;
UPDATE post tt SET tt.firstImg = "http://localhost:9999/photo/51148c04-5f95-4fc0-8e96-853e7545e42b.jpg" where tt.postId = 33;
UPDATE post tt SET tt.firstImg = "http://localhost:9999/photo/77b3e4a2-8f76-4d91-8e18-d5be4989e710.jpg" where tt.postId = 34;
UPDATE post tt SET tt.firstImg = "http://localhost:9999/photo/b3c9ba27-5cfd-436c-80d7-c1b0967d23f3.jpg" where tt.postId = 35;
UPDATE post tt SET tt.firstImg = "http://localhost:9999/photo/1dd02911-10e4-4abc-83ff-a7b06334c261.jpg" where tt.postId = 37;
UPDATE post tt SET tt.firstImg = "http://localhost:9999/photo/04d8d1fa-8850-43c0-a98f-41fba42773b1.jpg" where tt.postId = 38;

alter table register change column userId registerUserId bigint(20);