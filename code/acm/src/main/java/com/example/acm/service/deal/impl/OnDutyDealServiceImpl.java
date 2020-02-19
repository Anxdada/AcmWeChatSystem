package com.example.acm.service.deal.impl;

import com.example.acm.common.ResultBean;
import com.example.acm.common.ResultCode;
import com.example.acm.common.SysConst;
import com.example.acm.entity.FriendUrl;
import com.example.acm.entity.OnDuty;
import com.example.acm.entity.User;
import com.example.acm.service.OnDutyService;
import com.example.acm.service.UserService;
import com.example.acm.service.deal.OnDutyDealService;
import com.example.acm.utils.DateUtil;
import com.example.acm.utils.ListPage;
import com.example.acm.utils.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author xierenyi
 * @version 1.0
 * @date 2020-02-14 23:29
 */
@Service
public class OnDutyDealServiceImpl implements OnDutyDealService {

//    private static final LOG =

    @Autowired
    private OnDutyService onDutyService;

    @Autowired
    private UserService userService;

    /**
     * 添加值班
     * 注意这个这俩面的值班人员信息都是和User表关联的, 也就是队员的就有是待安排的人
     * 而联系方式首先从User表中读, 然后有可能临时换电话, 所以Onduty表单独存一个字段
     * 如果要永久修改, 还是直接建议修改User表的这个字段
     *
     * @param user 添加的人
     * @param onDutyUserName 当条值班人姓名
     * @param onDutyTelephone 值班人员的联系方式
     * @param onDutyStartTime 值班周期开始时间
     * @param onDutyEndTime 值班周期结束时间
     * @return 结果
     */
    public ResultBean addOnDuty(User user, String onDutyUserName, String onDutyTelephone, String onDutyStartTime, String onDutyEndTime) {
        try {

            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

            OnDuty onDuty = new OnDuty();
            onDuty.setOnDutyUserName(onDutyUserName);
            onDuty.setOnDutyTelephone(onDutyTelephone);
            onDuty.setOnDutyStartTime(sdf.parse(onDutyStartTime));
            onDuty.setOnDutyEndTime(sdf.parse(onDutyEndTime));
            onDuty.setCreateUser(user.getUserId());
            onDuty.setCreateTime(new Date());
            onDuty.setUpdateUser(user.getUserId());
            onDuty.setUpdateTime(new Date());
            onDuty.setIsEffective(SysConst.LIVE);

            onDutyService.addOnDuty(onDuty);
            return new ResultBean(ResultCode.SUCCESS);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResultBean(ResultCode.SYSTEM_FAILED);
        }
    }

    /**
     * 为了不使时间线混乱, 删除操作只有超级管理员才能做
     *
     * @param user 删除操作人
     * @param onDutyId 删除的值班id
     * @return
     */
    public ResultBean deleteOnDuty(User user, long onDutyId) {
        try {

            List<OnDuty> onDutys = onDutyService.findOnDutyListByOnDutyId(onDutyId);

            if (onDutys.size() < 1) {
                return new ResultBean(ResultCode.FEEDBACK_COUNT_NULL_RECODE);
            }

            OnDuty onDuty = onDutys.get(0);

            onDuty.setUpdateUser(user.getUserId());
            onDuty.setUpdateTime(new Date());
            onDuty.setIsEffective(SysConst.NOT_LIVE);

            onDutyService.updateOnDuty(onDuty);
            return new ResultBean(ResultCode.SUCCESS);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResultBean(ResultCode.SYSTEM_FAILED);
        }
    }

    /**
     *
     * @param user 修改的人
     * @param onDutyId 修改的值班id
     * @param onDutyUserName 值班人姓名
     * @param onDutyTelephone 值班人员的联系方式
     * @param onDutyStartTime 值班周期开始时间
     * @param onDutyEndTime 值班周期结束时间
     * @return 结果
     */
    public ResultBean updateOnDuty(User user, Long onDutyId, String onDutyUserName, String onDutyTelephone,
                                   String onDutyStartTime, String onDutyEndTime) {
        try {

            List<OnDuty> onDutys = onDutyService.findOnDutyListByOnDutyId(onDutyId);

            if (onDutys.size() < 1) {
                return new ResultBean(ResultCode.FEEDBACK_COUNT_NULL_RECODE);
            }

            OnDuty onDuty = onDutys.get(0);

            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

            onDuty.setOnDutyUserName(onDutyUserName);
            onDuty.setOnDutyTelephone(onDutyTelephone);
            onDuty.setOnDutyStartTime(sdf.parse(onDutyStartTime));
            onDuty.setOnDutyEndTime(sdf.parse(onDutyEndTime));
            onDuty.setUpdateUser(user.getUserId());
            onDuty.setUpdateTime(new Date());

            onDutyService.updateOnDuty(onDuty);
            return new ResultBean(ResultCode.SUCCESS);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResultBean(ResultCode.SYSTEM_FAILED);
        }
    }

