package com.example.acm.service.deal;

import com.example.acm.common.ResultBean;
import com.example.acm.entity.User;

/**
 * @author xierenyi
 * @version 1.0
 * @date 2020-03-06 12:48
 */
public interface ForumTotalReplyDealService {
    /**
     * 添加讨论区全部回复
     * 可能是后台管理员添加的
     * 可能是前台用户添加的
     *
     * @param user 添加的人
     * @param replyUserId 回复(帖子, 评论或者回复的 createUser)
     * @param type 回复的类型( 0 是帖子, 1 是评论)
     * @param typeCorrespondId 对应于type的id
     * @param forumTotalReplyBody 回复内容
     * @return 结果
     */
    public ResultBean addForumTotalReply(User user, long replyUserId, int type, long typeCorrespondId, String forumTotalReplyBody);

    /**
     * 普通管理员可删除, 用户可删除本身的讨论区全部回复
     * 管理员删除主要就是因为举报..
     *
     * @param user 删除操作人
     * @param forumTotalReplyId 删除的讨论区全部回复id
     * @return
     */
    public ResultBean deleteForumTotalReply(User user, long forumTotalReplyId);


    // 因为不涉及更新操作, 所以就没写了, comment是涉及到了like的更新...

    /**
     *
     * @param user 当前的登录用户, 用户判定是否可以修改
     * @param replyUserId 回复(帖子, 评论或者回复的 createUser)
//     * @param type 回复的类型( 0 是帖子, 1 是评论, 2是回复)
     * @param aOrs 排序规则(升序还是降序)
     * @param order 按照那个字段排序(如果相同, 最好还是自己手写第二规则)
     * @param pageNum 当前的页数
     * @param pageSize 一页的数量
     * @returnO
     */
    public ResultBean selectForumTotalReply(User user, long replyUserId, int aOrs, String order, int pageNum, int pageSize);


    // 用不到detail信息

    // 注意这个表都是依附于 comment 和 reply的, 所以没有单独的controller接口!!!, 这个表专为手机端服务,
    // 通知有人回复了你的帖子, 评论等
}
