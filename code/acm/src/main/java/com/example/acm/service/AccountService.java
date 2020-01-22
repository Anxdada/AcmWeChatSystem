package com.example.acm.service;

import com.example.acm.entity.Account;

import java.util.List;

public interface AccountService {

    public void addAccount(int id, String name);

    public List<Account> selectAll();
}
