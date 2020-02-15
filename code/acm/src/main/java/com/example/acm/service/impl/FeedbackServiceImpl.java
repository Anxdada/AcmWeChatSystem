package com.example.acm.service.impl;

import com.example.acm.entity.Feedback;
import com.example.acm.mapper.FeedbackMapper;
import com.example.acm.service.FeedbackService;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * @author xierenyi
 * @version 1.0
 * @date 2020-02-15 16:21
 */
@Service
public class FeedbackServiceImpl implements FeedbackService {

    @Autowired
    private FeedbackMapper feedbackMapper;

    /**
     * 添加一个反馈
     *
     * @param feedback 反馈信息
     */
    public void addFeedback(Feedback feedback) {
        feedbackMapper.addFeedback(feedback);
    }

    /**
     * 更新一个反馈
     *
     * @param feedback 反馈信息
     */
    public void updateFeedback(Feedback feedback) {
        feedbackMapper.updateFeedback(feedback);
    }

    /**
     * 根据查询条件获取feedback列表
     *
     * @param map 查询条件
     * @return 满足条件的feedback
     */
    public List<Feedback> findFeedbackListByQueryMap(Map<String, Object> map) {
        return feedbackMapper.findFeedbackListByQueryMap(map);
    }


    /**
     * 根据查询条件获取feedback列表
     *
     * @param map 查询条件
     * @return 满足条件的feedback 以map的形式
     */
    public List<Map<String, Object>> findFeedbackListMapByQueryMap(Map<String, Object> map) {
        return feedbackMapper.findFeedbackListMapByQueryMap(map);
    }
}
