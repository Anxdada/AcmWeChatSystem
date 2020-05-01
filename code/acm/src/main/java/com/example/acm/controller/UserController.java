package com.example.acm.controller;

import com.example.acm.authorization.manager.TokenManager;
import com.example.acm.authorization.model.TokenModel;
import com.example.acm.common.ResultBean;
import com.example.acm.common.ResultCode;
import com.example.acm.common.SysConst;
import com.example.acm.config.RedisComponent;
import com.example.acm.controller.BaseController;
import com.example.acm.entity.Post;
import com.example.acm.entity.Report;
import com.example.acm.entity.User;
import com.example.acm.service.*;
import com.example.acm.service.deal.ForumTotalReplyDealService;
import com.example.acm.service.deal.UserDealService;
import com.example.acm.utils.DateUtil;
import com.example.acm.utils.ListPage;
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

    @Autowired
    private RegisterService registerService;

    @Autowired
    private OnDutyService onDutyService;

    @Autowired
    private PostService postService;

    @Autowired
    private CommentService commentService;

    @Autowired
    private ReplyService replyService;

    @Autowired
    private RedisComponent redisComponent;

    @Autowired
    private ReportService reportService;

    @Autowired
    private ForumTotalReplyDealService forumTotalReplyDealService;

    @PostMapping("/PCLogin")
    @ResponseBody
    public ResultBean login(@RequestParam(value = "userName", required = true) String userName,
                            @RequestParam(value="password", required = true) String password,
                            HttpServletRequest request, HttpServletResponse response) {
        try {
            LOG.info("xierenyi " + userName + " " + password);

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

    /**
     * 获取目前的登录用户信息(注意token是哪里来的)
     *
     */
    @GetMapping("/getLoginUserPC")
    @ResponseBody
    public ResultBean getLoginUserPC(HttpServletRequest request, HttpServletResponse response) {

        User user = getUserIdFromSession(request);
        if (user == null) {
            return new ResultBean(ResultCode.SESSION_OUT, "token(PC)失效, 请重新登录!");
        }
//        System.out.println(user.getRealName());

        return new ResultBean(ResultCode.SUCCESS, user);
    }

    /**
     * 手机端用户个人信息页面
     * @return
     */
    @GetMapping("/getLoginUserMobile")
    @ResponseBody
    public ResultBean getLoginUserMobile(HttpServletRequest request, HttpServletResponse response) {

        User user = getUserIdFromSession(request);
        if (user == null) {
            return new ResultBean(ResultCode.SESSION_OUT, "token(Mobile)失效, 请重新登录!");
        }
//        System.out.println(user.getRealName());

        return userDealService.detailUser(user.getUserId());
    }

    /**
     * 手机端展示用户界面, 判断当前这个人是否被登录用户关注来显示不同的UI
     * 0 未关注 (但是这个人也有可能是你的粉丝, 只是你没有关注他而已
     * 1 关注了 (注意点和上面一样
     * 目前还只是用来判断关注...
     * (暂时还不知道 怎么取手机端的登录用户哈)
     * @param checkUserId 待判断的的用户id
     * @return
     */
    @PostMapping("/checkRelationshipWithLoginUserMobile")
    @ResponseBody
    public ResultBean checkRelationshipWithLoginUserMobile(
            @RequestParam(value = "checkUserId", required = true) String checkUserId,
            HttpServletRequest request, HttpServletResponse response) {

        User user = getUserIdFromSession(request);
        if (user == null) {
            return new ResultBean(ResultCode.SESSION_OUT, "token(Mobile)失效, 请重新登录!");
        }
        String key = "userFollow" + user.getUserId();

        return new ResultBean(ResultCode.SUCCESS, redisComponent.hasMemberForKey(key, checkUserId));
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

    /**
     * 手机端获取关注列表的接口
     * 对应在redis中取 userFollow + userId -> set(userId)
     */
    @PostMapping("/getFollowUserList")
    @ResponseBody
    public ResultBean getFollowUserList(@RequestParam(value="userId", required = true) long userId,
                                     HttpServletRequest request, HttpServletResponse response) {

        try {
            String  key = "userFollow" + userId;
            Set<String> sUserFollowId = redisComponent.getSetForKey(key);
            List<User> followUserList = new ArrayList<>();
            for (String sTmp : sUserFollowId) {
                List<User> list = userService.findUserListByUserId(Long.valueOf(sTmp));
                if (!list.isEmpty()) followUserList.add(list.get(0));
            }

            return new ResultBean(ResultCode.SUCCESS, followUserList);

        } catch(Exception e) {
            LOG.error(e.getMessage(), e);
            e.printStackTrace();
            return new ResultBean(ResultCode.SYSTEM_FAILED);
        }
    }

    /**
     * 手机端获取粉丝列表的接口
     * 对应在redis中取 userFan + userId -> set(userId)
     */
    @PostMapping("/getFanUserList")
    @ResponseBody
    public ResultBean getFanUserList(@RequestParam(value="userId", required = true) long userId,
                                     HttpServletRequest request, HttpServletResponse response) {

        try {
            String key = "userFan" + userId;
            Set<String> sUserFanId = redisComponent.getSetForKey(key);
            List<User> fanUserList = new ArrayList<>();
            for (String sTmp : sUserFanId) {
                List<User> list = userService.findUserListByUserId(Long.valueOf(sTmp));
                if (!list.isEmpty()) fanUserList.add(list.get(0));
            }

            key = "userFollow" + userId;
            Set<String> sUserFollowId = redisComponent.getSetForKey(key);

            return new ResultBean(ResultCode.SUCCESS, fanUserList);

        } catch(Exception e) {
            LOG.error(e.getMessage(), e);
            e.printStackTrace();
            return new ResultBean(ResultCode.SYSTEM_FAILED);
        }
    }

    /**
     * 手机端关注或者取关用户
     * 因为是对当前登录用户来说的, 所以可以直接取到相关的信息
     * @param like 1 是关注, 0 是取关
     * @param uid 对应 关注或者取关 的用户id
     */
    @PostMapping("/followOrUnFollowUser")
    @ResponseBody
    public ResultBean followOrUnFollowUser(
              @RequestParam(value = "like", required = true) int like,
              @RequestParam(value = "uid", required = true) long uid,
              HttpServletRequest request, HttpServletResponse response) {

        try {
            User user = getUserIdFromSession(request);
            if (user == null) {
                return new ResultBean(ResultCode.SESSION_OUT, "token(Mobile)失效, 请重新登录!");
            }
            redisComponent.setTypeUidLike("userFollow", user.getUserId(), uid, like);

            return new ResultBean(ResultCode.SUCCESS);

        } catch(Exception e) {
            LOG.error(e.getMessage(), e);
            e.printStackTrace();
            return new ResultBean(ResultCode.SYSTEM_FAILED);
        }
    }

    /**
     *  !(注意目前手机端还不知道怎么获取)!
     *  手机端接口, 获取手机端登录用户的值日相关信息
     *  因为还是可以直接获取登录信息, 所以直接可以取
     *  这写都是手机端用户的接口, 不同于普通的curd, 所以都是单独提出来的
     *  @param aOrs 排序的规则, 1 是降序, 0 是升序, 因为手机端的业务需求所以需要这个字段
     */
    @PostMapping("/getMyOnDuty")
    @ResponseBody
    public ResultBean getMyOnDuty(@RequestParam(value = "aOrs", required = true) int aOrs,
            HttpServletRequest request, HttpServletResponse response) {
        try {
            User user = getUserIdFromSession(request);
            if (user == null) {
                return new ResultBean(ResultCode.SESSION_OUT, "token(Mobile)失效, 请重新登录!");
            }
            Map<String, Object> map = new HashMap<>();
            map.put("onDutyUserId", user.getUserId());
            if (aOrs == 1) {
                map.put("aOrS", "DESC");
            } else {
                map.put("aOrS", "ASC");
            }
            map.put("order", "onDutyStartTime");
            map.put("isEffective", SysConst.LIVE);
            List<Map<String, Object>> list = onDutyService.findOnDutyMapListByQuery(map);
            List<Map<String, Object>> listAns = new ArrayList<>();
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            for (Map<String, Object> mapTemp : list) {
                // if date > date2 return -1, else if < return 1, equal return 0;
                mapTemp.put("onDutyStartTime", DateUtil.convDateToStr((Date) mapTemp.get("onDutyStartTime"), "yyyy-MM-dd HH:mm:ss"));
                mapTemp.put("onDutyEndTime", DateUtil.convDateToStr((Date) mapTemp.get("onDutyEndTime"), "yyyy-MM-dd HH:mm:ss"));
                if (aOrs == 0 && DateUtil.compare_date(new Date(), sdf.parse((String)mapTemp.get("onDutyEndTime"))) == -1) {
                    listAns.add(mapTemp);
                    // 未完成的
                }
                if (aOrs == 1 && DateUtil.compare_date(new Date(), sdf.parse((String)mapTemp.get("onDutyEndTime"))) == 1) {
                    listAns.add(mapTemp);
                    // 完成了的
                }
            }
            return new ResultBean(ResultCode.SUCCESS, listAns);

        } catch(Exception e) {
            LOG.error(e.getMessage(), e);
            e.printStackTrace();
            return new ResultBean(ResultCode.SYSTEM_FAILED);
        }
    }

    /**
     *  手机端接口, 获取手机端登录用户的比赛经历
     *  因为还是可以直接获取登录信息, 所以直接可以取
     *  这写都是手机端用户的接口, 不同于普通的curd, 所以都是单独提出来的
     */
    @GetMapping("/getGameExperience")
    @ResponseBody
    public ResultBean getGameExperience(
            HttpServletRequest request, HttpServletResponse response) {

        try {
            User user = getUserIdFromSession(request);
            if (user == null) {
                return new ResultBean(ResultCode.SESSION_OUT, "token(Mobile)失效, 请重新登录!");
            }
            Map<String, Object> map = new HashMap<>();
            map.put("registerUserId", user.getUserId());
            map.put("aOrS", "DESC");
            map.put("order", "startTime");
            map.put("isEffective", SysConst.LIVE);
            List<Map<String, Object>> list = registerService.findRegisterListMapByQueryMapUnionAnnouncement(map);
            for (Map<String, Object> mapTemp : list) {
                mapTemp.put("startTime", DateUtil.convDateToStr((Date) mapTemp.get("startTime"), "yyyy-MM-dd HH:mm:ss"));
            }
            return new ResultBean(ResultCode.SUCCESS, list);

        } catch(Exception e) {
            LOG.error(e.getMessage(), e);
            e.printStackTrace();
            return new ResultBean(ResultCode.SYSTEM_FAILED);
        }
    }

    // 获取举报
    @GetMapping("/getMyReport")
    @ResponseBody
    public ResultBean getMyReport(
            HttpServletRequest request, HttpServletResponse response) {

        try {
            User user = getUserIdFromSession(request);
            if (user == null) {
                return new ResultBean(ResultCode.SESSION_OUT, "token(Mobile)失效, 请重新登录!");
            }
            Map<String, Object> map = new HashMap<>();
            map.put("createUser", user.getUserId());
            map.put("aOrS", "DESC");
            map.put("order", "createTime");
            map.put("isEffective", SysConst.LIVE);
            List<Map<String, Object>> list = reportService.findReportMapListByQuery(map);
            for (Map<String, Object> mapTemp : list) {
                mapTemp.put("createTime", DateUtil.convDateToStr((Date) mapTemp.get("createTime"), "yyyy-MM-dd HH:mm:ss"));
            }
            return new ResultBean(ResultCode.SUCCESS, list);

        } catch(Exception e) {
            LOG.error(e.getMessage(), e);
            e.printStackTrace();
            return new ResultBean(ResultCode.SYSTEM_FAILED);
        }
    }

    /**
     *  手机端接口, 获取手机端登录用户发布过的帖子
     *  因为还是可以直接获取登录信息, 所以直接可以取(注意目前手机端还不知道怎么获取)
     *  这写都是手机端用户的接口, 不同于普通的curd, 所以都是单独提出来的
     */
    @PostMapping("/getMyPost")
    @ResponseBody
    public ResultBean getMyPost(
            @RequestParam(value = "postTitle", defaultValue = "", required = false) String postTitle,
            @RequestParam(value = "aOrs", defaultValue = "1", required = false) int aOrs,
            @RequestParam(value = "order", defaultValue = "createTime", required = false) String order,
            @RequestParam(value = "pageNum", defaultValue = "1", required = false) int pageNum,
            @RequestParam(value = "pageSize", defaultValue="10", required = false) int pageSize,
            @RequestParam(value = "createUser", required = true) long createUser,
            HttpServletRequest request, HttpServletResponse response) {

        try {
            User user = getUserIdFromSession(request);
            if (user == null) {
                return new ResultBean(ResultCode.SESSION_OUT, "token(Mobile)失效, 请重新登录!");
            }

            Map<String, Object> map = new HashMap<>();
            int start = (pageNum - 1) * pageSize;
            int limit = pageSize;
            map.put("postTitle", postTitle);
            map.put("start", start);
            map.put("limit", limit);
            map.put("order", order);
            map.put("createUser", createUser);
            if (aOrs == 1) {
                map.put("aOrS", "DESC");
            } else {
                map.put("aOrS", "ASC");
            }
            map.put("isEffective", SysConst.LIVE);

            List<Map<String, Object>> listPost = postService.findPostMapListByQuery(map);

            if (!listPost.isEmpty()) {
                for (Map<String, Object> mapTemp : listPost) {

                    // 查评论数(不包括后面回复评论的, 只在手机端展示列表时需要这个数据)
                    Map<String, Object> mapComment = new HashMap<>();
                    mapComment.put("replyPostId", mapTemp.get("postId"));
                    mapTemp.put("totComment", commentService.findCommentMapListByQuery(mapComment).size());

                    mapTemp.put("createTime", DateUtil.convDateToStr((Date) mapTemp.get("createTime"), "yyyy-MM-dd HH:mm:ss"));
                }
            }

            int allNum = postService.countPostList(map);

            ListPage<List<Map<String, Object>>> listPage = ListPage.createListPage(pageNum, pageSize, allNum, listPost);

            return new ResultBean(ResultCode.SUCCESS, listPage);

        } catch(Exception e) {
            LOG.error(e.getMessage(), e);
            e.printStackTrace();
            return new ResultBean(ResultCode.SYSTEM_FAILED);
        }
    }

    /**
     *  手机端接口, 获取手机端登录用户的在讨论区对帖子发表过的评论(一级, 并没有下层哈)
     *  因为还是可以直接获取登录信息, 所以直接可以取(注意目前手机端还不知道怎么获取)
     *  这写都是手机端用户的接口, 不同于普通的curd, 所以都是单独提出来的
     */
    @PostMapping("/getMyComment")
    @ResponseBody
    public ResultBean getMyComment(
            @RequestParam(value = "aOrs", defaultValue = "1", required = false) int aOrs,
            @RequestParam(value = "order", defaultValue = "createTime", required = false) String order,
            @RequestParam(value = "pageNum", defaultValue = "1", required = false) int pageNum,
            @RequestParam(value = "pageSize", defaultValue="10", required = false) int pageSize,
            @RequestParam(value = "createUser", required = true) long createUser,
            HttpServletRequest request, HttpServletResponse response) {

        try {
            User user = getUserIdFromSession(request);
            if (user == null) {
                return new ResultBean(ResultCode.SESSION_OUT, "token(Mobile)失效, 请重新登录!");
            }
            Map<String, Object> map = new HashMap<>();
            int start = (pageNum - 1) * pageSize;
            int limit = pageSize;
            map.put("start", start);
            map.put("limit", limit);
            map.put("order", order);
            map.put("createUser", createUser);
            if (aOrs == 1) {
                map.put("aOrS", "DESC");
            } else {
                map.put("aOrS", "ASC");
            }
            map.put("isEffective", SysConst.LIVE);

            List<Map<String, Object>> listComment = commentService.findCommentMapListByQuery(map);
            for (Map<String, Object> mapTemp : listComment) {
                mapTemp.put("createTime", DateUtil.convDateToStr((Date) mapTemp.get("createTime"), "yyyy-MM-dd HH:mm:ss"));

                List<Post> tmpList = postService.findPostListByPostId((Long) mapTemp.get("replyPostId"));
                String replyPostTitle = "出错啦显示这个~";
                if (!tmpList.isEmpty()) replyPostTitle = tmpList.get(0).getPostTitle();
                mapTemp.put("replyPostTitle", replyPostTitle);

                Map<String, Object> map2 = new HashMap<>();
                map2.put("replyCommentId", (Long)mapTemp.get("commentId"));
                map2.put("isEffective", SysConst.LIVE);
                mapTemp.put("replyNum", replyService.countReplyList(map2));
            }

            int allNum = commentService.countCommentList(map);

            ListPage<List<Map<String, Object>>> listPage = ListPage.createListPage(pageNum, pageSize, allNum, listComment);

            return new ResultBean(ResultCode.SUCCESS, listPage);

        } catch(Exception e) {
            LOG.error(e.getMessage(), e);
            e.printStackTrace();
            return new ResultBean(ResultCode.SYSTEM_FAILED);
        }
    }

    /**
     *  手机端接口, 获取所有 在讨论区(包括 帖子, 评论, 回复)中回复了当前手机登录用户的数据
     *  因为还是可以直接获取登录信息, 所以直接可以取(注意目前手机端还不知道怎么获取)
     *  这写都是手机端用户的接口, 不同于普通的curd, 所以都是单独提出来的
     */
    @PostMapping("/getMyForumTotalReply")
    @ResponseBody
    public ResultBean getMyForumTotalReply(
            @RequestParam(value = "aOrs", defaultValue = "1", required = false) int aOrs,
            @RequestParam(value = "order", defaultValue = "createTime", required = false) String order,
            @RequestParam(value = "pageNum", defaultValue = "1", required = false) int pageNum,
            @RequestParam(value = "pageSize", defaultValue="10", required = false) int pageSize,
            @RequestParam(value = "replyUserId", required = true) long replyUserId,
            HttpServletRequest request, HttpServletResponse response) {

        try {
            User user = getUserIdFromSession(request);
            if (user == null) {
                return new ResultBean(ResultCode.SESSION_OUT, "token(Mobile)失效, 请重新登录!");
            }

            return forumTotalReplyDealService.selectForumTotalReply(user, replyUserId, aOrs, order, pageNum, pageSize);

        } catch(Exception e) {
            LOG.error(e.getMessage(), e);
            e.printStackTrace();
            return new ResultBean(ResultCode.SYSTEM_FAILED);
        }
    }
}

