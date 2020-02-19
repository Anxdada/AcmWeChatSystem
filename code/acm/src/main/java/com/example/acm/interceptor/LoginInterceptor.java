package com.example.acm.interceptor;

import com.example.acm.entity.User;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * @author xierenyi
 * @version 1.0
 * @date 2020-02-17 22:27
 */

@Component
public class LoginInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        HttpSession httpSession=request.getSession();
        //这个是自己定义的用户实体类
        User userDomain = null;
        //在session中取出用户数据
        userDomain = (User) httpSession.getAttribute("token");
        if (userDomain == null){
//            Msg msg=new Msg(0,"No access rights, please log in first!!!");
//            System.out.print(JsonUtils.toString(msg));
//            //未登录或者session过期在这里执行跳转登录页面
//            //response.sendRedirect("/login");
//            response.getWriter().print(JsonUtils.toString(msg));
//            response.getWriter().flush();
//            response.getWriter().close();
            return false;
        }
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {

    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {

    }
}