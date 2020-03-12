package com.example.acm.service.deal.impl;

import com.example.acm.common.ResultBean;
import com.example.acm.common.ResultCode;
import com.example.acm.common.SysConst;
import com.example.acm.config.RedisComponent;
import com.example.acm.entity.Reply;
import com.example.acm.entity.User;
import com.example.acm.service.ReplyService;
import com.example.acm.service.UserService;
import com.example.acm.service.deal.ReplyDealService;
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
 * @date 2020-03-07 22:48
 */
@Service
public class ReplyDealServiceImpl implements ReplyDealService {

    @Autowired
    private ReplyService replyService;

    @Autowired
    private UserService userService;

    // 点赞操作的
    @Autowired
    private RedisComponent redisComponent;

    /**
     * 添回复
     * 可能是后台管理员添加的
     * 可能是前台用户添加的
     *
     * @param user 添加的人
     * @param replyBody 回复内容
     * @param replyCommentId 回复的评论ID 这个值肯定存在
     * @param reverseReplyId 回复的 回复Id (如果是直接回复的评论, 那么这个值就是-1) 和回复中的回复 讨论 那么就是有值
     * @return 结果
     */
    public ResultBean addReply(User user, String replyBody, long replyCommentId, long reverseReplyId) {
        try {

            Reply reply = new Reply();
            reply.setReplyBody(replyBody);
            reply.setReplyCommentId(replyCommentId);
            reply.setReverseReplyId(reverseReplyId);
            reply.setCreateUser(user.getUserId());
            reply.setCreateTime(new Date());
            reply.setUpdateUser(user.getUserId());
            reply.setUpdateTime(new Date());

            replyService.addReply(reply);

            return new ResultBean(ResultCode.SUCCESS);
        } catch (Exception e) {
            // log
            e.printStackTrace();
            return new ResultBean(ResultCode.SYSTEM_FAILED, String.valueOf(e));
        }
    }

    /**
     * 普通管理员可删除, 用户可删除本身回复
     * 管理员删除主要就是因为举报..
     *
     * @param user 删除操作人
     * @param replyId 删除回复id
     * @return
     */
    public ResultBean deleteReply(User user, long replyId) {
        try {
            List<Reply> list = replyService.findReplyListByReplyId(replyId);

            if (list.isEmpty()) return new ResultBean(ResultCode.SQL_NULL_RECODE, "数据库无记录!");

            Reply Reply = list.get(0);
            Reply.setUpdateUser(user.getUserId());
            Reply.setUpdateTime(new Date());
            Reply.setIsEffective(SysConst.NOT_LIVE);

            replyService.updateReply(Reply);

            return new ResultBean(ResultCode.SUCCESS);
        } catch (Exception e) {
            // log
            e.printStackTrace();
            return new ResultBean(ResultCode.SYSTEM_FAILED, String.valueOf(e));
        }
    }

    /**
     * 只回复的发表人才有权利修改, 管理员都是只能删除, 不能修改其它用户回复
     *
     * 不一定有这个操作..
     * 只能删除掉..
     *
     * 这个操作目前只用来更新点赞数.. like
     *
     * @param user 修改的人
     * @param replyId 修改回复id
     * @return 结果
     */
    public ResultBean updateReply(User user, long replyId) {
        try {
            List<Reply> list = replyService.findReplyListByReplyId(replyId);

            if (list.isEmpty()) return new ResultBean(ResultCode.SQL_NULL_RECODE, "数据库无记录!");

            Reply reply = list.get(0);
            String key = "reply"+replyId;
//            System.out.println(key);
            int likeNum = (int)redisComponent.getSizeSetForKey(key);

            // 因为这个只是简单的存数量, 所以如果没有改变就没必要进行更新数据库的操作了
            if (reply.getLike() == likeNum) return new ResultBean(ResultCode.SUCCESS);

            reply.setLike(likeNum);
            replyService.updateReply(reply);
            return new ResultBean(ResultCode.SUCCESS);
        } catch (Exception e) {
            // log
            e.printStackTrace();
            return new ResultBean(ResultCode.SYSTEM_FAILED, String.valueOf(e));
        }
    }

