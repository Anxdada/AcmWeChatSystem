package com.example.acm.mapper;

import com.example.acm.entity.Post;
import org.apache.ibatis.annotations.Param;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

/**
 * @author xierenyi
 * @version 1.0
 * @date 2020-02-29 16:09
 */
@Component
@Mapper
public interface PostMapper {
    /**
     * 添加帖子
     * (后台和手机都可以添加啦)
     *
     * @param post 帖子信息
     * 哪怕只有一个参数也得用@Param, 不然#{} 无法访问
     */
    public void addPost(@Param("post") Post post);

    /**
     * 修改帖子
     * 后台: 只有删除, 普通管理员即可
     * 前台: 用户自己更新, 其它人都没权利更新
     *
     * @param post 新的帖子
     */
    public void updatePost(@Param("post") Post post);

    /**
     * 查询帖子
     *
     * @param postId 帖子Id
     * @return 帖子 以实体类返回
     */
    public List<Post> findPostListByPostId(@Param("postId") Long postId);


    /**
     * 获取满足条件的帖子数量
     * 主要是给分页用的
     *
     */
    public Integer countPostList(@Param("map") Map<String, Object> map);


    /**
     * 根据查询条件获取帖子列表(Map)
     * @return 以map信息返回
     */
    public List<Map<String,Object>> findPostMapListByQuery(@Param("map") Map<String, Object> map);
}
