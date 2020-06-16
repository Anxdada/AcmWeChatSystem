package com.example.acm.service.impl;

import com.example.acm.entity.Register;
import com.example.acm.mapper.RegisterMapper;
import com.example.acm.service.RegisterService;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * @author xierenyi
 * @version 1.0
 * @date 2020-02-21 17:14
 */
@Service
public class RegisterServiceImpl implements RegisterService {

    @Autowired
    private RegisterMapper registerMapper;

    /**
     * 添加一个报名人员
     *
     * @param register 报名人员信息
     */
    public void addRegister(Register register) {
        registerMapper.addRegister(register);
    }

    /**
     * 更新一个报名人员
     *
     * @param register 报名人员信息
     */
    public void updateRegister(Register register) {
        registerMapper.updateRegister(register);
    }

    /**
     * 根据学号查找报名人的学号
     *
     * @param studentId 学号
     */
    public List<Register> findRegisterByStudentId(long studentId) {
        return registerMapper.findRegisterByStudentId(studentId);
    }

    /**
     * 重复报名
     */
    public List<Register> findRepeatRegisterUser(Map<String, Object> map) {
        return registerMapper.findRepeatRegisterUser(map);
    }

    /**
     * 根据查询条件获取Register列表
     *
     * @param map 查询条件
     * @return 满足条件的Register
     */
    public List<Register> findRegisterListByQueryMap(Map<String, Object> map) {
        return registerMapper.findRegisterListByQueryMap(map);
    }


    /**
     * 根据查询条件获取Register列表
     *
     * @param map 查询条件
     * @return 满足条件的Register 以map的形式
     */
    public List<Map<String, Object>> findRegisterListMapByQueryMap(Map<String, Object> map) {
        return registerMapper.findRegisterListMapByQueryMap(map);
    }

    /**
     * 根据查询条件获取Register列表
     * 主要是给获取用户比赛经历接口用的, 所以需要和announcement表联合, 这个是主要的区别
     *
     * @param map 查询条件
     */
    public List<Map<String, Object>> findRegisterListMapByQueryMapUnionAnnouncement(@Param("map") Map<String, Object> map) {
        return registerMapper.findRegisterListMapByQueryMapUnionAnnouncement(map);
    }

}
