package com.example.acm.mapper;

import com.example.acm.entity.Report;
import org.apache.ibatis.annotations.Param;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

/**
 * @author xierenyi
 * @version 1.0
 * @date 2020-05-01 17:27
 */
@Mapper
@Component
public interface ReportMapper {

    /**
     * 添加举报
     *
     * @param report 举报
     */
    public void addReport(@Param("report") Report report);

    /**
     * 修改举报
     *
     * @param report 新的举报信息
     */
    public void updateReport(@Param("report") Report report);

    /**
     * 查询举报
     *
     * @param reportId
     * @return
     */
    public List<Report> findReportListByReportId(@Param("reportId") Long reportId);

    /**
     * 根据查询条件获取举报个数
     *
     */
    public Integer countReportListByQuery(@Param("map") Map<String, Object> map);

    /**
     * 根据查询条件获取举报个数(Map)
     *
     */
    public Integer countReportMapListByQuery(@Param("map") Map<String, Object> map);


    /**
     * 根据查询条件获取举报列表(Map)
     * @Param是mybatis中的注解, 相当于别名, 可以再xml中用@param中的别名来引用参数
     */
    public List<Map<String,Object>> findReportMapListByQuery(@Param("map") Map<String, Object> map);
}
