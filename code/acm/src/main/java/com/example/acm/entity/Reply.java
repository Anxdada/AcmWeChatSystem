package com.example.acm.entity;

import java.util.Date;

/**
 * 回复表
 * 是专门用来回复评论的 区分出来的表
 *
 *
 * @author xierenyi
 * @version 1.0
 * @date 2020-03-7 22:24
 */
public class Reply {
    private Long replyId;
    private Object replyBody;
    private Long replyCommentId;  // 这个肯定有值
    private Long reverseReplyId;  // 这个为-1时就是 无回复人, 相当于默认在该层下面, 类似于回复层主这种..
    private Long createUser;
    private Date createTime;
    private Long updateUser;
    private Date updateTime;
    private Integer like;
    private Integer isEffective;

    public Long getReplyId() {
        return replyId;
    }

    public void setReplyId(Long replyId) {
        this.replyId = replyId;
    }

    public Object getReplyBody() {
        return replyBody;
    }

    public void setReplyBody(Object replyBody) {
        this.replyBody = replyBody;
    }

    public Long getReplyCommentId() {
        return replyCommentId;
    }

    public void setReplyCommentId(Long replyCommentId) {
        this.replyCommentId = replyCommentId;
    }

    public Long getReverseReplyId() {
        return reverseReplyId;
    }

    public void setReverseReplyId(Long reverseReplyId) {
        this.reverseReplyId = reverseReplyId;
    }

    public Long getCreateUser() {
        return createUser;
    }

    public void setCreateUser(Long createUser) {
        this.createUser = createUser;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Long getUpdateUser() {
        return updateUser;
    }

    public void setUpdateUser(Long updateUser) {
        this.updateUser = updateUser;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    public Integer getLike() {
        return like;
    }

    public void setLike(Integer like) {
        this.like = like;
    }

    public Integer getIsEffective() {
        return isEffective;
    }

    public void setIsEffective(Integer isEffective) {
        this.isEffective = isEffective;
    }
}
