package com.example.acm.controller;

import com.example.acm.common.ResultBean;
import com.example.acm.common.ResultCode;
import com.example.acm.entity.User;
import com.example.acm.service.deal.NewsTagDealService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @author xierenyi
 * @version 1.0
 * @date 2020-02-18 11:57
 */
@Controller
@RequestMapping(value = "/newstag")
public class NewsTagController extends BaseController {


    private final Long longTwo = Long.parseLong(String.valueOf(2));

    @Autowired
    private NewsTagDealService newsTagDealService; // 直接测试

    /**
     * 添加新闻类别
     *
     * @param newsTagName 新闻类别名称
     * @param newsTagColor 新闻类别颜色
     * @return 结果
     */
    @PostMapping("/addNewsTag")
    @ResponseBody
    public ResultBean addNewsTag(@RequestParam(value = "newsTagName", required = true) String newsTagName,
                                 @RequestParam(value = "newsTagColor", required = true) String newsTagColor,
                                 HttpServletRequest request, HttpServletResponse response) {

//        System.out.println("addNewsTag");
//        System.out.println(" " + newsTagName + " " + newsTagColor);

        try {

            User user = getUserIdFromSession(request);
            if (user == null) {
                // 如果忘记传头部信息过来, 默认设置为超级管理员的改动
                user = new User();
                user.setUserId(longTwo);
            }

            return newsTagDealService.addNewsTag(user, newsTagName, newsTagColor);

        } catch (Exception e) {
            // log
            e.printStackTrace();
            return new ResultBean(ResultCode.SYSTEM_FAILED);
        }
    }

    /**
     * 需要检测是否还有该类别新闻存在, 有的话不能删除!
     *
     * @param newsTagId 删除的新闻类别id
     * @return
     */
    @PostMapping("/deleteNewsTag")
    @ResponseBody
    public ResultBean deleteNewsTag(@RequestParam(value = "newsTagId", required = true) long newsTagId,
                                    HttpServletRequest request, HttpServletResponse response) {

//        System.out.println("deleteNewsTag");
//        System.out.println(newsTagId);

        try {

            User user = getUserIdFromSession(request);
            if (user == null) {
                // 如果忘记传头部信息过来, 默认设置为超级管理员的改动
                user = new User();
                user.setUserId(longTwo);
            }

            return newsTagDealService.deleteNewsTag(user, newsTagId);

        } catch (Exception e) {
            // log
            e.printStackTrace();
            return new ResultBean(ResultCode.SYSTEM_FAILED);
        }
    }

    /**
     *
     * @param newsTagId id
     * @param newsTagName 新闻类别名称
     * @param newsTagColor 新闻类别颜色
     * @return
     */
    @PostMapping("/updateNewsTag")
    @ResponseBody
    public ResultBean updateNewsTag(@RequestParam(value = "newsTagId", required = true) long newsTagId,
                                    @RequestParam(value = "newsTagName", required = true) String newsTagName,
                                    @RequestParam(value = "newsTagColor", required = true) String newsTagColor,
                                    HttpServletRequest request, HttpServletResponse response) {

//        System.out.println("updateNewsTag");
//        System.out.println(" " + newsTagName + " " + newsTagColor);

        try {

            User user = getUserIdFromSession(request);
            if (user == null) {
                // 如果忘记传头部信息过来, 默认设置为超级管理员的改动
                user = new User();
                user.setUserId(longTwo);
            }

            return newsTagDealService.updateNewsTag(user, newsTagId, newsTagName, newsTagColor);

        } catch (Exception e) {
            // log
            e.printStackTrace();
            return new ResultBean(ResultCode.SYSTEM_FAILED);
        }

    }

    /**
     *
     * @param newsTagName
     * @param aOrs
     * @param order
     * @param pageNum
     * @param pageSize 这个字段可能很大是为了区分是类别表(10)查询还是 新闻表(100), 设计到数据库中是否分页查询, 后者就不分页了..
     * @param request
     * @param response
     * @return
     */
    @PostMapping("/selectNewsTag")
    @ResponseBody
    public ResultBean selectNewsTag(@RequestParam(value = "newsTagName", defaultValue = "", required = false) String newsTagName,
                                 @RequestParam(value = "aOrs", defaultValue = "1", required = false) int aOrs,
                                 @RequestParam(value = "order", defaultValue = "createTime", required = false) String order,
                                 @RequestParam(value = "pageNum", defaultValue = "1", required = false) int pageNum,
                                 @RequestParam(value = "pageSize", defaultValue="10", required = false) int pageSize,
                                 HttpServletRequest request, HttpServletResponse response) {

//        System.out.println("xierenyi");
//        System.out.println(newsTagName);
//        System.out.println( " " + order);

        try {

            User user = getUserIdFromSession(request);
            if (user == null) {
                // 如果忘记传头部信息过来, 默认设置为超级管理员的改动
                user = new User();
                user.setUserId(longTwo);
            }

            return newsTagDealService.selectNewsTag(newsTagName, aOrs,  order,  pageNum,  pageSize);

        } catch (Exception e) {
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
    @PostMapping("/detailNewsTag")
    @ResponseBody
    public ResultBean detailNewsTag(@RequestParam(value = "newsTagId", required = true) long newsTagId,
                                    HttpServletRequest request, HttpServletResponse response) {

//        System.out.println("detailNewsTag");
//        System.out.println(" " + newsTagId);

        try {

            return newsTagDealService.detailNewsTag(newsTagId);

        } catch (Exception e) {
            // log
            e.printStackTrace();
            return new ResultBean(ResultCode.SYSTEM_FAILED);
        }
    }

}