    /**
     *
     * @param user 当前的登录用户, 用户判定是否可以修改
     * @param replyCommentId 回复的评论ID 必然不为空
     * @returnO
     */
    public ResultBean selectReply(User user, long replyCommentId, int aOrs, String order, int pageNum, int pageSize) {
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
            map.put("replyCommentId", replyCommentId);
            map.put("start", start);
            map.put("limit", limit);
            map.put("order", order);
            if (aOrs == 1) {
                map.put("aOrS", "DESC");
            } else {
                map.put("aOrS", "ASC");
            }
            map.put("isEffective", SysConst.LIVE);

            List<Map<String, Object>> list = replyService.findReplyMapListByQuery(map);

            if (!list.isEmpty()) {
                for (Map<String, Object> mapTemp : list) {
                    mapTemp.put("isSame", user.getUserId() == (Long)mapTemp.get("createUser"));
                    // 这个是用于判断当前这回复是不是登录管理员写的, 如果是那么他就可以修改他回复

//                    // 还是需要保存一下Id值 用于展示个人信息
//                    mapTemp.put("userId", mapTemp.get("createUser"));

                    List<User> listUsers = userService.findUserListByUserId((Long)mapTemp.get("createUser"));
                    User tUs = null;
                    if (!listUsers.isEmpty()) tUs = listUsers.get(0);
                    if (tUs != null) mapTemp.put("createUser", tUs.getRealName());
                    if (tUs != null) mapTemp.put("createUserDetail", tUs);

                    // 这个是取回复Id的一些相关信息的
                    if ((Long)mapTemp.get("reverseReplyId") != -1) {
                        List<Reply> listReply = replyService.findReplyListByReplyId((Long)mapTemp.get("reverseReplyId"));

                        if (listReply.isEmpty()) return new ResultBean(ResultCode.SQL_NULL_RECODE, "数据库无该回复记录");
                        listUsers = userService.findUserListByUserId(listReply.get(0).getCreateUser());
                        tUs = null;
                        if (!listUsers.isEmpty()) tUs = listUsers.get(0);
                        if (tUs != null) mapTemp.put("replyUserName", tUs.getUserName());
                        if (tUs != null) mapTemp.put("replyRealName", tUs.getRealName());
                        if (tUs != null) mapTemp.put("replyUserDetail", tUs);
                    }
                    mapTemp.put("createTime", DateUtil.convDateToStr((Date) mapTemp.get("createTime"), "yyyy-MM-dd HH:mm:ss"));

                    // 点赞的
                    String key = "reply" + mapTemp.get("replyId");
//                    mapTemp.put("likeTotal", redisComponent.getSizeSetForKey(key));
                    mapTemp.put("isNowUserLikeThisReply", redisComponent.hasMemberForKey(key, String.valueOf(user.getUserId())));
                }
            }

            int allNum = replyService.countReplyList(map);

            ListPage<List<Map<String, Object>>> listPage = ListPage.createListPage(pageNum, pageSize, allNum, list);

            return new ResultBean(ResultCode.SUCCESS, listPage);

        } catch (Exception e) {
            // log
            e.printStackTrace();
            return new ResultBean(ResultCode.SYSTEM_FAILED, String.valueOf(e));
        }
    }


    /**
     * 根回复id获回复信息
     * 这个是为了解决一个bug, 删除表格一个元素后, 实际的记录还在, 当点修改时存来的记录就是已经删除的了
     * 所以修改需要通过id重新读取信息
     *
     * @param replyId 回复Id
     * @return
     */
    public ResultBean detailReply(long replyId) {
        try {
            List<Reply> list = replyService.findReplyListByReplyId(replyId);

            if (list.isEmpty()) return new ResultBean(ResultCode.SQL_NULL_RECODE, "数据库无记录!");

            Reply reply = list.get(0);

            return new ResultBean(ResultCode.SUCCESS, reply);
        } catch (Exception e) {
            // log
            e.printStackTrace();
            return new ResultBean(ResultCode.SYSTEM_FAILED, String.valueOf(e));
        }
    }
}
