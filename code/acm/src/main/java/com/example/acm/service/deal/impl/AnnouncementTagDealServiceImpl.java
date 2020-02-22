package com.example.acm.service.deal.impl;

import com.example.acm.common.ResultBean;
import com.example.acm.common.ResultCode;
import com.example.acm.common.SysConst;
import com.example.acm.entity.AnnouncementTag;
import com.example.acm.entity.User;
import com.example.acm.service.AnnouncementService;
import com.example.acm.service.AnnouncementTagService;
import com.example.acm.service.UserService;
import com.example.acm.service.deal.AnnouncementTagDealService;
import com.example.acm.utils.DateUtil;
import com.example.acm.utils.ListPage;
import com.example.acm.utils.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author xierenyi
 * @version 1.0
 * @date 2020-02-18 12:03
 */
@Service
public class AnnouncementTagDealServiceImpl implements AnnouncementTagDealService {

    @Autowired
    private AnnouncementTagService announcementTagService;

    @Autowired
    private AnnouncementService announcementService;

    @Autowired
    private UserService userService;

    /**
     * 添加友链
     * @param user 添加的人
     * @param announcementTagName 公告类别名称
     * @param announcementTagColor 公告类别颜色
     * @param needStartTime 是否需要设置开始时间
     * @return 结果
     */
    public ResultBean addAnnouncementTag(User user, String announcementTagName, String announcementTagColor, int needStartTime) {
        try {

            AnnouncementTag announcementTag = new AnnouncementTag();
            announcementTag.setAnnouncementTagName(announcementTagName);
            announcementTag.setAnnouncementTagColor(announcementTagColor);
            announcementTag.setCreateUser(user.getUserId());
            announcementTag.setCreateTime(new Date());
            announcementTag.setUpdateUser(user.getUserId());
            announcementTag.setUpdateTime(new Date());
            announcementTag.setNeedStartTime(needStartTime);
            announcementTag.setIsEffective(SysConst.LIVE);

            announcementTagService.addAnnouncementTag(announcementTag);

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
     * @param announcementTagId 删除的公告类别id
     * @return
     */
    public ResultBean deleteAnnouncementTag(User user, long announcementTagId) {
        try {

            List<AnnouncementTag> list = announcementTagService.findAnnouncementTagListByAnnouncementTagId(announcementTagId);
            if (list.isEmpty()) {
                return new ResultBean(ResultCode.SYSTEM_FAILED, "无该条记录, 请检查你的代码!");
            }

            Map<String, Object> map = new HashMap<>();
            map.put("searchTagId", announcementTagId);
            map.put("isEffective", SysConst.LIVE);

            List<Map<String, Object>> listMap = announcementService.findAnnouncementMapListByQueryJoinTagTable(map);

            if (!listMap.isEmpty()) {
                return new ResultBean(ResultCode.SYSTEM_FAILED, "还有该类别的公告存在, 无法删除该类别!");
            }


            AnnouncementTag announcementTag = list.get(0);
            announcementTag.setUpdateUser(user.getUserId());
            announcementTag.setUpdateTime(new Date());
            announcementTag.setIsEffective(SysConst.NOT_LIVE);

            announcementTagService.updateAnnouncementTag(announcementTag);

            return new ResultBean(ResultCode.SUCCESS);

        } catch (Exception e) {
            // log
            e.printStackTrace();
            return new ResultBean(ResultCode.SYSTEM_FAILED);
        }
    }

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
                                            String announcementTagColor, int needStartTime) {
        try {

            List<AnnouncementTag> list = announcementTagService.findAnnouncementTagListByAnnouncementTagId(announcementTagId);
            if (list.size() < 0) {
                return new ResultBean(ResultCode.SYSTEM_FAILED, "无该条记录, 请检查你的代码!");
            }

            AnnouncementTag announcementTag = list.get(0);
            announcementTag.setAnnouncementTagName(announcementTagName);
            announcementTag.setAnnouncementTagColor(announcementTagColor);
            announcementTag.setUpdateUser(user.getUserId());
            announcementTag.setUpdateTime(new Date());
            announcementTag.setNeedStartTime(needStartTime);

            announcementTagService.updateAnnouncementTag(announcementTag);

            return new ResultBean(ResultCode.SUCCESS);

        } catch (Exception e) {
            // log
            e.printStackTrace();
            return new ResultBean(ResultCode.SYSTEM_FAILED);
        }
    }


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
    public ResultBean selectAnnouncementTag(String announcementTagName, int aOrs, String order, int pageNum, int pageSize) {
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
            map.put("announcementTagName", announcementTagName);
            map.put("start", start);
            map.put("limit", limit);
            map.put("order", order);
            if (aOrs == 1) {
                map.put("aOrS", "DESC");
            } else {
                map.put("aOrS", "ASC");
            }
            map.put("isEffective", SysConst.LIVE);

            List<Map<String, Object>> list = announcementTagService.findAnnouncementTagMapListByQuery(map);

//            System.out.println("xierenyi " + list.size());

            if (list.size() >0) {
                for (Map<String, Object> mapTemp : list) {

                    List<User> listUsers = userService.findUserListByUserId((Long)mapTemp.get("updateUser"));
                    User tUs = null;
                    if (listUsers.size() > 0) tUs = listUsers.get(0);
                    if (tUs != null) mapTemp.put("updateUser", tUs.getRealName());

                    mapTemp.put("updateTime", DateUtil.convDateToStr((Date) mapTemp.get("updateTime"), "yyyy-MM-dd HH:mm:ss"));
                }
            }


            int allNum = announcementTagService.countAnnouncementTagMapListByQuery(map);

            ListPage<List<Map<String, Object>>> listPage = ListPage.createListPage(pageNum, pageSize, allNum, list);

            return new ResultBean(ResultCode.SUCCESS, listPage);

        } catch(Exception e) {
            // log
            e.printStackTrace();
            return new ResultBean(ResultCode.SYSTEM_FAILED);
        }
    }

    /**
     *
     * @param announcementTagId 公告类别id
     * @return
     */
    public ResultBean detailAnnouncementTag(long announcementTagId) {
        try {

//            System.out.println(announcementTagId);

            List<AnnouncementTag> list = announcementTagService.findAnnouncementTagListByAnnouncementTagId(announcementTagId);

            if (list.size() < 0) {
                return new ResultBean(ResultCode.SYSTEM_FAILED, "无该条记录, 请检查你的代码!");
            }

            return new ResultBean(ResultCode.SUCCESS, list.get(0));

        } catch (Exception e) {
            // log
            e.printStackTrace();
            return new ResultBean(ResultCode.SYSTEM_FAILED);
        }
    }
}
