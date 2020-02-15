package com.example.acm.service.impl;

import com.example.acm.entity.FeedbackCount;
import com.example.acm.mapper.FeedbackCountMapper;
import com.example.acm.service.FeedbackCountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * @author xierenyi
 * @version 1.0
 * @date 2020-02-15 18:31
 */
@Service
public class FeedbackCountServiceImpl implements FeedbackCountService {

    @Autowired
    private FeedbackCountMapper feedbackCountMapper;

    /**
     * 添加一个操作
     * @param feedbackCount 操作信息
     */
    public void addFeedbackCount(FeedbackCount feedbackCount) {
        feedbackCountMapper.addFeedbackCount(feedbackCount);
    }

    /**
     * 更新一个操作 (删除也再此, 不过是更新一个字段名而已)
     * @param feedbackCount 操作信息
     */
    public void updateFeedbackCount(FeedbackCount feedbackCount) {
        feedbackCountMapper.updateFeedbackCount(feedbackCount);
    }

    /**
     * 根据查询条件获取feedbackCount列表
     *
     * @param map 查询条件
     * @return 满足条件的feedbackCount 以实体类的形式
     */
    public List<FeedbackCount> findFeedbackCountListByQueryMap(Map<String, Object> map) {
        return feedbackCountMapper.findFeedbackCountListByQueryMap(map);
    }

    /**
     * 根据查询条件获取feedbackCount列表 的数量
     *
     * @param map 查询条件
     * @return 满足查询条的feedbackCount 数量
     */
    public Integer countFeedbackCountByQueryMap(Map<String, Object> map) {
        return feedbackCountMapper.countFeedbackCountByQueryMap(map);
    }
}
