package com.example.acm.service.impl;

import com.example.acm.entity.Report;
import com.example.acm.mapper.ReportMapper;
import com.example.acm.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * @author Anxdada
 * @version 1.0
 * @date 2020-05-01 20:09
 */
@Service
public class ReportServiceImpl implements ReportService {
    @Autowired
    private ReportMapper reportMapper;

    public List<Report> findReportListByReportId(Long reportId) {
        return reportMapper.findReportListByReportId(reportId);
    }

    public void addReport(Report report) {
        reportMapper.addReport(report);
    }

    public void updateReport(Report report) {
        reportMapper.updateReport(report);
    }


    public Integer countReportListByQuery(Map<String, Object> map) {
        return reportMapper.countReportListByQuery(map);
    }


    public Integer countReportMapListByQuery(Map<String, Object> map) {
        return reportMapper.countReportMapListByQuery(map);
    }


    public List<Map<String,Object>> findReportMapListByQuery(Map<String, Object> map) {
        return reportMapper.findReportMapListByQuery(map);
    }

}
