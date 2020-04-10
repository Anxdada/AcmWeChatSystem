package com.example.acm.service.impl;

import com.example.acm.entity.ForumTotalReply;
import com.example.acm.mapper.ForumTotalReplyMapper;
import com.example.acm.service.ForumTotalReplyService;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * @author xierenyi
 * @version 1.0
 * @date 2020-04-11 00:12
 */
@Service
public class ForumTotalReplyServiceImpl implements ForumTotalReplyService {

    @Autowired
    private ForumTotalReplyMapper forumTotalReplyMapper;

    /**
     * 添加讨论区全部的回复
     *
     * @param forumTotalReply 讨论区全部的回复信息
     * 哪怕只有一个参数也得用@Param, 不然#{} 无法访问
     */
    public void addForumTotalReply(ForumTotalReply forumTotalReply) {
        forumTotalReplyMapper.addForumTotalReply(forumTotalReply);
    }

    /**
     * 修改讨论区全部的回复
     *
     * @param forumTotalReply 新的讨论区全部的回复信息
     */
    public void updateForumTotalReply(ForumTotalReply forumTotalReply) {
        forumTotalReplyMapper.updateForumTotalReply(forumTotalReply);
    }

    /**
     * 查询友链
     *
     * @param forumTotalReplyId 讨论区全部的回复Id
     * @return 讨论区全部的回复列表 以实体类返回
     */
    public List<ForumTotalReply> findForumTotalReplyListByForumTotalReplyId(Long forumTotalReplyId) {
        return forumTotalReplyMapper.findForumTotalReplyListByForumTotalReplyId(forumTotalReplyId);
    }

    /**
     * 根据查询条件获取讨论区全部的回复个数(Map)
     * 分页使用
     *
     */
    public Integer countForumTotalReplyList(Map<String, Object> map) {
        return forumTotalReplyMapper.countForumTotalReplyList(map);
    }


    /**
     * 根据查询条件获取讨论区全部的回复列表(Map)
     * 并且和类别表做连接直接查处结果, 不用二次查询后再返回结果
     * 和上面的函数不同就是字段变少了
     *
     * @return 以map信息返回
     */
    public List<Map<String,Object>> findForumTotalReplyMapListByQuery(Map<String, Object> map) {
        return forumTotalReplyMapper.findForumTotalReplyMapListByQuery(map);
    }

}
