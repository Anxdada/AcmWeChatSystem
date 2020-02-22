package com.example.acm.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
/**
 * @author 言曌
 * @date 2018/2/27 下午3:32
 */
@Configuration
public class WebAppConfig extends WebMvcConfigurerAdapter {

    // 配置图片映射
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        /*
         * 说明：增加虚拟路径(经过本人测试：在此处配置的虚拟路径，用springboot内置的tomcat时有效，
         * 用外部的tomcat也有效;所以用到外部的tomcat时不需在tomcat/config下的相应文件配置虚拟路径了,阿里云linux也没问题)
         */
        //Windows下
//        registry.addResourceHandler("/uploads2/**").addResourceLocations("file:D:/uploads2/");
        registry.addResourceHandler("/uploads/**").addResourceLocations("file:/Users/xierenyi/Documents/uploads/");
        registry.addResourceHandler("/avatar/**").addResourceLocations("file:/Users/xierenyi/xiexie/private/AcmWeChatSystem/image/avatar/");
        registry.addResourceHandler("/post/**").addResourceLocations("file:/Users/xierenyi/xiexie/private/AcmWeChatSystem/image/post/");
        registry.addResourceHandler("/photo/**").addResourceLocations("file:/Users/xierenyi/xiexie/private/AcmWeChatSystem/image/photo/");
        super.addResourceHandlers(registry);
    }
}