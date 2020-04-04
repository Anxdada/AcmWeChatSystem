package com.example.acm.service.deal.impl;

import com.example.acm.common.ResultBean;
import com.example.acm.common.ResultCode;
import com.example.acm.common.SysConst;
import com.example.acm.config.RedisComponent;
import com.example.acm.entity.Comment;
import com.example.acm.entity.Comment;
import com.example.acm.entity.User;
import com.example.acm.service.CommentService;
import com.example.acm.service.PostService;
import com.example.acm.service.ReplyService;
import com.example.acm.service.UserService;
import com.example.acm.service.deal.CommentDealService;
import com.example.acm.utils.DateUtil;
import com.example.acm.utils.ListPage;
import com.example.acm.utils.StringUtil;
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
public class CommentDealServiceImpl implements CommentDealService {

    @Autowired
    private CommentService commentService;

    @Autowired
    private ReplyService replyService;

    @Autowired
    private UserService userService;

    @Autowired
    private PostService postService;

    @Autowired
    private RedisComponent redisComponent;

    /**
     * 添加评论
     * 可能是后台管理员添加的
     * 可能是前台用户添加的
     *
     * @param user 添加的人
     * @param commentBody 评论内容
     * @param replyPostId 评论的帖子ID 必然有, 依附关系
     * @return 结果
     */
    public ResultBean addComment(User user, String commentBody, long replyPostId) {
        try {

            Comment comment = new Comment();
            comment.setCommentBody(commentBody);
            comment.setReplyPostId(replyPostId);
            comment.setCreateUser(user.getUserId());
            comment.setCreateTime(new Date());
            comment.setUpdateUser(user.getUserId());
            comment.setUpdateTime(new Date());

            commentService.addComment(comment);

            return new ResultBean(ResultCode.SUCCESS);
        } catch (Exception e) {
            // log
            e.printStackTrace();
            return new ResultBean(ResultCode.SYSTEM_FAILED, String.valueOf(e));
        }
    }

    /**
     * 普通管理员可删除, 用户可删除本身的评论
     * 管理员删除主要就是因为举报..
     *
     * @param user 删除操作人
     * @param commentId 删除的评论id
     * @return
     */
    public ResultBean deleteComment(User user, long commentId) {
        try {
            List<Comment> list = commentService.findCommentListByCommentId(commentId);

            if (list.isEmpty()) return new ResultBean(ResultCode.SQL_NULL_RECODE, "数据库无记录!");

            Comment comment = list.get(0);
            comment.setUpdateUser(user.getUserId());
            comment.setUpdateTime(new Date());
            comment.setIsEffective(SysConst.NOT_LIVE);

            commentService.updateComment(comment);

            return new ResultBean(ResultCode.SUCCESS);
        } catch (Exception e) {
            // log
            e.printStackTrace();
            return new ResultBean(ResultCode.SYSTEM_FAILED, String.valueOf(e));
        }
    }

