package com.example.acm.service.deal;

import com.example.acm.common.ResultBean;
import com.example.acm.entity.User;

/**
 * @author xierenyi
 * @version 1.0
 * @date 2020-02-18 12:03
 */
public interface NewsTagDealService {

    /**
     * 添加新闻类别
     *
     * @param user 添加的人
     * @param newsTagName 新闻类别名称
     * @param newsTagColor 新闻类别颜色
     * @return 结果
     */
    public ResultBean addNewsTag(User user, String newsTagName, String newsTagColor);

    /**
     *
     * @param user 删除操作人
     * @param newsTagId 删除的新闻类别id
     * @return
     */
    public ResultBean deleteNewsTag(User user, long newsTagId);

    /**
     *
     * @param user 操作人
     * @param newsTagId id
     * @param newsTagName 新闻类别名称
     * @param newsTagColor 新闻类别颜色
     * @return
     */
    public ResultBean updateNewsTag(User user, long newsTagId, String newsTagName,
                                    String newsTagColor);


    /**
     * 根据查询条件获取新闻类别列表(Map)
     *
     *
     * @param newsTagName 新闻类别名称
     * @param aOrs 升序还是降序
     * @param order 按那个字段排序
     * @param pageNum 第几页
     * @param pageSize 一页的大小
     * @return 结果
     */
    public ResultBean selectNewsTag(String newsTagName, int aOrs, String order, int pageNum, int pageSize);


    /**
     *
     * @param newsTagId 新闻类别id
     * @return
     */
    public ResultBean detailNewsTag(long newsTagId);
}
