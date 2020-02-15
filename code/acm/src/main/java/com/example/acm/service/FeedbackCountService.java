package com.example.acm.service;

import com.example.acm.entity.FeedbackCount;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * @author xierenyi
 * @version 1.0
 * @date 2020-02-15 18:31
 */
@Service
public interface FeedbackCountService {


    /**
     * 添加一个操作
     * @param feedbackCount 操作信息
     */
    public void addFeedbackCount(FeedbackCount feedbackCount);

    /**
     * 更新一个操作 (删除也再此, 不过是更新一个字段名而已)
     * @param feedbackCount 操作信息
     */
    public void updateFeedbackCount(FeedbackCount feedbackCount);

    /**
     * 根据查询条件获取feedbackCount列表
     *
     * @param map 查询条件
     * @return 满足条件的feedbackCount 以实体类的形式
     */
    public List<FeedbackCount> findFeedbackCountListByQueryMap(Map<String, Object> map);

    /**
     * 根据查询条件获取feedbackCount列表 的数量
     *
     * @param map 查询条件
     * @return 满足查询条的feedbackCount 数量
     */
    public Integer countFeedbackCountByQueryMap(Map<String, Object> map);
}
