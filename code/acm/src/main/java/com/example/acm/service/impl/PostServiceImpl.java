package com.example.acm.service.impl;

import com.example.acm.entity.Post;
import com.example.acm.mapper.PostMapper;
import com.example.acm.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;
import java.util.Map;

/**
 * @author xierenyi
 * @version 1.0
 * @date 2020-02-29 17:04
 */
@Service
public class PostServiceImpl implements PostService {

    @Autowired
    private PostMapper postMapper;

    /**
     * 添加帖子
     * (后台和手机都可以添加啦)
     *
     * @param post 帖子信息
     * 哪怕只有一个参数也得用@Param, 不然#{} 无法访问
     */
    public void addPost(Post post) {
        postMapper.addPost(post);
    }

    /**
     * 修改帖子
     * 后台: 只有删除, 普通管理员即可
     * 前台: 用户自己更新, 其它人都没权利更新
     *
     * @param post 新的帖子
     */
    public void updatePost(Post post) {
        postMapper.updatePost(post);
    }

    /**
     * 查询帖子
     *
     * @param postId 帖子Id
     * @return 帖子 以实体类返回
     */
    public List<Post> findPostListByPostId(Long postId) {
        return postMapper.findPostListByPostId(postId);
    }


    /**
     * 获取满足条件的帖子数量
     * 主要是给分页用的
     *
     */
    public Integer countPostList(Map<String, Object> map) {
        return postMapper.countPostList(map);
    }

    /**
     * 根据查询条件获取值班列表(Map)
     * @return 以map信息返回
     */
    public List<Map<String,Object>> findPostMapListByQuery(Map<String, Object> map) {
        return postMapper.findPostMapListByQuery(map);
    }

    /**
     * 手机端需求-获取最新发布的帖子id, 方便跳转到详情页面
     * @return 最新postId
     */
    public Integer getLastPublishPostId() {
        return postMapper.getLastPublishPostId();
    }
}
