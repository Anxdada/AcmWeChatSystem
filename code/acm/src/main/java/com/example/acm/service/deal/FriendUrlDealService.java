package com.example.acm.service.deal;

import com.example.acm.common.ResultBean;
import com.example.acm.entity.User;

import java.util.Date;

/**
 * @author xierenyi
 * @version 1.0
 * @date 2020-02-10 10:51
 */
public interface FriendUrlDealService {
    /**
     * 添加友链
     * @param user 添加的人
     * @param friendUrlName 友链名称
     * @param friendUrlAddress 友链地址
     * @param friendUrlTag 友链分类
     * @return 结果
     */
    public ResultBean addFriendUrl(User user, String friendUrlName, String friendUrlAddress, String friendUrlTag);

    /**
     *
     * @param user 删除操作人
     * @param friendUrlId 删除的友链id
     * @return
     */
    public ResultBean deleteFriendUrl(User user, long friendUrlId);

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
    public ResultBean updateFriendUrl(User user, long friendUrlId, String friendUrlName, String friendUrlAddress, String friendUrlTag, String createTime);

    /**
     *
     * @param friendUrlName 名称
     * @param aOrs 排序规则(升序还是降序)
     * @param order 按照那个字段排序
     * @param pageNum 当前的页数
     * @param pageSize 一页的数量
     * @return
     */
    public ResultBean selectFriendUrl(String friendUrlName, int aOrs, String order, int pageNum, int pageSize);

    /**
     *
     * @param user 操作人
     * @param friendUrlId 友链Id
     * @return
     */
    public ResultBean detailFriendUrl(User user, long friendUrlId);
}
