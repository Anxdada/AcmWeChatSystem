package com.example.acm.mapper;

import com.example.acm.entity.Reply;
import org.apache.ibatis.annotations.Param;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

/**
 * @author xierenyi
 * @version 1.0
 * @date 2020-03-07 22:28
 */
@Component
@Mapper
public interface ReplyMapper {
    /**
     * 添加回复
     * (后台和手机都可以添加啦)
     *
     * @param reply 回复信息
     * 哪怕只有一个参数也得用@Param, 不然#{} 无法访问
     */
    public void addReply(@Param("reply") Reply reply);

    /**
     * 修改回复 (不打算有修改功能, 只能删除后重发..)
     * 后台: 只有删除, 普通管理员即可
     * 前台: 用户自己更新, 其它人都没权利更新
     *
     * @param reply 新的回复
     */
    public void updateReply(@Param("reply") Reply reply);

    /**
     * 查询回复
     *
     * @param replyId 回复Id
     * @return 回复 以实体类返回
     */
    public List<Reply> findReplyListByReplyId(@Param("replyId") Long replyId);


    /**
     * 获取满足条件的回复数量
     * 主要是给分页用的
     *
     */
    public Integer countReplyList(@Param("map") Map<String, Object> map);


    /**
     * 根据查询条件获取回复列表(Map)
     * @return 以map信息返回
     */
    public List<Map<String,Object>> findReplyMapListByQuery(@Param("map") Map<String, Object> map);
}
