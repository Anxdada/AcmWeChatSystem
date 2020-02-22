package com.example.acm.service.deal.impl;

import com.example.acm.common.ResultBean;
import com.example.acm.common.ResultCode;
import com.example.acm.common.SysConst;
import com.example.acm.entity.Announcement;
import com.example.acm.entity.AnnouncementTag;
import com.example.acm.entity.FriendUrl;
import com.example.acm.entity.User;
import com.example.acm.service.AnnouncementService;
import com.example.acm.service.AnnouncementTagService;
import com.example.acm.service.UserService;
import com.example.acm.service.deal.AnnouncementDealService;
import com.example.acm.utils.DateUtil;
import com.example.acm.utils.ListPage;
import com.example.acm.utils.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author xierenyi
 * @version 1.0
 * @date 2020-02-18 00:44
 */
@Service
public class AnnouncementDealServiceImpl implements AnnouncementDealService {


    @Autowired
    private AnnouncementService announcementService;

    @Autowired
    private AnnouncementTagService announcementTagService;

    @Autowired
    private UserService userService;

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
     * @param isPublish 是否发布
     * @return 结果
     */
    public ResultBean addAnnouncement(User user, String announcementTitle, String announcementBody,
                                      long announcementTagId, int isRegister,  String registerStartTime,
                                      String registerEndTime, String startTime, String lastTime, int isPublish) {
        try {

            List<AnnouncementTag> listAnnouncementTags = announcementTagService.findAnnouncementTagListByAnnouncementTagId(announcementTagId);

            if (listAnnouncementTags.isEmpty()) {
                return new ResultBean(ResultCode.PARAM_ERROR, "不存在该公告类别");
            }

            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

            Announcement announcement = new Announcement();

            announcement.setAnnouncementTitle(announcementTitle);
            announcement.setAnnouncementBody(announcementBody);
            announcement.setAnnouncementTagId(announcementTagId);

            announcement.setIsRegister(isRegister);
            if (isRegister == 1) {
                announcement.setRegisterStartTime(sdf.parse(registerStartTime));
                announcement.setRegisterEndTime(sdf.parse(registerEndTime));
            }
            if (listAnnouncementTags.get(0).getNeedStartTime() == 1) {
                announcement.setStartTime(sdf.parse(startTime));
                announcement.setLastTime(lastTime);
            }

            announcement.setCreateUser(user.getUserId());
            announcement.setCreateTime(new Date());
            announcement.setUpdateUser(user.getUserId());
            announcement.setUpdateTime(new Date());
            announcement.setIsPublish(isPublish);
            announcement.setIsEffective(SysConst.LIVE);

            announcementService.addAnnouncement(announcement);

            return new ResultBean(ResultCode.SUCCESS);

        } catch (Exception e) {
            // log
            e.printStackTrace();
            return new ResultBean(ResultCode.SYSTEM_FAILED);
        }
    }

    /**
     *
     * @param user 删除操作人
     * @param announcementId 删除的友链id
     * @return
     */
    public ResultBean deleteAnnouncement(User user, long announcementId) {
        try {

            List<Announcement> announcements = announcementService.findAnnouncementListByAnnouncementId(announcementId);

            if (announcements.size() < 1) {
                return new ResultBean(ResultCode.PARAM_ERROR, "不存在该公告");
            }

            Announcement announcement = announcements.get(0);
            announcement.setUpdateUser(user.getUserId());
            announcement.setUpdateTime(new Date());
            announcement.setIsEffective(SysConst.NOT_LIVE);
            announcementService.updateAnnouncement(announcement);

            return new ResultBean(ResultCode.SUCCESS);

        } catch (Exception e) {
            // log
            e.printStackTrace();
            return new ResultBean(ResultCode.SYSTEM_FAILED);
        }
    }

