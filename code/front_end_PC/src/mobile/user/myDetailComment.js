import React from 'react';
import { Avatar, Icon, Divider, Input, Pagination, message, notification, Empty, Button } from 'antd';
import { NavBar, ActionSheet, Modal, TextareaItem  } from 'antd-mobile';
import { DetailComment, SelectReply, DeleteReply, ChangeCommentReplyLike, DeleteComment, AddReply, GetLoginUserMobile } from '../../config/dataAddress';
import 'moment/locale/zh-cn';
import Fetch from '../../fetch';
import moment from 'moment';
import { EventEmitter2 } from 'eventemitter2';

moment.locale('zh-cn');

var emitterReply = new EventEmitter2();

const alert = Modal.alert;
const { TextArea } = Input;

// 点赞处理函数
const handleChangeLike = (props) => {
    // console.log(props);
    Fetch.requestPost({
        url: ChangeCommentReplyLike,
        info: 'type='+props.type+'&id='+props.id
                +'&uid='+props.uid+ '&like='+props.like,
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
    })
}

class ReplyComponent extends React.Component{
    render() {
        return (
            <div style={{ marginTop: 5 }}>
                <TextareaItem
                    title={
                        <Button type="primary" size="small" onClick={() => this.handlePublishReply(-1)} 
                            disabled={this.state.replyBody == '' ? true : false } loading={this.state.submitting}
                        > 发送 </Button>
                    }
                    placeholder={`回复 ${this.state.replyPlaceholder}`}
                    data-seed="logId"
                    autoHeight
                    value={this.state.replyBody}
                    onChange={this.handleChangeReplyBody}
                    ref={el => this.replyFocusInst = el}
                    style={{ fontSize: 14 }}
                />
            </div>
        );
    }
}


class MobileReplyView extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            likeTotal: 0,
            initLikeTotal: 0,
            isNowUserLikeThisReply: false,
        }
    }

    componentWillMount() {
        this.setState({
            likeTotal: this.props.item.like,
            initLikeTotal: this.props.item.like,
            isNowUserLikeThisReply: this.props.item.isNowUserLikeThisReply,
        })
    }

    handleChangeLikeForReply = () => {
        const num = this.state.isNowUserLikeThisReply ? -1 : 1;
        this.setState({
            isNowUserLikeThisReply: !this.state.isNowUserLikeThisReply,
            likeTotal: this.state.likeTotal + num,
        })
    }

    render() {
        
        const { item, nowUser } = this.props;
        const { isNowUserLikeThisReply, likeTotal } = this.state; 
        const herfPerson = nowUser.userId == item.createUserDetail.userId ? '/mobile/user/myIndex' : '/mobile/user/otherUser/'+item.createUserDetail.userId;
        
        return(
            <div>
                <div style={{ padding: 10 }}>
                    <div>
                        <Avatar src={item.createUserDetail.avatar} style={{ height: 25, width: 25}} onClick={() => this.props.history.push(herfPerson)} />
                        <span>
                            <a style={{ fontSize: 14, paddingLeft: 5 }} onClick={() => this.props.history.push(herfPerson)}>{item.createUserDetail.userName}</a>
                            {
                                item.createUserDetail.userId == item.floorOwnerUserId ?
                                    <span style={{ fontSize: 5, color: '#CFCFCF'}}>&nbsp;#楼主</span> :
                                    null
                            }
                            {
                                item.reverseReplyId == -1 ? null :
                                <span>
                                    &nbsp;回复 <a 
                                        onClick={() => this.props.history.push(nowUser.userId == item.replyUserDetail.userId ? '/mobile/user/myIndex' : '/mobile/user/otherUser/'+item.replyUserDetail.userId)} 
                                    >{item.replyUserName}</a>
                                    {
                                        item.replyUserDetail.userId == item.floorOwnerUserId ?
                                            <span style={{ fontSize: 5, color: '#CFCFCF'}}>&nbsp;#楼主</span> :
                                            null
                                    }
                                </span>
                            } 
                        </span>
                        <span style={{ color: '#B5B5B5', float: 'right' }}>
                            <Icon type="like" theme={isNowUserLikeThisReply ? 'filled' : 'outlined'} 
                                onClick={this.handleChangeLikeForReply}
                            /> {likeTotal}
                        </span>
                    </div>
                    <div style={{ paddingLeft: 30 }} onClick={() => this.props.showActionSheet(item)}>
                        <div><span style={{ color: '#B5B5B5', fontSize: 12 }}>{item.createTime}</span></div>
                        <div>{item.replyBody}</div>
                    </div>
                </div>
                <Divider style={{ marginTop: 0, marginBottom: 0}}/>
            </div>
        );
    }

    componentWillUnmount() {
        // 没有变化就不更新
        // reply可以这样是因为不像评论那样是连续两个页面强相关的...
        // 这个只有一个页面..
        const { initLikeTotal, likeTotal } = this.state;
        if (initLikeTotal == likeTotal) return ;

        const like = this.state.isNowUserLikeThisReply ? 1 : 0;
        handleChangeLike({
            type: 'reply',
            id: this.props.item.replyId,
            uid: 2,
            like: like,
        });
    }

}



