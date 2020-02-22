package com.example.acm.service.deal.impl;

import com.example.acm.common.ResultBean;
import com.example.acm.common.ResultCode;
import com.example.acm.common.SysConst;
import com.example.acm.entity.NewsTag;
import com.example.acm.entity.User;
import com.example.acm.service.NewsService;
import com.example.acm.service.NewsTagService;
import com.example.acm.service.UserService;
import com.example.acm.service.deal.NewsDealService;
import com.example.acm.service.deal.NewsTagDealService;
import com.example.acm.utils.DateUtil;
import com.example.acm.utils.ListPage;
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
public class NewsTagDealServiceImpl implements NewsTagDealService {

    @Autowired
    private NewsTagService NewsTagService;

    @Autowired
    private NewsService newsService;

    @Autowired
    private UserService userService;

    /**
     * 添加友链
     * @param user 添加的人
     * @param newsTagName 新闻类别名称
     * @param newsTagColor 新闻类别颜色
     * @return 结果
     */
    public ResultBean addNewsTag(User user, String newsTagName, String newsTagColor) {
        try {

            NewsTag NewsTag = new NewsTag();
            NewsTag.setNewsTagName(newsTagName);
            NewsTag.setNewsTagColor(newsTagColor);
            NewsTag.setCreateUser(user.getUserId());
            NewsTag.setCreateTime(new Date());
            NewsTag.setUpdateUser(user.getUserId());
            NewsTag.setUpdateTime(new Date());
            NewsTag.setIsEffective(SysConst.LIVE);

            NewsTagService.addNewsTag(NewsTag);

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
     * @param newsTagId 删除的新闻类别id
     * @return
     */
    public ResultBean deleteNewsTag(User user, long newsTagId) {
        try {

            List<NewsTag> list = NewsTagService.findNewsTagListByNewsTagId(newsTagId);
            if (list.size() < 0) {
                return new ResultBean(ResultCode.SYSTEM_FAILED, "无该条记录, 请检查你的代码!");
            }

            Map<String, Object> map = new HashMap<>();
            map.put("newsTagId", newsTagId);
            map.put("isEffective", SysConst.LIVE);

            List<Map<String, Object>> listMap = newsService.findNewsMapListByQueryJoinTagTable(map);

            if (!listMap.isEmpty()) {
                return new ResultBean(ResultCode.SYSTEM_FAILED, "还有该类别的新闻存在, 无法删除该类别!");
            }

            NewsTag newsTag = list.get(0);
            newsTag.setUpdateUser(user.getUserId());
            newsTag.setUpdateTime(new Date());
            newsTag.setIsEffective(SysConst.NOT_LIVE);

            NewsTagService.updateNewsTag(newsTag);

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
     * @param newsTagId id
     * @param newsTagName 新闻类别名称
     * @param newsTagColor 新闻类别颜色
     * @return
     */
    public ResultBean updateNewsTag(User user, long newsTagId, String newsTagName,
                                    String newsTagColor) {
        try {

            List<NewsTag> list = NewsTagService.findNewsTagListByNewsTagId(newsTagId);
            if (list.size() < 0) {
                return new ResultBean(ResultCode.SYSTEM_FAILED, "无该条记录, 请检查你的代码!");
            }

            NewsTag newsTag = list.get(0);
            newsTag.setNewsTagName(newsTagName);
            newsTag.setNewsTagColor(newsTagColor);
            newsTag.setUpdateUser(user.getUserId());
            newsTag.setUpdateTime(new Date());

            NewsTagService.updateNewsTag(newsTag);

            return new ResultBean(ResultCode.SUCCESS);

        } catch (Exception e) {
            // log
            e.printStackTrace();
            return new ResultBean(ResultCode.SYSTEM_FAILED);
        }
    }


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
    public ResultBean selectNewsTag(String newsTagName, int aOrs, String order, int pageNum, int pageSize) {
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
            map.put("newsTagName", newsTagName);
            map.put("start", start);
            map.put("limit", limit);
            map.put("order", order);
            if (aOrs == 1) {
                map.put("aOrS", "DESC");
            } else {
                map.put("aOrS", "ASC");
            }
            map.put("isEffective", SysConst.LIVE);

            List<Map<String, Object>> list = NewsTagService.findNewsTagMapListByQuery(map);

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


            int allNum = NewsTagService.countNewsTagMapListByQuery(map);

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
     * @param newsTagId 新闻类别id
     * @return
     */
    public ResultBean detailNewsTag(long newsTagId) {
        try {

//            System.out.println(newsTagId);

            List<NewsTag> list = NewsTagService.findNewsTagListByNewsTagId(newsTagId);

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
