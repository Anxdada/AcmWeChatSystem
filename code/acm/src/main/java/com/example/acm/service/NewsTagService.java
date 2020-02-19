package com.example.acm.service;

import com.example.acm.entity.NewsTag;

import java.util.List;
import java.util.Map;

/**
 * @author xierenyi
 * @version 1.0
 * @date 2020-02-18 11:54
 */
public interface NewsTagService {

    /**
     * 添加新闻类别
     *
     * @param newsTag 新闻类别信息
     * 哪怕只有一个参数也得用@Param, 不然#{} 无法访问
     */
    public void addNewsTag(NewsTag newsTag);

    /**
     * 修改新闻类别
     *
     * @param newsTag 新的新闻类别信息
     */
    public void updateNewsTag(NewsTag newsTag);

    /**
     * 查询友链
     *
     * @param newsTagId 新闻类别Id
     * @return 新闻类别列表 以实体类返回
     */
    public List<NewsTag> findNewsTagListByNewsTagId(Long newsTagId);

    /**
     * 根据查询条件获取新闻类别信息的个数
     *
     */
    public Integer countNewsTagListByQuery(Map<String, Object> map);

    /**
     * 根据查询条件获取新闻类别个数(Map)
     *
     */
    public Integer countNewsTagMapListByQuery(Map<String, Object> map);


    /**
     * 根据查询条件获取新闻类别列表(Map)
     * @Param是mybatis中的注解, 相当于别名, 可以再xml中用@param中的别名来引用参数
     * @return 以map信息返回
     */
    public List<Map<String,Object>> findNewsTagMapListByQuery(Map<String, Object> map);
}