    /**
     *
     * @param onDutyUserName 名称
     * @param aOrs 排序规则(升序还是降序)
     * @param order 按照那个字段排序
     * @param pageNum 当前的页数
     * @param pageSize 一页的数量
     * @returnO
     */
    public ResultBean selectOnDuty(String onDutyUserName, String onDutyStartTime, String onDutyEndTime,
                                   int aOrs, String order, int pageNum, int pageSize) {
        try {
            Map<String, Object> map = new HashMap<>();
            if (pageNum < 0) {
                return new ResultBean(ResultCode.PARAM_ERROR, "页码不能小于0");
            }
            if (pageSize < 0) {
                return new ResultBean(ResultCode.PARAM_ERROR, "一页展示数量不能小于0");
            }
            int start = (pageNum - 1) * pageSize;
            int limit = pageSize;
            map.put("onDutyUserName", onDutyUserName);
            if (!StringUtil.isNull(onDutyStartTime)) map.put("onDutyStartTime", onDutyStartTime);
            if (!StringUtil.isNull(onDutyEndTime)) map.put("onDutyEndTime", onDutyEndTime);
//            System.out.println(onDutyStartTime);
//            System.out.println(onDutyEndTime);
            map.put("start", start);
            map.put("limit", limit);
            map.put("order", order);
            if (aOrs == 1) {
                map.put("aOrS", "DESC");
            } else {
                map.put("aOrS", "ASC");
            }
            map.put("isEffective", SysConst.LIVE);

            List<Map<String, Object>> list = onDutyService.findOnDutyMapListByQuery(map);

//            System.out.println("xierenyi " + list.size());

            if (list.size() < 1) {
                return new ResultBean(ResultCode.SYSTEM_FAILED);
            }

            if (list.size() > 0) {
                for (Map<String, Object> mapTemp : list) {
                    List<User> listUsers = userService.findUserListByUserId((Long)mapTemp.get("updateUser"));
                    User tUs = null;
                    if (listUsers.size() > 0) tUs = listUsers.get(0);
                    if (tUs != null) mapTemp.put("updateUser", tUs.getRealName());
                    mapTemp.put("onDutyStartTime", DateUtil.convDateToStr((Date) mapTemp.get("onDutyStartTime"), "yyyy-MM-dd"));
                    mapTemp.put("onDutyEndTime", DateUtil.convDateToStr((Date) mapTemp.get("onDutyEndTime"), "yyyy-MM-dd"));
                    mapTemp.put("updateTime", DateUtil.convDateToStr((Date) mapTemp.get("updateTime"), "yyyy-MM-dd HH:mm:ss"));

                    if ((Long) mapTemp.get("onDutyId") == 1 ) {
                        System.out.println(mapTemp.get("onDutyStartTime"));
                        System.out.println(mapTemp.get("onDutyEndTime"));
                    }
                }
            }



            int allNum = onDutyService.countOnDutyMapListByQuery(map);

            ListPage<List<Map<String, Object>>> listPage = ListPage.createListPage(pageNum, pageSize, allNum, list);

            return new ResultBean(ResultCode.SUCCESS, listPage);


        } catch (Exception e) {
            e.printStackTrace();
            return new ResultBean(ResultCode.SYSTEM_FAILED);
        }
    }

    /**
     * 根据值班id获取值班信息
     * 这个是为了解决一个bug, 删除表格一个元素后, 实际的记录还在, 当点修改时存来的记录就是已经删除的了
     * 所以修改需要通过id重新读取信息
     *
     * @param onDutyId 值班Id
     * @return
     */
    public ResultBean detailFriendUrl(long onDutyId) {
        try {
            List<OnDuty> onDutys = onDutyService.findOnDutyListByOnDutyId(onDutyId);

            if (onDutys.size() < 1) {
                return new ResultBean(ResultCode.PARAM_ERROR, "不存在该友链");
            }

            OnDuty onDuty = onDutys.get(0);

            return new ResultBean(ResultCode.SUCCESS, onDuty);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResultBean(ResultCode.SYSTEM_FAILED);
        }
    }

    // 关于时间可能不对等... 是本地数据库显示的数值不正确, 不是系统的问题...
    // 所以以实际出来的为主...

}
