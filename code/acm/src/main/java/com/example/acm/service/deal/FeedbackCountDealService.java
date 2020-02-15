package com.example.acm.service.deal;

import com.example.acm.common.ResultBean;
import com.example.acm.common.ResultCode;
import com.example.acm.entity.FeedbackCount;
import com.example.acm.entity.User;

/**
 * @author xierenyi
 * @version 1.0
 * @date 2020-02-15 18:37
 */
public interface FeedbackCountDealService {

    /**
     * 添加一个对反馈评论操作
     *
     */
    public ResultBean addFeedbackCount(User user, long feedbackId, int type);

    /**
     * 删除(更新)一个对反馈评论操作
     * @param user 当前操作人(数据库记录才是唯一的)
     * @param feedbackId 反馈操作的主键Id
     */
    public ResultBean deleteFeedbackCount(User user, long feedbackId);

    /**
     * 更新一个操作 (删除也再此, 不过是更新一个字段名而已)
     *
     * @param user 当前操作人(数据库记录才是唯一的)
     * @param feedbackId 反馈Id
     * @param type like 1 or dislike -1
     */
    public ResultBean updateFeedbackCount(User user, long feedbackId, int type);


}
