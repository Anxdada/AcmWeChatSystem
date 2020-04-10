package com.example.acm.service.deal.impl;

import com.example.acm.authorization.model.TokenModel;
import com.example.acm.common.ResultBean;
import com.example.acm.common.ResultCode;
import com.example.acm.common.SysConst;
import com.example.acm.config.RedisComponent;
import com.example.acm.entity.User;
import com.example.acm.service.UserService;
import com.example.acm.service.deal.UserDealService;
import com.example.acm.utils.DateUtil;
import com.example.acm.utils.ListPage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author xierenyi
 * @version 1.0
 * @date 2020-02-21 11:14
 */
@Service
public class UserDealServiceImpl implements UserDealService {

    @Autowired
    private UserService userService;

    @Autowired
    private RedisComponent redisComponent;

    /**
     * 更新操作
     *
     * @param user 操作人
     * @param auth 新身份
     * @param grade 年级
     * @return
     */
    public ResultBean updateUserPC(User user, long userId, int auth, int grade) {
        try {

            List<User> list = userService.findUserListByUserId(userId);

            if (list.isEmpty()) {
                return new ResultBean(ResultCode.SQL_NULL_RECODE, "没有找到该用户信息");
            }

            User tUser = list.get(0);
            if (auth != -1) tUser.setAuth(auth);
            if (grade != -1) tUser.setGrade(grade);

            userService.updateUserPC(tUser);

            return new ResultBean(ResultCode.SUCCESS);

        } catch (Exception e) {
            // log
            e.printStackTrace();
            return new ResultBean(ResultCode.SYSTEM_FAILED);
        }
    }

    /**
     *
     * @param userName 用户名
     * @param realName 真实姓名
     * @param studentId 学号
     * @param aOrs 排序规则(升序还是降序)
     * @param order 按照那个字段排序
     * @param pageNum 当前的页数
     * @param pageSize 一页的数量
     * @return
     */
    public ResultBean selectUserPC(String userName, String realName, String studentId, int auth,
                                 int aOrs, String order, int pageNum, int pageSize) {
        try {

            Map<String, Object> map = new HashMap<>();
            map.put("userName", userName);
            map.put("realName", realName);
            map.put("studentId", studentId);
            if (auth != -1) map.put("auth", auth);
            int start = (pageNum - 1) * pageSize;
            int limit = pageSize;
            map.put("start", start);
            map.put("limit", limit);
            map.put("order", order);
            if (aOrs == 1) {
                map.put("aOrS", "DESC");
            } else {
                map.put("aOrS", "ASC");
            }
            map.put("isEffective", SysConst.LIVE);


            List<Map<String, Object>> list = userService.findUserMapListByQueryMap(map);

            if (list.size() > 0) {
                for (Map<String, Object> mapTemp : list) {
                    mapTemp.put("createTime", DateUtil.convDateToStr((Date) mapTemp.get("createTime"), "yyyy-MM-dd"));
                }
            }

            int allNum = userService.countUserMapListByQueryMap(map);

            ListPage<List<Map<String, Object>>> listPage = ListPage.createListPage(pageNum, pageSize, allNum, list);

            return new ResultBean(ResultCode.SUCCESS, listPage);

        } catch (Exception e) {
            // log
            e.printStackTrace();
            return new ResultBean(ResultCode.SYSTEM_FAILED);
        }
    }


    /**
     * 获取某一个用户的全部信息,
     *
     * @param userId
     * @return
     */
    public ResultBean detailUser(long userId) {
        try {
            Map<String, Object> map = new HashMap<>();
            map.put("userId", userId);
            map.put("isEffective", SysConst.LIVE);

            List<Map<String, Object>> list = userService.findUserMapListByQueryMap(map);

            if (list.isEmpty()) {
                return new ResultBean(ResultCode.SQL_NULL_RECODE, "数据库无该条记录!");
            }

            // 因为要增加返回的字段, 所以要用map... 增加手机端用户的粉丝和关注数量
            Map<String, Object> mapTemp = list.get(0);
            String key = "userFollow" + userId;
            mapTemp.put("followNumber", redisComponent.getSizeSetForKey(key));
            key = "userFan" + userId;
            mapTemp.put("fanNumber", redisComponent.getSizeSetForKey(key));

            return new ResultBean(ResultCode.SUCCESS, mapTemp);

        } catch (Exception e) {
            // log
            e.printStackTrace();
            return new ResultBean(ResultCode.SYSTEM_FAILED);
        }
    }
}
