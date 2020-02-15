package com.example.acm.entity;

import java.io.Serializable;
import java.util.Date;

/**
 * @Author xierenyi
 * @Description: 用户实体类
 * @Date: Created in 15:08 2019-12-22
 */
public class User implements Serializable {

	private Long userId;
	private String userName;
	private String password;
	private Integer auth; // 0-未通过审核 1-超级管理员 2-管理员 3-队员 4-萌新 5-未完善资料的萌新 (后面的1-5是指身份值的数字的二进制的位数)
	// 比如 anth = 6, 那么这个人既是 管理员 又是 队员
	private String avatar;  // 头像
	private Long studentId;  // 学号
	private Integer grade;   // 年级
	private Date createTime;  // 申请通过时间, 可以记录加入多久了之类的
	private String telephone; // 联系电话
	private String realName;
	private String openId;   // 微信的用户标识字段
	private Integer isEffective;

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Integer getAuth() {
		return auth;
	}

	public void setAuth(Integer auth) {
		this.auth = auth;
	}

	public String getAvatar() {
		return avatar;
	}

	public void setAvatar(String avatar) {
		this.avatar = avatar;
	}

	public Long getStudentId() {
		return studentId;
	}

	public void setStudentId(Long studentId) {
		this.studentId = studentId;
	}

	public Integer getGrade() {
		return grade;
	}

	public void setGrade(Integer grade) {
		this.grade = grade;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public String getTelephone() {
		return telephone;
	}

	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}

	public String getRealName() {
		return realName;
	}

	public void setRealName(String realName) {
		this.realName = realName;
	}

	public String getOpenId() {
		return openId;
	}

	public void setOpenId(String openId) {
		this.openId = openId;
	}

	public Integer getIsEffective() {
		return isEffective;
	}

	public void setIsEffective(Integer isEffective) {
		this.isEffective = isEffective;
	}
}

