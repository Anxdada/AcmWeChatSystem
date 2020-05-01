package com.example.acm.service;

import com.example.acm.entity.Report;

import java.util.List;
import java.util.Map;

/**
 * @author Anxdada
 * @version 1.0
 * @date 2020-05-01 20:08
 */
public interface ReportService {

    /**
     * 查询举报
     * 返回list的原因是怕万一id没有, sql语句的一种可能性后果, 基本不会发生
     * @param reportId
     * @return
     */
    public List<Report> findReportListByReportId(Long reportId);

    /**
     * 添加举报
     *
     * @param report 举报
     */
    public void addReport(Report report);

    /**
     * 修改举报
     *
     * @param report 新的举报信息
     */
    public void updateReport(Report report);

    /**
     * 根据查询条件获取举报个数
     *
     */
    public Integer countReportListByQuery(Map<String, Object> map);

    /**
     * 根据查询条件获取举报个数(Map)
     * 分页的存在导致计算总数需要另一个方法
     */
    public Integer countReportMapListByQuery(Map<String, Object> map);

    /**
     * 根据查询条件获取举报列表(Map)
     * 分页机制取
     * @param map 查询条件
     */
    public List<Map<String,Object>> findReportMapListByQuery(Map<String, Object> map);
}
