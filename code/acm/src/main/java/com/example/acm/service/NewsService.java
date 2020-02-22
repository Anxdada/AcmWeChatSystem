package com.example.acm.service;

import com.example.acm.entity.News;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

/**
 * (News)表服务接口
 *
 * @author makejava
 * @since 2020-02-18 00:00:46
 */
public interface NewsService {


    /**
     * 添加新闻
     *
     * @param news 新闻信息
     * 哪怕只有一个参数也得用@Param, 不然#{} 无法访问
     */
    public void addNews(News news);

    /**
     * 修改新闻
     *
     * @param news 新的新闻信息
     */
    public void updateNews(News news);

    /**
     * 查询友链
     *
     * @param newsId 新闻Id
     * @return 新闻列表 以实体类返回
     */
    public List<News> findNewsListByNewsId(Long newsId);

    /**
     * 根据查询条件获取新闻个数(Map)
     * 分页使用
     *
     */
    public Integer countNewsMapListByQuery(@Param("map") Map<String, Object> map);


    /**
     * 根据查询条件获取新闻列表(Map)
     * 并且和类别表做连接直接查处结果, 不用二次查询后再返回结果
     * 和上面的函数不同就是字段变少了
     *
     * @return 以map信息返回
     */
    public List<Map<String,Object>> findNewsMapListByQueryJoinTagTable(Map<String, Object> map);

}