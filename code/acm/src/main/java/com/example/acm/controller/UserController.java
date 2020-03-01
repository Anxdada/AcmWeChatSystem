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
import java.text.SimpleDateFormat;
import java.util.*;

@RestController
@RequestMapping(value="/user")     // 通过这里配置使下面的映射都在/user下
public class UserController extends BaseController {

    private Logger LOG = LoggerFactory.getLogger(this.getClass());

    private final Long longTwo = Long.parseLong(String.valueOf(2));

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

            if (user == null || user.isEmpty()) {
                return new ResultBean(ResultCode.NO_THIS_USER, "该用户未注册");
            }

            if ((user.get(0).getAuth() & 3) == 0) {
                return new ResultBean(ResultCode.NO_OAUTH, "本后台系统只有管理员才能登录, 有需要请联系@Anxdada");
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

    @PostMapping("/updateUserPC")
    @ResponseBody
    public ResultBean updateUserPC(@RequestParam(value = "userId", required = true) long userId,
                                 @RequestParam(value = "auth", defaultValue = "-1", required = false) int auth,
                                 @RequestParam(value = "grade", defaultValue = "-1", required = false) int grade,
                                 HttpServletRequest request, HttpServletResponse response) {

        try {

//            System.out.println(auth);
//            System.out.println(grade);

            User user = getUserIdFromSession(request);
            if (user == null) {
                // 如果忘记传头部信息过来, 默认设置为超级管理员的改动
                user = new User();
                user.setUserId(longTwo);
            }

            return userDealService.updateUserPC(user, userId, auth, grade);

        } catch(Exception e) {
            LOG.error(e.getMessage(), e);

            e.printStackTrace();
            return new ResultBean(ResultCode.SYSTEM_FAILED);
        }
    }


    @PostMapping("/selectUserPC")
    @ResponseBody
    public ResultBean selectUserPC(@RequestParam(value = "userName", defaultValue = "", required = false) String userName,
                                 @RequestParam(value = "studentId", defaultValue = "", required = false) String studentId,
                                 @RequestParam(value = "realName", defaultValue = "", required = false) String realName,
                                 @RequestParam(value = "auth", defaultValue = "-1", required = false) int auth,
                                 @RequestParam(value = "aOrs", defaultValue = "1", required = false) int aOrs,
                                 @RequestParam(value = "order", defaultValue = "createTime", required = false) String order,
                                 @RequestParam(value = "pageNum", defaultValue = "1", required = false) int pageNum,
                                 @RequestParam(value = "pageSize", defaultValue="10", required = false) int pageSize,
                                 HttpServletRequest request, HttpServletResponse response) {

        try {

            return userDealService.selectUserPC(userName, realName, studentId, auth, aOrs, order, pageNum, pageSize);

        } catch(Exception e) {
            LOG.error(e.getMessage(), e);

            e.printStackTrace();
            return new ResultBean(ResultCode.SYSTEM_FAILED);
        }
    }

    @GetMapping("/statistic")
    @ResponseBody
    public ResultBean statisticUser(HttpServletRequest request, HttpServletResponse response) {
        try {

            Map<String, Object> totNumMap = new HashMap<>();

            // 用户总数
            Map<String, Object> map = new HashMap<>();
            map.put("isEffective", SysConst.LIVE);
            totNumMap.put("totUserNum", userService.countUserMapListByQueryMap(map));

            int auth = 0;
            // 管理员个数
            auth = 2;
            totNumMap.put("totManageNum", userService.findSatisfyAuthUser(auth).size());

            // 队员个数
            auth = (1<<2);
            totNumMap.put("totTeamNum", userService.findSatisfyAuthUser(auth).size());

            // 黑用户个数
            auth = (1<<5);
            totNumMap.put("totBlockNum", userService.findSatisfyAuthUser(auth).size());

            return new ResultBean(ResultCode.SUCCESS, totNumMap);

        } catch(Exception e) {
            LOG.error(e.getMessage(), e);

            e.printStackTrace();
            return new ResultBean(ResultCode.SYSTEM_FAILED);
        }
    }



    /**
     * 筛选对应身份的人
     *
     * @param auth 身份
     * 0-未通过审核 0-超级管理员 1-管理员 2-队员 3-萌新 4-未完善资料的萌新 (后面的0-4是指身份值的数字的二进制的位数)
     * 比如 anth = 6, 那么这个人既是 管理员 又是 队员 (第多少位上是1, 代表他就具有该种身份)
     *
     */
    @PostMapping("/getAuthUser")
    @ResponseBody
    public ResultBean getOnDutyStaff(@RequestParam(value="auth", required = true) int auth,
                                     HttpServletRequest request, HttpServletResponse response) {


        List<Map<String, Object>> list = userService.findSatisfyAuthUser(auth);
        if (list.isEmpty()) {
            return new ResultBean(ResultCode.SQL_NULL_RECODE, "没有满足该身份的用户");
        }

        return new ResultBean(ResultCode.SUCCESS, list);
    }


    // 暂时没用这个函数
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

