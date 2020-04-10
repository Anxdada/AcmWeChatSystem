import React from 'react';
import { Avatar, Icon, message, notification } from 'antd';
import { NavBar, List } from 'antd-mobile';
import { GetFollowUserList, GetLoginUserMobile } from './../../config/dataAddress';
import Fetch from './../../fetch/index.js';

const Item = List.Item;

// 关注列表
export default class MobileFollowUserList extends React.Component{

    // App就很好做, web 感觉就很垃圾, 必须写两个页面... 也许是我菜, 不知道其他写法
    // 因为不知道点击的是是follow 还是 fan
    // 不过说到底还是参数只能简单的通过url传递的后果...
    constructor(props) {
        super(props);
        this.state = {
            nowUser: {},
            followUserList: [],
        }
    }

    componentWillMount() {
        this.getNowUserInfo();
        this.getFollowUserListData();
    }

    getNowUserInfo() {
        Fetch.requestGet({
            url: GetLoginUserMobile,
            timeOut: 3000,
        }).then ( 
            data => {
                if (data.status == 0) {
                    this.setState({
                        nowUser: data.resultBean,
                    });
                } else {
                    if (data.status < 100) {
                        message.error(data.msg);
                    } else {
                        notification.error({
                            message: data.error,
                            description: data.message
                        });
                    }
                }
            }
        ).catch( err => {
            // console.log("err", err);
            message.error('连接超时! 请检查服务器是否启动.');
        });
    }

    getFollowUserListData() {
        Fetch.requestPost({
            url: GetFollowUserList,
            info: 'userId='+this.props.match.params.id,
            timeOut: 3000,
        }).then ( 
            data => {
                if (data.status == 0) {
                    this.setState({
                        followUserList: data.resultBean,
                    });
                } else {
                    if (data.status < 100) {
                        message.error(data.msg);
                    } else {
                        notification.error({
                            message: data.error,
                            description: data.message
                        });
                    }
                }
            }
        ).catch( err => {
            // console.log("err", err);
            message.error('连接超时! 请检查服务器是否启动.');
        });
    }

	render() {

        const { followUserList, nowUser } = this.state;
		return(
            <div>
                <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                    // onLeftClick={() => window.location.href="/#/mobile/home/3"}
                    onLeftClick={() => window.history.back()}
                >{nowUser.userId == this.props.match.params.id ? "我" : "TA"}关注的人({followUserList.length})</NavBar>
                
                <div style={{ backgroundColor: '#fffff'}}>
                <List>
                {
                    followUserList.map((item) =>
                        <Item onClick={() => this.props.history.push('/mobile/user/otherUser/'+item.userId)} key={item.userId}>
                            <Avatar src={item.avatar} style={{ width: 22, height: 22, marginRight: 5 }}/>
                            {item.userName}
                        </Item>
                    )
                }
                </List>
                </div>
            </div>
		);
	}
}


// 用来展示关注的用户列表