package com.example.acm.service.deal;

import com.example.acm.common.ResultBean;
import com.example.acm.entity.User;

import java.util.List;
import java.util.Map;

/**
 * @author xierenyi
 * @version 1.0
 * @date 2020-02-18 00:44
 */
public interface AnnouncementDealService {

    /**
     * 添加公告
     *
     *
     * @param user 添加的人
     * @param announcementTitle 标题
     * @param announcementBody 内容
     * @param announcementTagId 类别
     * @param isRegister 是否报名
     * @param registerStartTime 报名开始时间
     * @param registerEndTime 报名截止时间
     * @param startTime 开始时间 上面的都是date
     * @param lastTime 持续时间 string
     * @return 结果
     */
    public ResultBean addAnnouncement(User user, String announcementTitle, String announcementBody,
                                      long announcementTagId, int isRegister,  String registerStartTime,
                                      String registerEndTime, String startTime, String lastTime, int isPublish);

    /**
     *
     * @param user 删除操作人
     * @param announcementId 删除的公告id
     * @return
     */
    public ResultBean deleteAnnouncement(User user, long announcementId);

    /**
     * 已经发布的公告不能撤回 也就是不能修改 isPublish 字段
     * 可以直接选择修改 或者 删除
     *
     * @param user 操作人
     * @param announcementId id
     * @param announcementTitle 标题
     * @param announcementBody 内容
     * @param announcementTagId 类别
     * @param isRegister 是否报名
     * @param registerStartTime 报名开始时间
     * @param registerEndTime 报名截止时间
     * @param startTime 开始时间 上面的都是date
     * @param lastTime 持续时间 string
     * @param isPublish 是否发布
     * @return
     */
    public ResultBean updateAnnouncement(User user, long announcementId, String announcementTitle, String announcementBody,
                                            long announcementTagId, int isRegister,  String registerStartTime,
                                            String registerEndTime, String startTime, String lastTime, int isPublish);


    /**
     * 根据查询条件获取公告列表(Map)
     * 并且和类别表做连接直接查处结果, 不用二次查询后再返回结果
     *
     *
     * @param announcementTitle 公告的标题
     * @param searchTagId 类别的id
     * @param searchStartTime 搜索的开始时间
     * @param searchEndTime 搜索的截止时间
     * @param aOrs 升序还是降序
     * @param order 按那个字段排序
     * @param pageNum 第几页
     * @param pageSize 一页的大小
     * @return 结果
     */
    public ResultBean selectAnnouncement(String announcementTitle, long searchTagId, String searchStartTime,
                                            String searchEndTime, int aOrs, String order, int pageNum, int pageSize);

    /**
     *
     * @param announcementId 公告Id
     * @return
     */
    public ResultBean detailAnnouncement(long announcementId);
}