    /**
     * 已经发布的公告不能撤回 也就是不能修改 isPublish 字段
     * 可以直接选择修该 或者 删除
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
                                         String registerEndTime, String startTime, String lastTime, int isPublish) {
        try {

            List<Announcement> announcements = announcementService.findAnnouncementListByAnnouncementId(announcementId);

            if (announcements.isEmpty()) {
                return new ResultBean(ResultCode.PARAM_ERROR, "不存在该公告");
            }

            List<AnnouncementTag> listAnnouncementTags = announcementTagService.findAnnouncementTagListByAnnouncementTagId(announcementTagId);

            if (listAnnouncementTags.isEmpty()) {
                return new ResultBean(ResultCode.PARAM_ERROR, "不存在该公告类别");
            }

            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

            Announcement announcement = announcements.get(0);
            announcement.setAnnouncementTitle(announcementTitle);
            announcement.setAnnouncementBody(announcementBody);
            announcement.setAnnouncementTagId(announcementTagId);

            announcement.setIsRegister(isRegister);
            if (isRegister == 1) {
                announcement.setRegisterStartTime(sdf.parse(registerStartTime));
                announcement.setRegisterEndTime(sdf.parse(registerEndTime));
            } else {
                announcement.setRegisterStartTime(null);
                announcement.setRegisterEndTime(null);
            }

            if (listAnnouncementTags.get(0).getNeedStartTime() == 1) {
                announcement.setStartTime(sdf.parse(startTime));
                announcement.setLastTime(lastTime);
            } else {
                announcement.setStartTime(null);
                announcement.setLastTime(null);
            }

            announcement.setUpdateUser(user.getUserId());
            announcement.setUpdateTime(new Date());
            announcement.setIsPublish(isPublish);
            announcement.setIsEffective(SysConst.LIVE);

            announcementService.updateAnnouncement(announcement);

            return new ResultBean(ResultCode.SUCCESS);

        } catch (Exception e) {
            // log
            e.printStackTrace();
            return new ResultBean(ResultCode.SYSTEM_FAILED);
        }
    }

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
                                            String searchEndTime, int aOrs, String order, int pageNum, int pageSize) {

        try {
            Map<String, Object> map = new HashMap<>();
            if (pageNum < 0) {
                return new ResultBean(ResultCode.PARAM_ERROR, "页码不能小于0");
            }
            if (pageSize < 0) {
                return new ResultBean(ResultCode.PARAM_ERROR, "一页展示数量不能小于0");
            }
            int start = (pageNum - 1) * pageSize;
            int limit = pageSize;
            map.put("announcementTitle", announcementTitle);
            if (searchTagId != -1) map.put("searchTagId", searchTagId);
            if (!StringUtil.isNull(searchStartTime)) map.put("searchStartTime", searchStartTime);
            if (!StringUtil.isNull(searchEndTime)) map.put("searchEndTime", searchEndTime);
            map.put("start", start);
            map.put("limit", limit);
            map.put("order", order);
            if (aOrs == 1) {
                map.put("aOrS", "DESC");
            } else {
                map.put("aOrS", "ASC");
            }
            map.put("isEffective", SysConst.LIVE);

            List<Map<String, Object>> list = announcementService.findAnnouncementMapListByQueryJoinTagTable(map);

            if (list.size() >0) {
                for (Map<String, Object> mapTemp : list) {

                    List<User> listUsers = userService.findUserListByUserId((Long)mapTemp.get("updateUser"));
                    User tUs = null;
                    if (listUsers.size() > 0) tUs = listUsers.get(0);
                    if (tUs != null) mapTemp.put("updateUser", tUs.getRealName());


                    listUsers = userService.findUserListByUserId((Long)mapTemp.get("createUser"));
                    tUs = null;
                    if (listUsers.size() > 0) tUs = listUsers.get(0);
                    if (tUs != null) mapTemp.put("createUser", tUs.getRealName());


                    mapTemp.put("createTime", DateUtil.convDateToStr((Date) mapTemp.get("createTime"), "yyyy-MM-dd"));
                    mapTemp.put("updateTime", DateUtil.convDateToStr((Date) mapTemp.get("updateTime"), "yyyy-MM-dd HH:mm:ss"));
                }
            }


            int allNum = announcementService.countAnnouncementMapListByQuery(map);

            ListPage<List<Map<String, Object>>> listPage = ListPage.createListPage(pageNum, pageSize, allNum, list);

            return new ResultBean(ResultCode.SUCCESS, listPage);


        } catch (Exception e) {
            e.printStackTrace();
            return new ResultBean(ResultCode.SYSTEM_FAILED);
        }
    }

    /**
     *
     * @param announcementId 公告Id
     * @return
     */
    public ResultBean detailAnnouncement(long announcementId) {
        try {

            Map<String, Object> map = new HashMap<>();
            map.put("announcementId", announcementId);
            map.put("isEffective", SysConst.LIVE);

            List<Map<String, Object>> list = announcementService.findAnnouncementMapListByQueryJoinTagTable(map);

            if (list.size() < 1) {
                return new ResultBean(ResultCode.SYSTEM_FAILED);
            }

            Map<String, Object> mapTemp = list.get(0);

            List<User> listUsers = userService.findUserListByUserId((Long)mapTemp.get("updateUser"));
            User tUs = null;
            if (listUsers.size() > 0) tUs = listUsers.get(0);
            if (tUs != null) mapTemp.put("updateUser", tUs.getRealName());


            listUsers = userService.findUserListByUserId((Long)mapTemp.get("createUser"));
            tUs = null;
            if (listUsers.size() > 0) tUs = listUsers.get(0);
            if (tUs != null) mapTemp.put("createUser", tUs.getRealName());

//            System.out.println((Integer) mapTemp.get("announcementTagId"));
//            List<AnnouncementTag> list2 = announcementTagService.findAnnouncementTagListByAnnouncementTagId(Long.parseLong(mapTemp.get("announcementTagId").toString()));
            List<AnnouncementTag> list2 = announcementTagService.findAnnouncementTagListByAnnouncementTagId((Long) mapTemp.get("announcementTagId"));
            if (!list2.isEmpty()) mapTemp.put("needStartTime", list2.get(0).getNeedStartTime());


            mapTemp.put("createTime", DateUtil.convDateToStr((Date) mapTemp.get("createTime"), "yyyy-MM-dd"));
            mapTemp.put("updateTime", DateUtil.convDateToStr((Date) mapTemp.get("updateTime"), "yyyy-MM-dd HH:mm:ss"));

//            System.out.println(mapTemp.get("registerStartTime"));
//            System.out.println(mapTemp.get("registerEndTime"));

            if ((Long) mapTemp.get("isRegister") == 1) {
                mapTemp.put("registerStartTime", DateUtil.convDateToStr((Date) mapTemp.get("registerStartTime"), "yyyy-MM-dd HH:mm:ss"));
                mapTemp.put("registerEndTime", DateUtil.convDateToStr((Date) mapTemp.get("registerEndTime"), "yyyy-MM-dd HH:mm:ss"));
            }

            if (list2.get(0).getNeedStartTime() == 1)
                mapTemp.put("startTime", DateUtil.convDateToStr((Date) mapTemp.get("startTime"), "yyyy-MM-dd HH:mm:ss"));

            return new ResultBean(ResultCode.SUCCESS, mapTemp);

        } catch (Exception e) {
            // log
            e.printStackTrace();
            return new ResultBean(ResultCode.SYSTEM_FAILED);
        }
    }

}
