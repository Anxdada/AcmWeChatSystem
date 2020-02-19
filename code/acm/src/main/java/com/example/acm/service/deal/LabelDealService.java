package com.example.acm.service.deal;

import com.example.acm.common.ResultBean;
import com.example.acm.entity.User;

/**
 * @author xierenyi
 * @version 1.0
 * @date 2020-02-18 12:03
 */
public interface LabelDealService {

    /**
     * 添加帖子标签
     *
     * @param user 添加的人
     * @param labelName 帖子标签名称
     * @param labelColor 帖子标签颜色
     * @return 结果
     */
    public ResultBean addLabel(User user, String labelName, String labelColor);

    /**
     *
     * @param user 删除操作人
     * @param labelId 删除的帖子标签id
     * @return
     */
    public ResultBean deleteLabel(User user, long labelId);

    /**
     *
     * @param user 操作人
     * @param labelId id
     * @param labelName 帖子标签名称
     * @param labelColor 帖子标签颜色
     * @return
     */
    public ResultBean updateLabel(User user, long labelId, String labelName,
                                  String labelColor);


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
    public ResultBean selectLabel(String labelName, int aOrs, String order, int pageNum, int pageSize);


    /**
     *
     * @param labelId 帖子标签id
     * @return
     */
    public ResultBean detailLabel(long labelId);
}
