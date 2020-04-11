import React from 'react';
import { NavBar, Tabs, Badge, WingBlank } from 'antd-mobile';
import { Icon, Typography, Empty, message, notification, Divider, Pagination, Avatar } from 'antd';
import { GetLoginUserMobile, GetMyComment, GetMyForumTotalReply } from './../../config/dataAddress';
import Fetch from './../../fetch/index.js';

const { Title, Paragraph, Text } = Typography;


class MyCommentBrief extends React.Component{
    
    render() {
        const { item } = this.props;
        return (
        <div style={{ backgroundColor: '#ffffff' }}>
            <WingBlank size="sm" >
            <div style={{ marginBottom: 5 }} onClick={() => this.props.history.push('/mobile/user/myDetailComment/'+item.commentId)}>
                <span style={{ fontSize: 5, color: '#B5B5B5' }}>评论于 {item.createTime}</span><br />
                <span style={{ color: '#000000', fontWeight: 'bold', fontSize: 15 }}>{item.commentBody}</span><br />
                <span style={{ fontSize: 3 }}>来自帖子: {item.replyPostTitle}</span><br />
                <span style={{ color: '#B5B5B5', fontSize: 10 }}>
                    <Icon type="message" /> {item.replyNum}&nbsp;&nbsp;
                    <Icon type="like" /> {item.like}
                </span>
            </div>
            <Divider style={{ marginTop: 0, marginBottom: 0}}/>
            </WingBlank>
        </div>
        );
    }
};

