package com.example.acm.controller;

import com.example.acm.common.ResultBean;
import com.example.acm.common.ResultCode;
import com.example.acm.entity.User;
import com.example.acm.service.deal.PhotoDealService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @author xierenyi
 * @version 1.0
 * @date 2020-02-17 20:33
 */
@Controller
@RequestMapping(value = "/photo")
public class PhotoController extends BaseController {

    private static final Logger LOG = LoggerFactory.getLogger(PhotoController.class);

    @Autowired
    private PhotoDealService photoDealService;

    @PostMapping("/addPhoto")
    @ResponseBody
    public ResultBean addPhoto(@RequestParam(value = "albumId", required = true) int albumId,
                               @RequestParam(value = "myFileName", required = true) MultipartFile file,
                               HttpServletRequest request, HttpServletResponse response)  {
        try {
            User user = getUserIdFromSession(request);

            if (user == null) {
                return new ResultBean(ResultCode.SESSION_OUT);
            }

            if (user.getAuth() < 1) {
                return new ResultBean(ResultCode.ACCOUNT_NOTAUTH);
            }

            return photoDealService.addPhoto(user, albumId, file);
        } catch (Exception e) {
            LOG.error(e.getMessage());
            return new ResultBean(ResultCode.SYSTEM_FAILED);
        }

    }
}
