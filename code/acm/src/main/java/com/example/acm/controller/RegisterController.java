package com.example.acm.controller;

import com.example.acm.common.ResultBean;
import com.example.acm.common.ResultCode;
import com.example.acm.entity.User;
import com.example.acm.service.RegisterService;
import com.example.acm.service.deal.RegisterDealService;
import com.fasterxml.jackson.databind.ser.Serializers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @author xierenyi
 * @version 1.0
 * @date 2020-02-21 16:57
 */
@RestController
@RequestMapping(value="/register")
public class RegisterController extends BaseController {

    private final Long longTwo = Long.parseLong(String.valueOf(2));

    @Autowired
    private RegisterDealService registerDealService;

    @PostMapping("/addRegister")
    @ResponseBody
    public ResultBean addRegister(HttpServletRequest request, HttpServletResponse response) {

        User user = getUserIdFromSession(request);
        if (user == null) {
            // 如果忘记传头部信息过来, 默认设置为超级管理员的改动
            user = new User();
            user.setUserId(longTwo);
        }

        return registerDealService.addRegister(user);

    }

    @PostMapping("/deleteRegister")
    @ResponseBody
    public ResultBean deleteRegister(@RequestParam(value = "registerId", required = true) long registerId,
                                     HttpServletRequest request, HttpServletResponse response) {

        User user = getUserIdFromSession(request);
        if (user == null) {
            // 如果忘记传头部信息过来, 默认设置为超级管理员的改动
            user = new User();
            user.setUserId(longTwo);
        }

        return registerDealService.deleteRegister(user, registerId);

    }

    @PostMapping("/updateRegister")
    @ResponseBody
    public ResultBean updateRegister(@RequestParam(value = "registerId", required = true) long registerId,
                                     @RequestParam(value = "studentId", required = true) String studentId,
                                     @RequestParam(value = "realName", required = true) String realName,
                                     HttpServletRequest request, HttpServletResponse response) {
//
//        System.out.println(registerId);
//        System.out.println(" " + studentId);
//        System.out.println(" " + realName);

        User user = getUserIdFromSession(request);
        if (user == null) {
            // 如果忘记传头部信息过来, 默认设置为超级管理员的改动
            user = new User();
            user.setUserId(longTwo);
        }

        return registerDealService.updateRegister(user, registerId, studentId, realName);

    }

    @PostMapping("/selectRegister")
    @ResponseBody
    public ResultBean selectRegister(@RequestParam(value = "announcementId", required = true) long announcementId,
                                     @RequestParam(value = "studentId", defaultValue = "", required = false) String studentId,
                                     HttpServletRequest request, HttpServletResponse response) {

        try {
//            System.out.println(announcementId + " " + studentId);

            return registerDealService.selectRegister(announcementId, studentId);
        } catch (Exception e) {
            // log
            e.printStackTrace();
            return new ResultBean(ResultCode.SYSTEM_FAILED);
        }



    }
}
