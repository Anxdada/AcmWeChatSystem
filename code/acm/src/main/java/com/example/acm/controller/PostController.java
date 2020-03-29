package com.example.acm.controller;

import com.example.acm.common.ResultBean;
import com.example.acm.common.ResultCode;
import com.example.acm.entity.Post;
import com.example.acm.entity.User;
import com.example.acm.service.PostService;
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
    private PostService postService;

    @Autowired
    private UserService userService;


    @PostMapping("/addPost")
    @ResponseBody
    public ResultBean addPost(@RequestParam(value = "postTitle", defaultValue = "", required = false) String postTitle,
                              @RequestParam(value = "postTag", defaultValue = "-1", required = false) int postTag,
                              @RequestParam(value = "postBody", defaultValue = "", required = false) String postBody,
                              @RequestParam(value = "firstImg", defaultValue = "", required = false) String firstImg,
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

        return postDealService.addPost(user, postTitle, postTag,  postBody, firstImg);

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
                                 @RequestParam(value = "firstImg", defaultValue = "", required = false) String firstImg,
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

        return postDealService.updatePost(user, postId, postTitle, postTag, postBody, isHead, isGreat, isHot, firstImg);

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

        User user = getUserIdFromSession(request);
        if (user == null) {
            // 如果忘记传头部信息过来, 默认设置为超级管理员的改动
            user = new User();
            user.setUserId(longTwo);
        }

        try {
            // log
            return postDealService.detailPost(user, postId);
        } catch (Exception e) {
            // log
            return new ResultBean(ResultCode.SYSTEM_FAILED);
        }
    }

    // 更新帖子的浏览量 和 点赞数
    // 前者只能在手机端做, 后者使用redis储存
    // 因为点赞后台和手机都能做, 所以通过view的值判断是那个传来的.
    @PostMapping("/updatePostViewAndLike")
    @ResponseBody
    public ResultBean updateNewsViewAndLike(@RequestParam(value = "postId", required = true) long postId,
                                            @RequestParam(value = "views", required = true) int views,
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

            List<Post> listPost = postService.findPostListByPostId(postId);

            if (listPost.isEmpty()) {
                return new ResultBean(ResultCode.SQL_NULL_RECODE, "不存在该帖子");
            }

            Post post = listPost.get(0);
            int oldLike = post.getLike();

            // 更新点赞
            String key = "post" + postId;
            redisComponent.setTypeUidLike("post", postId, uid, like);
            int newLike = (int)redisComponent.getSizeSetForKey(key);

//            System.out.println(views);
//            System.out.println(newLike);

            // 从电脑端的需求, 则不更新数据库, 优化一部分需求
            // 但是点赞数也需要更新, 所以加一个条件共同限制更新, 注意mysql只维护了点赞数的多少
            if (views == -1 && oldLike == newLike) return new ResultBean(ResultCode.SUCCESS);

            post.setViews(views);
            post.setLike(newLike);

            postService.updatePost(post);

            return new ResultBean(ResultCode.SUCCESS);

        } catch (Exception e) {
            // log
            e.printStackTrace();
            return new ResultBean(ResultCode.SYSTEM_FAILED, String.valueOf(e));
        }

    }
}
