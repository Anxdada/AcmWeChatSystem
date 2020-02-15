package com.example.acm.entity;

import java.util.Date;

/**
 * @Author xierenyi
 * @Description:
 * @Date: Created in 15:14 2019-12-22
 */
public class DayDuty {
    private Integer dayDutyId;
    private String dayName;
    private String dutyUserNames;
    private Integer createUser;
    private Date createDate;
    private Integer updateUser;
    private Date updateData;
    private Integer isEffective;

    public void setDayDutyId(Integer dayDutyId) {
        this.dayDutyId = dayDutyId;
    }
    public Integer getDayDutyId() {
        return this.dayDutyId;
    }
    public void setDayName(String dayName) {
        this.dayName = dayName;
    }
    public String getDayName() {
        return this.dayName;
    }
    public void setDutyUserNames(String dutyUserNames) {
        this.dutyUserNames = dutyUserNames;
    }
    public String getDutyUserNames() {
        return this.dutyUserNames;
    }
    public void setCreateUser(Integer createUser) {
        this.createUser = createUser;
    }
    public Integer getCreateUser() {
        return this.createUser;
    }
    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }
    public Date getCreateDate() {
        return this.createDate;
    }
    public void setUpdateUser(Integer updateUser) {
        this.updateUser = updateUser;
    }
    public Integer getUpdateUser() {
        return this.updateUser;
    }
    public void setUpdateData(Date updateData) {
        this.updateData = updateData;
    }
    public Date getUpdateData() {
        return this.updateData;
    }
    public void setIsEffective(Integer isEffective) {
        this.isEffective = isEffective;
    }
    public Integer getIsEffective() {
        return this.isEffective;
    }
}
