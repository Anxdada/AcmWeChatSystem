package com.example.acm.utils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.net.URL;
import java.net.URLConnection;

/**
 *
 * 史上最完善的判断URL是否可访问工具类
 * @author xierenyi
 * @version 1.0
 * @date 2020-02-14 21:17
 */

public class URLUtil {
    private static final String URL_PREFIX_INSECURITY = "http://";
    private static final String URL_PREFIX_SECURITY = "https://";

//    private static Logger LOG = LoggerFactory.getLogger(this.getClass());

    /*** 建立连接http连接*/
    private static boolean connect(String httpURL, int timeOutMillSeconds) {
        URL url;
        try {
            url = new URL(httpURL);
            URLConnection co = url.openConnection();
            co.setConnectTimeout(timeOutMillSeconds);
            co.connect();
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    /*** 判断加了http或HTTPS的连接是否可访问*/
    private static boolean isAvailable(String httpURL, int timeOutMillSeconds) {
        return connect(httpURL, timeOutMillSeconds);
    }

    /*** 判断没加http或HTTPS的连接是否可访问*/
    private static boolean isAvailable(String noHttpURL, int timeOutMillSeconds, boolean isSecure) {
        String httpURL;
        if (isSecure) {
            httpURL = URL_PREFIX_SECURITY + noHttpURL;
        } else {
            httpURL = URL_PREFIX_INSECURITY + noHttpURL;
        }
        return connect(httpURL, timeOutMillSeconds);
    }

    /**
     * 检查URL是否可访问
     *
     * @param url                访问URL
     * @param timeOutMillSeconds 超时时间
     * @param checkType          检查类型https|http|http or https 默认传2
     * @return
     */
    public static boolean isAvailable(String url, int timeOutMillSeconds, int checkType) {
        long lo = System.currentTimeMillis();
        boolean flag = false;
        if (url.indexOf(URL_PREFIX_SECURITY) == 0 || url.indexOf(URL_PREFIX_INSECURITY) == 0) {
            flag = isAvailable(url, timeOutMillSeconds); // 有连接协议的
        } else {
            if (checkType == 0) {
                //加https是否可用
                flag = isAvailable(url, timeOutMillSeconds, true);
            } else if (checkType == 1) {
                //加http是否可用
                flag = isAvailable(url, timeOutMillSeconds, false);
            } else if (checkType == 2) {
                //加http或https是否可用
                boolean availableSecurity = isAvailable(url, timeOutMillSeconds, true);
                boolean availableInSecurity = isAvailable(url, timeOutMillSeconds, false);
                if (availableSecurity || availableInSecurity) {
                    flag = true;
                } else {
                    flag = false;
                }
            }
        }
        if (flag) {
            System.out.println(">>>>>>>>>>>" + url + " 连接成功，连接时间:" + (System.currentTimeMillis() - lo) + "ms");
        } else {
            System.out.println(">>>>>>>>>>>" + url + " 连接不存在，超时时间:" + (System.currentTimeMillis() - lo) + "ms");
        }
        return flag;
    }

    public static void main(String[] args) {
        isAvailable("http://baidu.com", 2000, 2);
        isAvailable("baidu.com", 2000, 2);
        isAvailable("cannotVisit", 2000, 2);
    }

}
