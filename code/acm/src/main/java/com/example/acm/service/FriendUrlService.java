package com.example.acm.service;

import com.example.acm.entity.FriendUrl;

import java.util.List;
import java.util.Map;

/**
 * @author Anxdada
 * @version 1.0
 * @date 2020-02-10 00:40
 */
public interface FriendUrlService {

    /**
     * 获得最初所有的友链
     * @return 所有的友链
     */
    public List<FriendUrl> selectAll();

    /**
     * 查询友链
     * 返回list的原因是怕万一id没有, sql语句的一种可能性后果, 基本不会发生
     * @param friendUrlId
     * @return
     */
    public List<FriendUrl> findFriendUrlListByFriendUrlId(Long friendUrlId);

    /**
     * 添加友链
     *
     * @param friendUrl 友链
     */
    public void addFriendUrl(FriendUrl friendUrl);

    /**
     * 修改友链
     *
     * @param friendUrl 新的友链信息
     */
    public void updateFriendUrlByFriendUrlId(FriendUrl friendUrl);

    /**
     * 根据查询条件获取友链个数(Map)
     * 分页的存在导致计算总数需要另一个方法
     */
    public Integer countFriendUrlMapListByQuery(Map<String, Object> map);

    /**
     * 根据查询条件获取友链列表(Map)
     * 分页机制取
     */
    public List<Map<String,Object>> findFriendUrlMapListByQuery(Map<String, Object> map);
}
