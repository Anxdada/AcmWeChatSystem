package com.example.acm.service.deal.impl;

import com.example.acm.common.ResultBean;
import com.example.acm.common.ResultCode;
import com.example.acm.common.SysConst;
import com.example.acm.entity.Label;
import com.example.acm.entity.User;
import com.example.acm.service.LabelService;
import com.example.acm.service.UserService;
import com.example.acm.service.deal.LabelDealService;
import com.example.acm.utils.DateUtil;
import com.example.acm.utils.ListPage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * @author xierenyi
 * @version 1.0
 * @date 2020-02-18 12:03
 */
@Service
public class LabelDealServiceImpl implements LabelDealService {

    @Autowired
    private LabelService labelService;

    @Autowired
    private UserService userService;

    /**
     * 添加友链
     * @param user 添加的人
     * @param labelName 帖子标签名称
     * @param labelColor 帖子标签颜色
     * @return 结果
     */
    public ResultBean addLabel(User user, String labelName, String labelColor) {
        try {

            List<Label> list = labelService.findLabelListByLabelId(null);
            Collections.sort(list, new Comparator<Label>() {
                @Override
                public int compare(Label a, Label b) {
                    Long ans = a.getFlag() - b.getFlag();
                    return ans.intValue();
                }
            });
            long flag = list.size();
            for (int i = 0 ; i < list.size() ; ++ i) {
                if (list.get(i).getFlag() != i) {
                    flag = i;
                    break;
                }
            }

            Label label = new Label();
            label.setLabelName(labelName);
            label.setLabelColor(labelColor);
            label.setFlag(flag);
            label.setCreateUser(user.getUserId());
            label.setCreateTime(new Date());
            label.setUpdateUser(user.getUserId());
            label.setUpdateTime(new Date());
            label.setIsEffective(SysConst.LIVE);

            labelService.addLabel(label);

            return new ResultBean(ResultCode.SUCCESS);

        } catch (Exception e) {
            // log
            e.printStackTrace();
            return new ResultBean(ResultCode.SYSTEM_FAILED);
        }
    }

    /**
     *
     * @param user 删除操作人
     * @param labelId 删除的帖子标签id
     * @return
     */
    public ResultBean deleteLabel(User user, long labelId) {
        try {

            List<Label> list = labelService.findLabelListByLabelId(labelId);
            if (list.size() < 0) {
                return new ResultBean(ResultCode.SYSTEM_FAILED, "无该条记录, 请检查你的代码!");
            }

            Label label = list.get(0);
            label.setUpdateUser(user.getUserId());
            label.setUpdateTime(new Date());
            label.setIsEffective(SysConst.NOT_LIVE);

            labelService.updateLabel(label);

            return new ResultBean(ResultCode.SUCCESS);

        } catch (Exception e) {
            // log
            e.printStackTrace();
            return new ResultBean(ResultCode.SYSTEM_FAILED);
        }
    }

    /**
     *
     * @param user 操作人
     * @param labelId id
     * @param labelName 帖子标签名称
     * @param labelColor 帖子标签颜色
     * @return
     */
    public ResultBean updateLabel(User user, long labelId, String labelName,
                                  String labelColor) {
        try {

            List<Label> list = labelService.findLabelListByLabelId(labelId);
            if (list.size() < 0) {
                return new ResultBean(ResultCode.SYSTEM_FAILED, "无该条记录, 请检查你的代码!");
            }

            Label label = list.get(0);
            label.setLabelName(labelName);
            label.setLabelColor(labelColor);
            label.setUpdateUser(user.getUserId());
            label.setUpdateTime(new Date());

            labelService.updateLabel(label);

            return new ResultBean(ResultCode.SUCCESS);

        } catch (Exception e) {
            // log
            e.printStackTrace();
            return new ResultBean(ResultCode.SYSTEM_FAILED);
        }
    }


    /**
     * 根据查询条件获取帖子标签列表(Map)
     *
     *
     * @param labelName 帖子标签名称
     * @param aOrs 升序还是降序
     * @param order 按那个字段排序
     * @param pageNum 第几页
     * @param pageSize 一页的大小
     * @return 结果
     */
    public ResultBean selectLabel(String labelName, int aOrs, String order, int pageNum, int pageSize) {
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
            map.put("labelName", labelName);
            map.put("start", start);
            map.put("limit", limit);
            map.put("order", order);
            if (aOrs == 1) {
                map.put("aOrS", "DESC");
            } else {
                map.put("aOrS", "ASC");
            }
            map.put("isEffective", SysConst.LIVE);

            List<Map<String, Object>> list = labelService.findLabelMapListByQuery(map);

//            System.out.println("xierenyi " + list.size());

            if (list.size() >0) {
                for (Map<String, Object> mapTemp : list) {

                    List<User> listUsers = userService.findUserListByUserId((Long)mapTemp.get("updateUser"));
                    User tUs = null;
                    if (listUsers.size() > 0) tUs = listUsers.get(0);
                    if (tUs != null) mapTemp.put("updateUser", tUs.getRealName());

                    mapTemp.put("updateTime", DateUtil.convDateToStr((Date) mapTemp.get("updateTime"), "yyyy-MM-dd HH:mm:ss"));
                }
            }


            int allNum = labelService.countLabelMapListByQuery(map);

            ListPage<List<Map<String, Object>>> listPage = ListPage.createListPage(pageNum, pageSize, allNum, list);

            return new ResultBean(ResultCode.SUCCESS, listPage);

        } catch(Exception e) {
            // log
            e.printStackTrace();
            return new ResultBean(ResultCode.SYSTEM_FAILED);
        }
    }

    /**
     *
     * @param labelId 帖子标签id
     * @return
     */
    public ResultBean detailLabel(long labelId) {
        try {

//            System.out.println(labelId);

            List<Label> list = labelService.findLabelListByLabelId(labelId);

            if (list.size() < 0) {
                return new ResultBean(ResultCode.SYSTEM_FAILED, "无该条记录, 请检查你的代码!");
            }

            return new ResultBean(ResultCode.SUCCESS, list.get(0));

        } catch (Exception e) {
            // log
            e.printStackTrace();
            return new ResultBean(ResultCode.SYSTEM_FAILED);
        }
    }
}
