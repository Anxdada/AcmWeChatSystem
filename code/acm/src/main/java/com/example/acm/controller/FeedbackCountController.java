package com.example.acm.controller;

import com.example.acm.common.ResultBean;
import com.example.acm.common.ResultCode;
import com.example.acm.entity.User;
import com.example.acm.service.deal.FeedbackCountDealService;
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
 * @date 2020-02-15 18:33
 */
@Controller
@RequestMapping("/feedbackCount")
public class FeedbackCountController extends BaseController {

    private Logger LOG = LoggerFactory.getLogger(this.getClass());

    private final Long longTwo = Long.parseLong(String.valueOf(2));

    @Autowired
    private FeedbackCountDealService feedbackCountDealService;

    /**
     * 添加一个对反馈评论操作
     *
     */
    @PostMapping("addFeedbackCount")
    @ResponseBody
    public ResultBean addFeedbackCount(@RequestParam(value = "feedbackId", required = true) long feedbackId,
                                       @RequestParam(value = "type", defaultValue = "1", required = false) int type,
                                       HttpServletRequest request, HttpServletResponse response) {

//        System.out.println("addFeedbackCount " + feedbackId + " " + type);

        User user = getUserIdFromSession(request);
        if (user == null) {
            user = new User();
            user.setUserId(longTwo);
        }

        return feedbackCountDealService.addFeedbackCount(user, feedbackId, type);
    }

    /**
     * 修改一个对反馈评论操作
     *
     */
    @PostMapping("deleteFeedbackCount")
    @ResponseBody
    public ResultBean deleteFeedbackCount(@RequestParam(value = "feedbackId", required = true) long feedbackId,
                                          HttpServletRequest request, HttpServletResponse response) {

//        System.out.println("deleteFeedbackCount " + feedbackId);

        User user = getUserIdFromSession(request);
        if (user == null) {
            user = new User();
            user.setUserId(longTwo);
        }

        return feedbackCountDealService.deleteFeedbackCount(user, feedbackId);
    }

    /**
     * 删除一个对反馈评论操作
     *
     */
    @PostMapping("updateFeedbackCount")
    @ResponseBody
    public ResultBean updateFeedbackCount(@RequestParam(value = "feedbackId", required = true) long feedbackId,
                                          @RequestParam(value = "type", defaultValue = "1", required = false) int type,
                                          HttpServletRequest request, HttpServletResponse response) {

//        System.out.println("updateFeedbackCount " + feedbackId + " " + type);

        User user = getUserIdFromSession(request);
        if (user == null) {
            user = new User();
            user.setUserId(longTwo);
        }

        return feedbackCountDealService.updateFeedbackCount(user, feedbackId, type);
    }
}
