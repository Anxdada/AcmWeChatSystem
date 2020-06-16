package com.example.acm.service.deal;

import com.example.acm.common.ResultBean;
import com.example.acm.entity.User;

/**
 * @author xierenyi
 * @version 1.0
 * @date 2020-02-15 17:33
 */
public interface RegisterDealService {

    /**
     * 添加一个报名
     *
     * @param user 操作人
     * @return
     */
    public ResultBean addRegister(User user, long announcementId);

    /**
     *  删除一个报名
     *
     * @param user
     * @param registerId 报名Id
     * @return
     */
    public ResultBean deleteRegister(User user, long registerId);

    /**
     *  修改一个报名
     *
     * @param user
     * @param registerId 注册id
     * @param studentId 学号
     * @return realName 姓名
     */
    public ResultBean updateRegister(User user, long registerId, String studentId, String realName);

    /**
     * 提取所有报名
     *
     * @param announcementId 对应的公告id
     * @param studentId 搜索的学号
     */
    public ResultBean selectRegister(long announcementId, String studentId);

}
