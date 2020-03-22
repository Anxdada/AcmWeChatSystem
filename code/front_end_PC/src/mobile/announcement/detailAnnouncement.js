import React from 'react';
import './index.less';
import { Divider, Typography, Icon, Comment, Avatar, message, notification, Tag} from 'antd';
import { Link } from "react-router-dom";
import { Modal, WingBlank, NavBar, WhiteSpace, Button, Toast } from 'antd-mobile';
import Fetch from '../../fetch';
import { DetailAnnouncementUrl, UpdateAnnouncementView } from '../../config/dataAddress';
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

const { Title, Paragraph, Text } = Typography;

export default class MobileDetailAnnouncement extends React.Component {

    state = {
        visible: false,
    }

    constructor(props) {
        super(props);
        this.state = {
            announcementId: '',
            announcementTitle: '',
            announcementBody: '',
            announcementTagName: '',
            announcementTagColor: '',
            avatar: '',
            createUser: '',
            createTime: '',
            isRegister: 0,
            registerStartTime: null,
            registerEndTime: null,
            nowUser: [],
            view: 0,
        }
    }

    componentWillMount() {
        this.getData();
    }

    getData() {

        Fetch.requestPost({
            url: DetailAnnouncementUrl,
            info: 'announcementId='+this.props.match.params.id,
            timeOut: 3000,
        }).then ( 
            data => {
                // console.log(data);
                if (data.status == 0) {
                    this.setState({
                        announcementId: data.resultBean.announcementId,
                        announcementTitle: data.resultBean.announcementTitle,
                        announcementBody: data.resultBean.announcementBody,
                        announcementTagName: data.resultBean.announcementTagName,
                        announcementTagColor: data.resultBean.announcementTagColor,
                        avatar: data.resultBean.avatar,
                        createUser: data.resultBean.createUser,
                        createTime: data.resultBean.createTime,
                        isRegister: data.resultBean.isRegister,
                        registerStartTime: data.resultBean.registerStartTime,
                        registerEndTime: data.resultBean.registerEndTime,
                        nowUser: data.resultBean.nowUser,
                        view: data.resultBean.view+1,
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

    handleRegister = () => {
        if (this.state.nowUser.studentId == null || this.state.nowUser.realName == null) {
            Modal.alert('报名失败', '请完善你的个人资料!', [
                { text: '取消', onPress: () => console.log('cancel') },
                { text: '去完善资料', onPress: () => this.props.history.push('/mobile/user/personalInfo/' + this.state.nowUser.userId)},
            ])
        }
        else {
            Toast.info('报名成功!', 2);
        }
    }

    render() {
        // console.log(this.state.avatar);

        const nowState = this.state.isRegister == 0 ? <Tag color="blue">已发布</Tag> :
                            moment().isAfter(this.state.registerEndTime) ? 
                            <Tag color="#f50">报名结束</Tag> :
                            <Tag color="green">正在报名</Tag>;

        const disableRegister = moment().isAfter(this.state.registerEndTime) ? false : false;

        const signUpComponent = this.state.isRegister == 0 ? null : 
                                <div>
                                    <strong>快快点击下方按钮报名吧!</strong>
                                    <Button type="primary" onClick={this.handleRegister} disabled={disableRegister}>
                                        <span style={{ color: '#FFFFFF'}}>
                                        {
                                            disableRegister ? "报名已截止" : "点击报名"
                                        }
                                        </span>
                                    </Button>
                                </div>;

        return (
            <div className="mainContainer">
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() =>  window.history.back(-1)}
                >
                    公告详情
                </NavBar>
                <Divider style={{ margin: 0}} />
                <div className="detailAnnouncement">
                    <span style={{fontSize: 5, color: '#B5B5B5' }}>首页 > 公告 > 公告详情 </span>
                    <Title level={3}>{this.state.announcementTitle}</Title>
                    
                    <Paragraph style={{ marginTop: 5 }}>
                        <div dangerouslySetInnerHTML={{__html: this.state.announcementBody}} />
                    </Paragraph>
                    <span style={{fontSize: 5, color: '#B5B5B5' }}>
                        类别: <Tag color={this.state.announcementTagColor}>{this.state.announcementTagName}</Tag>
                        状态: {nowState}
                    </span>
                    {
                        this.state.isRegister == 0 ? null : <p>截止时间: <strong>{this.state.registerEndTime}</strong></p> 
                    }
                    <Comment
                        avatar={
                            <Avatar
                                src={this.state.avatar}
                                alt="Han Solo"
                            />
                        }
                        author={this.state.createUser}
                        content={this.state.createTime}
                        style={{
                            marginTop: 0,
                        }}
                    />
                    {signUpComponent}
                    <WhiteSpace size="sm" />
                    <Icon type="eye" /> {this.state.view}
                </div>
                <br />
            </div>
            
        );
    }
    
    // 更新此公告的浏览量
    componentWillUnmount() {
        Fetch.requestPost({
            url: UpdateAnnouncementView,
            info: 'announcementId='+this.props.match.params.id+'&view='+this.state.view,
            timeOut: 3000,
        }).then(
            data => {
                if (data.status == 0) ;
                else if (data.status < 100) {
                    message.error(data.msg);
                } else {
                    notification.error({
                        message: data.error,
                        description: data.message
                    });
                }
            }
        ).catch( err => {
            // console.log("err", err);
            message.error('连接超时! 请检查服务器是否启动.');
        });
    }
}
