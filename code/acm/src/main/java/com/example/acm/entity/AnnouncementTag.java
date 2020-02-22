package com.example.acm.entity;

import java.util.Date;

/**
 * @author xierenyi
 * @version 1.0
 * @date 2020-02-18 11:42
 */
public class AnnouncementTag {

    private Long announcementTagId;
    private String announcementTagName;
    private String announcementTagColor;
    private Long createUser;
    private Date createTime;
    private Long updateUser;
    private Date updateTime;
    private Integer needStartTime;
    private Integer isEffective;

    public Long getAnnouncementTagId() {
        return announcementTagId;
    }

    public void setAnnouncementTagId(Long announcementTagId) {
        this.announcementTagId = announcementTagId;
    }

    public String getAnnouncementTagName() {
        return announcementTagName;
    }

    public void setAnnouncementTagName(String announcementTagName) {
        this.announcementTagName = announcementTagName;
    }

    public String getAnnouncementTagColor() {
        return announcementTagColor;
    }

    public void setAnnouncementTagColor(String announcementTagColor) {
        this.announcementTagColor = announcementTagColor;
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

    public Integer getNeedStartTime() {
        return needStartTime;
    }

    public void setNeedStartTime(Integer needStartTime) {
        this.needStartTime = needStartTime;
    }

    public Integer getIsEffective() {
        return isEffective;
    }

    public void setIsEffective(Integer isEffective) {
        this.isEffective = isEffective;
    }
}
