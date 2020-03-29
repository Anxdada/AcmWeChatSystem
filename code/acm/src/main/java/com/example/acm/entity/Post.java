package com.example.acm.entity;

import java.util.Date;

/**
 * 帖子表
 * 点赞列表存在redis中
 * 喜欢, 回复, 阅读量都是需要展示的值
 *
 * @author xierenyi
 * @version 1.0
 * @date 2020-02-29 16:00
 */
public class Post {
    private Long postId;
    private Integer postTag; // 这个标签, 是二进制表示的! 一个帖子可能具有多个标签
    private String postTitle;
    private Object postBody;
    private Long createUser;
    private Date createTime;
    private Long updateUser;
    private Date updateTime;
    private Integer like;
    private Integer comments;
    private Integer views;
    private Integer isGreat;
    private Integer isHot;
    private Integer isHead;
    private Integer isEffective;

    // 3.26 新加的字段
    private String firstImg;

    public Long getPostId() {
        return postId;
    }

    public void setPostId(Long postId) {
        this.postId = postId;
    }

    public Integer getPostTag() {
        return postTag;
    }

    public void setPostTag(Integer postTag) {
        this.postTag = postTag;
    }

    public String getPostTitle() {
        return postTitle;
    }

    public void setPostTitle(String postTitle) {
        this.postTitle = postTitle;
    }

    public Object getPostBody() {
        return postBody;
    }

    public void setPostBody(Object postBody) {
        this.postBody = postBody;
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

    public Integer getComments() {
        return comments;
    }

    public void setComments(Integer comments) {
        this.comments = comments;
    }

    public Integer getViews() {
        return views;
    }

    public void setViews(Integer views) {
        this.views = views;
    }

    public Integer getIsGreat() {
        return isGreat;
    }

    public void setIsGreat(Integer isGreat) {
        this.isGreat = isGreat;
    }

    public Integer getIsHot() {
        return isHot;
    }

    public void setIsHot(Integer isHot) {
        this.isHot = isHot;
    }

    public Integer getIsHead() {
        return isHead;
    }

    public void setIsHead(Integer isHead) {
        this.isHead = isHead;
    }

    public Integer getIsEffective() {
        return isEffective;
    }

    public void setIsEffective(Integer isEffective) {
        this.isEffective = isEffective;
    }

    public String getFirstImg() {
        return firstImg;
    }

    public void setFirstImg(String firstImg) {
        this.firstImg = firstImg;
    }
}
