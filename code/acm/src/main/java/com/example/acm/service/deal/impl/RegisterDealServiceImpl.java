package com.example.acm.service.deal.impl;

import com.example.acm.common.ResultBean;
import com.example.acm.common.ResultCode;
import com.example.acm.common.SysConst;
import com.example.acm.entity.Register;
import com.example.acm.entity.User;
import com.example.acm.service.RegisterService;
import com.example.acm.service.deal.RegisterDealService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.xml.transform.Result;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author xierenyi
 * @version 1.0
 * @date 2020-02-21 17:18
 */
@Service
public class RegisterDealServiceImpl implements RegisterDealService {

    @Autowired
    private RegisterService registerService;

    /**
     * 添加一个报名
     * 暂时没用这个接口
     *
     * @param user 操作人
     * @return
     */
    public ResultBean addRegister(User user) {
        try {

            return new ResultBean(ResultCode.SUCCESS);

        } catch (Exception e) {
            // log
            e.printStackTrace();
            return new ResultBean(ResultCode.SYSTEM_FAILED);
        }
    }

    /**
     *  删除一个报名
     *
     * @param user
     * @param registerId 报名Id
     * @return
     */
    public ResultBean deleteRegister(User user, long registerId) {
        try {

            Map<String, Object> map = new HashMap<>();
            map.put("registerId", registerId);
            map.put("isEffective", SysConst.LIVE);

            List<Register> list = registerService.findRegisterListByQueryMap(map);

            if (list.isEmpty()) return new ResultBean(ResultCode.SQL_NULL_RECODE);

            Register register = list.get(0);
            register.setUpdateUser(user.getUserId());
            register.setUpdateTime(new Date());
            register.setIsEffective(SysConst.NOT_LIVE);
            registerService.updateRegister(list.get(0));

//            registerDealService

            return new ResultBean(ResultCode.SUCCESS);

        } catch (Exception e) {
            // log
            e.printStackTrace();
            return new ResultBean(ResultCode.SYSTEM_FAILED);
        }
    }

    /**
     *  修改一个报名
     *
     * @param user
     * @param registerId 注册id
     * @param studentId 学号
     * @return realName 姓名
     */
    public ResultBean updateRegister(User user, long registerId, long studentId, String realName) {
        try {

            Map<String, Object> map = new HashMap<>();
            if (registerId != -1)
            map.put("registerId", registerId);
            map.put("isEffective", SysConst.LIVE);

            List<Register> list = registerService.findRegisterListByQueryMap(map);

            if (list.isEmpty()) return new ResultBean(ResultCode.SQL_NULL_RECODE);

            Register register = list.get(0);
            register.setStudentId(studentId);
            register.setRealName(realName);
            register.setUpdateUser(user.getUserId());
            register.setUpdateTime(new Date());
            registerService.updateRegister(register);

            return new ResultBean(ResultCode.SUCCESS);

        } catch (Exception e) {
            // log
            e.printStackTrace();
            return new ResultBean(ResultCode.SYSTEM_FAILED);
        }
    }

    /**
     * 提取所有报名
     *
     * @param announcementId 对应的公告id
     * @param studentId 搜索的学号
     */
    public ResultBean selectRegister(long announcementId, long studentId) {
        try {

            Map<String, Object> map = new HashMap<>();
            map.put("order", "registerTime");
            map.put("aOrS", "DESC");
            map.put("isEffective", SysConst.LIVE);
            map.put("announcementId", announcementId);
            if (studentId != -1) map.put("studentId", studentId);

            List<Map<String, Object>> list = registerService.findRegisterListMapByQueryMap(map);


            return new ResultBean(ResultCode.SUCCESS, list);

        } catch (Exception e) {
            // log
            e.printStackTrace();
            return new ResultBean(ResultCode.SYSTEM_FAILED);
        }
    }
}
