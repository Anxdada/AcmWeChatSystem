package com.example.acm.controller;

import com.example.acm.common.ResultBean;
import com.example.acm.common.ResultCode;
import com.example.acm.entity.User;
import com.example.acm.service.UserService;
import com.example.acm.service.deal.OnDutyDealService;
import com.example.acm.service.deal.PostDealService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Map;

/**
 * @author xierenyi
 * @version 1.0
 * @date 2020-02-29 20:31
 */
@Controller
@RequestMapping(value = "/post")
public class PostController extends BaseController {

    private Logger LOG = LoggerFactory.getLogger(this.getClass());

    private final int two = 2;
    private final Long longTwo = Long.parseLong(String.valueOf(2));

    @Autowired
    private PostDealService postDealService;

    @Autowired
    private UserService userService;


    @PostMapping("/addPost")
    @ResponseBody
    public ResultBean addPost(@RequestParam(value = "postTitle", defaultValue = "", required = false) String postTitle,
                              @RequestParam(value = "postTag", defaultValue = "-1", required = false) int postTag,
                              @RequestParam(value = "postBody", defaultValue = "", required = false) String postBody,
                              HttpServletRequest request, HttpServletResponse response) {
//        System.out.println("xiexie");
//        System.out.println(postTitle);
//        System.out.println( " " + postTag);
//        System.out.println(" " + postBody);


        User user = getUserIdFromSession(request);
        if (user == null) {
            user = new User();
            user.setUserId(longTwo);
        }

        return postDealService.addPost(user, postTitle, postTag,  postBody);

    }

    @PostMapping("/deletePost")
    @ResponseBody
    public ResultBean deletePost(@RequestParam(value = "postId",  required = true) long postId,
                                   HttpServletRequest request, HttpServletResponse response) {

//        System.out.println(onDutyId);

        User user = getUserIdFromSession(request);
        if (user == null) {
            user = new User();
            user.setUserId(longTwo);
        }

        return postDealService.deletePost(user, postId);

    }

    @PostMapping("/updatePost")
    @ResponseBody
    public ResultBean updatePost(@RequestParam(value = "postId",  required = true) long postId,
                                 @RequestParam(value = "postTitle", defaultValue = "", required = false) String postTitle,
                                 @RequestParam(value = "postTag", defaultValue = "-1", required = false) int postTag,
                                 @RequestParam(value = "postBody", defaultValue = "", required = false) String postBody,
                                 @RequestParam(value = "isHead", defaultValue = "0", required = false) int isHead,
                                 @RequestParam(value = "isGreat", defaultValue = "0", required = false) int isGreat,
                                 @RequestParam(value = "isHot", defaultValue = "0", required = false) int isHot,
                                 HttpServletRequest request, HttpServletResponse response) {

//        System.out.println("xiexie");
//        System.out.println(postId);
//        System.out.println( " " + postTitle);
//        System.out.println(" " + postTag);

        User user = getUserIdFromSession(request);
        if (user == null) {
            user = new User();
            user.setUserId(longTwo);
        }

        return postDealService.updatePost(user, postId, postTitle, postTag, postBody, isHead, isGreat, isHot);

    }


    @PostMapping("/selectPost")
    @ResponseBody
    public ResultBean selectPost(@RequestParam(value = "postTitle", defaultValue = "", required = false) String postTitle,
                                 @RequestParam(value = "postTag", defaultValue = "-1", required = false) int postTag,
                                 @RequestParam(value = "postStartTime", defaultValue = "", required = false) String postStartTime,
                                 @RequestParam(value = "postEndTime", defaultValue = "", required = false) String postEndTime,
                                 @RequestParam(value = "aOrs", defaultValue = "1", required = false) int aOrs,
                                 @RequestParam(value = "order", defaultValue = "createTime", required = false) String order,
                                 @RequestParam(value = "pageNum", defaultValue = "1", required = false) int pageNum,
                                 @RequestParam(value = "pageSize", defaultValue="10", required = false) int pageSize,
                                 HttpServletRequest request, HttpServletResponse response) {

//        System.out.println("xierenyi");
//        System.out.println(postTag);
//        System.out.println(" " + postTitle);
//        System.out.println( " " + postStartTime);
//        System.out.println( " " + postEndTime);
//        System.out.println( " " + order);
        User user = getUserIdFromSession(request);
        if (user == null) {
            // 如果忘记传头部信息过来, 默认设置为超级管理员的改动
            user = new User();
            user.setUserId(longTwo);
        }

        return postDealService.selectPost(user, postTitle, postTag, postStartTime, postEndTime, aOrs,  order,  pageNum,  pageSize);

    }


    @PostMapping("/detailPost")
    @ResponseBody
    public ResultBean detailPost(@RequestParam(value = "postId",  required = true) long postId,
                                 HttpServletRequest request, HttpServletResponse response) {

//        System.out.println(postId);

        try {
            // log
            return postDealService.detailPost(postId);
        } catch (Exception e) {
            // log
            return new ResultBean(ResultCode.SYSTEM_FAILED);
        }
    }
}
