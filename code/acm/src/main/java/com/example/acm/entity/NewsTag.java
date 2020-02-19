package com.example.acm.entity;

import java.util.Date;

/**
 * @author xierenyi
 * @version 1.0
 * @date 2020-02-18 11:42
 */
public class NewsTag {

    private Long newsTagId;
    private String newsTagName;
    private String newsTagColor;
    private Long createUser;
    private Date createTime;
    private Long updateUser;
    private Date updateTime;
    private Integer isEffective;

    public Long getNewsTagId() {
        return newsTagId;
    }

    public void setNewsTagId(Long newsTagId) {
        this.newsTagId = newsTagId;
    }

    public String getNewsTagName() {
        return newsTagName;
    }

    public void setNewsTagName(String newsTagName) {
        this.newsTagName = newsTagName;
    }

    public String getNewsTagColor() {
        return newsTagColor;
    }

    public void setNewsTagColor(String newsTagColor) {
        this.newsTagColor = newsTagColor;
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
