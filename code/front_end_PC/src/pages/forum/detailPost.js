import React, { useContext } from 'react';
import { Row, Col, Card, DatePicker, Typography, Dropdown, message, Menu, notification, Tag, Radio, Popconfirm, Divider, Avatar, Badge, Modal, AutoComplete, Icon, Pagination, BackTop, Tooltip, Input, Comment, Form, Button, Skeleton, Empty, Select } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { connect } from 'react-redux';
import { switchMenu,addMenu } from './../../redux/actions';
import { GetLoginUser, DetailUser, SelectLabel, AddComment, DetailPostUrl, SelectComment, SelectReply, DeleteComment, ChangeLike, AddReply, DeleteReply } from '../../config/dataAddress';
import Fetch from './../../fetch';
import FloatNav from './FloatNav';
import { authArray } from '../../config/userAuthAbout';
import {EventEmitter2} from 'eventemitter2';

moment.locale('zh-cn');

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const { Meta } = Card;
const { TextArea } = Input;
const { Option } = Select;
const { Title, Paragraph, Text } = Typography;

// react 跨组件传递数据
const NowUser = React.createContext("当前登录用户信息");
const ThemeContext = React.createContext('light');

// 这个页面挺多东西需要优化的, 有时间好好的搞一下吧...
// 对标牛客, 简书的评论功能

var emitterComment = new EventEmitter2();
var emitterReply = new EventEmitter2();

// 这个操作在后台没必要做了..
class ReportCommentOrReply extends React.Component {

    state = {
        visible: false,
        reportType: '',
    }

    constructor(props) {
        super(props);
    }

    handleReportComment = () => {
        console.log(this.state.reportType);
        this.setState({
            visible: true,
        })
    }

    handleOkModal = () => {
        this.setState({
            visible: false,
        })
    }

    handleCancelModal = () => {
        this.setState({
            visible: false,
        })
    }

    render() {
        return (
            <span>
                <a style={{ fontSize: this.props.fontSize, color: '#2E8B57', paddingRight: 10 }} onClick={this.handleReportComment}>举报</a>
                <Modal
                    title="举报"
                    visible={this.state.visible}
                    onOk={this.handleOkModal}
                    onCancel={this.handleCancelModal}
                    okText="提交"
                    cancelText="取消"
                >
                    <div>
                        <p><strong>举报类型</strong></p>
                        <Radio.Group onChange={this.onChange} value={this.state.reportType}>
                            <Radio style={{ width: 130 }} value="广告及垃圾信息">广告及垃圾信息</Radio>
                            <Radio style={{ width: 130 }} value="抄袭或涉嫌侵权">抄袭或涉嫌侵权</Radio>
                            <Radio style={{ width: 130 }} value="不友善/色情/低俗内容">不友善/色情/低俗内容</Radio>
                            <br />
                            <Radio style={{ width: 130 }} value="政治敏感">政治敏感</Radio>
                            <Radio style={{ width: 130 }} value="其它">其它</Radio>
                        </Radio.Group>
                    </div>
                    <div style={{ marginTop: 15, marginBottom: 15 }}>
                        <p>举报说明</p>
                        <TextArea rows={4} />
                    </div>
                </Modal>
            </span>
        )
    }
}


class ShowUserDetailInfo extends React.Component {

    state = {
        visible: false,
    }

    constructor(props) {
        super(props);
    }

    handleShowUserDetail = (record) => {
        // console.log(record);
        let authStr = ''; // 根据身份号组装身份字符串
        for (let i = 0 ; i < 6 ; ++ i) {
            if ((1 << i) & record.auth) {
                if (authStr === '') {
                    authStr += authArray[i];
                } else {
                    authStr += ", ";
                    authStr += authArray[i];
                }
            }
        }
        this.setState({
            modalAvatar: record.avatar,
            modalUserName: record.userName,
            modalStudentId: record.studentId,
            modalAuth: authStr,
            modalGrade: record.grade,
            modalTelephone: record.telephone,
            modalRealName: record.realName,
            modalCreateTime: record.createTime,
            visible: true,
        });
    }

    handleOkModal = () => {
        this.setState({
            visible: false,
        });
    }

