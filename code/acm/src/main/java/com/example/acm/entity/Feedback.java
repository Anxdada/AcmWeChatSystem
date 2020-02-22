package com.example.acm.entity;

import java.util.Date;

/**
 * @author xierenyi
 * @version 1.0
 * @date 2020-02-15 16:10
 */
public class Feedback {
    private Long feedbackId;
    private Long feedbackUser;
    private Object feedbackBody;
    private Date feedbackTime;
    private Integer isEffective;

    public Long getFeedbackId() {
        return feedbackId;
    }

    public void setFeedbackId(Long feedbackId) {
        this.feedbackId = feedbackId;
    }


    public Long getFeedbackUser() {
        return feedbackUser;
    }

    public void setFeedbackUser(Long feedbackUser) {
        this.feedbackUser = feedbackUser;
    }

    public Object getFeedbackBody() {
        return feedbackBody;
    }

    public void setFeedbackBody(Object feedbackBody) {
        this.feedbackBody = feedbackBody;
    }

    public Date getFeedbackTime() {
        return feedbackTime;
    }

    public void setFeedbackTime(Date feedbackTime) {
        this.feedbackTime = feedbackTime;
    }

    public Integer getIsEffective() {
        return isEffective;
    }

    public void setIsEffective(Integer isEffective) {
        this.isEffective = isEffective;
    }
}
