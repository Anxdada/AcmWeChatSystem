package com.example.acm.service;

import com.example.acm.entity.AnnouncementTag;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

/**
 * @author xierenyi
 * @version 1.0
 * @date 2020-02-18 11:54
 */
public interface AnnouncementTagService {

    /**
     * 添加公告类别
     *
     * @param announcementTag 公告类别信息
     * 哪怕只有一个参数也得用@Param, 不然#{} 无法访问
     */
    public void addAnnouncementTag(AnnouncementTag announcementTag);

    /**
     * 修改公告类别
     *
     * @param announcementTag 新的公告类别信息
     */
    public void updateAnnouncementTag(AnnouncementTag announcementTag);

    /**
     * 查询友链
     *
     * @param announcementTagId 公告类别Id
     * @return 公告类别列表 以实体类返回
     */
    public List<AnnouncementTag> findAnnouncementTagListByAnnouncementTagId(Long announcementTagId);

    /**
     * 根据查询条件获取公告类别信息的个数
     *
     */
    public Integer countAnnouncementTagListByQuery(Map<String, Object> map);

    /**
     * 根据查询条件获取公告类别个数(Map)
     *
     */
    public Integer countAnnouncementTagMapListByQuery(Map<String, Object> map);


    /**
     * 根据查询条件获取公告类别列表(Map)
     * @Param是mybatis中的注解, 相当于别名, 可以再xml中用@param中的别名来引用参数
     * @return 以map信息返回
     */
    public List<Map<String,Object>> findAnnouncementTagMapListByQuery(Map<String, Object> map);
}