    // 注意用div 会强制换行 
    // 换成span 既不会啦
    // 目前在reply List 还有个bug.. a 只有第一个生效.
    render() {
        return (
            <span>
                <a style={{ fontSize: 14 }} onClick={() => this.handleShowUserDetail(this.props.record)}>{this.props.record.userName}</a>
                <Modal
                    title="用户详细信息"
                    visible={this.state.visible}
                    onOk={this.handleOkModal}
                    onCancel={this.handleOkModal}
                    okText="关闭"
                    ancelText=""
                >
                    <div>
                        头&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;像:&nbsp;&nbsp;&nbsp;&nbsp;
                        <Avatar src={this.state.modalAvatar} />
                    </div>
                    <div className="modalInput">
                        用&nbsp;&nbsp;户&nbsp;&nbsp;名:&nbsp;&nbsp;&nbsp;&nbsp;<strong>{this.state.modalUserName} </strong>
                    </div>
                    <div className="modalInput">
                        学&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号:&nbsp;&nbsp;&nbsp;&nbsp;<strong>{this.state.modalStudentId}</strong>
                    </div>
                    <div className="modalInput">
                        身&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;份:&nbsp;&nbsp;&nbsp;&nbsp;<strong>{this.state.modalAuth}</strong>
                    </div>
                    <div className="modalInput">
                        年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;级:&nbsp;&nbsp;&nbsp;&nbsp;<strong>{this.state.modalGrade}</strong>
                    </div>
                    <div className="modalInput">
                        联系电话:&nbsp;&nbsp;&nbsp;&nbsp;<strong>{this.state.modalTelephone} </strong>
                    </div>
                    <div className="modalInput">
                        真实姓名:&nbsp;&nbsp;&nbsp;&nbsp;<strong>{this.state.modalRealName} </strong>
                    </div>
                    <div className="modalInput">
                        注册时间:&nbsp;&nbsp;&nbsp;&nbsp;<strong>{this.state.modalCreateTime} </strong>
                    </div>
                </Modal>
            </span>
        );
    }
}

function ThemedButton(props) {
    // 第三步：使用共享 Context
    // 组件继承了react.Component 就不能用这个钩子.. 不知道为啥
    const theme = useContext(ThemeContext);
    return (
        <div>
            <p>{theme}</p>
        </div>
    );
}

class ReplyView extends React.Component {

    state = {
        submitting: false,
    }

    constructor(props) {
        super(props);
        this.state = {
            showReplyBox: false,
            replyUserName: '请输入你的观点',
            replyBody: '',
            likeTotal: 0,
            isNowUserLikeThisReply: false,
        }
    }

    componentWillMount() {
        this.setState({
            likeTotal: this.props.item.like,
            isNowUserLikeThisReply: this.props.item.isNowUserLikeThisReply,
        })
    }

    handleEditChange = (e) => {
        this.setState({
            replyBody: e.target.value,
        })
    }

    handleReplyBtn = (replyId) => {
        // 这里有个遗憾, 就是无法实现自动聚焦.. 下面哪种方法适用于Input(TextArea又不行..), 但是Input只有一行, 不能自动扩充区域..
        // 总之就是不能完美.. 只能不填这个坑了, 确实没有什么好的方法..
        // const { input } = this.inputRef; // 如果是textArea的话(验证过, 不行..)，const { textAreaRef } = this.inputRef;
        // input.focus();
        // input.setSelectionRange(0, textAreaRef.value.length);
        // input.select(); // 可全部选中

        if (this.state.replyBody == 0) {
            return ;
        }

        this.setState({
            submitting: true,
        }, () => this.addReplyCommentData(replyId));
    };

    handleShowReplyBox = (userName) => {
        this.setState({
            showReplyBox: !this.state.showReplyBox,
            replyUserName: `回复${userName}`,
        })
        // const { textAreaRef } = this.inputRef;
        // textAreaRef.focus();
        // textAreaRef.setSelectionRange(0, textAreaRef.value.length);
    }

