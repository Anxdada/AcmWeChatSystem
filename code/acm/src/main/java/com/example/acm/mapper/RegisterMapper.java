package com.example.acm.mapper;

import com.example.acm.entity.Register;
import org.apache.ibatis.annotations.Param;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

/**
 * @author xierenyi
 * @version 1.0
 * @date 2020-02-21 16:58
 */
@Component
@Mapper
public interface RegisterMapper {

    /**
     * 添加一个报名人员
     *
     * @param register 报名人员信息
     */
    public void addRegister(@Param("register") Register register);

    /**
     * 更新一个报名人员
     *
     * @param register 报名人员信息
     */
    public void updateRegister(@Param("register") Register register);

    /**
     * 根据学号查找报名人的学号
     *
     * @param studentId 学号
     */
    public List<Register> findRegisterByStudentId(@Param("studentId") long studentId);


    /**
     * 防止重复报名
     *
     * @return
     */
    public List<Register> findRepeatRegisterUser(@Param("map") Map<String, Object> map);

    /**
     * 根据查询条件获取Register列表
     *
     * @param map 查询条件
     * @return 满足条件的Register
     */
    public List<Register> findRegisterListByQueryMap(@Param("map") Map<String, Object> map);


    /**
     * 根据查询条件获取Register列表
     *
     * @param map 查询条件
     * @return 满足条件的Register 以map的形式
     */
    public List<Map<String, Object>> findRegisterListMapByQueryMap(@Param("map") Map<String, Object> map);

    /**
     * 根据查询条件获取Register列表
     * 主要是给获取用户比赛经历接口用的, 所以需要和announcement表联合, 这个是主要的区别
     *
     * @param map 查询条件
     */
    public List<Map<String, Object>> findRegisterListMapByQueryMapUnionAnnouncement(@Param("map") Map<String, Object> map);
}
