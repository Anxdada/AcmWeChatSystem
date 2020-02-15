


const localhost = "http://localhost:9999"

// 用户
export const GetLoginUserName = localhost+"/user/getLoginUserName";
export const LoginUrl = localhost+"/user/PCLogin";



// 新闻
export const AddNew = localhost+"/news/addNews";
export const SelectClass = localhost+"/news/selectClass";
export const DeleteClass = localhost+"/news/deleteNews";
export const AddNewsMain = localhost+"/news/addNewMain";
export const DeleteNewMain = localhost+"/news/deleteNewMain";
export const UpdateNewsMain = localhost+"/news/updateNewMain";
export const SelectNewsMain = localhost+"/news/selectNewsMain";
export const NewsDetail = localhost+"/news/detail";

// 友链相关
export const AddFriendUrl = localhost+"/friendUrl/addFriendUrl";
export const DeleteFriendUrl = localhost+"/friendUrl/deleteFriendUrl";
export const UpdateFriendUrl = localhost+"/friendUrl/updateFriendUrl";
export const SelectFriendUrl = localhost+"/friendUrl/selectFriendUrl";
export const DetailFriendUrl = localhost+"/friendUrl/detailFriendUrl";

// 值日相关
// export const select
// export const AddFriendUrl = localhost+"/friendUrl/addFriendUrl";
// export const DeleteFriendUrl = localhost+"/friendUrl/deleteFriendUrl";

// 反馈相关
export const AddFeedback = localhost+"/feedback/addFeedback";
export const DeleteFeedback = localhost+"/feedback/deleteFeedback";
export const UpdateFeedback = localhost+"/feedback/updateFeedback";
export const SelectFeedback = localhost+"/feedback/selectFeedback";
// 帮助统计反馈评论的点赞之类的表
export const AddFeedbackCount = localhost+"/feedbackCount/addFeedbackCount";
export const DeleteFeedbackCount = localhost+"/feedbackCount/deleteFeedbackCount";
export const UpdateFeedbackCount = localhost+"/feedbackCount/updateFeedbackCount";



// 测试
export const TestFriendUrl = localhost+"/friendUrl/selectAll";