    addReplyCommentData(replyId) {
        Fetch.requestPost({
            url: AddReply,
            info: 'replyBody='+this.state.replyBody+'&replyCommentId='+this.props.commentId
                    +'&reverseReplyId='+replyId,
            timeOut: 3000,
        }).then ( 
            data => {
                if (data.status == 0) {
                    message.success('回复成功');
                    emitterReply.emit("refreshReply", "回复成功");
                    this.setState({
                        replyBody: '',
                        showReplyBox: false,
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

    handleChangeLikeForReply = () => {
        const num = this.state.isNowUserLikeThisReply == false ? 1 : -1;
        this.setState({
            isNowUserLikeThisReply: !this.state.isNowUserLikeThisReply,
            likeTotal: this.state.likeTotal + num,
        })
    }

    // 有个bug, 只能第一个有 用户详细信息modal click事件, 后面的无法触发... ? 记得查一下
    render() {
        const { item } = this.props;
        let replyBox = <div className={this.state.showReplyBox == false ? "hideReplyBox" : "showReplyBox"}>
            <TextArea className="replyText" placeholder={this.state.replyUserName} autoSize />
            <Button style={{ marginLeft: 800 }} type="primary">回复</Button>
        </div>
        const likeText = this.state.isNowUserLikeThisReply == false ? "赞" : "已赞";
        const likeTotal = this.state.likeTotal; 

        // console.log(this.props.uid);
        return (
            <div className="replyStyle">

                <div style={{ fontSize: 14, paddingTop: 0, color: '#000000' }}>
                    <ShowUserDetailInfo record={item.createUserDetail} />&nbsp;
                    {
                        item.reverseReplyId == -1 ? null :
                        <span>
                            回复 <ShowUserDetailInfo record={item.replyUserDetail} />
                        </span>
                    }
                    : {item.replyBody}
                </div>
                <span style={{ fontSize: 12, marginTop: 10, paddingTop: 10, color: '#828282' }}>
                    {item.createTime}
                </span> 
                <div className="actions">
                    <Popconfirm title="确定删除?" onConfirm={() => this.handleDeleteReply(item.replyId)} okText="确定" cancelText="取消">
                        <a style={{ fontSize: 13, color: '#2E8B57', paddingRight: 10 }}>删除</a>
                    </Popconfirm>
                    <a style={{ fontSize: 12, color: '#2E8B57', paddingRight: 10 }} onClick={this.handleChangeLikeForReply}>{likeText}({likeTotal})</a>
                    <a style={{ fontSize: 12, color: '#2E8B57' }} onClick={() => this.handleShowReplyBox(item.createUserDetail.userName)}>回复</a>
                </div>
                <div className={this.state.showReplyBox == false ? "hideReplyBox" : "showReplyBox"}>
                    <TextArea className="replyText" placeholder={this.state.replyUserName} autoSize allowClear
                        ref={(input) => { this.inputRef = input; }} value={this.state.replyBody}
                        onChange={this.handleEditChange}
                    />
                    <Button style={{ marginLeft: 800 }} type="primary" onClick={() => this.handleReplyBtn(item.replyId)}>回复</Button>
                </div>
                <Divider style={{ backgroundColor: '#C1CDCD', marginTop: 7, marginBottom: 7 }}/>
            </div>
        );
    }

    componentWillUnmount() {
        // console.log(this.props.uid);
        const like = this.state.isNowUserLikeThisReply == false ? 0 : 1;
        handleChangeLike({
            type: 'reply',
            id: this.props.item.replyId,
            uid: this.props.uid,
            like: like,
        });
    }
}


// 点赞处理函数
const handleChangeLike = (props) => {
    // console.log(props);
    Fetch.requestPost({
        url: ChangeLike,
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



class ReplyList extends React.Component {

    state = {
        loading: false,
        submitting: false,
    }

    constructor(props) {
        super(props);
        this.state = {
            nowPage: 1,
            totalPage: 1,
            pageSize: 10,
            allReply: [],
            replyBody: '',
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

    addReplyCommentData(replyId) {
        Fetch.requestPost({
            url: AddReply,
            info: 'replyBody='+this.state.replyBody+'&replyCommentId='+this.props.commentId
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

    handleEditChange = (e) => {
        this.setState({
            replyBody: e.target.value,
        })
    }

    handleSubmitReply = (replyId) => {
        this.setState({
            submitting: true,
        }, () => this.addReplyCommentData(replyId))
    }

    handlePageChange = (page) => {
        this.setState({
            nowPage: page 
        }, () => this.getReplyCommentData());
    }

    render() {
        const { loading, submitting, replyBody } = this.state;
        const { uid } = this.props;
        return (
            <div className="replyList">
                <div className="replyViewListContainer">
                <Skeleton loading={loading} active>
                {
                    this.state.allReply.map((item) => 
                        <ReplyView item={item} key={item.replyId} commentId={this.props.commentId} uid={uid} />
                    )
                }   
                </Skeleton>
                </div>
                {
                    this.state.allReply.length == 0 ? <div><br /></div> :
                    <Pagination className="tablePage" onChange={this.handlePageChange} total={this.state.totalPage*this.state.pageSize}
                        pageSize={this.state.pageSize} defaultCurrent={this.state.nowPage} />
                }
                <div>
                    <TextArea value={ replyBody} className="replyTextList" placeholder="请输入你的观点..." autoSize allowClear 
                        onChange={this.handleEditChange}
                    />
                    <Button style={{ marginLeft: 800 }} type="primary" loading={submitting} onClick={() => this.handleSubmitReply(-1)}
                        disabled={ replyBody == null || replyBody == ''}
                    >回复</Button>
                </div>
            </div>
        );
    }
}

class CommentView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showReplyBox: false,
            replyNum: this.props.item.replyNum,
            likeTotal: 0,
            isNowUserLikeThisComment: false,
        }
    }

    componentWillMount() {
        this.setState({
            likeTotal: this.props.item.like,
            isNowUserLikeThisComment: this.props.item.isNowUserLikeThisComment,
        })
    }

    handleShowReplyBox = () => {
        if (this.state.replyNum != 0) {
            this.setState({
                replyNum: 0,
            })
        } else {
            this.setState({
                showReplyBox: !this.state.showReplyBox,  
            })
        }
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
                    emitterComment.emit("refreshComment", "删除评论");
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

    handleChangeLikeForComment = () => {
        const num = this.state.isNowUserLikeThisComment == false ? 1 : -1;
        this.setState({
            isNowUserLikeThisComment: !this.state.isNowUserLikeThisComment,
            likeTotal: this.state.likeTotal + num,
        })
    }

    // 删除操作只能管理员做, 能进后台又都是管理员, 所以都可以删除..
    render() {
        const { item } = this.props;
        const replyNum = item.replyNum;

        const likeText = this.state.isNowUserLikeThisComment == false ? "赞" : "已赞";
        const likeTotal = this.state.likeTotal; 

        return (
            <div className="commentStyle">
            <Row>
                <Col span={4} style={{ width: 63}} >
                <Avatar src={item.createUserDetail.avatar}
                    className="avatar"
                />
                </Col>
                <Col span={20}>
                    <ShowUserDetailInfo record={item.createUserDetail} />
                    {/* <a style={{ fontSize: 13 }}>{item.createUser}</a><br /> */}
                    <div style={{ fontSize: 16, paddingTop: 8, color: '#000000' }}>{item.commentBody}</div>
                    <span style={{ fontSize: 13, marginTop: 10, paddingTop: 10, color: '#828282' }}>
                        发表于 {item.createTime}
                    </span>
                    <div className="actions">
                        <Popconfirm title="确定删除?" onConfirm={() => this.handleDeleteComment(item.commentId)} okText="确定" cancelText="取消">
                            <a style={{ fontSize: 13, color: '#2E8B57', paddingRight: 10 }}>删除</a>
                        </Popconfirm>
                        <a style={{ fontSize: 13, color: '#2E8B57', paddingRight: 10 }} onClick={this.handleChangeLikeForComment}>{likeText}({likeTotal})</a>
                        <a style={{ fontSize: 13, color: '#2E8B57' }} onClick={this.handleShowReplyBox}>回复({replyNum})</a>
                    </div>
                </Col>
            </Row>
            {
                this.state.replyNum == 0 && this.state.showReplyBox == false ? null : 
                    <ReplyList commentId={item.commentId} uid={this.props.uid} /> 
                   
            }
            <Divider style={{ backgroundColor: '#C1CDCD', marginTop: 10, marginBottom: 10 }}/>
            </div>
        );
    }

    componentWillUnmount() {
        const like = this.state.isNowUserLikeThisComment == false ? 0 : 1;
        handleChangeLike({
            type: 'comment',
            id: this.props.item.commentId,
            uid: this.props.uid,
            like: like,
        });
    }
}


const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <div>
        <TextArea value={value} rows={4} onChange={onChange} placeholder="写下你的评论..." allowClear autoSize={{ minRows: 4, maxRows: 10 }}/>
        <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary" disabled={value == null || value == ''}>
            发布
        </Button>
    </div>
);


class CommentList extends React.Component {

    state = {
        loading: true,
        submitting: false,
        commentBody: '',
    }

    // aOrs 1 是降序, 0 是升序
    // order 排序的第一个关键字
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
            nowUser: [],
        }
        emitterComment.on("refreshComment", this.refreshComment.bind(this));
    }

    componentWillMount() {
        this.getNowUserData();
        this.getCommentData();
    }

    refreshComment = (msg) => {
        console.log(msg);
        this.getCommentData();
    } 

    // 获取当前登录人的信息
    getNowUserData() {
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

    getCommentData() {
        this.setState({
            loading: true,
        })
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

    addCommentData() {
        Fetch.requestPost({
            url: AddComment,
            info: 'commentBody='+this.state.commentBody+'&replyPostId='+this.props.id,
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

    handleEditChange = (e) => {
        this.setState({
            commentBody: e.target.value,
        })
    }

    handleSubmitComment = () => {
        // console.log('xierenyi');
        this.setState({
            submitting: true,
        }, () => this.addCommentData())
    }

    handlePageChange = (page) => {
        // console.log(page);
        this.setState({
            nowPage: page 
        }, () => this.getCommentData());
    }

    handleOrderRule = (rule, sort) => {
        console.log('xierenyi');
        this.setState({
            order: rule,
            aOrs: sort,
        }, () => this.getCommentData());
    }

    render() {
        const { loading, submitting, commentBody } = this.state;
        // let replyTotal = 0;
        // for (let i = 0 ; i < this.state.allComment.length ; ++ i) {
        //     replyTotal += this.state.allComment[i].replyNum;
        // }
        // console.log('xiexie')
        // console.log(replyTotal)
        const badgeText = `全部评论 ${this.state.totalPage*this.state.pageSize}`;
        let sortRule, sortRuleFlag;
        if (this.state.order == 'like') {
            sortRule = <span><Icon type="like" />较赞在前</span>;
            sortRuleFlag = 1;
        } else if (this.state.aOrs == 0) {
            sortRule = <span><Icon type="rise" />默认排序</span>;
            sortRuleFlag = 2;
        } else {
            sortRule = <span><Icon type="fall" />较近在前</span>;
            sortRuleFlag = 3;
        }
        const sortRuleMenu = (
            <Menu>
                {
                    sortRuleFlag != 2 && <Menu.Item>
                        <a onClick={() => this.handleOrderRule("createTime", 0)}>
                            <Icon type="rise" />默认排序
                        </a>
                    </Menu.Item>
                }
                {
                    sortRuleFlag != 3 && <Menu.Item>
                        <a onClick={() => this.handleOrderRule("createTime", 1)}>
                            <Icon type="fall" />较近在前
                        </a>
                    </Menu.Item>
                }
                {
                    sortRuleFlag != 1 && <Menu.Item>
                        <a onClick={() => this.handleOrderRule("like", 1)}>
                            <Icon type="like" />较赞在前
                        </a>
                    </Menu.Item>
                }
            </Menu>
        );
        return (
            <div className="commentArea">
            <NowUser.Provider value={this.state.nowUser}>
            <Comment    
                className="addCommentText"
                avatar={
                    <Avatar
                        src={this.state.nowUser.avatar}
                        alt="Han Solo"
                    />
                }
                content={
                    <Editor
                        onChange={this.handleEditChange}
                        onSubmit={this.handleSubmitComment}
                        submitting={submitting}
                        value={commentBody}
                    />
                }
            />
            <div>
                <Badge className="allCommentNum" status="error" text={badgeText} />
                <Dropdown overlay={sortRuleMenu} style={{ width: 200 }}>
                    <a style={{ marginLeft: 0 }}>{sortRule}<Icon type="down" /></a>
                </Dropdown>
            </div>
            <div className="copyCommentStyle">
            <Skeleton loading={loading} active avatar style={{marginLeft: 40, marginRight: 40, marginBottom: 20}}>
            {
                this.state.allComment.length == 0 ? <Empty /> :
                this.state.allComment.map((item) =>
                    <NowUser.Consumer>
                    {
                        (nowUser) => <CommentView item={item} key={item.commentId} uid={nowUser.userId} />
                    }
                    </NowUser.Consumer>
                )
            }
            </Skeleton>
            </div>
            <Pagination className="tablePage" size="small" simple onChange={this.handlePageChange} total={this.state.totalPage*this.state.pageSize}
                pageSize={this.state.pageSize} defaultCurrent={this.state.nowPage} showQuickJumper />
            <br /><br /><br />
            </NowUser.Provider>
            </div>
        );
    }
}



class DetailPost extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            createUser: '',
            createTime: null,
            updateUser: '',
            updateTime: null,
            postTitle: '',
            postTag: '',
            postBody: '',
            isHead: 0,
            isGreat: 0,
            isHot: 0,
            labels: [],
        }
    }

    componentDidMount() {
        const { dispatch } = this.props;
        const titleArray = [
            {
                title: '讨论区管理',
                key: 'none',
            },
            {
                title: '管理帖子',
                key: '/admin/forum/manage',
            },
            {
                title: '查看帖子详情',
                key: 'none',
            }
        ];
        dispatch(switchMenu(titleArray));
    }

    componentWillMount() {
        console.log(this.props.match.params.id);
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
                        createUser: data.resultBean.createUser,
                        createTime: data.resultBean.createTime,
                        updateUser: data.resultBean.updateUser,
                        updateTime: data.resultBean.updateTime,
                        postTitle: data.resultBean.postTitle,
                        postTag: data.resultBean.postTag,
                        postBody: data.resultBean.postBody,
                        isHead: data.resultBean.isHead,
                        isGreat: data.resultBean.isGreat,
                        isHot: data.resultBean.isHot,
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
        const { labels } = this.state;
        let postLabels = [];
        for (let i = 0 ; i < labels.length ; ++ i) {
            if (!(this.state.postTag & (1<<labels[i].flag))) continue;
            postLabels.push(labels[i]);
        }
        return (
            <div>
                <div>
                <Card title={
                    <span>
                        {this.state.postTitle}&nbsp;&nbsp;
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
                }>
                    <strong>创建人:&nbsp;&nbsp;{this.state.createUser}</strong>
                    <br />
                    <strong>创建时间:</strong>&nbsp;&nbsp;
                    <DatePicker format="YYYY-MM-DD" value={moment(this.state.createTime)} disabled />
                    <br /><br />
                    <strong>最近一次更新人:&nbsp;&nbsp;{this.state.updateUser}</strong>
                    <br />
                    <strong>最近一次更新时间:</strong>&nbsp;&nbsp;
                    <DatePicker  style={{ width: 200 }} format="YYYY-MM-DD HH:mm:ss" value={moment(this.state.updateTime)} disabled />
                    <br /><br />
                    <strong>标签:</strong>&nbsp;&nbsp;
                    {
                        postLabels.map((item) => 
                                <Tag color={item.labelColor} key={item.labelId}>{item.labelName}</Tag>
                        )
                    }
                    <br />
                    <br />
                    <strong>内容:</strong>&nbsp;&nbsp;
                    <div dangerouslySetInnerHTML={{__html: this.state.postBody}} />
                </Card>
                </div>
                
                <CommentList id={this.props.match.params.id} />
                <BackTop />
            </div>
        );
    }
}

// 通过connect连接组件和redux数据,传递state数据和dispatch方法
export default connect()(DetailPost);