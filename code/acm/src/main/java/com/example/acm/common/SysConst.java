package com.example.acm.common;

/**
 * @author xierenyi
 * @version 1.0
 * @date 2020-02-10 11:16
 */
public interface SysConst {
    final String TOKEN = "Authorization";
    final String localhost="localhost:9999";

    final String FILE_MAP="/image/photo/**";
    final String FILE_PATH="file:/Users/xierenyi/xiexie/private/AcmWeChatSystem/image/photo/";


    int TOKEN_TIME = 24*60*60;

    int SUPER_ADMIN = 5;
    int ADMIN = 4;
    int PLAYER = 3;
    int NEW_MAN = 2;
    int NOT_PASS = 0;

    int USE = 1;
    int NOT_USE = 0;

    int NOT_FIRST = 0;
    int FIRST = 1;

    int NOT_GREATE = 0;
    int GREATE = 1;

    int LIVE = 1;
    int NOT_LIVE = 0;
}
