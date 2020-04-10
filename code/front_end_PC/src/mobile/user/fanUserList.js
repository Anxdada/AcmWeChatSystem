import React from 'react';
import { Avatar, Icon, message, notification } from 'antd';
import { NavBar, List } from 'antd-mobile';
import { GetFanUserList, GetLoginUserMobile } from './../../config/dataAddress';
import Fetch from './../../fetch/index.js';

const Item = List.Item;

// 粉丝列表
export default class MobileFanUserList extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            nowUser: {},
            fanUserList: [],
        }
    }

    componentWillMount() {
        this.getNowUserInfo();
        this.getFanUserListData();
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

    getFanUserListData() {
        Fetch.requestPost({
            url: GetFanUserList,
            info: 'userId='+this.props.match.params.id,
            timeOut: 3000,
        }).then ( 
            data => {
                if (data.status == 0) {
                    this.setState({
                        fanUserList: data.resultBean,
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

        const { fanUserList, nowUser } = this.state;
		return(
            <div>
                <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                    // onLeftClick={() => window.location.href="/#/mobile/home/3"} 这个看后续上线的处理吧..
                    onLeftClick={() => window.history.back()}
                >关注{nowUser.userId == this.props.match.params.id ? "我" : "TA"}的人({fanUserList.length})</NavBar>
                
                <div style={{ backgroundColor: '#fffff'}}>
                <List>
                {
                    fanUserList.map((item) =>
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


// 用来展示粉丝的用户列表