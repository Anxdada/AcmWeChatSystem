package com.example.acm.service.deal;

import com.example.acm.common.ResultBean;
import com.example.acm.entity.User;
import org.springframework.web.multipart.MultipartFile;

/**
 * @author xierenyi
 * @version 1.0
 * @date 2020-02-17 20:53
 */
public interface PhotoDealService {


    /**
     * 添加照片
     *
     * @param user 用户
     * @param id id
     * @param file 添加的照片
     * @return
     */
    public ResultBean addPhoto(User user, long id, MultipartFile file);
}
