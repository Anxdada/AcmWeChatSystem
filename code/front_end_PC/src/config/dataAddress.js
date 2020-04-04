


const localhost = "http://localhost:9999"

// 电脑端后台主页的一些数据
export const GetHomeData = localhost+"/home/getHomeData";

// 用户(后台操作的接口)PC端
export const LoginUrl = localhost+"/user/PCLogin";
export const AddUserPC = localhost+"/user/addUserPC";
export const UpdateUserPC = localhost+"/user/updateUserPC";
export const SelectUserPC = localhost+"/user/selectUserPC";
export const SelectUserStatistic = localhost+"/user/statistic";
// 用户 (前台操作, 手机端)的接口

// PC/mobile 公用的接口
export const GetLoginUser = localhost+"/user/getLoginUser";
export const DetailUser = localhost+"/user/detailUser";



// 新闻的分类
export const AddNewsTag = localhost+"/newstag/addNewsTag";
export const DeleteNewsTag = localhost+"/newstag/deleteNewsTag";
export const UpdateNewsTag = localhost+"/newstag/updateNewsTag";
export const SelectNewsTag = localhost+"/newstag/selectNewsTag";
export const DetailNewsTag = localhost+"/newstag/detailNewsTag";
// 新闻
export const AddNewsUrl = localhost+"/news/addNews";
export const DeleteNews = localhost+"/news/deleteNews";
export const UpdateNews = localhost+"/news/updateNews";
export const SelectNews = localhost+"/news/selectNews";
export const DetailNewsUrl = localhost+"/news/detailNews";
// 手机端更新浏览量需求
export const UpdateNewsViewAndLike = localhost+"/news/updateNewsViewAndLike";



// 公告的分类
export const AddAnnouncementTag = localhost+"/announcementtag/addAnnouncementTag";
export const DeleteAnnouncementTag = localhost+"/announcementtag/deleteAnnouncementTag";
export const UpdateAnnouncementTag = localhost+"/announcementtag/updateAnnouncementTag";
export const SelectAnnouncementTag = localhost+"/announcementtag/selectAnnouncementTag";
export const DetailAnnouncementTag = localhost+"/announcementtag/detailAnnouncementTag";
// 公告
export const AddAnnouncementUrl = localhost+"/announcement/addAnnouncement";
export const DeleteAnnouncement = localhost+"/announcement/deleteAnnouncement";
export const UpdateAnnouncement = localhost+"/announcement/updateAnnouncement";
export const SelectAnnouncement = localhost+"/announcement/selectAnnouncement";
export const DetailAnnouncementUrl = localhost+"/announcement/detailAnnouncement";
// 报名相关
export const AddRegisterTable = localhost+"/register/addRegister"; 
export const DeleteRegisterTable = localhost+"/register/deleteRegister";
export const UpdateRegisterTable = localhost+"/register/updateRegister"; 
export const SelectRegisterTable = localhost+"/register/selectRegister";
// 手机端更新浏览量需求
export const UpdateAnnouncementView = localhost+"/announcement/updateAnnouncementView";



// 帖子标签
export const AddLabel = localhost+"/label/addLabel";
export const DeleteLabel = localhost+"/label/deleteLabel";
export const UpdateLabel = localhost+"/label/updateLabel";
export const SelectLabel = localhost+"/label/selectLabel";
export const DetailLabel = localhost+"/label/detailLabel";
// 讨论区帖子相关
export const AddPostUrl = localhost+"/post/addPost";
export const DeletePost = localhost+"/post/deletePost";
export const UpdatePost = localhost+"/post/updatePost";
export const SelectPost = localhost+"/post/selectPost";
export const DetailPostUrl = localhost+"/post/detailPost";
// 讨论区的评论和回复
// 评论指在帖子下的留言, 回复是帖子下留言下面的回复, 这个是不同的, 分两层
// 评论
export const AddComment = localhost+"/comment/addComment";
export const DeleteComment = localhost+"/comment/deleteComment";
export const SelectComment = localhost+"/comment/selectComment";
// 手机端需要
export const DetailComment = localhost+"/comment/detailComment";
export const GetLastPublishPostId = localhost+"/post/getLastPublishPostId";
// 回复
export const AddReply = localhost+"/reply/addReply";
export const DeleteReply = localhost+"/reply/deleteReply";
export const SelectReply = localhost+"/reply/selectReply";

// 评论和回复的点赞 就同一写在reply下面了. 反正是公用的记住
export const ChangeCommentReplyLike = localhost+"/reply/changeCommentReplyLike";
// 用于手机端用户主操作的(电脑端也可以用)
export const UpdatePostViewAndLike = localhost+"/post/updatePostViewAndLike";



// 友链相关
export const AddFriendUrl = localhost+"/friendurl/addFriendUrl";
export const DeleteFriendUrl = localhost+"/friendurl/deleteFriendUrl";
export const UpdateFriendUrl = localhost+"/friendurl/updateFriendUrl";
export const SelectFriendUrl = localhost+"/friendurl/selectFriendUrl";
export const DetailFriendUrl = localhost+"/friendurl/detailFriendUrl";



// 值日相关
export const AddOnDuty = localhost+"/onduty/addOnDuty";
export const DeleteOnDuty = localhost+"/onduty/deleteOnDuty";
export const UpdateOnDuty = localhost+"/onduty/updateOnDuty";
export const SelectOnDuty = localhost+"/onduty/selectOnDuty";
export const DetailOnDuty = localhost+"/onduty/detailOnDuty";
// 选择队员
export const GetTeamStaff = localhost+"/onduty/getOnDutyStaff";
// 手机端需求
// 获取当日值班人员信息
export const GetNowDayOnDutyUser = localhost+"/onduty/getNowDayOnDutyUser";



// 反馈相关
export const AddFeedback = localhost+"/feedback/addFeedback";
export const DeleteFeedback = localhost+"/feedback/deleteFeedback";
export const UpdateFeedback = localhost+"/feedback/updateFeedback";
export const SelectFeedback = localhost+"/feedback/selectFeedback";
// 帮助统计反馈评论的点赞之类的表
export const AddFeedbackCount = localhost+"/feedbackCount/addFeedbackCount";
export const DeleteFeedbackCount = localhost+"/feedbackCount/deleteFeedbackCount";
export const UpdateFeedbackCount = localhost+"/feedbackCount/updateFeedbackCount";


// 图片
export const UploadImg = localhost+"/uploadImg";

// 测试
export const TestFriendUrl = localhost+"/friendurl/selectAll";

export const AddPhoto = localhost+"/photo/addPhoto";




