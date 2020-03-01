package com.example.acm.controller;

import com.example.acm.common.ResultBean;
import com.example.acm.common.ResultCode;
import com.example.acm.common.SysConst;
import com.example.acm.entity.User;
import com.example.acm.service.UserService;
import com.example.acm.service.deal.OnDutyDealService;
import com.example.acm.service.deal.impl.OnDutyDealServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author xierenyi
 * @version 1.0
 * @date 2020-02-14 23:23
 */
@Controller
@RequestMapping(value = "/onduty")
public class OnDutyController extends BaseController {

    private Logger LOG = LoggerFactory.getLogger(this.getClass());

    private final int two = 2;
    private final Long longTwo = Long.parseLong(String.valueOf(2));

    @Autowired
    private OnDutyDealService onDutyDealService;

    @Autowired
    private UserService userService;


    @PostMapping("/addOnDuty")
    @ResponseBody
    public ResultBean addOnDuty(@RequestParam(value = "onDutyUserName", required = true) String onDutyUserName,
                                @RequestParam(value = "onDutyTelephone", defaultValue = "", required = false) String onDutyTelephone,
                                @RequestParam(value = "onDutyStartTime", required = true) String onDutyStartTime,
                                @RequestParam(value = "onDutyEndTime", required = true) String onDutyEndTime,
                                HttpServletRequest request, HttpServletResponse response) {
//        System.out.println("xiexie");
//        System.out.println(onDutyUserName);
//        System.out.println( " " + onDutyStartTime);
//        System.out.println(" " + onDutyEndTime);
//        System.out.println( " " + onDutyTelephone);


        User user = getUserIdFromSession(request);
        if (user == null) {
            user = new User();
            user.setUserId(longTwo);
        }

        return onDutyDealService.addOnDuty(user, onDutyUserName, onDutyTelephone, onDutyStartTime,  onDutyEndTime);

    }

    @PostMapping("/deleteOnDuty")
    @ResponseBody
    public ResultBean deleteOnDuty(@RequestParam(value = "onDutyId",  required = true) long onDutyId,
                                   HttpServletRequest request, HttpServletResponse response) {

//        System.out.println(onDutyId);

        User user = getUserIdFromSession(request);
        if (user == null) {
            user = new User();
            user.setUserId(longTwo);
        }

        return onDutyDealService.deleteOnDuty(user, onDutyId);

    }

    @PostMapping("/updateOnDuty")
    @ResponseBody
    public ResultBean updateOnDuty(@RequestParam(value = "onDutyId",  required = true) long onDutyId,
                                   @RequestParam(value = "onDutyUserName", required = true) String onDutyUserName,
                                   @RequestParam(value = "onDutyTelephone", required = true) String onDutyTelephone,
                                   @RequestParam(value = "onDutyStartTime", required = true) String onDutyStartTime,
                                   @RequestParam(value = "onDutyEndTime", required = true) String onDutyEndTime,
                                   HttpServletRequest request, HttpServletResponse response) {

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        try {
            System.out.println(sdf.parse(onDutyStartTime));
        } catch (Exception e) {
            e.printStackTrace();
        }

//        System.out.println("Xie");
//        System.out.println(onDutyUserName + " " + onDutyStartTime + " " + onDutyEndTime + " " + onDutyTelephone);


        User user = getUserIdFromSession(request);
        if (user == null) {
            user = new User();
            user.setUserId(longTwo);
        }

        return onDutyDealService.updateOnDuty(user, onDutyId, onDutyUserName, onDutyTelephone, onDutyStartTime, onDutyEndTime);

    }


    @PostMapping("/selectOnDuty")
    @ResponseBody
    public ResultBean selectOnDuty(@RequestParam(value = "onDutyUserName", defaultValue = "", required = false) String onDutyUserName,
                                   @RequestParam(value = "onDutyStartTime", defaultValue = "", required = false) String onDutyStartTime,
                                   @RequestParam(value = "onDutyEndTime", defaultValue = "", required = false) String onDutyEndTime,
                                   @RequestParam(value = "aOrs", defaultValue = "1", required = false) int aOrs,
                                   @RequestParam(value = "order", defaultValue = "onDutyStartTime", required = false) String order,
                                   @RequestParam(value = "pageNum", defaultValue = "1", required = false) int pageNum,
                                   @RequestParam(value = "pageSize", defaultValue="10", required = false) int pageSize,
                                   HttpServletRequest request, HttpServletResponse response) {

//        System.out.println("xierenyi");
//        System.out.println(onDutyUserName);
//        System.out.println( " " + onDutyStartTime);
//        System.out.println( " " + onDutyEndTime);
//        System.out.println( " " + order);
        User user = getUserIdFromSession(request);
        if (user == null) {
            // 如果忘记传头部信息过来, 默认设置为超级管理员的改动
            user = new User();
            user.setUserId(longTwo);
        }

        return onDutyDealService.selectOnDuty(onDutyUserName, onDutyStartTime, onDutyEndTime, aOrs,  order,  pageNum,  pageSize);

    }

    @GetMapping("/getOnDutyStaff")
    @ResponseBody
    public ResultBean getOnDutyStaff(HttpServletRequest request, HttpServletResponse response) {

//        System.out.println("222xierenyi");
        int auth = 4; // 100 表示选择队员

        List<Map<String, Object>> list = userService.findSatisfyAuthUser(4);

//        System.out.println("222xierenyi" + list.size());
        return new ResultBean(ResultCode.SUCCESS, list);
    }

    @PostMapping("/detailOnDuty")
    @ResponseBody
    public ResultBean detailOnDuty(@RequestParam(value = "onDutyId",  required = true) long onDutyId,
                                      HttpServletRequest request, HttpServletResponse response) {

//        System.out.println(onDutyId);

        return onDutyDealService.detailOnDuty(onDutyId);

    }
}
