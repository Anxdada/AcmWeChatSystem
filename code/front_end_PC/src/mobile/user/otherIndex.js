import React from 'react';
import { Avatar, Icon, Divider, Tag, message, notification } from 'antd';
import { NavBar, List, ActionSheet, WingBlank, WhiteSpace, Modal } from 'antd-mobile';
import { DetailUser, CheckRelationshipWithLoginUserMobile, FollowOrUnFollowUser } from './../../config/dataAddress';
import Fetch from './../../fetch/index.js';
import { authArray, authColorArray } from './../../config/userAuthAbout';
import { EventEmitter2 } from 'eventemitter2';


var emitter = new EventEmitter2();

const Item = List.Item;
const alert = Modal.alert;

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

export default class MobileOtherUserDetailPage extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            thisPageUser: {},
            follow: 0,
        };
        emitter.on("refresh", this.refresh.bind(this));
    }

    refresh = () => {
        // this.getSingleUserData();
        // 目前refresh 只会更新"关系"
        this.getRelationShipOfLoginUser();
    }

    componentWillMount() {
        this.getSingleUserData();
        this.getRelationShipOfLoginUser();
    }

    getSingleUserData() {
        Fetch.requestPost({
            url: DetailUser,
            info: 'userId='+this.props.match.params.id,
            timeOut: 3000,
        }).then ( 
            data => {
                if (data.status == 0) {
                    this.setState({
                        thisPageUser: data.resultBean,
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

    getRelationShipOfLoginUser() {
        Fetch.requestPost({
            url: CheckRelationshipWithLoginUserMobile,
            info: 'checkUserId='+this.props.match.params.id,
            timeOut: 3000,
        }).then ( 
            data => {
                if (data.status == 0) {
                    this.setState({
                        follow: data.resultBean,
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

    setFollowOrUnfollow(like) {
        Fetch.requestPost({
            url: FollowOrUnFollowUser,
            info: 'like='+like+'&uid='+this.props.match.params.id,
            timeOut: 3000,
        }).then ( 
            data => {
                if (data.status == 0) {
                    const msg = like == 0 ? "取关成功" : "关注成功";
                    message.success(msg);
                    emitter.emit("refresh", "关注或者取关");
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


    handleShowActionSheet = () => {
        let BUTTONS = ['举报', '取消'];
        ActionSheet.showActionSheetWithOptions({
            options: BUTTONS,
            cancelButtonIndex: BUTTONS.length - 1,
            maskClosable: true,
        },
        (buttonIndex) => {
            if (buttonIndex == 0) this.props.history.push('/mobile/user/report/'+this.props.match.params.id);
        });
    }


    handleDeleteFollow = () => {
        alert('确定不再关注此人?', '', [
            { text: '确定', onPress: () => this.setFollowOrUnfollow(0) },
            {
                text: '取消',
                onPress: () => {},
            },
        ])
    }

    handleAddFollow = () => {
        this.setFollowOrUnfollow(1);
    }

	render() {

        const { thisPageUser, follow } = this.state;
        const SexComponent = thisPageUser.sex == 1 ?
            <Icon type="woman" style={{ color: '#FF34B3' }}/> :
            <Icon type="man" style={{ color: '#00BFFF' }}/>;

		return(
            <div >
                <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={() =>  window.history.back(-1)}
                    rightContent={<Icon key="1" type="ellipsis" style={{ fontSize: 25 }} onClick={this.handleShowActionSheet}/>}
                >用户主页</NavBar>

                <WhiteSpace size="sm" />
                <WingBlank size="sm">
                <div style={{ backgroundColor:'#ffffff' }}>
                    <div style={{ display: '-webkit-box', display: 'flex', padding: '15px 0' }} >
                        <div style={{ padding:5 }}>
                            <Avatar style={{ height: 80, width: 80, marginLeft: 10, }} src={thisPageUser.avatar} alt="头像" />
                        </div>
                        <div style={{ lineHeight: 1, paddingLeft: 15 }} >
                            <div style={{ marginBottom: 12 }} />
                            <div>
                                <span style={{ fontSize: 20, color: '#FF6E27' }}>{thisPageUser.userName}</span>
                                <span style={{ marginLeft: 10 }}>
                                {
                                    follow ? <Tag color="#FF0000" onClick={this.handleDeleteFollow}>已关注</Tag> :
                                    <Tag color="#40E0D0" onClick={this.handleAddFollow}>+ 关注</Tag>
                                }
                                </span>
                            </div>
                            <div style={{ paddingTop: 15 }}>
                                {SexComponent}
                                <span style={{ paddingLeft: 5 }} 
                                    onClick={() => this.props.history.push('/mobile/user/follow/'+thisPageUser.userId)}>关注 <strong>{thisPageUser.followNumber}</strong></span>
                                <Divider type="vertical" style={{ height: 15 }} />
                                <span onClick={() => this.props.history.push('/mobile/user/fan/'+thisPageUser.userId)}>被关注 <strong>{thisPageUser.fanNumber}</strong></span>
                            </div>
                            <AuthTag auth={thisPageUser.auth}/>
                        </div>
                    </div>
                </div>
                </WingBlank>
                <List renderHeader={() => 'Ta的'}>
                    <Item 
                        thumb={<Icon type="profile" theme="twoTone" />}
                        arrow="horizontal"
                        onClick={() => this.props.history.push('/mobile/user/myPost/'+thisPageUser.userId)}
                        key='1'
                    >
                        Ta的帖子
                    </Item>
                    <Item 
                        thumb={<Icon type="message" theme="twoTone" />}
                        arrow="horizontal"
                        onClick={() => this.props.history.push('/mobile/user/myCommentAndReply/'+thisPageUser.userId)}
                        key='2'
                    >
                        Ta的回复
                    </Item>
                </List>
            </div>
		);
	}
}