package com.example.acm.service.deal.impl;

import com.example.acm.common.ResultBean;
import com.example.acm.common.ResultCode;
import com.example.acm.common.SysConst;
import com.example.acm.controller.PhotoController;
import com.example.acm.entity.User;
import com.example.acm.service.deal.PhotoDealService;
import com.example.acm.utils.UUIDUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.Date;
import java.util.UUID;

/**
 * @author xierenyi
 * @version 1.0
 * @date 2020-02-17 20:53
 */
@Service
public class PhotoDealServiceImpl implements PhotoDealService {

    private static final Logger LOG = LoggerFactory.getLogger(PhotoController.class);

    /**
     * 添加照片
     *
     * @param user 用户
     * @param id id
     * @param file 添加的照片
     * @return
     */
    public ResultBean addPhoto(User user, long id, MultipartFile file) {
        try {
            System.out.println("--开始");
            if (file.isEmpty()) {
                System.out.println("文件为空空");
            }
            String fileName = file.getOriginalFilename();  // 文件名
            String suffixName = fileName.substring(fileName.lastIndexOf("."));  // 后缀名
            if (!suffixName.endsWith("jpg")&&!suffixName.endsWith("jpeg")&&!suffixName.endsWith("png")) {
                return new ResultBean(ResultCode.PARAM_ERROR, "请上传图片");
            }
            String filePath = "/Users/xierenyi/xiexie/private/AcmWeChatSystem/image/photo/"; // 上传后的本地路径
            fileName = UUID.randomUUID() + suffixName; // 新文件名 File dest = new File(filePath + fileName);
            File dest = new File(filePath + fileName);
            System.out.println(filePath + fileName);
            if (!dest.getParentFile().exists()) {
                dest.getParentFile().mkdirs();
            }
            file.transferTo(dest);
            Long bigInteger = new Long(UUIDUtil.getNumUUID());
//            Photo photo = new Photo();
//            photo.setPhotoId(bigInteger);
//            photo.setPhotoName(DateUtils.convDateToStr(new Date(), "yyyy-MM-dd"));
//            photo.setCreateUser(user.getUserId());
//            photo.setCreateDate(new Date());
//            photo.setIsPublic(1);
//            photo.setIsEffective(1);
//            String url = "http://"+ SysConst.localhost+"/image/avatar/";
//            photo.setPhotoUrl(url + fileName);
//            photoService.addPhoto(photo);


            return new ResultBean(ResultCode.SUCCESS);

        }catch (Exception e) {

            LOG.error(e.getMessage());
            e.printStackTrace();
            return new ResultBean(ResultCode.SYSTEM_FAILED);
        }
    }

}
