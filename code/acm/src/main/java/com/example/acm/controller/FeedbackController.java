package com.example.acm.controller;

import com.example.acm.common.ResultBean;
import com.example.acm.common.ResultCode;
import com.example.acm.common.SysConst;
import com.example.acm.entity.Feedback;
import com.example.acm.entity.User;
import com.example.acm.service.FeedbackService;
import com.example.acm.service.UserService;
import com.example.acm.service.deal.FeedbackDealService;
import com.example.acm.utils.DateUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author xierenyi
 * @version 1.0
 * @date 2020-02-15 16:23
 */
@Controller
@RequestMapping("/feedback")
public class FeedbackController extends BaseController {

    private Logger LOG = LoggerFactory.getLogger(this.getClass());

    private final Long longTwo = Long.parseLong(String.valueOf(2));

    @Autowired
    private FeedbackDealService feedbackDealService;

    @PostMapping("/addFeedback")
    @ResponseBody
    public ResultBean addFeedback(@RequestParam(value = "feedbackBody", required = true) String feedbackBody,
                                  HttpServletRequest request, HttpServletResponse response) {

        User user = getUserIdFromSession(request);
        if (user == null) {
            user = new User();
            user.setUserId(longTwo);
        }

        return feedbackDealService.addFeedback(user, feedbackBody);
    }

    @PostMapping("/deleteFeedback")
    @ResponseBody
    public ResultBean deleteFeedback(@RequestParam(value = "feedbackId", required = true) long feedbackId,
                                     HttpServletRequest request, HttpServletResponse response) {

//        System.out.println("deleteFeedback " + feedbackId);

        return feedbackDealService.deleteFeedback(feedbackId);
    }

    @PostMapping("/updateFeedback")
    @ResponseBody
    public ResultBean updateFeedback(@RequestParam(value = "feedbackId", required = true) long feedbackId,
                                     @RequestParam(value = "feedbackBody", defaultValue = "空值", required = false) String feedbackBody,
                                     HttpServletRequest request, HttpServletResponse response) {

//        System.out.println("updateFeedback " + feedbackId + " " + feedbackBody);

        return feedbackDealService.updateFeedback(feedbackId, feedbackBody);
    }

    @GetMapping("/selectFeedback")
    @ResponseBody
    public ResultBean selectFeedback(HttpServletRequest request, HttpServletResponse response) {

        User user = getUserIdFromSession(request);
        if (user == null) {
            user = new User();
            user.setUserId(longTwo);
        }

        return feedbackDealService.selectFeedback(user);
    }

}
