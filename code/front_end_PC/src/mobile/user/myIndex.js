import React from 'react';
import { List, WingBlank } from 'antd-mobile';
import { Icon, Divider, Tag, message, notification } from 'antd';
import { GetLoginUserMobile, DetailUser } from './../../config/dataAddress';
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
        title: '我的值日',
        icon: 'carry-out',
        herf: '/mobile/user/onDuty',
        key: 2,
    },
    {
        title: '我的阅历',
        icon: 'schedule',
        herf: '/mobile/user/gameExperience',
        key: 3,
    },
    {
        title: '我发布的帖子',
        icon: 'profile',
        herf: '/mobile/user/myPost/',
        key: 4,
    },
    {
        title: '我的评论与回复',
        icon: 'message',
        herf: '/mobile/user/myCommentAndReply/',
        key: 5,
    },
];


const aboutMenuArray = [
    {
        title: '关于',
        icon: 'info-circle',
        herf: '/#/mobile/user/about',
        key: 1,
    },
    {
        title: '反馈与建议',
        icon: 'bug',
        herf: '/#/mobile/user/feedback',
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
        const { nowUser } = this.props; 
		return(
			<div>
            <List renderHeader={() => '我的'}>
                {
                    myMenuArray.map((item) => {
                        if (item.key >= 4) {
                            return (
                                <Item
                                    thumb={<Icon type={item.icon} theme="twoTone" />}
                                    arrow="horizontal"
                                    extra=""
                                    onClick={() => this.props.history.push(item.herf+nowUser.userId)}
                                    key={item.key}
                                >
                                    {item.title}
                                </Item>
                            )
                        } else {
                            return (
                                <Item
                                    thumb={<Icon type={item.icon} theme="twoTone" />}
                                    arrow="horizontal"
                                    extra=""
                                    onClick={() => this.props.history.push(item.herf)}
                                    key={item.key}
                                >
                                    {item.title}
                                </Item>
                            )
                        }
                    })
                }
            </List>
			</div>
		);
	}
}

const ListAboutMenu = <div>
    <List renderHeader={() => '其它'}>
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
    }

    render() {
        const { nowUser } = this.props;
        const SexComponent = nowUser.sex == 1 ?
            <Icon type="woman" style={{ color: '#FF34B3' }}/> :
            <Icon type="man" style={{ color: '#00BFFF' }}/>;

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
                            {SexComponent}
                            <span style={{ paddingLeft: 5 }} 
                                onClick={() => this.props.history.push('/mobile/user/follow/'+nowUser.userId)}>关注 <strong>{nowUser.followNumber}</strong></span>
                            <Divider type="vertical" style={{ height: 15 }} />
                            <span onClick={() => this.props.history.push('/mobile/user/fan/'+nowUser.userId)}>被关注 <strong>{nowUser.fanNumber}</strong></span>
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
        this.state = {
            nowUser: [],
        }
    }

    componentWillMount() {
        this.getNowUserInfo();
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

	render() {
		return(
            <div className="mobileUserInfo">
                <UserInfo {...this.props} nowUser={this.state.nowUser} />
                <ListMyMenu {...this.props} nowUser={this.state.nowUser} />
                {ListAboutMenu}
            </div>
		);
	}
}