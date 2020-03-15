package com.example.acm.entity;

import java.util.Date;

/**
 * @Author xierenyi
 * @Description:
 * @Date: Created in 15:14 2019-12-22
 */
public class OnDuty {
    private Long onDutyId;
    private Long onDutyUserId;
    private String onDutyUserName;
    private String onDutyTelephone;
    private Date onDutyStartTime;
    private Date onDutyEndTime;
    private Long createUser;
    private Date createTime;
    private Long updateUser;
    private Date updateTime;
    private Integer isEffective;


    public Long getOnDutyId() {
        return onDutyId;
    }

    public void setOnDutyId(Long onDutyId) {
        this.onDutyId = onDutyId;
    }

    public Long getOnDutyUserId() {
        return onDutyUserId;
    }

    public void setOnDutyUserId(Long onDutyUserId) {
        this.onDutyUserId = onDutyUserId;
    }

    public String getOnDutyUserName() {
        return onDutyUserName;
    }

    public void setOnDutyUserName(String onDutyUserName) {
        this.onDutyUserName = onDutyUserName;
    }

    public String getOnDutyTelephone() {
        return onDutyTelephone;
    }

    public void setOnDutyTelephone(String onDutyTelephone) {
        this.onDutyTelephone = onDutyTelephone;
    }

    public Long getCreateUser() {
        return createUser;
    }

    public void setCreateUser(Long createUser) {
        this.createUser = createUser;
    }

    public Date getOnDutyStartTime() {
        return onDutyStartTime;
    }

    public void setOnDutyStartTime(Date onDutyStartTime) {
        this.onDutyStartTime = onDutyStartTime;
    }

    public Date getOnDutyEndTime() {
        return onDutyEndTime;
    }

    public void setOnDutyEndTime(Date onDutyEndTime) {
        this.onDutyEndTime = onDutyEndTime;
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
