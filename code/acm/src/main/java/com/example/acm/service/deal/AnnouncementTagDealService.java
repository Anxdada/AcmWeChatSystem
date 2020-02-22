package com.example.acm.service.deal;

import com.example.acm.common.ResultBean;
import com.example.acm.entity.User;

/**
 * @author xierenyi
 * @version 1.0
 * @date 2020-02-18 12:03
 */
public interface AnnouncementTagDealService {

    /**
     * 添加公告类别
     *
     * @param user 添加的人
     * @param announcementTagName 公告类别名称
     * @param announcementTagColor 公告类别颜色
     * @param needStartTime 是否需要设置开始时间(因为公告的多样化关系, 还是需要加一个字段)
     * @return 结果
     */
    public ResultBean addAnnouncementTag(User user, String announcementTagName, String announcementTagColor, int needStartTime);

    /**
     *
     * @param user 删除操作人
     * @param announcementTagId 删除的公告类别id
     * @return
     */
    public ResultBean deleteAnnouncementTag(User user, long announcementTagId);

    /**
     *
     * @param user 操作人
     * @param announcementTagId id
     * @param announcementTagName 公告类别名称
     * @param announcementTagColor 公告类别颜色
     * @param needStartTime 是否需要设置开始时间
     * @return
     */
    public ResultBean updateAnnouncementTag(User user, long announcementTagId, String announcementTagName,
                                            String announcementTagColor, int needStartTime);


    /**
     * 根据查询条件获取公告类别列表(Map)
     *
     *
     * @param announcementTagName 公告类别名称
     * @param aOrs 升序还是降序
     * @param order 按那个字段排序
     * @param pageNum 第几页
     * @param pageSize 一页的大小
     * @return 结果
     */
    public ResultBean selectAnnouncementTag(String announcementTagName, int aOrs, String order, int pageNum, int pageSize);


    /**
     *
     * @param announcementTagId 公告类别id
     * @return
     */
    public ResultBean detailAnnouncementTag(long announcementTagId);
}
