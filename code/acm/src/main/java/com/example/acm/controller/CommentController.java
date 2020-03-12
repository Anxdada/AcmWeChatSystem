package com.example.acm.controller;

import com.example.acm.common.ResultBean;
import com.example.acm.entity.User;
import com.example.acm.service.UserService;
import com.example.acm.service.deal.CommentDealService;
import com.example.acm.service.deal.PostDealService;
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
 * @author xierenyi
 * @version 1.0
 * @date 2020-03-06 10:48
 */
@Controller
@RequestMapping(value = "/comment")
public class CommentController extends BaseController {
    private Logger LOG = LoggerFactory.getLogger(this.getClass());

    private final int two = 2;
    private final Long longTwo = Long.parseLong(String.valueOf(2));

    @Autowired
    private CommentDealService commentDealService;

    @Autowired
    private UserService userService;

    @PostMapping("/addComment")
    @ResponseBody
    public ResultBean addComment(@RequestParam(value = "commentBody", required = true) String commentBody,
                                 @RequestParam(value = "replyPostId", required = true) long replyPostId,
                                  HttpServletRequest request, HttpServletResponse response) {

//        System.out.println(commentBody);
//        System.out.println(" " + replyPostId);

        User user = getUserIdFromSession(request);
        if (user == null) {
            user = new User();
            user.setUserId(longTwo);
        }

        return commentDealService.addComment(user, commentBody, replyPostId);
    }

    @PostMapping("/deleteComment")
    @ResponseBody
    public ResultBean deleteComment(@RequestParam(value = "commentId",  required = true) long commentId,
                                 HttpServletRequest request, HttpServletResponse response) {

//        System.out.println(commentId);

        User user = getUserIdFromSession(request);
        if (user == null) {
            user = new User();
            user.setUserId(longTwo);
        }

        return commentDealService.deleteComment(user, commentId);

    }

    // 回复和评论默认都是升序
    @PostMapping("/selectComment")
    @ResponseBody
    public ResultBean selectComment(@RequestParam(value = "replyPostId", required = true) long replyPostId,
                                 @RequestParam(value = "aOrs", defaultValue = "1", required = false) int aOrs,
                                 @RequestParam(value = "order", defaultValue = "createTime", required = false) String order,
                                 @RequestParam(value = "pageNum", defaultValue = "0", required = false) int pageNum,
                                 @RequestParam(value = "pageSize", defaultValue="10", required = false) int pageSize,
                                 HttpServletRequest request, HttpServletResponse response) {

//        System.out.println("xierenyi");
//        System.out.println(" " + replyPostId);
//        System.out.println( " " + replyCommentId);

        User user = getUserIdFromSession(request);
        if (user == null) {
            // 如果忘记传头部信息过来, 默认设置为超级管理员的改动
            user = new User();
            user.setUserId(longTwo);
        }

        return commentDealService.selectComment(user, replyPostId, aOrs,  order,  pageNum,  pageSize);
    }
}
