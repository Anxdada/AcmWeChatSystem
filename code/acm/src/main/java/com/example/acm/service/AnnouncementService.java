package com.example.acm.service;

import com.example.acm.entity.Announcement;
import com.example.acm.entity.AnnouncementTag;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

/**
 * (Announcement)表服务接口
 *
 * @author makejava
 * @since 2020-02-18 00:00:46
 */
public interface AnnouncementService {


    /**
     * 添加公告
     *
     * @param announcement 公告信息
     * 哪怕只有一个参数也得用@Param, 不然#{} 无法访问
     */
    public void addAnnouncement(Announcement announcement);

    /**
     * 修改公告
     *
     * @param announcement 新的公告信息
     */
    public void updateAnnouncement(Announcement announcement);

    /**
     * 查询友链
     *
     * @param announcementId 公告Id
     * @return 公告列表 以实体类返回
     */
    public List<Announcement> findAnnouncementListByAnnouncementId(Long announcementId);

    /**
     * 根据查询条件获取公告个数(Map)
     * 分页使用
     *
     */
    public Integer countAnnouncementMapListByQuery(@Param("map") Map<String, Object> map);


    /**
     * 根据查询条件获取公告列表(Map)
     * 并且和类别表做连接直接查处结果, 不用二次查询后再返回结果
     * 和上面的函数不同就是字段变少了
     *
     * @return 以map信息返回
     */
    public List<Map<String,Object>> findAnnouncementMapListByQueryJoinTagTable(Map<String, Object> map);

}