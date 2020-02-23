
package com.example.acm.service.impl;

import com.example.acm.entity.User;
import com.example.acm.mapper.UserMapper;
import com.example.acm.service.UserService;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

/**
 *
 *
 * @author Anxdada
 * @version 1.0
 * @date 2020-02-13 01:40
 */
@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	private UserMapper userMapper;
    
    /** 
     * 添加user
     *
     */
    public void addUser(User user){
        userMapper.addUser(user);
    }

    /**
     * 更新user
     *
     */
    public void updateUserPC(User user) {
        userMapper.updateUserPC(user);
    }
    
    /** 
     * 添加user列表
     *
     */
    public void addUserList(List<User> list){
        userMapper.addUserList(list);
    }
    
    /** 
     * 删除user
     *
     */
    public void deleteUserByUserId(Integer userId){
        userMapper.deleteUserByUserId(userId);
    }
    
    /**
     * 修改user
     *
     */
    public void updateUserByUserId(Integer userId, User user){
        userMapper.updateUserByUserId(userId,user);
    }
    
    /** 
     * 根据获取user
     *
     */
    public User getUserByUserId(Integer userId){
        return userMapper.getUserByUserId(userId);        
    }
    
    /**
     * 查询user
     *
     * @param userId 用户id
     * @return 给定userId 查询到的用户, List比较安全
     */
    public List<User> findUserListByUserId(Long userId){
        return userMapper.findUserListByUserId(userId);
    }
    
    /**
     * 查询user
     *
     */
    public List<Map<String,Object>> findUser2MapListByUserId(Integer userId){
        return userMapper.findUser2MapListByUserId(userId);
    }

    /**
     * 获取user列表
     *
     */
    public List<User> findUserList(){
        return userMapper.findUserList();
    }
    
    /**
     * 获取user列表
     *
     */
    public List<Map<String,Object>> findUser2MapList(){
        return userMapper.findUser2MapList();
    }
    
    /**
     * 根据查询条件获取user个数
     *
     */
    public Integer countUserListByQuery(Map<String, Object> map){
    	return userMapper.countUserListByQuery(map);
    }
    
    /**
     * 根据查询条件获取user列表map
     *
     * @param map 查询条件
     * @return 满足查询条件的所有User
     */
    public List<User> findUserListByQueryMap(Map<String, Object> map){
    	return userMapper.findUserListByQueryMap(map);
    }
    
    /**
     * 根据查询条件获取user个数(Map)
     * 对应的是分页的总数
     *
     * @param map 限制条件
     * @return 个数
     */
    public Integer countUserMapListByQueryMap(Map<String, Object> map){
    	return userMapper.countUserMapListByQueryMap(map);
    }
    
    /**
     * 根据查询条件获取user列表(Map)
     *
     * @param map 限制条件
     * @return 每一个map, 是列名 -> 值的映射, 方便react中表格数据的使用
     * 按照分页规则取
     */
    public List<Map<String,Object>> findUserMapListByQueryMap(Map<String, Object> map){
    	return userMapper.findUserMapListByQueryMap(map);
    }

    public List<User> findUserListByQueryMy(Map<String, Object> map){
        return userMapper.findUserListByQueryMy(map);
    }
    public List<Map<String,Object>> findUserByCompetitionId(Map<String, Object> map){
        return userMapper.findUserByCompetitionId(map);
    }

    public Integer countUserByCompetitionId(Map<String, Object> map){
        return userMapper.countUserByCompetitionId(map);
    }

    public List<Map<String,Object>> findUserByLectureId(Map<String, Object> map){
        return userMapper.findUserByLectureId(map);
    }

    public Integer countUserByLectureId(Map<String, Object> map){
        return userMapper.countUserByLectureId(map);
    }

    /**
     * 找到符合身份的人
     *
     * @param auth 身份
     * @return 人员
     */
    public List<Map<String,Object>> findSatisfyAuthUser(int auth) {
        return userMapper.findSatisfyAuthUser(auth);
    }
}
