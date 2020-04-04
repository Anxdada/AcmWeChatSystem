import React from 'react';
import './index.less';
import Fetch from '../../fetch';
import { DetailPostUrl, SelectLabel, UpdatePostViewAndLike, SelectComment, ChangeCommentReplyLike, SelectReply, DeletePost, AddComment } from '../../config/dataAddress';
import { Divider, message, notification, Icon, Avatar, Pagination, Empty, Tag, Input, Button } from 'antd';
import { TabBar, NavBar, TextareaItem, ActionSheet, Modal } from 'antd-mobile';
import 'moment/locale/zh-cn';
import moment from 'moment';
import { EventEmitter2 } from 'eventemitter2';


moment.locale('zh-cn');

var emitterComment = new EventEmitter2();

const alert = Modal.alert;
const { TextArea } = Input;

const HeartSvg = () => (
    <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 1024 1024">
        <path d="M923 283.6c-13.4-31.1-32.6-58.9-56.9-82.8-24.3-23.8-52.5-42.4-84-55.5-32.5-13.5-66.9-20.3-102.4-20.3-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5-24.4 23.9-43.5 51.7-56.9 82.8-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3 0.1-35.3-7-69.6-20.9-101.9z" />
    </svg>
);

const HeartIcon = props => <Icon component={HeartSvg} {...props} />;

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


