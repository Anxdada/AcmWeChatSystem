package com.example.acm.service.impl;

import com.example.acm.entity.Account;
import com.example.acm.mapper.AccountMapper;
import com.example.acm.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccountServiceImpl implements AccountService {
    @Autowired
    private AccountMapper accountMapper;

    public void addAccount(int id, String name) {
        accountMapper.addAccount(id, name);
    }

    public List<Account> selectAll() {
        return accountMapper.selectAll();
    }
}
