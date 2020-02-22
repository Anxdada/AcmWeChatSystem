package com.example.acm.entity;

import java.util.Date;
import java.io.Serializable;

/**
 * (Announcement)实体类
 *
 * @author makejava
 * @since 2020-02-18 00:00:43
 */
public class Announcement implements Serializable {
    private static final long serialVersionUID = 915487560113461505L;
    
    private Long announcementId;
    
    private String announcementTitle;

    private Object announcementBody;
    
    private Long announcementTagId;
    
    private Long createUser;
    
    private Date createTime;
    
    private Long updateUser;
    
    private Date updateTime;
    
    private Integer isRegister;

    private Date registerStartTime;
    private Date registerEndTime;
    private Date startTime;
    private String lastTime ;
    
    private Integer isPublish;
    
    private Integer isEffective;

    public Long getAnnouncementId() {
        return announcementId;
    }

    public void setAnnouncementId(Long announcementId) {
        this.announcementId = announcementId;
    }

    public String getAnnouncementTitle() {
        return announcementTitle;
    }

    public void setAnnouncementTitle(String announcementTitle) {
        this.announcementTitle = announcementTitle;
    }

    public Object getAnnouncementBody() {
        return announcementBody;
    }

    public void setAnnouncementBody(Object announcementBody) {
        this.announcementBody = announcementBody;
    }

    public Long getAnnouncementTagId() {
        return announcementTagId;
    }

    public void setAnnouncementTagId(Long announcementTagId) {
        this.announcementTagId = announcementTagId;
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

    public Integer getIsRegister() {
        return isRegister;
    }

    public void setIsRegister(Integer isRegister) {
        this.isRegister = isRegister;
    }

    public Date getRegisterStartTime() {
        return registerStartTime;
    }

    public void setRegisterStartTime(Date registerStartTime) {
        this.registerStartTime = registerStartTime;
    }

    public Date getRegisterEndTime() {
        return registerEndTime;
    }

    public void setRegisterEndTime(Date registerEndTime) {
        this.registerEndTime = registerEndTime;
    }

    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    public String getLastTime() {
        return lastTime;
    }

    public void setLastTime(String lastTime) {
        this.lastTime = lastTime;
    }

    public Integer getIsPublish() {
        return isPublish;
    }

    public void setIsPublish(Integer isPublish) {
        this.isPublish = isPublish;
    }

    public Integer getIsEffective() {
        return isEffective;
    }

    public void setIsEffective(Integer isEffective) {
        this.isEffective = isEffective;
    }
}