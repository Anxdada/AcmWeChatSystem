package com.example.acm.entity;

import java.util.Date;

/**
 * @Author xierenyi
 * @Description:
 * @Date: Created in 15:13 2019-12-22
 */
public class Attendance {
    private Long attendenceId;//
    private Long createUser;//
    private Date createDate;//
    private Integer sumDay;//
    private Integer isEffective;//

    public void setAttendenceId(Long attendenceId) {
        this.attendenceId = attendenceId;
    }
    public Long getAttendenceId() {
        return this.attendenceId;
    }
    public void setCreateUser(Long createUser) {
        this.createUser = createUser;
    }
    public Long getCreateUser() {
        return this.createUser;
    }
    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }
    public Date getCreateDate() {
        return this.createDate;
    }
    public void setSumDay(Integer sumDay) {
        this.sumDay = sumDay;
    }
    public Integer getSumDay() {
        return this.sumDay;
    }

    public void setIsEffective(Integer isEffective) {
        this.isEffective = isEffective;
    }

    public Integer getIsEffective() {
        return isEffective;
    }
}
