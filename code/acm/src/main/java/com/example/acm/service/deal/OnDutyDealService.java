package com.example.acm.service.deal;

import com.example.acm.common.ResultBean;
import com.example.acm.entity.User;

/**
 * @author xierenyi
 * @version 1.0
 * @date 2020-02-14 23:29
 */
public interface OnDutyDealService {
    /**
     * 添加值班
     * 注意这个这俩面的值班人员信息都是和User表关联的, 也就是队员的就有是待安排的人
     * 而联系方式首先从User表中读, 然后有可能临时换电话, 所以Onduty表单独存一个字段
     * 如果要永久修改, 还是直接建议修改User表的这个字段
     *
     * @param user 添加的人
     * @param onDutyUserName 当条值班人姓名
     * @param onDutyTelephone 值班人员的联系方式
     * @param onDutyStartTime 值班周期开始时间
     * @param onDutyEndTime 值班周期结束时间
     * @return 结果
     */
    public ResultBean addOnDuty(User user, String onDutyUserName, String onDutyTelephone, String onDutyStartTime, String onDutyEndTime);

    /**
     * 为了不使时间线混乱, 删除操作只有超级管理员才能做
     *
     * @param user 删除操作人
     * @param onDutyId 删除的值班id
     * @return
     */
    public ResultBean deleteOnDuty(User user, long onDutyId);

    /**
     *
     * @param user 修改的人
     * @param onDutyId 修改的值班id
     * @param onDutyUserName 值班人姓名
     * @param onDutyTelephone 值班人员的联系方式
     * @param onDutyStartTime 值班周期开始时间
     * @param onDutyEndTime 值班周期结束时间
     * @return 结果
     */
    public ResultBean updateOnDuty(User user, Long onDutyId, String onDutyUserName, String onDutyTelephone,
                                   String onDutyStartTime, String onDutyEndTime);

    /**
     *
     * @param onDutyUserName 值班人姓名
     * @param onDutyStartTime 值班周期开始时间
     * @param onDutyEndTime 值班周期结束时间
     * @param aOrs 排序规则(升序还是降序)
     * @param order 按照那个字段排序
     * @param pageNum 当前的页数
     * @param pageSize 一页的数量
     * @returnO
     */
    public ResultBean selectOnDuty(String onDutyUserName, String onDutyStartTime, String onDutyEndTime,
                                   int aOrs, String order, int pageNum, int pageSize);


    /**
     * 根据值班id获取值班信息
     * 这个是为了解决一个bug, 删除表格一个元素后, 实际的记录还在, 当点修改时存来的记录就是已经删除的了
     * 所以修改需要通过id重新读取信息
     *
     * @param onDutyId 值班Id
     * @return
     */
    public ResultBean detailFriendUrl(long onDutyId);

}
