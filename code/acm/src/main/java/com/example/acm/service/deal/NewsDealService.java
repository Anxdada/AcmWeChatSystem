package com.example.acm.service.deal;

import com.example.acm.common.ResultBean;
import com.example.acm.entity.User;

/**
 * @author xierenyi
 * @version 1.0
 * @date 2020-02-22 16:12
 */
public interface NewsDealService {

    /**
     * 添加新闻
     *
     *
     * @param user 添加的人
     * @param newsTitle 标题
     * @param newsBody 内容
     * @param newsTagId 类别
     * @param isPublish 存为草稿?
     * @return 结果
     */
    public ResultBean addNews(User user, String newsTitle, String newsBody, long newsTagId, int isPublish);

    /**
     *
     * @param user 删除操作人
     * @param newsId 删除的新闻id
     * @return
     */
    public ResultBean deleteNews(User user, long newsId);

    /**
     * 已经发布的新闻不能撤回 也就是不能修改 isPublish 字段
     * 可以直接选择修改 或者 删除
     *
     * @param user 操作人
     * @param newsId id
     * @param newsTitle 标题
     * @param newsBody 内容
     * @param newsTagId 类别
     * @param isPublish 是否发布
     * @return
     */
    public ResultBean updateNews(User user, long newsId, String newsTitle, String newsBody, long newsTagId, int isPublish);


    /**
     * 根据查询条件获取新闻列表(Map)
     * 并且和类别表做连接直接查处结果, 不用二次查询后再返回结果
     *
     *
     * @param newsTitle 新闻的标题
     * @param searchTagId 类别的id
     * @param searchStartTime 搜索的开始时间
     * @param searchEndTime 搜索的截止时间
     * @param aOrs 升序还是降序
     * @param order 按那个字段排序
     * @param pageNum 第几页
     * @param pageSize 一页的大小
     * @return 结果
     */
    public ResultBean selectNews(String newsTitle, long searchTagId, String searchStartTime,
                                 String searchEndTime, int aOrs, String order, int pageNum, int pageSize);

    /**
     *
     * @param newsId 新闻Id
     * @return
     */
    public ResultBean detailNews(long newsId);
}
