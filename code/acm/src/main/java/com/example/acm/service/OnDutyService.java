package com.example.acm.service;

import com.example.acm.entity.OnDuty;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

/**
 * @author xierenyi
 * @version 1.0
 * @date 2020-02-14 23:31
 */
public interface OnDutyService {
    /**
     * 添加值班信息
     *
     * @param onDuty 值班信息
     * 哪怕只有一个参数也得用@Param, 不然#{} 无法访问
     */
    public void addOnDuty(@Param("onDuty") OnDuty onDuty);

    /**
     * 修改值班
     *
     * @param onDuty 新的值班信息
     */
    public void updateOnDuty(@Param("onDuty") OnDuty onDuty);

    /**
     * 查询友链
     *
     * @param onDutyId 值班Id
     * @return 值班列表 以实体类返回
     */
    public List<OnDuty> findOnDutyListByOnDutyId(@Param("onDutyId") Long onDutyId);

    /**
     * 根据查询条件获取值班信息的个数
     *
     */
    public Integer countOnDutyListByQuery(@Param("map") Map<String, Object> map);

    /**
     * 根据查询条件获取值班个数(Map)
     *
     */
    public Integer countOnDutyMapListByQuery(@Param("map") Map<String, Object> map);


    /**
     * 根据查询条件获取值班列表(Map)
     * @Param是mybatis中的注解, 相当于别名, 可以再xml中用@param中的别名来引用参数
     * @return 以map信息返回
     */
    public List<Map<String,Object>> findOnDutyMapListByQuery(@Param("map") Map<String, Object> map);
}
