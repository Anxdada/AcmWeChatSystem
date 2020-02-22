package com.example.acm.service.impl;

import com.example.acm.entity.News;
import com.example.acm.mapper.NewsMapper;
import com.example.acm.service.NewsService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

/**
 * (News)表服务实现类
 *
 * @author makejava
 * @since 2020-02-18 00:00:46
 */
@Service
public class NewsServiceImpl implements NewsService {


    @Resource
    private NewsMapper NewsMapper;

    /**
     * 添加新闻
     *
     * @param news 新闻信息
     * 哪怕只有一个参数也得用@Param, 不然#{} 无法访问
     */
    public void addNews(News news) {
        NewsMapper.addNews(news);
    }

    /**
     * 修改新闻
     *
     * @param news 新的新闻信息
     */
    public void updateNews(News news) {
        NewsMapper.updateNews(news);
    }

    /**
     * 查询友链
     *
     * @param newsId 新闻Id
     * @return 新闻列表 以实体类返回
     */
    public List<News> findNewsListByNewsId(Long newsId) {
        return NewsMapper.findNewsListByNewsId(newsId);
    }

    /**
     * 根据查询条件获取新闻个数(Map)
     * 分页使用
     *
     */
    public Integer countNewsMapListByQuery(Map<String, Object> map) {
        return NewsMapper.countNewsMapListByQuery(map);
    }

    /**
     * 根据查询条件获取新闻列表(Map)
     * 并且和类别表做连接直接查处结果, 不用二次查询后再返回结果
     * 和上面的函数不同就是字段变少了
     *
     * @return 以map信息返回
     */
    public List<Map<String,Object>> findNewsMapListByQueryJoinTagTable(Map<String, Object> map) {
        return NewsMapper.findNewsMapListByQueryJoinTagTable(map);
    }
}