import React from 'react';
import { List, WingBlank } from 'antd-mobile';
import { Icon, Divider, Tag, message, notification } from 'antd';
import { GetLoginUser } from './../../config/dataAddress';
import Fetch from './../../fetch/index.js';
import { authArray, authColorArray } from './../../config/userAuthAbout';

const myMenuArray = [
    {
        title: '个人资料',
        icon: 'idcard',
        herf: '/mobile/user/personalInfo',
        key: 1,
    },
    {
        title: '我的帖子',
        icon: 'profile',
        herf: '#',
        key: 2,
    },
    {
        title: '我的回复',
        icon: 'message',
        herf: '#',
        key: 4,
    },
    {
        title: '我的值日',
        icon: 'carry-out',
        herf: '#',
        key: 5,
    },
    {
        title: '我的比赛经历',
        icon: 'schedule',
        herf: '#',
        key: 6,
    },
];


const aboutMenuArray = [
    {
        title: '关于',
        icon: 'info-circle',
        herf: '#',
        key: 1,
    },
    {
        title: '反馈与建议',
        icon: 'bug',
        herf: '#',
        key: 2,
    },
];

const Item = List.Item;
class ListMyMenu extends React.Component{

    constructor(props) {
        super(props);
        // console.log(props);
    }

	render() {
        // console.log(this.props);
		return(
			<div>
            <List renderHeader={() => '我的'}>
                {
                    myMenuArray.map((item) =>
                        <Item
                            thumb={<Icon type={item.icon} theme="twoTone" />}
                            arrow="horizontal"
                            onClick={() => this.props.history.push(item.herf)}
                            key={item.key}
                        >
                            {item.title}
                        </Item>
                    )
                }
            </List>
			</div>
		);
	}
}

const ListAboutMenu = <div>
    <List renderHeader={() => '关于'}>
        {
            aboutMenuArray.map((item) =>
                <Item
                    thumb={<Icon type={item.icon} theme="twoTone" />}
                    arrow="horizontal"
                    onClick={() => window.location.href=item.herf}
                    key={item.key}
                >
                    {item.title}
                </Item>
            )
        }
    </List>
</div>

class AuthTag extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
        const { auth } = this.props;
        let index = 0; // 根据身份号组装身份字符串
        for (let i = 0 ; i < 6 ; ++ i) {
            if ((1 << i) & auth) {
                index = i;
                break;
            }
        }
		return(
            <div style={{ marginTop: '10px' }}>
                <Tag color={authColorArray[index]}>{authArray[index]}</Tag>
            </div>
		);
	}
}

class UserInfo extends React.Component {
  
    constructor(props) {
        super(props);
        this.state = {
            nowUser: [],
        }
    }

    componentWillMount() {
        this.getNowUserInfo();
    }

    getNowUserInfo() {
        Fetch.requestGet({
            url: GetLoginUser,
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

    render() {
        const { nowUser } = this.state;
        return (
    	<div>
    		<div style={{ marginLeft: '20px', marginTop: '20px', marginBottom: '10px',  }}>
    			<h3>用户信息</h3>
    		</div>
            <WingBlank size="sm">
    		<div style={{ backgroundColor:'#ffffff' }}>
                <div style={{ display: '-webkit-box', display: 'flex', padding: '15px 0' }} >
                    <div style={{ padding:'5px' }}>
                        <img style={{ height: '80px', marginLeft: '10px' }} src={nowUser.avatar} alt="头像" />
                    </div>
                    <Divider type="vertical" style={{ height: '90px' }} />
                    <div style={{ lineHeight: 1 }} >
                        <div style={{ marginBottom: '8px', fontWeight: 'bold' }}></div>
                        <div>用户名：<span style={{ fontSize: '20px', color: '#FF6E27' }}>{nowUser.userName}</span></div>
                        <AuthTag auth={nowUser.auth} />
                        <div style={{ paddingTop: 10 }}>
                            <Icon type="man" style={{ color: '#00BFFF' }}/>
                            <span style={{ paddingLeft: 5 }} 
                                onClick={() => this.props.history.push('/mobile/user/follow/'+nowUser.userId)}>关注 <strong>5</strong></span>
                            <Divider type="vertical" style={{ height: 15 }} />
                            <span onClick={() => this.props.history.push('/mobile/user/fan/'+nowUser.userId)}>被关注 <strong>10</strong></span>
                        </div>
                    </div>
                </div>
            </div>
            </WingBlank>
    	</div>
        );
    }
}

export default class MobileUserInfo extends React.Component{

    constructor(props) {
        super(props);
    }

	render() {
		return(
            <div className="mobileUserInfo">
                <UserInfo {...this.props}/>
                <ListMyMenu {...this.props}/>
                {ListAboutMenu}
            </div>
		);
	}
}