package com.example.acm.service.impl;

import com.example.acm.entity.Comment;
import com.example.acm.mapper.CommentMapper;
import com.example.acm.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * @author xierenyi
 * @version 1.0
 * @date 2020-03-06 12:46
 */
@Service
public class CommentServiceImpl implements CommentService {

    @Autowired
    private CommentMapper commentMapper;

    /**
     * 添加评论
     * (后台和手机都可以添加啦)
     *
     * @param comment 评论信息
     * 哪怕只有一个参数也得用@Param, 不然#{} 无法访问
     */
    public void addComment(Comment comment) {
        commentMapper.addComment(comment);
    }

    /**
     * 修改评论
     * 后台: 只有删除, 普通管理员即可
     * 前台: 用户自己更新, 其它人都没权利更新
     *
     * @param comment 新的评论
     */
    public void updateComment(Comment comment) {
        commentMapper.updateComment(comment);
    }

    /**
     * 查询评论
     *
     * @param CommentId 评论Id
     * @return 评论 以实体类返回
     */
    public List<Comment> findCommentListByCommentId(Long CommentId) {
        return commentMapper.findCommentListByCommentId(CommentId);
    }


    /**
     * 获取满足条件的评论数量
     * 主要是给分页用的
     *
     */
    public Integer countCommentList(Map<String, Object> map) {
        return commentMapper.countCommentList(map);
    }

    /**
     * 根据查询条件获取值班列表(Map)
     * @return 以map信息返回
     */
    public List<Map<String,Object>> findCommentMapListByQuery(Map<String, Object> map) {
        return commentMapper.findCommentMapListByQuery(map);
    }

}
