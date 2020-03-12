package com.example.acm.service.deal;

import com.example.acm.common.ResultBean;
import com.example.acm.entity.User;

/**
 * @author xierenyi
 * @version 1.0
 * @date 2020-03-06 12:48
 */
public interface CommentDealService {
    /**
     * 添加评论
     * 可能是后台管理员添加的
     * 可能是前台用户添加的
     *
     * @param user 添加的人
     * @param commentBody 评论内容
     * @param replyPostId 评论的帖子ID 必然有, 依附关系
     * @return 结果
     */
    public ResultBean addComment(User user, String commentBody, long replyPostId);

    /**
     * 普通管理员可删除, 用户可删除本身的评论
     * 管理员删除主要就是因为举报..
     *
     * @param user 删除操作人
     * @param commentId 删除的评论id
     * @return
     */
    public ResultBean deleteComment(User user, long commentId);

    /**
     * 只有评论的发表人才有权利修改, 管理员都是只能删除, 不能修改其它用户的评论
     *
     * 内容不具有更新操作
     * 这个只用来更新点赞功能
     *
     * @param user 修改的人
     * @param commentId 修改的评论id
     * @return 结果
     */
    public ResultBean updateComment(User user, long commentId);

    /**
     *
     * @param user 当前的登录用户, 用户判定是否可以修改
     * @param replyPostId 评论的帖子ID 必然有, 依附关系
     * @param aOrs 排序规则(升序还是降序)
     * @param order 按照那个字段排序(如果相同, 最好还是自己手写第二规则)
     * @param pageNum 当前的页数
     * @param pageSize 一页的数量
     * @returnO
     */
    public ResultBean selectComment(User user, long replyPostId, int aOrs, String order, int pageNum, int pageSize);


    /**
     * 根据评论id获取评论信息
     * 这个是为了解决一个bug, 删除表格一个元素后, 实际的记录还在, 当点修改时存来的记录就是已经删除的了
     * 所以修改需要通过id重新读取信息
     *
     * @param commentId 评论Id
     * @return
     */
    public ResultBean detailComment(long commentId);
}
