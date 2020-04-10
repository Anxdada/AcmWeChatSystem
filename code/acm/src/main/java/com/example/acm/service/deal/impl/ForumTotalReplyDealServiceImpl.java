package com.example.acm.service.deal.impl;

import com.example.acm.common.ResultBean;
import com.example.acm.common.ResultCode;
import com.example.acm.common.SysConst;
import com.example.acm.config.RedisComponent;
import com.example.acm.entity.*;
import com.example.acm.service.*;
import com.example.acm.service.deal.ForumTotalReplyDealService;
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
 * @date 2020-03-06 13:05
 */
@Service
public class ForumTotalReplyDealServiceImpl implements ForumTotalReplyDealService {

    @Autowired
    private ForumTotalReplyService forumTotalReplyService;

    @Autowired
    private UserService userService;

    @Autowired
    private PostService postService;

    @Autowired
    private CommentService commentService;

    @Autowired
    private ReplyService replyService;

    /**
     * 添加讨论区全部回复
     * 可能是后台管理员添加的
     * 可能是前台用户添加的
     *
     * @param user 添加的人
     * @param replyUserId 回复(帖子, 评论或者回复的 createUser)
     * @param type 回复的类型( 0 是帖子, 1 是评论, 2是回复)
     * @param typeCorrespondId 对应于type的id
     * @param forumTotalReplyBody 回复内容
     * @return 结果
     */
    public ResultBean addForumTotalReply(User user, long replyUserId, int type, long typeCorrespondId, String forumTotalReplyBody) {
        try {

            ForumTotalReply forumTotalReply = new ForumTotalReply();
            forumTotalReply.setReplyUserId(replyUserId);
            forumTotalReply.setType(type);
            forumTotalReply.setTypeCorrespondId(typeCorrespondId);
            forumTotalReply.setForumTotalReplyBody(forumTotalReplyBody);
            forumTotalReply.setCreateUser(user.getUserId());
            forumTotalReply.setCreateTime(new Date());
            forumTotalReply.setUpdateUser(user.getUserId());
            forumTotalReply.setUpdateTime(new Date());
            forumTotalReply.setIsEffective(SysConst.LIVE);

            forumTotalReplyService.addForumTotalReply(forumTotalReply);

            return new ResultBean(ResultCode.SUCCESS);
        } catch (Exception e) {
            // log
            e.printStackTrace();
            return new ResultBean(ResultCode.SYSTEM_FAILED, String.valueOf(e));
        }
    }

    /**
     * 普通管理员可删除, 用户可删除本身的讨论区全部回复
     * 管理员删除主要就是因为举报..
     *
     * @param user 删除操作人
     * @param forumTotalReplyId 删除的讨论区全部回复id
     * @return
     */
    public ResultBean deleteForumTotalReply(User user, long forumTotalReplyId) {
        try {
            List<ForumTotalReply> list = forumTotalReplyService.findForumTotalReplyListByForumTotalReplyId(forumTotalReplyId);

            if (list.isEmpty()) return new ResultBean(ResultCode.SQL_NULL_RECODE, "数据库无记录!");

            ForumTotalReply forumTotalReply = list.get(0);
            forumTotalReply.setUpdateUser(user.getUserId());
            forumTotalReply.setUpdateTime(new Date());
            forumTotalReply.setIsEffective(SysConst.NOT_LIVE);

            forumTotalReplyService.updateForumTotalReply(forumTotalReply);

            return new ResultBean(ResultCode.SUCCESS);
        } catch (Exception e) {
            // log
            e.printStackTrace();
            return new ResultBean(ResultCode.SYSTEM_FAILED, String.valueOf(e));
        }
    }


    // 因为不涉及更新操作, 所以就没写了, comment是涉及到了like的更新...

    /**
     *
     * @param user 当前的登录用户, 用户判定是否可以修改
     * @param replyUserId 回复(帖子, 评论或者回复的 createUser)
//     * @param type 回复的类型( 0 是帖子, 1 是评论)
     * @param aOrs 排序规则(升序还是降序)
     * @param order 按照那个字段排序(如果相同, 最好还是自己手写第二规则)
     * @param pageNum 当前的页数
     * @param pageSize 一页的数量
     * @returnO
     */
    public ResultBean selectForumTotalReply(User user, long replyUserId, int aOrs, String order, int pageNum, int pageSize) {
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
            map.put("replyUserId", replyUserId);
            map.put("start", start);
            map.put("limit", limit);
            map.put("order", order);
            if (aOrs == 1) {
                map.put("aOrS", "DESC");
            } else {
                map.put("aOrS", "ASC");
            }
            map.put("isEffective", SysConst.LIVE);

            List<Map<String, Object>> list = forumTotalReplyService.findForumTotalReplyMapListByQuery(map);

            if (!list.isEmpty()) {
                for (Map<String, Object> mapTemp : list) {
                    mapTemp.put("createTime", DateUtil.convDateToStr((Date) mapTemp.get("createTime"), "yyyy-MM-dd HH:mm:ss"));

                    List<User> listUsers = userService.findUserListByUserId((Long)mapTemp.get("createUser"));
                    User tUs = null;
                    if (!listUsers.isEmpty()) tUs = listUsers.get(0);
                    if (tUs != null) mapTemp.put("createUserDetail", tUs);


                    // 下面是获取回复了对应的内容后的一些信息
                    String textReply = "出错啦, 请检查selectForumTotalReply函数";
                    int type = (int)mapTemp.get("type");
                    long typeCorrespondId = (Long)mapTemp.get("typeCorrespondId");
                    if (type == 0) {
                        List<Post> tmpList = postService.findPostListByPostId(typeCorrespondId);
                        if (!tmpList.isEmpty()) textReply = tmpList.get(0).getPostTitle();
                    } else if (type == 1) {
                        List<Comment> tmpList = commentService.findCommentListByCommentId(typeCorrespondId);
                        if (!tmpList.isEmpty()) textReply = (String)tmpList.get(0).getCommentBody();
                    } else {
                        List<Reply> tmpList = replyService.findReplyListByReplyId(typeCorrespondId);
                        if (!tmpList.isEmpty()) {
                            textReply = (String)tmpList.get(0).getReplyBody();
                            mapTemp.put("typeCorrespondId", tmpList.get(0).getReplyCommentId());
                            // 因为跳转 只有 帖子 和 评论两种选择, 所以需要设置一下
                        }
                    }

                    mapTemp.put("textReply", textReply);
                }
            }

            int allNum = forumTotalReplyService.countForumTotalReplyList(map);

            ListPage<List<Map<String, Object>>> listPage = ListPage.createListPage(pageNum, pageSize, allNum, list);

            return new ResultBean(ResultCode.SUCCESS, listPage);

        } catch (Exception e) {
            // log
            e.printStackTrace();
            return new ResultBean(ResultCode.SYSTEM_FAILED, String.valueOf(e));
        }
    }


    // 用不到detail信息

    // 注意这个表都是依附于 comment 和 reply的, 所以没有单独的controller接口!!!, 这个表专为手机端服务,
    // 通知有人回复了你的帖子, 评论等
}
