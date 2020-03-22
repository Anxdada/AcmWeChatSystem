import React from 'react';
import './index.less';
import Fetch from '../../fetch';
import { LoginUrl } from '../../config/dataAddress';
import { Divider, message, notification, Icon, Avatar, Pagination, Empty } from 'antd';
import { TabBar, NavBar, TextareaItem, ActionSheet } from 'antd-mobile';
import 'moment/locale/zh-cn';
import moment from 'moment';

moment.locale('zh-cn');

const HeartSvg = () => (
    <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 1024 1024">
        <path d="M923 283.6c-13.4-31.1-32.6-58.9-56.9-82.8-24.3-23.8-52.5-42.4-84-55.5-32.5-13.5-66.9-20.3-102.4-20.3-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5-24.4 23.9-43.5 51.7-56.9 82.8-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3 0.1-35.3-7-69.6-20.9-101.9z" />
    </svg>
);

const HeartIcon = props => <Icon component={HeartSvg} {...props} />;


class CommentView extends React.Component {

    state = {
        avatar: 'http://localhost:9999/avatar/dali.jpg',
        userName: '诸葛大力',
        commentBody: '热爱可抵岁月漫长',
        createTime: '2020-01-01 02:32:05',
        type: 1,
    }

    handleClickComment = () => {
        this.props.history.push('/mobile/forum/comment/'+2);
    }

    render() {
        return (
            <div style={{ padding: 15}}>
                <div>
                    <Avatar src={this.state.avatar} style={{ height: 25, width: 25}}/>
                    <a style={{ paddingLeft: 5, fontSize: 14 }}>{this.state.userName}</a>
                    <span style={{ color: '#B5B5B5', float: 'right'}}><Icon type="like" theme={this.state.type == 1 ? 'filled' : 'outlined'} /> 5</span>
                    <div style={{ paddingLeft: 30, marginTop: 0 }} onClick={this.handleClickComment} >
                        <span style={{ color: '#B5B5B5', fontSize: 12 }}>1楼 {this.state.createTime}</span><br />
                        <span>{this.state.commentBody}</span>
                        <div style={{ backgroundColor: '#FFFAFA', padding: 5 }}>
                            <span style={{ fontSize: 6, color: '#828282'}}><a>张伟</a> : 一定要站在你所热爱的世界里闪闪发光</span>
                            <div style={{ fontSize: 6, color: '#828282'}}><a>张伟</a> 回复 <a>大力</a> : 从黎明到黄昏，阳光充足，胜过一切过去的诗</div>
                            <span style={{ fontSize: 6, marginTop: 0, paddingLeft: 230 }}>共 <a>15</a> 条回复</span>
                        </div>
                    </div>
                </div>
                
            </div>
        );
    }
}

class CommentList extends React.Component {

    state = {
        order: 'createTime',
        aOrs: 0,
    }

    constructor(props) {
        super(props);
    }

    handleShowCommentSortActionSheet = () => {
        const BUTTONS = ['默认排序', '较近在前', '较赞在前', '取消'];
        ActionSheet.showActionSheetWithOptions({
            options: BUTTONS,
            cancelButtonIndex: BUTTONS.length - 1,
            maskClosable: true,
        },
        (buttonIndex) => {
            let { order, aOrs } = this.state;
            if (buttonIndex == 0) {
                if (order != 'createTime' || aOrs != 0) {
                    order = 'createTime';
                    aOrs = 0;
                }
            } else if (buttonIndex == 1) {
                if (order != 'createTime' || aOrs != 1) {
                    order = 'createTime';
                    aOrs = 1;
                }
            } else if (buttonIndex == 2) {
                if (order != 'like') {
                    order = 'like';
                    aOrs = 1;
                }
            }
            this.setState({ 
                order, 
                aOrs,
            });
        });
    }

