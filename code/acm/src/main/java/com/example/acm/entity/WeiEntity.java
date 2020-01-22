package com.example.acm.entity;

/**
 * @Author xierenyi
 * @Description:
 * @Date: Created in 15:43 2019-12-22
 */
public class WeiEntity {

    private String image;
    private String openId;

    public WeiEntity(String image, String openId) {
        this.image = image;
        this.openId = openId;
    }
    public String getImage() {
        return image;
    }

    public String getOpenId() {
        return openId;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public void setOpenId(String openId) {
        this.openId = openId;
    }

}
