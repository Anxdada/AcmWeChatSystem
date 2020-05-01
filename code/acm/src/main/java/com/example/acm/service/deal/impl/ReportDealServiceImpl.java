package com.example.acm.service.deal.impl;


import com.example.acm.common.ResultBean;
import com.example.acm.common.ResultCode;
import com.example.acm.common.SysConst;
import com.example.acm.entity.Report;
import com.example.acm.entity.User;
import com.example.acm.service.ReportService;
import com.example.acm.service.UserService;
import com.example.acm.service.deal.ReportDealService;
import com.example.acm.utils.DateUtil;
import com.example.acm.utils.ListPage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author xierenyi
 * @version 1.0
 * @date 2020-05-01 21:39
 */
@Service
public class ReportDealServiceImpl implements ReportDealService {

    @Autowired
    private ReportService reportService;

    @Autowired
    private UserService userService;

    /**
     * 添加举报
     * @param user 添加的人
     * @param type 举报类型(post/user)
     * @param typeId 举报类型对应的id
     * @param reportBody 举报说明
     * @param reason 理由
     * @return 结果
     */
    public ResultBean addReport(User user, String type, int typeId, String reportBody, String reason) {
        try {

            Report report = new Report();
            report.setType(type);
            report.setTypeId(typeId);
            report.setReportBody(reportBody);
            report.setReason(reason);
            report.setCreateUser(user.getUserId());
            report.setCreateTime(new Date());
            report.setHandleUser(Long.parseLong(String.valueOf(-1)));
            report.setIsEffective(SysConst.LIVE);

            reportService.addReport(report);

            return new ResultBean(ResultCode.SUCCESS);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResultBean(ResultCode.SYSTEM_FAILED);
        }
    }

    /**
     *
     * @param user 操作人
     * @param reportId 举报编号
     * @param result 处理结果
     * @param isHandle 是否处理 (如果处理了该个举报, 那么一定有处理结果)
     * @return
     */
    public ResultBean updateReport(User user, long reportId, String result, int isHandle) {
        try {

            List<Report> reports = reportService.findReportListByReportId(reportId);
            if (reports.size() < 1) {
                return new ResultBean(ResultCode.PARAM_ERROR, "不存在该友链");
            }
            Report report = reports.get(0);
            report.setIsHandle(isHandle);
            if (isHandle == 1) {
                report.setResult(result);
                report.setHandleUser(user.getUserId());
            } else {
                report.setResult("未处理的举报, 暂无处理结果~");
                report.setHandleUser(Long.parseLong(String.valueOf(-1)));
            }

            report.setHandleTime(new Date());

            reportService.updateReport(report);

            return new ResultBean(ResultCode.SUCCESS);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResultBean(ResultCode.SYSTEM_FAILED);
        }
    }

    /**
     *
     * @param aOrs 排序规则(升序还是降序)
     * @param order 按照那个字段排序
     * @param pageNum 当前的页数
     * @param pageSize 一页的数量
     * @return
     */
    public ResultBean selectReport(long createUser, int aOrs, String order, int pageNum, int pageSize) {
        try {
            Map<String, Object> map = new HashMap<>();
            if (pageNum < 0) {
                return new ResultBean(ResultCode.PARAM_ERROR, "页码不能小于0");
            }
            if (pageSize < 0) {
                return new ResultBean(ResultCode.PARAM_ERROR, "一页展示数量不能小于0");
            }
            int start = (pageNum - 1) * pageSize;
            int limit = pageSize;
            if (createUser != -1) map.put("createUser", createUser);
            map.put("start", start);
            map.put("limit", limit);
            map.put("order", order);
            if (aOrs == 1) {
                map.put("aOrS", "DESC");
            } else {
                map.put("aOrS", "ASC");
            }
            map.put("isEffective", SysConst.LIVE);
            List<Map<String, Object>> list = reportService.findReportMapListByQuery(map);


            if (list.size() > 0) {
                for (Map<String, Object> mapTemp : list) {
//                System.out.println((Long)mapTemp.get("updateUser"));
                    List<User> listUsers = userService.findUserListByUserId((Long) mapTemp.get("createUser"));
                    User tUs = null;
                    if (listUsers.size() > 0) tUs = listUsers.get(0);
                    if (tUs != null) {
                        mapTemp.put("createUserDetail", tUs);
                        mapTemp.put("createUser", tUs.getUserName());
                    }
                    if ((Long) mapTemp.get("handleUser") != -1) {
                        listUsers = userService.findUserListByUserId((Long) mapTemp.get("handleUser"));
                        tUs = null;
                        if (!listUsers.isEmpty()) tUs = listUsers.get(0);
                        if (tUs != null) mapTemp.put("handleUserDetail", tUs);
                        mapTemp.put("handleTime", DateUtil.convDateToStr((Date) mapTemp.get("handleTime"), "yyyy-MM-dd HH:mm:ss"));
                    }
                    mapTemp.put("createTime", DateUtil.convDateToStr((Date) mapTemp.get("createTime"), "yyyy-MM-dd HH:mm:ss"));
                }
            }


            int allNum = reportService.countReportListByQuery(map);

            ListPage<List<Map<String, Object>>> listPage = ListPage.createListPage(pageNum, pageSize, allNum, list);

            return new ResultBean(ResultCode.SUCCESS, listPage);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResultBean(ResultCode.SYSTEM_FAILED);
        }
    }

}
