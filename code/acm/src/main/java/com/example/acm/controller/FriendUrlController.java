package com.example.acm.controller;

import com.example.acm.common.ResultBean;
import com.example.acm.entity.User;
import com.example.acm.service.deal.FriendUrlDealService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

/**
 * @author Anxdada
 * @version 1.0
 * @date 2020-02-10 00:38
 */
// 注解可以支持配置跨域问题, 只不过我全局配好了的, 所以用不用注解都可
@Controller
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RequestMapping("/friendUrl")
public class FriendUrlController {
    @Autowired
    private FriendUrlDealService friendUrlDealService;

//    @RequestMapping("/selectAll")
//    public String all(ModelMap modelMap) {
//        System.out.println("xierenyi");
//        List<FriendUrl> friendUrls= friendUrlService.selectAll();
//        for (FriendUrl item : friendUrls) {
//            System.out.println(item);
//        }
//        return "success";
//    }

    @PostMapping("/addFriendUrl")
    @ResponseBody
    public ResultBean addFriendUrl(@RequestParam(value = "friendUrlName", required = true) String friendUrlName,
                                   @RequestParam(value = "friendUrlAddress", required = true) String friendUrlAddress,
                                   @RequestParam(value = "friendUrlTag", required = true) String friendUrlTag,
                                   HttpServletRequest request, HttpServletResponse response) {
//        User user = getUserIdFromSession(request);
        System.out.println(friendUrlName + " " + friendUrlAddress + " " + friendUrlTag + " ");
        User user = null;
        if (user == null) {
            //return new ResultBean(ResultCode.SESSION_OUT);
            user = new User();
            user.setUserId(1);
        }

        return friendUrlDealService.addFriendUrl(user, friendUrlName, friendUrlAddress,  friendUrlTag);

    }

    @PostMapping("/deleteFriendUrl")
    @ResponseBody
    public ResultBean deleteFriendUrl(@RequestParam(value = "friendUrlId",  required = true) long friendUrlId,
                                      HttpServletRequest request, HttpServletResponse response) {
//        User user = getUserIdFromSession(request);
        System.out.println(friendUrlId);
        User user = null;
        if (user == null) {
            //return new ResultBean(ResultCode.SESSION_OUT);
            user = new User();
            user.setUserId(2);
        }

        return friendUrlDealService.deleteFriendUrl(user, friendUrlId);

    }

    @PostMapping("/updateFriendUrl")
    @ResponseBody
    public ResultBean updateFriendUrl(@RequestParam(value = "friendUrlId", required = true) long friendUrlId,
                                      @RequestParam(value = "friendUrlName", required = true) String friendUrlName,
                                      @RequestParam(value = "friendUrlAddress", required = true) String friendUrlAddress,
                                      @RequestParam(value = "friendUrlTag", required = true) String friendUrlTag,
                                      @RequestParam(value = "createTime", required = true) String createTime,
                                      HttpServletRequest request, HttpServletResponse response) {
//        User user = getUserIdFromSession(request);
        System.out.println("xierenyi " + createTime);
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        try {
            System.out.println(sdf.parse(createTime));
        } catch (Exception e) {
            e.printStackTrace();
        }

        System.out.println(friendUrlName + " " + friendUrlAddress + " " + friendUrlTag + " " + createTime);
        User user = null;
        if (user == null) {
            //return new ResultBean(ResultCode.SESSION_OUT);
            user = new User();
            user.setUserId(3);
        }

        return friendUrlDealService.updateFriendUrl(user, friendUrlId, friendUrlName, friendUrlAddress, friendUrlTag, createTime);

    }


    @PostMapping("/selectFriendUrl")
    @ResponseBody
    public ResultBean selectFriendUrl(@RequestParam(value = "friendUrlName", defaultValue = "", required = false) String friendUrlName,
                                      @RequestParam(value = "aOrs", defaultValue = "1", required = false) int aOrs,
                                      @RequestParam(value = "order", defaultValue = "createTime", required = false) String order,
                                      @RequestParam(value = "pageNum", defaultValue = "1", required = false) int pageNum,
                                      @RequestParam(value = "pageSize", defaultValue="10", required = false) int pageSize,
                                      HttpServletRequest request, HttpServletResponse response) {
//        User user = getUserIdFromSession(request);
        System.out.println(friendUrlName + " " + aOrs + " " + pageNum + " " + order + " " + pageSize);
        User user = null;
        if (user == null) {
            //return new ResultBean(ResultCode.SESSION_OUT);
            user = new User();
            user.setUserId(4);
        }

        return friendUrlDealService.selectFriendUrl(friendUrlName, aOrs,  order,  pageNum,  pageSize);

    }

    @PostMapping("/detailFriendUrl")
    @ResponseBody
    public ResultBean detailFriendUrl(@RequestParam(value = "friendUrlId",  required = true) long friendUrlId,
                                      HttpServletRequest request, HttpServletResponse response) {
//        User user = getUserIdFromSession(request);
        System.out.println(friendUrlId);
        User user = null;
        if (user == null) {
            //return new ResultBean(ResultCode.SESSION_OUT);
            user = new User();
            user.setUserId(2);
        }

        return friendUrlDealService.detailFriendUrl(user, friendUrlId);

    }
}
