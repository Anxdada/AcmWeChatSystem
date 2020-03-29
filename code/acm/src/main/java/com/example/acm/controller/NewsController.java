package com.example.acm.controller;

import com.example.acm.common.ResultBean;
import com.example.acm.common.ResultCode;
import com.example.acm.entity.News;
import com.example.acm.entity.User;
import com.example.acm.service.NewsService;
import com.example.acm.service.deal.NewsDealService;
import com.example.acm.utils.StringUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

/**
 * (News)表控制层
 *
 * @author makejava
 * @since 2020-02-22 16:25
 */
@Controller
@RequestMapping(value = "/news")
public class NewsController extends BaseController {

    private Logger LOG = LoggerFactory.getLogger(this.getClass());

    private final int two = 2;
    private final Long longTwo = Long.parseLong(String.valueOf(2));

    @Autowired
    private NewsDealService newsDealService;

    @Autowired
    private NewsService newsService;

    /**
     * 手机端展示新闻列表需要firstImg , 列表小图.. 仿照浏览器的新闻页面
     */
    @PostMapping("/addNews")
    @ResponseBody
    public ResultBean addNews(@RequestParam(value = "newsTitle", required = true) String newsTitle,
                              @RequestParam(value = "newsBody", required = true) String newsBody,
                              @RequestParam(value = "newsTagId", required = true) long newsTagId,
                              @RequestParam(value = "isPublish", required = true) int isPublish,
                              @RequestParam(value = "firstImg", defaultValue = "", required = false) String firstImg,
                              HttpServletRequest request, HttpServletResponse response) {

//        System.out.println("Xie");
//        System.out.println(" " + newsTitle);
//        System.out.println(" " + newsBody);
//        System.out.println(" " + newsTagId);
//        System.out.println(" " + isPublish);
//        System.out.println(firstImg);

        newsBody = StringUtil.getHtml(newsBody);

        User user = getUserIdFromSession(request);
        if (user == null) {
            user = new User();
            user.setUserId(longTwo);
        }

        return newsDealService.addNews(user, newsTitle, newsBody, newsTagId, isPublish, firstImg);

    }

    @PostMapping("/deleteNews")
    @ResponseBody
    public ResultBean deleteNews(@RequestParam(value = "newsId", required = true) long newsId,
                                 HttpServletRequest request, HttpServletResponse response) {

//        System.out.println(newsId);

        User user = getUserIdFromSession(request);
        if (user == null) {
            user = new User();
            user.setUserId(longTwo);
        }

        return newsDealService.deleteNews(user, newsId);

    }

    @PostMapping("/updateNews")
    @ResponseBody
    public ResultBean updateNews(@RequestParam(value = "newsId", required = true) long newsId,
                                 @RequestParam(value = "newsTitle", required = true) String newsTitle,
                                 @RequestParam(value = "newsBody", required = true) String newsBody,
                                 @RequestParam(value = "newsTagId", required = true) long newsTagId,
                                 @RequestParam(value = "isPublish", required = true) int isPublish,
                                 @RequestParam(value = "firstImg", required = true) String firstImg,
                                 HttpServletRequest request, HttpServletResponse response) {

//        System.out.println("Xie");
//        System.out.println(newsId);
//        System.out.println(" " + newsTitle);
//        System.out.println(" " + newsBody);
//        System.out.println(" " + newsTagId);
//        System.out.println(" " + firstImg);

        User user = getUserIdFromSession(request);
        if (user == null) {
            user = new User();
            user.setUserId(longTwo);
        }

        return newsDealService.updateNews(user, newsId, newsTitle, newsBody, newsTagId, isPublish, firstImg);
    }


    @PostMapping("/selectNews")
    @ResponseBody
    public ResultBean selectNews(@RequestParam(value = "newsTitle", defaultValue = "", required = false) String newsTitle,
                                 @RequestParam(value = "searchTagId", defaultValue = "-1", required = false) long searchTagId,
                                 @RequestParam(value = "searchStartTime", defaultValue = "", required = false) String searchStartTime,
                                 @RequestParam(value = "searchEndTime", defaultValue = "", required = false) String searchEndTime,
                                 @RequestParam(value = "isPublish", defaultValue = "-1", required = false) int isPublish,
                                 @RequestParam(value = "aOrs", defaultValue = "1", required = false) int aOrs,
                                 @RequestParam(value = "order", defaultValue = "createTime", required = false) String order,
                                 @RequestParam(value = "pageNum", defaultValue = "1", required = false) int pageNum,
                                 @RequestParam(value = "pageSize", defaultValue="10", required = false) int pageSize,
                                 HttpServletRequest request, HttpServletResponse response) {

//        System.out.println("xierenyi");
//        System.out.println(newsTitle);
//        System.out.println( " " + searchTagId);
//        System.out.println( " " + searchStartTime);
//        System.out.println(" " + searchEndTime);
//        System.out.println( " " + order);

        User user = getUserIdFromSession(request);
        if (user == null) {
            // 如果忘记传头部信息过来, 默认设置为超级管理员的改动
            user = new User();
            user.setUserId(longTwo);
        }

        return newsDealService.selectNews(newsTitle, searchTagId, searchStartTime,
                searchEndTime, isPublish, aOrs,  order,  pageNum,  pageSize);

    }

    @PostMapping("/detailNews")
    @ResponseBody
    public ResultBean detailNews(@RequestParam(value = "newsId", required = true) long newsId,
                                 HttpServletRequest request, HttpServletResponse response) {

//        System.out.println(newsId);

        User user = getUserIdFromSession(request);
        if (user == null) {
            // 如果忘记传头部信息过来, 默认设置为超级管理员的改动
            user = new User();
            user.setUserId(longTwo);
        } // 点赞需求

        return newsDealService.detailNews(user, newsId);

    }

    // 更新新闻的浏览量 和 点赞数
    // 前者只能在手机端做, 后者使用redis储存
    // 因为点赞后台和手机都能做, 所以通过view的值判断是那个传来的.
    @PostMapping("/updateNewsViewAndLike")
    @ResponseBody
    public ResultBean updateNewsViewAndLike(@RequestParam(value = "newsId", required = true) long newsId,
                                             @RequestParam(value = "view", required = true) int view,
                                             @RequestParam(value = "like", required = true) int like,
                                            @RequestParam(value = "uid", defaultValue = "2", required = false) long uid,
                                             HttpServletRequest request, HttpServletResponse response) {

        try {

            // 这个uid 好像就能于请求来的这个用户, 好像并不用传, 直接在请求中获取就好了
            // 后面看一下是否真是这样, 先保留这个参数
            User user = getUserIdFromSession(request);
            if (user != null) {
                // 保留参数
                uid = user.getUserId();
            }

            List<News> listNews = newsService.findNewsListByNewsId(newsId);

            if (listNews.isEmpty()) {
                return new ResultBean(ResultCode.SQL_NULL_RECODE, "不存在该新闻");
            }

            // 更新点赞
            String key = "news" + newsId;
            redisComponent.setTypeUidLike("news", newsId, uid, like);

            // 从电脑端的需求, 则不更新数据库, 优化一部分需求
            if (view == -1) return new ResultBean(ResultCode.SUCCESS);

            News news = listNews.get(0);
            news.setView(view);

            newsService.updateNews(news);

            return new ResultBean(ResultCode.SUCCESS);

        } catch (Exception e) {
            // log
            e.printStackTrace();
            return new ResultBean(ResultCode.SYSTEM_FAILED, String.valueOf(e));
        }

    }

}