class MobileReplyList extends React.Component{

    state = {
        submitting: false,
        isShowReplyComponent: false,
    }

    constructor(props) {
        super(props);
        this.state = {
            nowPage: 1,
            totalPage: 1,
            pageSize: 10,
            allReply: [],
            replyBody: '',
            replyPlaceholder: '',
            reverseReplyId: '', // 回复的replyId
        }
        emitterReply.on("refreshReply", this.refreshReply.bind(this));
    }

    componentWillMount() {
        this.getReplyCommentData();
    }

    refreshReply = (msg) => {
        // console.log(msg);
        this.getReplyCommentData();
    }

    getReplyCommentData() {
        Fetch.requestPost({
            url: SelectReply,
            info: 'replyCommentId='+this.props.commentId+'&pageNum='+this.state.nowPage,
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
                        allReply: data.resultBean.items
                    });
                } else {
                    this.setState({
                        nowPage: 1,
                        totalPage: 1,
                        allReply: [],
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
                this.setState({
                    loading: false,
                })
            }
        ).catch( err => {
            // console.log("err", err);
            message.error('连接超时! 请检查服务器是否启动.');
            this.setState({
                loading: false,
            })
        });
    }

    handleDeleteReply = (replyId) => {
        Fetch.requestPost({
            url: DeleteReply,
            info: 'replyId='+replyId,
            timeOut: 3000,
        }).then(
            data => {
                if (data.status == 0) {
                    message.success('回复删除成功');
                    emitterReply.emit("refreshReply", "删除回复");
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

    addReplyCommentData(replyId, replyBody, commentId) {
        console.log(replyId+replyBody+commentId);
        Fetch.requestPost({
            url: AddReply,
            info: 'replyBody='+replyBody+'&replyCommentId='+commentId
                    +'&reverseReplyId='+replyId,
            timeOut: 3000,
        }).then ( 
            data => {
                if (data.status == 0) {
                    message.success('回复成功');
                    emitterReply.emit("refreshReply", "回复成功");
                    this.setState({
                        replyBody: '',
                        isShowReplyComponent: false, // 回复完后隐藏
                    })
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
                this.setState({
                    submitting: false,
                })
            }
        ).catch( err => {
            // console.log("err", err);
            message.error('连接超时! 请检查服务器是否启动.');
            this.setState({
                submitting: false,
            })
        });
    }

    handleShowActionSheet = (item) => {
        let BUTTONS = ['回复', '举报', '取消'];   // ordinnary
        // console.log(item);
        if (item.isSame) {  // 这个的原因所以需要单独实现..
            BUTTONS = ['回复', '删除', '取消']; // my 因为点击的事件都变了, 所以得重新写一个
            ActionSheet.showActionSheetWithOptions({
                options: BUTTONS,
                cancelButtonIndex: BUTTONS.length - 1,
                destructiveButtonIndex: BUTTONS.length - 2,
                maskClosable: true,
            },
            (buttonIndex) => {
                if (buttonIndex == 0) {
                    this.handleSetTextAearAttributes(item.createUserDetail.userName, item.replyId);
                }
                else if (buttonIndex == 1) {
                    alert('确定要删除此条回复?', '', [
                        { text: '取消' },
                        {
                            text: '确定',
                            onPress: () => this.handleDeleteReply(item.replyId),
                        },
                    ]);
                }
            });
        } else {
            ActionSheet.showActionSheetWithOptions({
                options: BUTTONS,
                cancelButtonIndex: BUTTONS.length - 1,
                maskClosable: true,
            },
            (buttonIndex) => {
                if (buttonIndex == 0) {
                    this.handleSetTextAearAttributes(item.createUserDetail.userName, item.replyId);
                    // this.replyFocusInstChild.focus(); // 异步, 此时组件没生效, 那么无法聚焦
                } else if (buttonIndex == 1) {
                    this.props.history.push('/mobile/forum/report/'+2);
                }
            });
        }
    }

    handleChangeReplyBody= (value) => {
        this.setState({
            replyBody: value,
        })
    }

    handlePublishReply = () => {
        // console.log(this.props.commentId);
        this.setState({
            submitting: true,
        }, () => this.addReplyCommentData(this.state.reverseReplyId, this.state.replyBody, this.props.commentId));
    }

    handleSetTextAearAttributes(userName, replyId) {
        // console.log(value);
        this.setState({
            isShowReplyComponent: true,
            replyPlaceholder: userName,
            reverseReplyId: replyId,
        }, () => this.replyFocusInstChild.focus());
    }

    handlePageChange = (page) => {
        // console.log(page);
        this.setState({ 
            nowPage: page,
        }, () => this.getReplyCommentData());
    }

    render() {

        const { allReply } = this.state;
        const { nowUser } = this.props;

        const ReplyComponent = <div>
            <TextareaItem
                title={
                    <Button type="primary" onClick={this.handlePublishReply} 
                        disabled={this.state.replyBody == '' ? true : false } loading={this.state.submitting}
                    > 发送 </Button>
                }
                placeholder={`回复 ${this.state.replyPlaceholder}`}
                data-seed="logId"
                autoHeight
                value={this.state.replyBody}
                onChange={this.handleChangeReplyBody}
                ref={el => this.replyFocusInstChild = el}
                style={{ fontSize: 14 }}
            />
        </div>

        return(
            <div style={{ marginTop: 5 }}>
                <div style={{ backgroundColor: '#ffffff' }}>
                    <div style={{ height: 30 }} >
                        <div style={{ padding: 5 }}>{this.state.totalPage * this.state.pageSize}条回复</div>
                    </div>
                    <Divider style={{ marginTop: 0, marginBottom: 0}}/>
                    <div>
                    {
                        allReply.length == 0 ? <Empty description="暂无回复" /> :
                        allReply.map((item) =>
                            <MobileReplyView showActionSheet={this.handleShowActionSheet} item={item}
                                key={item.replyId} {...this.props} nowUser={nowUser}
                            />
                        )
                    }
                    </div>
                </div>
                {
                    this.state.isShowReplyComponent ? ReplyComponent : null
                }
                <div className="postPagination" style={{ marginTop: 5}}>
                    <Pagination total={this.state.totalPage * this.state.pageSize} current={this.state.nowPage} 
                        onChange={this.handlePageChange} pageSize={this.state.pageSize} />
                </div>
            </div>
        );
    }

}

export default class MobileDetailComment extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            singleComment: [],
            createUserDetail: [],
            isNowUserLikeThisComment: 0,
            initLikeTotal: 0,
            likeTotal: 0,
            isSame: 0,
            replyBody: '',
            submitting: false,
            replyPlaceholder: '',
            nowUser: {},
        }
    }

    componentWillMount() {
        this.getSingleCommentData();
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

    getSingleCommentData() {
        Fetch.requestPost({
            url: DetailComment,
            info: 'commentId='+this.props.match.params.id,
            timeOut: 3000,
        }).then (
            data => {
                if (data.status == 0) {
                    this.setState({
                        singleComment: data.resultBean,
                        isNowUserLikeThisComment: data.resultBean.isNowUserLikeThisComment,
                        initLikeTotal: data.resultBean.like,
                        likeTotal: data.resultBean.like,
                        createUserDetail: data.resultBean.createUserDetail,
                        isSame: data.resultBean.isSame,
                        replyPlaceholder: data.resultBean.createUserDetail.userName,
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

    handleDeleteComment = (commentId) => {
        Fetch.requestPost({
            url: DeleteComment,
            info: 'commentId='+commentId,
            timeOut: 3000,
        }).then(
            data => {
                if (data.status == 0) {
                    message.success('评论删除成功');
                    window.history.back();
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

    addReplyCommentData(replyId, replyBody, commentId) {
        // console.log(replyId + replyBody);
        Fetch.requestPost({
            url: AddReply,
            info: 'replyBody='+replyBody+'&replyCommentId='+commentId
                    +'&reverseReplyId='+replyId,
            timeOut: 3000,
        }).then ( 
            data => {
                if (data.status == 0) {
                    message.success('回复成功');
                    emitterReply.emit("refreshReply", "回复成功");
                    this.setState({
                        replyBody: '',
                    })
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
                this.setState({
                    submitting: false,
                })
            }
        ).catch( err => {
            // console.log("err", err);
            message.error('连接超时! 请检查服务器是否启动.');
            this.setState({
                submitting: false,
            })
        });
    }

    handleShowActionSheet = () => {
        let BUTTONS = ['回复', '举报', '取消'];   // ordinnary
        if (this.state.isSame) {
            BUTTONS = ['回复', '删除', '取消']; // my 因为点击的事件都变了, 所以得重新写一个
            ActionSheet.showActionSheetWithOptions({
                options: BUTTONS,
                cancelButtonIndex: BUTTONS.length - 1,
                destructiveButtonIndex: BUTTONS.length - 2,
                maskClosable: true,
            },
            (buttonIndex) => {
                if (buttonIndex == 0) {
                    this.handleChangeTextAearPlaceholder(this.state.createUserDetail.userName);
                    this.replyFocusInst.focus();
                }
                else if (buttonIndex == 1) {
                    alert('确定要删除此条评论?', '', [
                        { text: '取消' },
                        {
                            text: '确定',
                            onPress: () => this.handleDeleteComment(this.props.match.params.id),
                        },
                    ]);
                }
            });
        } else {
            ActionSheet.showActionSheetWithOptions({
                options: BUTTONS,
                cancelButtonIndex: BUTTONS.length - 1,
                maskClosable: true,
            },
            (buttonIndex) => {
                if (buttonIndex == 0) {
                    this.handleChangeTextAearPlaceholder(this.state.createUserDetail.userName);
                    this.replyFocusInst.focus();
                } else if (buttonIndex == 1) {
                    this.props.history.push('/mobile/forum/report/'+2);
                }
            });
        }
    }

    handleChangeLikeForComment = () => {
        const num = this.state.isNowUserLikeThisComment ? -1 : 1;
        this.setState({
            isNowUserLikeThisComment: !this.state.isNowUserLikeThisComment,
            likeTotal: this.state.likeTotal + num,
        }, () => this.updateLikeCommentRealTime());
    }

    updateLikeCommentRealTime() {
        // 不实时更新, 导致数据没有及时更新而导致显示bug...
        // 和detailPost中的comment冲突..
        const like = this.state.isNowUserLikeThisComment ? 1 : 0;
        handleChangeLike({
            type: 'comment',
            id: this.props.match.params.id,
            uid: 2,
            like: like,
        });
    }

    handleChangeReplyBody= (value) => {
        this.setState({
            replyBody: value,
        })
    }

    handlePublishReply = (replyId) => {
        this.setState({
            submitting: true,
        }, () => this.addReplyCommentData(replyId, this.state.replyBody, this.props.match.params.id));
    }

    handleChangeTextAearPlaceholder(value) {  // 子类并不能调用这个, 调用父类的setState
        console.log(value);
        this.setState({
            replyPlaceholder: value,
        })
    }

    // 不能提前终止渲染, 也就是createUserDetail这个必须单独取出来
    // 不能超过两层..
	render() {
        const { singleComment, createUserDetail, nowUser } = this.state;
        // console.log(this.state.replyBody);
        const herfPerson = nowUser.userId == createUserDetail.userId ? '/mobile/user/myIndex' : '/mobile/user/otherUser/'+createUserDetail.userId;

		return(
            <div>
                <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={() =>  window.history.back()}
                    rightContent={[
                        <span style={{ fontSize: 14 }} onClick={() => this.props.history.push('/mobile/forum/detail/'+singleComment.replyPostId)}>查看原帖&nbsp;&nbsp;</span>,
                        <Icon key="1" type="ellipsis" style={{ fontSize: 25 }} onClick={this.handleShowActionSheet}/>,
                    ]}
                >回帖</NavBar>
                
                <div style={{ backgroundColor: '#ffffff', padding: 10 }}>
                    <div>
                        <Avatar src={createUserDetail.avatar} style={{ height: 25, width: 25}} onClick={() => this.props.history.push(herfPerson)} />
                        <a style={{ paddingLeft: 5, fontSize: 14 }} onClick={() => this.props.history.push(herfPerson)} >{createUserDetail.userName}</a>
                    </div>
                    <div style={{ paddingLeft: 30 }} onClick={this.handleShowActionSheet}>{singleComment.commentBody}</div>
                    <span style={{ paddingLeft: 30 }}>
                        <span style={{ color: '#B5B5B5', fontSize: 12 }} onClick={this.handleShowActionSheet}>{singleComment.createTime}</span>
                        <span style={{ color: '#B5B5B5', float: 'right'}} onClick={this.handleChangeLikeForComment}>
                            <Icon type="like" theme={this.state.isNowUserLikeThisComment ? 'filled' : 'outlined'} /> {this.state.likeTotal}
                        </span>
                    </span>
                </div>
                <div style={{ marginTop: 5 }}>
                    <TextareaItem
                        title={
                            <Button type="primary" size="small" onClick={() => this.handlePublishReply(-1)} 
                                disabled={this.state.replyBody == '' ? true : false } loading={this.state.submitting}
                            > 发送 </Button>
                        }
                        placeholder={`回复 ${this.state.replyPlaceholder}`}
                        data-seed="logId"
                        autoHeight
                        value={this.state.replyBody}
                        onChange={this.handleChangeReplyBody}
                        ref={el => this.replyFocusInst = el}
                        style={{ fontSize: 14 }}
                    />
                </div>
                <MobileReplyList commentId={this.props.match.params.id} {...this.props}
                    addReplyCommentData={this.addReplyCommentData} nowUser={nowUser}
                />
            </div>
		);
    }
}