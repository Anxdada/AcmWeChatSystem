package com.example.acm.service;

import com.example.acm.entity.User;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

/**
 * @author Anxdada
 * @version 1.0
 * @date 2020-02-13 01:40
 */
public interface UserService{
    
    /** 
     * 添加user
     *
     */
    public void addUser(User user);

    /**
     * 更新user
     *
     */
    public void updateUserPC(User user);

    /**
     * 查询user
     *
     * @param userId 用户id
     * @return 给定userId 查询到的用户, List比较安全
     */
    public List<User> findUserListByUserId(Long userId);

    /**
     * 根据查询条件获取user个数
     *
     */
    public Integer countUserListByQuery(Map<String, Object> map);

    /**
     * 根据查询条件获取user列表map
     *
     * @param map 查询条件
     * @return 满足查询条件的所有User
     */
    public List<User> findUserListByQueryMap(Map<String, Object> map);
    
    /**
     * 根据查询条件获取user个数(Map)
     * 对应的是分页的总数
     *
     * @param map 限制条件
     * @return 个数
     */
    public Integer countUserMapListByQueryMap(Map<String, Object> map);
    
    /**
     * 根据查询条件获取user列表(Map)
     *
     * @param map 限制条件
     * @return 每一个map, 是列名 -> 值的映射, 方便react中表格数据的使用
     * 按照分页规则取
     */
    public List<Map<String,Object>> findUserMapListByQueryMap(Map<String, Object> map);

    /**
     * 找到符合身份的人
     *
     * @param auth 身份
     * @return 人员
     */
    public List<Map<String,Object>> findSatisfyAuthUser(int auth);
}
