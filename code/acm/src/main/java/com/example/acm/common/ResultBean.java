package com.example.acm.common;

/**
 * @author Anxdada
 * @version 1.0
 * @date 2020-02-10 10:37
 */

public class ResultBean {
    private int status;
    private String result;
    private String msg;
    private Object resultBean;

    public ResultBean() {
    }

    public ResultBean(ResultCode code) {
        this.status = code.getStatus().intValue();
        this.result = code.toMessage();
        this.msg = code.getMsg();
    }

    public ResultBean(ResultCode code, String msg) {
        this.status = code.getStatus().intValue();
        this.result = code.toMessage();
        this.msg = msg;
    }

    public ResultBean(ResultCode code, Object resultBean) {
        this.status = code.getStatus().intValue();
        this.result = code.toMessage();
        this.msg = code.getMsg();
        this.resultBean = resultBean;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getResult() {
        return this.result;
    }

    public void setResult(String result) {
        this.result = result;
    }

    public String getMsg() {
        return this.msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public Object getResultBean() {
        return this.resultBean;
    }

    public void setResultBean(Object resultBean) {
        this.resultBean = resultBean;
    }
}