package com.example.acm.controller;

import com.example.acm.common.ResultBean;
import com.example.acm.entity.User;
import com.example.acm.service.deal.FriendUrlDealService;
import com.example.acm.service.deal.ReportDealService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.text.SimpleDateFormat;

/**
 * @author Anxdada
 * @version 1.0
 * @date 2020-05-01 17:24
 */
@Controller
@RequestMapping("/report")
public class ReportController extends BaseController {

    private Logger LOG = LoggerFactory.getLogger(this.getClass());

    private final int two = 2;
    private final Long longTwo = Long.parseLong(String.valueOf(2));

    @Autowired
    private ReportDealService reportDealService;

    @PostMapping("/addReport")
    @ResponseBody
    public ResultBean addReport(@RequestParam(value = "type", required = true) String type,
                                @RequestParam(value = "typeId", required = true) int typeId,
                                @RequestParam(value = "reportBody", required = true) String reportBody,
                                @RequestParam(value = "reason", required = true) String reason,
                                HttpServletRequest request, HttpServletResponse response) {
        User user = getUserIdFromSession(request);
//        System.out.println(friendUrlName + " " + friendUrlAddress + " " + friendUrlTag + " ");
        if (user == null) {
            //return new ResultBean(ResultCode.SESSION_OUT);
            user = new User();
            user.setUserId(longTwo);
        }

        return reportDealService.addReport(user, type, typeId, reportBody, reason);

    }

    @PostMapping("/updateReport")
    @ResponseBody
    public ResultBean updateReport(@RequestParam(value = "reportId", required = true) long reportId,
                                   @RequestParam(value = "result", defaultValue = "无", required = false) String result,
                                   @RequestParam(value = "isHandle", required = true) int isHandle,
                                   HttpServletRequest request, HttpServletResponse response) {
        User user = getUserIdFromSession(request);
//        System.out.println(friendUrlName + " " + friendUrlAddress + " " + friendUrlTag + " ");
        if (user == null) {
            //return new ResultBean(ResultCode.SESSION_OUT);
            user = new User();
            user.setUserId(longTwo);
        }

        return reportDealService.updateReport(user, reportId, result, isHandle);

    }

    @PostMapping("/selectReport")
    @ResponseBody
    public ResultBean selectReport(@RequestParam(value = "createUser", defaultValue = "-1", required = false) long createUser,
                                    @RequestParam(value = "aOrs", defaultValue = "1", required = false) int aOrs,
                                   @RequestParam(value = "order", defaultValue = "createTime", required = false) String order,
                                   @RequestParam(value = "pageNum", defaultValue = "1", required = false) int pageNum,
                                   @RequestParam(value = "pageSize", defaultValue="10", required = false) int pageSize,
                                   HttpServletRequest request, HttpServletResponse response) {
        User user = getUserIdFromSession(request);
        //System.out.println(friendUrlName + " " + aOrs + " " + pageNum + " " + order + " " + pageSize);
        if (user == null) {
            // 如果忘记传头部信息过来, 默认设置为超级管理员的改动
            user = new User();
            user.setUserId(longTwo);
        }

        return reportDealService.selectReport(createUser, aOrs,  order,  pageNum,  pageSize);

    }
}
