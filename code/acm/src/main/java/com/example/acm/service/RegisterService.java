package com.example.acm.service;

import com.example.acm.entity.Register;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

/**
 * @author xierenyi
 * @version 1.0
 * @date 2020-02-21 17:13
 */
public interface RegisterService {
    /**
     * 添加一个报名人员
     *
     * @param register 报名人员信息
     */
    public void addRegister(Register register);

    /**
     * 更新一个报名人员
     *
     * @param register 报名人员信息
     */
    public void updateRegister(Register register);

    /**
     * 根据学号查找报名人的学号
     *
     * @param studentId 学号
     */
    public List<Register> findRegisterByStudentId(long studentId);

    /**
     * 根据查询条件获取Register列表
     *
     * @param map 查询条件
     * @return 满足条件的Register
     */
    public List<Register> findRegisterListByQueryMap(Map<String, Object> map);


    /**
     * 根据查询条件获取Register列表
     *
     * @param map 查询条件
     * @return 满足条件的Register 以map的形式
     */
    public List<Map<String, Object>> findRegisterListMapByQueryMap(Map<String, Object> map);

}
