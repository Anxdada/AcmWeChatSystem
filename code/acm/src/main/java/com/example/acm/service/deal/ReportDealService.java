package com.example.acm.service.deal;

import com.example.acm.common.ResultBean;
import com.example.acm.entity.User;

/**
 * @author xierenyi
 * @version 1.0
 * @date 2020-05-01 20:14
 */
public interface ReportDealService {
    /**
     * 添加举报
     * @param user 添加的人
     * @param type 举报类型(post/user)
     * @param typeId 举报类型对应的id
     * @param reportBody 举报说明
     * @param reason 理由
     * @return 结果
     */
    public ResultBean addReport(User user, String type, int typeId, String reportBody, String reason);

    /**
     *
     * @param user 操作人
     * @param reportId 举报编号
     * @param result 处理结果
     * @param isHandle 是否处理 (如果处理了该个举报, 那么一定有处理结果)
     * @return
     */
    public ResultBean updateReport(User user, long reportId, String result, int isHandle);

    /**
     *
     * @param createUser 公众号手机用户需要使用到, 查询自己的举报
     * @param aOrs 排序规则(升序还是降序)
     * @param order 按照那个字段排序
     * @param pageNum 当前的页数
     * @param pageSize 一页的数量
     * @return
     */
    public ResultBean selectReport(long createUser, int aOrs, String order, int pageNum, int pageSize);

}