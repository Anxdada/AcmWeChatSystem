
package com.example.acm.mapper;

import com.example.acm.entity.User;
import org.apache.ibatis.annotations.Param;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

/** 
 * user数据操作接口
 *
 * @author Anxdada
 * @version 1.0
 * @date 2020-02-13 02:40
 */
@Mapper
@Component
public interface UserMapper {
    
    /** 
     * 添加user
     *
     */
    public void addUser(@Param("user") User user);
    
    /** 
     * 添加user列表
     *
     */
    public void addUserList(List<User> list);
    
    /** 
     * 删除user
     *
     */
    public void deleteUserByUserId(@Param("userId") Integer userId);
    
    /**
     * 修改user
     *
     */
    public void updateUserByUserId(@Param("userId") Integer userId, @Param("user") User user);
    
    /** 
     * 根据获取user
     *
     */
    public User getUserByUserId(@Param("userId") Integer userId);
    
    /**
     * 查询user通过Id
     *
     * @param userId 用户id
     * @return 给定userId 查询到的用户, List比较安全
     */
    public List<User> findUserListByUserId(@Param("userId") Long userId);
    
    /**
     * 查询user
     *
     */
    public List<Map<String,Object>> findUser2MapListByUserId(@Param("userId") Integer userId);

    /**
     * 获取user列表
     *
     */
    public List<User> findUserList();
    
    /**
     * 获取user列表
     *
     */
    public List<Map<String,Object>> findUser2MapList();
    
    /**
     * 根据查询条件获取user个数
     *
     */
    public Integer countUserListByQuery(@Param("map") Map<String, Object> map);
    
    /**
     * 根据查询条件获取user列表
     *
     */
    public List<User> findUserListByQueryMap(@Param("map") Map<String, Object> map);

    /**
     * 根据查询条件获取user列表map
     *
     * @param map 查询条件
     * @return 满足查询条件的所有User
     */
    public Integer countUserMapListByQueryMap(@Param("map") Map<String, Object> map);
    
    /**
     * 根据查询条件获取user列表(Map)
     *
     */
    public List<Map<String,Object>> findUserMapListByQueryMap(@Param("map") Map<String, Object> map);

    public List<User> findUserListByQueryMy(@Param("map") Map<String, Object> map);

    public List<Map<String,Object>> findUserByCompetitionId(@Param("map") Map<String, Object> map);

    public Integer countUserByCompetitionId(@Param("map") Map<String, Object> map);

    public List<Map<String,Object>> findUserByLectureId(@Param("map") Map<String, Object> map);

    public Integer countUserByLectureId(@Param("map") Map<String, Object> map);

    public  List<Map<String,Object>> findUserBuImpressionSort(@Param("map") Map<String, Object> map);
}
