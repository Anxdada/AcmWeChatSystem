package com.example.acm.service.deal.impl;

import com.example.acm.common.ResultBean;
import com.example.acm.common.ResultCode;
import com.example.acm.common.SysConst;
import com.example.acm.entity.Feedback;
import com.example.acm.entity.FeedbackCount;
import com.example.acm.entity.User;
import com.example.acm.service.FeedbackCountService;
import com.example.acm.service.FeedbackService;
import com.example.acm.service.UserService;
import com.example.acm.service.deal.FeedbackDealService;
import com.example.acm.utils.DateUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author xierenyi
 * @version 1.0
 * @date 2020-02-15 17:33
 */
@Service
public class FeedbackDealServiceImpl implements FeedbackDealService {

    private Logger LOG = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private FeedbackService feedbackService;

    @Autowired
    private FeedbackCountService feedbackCountService;

    @Autowired
    private UserService userService;

    /**
     * 添加一个反馈
     *
     * @param user 操作人
     * @param feedbackBody 反馈内容
     * @return
     */
    public ResultBean addFeedback(User user, String feedbackBody) {
        try {

            Feedback feedback = new Feedback();
            feedback.setFeedbackAvatar(user.getAvatar());
            feedback.setFeedbackUser(user.getUserId());
            feedback.setFeedbackBody(feedbackBody);
            feedback.setFeedbackTime(new Date());
            feedback.setIsEffective(SysConst.LIVE);

            System.out.println(feedback.getFeedbackBody() + " " + feedback.getFeedbackAvatar());

            feedbackService.addFeedback(feedback);
            return new ResultBean(ResultCode.SUCCESS);

        } catch (Exception e) {
            e.printStackTrace();
            LOG.error(e.getMessage());
            return new ResultBean(ResultCode.OTHER_FAIL);
        }
    }

    /**
     *  删除一个反馈
     *  规则是 自己只能删自己的, 超级管理员能删全部人的
     *
     * @param feedbackId 反馈Id
     * @return
     */
    public ResultBean deleteFeedback(long feedbackId) {
        try {

            Map<String, Object> map = new HashMap<>();
            map.put("feedbackId", feedbackId);
            map.put("isEffective", SysConst.LIVE);

            List<Feedback> list = feedbackService.findFeedbackListByQueryMap(map);

            if (list.size() < 1) return new ResultBean(ResultCode.FEEDBACK_COUNT_NULL_RECODE);

            list.get(0).setIsEffective(SysConst.NOT_LIVE);
            feedbackService.updateFeedback(list.get(0));
            return new ResultBean(ResultCode.SUCCESS);

        } catch (Exception e) {
            e.printStackTrace();
            LOG.error(e.getMessage());
            return new ResultBean(ResultCode.OTHER_FAIL);
        }
    }

    /**
     * 更新一个反馈
     * 规则是 只能自己只能修改自己的, 超级管理员没有权限修改任何人的
     * 不会更新时间, 这样楼层不会变
     *
     * @param feedbackId 反馈Id
     * @param feedbackBody 修改的内容
     */
    public ResultBean updateFeedback(long feedbackId, String feedbackBody) {
        try {

            Map<String, Object> map = new HashMap<>();
            map.put("feedbackId", feedbackId);
            map.put("isEffective", SysConst.LIVE);

            List<Feedback> list = feedbackService.findFeedbackListByQueryMap(map);

//            System.out.println(list.size());
            if (list.size() < 1) return new ResultBean(ResultCode.FEEDBACK_COUNT_NULL_RECODE);

            list.get(0).setFeedbackBody(feedbackBody);
            System.out.println(list.get(0).getFeedbackId());
            feedbackService.updateFeedback(list.get(0));
//            System.out.println(list.get(0).getFeedbackBody());
            return new ResultBean(ResultCode.SUCCESS);

        } catch (Exception e) {
            e.printStackTrace();
            LOG.error(e.getMessage());
            return new ResultBean(ResultCode.OTHER_FAIL);
        }
    }

    /**
     * 提取所有反馈, 因为涉及当前用户的判断, 所以需要Deal
     *
     * @param user 当前的操作用户
     */
    public ResultBean selectFeedback(User user) {

        try {
            // 取评论都是默认按照发表时间大的在前面, 也就是最近发表的在前面
            Map<String, Object> map = new HashMap<>();
            map.put("order", "feedbackTime");
            map.put("aOrS", "DESC");
            map.put("isEffective", SysConst.LIVE);

            List<Map<String, Object>> list = feedbackService.findFeedbackListMapByQueryMap(map);

            if (list.size() > 0) {
                for (Map<String, Object> mapTemp : list) {
                    List<User> listUsers = userService.findUserListByUserId((Long)mapTemp.get("feedbackUser"));
                    User tUs = null;
                    if (listUsers.size() > 0) tUs = listUsers.get(0);
                    if (tUs != null) mapTemp.put("feedbackUserRealName", tUs.getRealName());

                    mapTemp.put("nowUser", user.getUserId());
                    mapTemp.put("nowUserAuth", user.getAuth());

                    Map<String, Object> mapTT = new HashMap<>();
                    mapTT.put("order", "operateTime");
                    mapTT.put("aOrS", "DESC");
                    mapTT.put("userId", user.getUserId());
                    mapTT.put("feedbackId", mapTemp.get("feedbackId"));
                    mapTT.put("isEffective", SysConst.LIVE);
                    List<FeedbackCount> listFeedbackCount = feedbackCountService.findFeedbackCountListByQueryMap(mapTT);
                    mapTemp.put("type", 0);  // 这个是默认值, 如果操作过, 覆盖就行
                    //System.out.println(user.getUserId() + " " + mapTemp.get("feedbackId"));
                    //System.out.println("xierenyi" + listFeedbackCount.get(0).getType());
                    if (listFeedbackCount.size() > 0) mapTemp.put("type", listFeedbackCount.get(0).getType());

                    mapTT.remove("order");
                    mapTT.remove("aOrS");
                    mapTT.remove("userId");

                    mapTT.put("type", 1);
                    mapTemp.put("like", feedbackCountService.countFeedbackCountByQueryMap(mapTT));
                    mapTT.put("type", -1);
                    mapTemp.put("dislike", feedbackCountService.countFeedbackCountByQueryMap(mapTT));

                    mapTemp.put("feedbackTime", DateUtil.convDateToStr((Date) mapTemp.get("feedbackTime"), "yyyy-MM-dd HH:mm:ss"));

                }
            }

    //        System.out.println(list.size());

            return new ResultBean(ResultCode.SUCCESS, list);

        } catch (Exception e) {
            e.printStackTrace();
            LOG.error(e.getMessage());
            return new ResultBean(ResultCode.OTHER_FAIL);
        }
    }
}
