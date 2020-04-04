package com.example.acm.service.deal.impl;

import com.example.acm.common.ResultBean;
import com.example.acm.common.ResultCode;
import com.example.acm.common.SysConst;
import com.example.acm.config.RedisComponent;
import com.example.acm.entity.News;
import com.example.acm.entity.NewsTag;
import com.example.acm.entity.User;
import com.example.acm.service.NewsService;
import com.example.acm.service.NewsTagService;
import com.example.acm.service.UserService;
import com.example.acm.service.deal.NewsDealService;
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
 * @date 2020-02-22 16:15
 */
@Service
public class NewsDealServiceImpl implements NewsDealService {


    @Autowired
    private NewsService newsService;

    @Autowired
    private NewsTagService newsTagService;

    @Autowired
    private UserService userService;

    // 点赞操作的
    @Autowired
    private RedisComponent redisComponent;

    /**
     * 添加新闻
     *
     *
     * @param user 添加的人
     * @param newsTitle 标题
     * @param newsBody 内容
     * @param newsTagId 类别
     * @param isPublish 是否发布
     * @param firstImg 列表展示的小图
     * @return 结果
     */
    public ResultBean addNews(User user, String newsTitle, String newsBody, long newsTagId, int isPublish, String firstImg) {
        try {

            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

            News news = new News();

            news.setNewsTitle(newsTitle);
            news.setNewsBody(newsBody);
            news.setNewsTagId(newsTagId);

            news.setCreateUser(user.getUserId());
            news.setCreateTime(new Date());
            news.setUpdateUser(user.getUserId());
            news.setUpdateTime(new Date());
            news.setIsPublish(isPublish);
            news.setIsEffective(SysConst.LIVE);
            news.setFirstImg(firstImg);  // 更新的空就是删除掉了.. 所以逻辑上不用判断了..
            news.setView(0);

            newsService.addNews(news);

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
     * @param newsId 删除的友链id
     * @return
     */
    public ResultBean deleteNews(User user, long newsId) {
        try {

            List<News> listNews = newsService.findNewsListByNewsId(newsId);

            if (listNews.isEmpty()) {
                return new ResultBean(ResultCode.PARAM_ERROR, "不存在该新闻");
            }

            News news = listNews.get(0);
            news.setUpdateUser(user.getUserId());
            news.setUpdateTime(new Date());
            news.setIsEffective(SysConst.NOT_LIVE);
            newsService.updateNews(news);

            return new ResultBean(ResultCode.SUCCESS);

        } catch (Exception e) {
            // log
            e.printStackTrace();
            return new ResultBean(ResultCode.SYSTEM_FAILED);
        }
    }

    /**
     * 已经发布的新闻不能撤回 也就是不能修改 isPublish 字段
     * 可以直接选择修该 或者 删除
     *
     * @param user 操作人
     * @param newsId id
     * @param newsTitle 标题
     * @param newsBody 内容
     * @param newsTagId 类别
     * @param isPublish 是否发布
     * @param firstImg 列表展示的小图
     * @return
     */
    public ResultBean updateNews(User user, long newsId, String newsTitle, String newsBody, long newsTagId, int isPublish, String firstImg) {
        try {

            List<News> listNews = newsService.findNewsListByNewsId(newsId);

            if (listNews.isEmpty()) {
                return new ResultBean(ResultCode.PARAM_ERROR, "不存在该新闻");
            }

            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

            News news = listNews.get(0);
            news.setNewsTitle(newsTitle);
            news.setNewsBody(newsBody);
            news.setNewsTagId(newsTagId);

            news.setUpdateUser(user.getUserId());
            news.setUpdateTime(new Date());
            news.setIsPublish(isPublish);
            news.setIsEffective(SysConst.LIVE);

            if (firstImg.equals("undefined") || StringUtil.isNull(firstImg)) {
                news.setFirstImg(null);
            } else {
                news.setFirstImg(firstImg);
            }

            newsService.updateNews(news);

            return new ResultBean(ResultCode.SUCCESS);

        } catch (Exception e) {
            // log
            e.printStackTrace();
            return new ResultBean(ResultCode.SYSTEM_FAILED);
        }
    }

    /**
     * 根据查询条件获取新闻列表(Map)
     * 并且和类别表做连接直接查处结果, 不用二次查询后再返回结果
     *
     *
     * @param newsTitle 新闻的标题
     * @param searchTagId 类别的id
     * @param searchStartTime 搜索的开始时间
     * @param searchEndTime 搜索的截止时间
     * @param isPublish 是否发布, 手机端显示只要发布了的..
     * @param aOrs 升序还是降序
     * @param order 按那个字段排序
     * @param pageNum 第几页
     * @param pageSize 一页的大小
     * @return 结果
     */
    public ResultBean selectNews(String newsTitle, long searchTagId, String searchStartTime,
                                 String searchEndTime, int isPublish, int aOrs, String order, int pageNum, int pageSize) {

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
            map.put("newsTitle", newsTitle);
            if (searchTagId != -1) map.put("searchTagId", searchTagId);
            if (!StringUtil.isNull(searchStartTime)) map.put("searchStartTime", searchStartTime);
            if (!StringUtil.isNull(searchEndTime)) map.put("searchEndTime", searchEndTime);
            if (isPublish != -1) map.put("isPublish", isPublish);
            map.put("start", start);
            map.put("limit", limit);
            map.put("order", order);
            if (aOrs == 1) {
                map.put("aOrS", "DESC");
            } else {
                map.put("aOrS", "ASC");
            }
            map.put("isEffective", SysConst.LIVE);

//            System.out.println(map.get("newsTitle"));
//
//            System.out.println(map.containsKey("searchTagId"));
//            System.out.println(map.containsKey("searchStartTime"));
//            System.out.println(map.containsKey("searchEndTime"));
//            System.out.println(start + " " + limit + " " + pageNum + " " + pageSize);

            List<Map<String, Object>> list = newsService.findNewsMapListByQueryJoinTagTable(map);

//            System.out.println("xierenyi " + list.size());

            if (list.size() >0) {
                for (Map<String, Object> mapTemp : list) {

                    List<User> listUsers = userService.findUserListByUserId((Long)mapTemp.get("updateUser"));
                    User tUs = null;
                    if (listUsers.size() > 0) tUs = listUsers.get(0);
                    if (tUs != null) {
                        mapTemp.put("updateRealName", tUs.getRealName());  // 后端需要真实姓名
                        mapTemp.put("updateUserName", tUs.getUserName());  // 手机端需要用户名
                    }


                    listUsers = userService.findUserListByUserId((Long)mapTemp.get("createUser"));
                    tUs = null;
                    if (listUsers.size() > 0) tUs = listUsers.get(0);
                    if (tUs != null) {
                        mapTemp.put("createRealName", tUs.getRealName());  // 后端需要真实姓名
                        mapTemp.put("createUserName", tUs.getUserName());  // 手机端需要用户名
                    }

                    mapTemp.put("createTime", DateUtil.convDateToStr((Date) mapTemp.get("createTime"), "yyyy-MM-dd HH:mm:ss"));
                    mapTemp.put("updateTime", DateUtil.convDateToStr((Date) mapTemp.get("updateTime"), "yyyy-MM-dd HH:mm:ss"));
                }
            }


            int allNum = newsService.countNewsMapListByQuery(map);

            ListPage<List<Map<String, Object>>> listPage = ListPage.createListPage(pageNum, pageSize, allNum, list);

            return new ResultBean(ResultCode.SUCCESS, listPage);


        } catch (Exception e) {
            e.printStackTrace();
            return new ResultBean(ResultCode.SYSTEM_FAILED);
        }
    }

    /**
     *
     * @param newsId 新闻Id
     * @return
     */
    public ResultBean detailNews(User user, long newsId) {
        try {

            Map<String, Object> map = new HashMap<>();
            map.put("newsId", newsId);
            map.put("isEffective", SysConst.LIVE);

            List<Map<String, Object>> list = newsService.findNewsMapListByQueryJoinTagTable(map);

            if (list.isEmpty()) {
                return new ResultBean(ResultCode.SQL_NULL_RECODE);
            }

            Map<String, Object> mapTemp = list.get(0);

            List<User> listUsers = userService.findUserListByUserId((Long)mapTemp.get("updateUser"));
            User tUs = null;
            if (listUsers.size() > 0) tUs = listUsers.get(0);
            if (tUs != null) {
                mapTemp.put("updateRealName", tUs.getRealName());  // 后端需要真实姓名
                mapTemp.put("updateUserName", tUs.getUserName());  // 手机端需要用户名
            }


            listUsers = userService.findUserListByUserId((Long)mapTemp.get("createUser"));
            tUs = null;
            if (listUsers.size() > 0) tUs = listUsers.get(0);
            if (tUs != null) {
                mapTemp.put("createRealName", tUs.getRealName());  // 后端需要真实姓名
                mapTemp.put("createUserName", tUs.getUserName());  // 手机端需要用户名
                mapTemp.put("avatar", tUs.getAvatar());
            }


            mapTemp.put("createTime", DateUtil.convDateToStr((Date) mapTemp.get("createTime"), "yyyy-MM-dd HH:mm:ss"));
            mapTemp.put("updateTime", DateUtil.convDateToStr((Date) mapTemp.get("updateTime"), "yyyy-MM-dd HH:mm:ss"));

            // 点赞的
            String key = "news" + mapTemp.get("newsId");
//                    mapTemp.put("likeTotal", redisComponent.getSizeSetForKey(key));
            mapTemp.put("isNowUserLikeThisNews", redisComponent.hasMemberForKey(key, String.valueOf(user.getUserId())));
            mapTemp.put("like", redisComponent.getSizeSetForKey(key)); // 表中没有这个字段, 所以需要获取

//            System.out.println(newsId);
            return new ResultBean(ResultCode.SUCCESS, mapTemp);

        } catch (Exception e) {
            // log
            e.printStackTrace();
            return new ResultBean(ResultCode.SYSTEM_FAILED);
        }
    }

}
