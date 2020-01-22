package com.example.acm.web;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @RequestMapping("/hello")
    public String index() {
        return "Hello 这是中文字符 World";
    }

}
