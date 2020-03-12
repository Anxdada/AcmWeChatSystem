package com.example.acm.service.deal;

import com.example.acm.common.ResultBean;
import com.example.acm.entity.User;

/**
 * @author xierenyi
 * @version 1.0
 * @date 2020-03-07 22:37
 */
public interface ReplyDealService {
    /**
     * 添加回复
     * 可能是后台管理员添加的
     * 可能是前台用户添加的
     *
     * @param user 添加的人
     * @param replyBody 回复内容
     * @param replyCommentId 回复的评论ID 这个值肯定存在
     * @param reverseReplyId 回复的 回复Id (如果是直接回复的评论, 那么这个值就是-1) 和回复中的回复 讨论 那么就是有值
     * @return 结果
     */
    public ResultBean addReply(User user, String replyBody, long replyCommentId, long reverseReplyId);

    /**
     * 普通管理员可删除, 用户可删除本身的回复
     * 管理员删除主要就是因为举报..
     *
     * @param user 删除操作人
     * @param replyId 删除的回复id
     * @return
     */
    public ResultBean deleteReply(User user, long replyId);

    /**
     * 只有回复的发表人才有权利修改, 管理员都是只能删除, 不能修改其它用户的回复
     *
     *
     * 目前只用来更新点赞数量
     *
     * @param user 修改的人
     * @param replyId 修改的回复id
     * @return 结果
     */
    public ResultBean updateReply(User user, long replyId);

    /**
     *
     * @param user 当前的登录用户, 用户判定是否可以修改
     * @param replyCommentId 回复的评论ID
     * @param aOrs 排序规则(升序还是降序)
     * @param order 按照那个字段排序(如果相同, 最好还是自己手写第二规则)
     * @param pageNum 当前的页数
     * @param pageSize 一页的数量
     * @returnO
     */
    public ResultBean selectReply(User user, long replyCommentId, int aOrs, String order, int pageNum, int pageSize);


    /**
     * 根据回复id获取回复信息
     * 这个是为了解决一个bug, 删除表格一个元素后, 实际的记录还在, 当点修改时存来的记录就是已经删除的了
     * 所以修改需要通过id重新读取信息
     *
     * @param replyId 回复Id
     * @return
     */
    public ResultBean detailReply(long replyId);
}
