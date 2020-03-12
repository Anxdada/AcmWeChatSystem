package com.example.acm.mapper;

import com.example.acm.entity.Comment;
import org.apache.ibatis.annotations.Param;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

/**
 * @author xierenyi
 * @version 1.0
 * @date 2020-03-06 12:32
 */
@Component
@Mapper
public interface CommentMapper {
    /**
     * 添加评论
     * (后台和手机都可以添加啦)
     *
     * @param comment 评论信息
     * 哪怕只有一个参数也得用@Param, 不然#{} 无法访问
     */
    public void addComment(@Param("comment") Comment comment);

    /**
     * 修改评论
     * 后台: 只有删除, 普通管理员即可
     * 前台: 用户自己更新, 其它人都没权利更新
     *
     * @param comment 新的评论
     */
    public void updateComment(@Param("comment") Comment comment);

    /**
     * 查询评论
     *
     * @param commentId 评论Id
     * @return 评论 以实体类返回
     */
    public List<Comment> findCommentListByCommentId(@Param("commentId") Long commentId);


    /**
     * 获取满足条件的评论数量
     * 主要是给分页用的
     *
     */
    public Integer countCommentList(@Param("map") Map<String, Object> map);


    /**
     * 根据查询条件获取评论列表(Map)
     * @return 以map信息返回
     */
    public List<Map<String,Object>> findCommentMapListByQuery(@Param("map") Map<String, Object> map);
}
