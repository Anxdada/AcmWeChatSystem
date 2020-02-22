package com.example.acm.mapper;

import com.example.acm.entity.News;
import org.apache.ibatis.annotations.Param;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

/**
 * (News)表数据库访问层
 *
 * @author xierenyi
 * @since 2020-02-22 16:04:43
 */
@Mapper
@Component
public interface NewsMapper {

    /**
     * 添加新闻
     *
     * @param news 新闻类别信息
     * 哪怕只有一个参数也得用@Param, 不然#{} 无法访问
     */
    public void addNews(@Param("news") News news);

    /**
     * 修改新闻
     *
     * @param news 新的新闻信息
     */
    public void updateNews(@Param("news") News news);

    /**
     * 查询友链
     *
     * @param newsId 新闻Id
     * @return 新闻列表 以实体类返回
     */
    public List<News> findNewsListByNewsId(@Param("newsId") Long newsId);

    /**
     * 根据查询条件获取新闻信息的个数
     *
     */
    public Integer countNewsListByQuery(@Param("map") Map<String, Object> map);

    /**
     * 根据查询条件获取新闻个数(Map)
     *
     */
    public Integer countNewsMapListByQuery(@Param("map") Map<String, Object> map);


    /**
     * 根据查询条件获取新闻列表(Map)
     * @Param是mybatis中的注解, 相当于别名, 可以再xml中用@param中的别名来引用参数
     * @return 以map信息返回
     */
    public List<Map<String,Object>> findNewsMapListByQuery(@Param("map") Map<String, Object> map);

    /**
     * 根据查询条件获取新闻列表(Map)
     * 并且和类别表做连接直接查处结果, 不用二次查询后再返回结果
     * 和上面的函数不同就是字段变少了
     *
     * @return 以map信息返回
     */
    public List<Map<String,Object>> findNewsMapListByQueryJoinTagTable(@Param("map") Map<String, Object> map);

}