package com.example.acm.service.impl;

import com.example.acm.entity.FriendUrl;
import com.example.acm.service.FriendUrlService;
import com.example.acm.mapper.FriendUrlMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * @author Anxdada
 * @version 1.0
 * @date 2020-02-10 00:41
 */
@Service
public class FriendUrlServiceImpl implements FriendUrlService {
    @Autowired
    private FriendUrlMapper friendUrlMapper;

    public List<FriendUrl> selectAll() {
        return friendUrlMapper.selectAll();
    }

    public List<FriendUrl> findFriendUrlListByFriendUrlId(Long friendUrlId) {
        return friendUrlMapper.findFriendUrlListByFriendUrlId(friendUrlId);
    }

    public void addFriendUrl(FriendUrl friendUrl) {
        friendUrlMapper.addFriendUrl(friendUrl);
    }

    public void updateFriendUrlByFriendUrlId(FriendUrl friendUrl) {
        friendUrlMapper.updateFriendUrlByFriendUrlId(friendUrl);
    }

    public Integer countFriendUrlListByQuery(Map<String, Object> map) {
        return friendUrlMapper.countFriendUrlListByQuery(map);
    }

    public Integer countFriendUrlMapListByQuery(Map<String, Object> map) {
        return friendUrlMapper.countFriendUrlMapListByQuery(map);
    }

    public List<Map<String,Object>> findFriendUrlMapListByQuery(Map<String, Object> map) {
        return friendUrlMapper.findFriendUrlMapListByQuery(map);
    }
}
