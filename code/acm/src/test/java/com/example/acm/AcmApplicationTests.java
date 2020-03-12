package com.example.acm;

import com.example.acm.common.ResultBean;
import com.example.acm.common.ResultCode;
import com.example.acm.common.SysConst;
import com.example.acm.config.RedisComponent;
import com.example.acm.entity.Label;
import com.example.acm.entity.OnDuty;
import com.example.acm.entity.User;
import com.example.acm.service.LabelService;
import com.example.acm.service.UserService;
import com.example.acm.utils.StringUtil;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.StringRedisTemplate;

import java.net.HttpURLConnection;
import java.net.URL;
import java.util.*;
import java.util.concurrent.TimeUnit;

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

    @Test
    void testUUID() {
        UUID uid = UUID.randomUUID();
        System.out.println(uid);
    }

    @Autowired
    private StringRedisTemplate stringRedisTemplate;

    @Test
    void testRedis() {
//        stringRedisTemplate.opsForValue().set("test", "11", 100, TimeUnit.SECONDS);
        String va = stringRedisTemplate.opsForValue().get("test"); //根据key获取缓存中的val

        System.out.println(va);
        System.out.println(stringRedisTemplate.opsForValue().get("tt"));
    }

    @Test
    void testTime() {
        try {
            URL url = new URL("www.baidu.com");
            HttpURLConnection urlCon = (HttpURLConnection) url.openConnection();
            urlCon.setConnectTimeout(30000);
            urlCon.setReadTimeout(30000);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Test
    void testOnDuty() {
        OnDuty onDuty = new OnDuty();
        onDuty.setOnDutyUserName("!!!");
        System.out.println(onDuty.getOnDutyUserName());
    }

    @Autowired
    UserService userService;

    @Test
    void testFindAuth() {
        List<Map<String,Object>> list = userService.findSatisfyAuthUser(4);
        for (Map<String, Object> u : list) {
            System.out.println(u.get("realName"));
            System.out.println(u.get("userId"));
        }
    }

    @Autowired
    private LabelService labelService;

    @Test
    void testSort() {
        List<Label> list = labelService.findLabelListByLabelId(null);
        List<Label> list2 = list;

        Collections.sort(list2, new Comparator<Label>() {
            @Override
            public int compare(Label a, Label b) {
                Long ans = a.getFlag() - b.getFlag();
                return ans.intValue();
            }
        });

        for (int i = 0 ; i < list2.size() ; ++ i) {
            System.out.println(list2.get(i).getFlag());
        }

        list.sort(new Comparator<Label>() {
            @Override
            public int compare(Label a, Label b) {
                Long ans = a.getFlag() - b.getFlag();
                return ans.intValue();
            }
        });
        long flag = list.size();
        for (int i = 0 ; i < list.size() ; ++ i) {
            System.out.println(list.get(i).getFlag());
        }
    }

    @Autowired
    private RedisComponent redisComponent;

    // 测试redis的集合
    @Test
    void testRedisSet() {
//        System.out.println(redisComponent.hasMemberForKey("reply9", "2"));
        System.out.println(redisComponent.getSizeSetForKey("reply9"));
    }

}
