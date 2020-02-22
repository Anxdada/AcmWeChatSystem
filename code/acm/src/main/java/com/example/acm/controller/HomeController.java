package com.example.acm.controller;

import com.example.acm.authorization.manager.TokenManager;
import com.example.acm.authorization.model.TokenModel;
import com.example.acm.common.ResultBean;
import com.example.acm.common.ResultCode;
import com.example.acm.common.SysConst;
import com.example.acm.entity.User;
import com.example.acm.service.FriendUrlService;
import com.example.acm.service.UserService;
import com.example.acm.service.deal.UserDealService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value="/home")     // 通过这里配置使下面的映射都在/user下
public class HomeController extends BaseController {

    private Logger LOG = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private UserService userService;

    @Autowired
    private FriendUrlService friendUrlService;


    @GetMapping("/getHomeData")
    @ResponseBody
    public ResultBean getHomeData(HttpServletRequest request, HttpServletResponse response) {
        try {
            User user = getUserIdFromSession(request);
            if (user == null) return new ResultBean(ResultCode.SESSION_OUT, "token失效, 请重新登录!");

            Map<String, Object> map = new HashMap<>();
            map.put("isEffective", SysConst.LIVE);
            int totUser = userService.countUserListByQuery(map);

            int totFriendUrl = friendUrlService.countFriendUrlListByQuery(map);

            int totPost = 15;

            map.put("totUser", totUser);
            map.put("totFriendUrl", totFriendUrl);
            map.put("totPost", totPost);

            return new ResultBean(ResultCode.SUCCESS, map);

        } catch (Exception e) {
            // log
            e.printStackTrace();
            return new ResultBean(ResultCode.SYSTEM_FAILED);
        }
    }
}

