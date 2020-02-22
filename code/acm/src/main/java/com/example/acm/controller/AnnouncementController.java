package com.example.acm.controller;

import com.example.acm.common.ResultBean;
import com.example.acm.common.ResultCode;
import com.example.acm.entity.Announcement;
import com.example.acm.entity.User;
import com.example.acm.service.AnnouncementService;
import com.example.acm.service.UserService;
import com.example.acm.service.deal.AnnouncementDealService;
import com.example.acm.service.deal.OnDutyDealService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Map;

/**
 * (Announcement)表控制层
 *
 * @author makejava
 * @since 2020-02-18 00:00:46
 */
@Controller
@RequestMapping(value = "/announcement")
public class AnnouncementController extends BaseController {

    private Logger LOG = LoggerFactory.getLogger(this.getClass());

    private final int two = 2;
    private final Long longTwo = Long.parseLong(String.valueOf(2));

    @Autowired
    private AnnouncementDealService announcementDealService;


    @PostMapping("/addAnnouncement")
    @ResponseBody
    public ResultBean addAnnouncement(@RequestParam(value = "announcementTitle", required = true) String announcementTitle,
                                      @RequestParam(value = "announcementBody", required = true) String announcementBody,
                                      @RequestParam(value = "announcementTagId", required = true) long announcementTagId,
                                      @RequestParam(value = "isRegister", required = true) int isRegister,
                                      @RequestParam(value = "registerStartTime", defaultValue = "", required = false) String registerStartTime,
                                      @RequestParam(value = "registerEndTime", defaultValue = "", required = false) String registerEndTime,
                                      @RequestParam(value = "startTime", defaultValue = "", required = false) String startTime,
                                      @RequestParam(value = "lastTime", defaultValue = "", required = false) String lastTime,
                                      @RequestParam(value = "isPublish", required = true) int isPublish,
                                      HttpServletRequest request, HttpServletResponse response) {


        User user = getUserIdFromSession(request);
        if (user == null) {
            user = new User();
            user.setUserId(longTwo);
        }

        return announcementDealService.addAnnouncement(user, announcementTitle, announcementBody, announcementTagId,
                isRegister, registerStartTime, registerEndTime, startTime, lastTime, isPublish);

    }

    @PostMapping("/deleteAnnouncement")
    @ResponseBody
    public ResultBean deleteAnnouncement(@RequestParam(value = "announcementId", required = true) long announcementId,
                                   HttpServletRequest request, HttpServletResponse response) {

//        System.out.println(announcementId);

        User user = getUserIdFromSession(request);
        if (user == null) {
            user = new User();
            user.setUserId(longTwo);
        }

        return announcementDealService.deleteAnnouncement(user, announcementId);

    }

    @PostMapping("/updateAnnouncement")
    @ResponseBody
    public ResultBean updateAnnouncement(@RequestParam(value = "announcementId", required = true) long announcementId,
                                         @RequestParam(value = "announcementTitle", required = true) String announcementTitle,
                                         @RequestParam(value = "announcementBody", required = true) String announcementBody,
                                         @RequestParam(value = "announcementTagId", required = true) long announcementTagId,
                                         @RequestParam(value = "isRegister", required = true) int isRegister,
                                         @RequestParam(value = "registerStartTime", defaultValue = "", required = false) String registerStartTime,
                                         @RequestParam(value = "registerEndTime", defaultValue = "", required = false) String registerEndTime,
                                         @RequestParam(value = "startTime", defaultValue = "", required = false) String startTime,
                                         @RequestParam(value = "lastTime", defaultValue = "", required = false) String lastTime,
                                         @RequestParam(value = "isPublish", required = true) int isPublish,
                                         HttpServletRequest request, HttpServletResponse response) {

//        System.out.println("Xie");
//        System.out.println(announcementTitle);
//        System.out.println(" " + announcementBody);
//        System.out.println(" " + announcementTagId);
//        System.out.println(" " + isRegister);
//        System.out.println(" " + registerStartTime);

        User user = getUserIdFromSession(request);
        if (user == null) {
            user = new User();
            user.setUserId(longTwo);
        }

        return announcementDealService.updateAnnouncement(user, announcementId, announcementTitle, announcementBody, announcementTagId,
                isRegister, registerStartTime, registerEndTime, startTime, lastTime, isPublish);
    }


    @PostMapping("/selectAnnouncement")
    @ResponseBody
    public ResultBean selectAnnouncement(@RequestParam(value = "announcementTitle", defaultValue = "", required = false) String announcementTitle,
                                         @RequestParam(value = "searchTagId", defaultValue = "-1", required = false) long searchTagId,
                                           @RequestParam(value = "searchStartTime", defaultValue = "", required = false) String searchStartTime,
                                           @RequestParam(value = "searchEndTime", defaultValue = "", required = false) String searchEndTime,
                                           @RequestParam(value = "aOrs", defaultValue = "1", required = false) int aOrs,
                                           @RequestParam(value = "order", defaultValue = "createTime", required = false) String order,
                                           @RequestParam(value = "pageNum", defaultValue = "1", required = false) int pageNum,
                                           @RequestParam(value = "pageSize", defaultValue="10", required = false) int pageSize,
                                           HttpServletRequest request, HttpServletResponse response) {

//        System.out.println("xierenyi");
//        System.out.println(announcementTitle);
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

        return announcementDealService.selectAnnouncement(announcementTitle, searchTagId, searchStartTime,
                                                searchEndTime, aOrs,  order,  pageNum,  pageSize);

    }

    @PostMapping("/detailAnnouncement")
    @ResponseBody
    public ResultBean detailAnnouncement(@RequestParam(value = "announcementId", required = true) long announcementId,
                                         HttpServletRequest request, HttpServletResponse response) {

//        System.out.println(announcementId);

        return announcementDealService.detailAnnouncement(announcementId);

    }

}