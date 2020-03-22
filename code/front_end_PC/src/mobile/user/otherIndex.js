import React from 'react';
import { Avatar, Icon, Divider, Tag } from 'antd';
import { NavBar, List, ActionSheet, WingBlank, WhiteSpace, Modal } from 'antd-mobile';

const Item = List.Item;
const alert = Modal.alert;


export default class MobileOtherUserDetailPage extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            thisPageUser: {},
        }
    }

    componentWillMount() {
        this.state.thisPageUser = {
            avatar: 'http://localhost:9999/avatar/touxiang4.jpg',
            userName: '风居住的街道',
        }
    }


    handleShowActionSheet = () => {
        let BUTTONS = ['举报', '取消'];
        ActionSheet.showActionSheetWithOptions({
            options: BUTTONS,
            cancelButtonIndex: BUTTONS.length - 1,
            maskClosable: true,
        },
        (buttonIndex) => {
            if (buttonIndex == 0) this.props.history.push('/mobile/forum/report/'+2);
        });
    }

    handleDeleteFollow = () => {
        alert('确定不再关注此人?', '', [
            { text: '确定', onPress: () => {} },
            {
                text: '取消',
                onPress: () => {},
            },
        ])
    }

	render() {

        const { thisPageUser } = this.state;

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
                            </div>
                            <div style={{ paddingTop: 15 }}>
                                <Icon type="woman" style={{ color: '#FF34B3' }}/>
                                <span style={{ paddingLeft: 5 }} 
                                    onClick={() => this.props.history.push('/mobile/user/follow/'+thisPageUser.userId)}>关注 <strong>5</strong></span>
                                <Divider type="vertical" style={{ height: 15 }} />
                                <span onClick={() => this.props.history.push('/mobile/user/fan/'+thisPageUser.userId)}>被关注 <strong>10</strong></span>
                            </div>
                            <div style={{ marginTop: 10 }}>
                                <Tag color="#87d068" onClick={this.handleAddFollow}>+ 关注</Tag>
                                <Tag color="#FF0000" onClick={this.handleDeleteFollow}>已关注</Tag>
                            </div>
                        </div>
                    </div>
                </div>
                </WingBlank>
                <List renderHeader={() => 'Ta的'}>
                    <Item 
                        thumb={<Icon type="profile" theme="twoTone" />}
                        arrow="horizontal"
                        onClick={() => {}}
                        key='1'
                    >
                        Ta的帖子
                    </Item>
                    <Item 
                        thumb={<Icon type="message" theme="twoTone" />}
                        arrow="horizontal"
                        onClick={() => {}}
                        key='2'
                    >
                        Ta的回复
                    </Item>
                </List>
            </div>
		);
	}
}