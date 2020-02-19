package com.example.acm.service.impl;

import com.example.acm.entity.Label;
import com.example.acm.mapper.LabelMapper;
import com.example.acm.service.LabelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * @author xierenyi
 * @version 1.0
 * @date 2020-02-18 11:55
 */
@Service
public class LabelServiceImpl implements LabelService {


    @Autowired
    private LabelMapper labelMapper;

    /**
     * 添加帖子标签
     *
     * @param label 帖子标签信息
     * 哪怕只有一个参数也得用@Param, 不然#{} 无法访问
     */
    public void addLabel(Label label) {
        labelMapper.addLabel(label);
    }

    /**
     * 修改帖子标签
     *
     * @param label 新的帖子标签信息
     */
    public void updateLabel(Label label) {
        labelMapper.updateLabel(label);
    }

    /**
     * 查询友链
     *
     * @param labelId 帖子标签Id
     * @return 帖子标签列表 以实体类返回
     */
    public List<Label> findLabelListByLabelId(Long labelId) {
        return labelMapper.findLabelListByLabelId(labelId);
    }

    /**
     * 根据查询条件获取帖子标签信息的个数
     *
     */
    public Integer countLabelListByQuery(Map<String, Object> map) {
        return labelMapper.countLabelListByQuery(map);
    }

    /**
     * 根据查询条件获取帖子标签个数(Map)
     *
     */
    public Integer countLabelMapListByQuery(Map<String, Object> map) {
        return labelMapper.countLabelMapListByQuery(map);
    }


    /**
     * 根据查询条件获取帖子标签列表(Map)
     * @Param是mybatis中的注解, 相当于别名, 可以再xml中用@param中的别名来引用参数
     * @return 以map信息返回
     */
    public List<Map<String,Object>> findLabelMapListByQuery(Map<String, Object> map) {
        return labelMapper.findLabelMapListByQuery(map);
    }
}
