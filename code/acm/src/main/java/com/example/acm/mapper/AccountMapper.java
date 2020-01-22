package com.example.acm.mapper;

import com.example.acm.entity.Account;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper
public interface AccountMapper {
    public void addAccount(int id, String name);

    public List<Account> selectAll();
}
