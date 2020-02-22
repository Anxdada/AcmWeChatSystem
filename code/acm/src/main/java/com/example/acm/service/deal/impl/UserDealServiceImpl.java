package com.example.acm.service.deal.impl;

import com.example.acm.common.ResultBean;
import com.example.acm.common.ResultCode;
import com.example.acm.entity.User;
import com.example.acm.service.UserService;
import com.example.acm.service.deal.UserDealService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author xierenyi
 * @version 1.0
 * @date 2020-02-21 11:14
 */
@Service
public class UserDealServiceImpl implements UserDealService {

    @Autowired
    private UserService userService;

    /**
     * 获取某一个用户的全部信息,
     *
     * @param userId
     * @return
     */
    public ResultBean detailUser(long userId) {
        try {

            List<User> list = userService.findUserListByUserId(userId);

            if (list.size() < 1) {
                return new ResultBean(ResultCode.SQL_NULL_RECODE);
            }

            return new ResultBean(ResultCode.SUCCESS, list.get(0));

        } catch (Exception e) {
            // log
            e.printStackTrace();
            return new ResultBean(ResultCode.SYSTEM_FAILED);
        }
    }
}
