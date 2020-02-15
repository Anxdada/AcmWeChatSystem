package com.example.acm.controller;

import com.example.acm.common.SysConst;
import com.example.acm.config.RedisComponent;
import com.example.acm.entity.User;
import com.example.acm.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author xierenyi
 * @version 1.0
 * @date 2020-02-13 22:44
 */
public class BaseController {

    private static final Logger LOG = LoggerFactory.getLogger(BaseController.class);

    @Autowired
    RedisComponent redisComponent;

    @Autowired
    private UserService userService;

    /**
     * 获取当前的操作用户信息
     *
     * @param request
     */
    public User getUserIdFromSession(HttpServletRequest request) {
        if (request.getHeader(SysConst.TOKEN) == null) {
            return null;
        }
        if (redisComponent.get(request.getHeader(SysConst.TOKEN)) == null) {
            return null;
        }
        int userId = Integer.parseInt(redisComponent.get(request.getHeader(SysConst.TOKEN)));
        Map<String, Object> map = new HashMap<>();
        map.put("userId", userId);
        map.put("isEffective", SysConst.USE);
        List<User> user = userService.findUserListByQueryMap(map);
        if (user == null) {
            return null;
        }
        return user.get(0);
    }

    /**
     * 放入session
     *
     * @param response
     * @param session
     * @param user
     */
    public void setUserSession(HttpServletRequest request, HttpServletResponse response, HttpSession session, User user){
        session.setMaxInactiveInterval(18000);
        session.setAttribute("userInfo", user);
//        //放cookie
//        Cookie cookie = new Cookie("ftSessionID", user.getUserID().toString());
//        cookie.setMaxAge(60 * 60 * 4);// 4小时
//        cookie.setPath("/");
//        response.addCookie(cookie);
    }

    /**
     * 打印cookie信息
     *
     * @param request
     */
    public void printCookie(HttpServletRequest request){
        Cookie[] cookies = request.getCookies();
        if (null == cookies || cookies.length == 0){
            // LOG.info("!!");
        }
        else {
            for(Cookie cookie : cookies){
//                LOG.info(" cookie Name:"+cookie.getName() +" cookie value:"+cookie.getValue());
            }
        }
    }
}
