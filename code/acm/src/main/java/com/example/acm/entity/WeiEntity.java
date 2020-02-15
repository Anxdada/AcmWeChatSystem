package com.example.acm.entity;

/**
 * @Author xierenyi
 * @Description:
 * @Date: Created in 15:43 2019-12-22
 */
public class WeiEntity {

    private String avatar;
    private String openId;

    public WeiEntity(String avatar, String openId) {
        this.avatar = avatar;
        this.openId = openId;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public String getOpenId() {
        return openId;
    }

    public void setOpenId(String openId) {
        this.openId = openId;
    }
}
