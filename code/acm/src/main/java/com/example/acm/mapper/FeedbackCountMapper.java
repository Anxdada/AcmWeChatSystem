package com.example.acm.mapper;

import com.example.acm.entity.FeedbackCount;
import org.apache.ibatis.annotations.Param;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

/**
 * @author xierenyi
 * @version 1.0
 * @date 2020-02-15 18:23
 */
@Mapper
@Component
public interface FeedbackCountMapper {


    /**
     * 添加一个操作
     * @param feedbackCount 操作信息
     */
    public void addFeedbackCount(@Param("feedbackCount") FeedbackCount feedbackCount);

    /**
     * 更新一个操作 (删除也再此, 不过是更新一个字段名而已)
     * @param feedbackCount 操作信息
     */
    public void updateFeedbackCount(@Param("feedbackCount") FeedbackCount feedbackCount);

    /**
     * 根据用户id获取feedbackCount列表
     *
     * @param userId 用户Id, 它操作过的记录
     * @return 返回List
     */
    public List<FeedbackCount> findFeedbackCountListByUserId(@Param("userId") Long userId);

    /**
     * 根据查询条件获取feedbackCount列表
     *
     * @param map 查询条件
     * @return 满足条件的feedbackCount 以实体类的形式
     */
    public List<FeedbackCount> findFeedbackCountListByQueryMap(@Param("map") Map<String, Object> map);

    /**
     * 根据查询条件获取feedbackCount列表 的数量
     *
     * @param map 查询条件
     * @return 满足查询条的feedbackCount 数量
     */
    public Integer countFeedbackCountByQueryMap(@Param("map") Map<String, Object> map);

    /**
     * 根据查询条件获取feedbackCount列表
     *
     * @param map 查询条件
     * @return 满足条件的feedbackCount 以map的形式
     */
    public List<Map<String, Object>> findFeedbackCountListMapByQueryMap(@Param("map") Map<String, Object> map);
}
