package com.example.acm.controller;

import com.example.acm.common.ResultBean;
import com.example.acm.common.ResultCode;
import com.example.acm.config.RedisComponent;
import com.example.acm.entity.User;
import com.example.acm.service.UserService;
import com.example.acm.service.deal.CommentDealService;
import com.example.acm.service.deal.ReplyDealService;
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
 * @date 2020-03-07 22:50
 */
@Controller
@RequestMapping(value = "/reply")
public class ReplyController extends BaseController {
    private Logger LOG = LoggerFactory.getLogger(this.getClass());

    private final int two = 2;
    private final Long longTwo = Long.parseLong(String.valueOf(2));

    @Autowired
    private ReplyDealService replyDealService;

    @Autowired
    private CommentDealService commentDealService;

    @Autowired
    private UserService userService;

    // 点赞操作的redis
    @Autowired
    private RedisComponent redisComponent;

    @PostMapping("/addReply")
    @ResponseBody
    public ResultBean addReply(@RequestParam(value = "replyBody", required = true) String replyBody,
                               @RequestParam(value = "replyCommentId", required = true) long replyCommentId,
                               @RequestParam(value = "reverseReplyId", defaultValue = "-1", required = false) long reverseReplyId,
                               HttpServletRequest request, HttpServletResponse response) {

//        System.out.println(replyCommentId);
//        System.out.println(" " + reverseReplyId);

        User user = getUserIdFromSession(request);
        if (user == null) {
            user = new User();
            user.setUserId(longTwo);
        }

        return replyDealService.addReply(user, replyBody, replyCommentId, reverseReplyId);
    }

    @PostMapping("/deleteReply")
    @ResponseBody
    public ResultBean deleteReply(@RequestParam(value = "replyId",  required = true) long replyId,
                                  HttpServletRequest request, HttpServletResponse response) {

//        System.out.println(replyId);

        User user = getUserIdFromSession(request);
        if (user == null) {
            user = new User();
            user.setUserId(longTwo);
        }

        return replyDealService.deleteReply(user, replyId);

    }

    // 回复和评论默认都是升序
    @PostMapping("/selectReply")
    @ResponseBody
    public ResultBean selectReply(@RequestParam(value = "replyCommentId", required = true) long replyCommentId,
                                  @RequestParam(value = "aOrs", defaultValue = "0", required = false) int aOrs,
                                  @RequestParam(value = "order", defaultValue = "createTime", required = false) String order,
                                  @RequestParam(value = "pageNum", defaultValue = "1", required = false) int pageNum,
                                  @RequestParam(value = "pageSize", defaultValue="10", required = false) int pageSize,
                                  HttpServletRequest request, HttpServletResponse response) {

//        System.out.println("xierenyi");
//        System.out.println(" " + replyCommentId);

        User user = getUserIdFromSession(request);
        if (user == null) {
            // 如果忘记传头部信息过来, 默认设置为超级管理员的改动
            user = new User();
            user.setUserId(longTwo);
        }

        return replyDealService.selectReply(user, replyCommentId, aOrs,  order,  pageNum,  pageSize);
    }

    // 回复和评论的点赞功能, 高度相似, 就同一个函数, 写在reply下了
    // id 是 commentId or replyId
    @PostMapping("/changeLike")
    @ResponseBody
    public ResultBean changeLike(@RequestParam(value = "type",  required = true) String type,
                                  @RequestParam(value = "id",  required = true) long id,
                                  @RequestParam(value = "uid",  required = true) int uid,
                                  @RequestParam(value = "like",  required = true) int like,
                                  HttpServletRequest request, HttpServletResponse response) {

//        System.out.println(replyId + " " + uid + " " + like);

        User user = getUserIdFromSession(request);
        if (user == null) {
            user = new User();
            user.setUserId(longTwo);
        }

        redisComponent.setCommentReplyLike(type, id, uid, like);
        // 目前只有评论和回复才会做到这
//        System.out.println(type);
//        System.out.println(type == "comment"); // 字符串不能这样判断了? 有时间研究下..
        if (type.equals("comment")) commentDealService.updateComment(user, id);
        else replyDealService.updateReply(user, id);
        return new ResultBean(ResultCode.SUCCESS);
    }
}