    render() {
        let len = 0;

        let sortRule;
        if (this.state.order == 'like') {
            sortRule = <span style={{ color: '#B5B5B5' }}><Icon type="like" />较赞在前</span>;
        } else if (this.state.aOrs == 0) {
            sortRule = <span style={{ color: '#B5B5B5' }}><Icon type="rise" />默认排序</span>;
        } else {
            sortRule = <span style={{ color: '#B5B5B5' }}><Icon type="fall" />较近在前</span>;
        }

        return (
            <div style={{ marginTop: 10, backgroundColor: '#ffffff' }}>
                <div style={{ height: 30 }} >
                    <div style={{ padding: 5 }}>
                    {5}条回帖
                    <span style={{ float: 'right'}} onClick={this.handleShowCommentSortActionSheet}>{sortRule}</span>
                    </div>
                </div>
                <Divider style={{ marginTop: 0, marginBottom: 0}}/>
                <CommentView {...this.props}/>
                <Empty />
            </div>
        );
    }
}

export default class MobileDetailPost extends React.Component {

    state = {
        avatar: 'http://localhost:9999/avatar/zhangwei.jpg',
        userName: '谢仁义解放后带建设方科技',
        createTime: '2020-02-01 20:23:01',
        title: '这是一个标题',
        brief: '少年就是少年，他们看春风不喜，看夏蝉不烦，看秋风不悲，看冬雪不叹，看满身富贵...',
        auth: '谢仁义',
        like: 5,
        view: 1000,
        comment: 10,
        img: 'http://localhost:9999/photo/0036bcd3-a5e9-478e-8ee4-cdc8443ba525.jpg',
        isLike: 0,
    }

    constructor(props) {
        super(props);
    }

    getPostData() {
        Fetch.requestPost({
            url: LoginUrl,
            info: 'userName='+this.state.userName+'&password='+this.state.password,
            timeOut: 3000,
        }).then ( 
            data => {
                
            }
        ).catch( err => {
            // console.log("err", err);
            message.error('连接超时! 请检查服务器是否启动.');
        });
    }

    handleChangLikePost = () => {
        this.setState({
            isLike: 1 - this.state.isLike,
        })
    }

    handleShowDetailPostActionSheet = () => {
        let BUTTONS = ['举报', '取消'];   // ordinnary
        // BUTTONS = ['编辑', '删除', '设置评论', '取消']; // my
        ActionSheet.showActionSheetWithOptions({
            options: BUTTONS,
            cancelButtonIndex: BUTTONS.length - 1,
            maskClosable: true,
        },
        (buttonIndex) => {
            if (buttonIndex == 0) this.props.history.push('/mobile/forum/report/'+2);
        });
    }

    render() {

        // console.log(this.props.history);

        // 不定死.. 就不会回到原来的网址, 果然还是App好写啊.. 这个back实现好sb..
        return (
            <div >
                <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={() =>  window.location.href="/#/mobile/home/2"}
                    rightContent={<Icon key="1" type="ellipsis" style={{ fontSize: 25 }} onClick={this.handleShowDetailPostActionSheet}/>}
                >帖子详情</NavBar>
                <div style={{ backgroundColor: '#ffffff', padding: 15}}>
                    <strong style={{ fontSize: 20 }}>{this.state.title}</strong>
                    <div style={{ marginRight: 10, paddingTop: 10, fontSize: 12}}>
                        <Avatar src={this.state.avatar} style={{ height: 25, width: 25}}/>
                        <a style={{ paddingLeft: 5, fontSize: 14 }}>{this.state.userName}</a>
                    </div>
                    <span style={{ color: '#B5B5B5', paddingTop: 5, paddingRight: 10, fontSize: 12 }}>{this.state.createTime}</span>
                    <div style={{ paddingTop: 5}}>
                        <p>{this.state.brief}</p>
                    </div>
                    <div>
                        <Icon type="eye" style={{ color: '#FF8C69', paddingRight: 1 }}/><span style={{ fontSize: 6 ,color: '#B5B5B5', paddingRight: 5 }}>{this.state.view}</span>
                        <span onClick={this.handleChangLikePost}><HeartIcon style={{ color: this.state.isLike == 1 ? 'hotpink' : 'grey', paddingRight: 1, paddingLeft: 5 }} /><span style={{ fontSize: 6 ,color: '#B5B5B5' }}>{this.state.like}</span></span>
                    </div>
                </div>
                <CommentList {...this.props}/>
                <div className="postPagination" style={{ marginTop: 5}}>
                    <Pagination />
                </div>
            </div>
        );
    }
}
