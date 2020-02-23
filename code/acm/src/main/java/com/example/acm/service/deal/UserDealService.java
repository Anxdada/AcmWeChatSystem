package com.example.acm.service.deal;

import com.example.acm.common.ResultBean;
import com.example.acm.entity.User;

/**
 * @author xierenyi
 * @version 1.0
 * @date 2020-02-21 11:14
 */
public interface UserDealService {

    /**
     * 更新操作
     *
     * @param user 操作人
     * @param userId 用户id
     * @param auth 新身份
     * @param grade 年级
     * @return
     */
    public ResultBean updateUserPC(User user, long userId, int auth, int grade);

    /**
     *
     * @param userName 用户名
     * @param realName 真实姓名
     * @param studentId 学号
     * @param auth 身份
     * @param aOrs 排序规则(升序还是降序)
     * @param order 按照那个字段排序
     * @param pageNum 当前的页数
     * @param pageSize 一页的数量
     * @return
     */
    public ResultBean selectUserPC(String userName, String realName, String studentId, int auth,
                                 int aOrs, String order, int pageNum, int pageSize);


    /**
     * 获取某一个用户的全部信息,
     *
     * @param userId
     * @return
     */
    public ResultBean detailUser(long userId);
}
