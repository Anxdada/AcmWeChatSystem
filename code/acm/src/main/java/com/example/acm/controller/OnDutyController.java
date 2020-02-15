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

    private final Long longTwo = Long.parseLong(String.valueOf(2));

    @Autowired
    private OnDutyDealService onDutyDealService;

    @Autowired
    private UserService userService;

    /**
     * 这个函数为挑选值班人员, 从user表中挑选队员出来作为安排值班的备选
     *
     * @return
     */
    @GetMapping("selectOnDutyUser")
    @ResponseBody
    public ResultBean selectOnDutyUser(HttpServletRequest request, HttpServletResponse response) {

        Map<String, Object> map = new HashMap<>();

        map.put("auth", 6);
        map.put("isEffective", SysConst.LIVE);

        List<User> list = userService.findUserListByQueryMap(map);

        return new ResultBean(ResultCode.SUCCESS, list);
    }

    @PostMapping("/addFriendUrl")
    @ResponseBody
    public ResultBean selectOnDuty(@RequestParam(value = "friendUrlName", required = true) String friendUrlName,
                                   @RequestParam(value = "friendUrlAddress", required = true) String friendUrlAddress,
                                   @RequestParam(value = "friendUrlTag", required = true) String friendUrlTag,
                                   HttpServletRequest request, HttpServletResponse response) {
        User user = getUserIdFromSession(request);
        if (user == null) {
            user = new User();
            user.setUserId(longTwo);
        }

        return new ResultBean(ResultCode.SUCCESS);

//        return onDutyDealService.addFriendUrl(user, friendUrlName, friendUrlAddress,  friendUrlTag);

    }
}
