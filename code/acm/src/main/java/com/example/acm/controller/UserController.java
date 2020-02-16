package com.example.acm.controller;

import com.example.acm.authorization.manager.TokenManager;
import com.example.acm.authorization.model.TokenModel;
import com.example.acm.common.ResultBean;
import com.example.acm.common.ResultCode;
import com.example.acm.common.SysConst;
import com.example.acm.controller.BaseController;
import com.example.acm.entity.User;
import com.example.acm.service.UserService;
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
    private TokenManager tokenManager;

    /**
     * 切记 只返回有用的值, 其它用户信息不能返回, 特别是密码等信息
     * 否则这个属于一个很**的Bug, 能返回回去的信息一定都是不重要的!
     *
     *  因为我前段组件的原因只能这样获取了..
     */
    @GetMapping("/getLoginUserName")
    @ResponseBody
    public ResultBean getLoginUserName(HttpServletRequest request, HttpServletResponse response) {

        User user = getUserIdFromSession(request);
        if (user == null) {
            user = new User();
            user.setRealName("获取用户信息失败");
        }
        System.out.println(user.getRealName());

        return new ResultBean(ResultCode.SUCCESS, (Object) user.getRealName());
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

    // 创建线程安全的Map
//    static Map<Long, User> users = Collections.synchronizedMap(new HashMap<Long, User>());
//
//    @ApiOperation(value="获取用户列表", notes="")
//    @GetMapping(value="")
////    @GetMapping(value="", produces = "application/json;charset=utf-8")
//    public List<User> getUserList() {
//        User user = new User();
//        user.setAge(12);
//        user.setName("叫啊叫啊");
//        user.setId(2L);
//        users.put(2L, user);
//        // 处理"/users/"的GET请求，用来获取用户列表
//        // 还可以通过@RequestParam从页面中传递参数来进行查询条件或者翻页信息的传递
//        List<User> r = new ArrayList<User>(users.values());
//        return r;
//    }
//
//    @ApiOperation(value="创建用户", notes="根据User对象创建用户")
//    @ApiImplicitParam(name = "user", value = "用户详细实体user", required = true, dataType = "User")
//    @PostMapping(value="")
//    public String postUser(@ModelAttribute User user) {
//        // 处理"/users/"的POST请求，用来创建User
//        // 除了@ModelAttribute绑定参数之外，还可以通过@RequestParam从页面中传递参数
//        users.put(user.getId(), user);
//        return "success";
//    }
//
//
//    @ApiOperation(value="获取用户详细信息", notes="根据url的id来获取用户详细信息")
//    @ApiImplicitParam(name = "id", value = "用户ID", required = true, dataType = "Long")
//    @GetMapping(value="/{id}")
//    public User getUser(@PathVariable Long id) {
//        // 处理"/users/{id}"的GET请求，用来获取url中id值的User信息
//        // url中的id可通过@PathVariable绑定到函数的参数中
//        return users.get(id);
//    }
//
//    @ApiOperation(value="更新用户详细信息", notes="根据url的id来指定更新对象，并根据传过来的user信息来更新用户详细信息")
//    @ApiImplicitParams({
//            @ApiImplicitParam(name = "id", value = "用户ID", required = true, dataType = "Long"),
//            @ApiImplicitParam(name = "user", value = "用户详细实体user", required = true, dataType = "User")
//    })
//    @PutMapping(value="/{id}")
//    public String putUser(@PathVariable Long id, @ModelAttribute User user) {
//        // 处理"/users/{id}"的PUT请求，用来更新User信息
//        User u = users.get(id);
//        System.out.println(u);
//        u.setName(user.getName());
//        u.setAge(user.getAge());
//        System.out.println(u);
//        users.put(id, u);
//        return "success";
//    }
//
//    @ApiOperation(value="删除用户", notes="根据url的id来指定删除对象")
//    @ApiImplicitParam(name = "id", value = "用户ID", required = true, dataType = "Long")
//    @DeleteMapping(value="/{id}")
//    public String deleteUser(@PathVariable Long id) {
//        // 处理"/users/{id}"的DELETE请求，用来删除User
//        users.remove(id);
//        return "success";
//    }

}