    /**
     * 只有评论的发表人才有权利修改, 管理员都是只能删除, 不能修改其它用户的评论
     * 应该不会要修改的功能了, 只能删除.. 然后不影响层级关系
     *
     * 主要是对照的几个平台(牛客, 简书等)都没有评论修改功能, 所以我也不做修改功能...
     *
     * 只用来更新like数量.. 内容没有更新操作
     *
     * @param user 修改的人
     * @param commentId 修改的评论id
     * @return 结果
     */
    public ResultBean updateComment(User user, long commentId) {
        try {
            List<Comment> list = commentService.findCommentListByCommentId(commentId);

            if (list.isEmpty()) return new ResultBean(ResultCode.SQL_NULL_RECODE, "数据库无记录!");

            Comment comment = list.get(0);
            String key = "comment"+commentId;
            int likeNum = (int)redisComponent.getSizeSetForKey(key);

            // 因为这个只是简单的存数量, 所以如果没有改变就没必要进行更新数据库的操作了
            if (comment.getLike() == likeNum) return new ResultBean(ResultCode.SUCCESS);

            comment.setLike(likeNum);
            commentService.updateComment(comment);

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
     * @param replyPostId 评论的帖子ID 必然有, 依附关系
     * @returnO
     */
    public ResultBean selectComment(User user, long replyPostId, int aOrs, String order, int pageNum, int pageSize) {
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
            map.put("replyPostId", replyPostId);
            map.put("start", start);
            map.put("limit", limit);
            map.put("order", order);
            if (aOrs == 1) {
                map.put("aOrS", "DESC");
            } else {
                map.put("aOrS", "ASC");
            }
            map.put("isEffective", SysConst.LIVE);

            List<Map<String, Object>> list = commentService.findCommentMapListByQuery(map);

            if (!list.isEmpty()) {
                for (Map<String, Object> mapTemp : list) {
                    mapTemp.put("isSame", user.getUserId() == (Long)mapTemp.get("createUser"));
                    // 这个是用于判断当前这个评论是不是登录管理员写的, 如果是那么他就可以修改他的评论

//                    // 还是需要保存一下Id值 用于展示个人信息
//                    mapTemp.put("userId", mapTemp.get("createUser"));
                    mapTemp.put("isFloorOwner", mapTemp.get("createUser") ==
                            postService.findPostListByPostId((Long)mapTemp.get("replyPostId")).get(0).getCreateUser());

                    List<User> listUsers = userService.findUserListByUserId((Long)mapTemp.get("createUser"));
                    User tUs = null;
                    if (!listUsers.isEmpty()) tUs = listUsers.get(0);
                    if (tUs != null) mapTemp.put("createUserDetail", tUs);
                    // 直接把这个用户的信息都传过来了, 因为电脑端需要再当前页面展示, 所以需要传...
                    mapTemp.put("createTime", DateUtil.convDateToStr((Date) mapTemp.get("createTime"), "yyyy-MM-dd HH:mm:ss"));

                    Map<String, Object> map2 = new HashMap<>();
                    map2.put("replyCommentId", (Long)mapTemp.get("commentId"));
                    map2.put("isEffective", SysConst.LIVE);
                    mapTemp.put("replyNum", replyService.countReplyList(map2));

                    // 点赞相关
                    String key = "comment" + mapTemp.get("commentId");
                    mapTemp.put("isNowUserLikeThisComment", redisComponent.hasMemberForKey(key, String.valueOf(user.getUserId())));
                }
            }

            int allNum = commentService.countCommentList(map);

            ListPage<List<Map<String, Object>>> listPage = ListPage.createListPage(pageNum, pageSize, allNum, list);

            return new ResultBean(ResultCode.SUCCESS, listPage);

        } catch (Exception e) {
            // log
            e.printStackTrace();
            return new ResultBean(ResultCode.SYSTEM_FAILED, String.valueOf(e));
        }
    }


    /**
     * 根据评论id获取评论信息
     * 这个是为了解决一个bug, 删除表格一个元素后, 实际的记录还在, 当点修改时存来的记录就是已经删除的了
     * 所以修改需要通过id重新读取信息
     *
     * @param user 操作的用户, 手机端判断楼主需要的信息
     * @param commentId 评论Id
     * @return
     */
    public ResultBean detailComment(User user, long commentId) {
        try {
            Map<String, Object> map = new HashMap<>();
            map.put("commentId", commentId);
            map.put("isEffective", SysConst.LIVE);

            List<Map<String, Object>> list = commentService.findCommentMapListByQuery(map);

            if (list.isEmpty()) return new ResultBean(ResultCode.SQL_NULL_RECODE, "数据库无记录!");

            Map<String, Object> mapTemp = list.get(0);

            // 手机端回复, 删除相关
            mapTemp.put("isSame", user.getUserId() == (Long)mapTemp.get("createUser"));

            // 需要用户的信息
            List<User> listUsers = userService.findUserListByUserId((Long)mapTemp.get("createUser"));
            User tUs = new User();
            if (!listUsers.isEmpty()) tUs = listUsers.get(0);
            mapTemp.put("createUserDetail", tUs);

            mapTemp.put("createTime", DateUtil.convDateToStr((Date) mapTemp.get("createTime"), "yyyy-MM-dd HH:mm:ss"));

            // 点赞相关
            String key = "comment" + mapTemp.get("commentId");
            mapTemp.put("isNowUserLikeThisComment", redisComponent.hasMemberForKey(key, String.valueOf(user.getUserId())));

            return new ResultBean(ResultCode.SUCCESS, mapTemp);
        } catch (Exception e) {
            // log
            e.printStackTrace();
            return new ResultBean(ResultCode.SYSTEM_FAILED, String.valueOf(e));
        }
    }
}
