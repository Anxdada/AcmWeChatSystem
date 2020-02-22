package com.example.acm.controller;

import com.example.acm.common.ResultBean;
import com.example.acm.common.ResultCode;
import com.example.acm.common.SysConst;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

/**
 * @author xierenyi
 * @version 1.0
 * @date 2020-02-22 19:09
 */
@Controller
public class ImageController {


    @PostMapping(value = "/uploadImg")
    @ResponseBody
    public Object  uploadImg(@RequestParam(value = "myFileName", required = false) MultipartFile file,
                             HttpServletRequest request, HttpServletResponse response) throws Exception {
        System.out.println("*************接收上传文件*************");
        if (file.isEmpty()) {
            System.out.println("文件为空");
        }
        String fileName = file.getOriginalFilename();  // 文件名
        String suffixName = fileName.substring(fileName.lastIndexOf("."));  // 后缀名
        if (!suffixName.endsWith("jpg")&&!suffixName.endsWith("jpeg")&&!suffixName.endsWith("png")) {
            return new ResultBean(ResultCode.PARAM_ERROR, "请上传图片!");
        }

        String filePath = SysConst.LOCAL_STORE_ADDRESS; // 上传后的本地路径
        fileName = UUID.randomUUID() + suffixName; // 新文件名 File dest = new File(filePath + fileName);
        File dest = new File(filePath + fileName);

        System.out.println(filePath + fileName);

        if (!dest.getParentFile().exists()) {
            dest.getParentFile().mkdirs();
        }
        file.transferTo(dest);
        System.out.println("*************接收上传文件结束*************");

        Map<String, Object> map = new HashMap<>();
        map.put("errno", 0);
        String url = "http://"+ SysConst.localhost+"/photo/";
        map.put("data", url+fileName);
        return map;
    }
}
