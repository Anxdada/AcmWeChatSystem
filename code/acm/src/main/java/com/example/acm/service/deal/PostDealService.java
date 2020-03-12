package com.example.acm.service.deal;

import com.example.acm.common.ResultBean;
import com.example.acm.entity.User;

/**
 * @author xierenyi
 * @version 1.0
 * @date 2020-02-29 17:11
 */
public interface PostDealService {
    /**
     * 添加帖子
     * 可能是后台管理员添加的
     * 可能是前台用户添加的
     *
     * @param user 添加的人
     * @param postTitle 帖子标题
     * @param postTag 帖子的标签(二进制)
     * @param postBody 帖子内容
     * @return 结果
     */
    public ResultBean addPost(User user, String postTitle, int postTag, String postBody);

    /**
     * 普通管理员可删除, 用户可删除本身的帖子
     * 管理员删除主要就是因为举报..
     *
     * @param user 删除操作人
     * @param postId 删除的帖子id
     * @return
     */
    public ResultBean deletePost(User user, long postId);

    /**
     * 只有帖子的发表人才有权利修改, 管理员都是只能删除, 不能修改其它用户的帖子
     * 管理员修改的是精热置顶等操作
     *
     * @param user 修改的人
     * @param postId 修改的帖子id
     * @param postTitle 帖子标题
     * @param postTag 帖子的标签(二进制)
     * @param postBody 帖子内容
     * @param isHead 置顶
     * @param isGreat 精
     * @param isHot 热
     * @return 结果
     */
    public ResultBean updatePost(User user, long postId, String postTitle, int postTag, String postBody,
                                    int isHead, int isGreat, int isHot);

    /**
     *
     * @param user 当前的登录用户, 用户判定是否可以修改
     * @param postTag 帖子的标签(二进制)
     * @param postTitle 帖子标题
     * @param postStartTime 帖子开始时间
     * @param postEndTime 帖子结束时间
     * @param aOrs 排序规则(升序还是降序)
     * @param order 按照那个字段排序(如果相同, 会按照默认的规则, innodb就是按照)
     * @param pageNum 当前的页数
     * @param pageSize 一页的数量
     * @returnO
     */
    public ResultBean selectPost(User user, String postTitle, int postTag, String postStartTime, String postEndTime,
                                 int aOrs, String order, int pageNum, int pageSize);


    /**
     * 根据帖子id获取帖子信息
     * 这个是为了解决一个bug, 删除表格一个元素后, 实际的记录还在, 当点修改时存来的记录就是已经删除的了
     * 所以修改需要通过id重新读取信息
     *
     * @param postId 帖子Id
     * @return
     */
    public ResultBean detailPost(long postId);
}
