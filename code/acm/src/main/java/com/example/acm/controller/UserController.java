package com.example.acm.controller;

import com.example.acm.authorization.manager.TokenManager;
import com.example.acm.authorization.model.TokenModel;
import com.example.acm.common.ResultBean;
import com.example.acm.common.ResultCode;
import com.example.acm.common.SysConst;
import com.example.acm.controller.BaseController;
import com.example.acm.entity.User;
import com.example.acm.service.UserService;
import com.example.acm.service.deal.UserDealService;
import com.example.acm.utils.StringUtil;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.*;

@RestController
@RequestMapping(value="/user")     // 通过这里配置使下面的映射都在/user下
public class UserController extends BaseController {

    private Logger LOG = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private UserService userService;

    @Autowired
    private UserDealService userDealService;

    @Autowired
    private TokenManager tokenManager;

    /**
     * 切记 只返回有用的值, 其它用户信息不能返回, 特别是密码等信息
     * 否则这个属于一个很**的Bug, 能返回回去的信息一定都是不重要的!
     *
     *  因为我前段组件的原因只能这样获取了..
     */
    @GetMapping("/getLoginUser")
    @ResponseBody
    public ResultBean getLoginUserName(HttpServletRequest request, HttpServletResponse response) {

        User user = getUserIdFromSession(request);
        if (user == null) {
//            user = new User();
//            user.setRealName("获取用户信息失败, ");
            return new ResultBean(ResultCode.SESSION_OUT, "token失效, 请重新登录!");
        }
        System.out.println(user.getRealName());

        return new ResultBean(ResultCode.SUCCESS, user);
    }


    @PostMapping("/PCLogin")
    @ResponseBody
    public ResultBean login(@RequestParam(value = "userName", required = true) String userName,
                            @RequestParam(value="password", required = true) String password,
                            HttpServletRequest request, HttpServletResponse response) {
        try {
            LOG.info("xierenyi" + userName + " " + password);

            Map<String, Object> map = new HashMap<>();

            LOG.info("-----------token:" + request.getHeader("Authorization"));
            LOG.info("userName" + userName);

            map.put("userName", userName);
            map.put("isEffective", SysConst.LIVE);

            List<User> user = userService.findUserListByQueryMap(map);

            LOG.info(""+user.size());

            if (user == null || user.size() == 0) {
                return new ResultBean(ResultCode.NO_THIS_USER);
            }

            if (user.get(0).getPassword().equals(password)) {
                setUserSession(request, response, request.getSession(), user.get(0));

                LOG.info(userName);
                LOG.info("userId-----------------"+user.get(0).getUserId());

                if (user.get(0).getAuth()== SysConst.NOT_PASS) {
                    return new ResultBean(ResultCode.PARAM_ERROR, "用户尚未通过审核");
                }
                TokenModel model = tokenManager.createToken(user.get(0).getUserId());
                return new ResultBean(ResultCode.SUCCESS, model);
            } else {
                System.out.println("在密码错误这里");
                return new ResultBean(ResultCode.PWD_ERROR);
            }
        } catch(Exception e) {
            LOG.error(e.getMessage(), e);

            e.printStackTrace();
            return new ResultBean(ResultCode.SYSTEM_FAILED);
        }
    }

    @PostMapping("/detailUser")
    @ResponseBody
    public ResultBean detailUser(@RequestParam(value="userId", required = true) long userId,
                           HttpServletRequest request, HttpServletResponse response) {

        try {

            return userDealService.detailUser(userId);

        } catch(Exception e) {
            LOG.error(e.getMessage(), e);

            e.printStackTrace();
            return new ResultBean(ResultCode.SYSTEM_FAILED);
        }
    }
}