class ShowCommentList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            nowPage: 1,
            totalPage: 1,
            pageSize: 10,
            allMyComment: [],
        }
    }

    componentWillMount() {
        this.getMyCommentData();
    }

    getMyCommentData() {
        Fetch.requestPost({
            url: GetMyComment,
            info: 'pageNum='+this.state.nowPage+'&pageSize='+this.state.pageSize
                    +'&createUser='+this.props.match.params.id,
            timeOut: 3000,
        }).then ( 
            data => {
                if (data.status == 0) {
                    if(data.resultBean.currentPage > 0) {
                        this.setState({ nowPage: data.resultBean.currentPage });
                    } else {
                        this.setState({ nowPage: 1 });
                    }
                    this.setState({
                        totalPage: data.resultBean.totalItems/data.resultBean.pageSize,
                        allMyComment: data.resultBean.items,
                    });
                } else {
                    this.setState({
                        nowPage: 1,
                        totalPage: 1,
                        allMyComment: [],
                    });
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

    handlePageChange = (page) => {
        // console.log(page);
        this.setState({ 
            nowPage: page,
        }, () => this.getMyPostData());
    }
    
    render() {
        
        const { allMyComment } = this.state;
        return (
            <div>
            {
                allMyComment.length == 0 ? <Empty description="没有数据"/> : 
                <div>
                    {
                        allMyComment.map((item) => 
                            <MyCommentBrief item={item} key={item.commentId} {...this.props} />
                        )
                    }
                    <div className="postPagination" style={{ marginTop: 5, marginBottom: 5 }}>
                        <Pagination total={this.state.totalPage * this.state.pageSize} current={this.state.nowPage} 
                            onChange={this.handlePageChange} pageSize={this.state.pageSize} />
                    </div>
                </div>
            }
            </div>
        );
    }
}


class MyForumTotalReplyBrief extends React.Component{
    
    render() {
        const { item, nowUser } = this.props;
        const textType = item.type == 0 ? "帖子" : "评论";
        const herfType = item.type == 0 ? '/mobile/forum/detail/' : '/mobile/user/myDetailComment/';
        const herfPerson = nowUser.userId == item.createUserDetail.userId ? '/mobile/user/myIndex' : '/mobile/user/otherUser/'+item.createUserDetail.userId;

        return (
        <div style={{ backgroundColor: '#ffffff' }}>
            <WingBlank size="sm" >
            <div style={{ padding: 10 }}>
                <Avatar src={item.createUserDetail.avatar} style={{ height: 25, width: 25}} onClick={() => this.props.history.push(herfPerson)}/>
                <a style={{ paddingLeft: 5, paddingTop: 1, fontSize: 14, width: 260 }} onClick={() => this.props.history.push(herfPerson)}>{item.createUserDetail.userName}</a>
                <span onClick={() => this.props.history.push(herfType+item.typeCorrespondId)}> 回复了你的{textType}</span>
            </div>
            <div style={{ marginBottom: 5, marginLeft: 5 }} onClick={() => this.props.history.push(herfType+item.typeCorrespondId)}>
                <span style={{ color: '#000000' }}>{item.forumTotalReplyBody}</span><br />
                <div style={{ backgroundColor: '#FFFAFA', color: '#828282', width: 350, fontSize: 13 }}>
                    <span>我的{textType}:{item.textReply}</span>
                </div>
                <span style={{ fontSize: 5, color: '#B5B5B5' }}>{item.createTime}</span><br />
            </div>
            <Divider style={{ marginTop: 0, marginBottom: 0}}/>
            </WingBlank>
        </div>
        );
    }
};

class ShowForumTotalReplyList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            nowPage: 1,
            totalPage: 1,
            pageSize: 10,
            allMyForumTotalReply: [],
        }
    }

    componentWillMount() {
        this.getMyForumTotalReplyData();
    }

    getMyForumTotalReplyData() {
        Fetch.requestPost({
            url: GetMyForumTotalReply,
            info: 'pageNum='+this.state.nowPage+'&pageSize='+this.state.pageSize
                    +'&replyUserId='+this.props.match.params.id,
            timeOut: 3000,
        }).then ( 
            data => {
                if (data.status == 0) {
                    if(data.resultBean.currentPage > 0) {
                        this.setState({ nowPage: data.resultBean.currentPage });
                    } else {
                        this.setState({ nowPage: 1 });
                    }
                    this.setState({
                        totalPage: data.resultBean.totalItems/data.resultBean.pageSize,
                        allMyForumTotalReply: data.resultBean.items,
                    });
                } else {
                    this.setState({
                        nowPage: 1,
                        totalPage: 1,
                        allMyForumTotalReply: [],
                    });
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

    handlePageChange = (page) => {
        // console.log(page);
        this.setState({ 
            nowPage: page,
        }, () => this.getMyPostData());
    }
    
    render() {
        
        const { allMyForumTotalReply } = this.state;
        return (
            <div>
            {
                allMyForumTotalReply.length == 0 ? <Empty description="没有数据"/> : 
                <div>
                    {
                        allMyForumTotalReply.map((item) => 
                            <MyForumTotalReplyBrief item={item} key={item.forumTotalReplyId}
                                {...this.props} nowUser={this.props.nowUser}
                            />
                        )
                    }
                    <div className="postPagination" style={{ marginTop: 5, marginBottom: 5 }}>
                        <Pagination total={this.state.totalPage * this.state.pageSize} current={this.state.nowPage} 
                            onChange={this.handlePageChange} pageSize={this.state.pageSize} />
                    </div>
                </div>
            }
            </div>
        );
    }
}

const tabs = [
    { title: <Badge text={'今日(20)'}>回复</Badge> },
    { title: <Badge text={'3'}>评论</Badge> },
];

class ShowCommentAndReplyList extends React.Component {

    render() {
        return (
            <div>
                <Tabs tabs={tabs}
                    initialPage={0}
                >
                    <ShowForumTotalReplyList {...this.props} order={this.props.order} nowUser={this.props.nowUser}/>
                    <ShowCommentList {...this.props} order={this.props.order} />
                </Tabs>
            </div>
        );
    }
}


// 注意这里的回复不是数据库中的那个回复(评论里面), 也就是不是reply(评论里面嵌套的回复)的信息
// 是有人回复了你的评论或者帖子时会出现在这里, 记住这个逻辑关系
// 这里说一下评论和回复和帖子之间在这里显示的逻辑
// 评论里面会显示你在所有帖子下留下的评论
// 这里的回复是指 其它人 回复了你的评论(或者回复 你的 回复)或者你的帖子, 相当于给你通知, 这个在新表forumTotalReply, 注意和reply表区分..
export default class MobileUserMyCommentAndReply extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            nowUser: {},
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

        const { nowUser } = this.state;
		return(
            <div>
                <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                    // onLeftClick={() =>  window.location.href="/#/mobile/home/3"}
                    onLeftClick={() =>  window.history.back()}
                >{nowUser.userId == this.props.match.params.id ? "我" : "TA"}的回复及评论</NavBar>
                
                <ShowCommentAndReplyList {...this.props} nowUser={nowUser}/>
            </div>
		);
	}
}