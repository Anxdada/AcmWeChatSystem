package com.example.acm.controller;

import com.example.acm.common.ResultBean;
import com.example.acm.common.ResultCode;
import com.example.acm.entity.User;
import com.example.acm.mapper.AnnouncementTagMapper;
import com.example.acm.service.deal.AnnouncementTagDealService;
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
@RequestMapping(value = "/announcementtag")
public class AnnouncementTagController extends BaseController {


    private final Long longTwo = Long.parseLong(String.valueOf(2));

    @Autowired
    private AnnouncementTagDealService announcementTagDealService; // 直接测试

    /**
     * 添加公告类别
     *
     * @param announcementTagName 公告类别名称
     * @param announcementTagColor 公告类别颜色
     * @return 结果
     */
    @PostMapping("/addAnnouncementTag")
    @ResponseBody
    public ResultBean addAnnouncementTag(@RequestParam(value = "announcementTagName", required = true) String announcementTagName,
                                         @RequestParam(value = "announcementTagColor", required = true) String announcementTagColor,
                                         HttpServletRequest request, HttpServletResponse response) {

//        System.out.println("addAnnouncementTag");
//        System.out.println(" " + announcementTagName + " " + announcementTagColor);

        try {

            User user = getUserIdFromSession(request);
            if (user == null) {
                // 如果忘记传头部信息过来, 默认设置为超级管理员的改动
                user = new User();
                user.setUserId(longTwo);
            }

            return announcementTagDealService.addAnnouncementTag(user, announcementTagName, announcementTagColor);

        } catch (Exception e) {
            // log
            e.printStackTrace();
            return new ResultBean(ResultCode.SYSTEM_FAILED);
        }
    }

    /**
     * 需要检测是否还有该类别公告存在, 有的话不能删除!
     *
     * @param announcementTagId 删除的公告类别id
     * @return
     */
    @PostMapping("/deleteAnnouncementTag")
    @ResponseBody
    public ResultBean deleteAnnouncementTag(@RequestParam(value = "announcementTagId", required = true) long announcementTagId,
                                            HttpServletRequest request, HttpServletResponse response) {

//        System.out.println("deleteAnnouncementTag");
//        System.out.println(announcementTagId);

        try {

            User user = getUserIdFromSession(request);
            if (user == null) {
                // 如果忘记传头部信息过来, 默认设置为超级管理员的改动
                user = new User();
                user.setUserId(longTwo);
            }

            return announcementTagDealService.deleteAnnouncementTag(user, announcementTagId);

        } catch (Exception e) {
            // log
            e.printStackTrace();
            return new ResultBean(ResultCode.SYSTEM_FAILED);
        }
    }

    /**
     *
     * @param announcementTagId id
     * @param announcementTagName 公告类别名称
     * @param announcementTagColor 公告类别颜色
     * @return
     */
    @PostMapping("/updateAnnouncementTag")
    @ResponseBody
    public ResultBean updateAnnouncementTag(@RequestParam(value = "announcementTagId", required = true) long announcementTagId,
                                            @RequestParam(value = "announcementTagName", required = true) String announcementTagName,
                                            @RequestParam(value = "announcementTagColor", required = true) String announcementTagColor,
                                            HttpServletRequest request, HttpServletResponse response) {

//        System.out.println("updateAnnouncementTag");
//        System.out.println(announcementTagId + " " + announcementTagName + " " + announcementTagColor);
//
//        System.out.println(request.getHeader("Content-Type"));


        try {

            User user = getUserIdFromSession(request);
            if (user == null) {
                // 如果忘记传头部信息过来, 默认设置为超级管理员的改动
                user = new User();
                user.setUserId(longTwo);
            }

            return announcementTagDealService.updateAnnouncementTag(user, announcementTagId, announcementTagName, announcementTagColor);

        } catch (Exception e) {
            // log
            e.printStackTrace();
            return new ResultBean(ResultCode.SYSTEM_FAILED);
        }

    }

    /**
     *
     * @param announcementTagName
     * @param aOrs
     * @param order
     * @param pageNum
     * @param pageSize 这个字段可能很大是为了区分是类别表(10)查询还是 公告表(100), 设计到数据库中是否分页查询, 后者就不分页了..
     * @param request
     * @param response
     * @return
     */
    @PostMapping("/selectAnnouncementTag")
    @ResponseBody
    public ResultBean selectAnnouncement(@RequestParam(value = "announcementTagName", defaultValue = "", required = false) String announcementTagName,
                                         @RequestParam(value = "aOrs", defaultValue = "1", required = false) int aOrs,
                                         @RequestParam(value = "order", defaultValue = "createTime", required = false) String order,
                                         @RequestParam(value = "pageNum", defaultValue = "1", required = false) int pageNum,
                                         @RequestParam(value = "pageSize", defaultValue="10", required = false) int pageSize,
                                         HttpServletRequest request, HttpServletResponse response) {

//        System.out.println("xierenyi");
//        System.out.println(announcementTagName);
//        System.out.println( " " + order);

        try {

            User user = getUserIdFromSession(request);
            if (user == null) {
                // 如果忘记传头部信息过来, 默认设置为超级管理员的改动
                user = new User();
                user.setUserId(longTwo);
            }

            return announcementTagDealService.selectAnnouncementTag(announcementTagName, aOrs,  order,  pageNum,  pageSize);

        } catch (Exception e) {
            // log
            e.printStackTrace();
            return new ResultBean(ResultCode.SYSTEM_FAILED);
        }
    }

    /**
     *
     * @param announcementTagId 公告类别id
     * @return
     */
    @PostMapping("/detailAnnouncementTag")
    @ResponseBody
    public ResultBean detailAnnouncementTag(@RequestParam(value = "announcementTagId", required = true) long announcementTagId,
                                            HttpServletRequest request, HttpServletResponse response) {

//        System.out.println("detailAnnouncementTag");
//        System.out.println(" " + announcementTagId);

        try {

            return announcementTagDealService.detailAnnouncementTag(announcementTagId);

        } catch (Exception e) {
            // log
            e.printStackTrace();
            return new ResultBean(ResultCode.SYSTEM_FAILED);
        }
    }

}
