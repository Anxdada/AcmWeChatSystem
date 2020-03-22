package com.example.acm.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;

import java.util.Set;
import java.util.concurrent.TimeUnit;

/**
 * redis配置类
 *
 **/
@Configuration
@EnableCaching//开启注解
public class RedisComponent {

    private Logger LOG = LoggerFactory.getLogger(RedisComponent.class);

    @Autowired
    private StringRedisTemplate stringRedisTemplate;
    // 操作redis的实例


    public void set(String key,String value){
        ValueOperations<String,String> ops = this.stringRedisTemplate.opsForValue();
        boolean bExistent = this.stringRedisTemplate.hasKey(key);
        if (bExistent) {
            LOG.info("this key is bExistent!");
        } else{
            ops.set(key,value, 3000);
        }
    }


    public void set(String key, String value, int second) {
        ValueOperations<String,String> ops = this.stringRedisTemplate.opsForValue();
        boolean bExistent = this.stringRedisTemplate.hasKey(key);
        if (bExistent) {
            LOG.info("this key is bExistent!");
        } else{
            ops.set(key, value, second, TimeUnit.SECONDS);
        }
    }

    public String get(String key){
        return this.stringRedisTemplate.opsForValue().get(key);
    }
    public void del(String key){
        this.stringRedisTemplate.delete(key);
    }

    // 操作Set数据, 用于评论以及回复点赞功能, 格式为comment+commentId(reply+replyId) -> set(点赞的uid)
    // 3.16 新增新闻点赞功能.. newsId -> set(点赞Id)
    // 3.21 新增手机端用户关注功能 每个用户分别维护两个set, 一个是粉丝列表, 一个关注列表, 规则 userFanId -> set(粉丝的用户id), userFollowId -> set(关注的用户id)
    // redis 的是无法直接删除一个set, 当一个set中的元素都无了后, 那么这个实际上也就是被删除了.
    // 因为在展示人一个set的时候, 不存在的set那么就是 empty
    public void setCommentReplyLike(String type, long id, long uid, int like) {
        String key = type+id;
//        Set<String> resultSet = stringRedisTemplate.opsForSet().members(key);
        Boolean isExist = stringRedisTemplate.opsForSet().isMember(key, String.valueOf(uid));
        if (like == 1 && !isExist) {
            stringRedisTemplate.opsForSet().add(key, String.valueOf(uid));
        } else if (like == 0 && isExist) {
            stringRedisTemplate.opsForSet().remove(key, String.valueOf(uid));
        }
    }

    public Set<String> getSetForKey(String key) {
        return stringRedisTemplate.opsForSet().members(key);
    }

    // set 最大 2^32 - 1, 也就是unsigned int的范围
    public long getSizeSetForKey(String key) {
        return stringRedisTemplate.opsForSet().size(key);
    }

    // 验证某个set中是否含有成员
    public Boolean hasMemberForKey(String key, String member) {
        return stringRedisTemplate.opsForSet().isMember(key, member);
    }

}