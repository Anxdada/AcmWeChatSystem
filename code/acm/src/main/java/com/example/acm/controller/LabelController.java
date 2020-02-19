package com.example.acm.controller;

import com.example.acm.common.ResultBean;
import com.example.acm.common.ResultCode;
import com.example.acm.entity.User;
import com.example.acm.service.deal.LabelDealService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @author xierenyi
 * @version 1.0
 * @date 2020-02-18 11:57
 */
@Controller
@RequestMapping(value = "/label")
public class LabelController extends BaseController {


    private final Long longTwo = Long.parseLong(String.valueOf(2));

    @Autowired
    private LabelDealService labelDealService; // 直接测试

    /**
     * 添加帖子标签
     *
     * @param labelName 帖子标签名称
     * @param labelColor 帖子标签颜色
     * @return 结果
     */
    @PostMapping("/addLabel")
    @ResponseBody
    public ResultBean addLabel(@RequestParam(value = "labelName", required = true) String labelName,
                               @RequestParam(value = "labelColor", required = true) String labelColor,
                               HttpServletRequest request, HttpServletResponse response) {

//        System.out.println("addlabel");
//        System.out.println(" " + labelName + " " + labelColor);

        try {

            User user = getUserIdFromSession(request);
            if (user == null) {
                // 如果忘记传头部信息过来, 默认设置为超级管理员的改动
                user = new User();
                user.setUserId(longTwo);
            }

            return labelDealService.addLabel(user, labelName, labelColor);

        } catch (Exception e) {
            // log
            e.printStackTrace();
            return new ResultBean(ResultCode.SYSTEM_FAILED);
        }
    }

    /**
     * 需要检测是否还有该类别新闻存在, 有的话不能删除!
     *
     * @param labelId 删除的帖子标签id
     * @return
     */
    @PostMapping("/deleteLabel")
    @ResponseBody
    public ResultBean deleteLabel(@RequestParam(value = "labelId", required = true) long labelId,
                                  HttpServletRequest request, HttpServletResponse response) {

//        System.out.println("deletelabel");
//        System.out.println(labelId);

        try {

            User user = getUserIdFromSession(request);
            if (user == null) {
                // 如果忘记传头部信息过来, 默认设置为超级管理员的改动
                user = new User();
                user.setUserId(longTwo);
            }

            return labelDealService.deleteLabel(user, labelId);

        } catch (Exception e) {
            // log
            e.printStackTrace();
            return new ResultBean(ResultCode.SYSTEM_FAILED);
        }
    }

    /**
     *
     * @param labelId id
     * @param labelName 帖子标签名称
     * @param labelColor 帖子标签颜色
     * @return
     */
    @PostMapping("/updateLabel")
    @ResponseBody
    public ResultBean updateLabel(@RequestParam(value = "labelId", required = true) long labelId,
                                  @RequestParam(value = "labelName", required = true) String labelName,
                                  @RequestParam(value = "labelColor", required = true) String labelColor,
                                  HttpServletRequest request, HttpServletResponse response) {

//        System.out.println("updatelabel");
//        System.out.println(" " + labelName + " " + labelColor);

        try {

            User user = getUserIdFromSession(request);
            if (user == null) {
                // 如果忘记传头部信息过来, 默认设置为超级管理员的改动
                user = new User();
                user.setUserId(longTwo);
            }

            return labelDealService.updateLabel(user, labelId, labelName, labelColor);

        } catch (Exception e) {
            // log
            e.printStackTrace();
            return new ResultBean(ResultCode.SYSTEM_FAILED);
        }

    }

    /**
     *
     * @param labelName
     * @param aOrs
     * @param order
     * @param pageNum
     * @param pageSize 这个字段可能很大是为了区分是类别表(10)查询还是 新闻表(100), 设计到数据库中是否分页查询, 后者就不分页了..
     * @param request
     * @param response
     * @return
     */
    @PostMapping("/selectLabel")
    @ResponseBody
    public ResultBean selectLabel(@RequestParam(value = "labelName", defaultValue = "", required = false) String labelName,
                                  @RequestParam(value = "aOrs", defaultValue = "1", required = false) int aOrs,
                                  @RequestParam(value = "order", defaultValue = "createTime", required = false) String order,
                                  @RequestParam(value = "pageNum", defaultValue = "1", required = false) int pageNum,
                                  @RequestParam(value = "pageSize", defaultValue="10", required = false) int pageSize,
                                  HttpServletRequest request, HttpServletResponse response) {

//        System.out.println("xierenyi");
//        System.out.println(labelName);
//        System.out.println( " " + order);

        try {

            User user = getUserIdFromSession(request);
            if (user == null) {
                // 如果忘记传头部信息过来, 默认设置为超级管理员的改动
                user = new User();
                user.setUserId(longTwo);
            }

            return labelDealService.selectLabel(labelName, aOrs,  order,  pageNum,  pageSize);

        } catch (Exception e) {
            // log
            e.printStackTrace();
            return new ResultBean(ResultCode.SYSTEM_FAILED);
        }
    }

    /**
     *
     * @param labelId 帖子标签id
     * @return
     */
    @PostMapping("/detailLabel")
    @ResponseBody
    public ResultBean detailLabel(@RequestParam(value = "labelId", required = true) long labelId,
                                  HttpServletRequest request, HttpServletResponse response) {

//        System.out.println("detaillabel");
//        System.out.println(" " + labelId);

        try {

            return labelDealService.detailLabel(labelId);

        } catch (Exception e) {
            // log
            e.printStackTrace();
            return new ResultBean(ResultCode.SYSTEM_FAILED);
        }
    }

}