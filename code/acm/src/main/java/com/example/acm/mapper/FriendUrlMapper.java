package com.example.acm.mapper;

import com.example.acm.entity.FriendUrl;
import org.apache.ibatis.annotations.Param;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

/**
 * @author xierenyi
 * @version 1.0
 * @date 2020-02-10 00:47
 */
@Mapper
@Component
public interface FriendUrlMapper {
    /**
     * 这个方位是为了测试数据库功能是否连接正常
     * @return 所有友链信息
     */
    public List<FriendUrl> selectAll();

    /**
     * 添加友链
     *
     * @param friendUrl 友链
     * 哪怕只有一个参数也得用@Param, 不然#{} 无法访问
     */
    public void addFriendUrl(@Param("friendUrl") FriendUrl friendUrl);

    /**
     * 修改友链
     *
     * @param friendUrl 新的友链信息
     */
    public void updateFriendUrl(@Param("friendUrl") FriendUrl friendUrl);

    /**
     * 查询友链
     *
     * @param friendUrlId
     * @return
     */
    public List<FriendUrl> findFriendUrlListByFriendUrlId(@Param("friendUrlId") Long friendUrlId);

    /**
     * 根据查询条件获取友链个数
     *
     */
    public Integer countFriendUrlListByQuery(@Param("map") Map<String, Object> map);

    /**
     * 根据查询条件获取友链个数(Map)
     *
     */
    public Integer countFriendUrlMapListByQuery(@Param("map") Map<String, Object> map);


    /**
     * 根据查询条件获取友链列表(Map)
     * @Param是mybatis中的注解, 相当于别名, 可以再xml中用@param中的别名来引用参数
     */
    public List<Map<String,Object>> findFriendUrlMapListByQuery(@Param("map") Map<String, Object> map);
}
