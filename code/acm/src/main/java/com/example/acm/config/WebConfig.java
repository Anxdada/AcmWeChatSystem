package com.example.acm.config;//package com.xry.demo.config;
//
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.core.annotation.Order;
//import org.springframework.http.MediaType;
//import org.springframework.http.converter.HttpMessageConverter;
//import org.springframework.http.converter.StringHttpMessageConverter;
//import org.springframework.web.servlet.config.annotation.*;
//
//import java.nio.charset.Charset;
//import java.util.Collections;
//import java.util.List;
//
///**
// *
// */
//@Order(1)
//@Configuration
//@EnableWebMvc
//public class WebConfig implements WebMvcConfigurer {
//
//
//    @Bean
//    public HttpMessageConverter<String> responseBodyConverter() {
//        StringHttpMessageConverter stringHttpMessageConverter = new StringHttpMessageConverter(Charset.forName("UTF-8"));
//        stringHttpMessageConverter.setSupportedMediaTypes(Collections.singletonList(MediaType.APPLICATION_JSON_UTF8));
//        return stringHttpMessageConverter;
//    }
//
//    @Override
//    public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
//        converters.add(responseBodyConverter());
//    }
//
//}
