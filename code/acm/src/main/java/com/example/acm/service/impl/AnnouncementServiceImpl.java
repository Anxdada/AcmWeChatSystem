package com.example.acm.service.impl;

import com.example.acm.entity.Announcement;
import com.example.acm.entity.AnnouncementTag;
import com.example.acm.mapper.AnnouncementMapper;
import com.example.acm.service.AnnouncementService;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

/**
 * (Announcement)表服务实现类
 *
 * @author makejava
 * @since 2020-02-18 00:00:46
 */
@Service
public class AnnouncementServiceImpl implements AnnouncementService {


    @Resource
    private AnnouncementMapper announcementMapper;

    /**
     * 添加公告
     *
     * @param announcement 公告信息
     * 哪怕只有一个参数也得用@Param, 不然#{} 无法访问
     */
    public void addAnnouncement(Announcement announcement) {
        announcementMapper.addAnnouncement(announcement);
    }

    /**
     * 修改公告
     *
     * @param announcement 新的公告信息
     */
    public void updateAnnouncement(Announcement announcement) {
        announcementMapper.updateAnnouncement(announcement);
    }

    /**
     * 查询友链
     *
     * @param announcementId 公告Id
     * @return 公告列表 以实体类返回
     */
    public List<Announcement> findAnnouncementListByAnnouncementId(Long announcementId) {
        return announcementMapper.findAnnouncementListByAnnouncementId(announcementId);
    }

    /**
     * 根据查询条件获取公告个数(Map)
     * 分页使用
     *
     */
    public Integer countAnnouncementMapListByQuery(Map<String, Object> map) {
        return announcementMapper.countAnnouncementMapListByQuery(map);
    }

    /**
     * 根据查询条件获取公告列表(Map)
     * 并且和类别表做连接直接查处结果, 不用二次查询后再返回结果
     * 和上面的函数不同就是字段变少了
     *
     * @return 以map信息返回
     */
    public List<Map<String,Object>> findAnnouncementMapListByQueryJoinTagTable(Map<String, Object> map) {
        return announcementMapper.findAnnouncementMapListByQueryJoinTagTable(map);
    }
}