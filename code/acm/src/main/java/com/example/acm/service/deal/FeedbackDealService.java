package com.example.acm.service.deal;

import com.example.acm.common.ResultBean;
import com.example.acm.entity.User;

/**
 * @author xierenyi
 * @version 1.0
 * @date 2020-02-15 17:33
 */
public interface FeedbackDealService {

    // 首先能给到反馈的一定是管理员, 能进后台的

    /**
     * 添加一个反馈
     *
     * @param user 操作人
     * @param feedbackBody 反馈内容
     * @return
     */
    public ResultBean addFeedback(User user, String feedbackBody);

    /**
     *  删除一个反馈
     *  规则是 自己只能删自己的, 超级管理员能删全部人的
     *
     * @param feedbackId 反馈Id
     * @return
     */
    public ResultBean deleteFeedback(long feedbackId);

    /**
     *  修改一个反馈
     *  规则是 只能自己只能修改自己的, 超级管理员没有权限修改任何人的
     *
     * @param feedbackId
     * @param feedbackBody
     * @return
     */
    public ResultBean updateFeedback(long feedbackId, String feedbackBody);

    /**
     * 提取所有反馈, 因为涉及当前用户的判断, 所以需要Deal
     *
     * @param user 当前的操作用户
     */
    public ResultBean selectFeedback(User user);
}
