package com.example.acm.entity;

import java.util.Date;

/**
 * @author xierenyi
 * @version 1.0
 * @date 2020-02-18 11:42
 */
public class Label {

    private Long labelId;
    private String labelName;
    private String labelColor;
    private Long flag;  // 这个是用来表示二进制的第几位, 和新闻公告不同的是
    // 帖子的标签可能有很多个, 所以用二进制的思想来判定, 方便筛选帖子以及存储
    // 这样设计到的问题就是这个不能太大, 所以另外开一个变量存储, add的时候使用
    // mex(集合中未出现的最小自然数 0是自然数), 其它操作都一言, 并且add不对上层显示
    // 记住帖子的时候标签用二进制的数字!!
    private Long createUser;
    private Date createTime;
    private Long updateUser;
    private Date updateTime;
    private Integer isEffective;

    public Long getLabelId() {
        return labelId;
    }

    public void setLabelId(Long labelId) {
        this.labelId = labelId;
    }

    public String getLabelName() {
        return labelName;
    }

    public void setLabelName(String labelName) {
        this.labelName = labelName;
    }

    public String getLabelColor() {
        return labelColor;
    }

    public void setLabelColor(String labelColor) {
        this.labelColor = labelColor;
    }

    public Long getFlag() {
        return flag;
    }

    public void setFlag(Long flag) {
        this.flag = flag;
    }

    public Long getCreateUser() {
        return createUser;
    }

    public void setCreateUser(Long createUser) {
        this.createUser = createUser;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Long getUpdateUser() {
        return updateUser;
    }

    public void setUpdateUser(Long updateUser) {
        this.updateUser = updateUser;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    public Integer getIsEffective() {
        return isEffective;
    }

    public void setIsEffective(Integer isEffective) {
        this.isEffective = isEffective;
    }
}
