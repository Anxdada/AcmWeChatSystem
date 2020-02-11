package com.example.acm.entity;

import java.io.Serializable;
import java.util.Date;

/**
 * @Author xierenyi
 * @Description: 友情链接实体
 * @Date: Created in 15:07 2019-12-22
 */
public class FriendUrl implements Serializable {

    private Long friendUrlId;
    private String friendUrlName;
    private String friendUrlAddress;
    private String friendUrlTag;
    private Long createUser;
    private Date createTime;
    private Long updateUser;
    private Date updateTime;
    private Integer isEffective;

    public Long getFriendUrlId() {
        return friendUrlId;
    }

    public void setFriendUrlId(Long friendUrlId) {
        this.friendUrlId = friendUrlId;
    }

    public String getFriendUrlName() {
        return friendUrlName;
    }

    public void setFriendUrlName(String friendUrlName) {
        this.friendUrlName = friendUrlName;
    }

    public String getFriendUrlAddress() {
        return friendUrlAddress;
    }

    public void setFriendUrlAddress(String friendUrlAddress) {
        this.friendUrlAddress = friendUrlAddress;
    }

    public String getFriendUrlTag() {
        return friendUrlTag;
    }

    public void setFriendUrlTag(String friendUrlTag) {
        this.friendUrlTag = friendUrlTag;
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

    @Override
    public String toString() {
        return friendUrlName + " " + friendUrlAddress + " " + friendUrlTag;
    }
}
