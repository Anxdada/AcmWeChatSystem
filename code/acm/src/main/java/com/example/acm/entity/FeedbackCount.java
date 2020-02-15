package com.example.acm.entity;

import java.util.Date;

/**
 * @author xierenyi
 * @version 1.0
 * @date 2020-02-15 18:24
 */
public class FeedbackCount {
    private Long feedbackCountId;
    private Long feedbackId;
    private Long userId;
    private Date operateTime;
    private Integer type;
    private Integer isEffective;

    public Long getFeedbackCountId() {
        return feedbackCountId;
    }

    public void setFeedbackCountId(Long feedbackCountId) {
        this.feedbackCountId = feedbackCountId;
    }

    public Long getFeedbackId() {
        return feedbackId;
    }

    public void setFeedbackId(Long feedbackId) {
        this.feedbackId = feedbackId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Date getOperateTime() {
        return operateTime;
    }

    public void setOperateTime(Date operateTime) {
        this.operateTime = operateTime;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public Integer getIsEffective() {
        return isEffective;
    }

    public void setIsEffective(Integer isEffective) {
        this.isEffective = isEffective;
    }
}
