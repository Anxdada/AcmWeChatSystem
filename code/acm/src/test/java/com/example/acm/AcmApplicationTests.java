package com.example.acm;

import com.example.acm.common.ResultBean;
import com.example.acm.common.ResultCode;
import com.example.acm.common.SysConst;
import com.example.acm.utils.StringUtil;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class AcmApplicationTests {

    @Test
    void contextLoads() {
    }

    @Test
    void testResultCode() {
        ResultBean tmp = new ResultBean(ResultCode.HTTP_PARA_ERROR, "111");
        System.out.println(tmp.getStatus()); // 1
        System.out.println(tmp.getResult()); // http para error
        System.out.println(tmp.getMsg()); // 系统繁忙
        System.out.println(tmp);
    }

    @Test
    void testLinkUrl() {
//        String str = "https://www.nowcoder.com/discuss";
//        System.out.println(str.indexOf("AAAhttp"));
//        StringUtil.isConnect("https://www.nowcoder.com/discuss");
//        StringUtil.isConnect("www.nowcoder.com/discuss");
//        StringUtil.isConnect("http://acm.hdu.edu.cn");
//        StringUtil.isConnect("acm.hdu.edu.cn");
        StringUtil.isConnect("www.google.com");
    }

}
