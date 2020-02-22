package com.example.acm.service.deal;

import com.example.acm.common.ResultBean;

/**
 * @author xierenyi
 * @version 1.0
 * @date 2020-02-21 11:14
 */
public interface UserDealService {

    /**
     * 获取某一个用户的全部信息,
     *
     * @param userId
     * @return
     */
    public ResultBean detailUser(long userId);
}
