package com.example.acm.controller;

import com.example.acm.common.ResultBean;
import com.example.acm.entity.User;
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


    @PostMapping("/addNews")
    @ResponseBody
    public ResultBean addNews(@RequestParam(value = "newsTitle", required = true) String newsTitle,
                              @RequestParam(value = "newsBody", required = true) String newsBody,
                              @RequestParam(value = "newsTagId", required = true) long newsTagId,
                              @RequestParam(value = "isPublish", required = true) int isPublish,
                              HttpServletRequest request, HttpServletResponse response) {

//        System.out.println("Xie");
//        System.out.println(" " + newsTitle);
//        System.out.println(" " + newsBody);
//        System.out.println(" " + newsTagId);
//        System.out.println(" " + isPublish);

        newsBody = StringUtil.getHtml(newsBody);

        User user = getUserIdFromSession(request);
        if (user == null) {
            user = new User();
            user.setUserId(longTwo);
        }

        return newsDealService.addNews(user, newsTitle, newsBody, newsTagId, isPublish);

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
                                 HttpServletRequest request, HttpServletResponse response) {

//        System.out.println("Xie");
//        System.out.println(newsId);
//        System.out.println(" " + newsTitle);
//        System.out.println(" " + newsBody);
//        System.out.println(" " + newsTagId);
//        System.out.println(" " + isPublish);

        User user = getUserIdFromSession(request);
        if (user == null) {
            user = new User();
            user.setUserId(longTwo);
        }

        return newsDealService.updateNews(user, newsId, newsTitle, newsBody, newsTagId, isPublish);
    }


    @PostMapping("/selectNews")
    @ResponseBody
    public ResultBean selectNews(@RequestParam(value = "newsTitle", defaultValue = "", required = false) String newsTitle,
                                 @RequestParam(value = "searchTagId", defaultValue = "-1", required = false) long searchTagId,
                                 @RequestParam(value = "searchStartTime", defaultValue = "", required = false) String searchStartTime,
                                 @RequestParam(value = "searchEndTime", defaultValue = "", required = false) String searchEndTime,
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
                searchEndTime, aOrs,  order,  pageNum,  pageSize);

    }

    @PostMapping("/detailNews")
    @ResponseBody
    public ResultBean detailNews(@RequestParam(value = "newsId", required = true) long newsId,
                                 HttpServletRequest request, HttpServletResponse response) {

//        System.out.println(newsId);

        return newsDealService.detailNews(newsId);

    }

}