class ReplyListViewMaxTwo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            allReply: [],
        }
    }

    componentWillMount() {
        this.getReplyCommentData();
    }

    // 把pageSize调大就是为了取所有的, 预计不会太大, 为了获取所有的数量, 这样写方便点
    getReplyCommentData() {
        Fetch.requestPost({
            url: SelectReply,
            info: 'replyCommentId='+this.props.commentId+'&pageNum=1+&pageSize=100',
            timeOut: 3000,
        }).then ( 
            data => {
                if (data.status == 0) {
                    this.setState({
                        allReply: data.resultBean.items,
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

        const { allReply } = this.state;

        return (
            <div>
            {
                allReply.length == 0 ? null : 
                <div style={{ backgroundColor: '#FFFAFA', padding: 5 }}>
                    <span style={{ fontSize: 6, color: '#828282'}}><a>{allReply[0].createUserDetail.userName}</a> : {allReply[0].replyBody}</span>
                    {
                        allReply.length < 2 ? null :
                        <div style={{ fontSize: 6, color: '#828282'}}>
                            <a>{allReply[1].createUserDetail.userName}</a> 
                            {
                                allReply[1].reverseReplyId == -1 ? null :
                                <span>
                                    &nbsp;回复 <a>{allReply[1].replyUserName}</a>
                                </span>
                            } 
                            &nbsp;: {allReply[1].replyBody}
                        </div>
                    }
                    <span style={{ fontSize: 6, marginTop: 0, paddingLeft: 230 }}>共 <a>{allReply.length}</a> 条回复</span>
                </div>
            }
            </div>
        );
    }
}

class CommentView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isNowUserLikeThisComment: this.props.item.isNowUserLikeThisComment,
            likeTotal: this.props.item.like,
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
        // 主要是和detailComment中的冲突了..
        const like = this.state.isNowUserLikeThisComment ? 1 : 0;
        handleChangeLike({
            type: 'comment',
            id: this.props.item.commentId,
            uid: 2,
            like: like,
        });
    }

    render() {

        const { item } = this.props;

        return (
            <div>
                <div style={{ padding: 15}}>
                    <div>
                        <Avatar src={item.createUserDetail.avatar} style={{ height: 25, width: 25}}/>
                        <a style={{ paddingLeft: 5, fontSize: 14 }}>{item.createUserDetail.userName}</a>
                        {
                            item.isFloorOwner ? <span style={{ fontSize: 5, color: '#CFCFCF'}}>&nbsp;#楼主</span> :
                            null
                        }
                        <span style={{ color: '#B5B5B5', float: 'right'}} onClick={this.handleChangeLikeForComment}><Icon type="like" theme={this.state.isNowUserLikeThisComment ? 'filled' : 'outlined'} /> {this.state.likeTotal}</span>
                        <div style={{ paddingLeft: 30, marginTop: 0 }} onClick={() => this.props.history.push('/mobile/forum/comment/'+item.commentId)} >
                            <span style={{ color: '#B5B5B5', fontSize: 12 }}>{item.floor}楼 {item.createTime}</span><br />
                            <span>{item.commentBody}</span>
                            <ReplyListViewMaxTwo commentId={item.commentId} />
                        </div>
                    </div>
                </div>
                <Divider style={{ marginTop: 0, marginBottom: 0}}/>
            </div>
        );
    }
}

class CommentList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            nowPage: 1,
            totalPage: 1,
            pageSize: 10,
            aOrs: 0,
            order: 'createTime',
            allComment: [],
            postId: this.props.id,
        };
        emitterComment.on("refreshComment", this.refreshComment.bind(this));
    }

    // 首先注册必须和函数在同一个组件内
    // 但是不在该组件的也能调用..(emit方法)
    refreshComment = (msg) => {
        // console.log(msg);
        this.getCommentData();
    } 

    componentWillMount() {
        this.getCommentData();
    }

    getCommentData() {
        Fetch.requestPost({
            url: SelectComment,
            info: 'replyPostId='+this.state.postId+'&aOrs='+this.state.aOrs
                    +'&order='+this.state.order+'&pageNum='+this.state.nowPage,
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
                        allComment: data.resultBean.items
                    });
                } else {
                    this.setState({
                        nowPage: 1,
                        totalPage: 1,
                        allComment: [],
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

    handlePageChange = (page) => {
        // console.log(page);
        this.setState({ 
            nowPage: page,
        }, () => this.getCommentData());
    }

    render() {

        let sortRule;
        if (this.state.order == 'like') {
            sortRule = <span style={{ color: '#B5B5B5' }}><Icon type="like" />较赞在前</span>;
        } else if (this.state.aOrs == 0) {
            sortRule = <span style={{ color: '#B5B5B5' }}><Icon type="rise" />默认排序</span>;
        } else {
            sortRule = <span style={{ color: '#B5B5B5' }}><Icon type="fall" />较近在前</span>;
        }

        for (let i = 0 ; i < this.state.allComment.length ; ++ i) {
            this.state.allComment[i].floor = i + 1;
        }

        return (
            <div style={{ marginTop: 5 }}>
                <div style={{ backgroundColor: '#ffffff' }}>
                    <div style={{ height: 30 }} >
                        <div style={{ padding: 5 }}>
                        {this.state.totalPage * this.state.pageSize}条回帖
                        <span style={{ float: 'right'}} onClick={this.handleShowCommentSortActionSheet}>{sortRule}</span>
                        </div>
                    </div>
                    <Divider style={{ marginTop: 0, marginBottom: 0}}/>
                    {
                        this.state.allComment.length == 0 ? <Empty description="暂无评论" /> : 
                        <div>
                        {
                            this.state.allComment.map((item) => 
                                <CommentView item={item} {...this.props} key={item.commentId} />
                            )
                        }
                        </div>
                    }
                </div>
                <div className="postPagination" style={{ marginTop: 5}}>
                    <Pagination total={this.state.totalPage * this.state.pageSize} current={this.state.nowPage} 
                        onChange={this.handlePageChange} pageSize={this.state.pageSize} />
                </div>
            </div>
        );
    }
}

export default class MobileDetailPost extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            avatar: '',
            createUserName: '',
            createTime: '',
            postTitle: '',
            postTag: '',
            postBody: '',
            isHead: 0,
            isGreat: 0,
            isHot: 0,
            like: 0,
            views: 0,
            isSame: 0,
            labels: [],
            commentBody: '',
            submitting: false,
        }
    }

    componentWillMount() {
        this.getLabelData();
        this.getPostData();
    }

    getLabelData() {
        // 用于取出目前所有的标签
        Fetch.requestPost({
            url: SelectLabel,
            info: 'pageSize=100',
            timeOut: 3000,
        }).then ( 
            data => {
                if (data.status == 0) {
                    this.setState({
                        labels: data.resultBean.items,
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

    getPostData() {
        Fetch.requestPost({
            url: DetailPostUrl,
            info: 'postId='+this.props.match.params.id,
            timeOut: 3000,
        }).then ( 
            data => {
                if (data.status == 0) {
                    this.setState({
                        avatar: data.resultBean.avatar,
                        createUserName: data.resultBean.createUserName,
                        createTime: data.resultBean.createTime,
                        postTitle: data.resultBean.postTitle,
                        postTag: data.resultBean.postTag,
                        postBody: data.resultBean.postBody,
                        isHead: data.resultBean.isHead,
                        isGreat: data.resultBean.isGreat,
                        isHot: data.resultBean.isHot,
                        views: data.resultBean.views,
                        likeTotal: data.resultBean.like,
                        isNowUserLikeThisPost: data.resultBean.isNowUserLikeThisPost,
                        isSame: data.resultBean.isSame,
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

    deletePostData() {
        Fetch.requestPost({
            url: DeletePost,
            info: 'postId='+this.props.match.params.id,
            timeOut: 3000,
        }).then(
            data => {
                if (data.status == 0) {
                    message.success("删除成功");
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

    handleChangLikePost = () => {
        const { likeTotal, isNowUserLikeThisPost } = this.state;
        let num = isNowUserLikeThisPost ? -1 : 1; 
        this.setState({
            likeTotal: likeTotal + num,
            isNowUserLikeThisPost: !isNowUserLikeThisPost,
        })
    }

    handleShowDetailPostActionSheet = () => {
        let BUTTONS = ['回复', '举报', '取消'];   // ordinnary
        if (this.state.isSame) {
            BUTTONS = ['修改帖子', '修改标签', '回复', '删除', '取消']; // my 因为点击的事件都变了, 所以得重新写一个
            ActionSheet.showActionSheetWithOptions({
                options: BUTTONS,
                cancelButtonIndex: BUTTONS.length - 1,
                destructiveButtonIndex: BUTTONS.length - 2,
                maskClosable: true,
            },
            (buttonIndex) => {
                if (buttonIndex == 0) this.props.history.push('/mobile/forum/modifyPost/'+this.props.match.params.id);
                else if (buttonIndex == 1) this.props.history.push('/mobile/forum/postLabel/'+this.props.match.params.id)
                else if (buttonIndex == 2) this.customFocusInst.focus();
                else if (buttonIndex == 3) {
                    alert('删除这篇帖子后将无法恢复,是否确定删除?', '', [
                        { text: '取消' },
                        {
                            text: '确定',
                            onPress: () => this.deletePostData(),
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
                if (buttonIndex == 0) this.customFocusInst.focus();
                else if (buttonIndex == 1) this.props.history.push('/mobile/forum/report/'+2);
            });
        }
    }

    addCommentData() {
        console.log('xierenyi');
        Fetch.requestPost({
            url: AddComment,
            info: 'commentBody='+this.state.commentBody+'&replyPostId='+this.props.match.params.id,
            timeOut: 3000,
        }).then ( 
            data => {
                if (data.status == 0) {
                    message.success('评论发布成功');
                    emitterComment.emit("refreshComment", "添加评论成功");
                    this.setState({
                        commentBody: '',
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
                });
            }
        ).catch( err => {
            // console.log("err", err);
            message.error('连接超时! 请检查服务器是否启动.');
            this.setState({
                submitting: false,
            });
        });
    }

    handlePublishComment = () => {
        this.setState({
            submitting: true,
        }, () => this.addCommentData());
    }

    handleChangeCommentBody = (value) => {
        // console.log(e);
        this.setState({
            commentBody: value,
        })
    }

    // 不定死.. 就不会回到原来的网址, 果然还是App好写啊.. 这个back实现好sb..
    render() {
        const { labels } = this.state;
        let postLabels = [];
        for (let i = 0 ; i < labels.length ; ++ i) {
            if (!(this.state.postTag & (1<<labels[i].flag))) continue;
            postLabels.push(labels[i]);
        }
        // console.log(this.state.commentBody);
        return (
            <div >
                <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={() =>  window.location.href="/#/mobile/home/2"}
                    rightContent={<Icon key="1" type="ellipsis" style={{ fontSize: 25 }} onClick={this.handleShowDetailPostActionSheet}/>}
                >帖子详情</NavBar>
                <div style={{ backgroundColor: '#ffffff', padding: 15}}>
                    <div>
                        <strong style={{ fontSize: 20 }}>{this.state.postTitle}</strong>&nbsp;&nbsp;
                        <span>
                        {
                            this.state.isHead == 0 ? null : <Tag color="magenta">置顶&nbsp;&nbsp;</Tag>
                        }
                        {
                            this.state.isGreat == 0 ? null : <Tag color="volcano">精&nbsp;&nbsp;</Tag>
                        }
                        {
                            this.state.isHot == 0 ? null : <Tag color="red">热&nbsp;&nbsp;</Tag>
                        }
                        </span>
                    </div>
                    <div style={{ marginRight: 10, paddingTop: 10, fontSize: 12}}>
                        <Avatar src={this.state.avatar} style={{ height: 25, width: 25}}/>
                        <a style={{ paddingLeft: 5, fontSize: 14 }}>{this.state.createUserName}</a>
                        <span style={{ color: '#CFCFCF', float: 'right' }}>&nbsp;#楼主</span>
                    </div>
                    <span style={{ color: '#B5B5B5', paddingTop: 5, paddingRight: 10, fontSize: 12 }}>{this.state.createTime}</span>
                    <div style={{ paddingTop: 5}}>
                        <div dangerouslySetInnerHTML={{__html: this.state.postBody}} />
                    </div>
                    <div>
                        <Icon type="eye" style={{ color: '#FF8C69', paddingRight: 1 }}/><span style={{ fontSize: 6 ,color: '#B5B5B5', paddingRight: 5 }}>{this.state.views}</span>
                        <span onClick={this.handleChangLikePost}><HeartIcon style={{ color: this.state.isNowUserLikeThisPost ? 'hotpink' : 'grey', paddingRight: 1, paddingLeft: 5 }} /><span style={{ fontSize: 6 ,color: '#B5B5B5' }}>{this.state.likeTotal}</span></span>
                    </div>
                    <div style={{ fontSize: 7, marginTop: 8 }}>
                    标签:&nbsp;&nbsp;
                    {
                        postLabels.length == 0 ? <span>无</span> :
                        postLabels.map((item) => 
                            <Tag color={item.labelColor} key={item.labelId}>{item.labelName}</Tag>
                        )
                    }
                    </div>
                </div>
                <div style={{ marginTop: 5 }}>
                    <TextareaItem
                        title={
                            <Button type="primary" size="small" onClick={this.handlePublishComment} 
                                disabled={this.state.commentBody == '' ? true : false } loading={this.state.submitting}
                            > 发表 </Button>
                        }
                        placeholder="写下你的观点..."
                        data-seed="logId"
                        autoHeight
                        value={this.state.commentBody}
                        onChange={this.handleChangeCommentBody}
                        ref={el => this.customFocusInst = el}
                        style={{ fontSize: 14 }}
                    />
                </div>
                <CommentList id={this.props.match.params.id} {...this.props} />
            </div>
        );
    }

    // 更新此帖子的浏览量(和可能的点赞)
    componentWillUnmount() {

        let like = this.state.isNowUserLikeThisPost ? 1 : 0;
        let views = this.state.views + 1;

        Fetch.requestPost({
            url: UpdatePostViewAndLike,
            info: 'postId='+this.props.match.params.id+'&views='+views
                    +'&like='+like,
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
