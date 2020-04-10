package com.example.acm.entity;

import java.util.Date;

/**
 * @author xierenyi
 * @version 1.0
 * @date 2020-04-10 23:59
 */
public class ForumTotalReply {

    private Long forumTotalReplyId;
    private Long replyUserId;
    private Integer type;  // 0 是 帖子, 1是评论, 2是回复(但是统称显示为评论)
    private Long typeCorrespondId; // type对应的id
    private Object forumTotalReplyBody;
    private Long createUser;
    private Date createTime;
    private Long updateUser;
    private Date updateTime;
    private Integer isEffective;

    public Long getForumTotalReplyId() {
        return forumTotalReplyId;
    }

    public void setForumTotalReplyId(Long forumTotalReplyId) {
        this.forumTotalReplyId = forumTotalReplyId;
    }

    public Long getReplyUserId() {
        return replyUserId;
    }

    public void setReplyUserId(Long replyUserId) {
        this.replyUserId = replyUserId;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public Long getTypeCorrespondId() {
        return typeCorrespondId;
    }

    public void setTypeCorrespondId(Long typeCorrespondId) {
        this.typeCorrespondId = typeCorrespondId;
    }

    public Object getForumTotalReplyBody() {
        return forumTotalReplyBody;
    }

    public void setForumTotalReplyBody(Object forumTotalReplyBody) {
        this.forumTotalReplyBody = forumTotalReplyBody;
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

    public Integer getIsEffective() {
        return isEffective;
    }

    public void setIsEffective(Integer isEffective) {
        this.isEffective = isEffective;
    }
}
