package com.example.acm.service.deal.impl;

import com.example.acm.common.ResultBean;
import com.example.acm.common.ResultCode;
import com.example.acm.common.SysConst;
import com.example.acm.entity.FeedbackCount;
import com.example.acm.entity.User;
import com.example.acm.service.FeedbackCountService;
import com.example.acm.service.deal.FeedbackCountDealService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author xierenyi
 * @version 1.0
 * @date 2020-02-15 18:37
 */
@Service
public class FeedbackCountDealServiceImpl implements FeedbackCountDealService {

    @Autowired
    private FeedbackCountService feedbackCountService;

    /**
     * 添加一个对反馈评论操作
     *
     */
    public ResultBean addFeedbackCount(User user, long feedbackId, int type) {

        FeedbackCount feedbackCount = new FeedbackCount();
        feedbackCount.setFeedbackId(feedbackId);
        feedbackCount.setUserId(user.getUserId());
        feedbackCount.setOperateTime(new Date());
        feedbackCount.setType(type);
        feedbackCount.setIsEffective(SysConst.LIVE);

        feedbackCountService.addFeedbackCount(feedbackCount);


        return new ResultBean(ResultCode.SUCCESS);
    }

    /**
     * 删除一个对反馈评论操作
     * feedbackCountId 反馈操作Id
     */
    public ResultBean deleteFeedbackCount(User user, long feedbackId) {
        Map<String, Object> map = new HashMap<>();

        map.put("feedbackId", feedbackId);
        map.put("userId", user.getUserId());
        map.put("isEffective", SysConst.LIVE);

        List<FeedbackCount> list = feedbackCountService.findFeedbackCountListByQueryMap(map);

        if (list.isEmpty()) return new ResultBean(ResultCode.SQL_NULL_RECODE);

        list.get(0).setIsEffective(SysConst.NOT_LIVE);
        feedbackCountService.updateFeedbackCount(list.get(0));

        return new ResultBean(ResultCode.SUCCESS);
    }

    /**
     * 修改一个对反馈评论操作
     *
     */
    public ResultBean updateFeedbackCount(User user, long feedbackId, int type) {

        Map<String, Object> map = new HashMap<>();

        map.put("feedbackId", feedbackId);
        map.put("userId", user.getUserId());
        map.put("isEffective", SysConst.LIVE);
//        System.out.println("userId " + user.getUserId());

        List<FeedbackCount> list = feedbackCountService.findFeedbackCountListByQueryMap(map);

//        System.out.println(list.size());

        if (list.isEmpty()) return new ResultBean(ResultCode.SQL_NULL_RECODE);

        list.get(0).setType(type);
//        System.out.println(list.get(0).getFeedbackCountId());
        feedbackCountService.updateFeedbackCount(list.get(0));

        return new ResultBean(ResultCode.SUCCESS);
    }
}
