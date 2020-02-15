package com.example.acm.mapper;

import com.example.acm.entity.Feedback;
import org.apache.ibatis.annotations.Param;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

/**
 * @author xierenyi
 * @version 1.0
 * @date 2020-02-15 16:09
 */

@Mapper
@Component
public interface FeedbackMapper {

    /**
     * 添加一个反馈
     *
     * @param feedback 反馈信息
     */
    public void addFeedback(@Param("feedback") Feedback feedback);

    /**
     * 更新一个反馈
     *
     * @param feedback 反馈信息
     */
    public void updateFeedback(@Param("feedback") Feedback feedback);


    /**
     * 根据查询条件获取feedback列表
     *
     * @param map 查询条件
     * @return 满足条件的feedback
     */
    public List<Feedback> findFeedbackListByQueryMap(@Param("map") Map<String, Object> map);


    /**
     * 根据查询条件获取feedback列表
     *
     * @param map 查询条件
     * @return 满足条件的feedback 以map的形式
     */
    public List<Map<String, Object>> findFeedbackListMapByQueryMap(@Param("map") Map<String, Object> map);
}
