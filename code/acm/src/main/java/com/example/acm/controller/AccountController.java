package com.example.acm.controller;

import com.example.acm.entity.Account;
import com.example.acm.service.AccountService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
public class AccountController {

    private Logger LOG = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private AccountService accountService;

    @RequestMapping("/find")
    public String all(ModelMap modelMap) {
        List<Account> accounts= accountService.selectAll();
        for (Account i : accounts) {
            System.out.println(i.getId() + " " + i.getName());
        }
        return "success";
    }
}
