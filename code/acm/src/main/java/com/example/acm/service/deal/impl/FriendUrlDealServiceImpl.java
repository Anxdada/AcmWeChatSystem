package com.example.acm.service.deal.impl;


import com.example.acm.common.ResultBean;
import com.example.acm.common.ResultCode;
import com.example.acm.common.SysConst;
import com.example.acm.entity.FriendUrl;
import com.example.acm.service.UserService;
import com.example.acm.utils.*;
import com.example.acm.entity.User;
import com.example.acm.service.FriendUrlService;
import com.example.acm.service.deal.FriendUrlDealService;
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
 * @date 2020-02-10 10:49
 */
@Service
public class FriendUrlDealServiceImpl implements FriendUrlDealService {

    @Autowired
    private FriendUrlService friendUrlService;

    @Autowired
    private UserService userService;

    /**
     * 添加友链
     * @param user 添加的人
     * @param friendUrlName 友链名称
     * @param friendUrlAddress 友链地址
     * @param friendUrlTag 友链分类
     * @return 结果
     */
    public ResultBean addFriendUrl(User user, String friendUrlName, String friendUrlAddress, String friendUrlTag){

        try {
            if (!URLUtil.isAvailable(friendUrlAddress, 2000, 2)) {
                return new ResultBean(ResultCode.PARAM_ERROR, "连接超时! 请尝试自己能否访问后再次尝试");
            }

            FriendUrl friendUrl = new FriendUrl();
            friendUrl.setFriendUrlName(friendUrlName);
            friendUrl.setFriendUrlAddress(friendUrlAddress);
            friendUrl.setFriendUrlTag(friendUrlTag);
            friendUrl.setCreateUser(user.getUserId());
            friendUrl.setCreateTime(new Date());
            friendUrl.setUpdateUser(user.getUserId());
            friendUrl.setUpdateTime(new Date());
            friendUrl.setIsEffective(SysConst.LIVE);

            friendUrlService.addFriendUrl(friendUrl);

            return new ResultBean(ResultCode.SUCCESS);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResultBean(ResultCode.SYSTEM_FAILED);
        }
    }

    /**
     *
     * @param user 删除操作人
     * @param friendUrlId 删除的友链id
     * @return
     */
    public ResultBean deleteFriendUrl(User user, long friendUrlId){
        try {
            List<FriendUrl> friendUrls = friendUrlService.findFriendUrlListByFriendUrlId(friendUrlId);

            if (friendUrls.size() < 1) {
                return new ResultBean(ResultCode.PARAM_ERROR, "不存在该友链");
            }

            FriendUrl friendUrl = friendUrls.get(0);

            friendUrl.setUpdateUser(user.getUserId());
            friendUrl.setUpdateTime(new Date());
            friendUrl.setIsEffective(SysConst.NOT_LIVE);
            friendUrlService.updateFriendUrl(friendUrl);

            return new ResultBean(ResultCode.SUCCESS);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResultBean(ResultCode.SYSTEM_FAILED);
        }
    }

    /**
     *
     * @param user 操作人
     * @param friendUrlId id
     * @param friendUrlName 名称
     * @param friendUrlAddress 地址
     * @param friendUrlTag 类别
     * @param createTime 创建时间
     * @return
     */
    public ResultBean updateFriendUrl(User user, long friendUrlId, String friendUrlName, String friendUrlAddress,
                                      String friendUrlTag, String createTime) {
        try {
            if (!URLUtil.isAvailable(friendUrlAddress, 2000, 2)) {
                return new ResultBean(ResultCode.PARAM_ERROR, "连接超时! 请尝试自己能否访问后再次尝试");
            }

            List<FriendUrl> friendUrls = friendUrlService.findFriendUrlListByFriendUrlId(friendUrlId);
            if (friendUrls.size()<1) {
                return new ResultBean(ResultCode.PARAM_ERROR, "不存在该友链");
            }
            FriendUrl friendUrl = friendUrls.get(0);

            friendUrl.setFriendUrlName(friendUrlName);
            friendUrl.setFriendUrlAddress(friendUrlAddress);
            friendUrl.setFriendUrlTag(friendUrlTag);
            friendUrl.setUpdateUser(user.getUserId());
            friendUrl.setUpdateTime(new Date());
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            try {
                friendUrl.setCreateTime(sdf.parse(createTime));
            } catch (Exception e) {
                e.printStackTrace();
            }


            friendUrlService.updateFriendUrl(friendUrl);

            return new ResultBean(ResultCode.SUCCESS);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResultBean(ResultCode.SYSTEM_FAILED);
        }
    }

    /**
     *
     * @param friendUrlName 名称
     * @param aOrs 排序规则(升序还是降序)
     * @param order 按照那个字段排序
     * @param pageNum 当前的页数
     * @param pageSize 一页的数量
     * @return
     */
    public ResultBean selectFriendUrl(String friendUrlName, int aOrs, String order, int pageNum, int pageSize){
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
            map.put("friendUrlName", friendUrlName);
            map.put("start", start);
            map.put("limit", limit);
            map.put("order", order);
            if (aOrs == 1) {
                map.put("aOrS", "DESC");
            } else {
                map.put("aOrS", "ASC");
            }
            map.put("isEffective", SysConst.LIVE);
//        System.out.println("xierenyi");
            List<Map<String, Object>> list = friendUrlService.findFriendUrlMapListByQuery(map);

            //System.out.println(list.size());

            if (list.size() > 0) {
                for (Map<String, Object> mapTemp : list) {
//                System.out.println((Long)mapTemp.get("updateUser"));
                    List<User> listUsers = userService.findUserListByUserId((Long) mapTemp.get("updateUser"));
                    User tUs = null;
                    if (listUsers.size() > 0) tUs = listUsers.get(0);
                    if (tUs != null) mapTemp.put("updateUser", tUs.getRealName());
//                mapTemp.put("createTime", DateUtil.convDateToStr((Date) mapTemp.get("createTime"), "yyyy-MM-dd HH:mm:ss"));
                    mapTemp.put("updateTime", DateUtil.convDateToStr((Date) mapTemp.get("updateTime"), "yyyy-MM-dd HH:mm:ss"));
                }
            }


            int allNum = friendUrlService.countFriendUrlMapListByQuery(map);

            ListPage<List<Map<String, Object>>> listPage = ListPage.createListPage(pageNum, pageSize, allNum, list);

            return new ResultBean(ResultCode.SUCCESS, listPage);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResultBean(ResultCode.SYSTEM_FAILED);
        }
    }

    /**
     *
     * @param user 操作人
     * @param friendUrlId 友链Id
     * @return
     */
    public ResultBean detailFriendUrl(User user, long friendUrlId) {
        try {
            List<FriendUrl> friendUrls = friendUrlService.findFriendUrlListByFriendUrlId(friendUrlId);

            if (friendUrls.size() < 1) {
                return new ResultBean(ResultCode.PARAM_ERROR, "不存在该友链");
            }

            FriendUrl friendUrl = friendUrls.get(0);

            return new ResultBean(ResultCode.SUCCESS, friendUrl);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResultBean(ResultCode.SYSTEM_FAILED);
        }
    }

}
