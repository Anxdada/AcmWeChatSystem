import React from 'react';
import './index.less';
import { Comment, Avatar, Form, Button, List, Input, Alert, Tooltip, Icon, message, notification, Skeleton, Empty, Spin, Modal, Popconfirm, Divider} from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { GetLoginUserPC, AddFeedback, DeleteFeedback, UpdateFeedback, SelectFeedback, AddFeedbackCount, DeleteFeedbackCount, UpdateFeedbackCount } from './../../config/dataAddress';
import cookie from 'react-cookies';
import { EventEmitter2 } from 'eventemitter2';
import Fetch from './../../fetch';



var emitter = new EventEmitter2();
moment.locale('zh-cn');
const { TextArea } = Input;

class FeedbackView extends React.Component {
    

    like = () => {
        this.setState({
            likes: 1,
            dislikes: 0,
            action: 'liked',
        });
    };
    
    dislike = () => {
        this.setState({
            likes: 0,
            dislikes: 1,
            action: 'disliked',
        });
    };

    constructor(props) {
        super(props);
        this.state = {
            feedbacks: [],
            submitting: false,
            feedbackLoading: true,
            feedbackId: '',
            feedbackBody: '',
            nowUser: [],
        };

        emitter.on("refresh", this.refresh.bind(this)); 
    }

    componentWillMount() {
        this.getFeedbackData();
        this.getNowUserData();
    }

    refresh(msg) {
        // 注册emit, 这样触发emit就会刷新界面了.
        this.getFeedbackData();
    }

    getNowUserData() {
        Fetch.requestGet({
            url: GetLoginUserPC,
            timeOut: 3000,
        }).then (
            data => {
                // console.log(data);
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

    getFeedbackData() {

        this.setState({
            feedbackLoading: true,
        });

        Fetch.requestGet({
            url: SelectFeedback,
            timeOut: 4000,
        }).then ( 
            data => {
                if (data.status == 0) {
                    this.setState({
                        feedbacks: data.resultBean
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

        this.setState({
            feedbackLoading: false,
        });
    }

    addFeedbackData() {

        Fetch.requestPost({
            url: AddFeedback,
            info: 'feedbackBody='+this.state.feedbackBody,
            timeOut: 3000,
        }).then ( 
            data => {
                if (data.status == 0) {
                    this.setState({
                        feedbackBody: '',
                    });
                    emitter.emit('refresh', '添加'); // 通知react需要刷新该页面
                    message.success("添加成功");
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
        });
    }

    deleteFeedbackData() {

        Fetch.requestPost({
            url: DeleteFeedback,
            info: 'feedbackId='+this.state.feedbackId,
            timeOut: 3000,
        }).then ( 
            data => {
                if (data.status == 0) {
                    emitter.emit('refresh', '删除');
                    message.success("删除成功");
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

    handleSubmitFeedback = () => {
        if (!this.state.feedbackBody) {
            return;
        }

        this.setState({
            submitting: true,
        }, () => this.addFeedbackData());

    };
    
    handleEditChange = (e) => {
        this.setState({
            feedbackBody: e.target.value,
        });
    };

    handleDeleteFeedback = (feedbackId) => {
        console.log(feedbackId);
        this.setState({
            feedbackId: feedbackId,
        }, () => this.deleteFeedbackData());
    }
    
    render() {
        const { nowUser, feedbacks, submitting, feedbackLoading, feedbackBody } = this.state;
        return (
            <div>
            <div>
                <Alert
                    message="给出你对本后台系统最真实的反馈"
                    description="可以是对本后台系统的功能建议有或者是Bug反馈等(禁止灌水!)"
                    type="info"
                />
            </div>
            <div className="commentArea">
                <div className="commentStyle">
                <Comment
                    avatar={
                        <Avatar
                            src={this.state.nowUser.avatar}
                            alt="Han Solo"
                        />
                    }
                    content={
                        <Editor
                            onChange={this.handleEditChange}
                            onSubmit={this.handleSubmitFeedback}
                            submitting={submitting}
                            value={feedbackBody}
                        />
                    }
                />
                {   
                    feedbacks.length > 0 ? 
                    <FeedbackList nowUser={nowUser} feedbacks={feedbacks} feedbackLoading={feedbackLoading} handleDeleteFeedback={this.handleDeleteFeedback}/> 
                    : <Empty /> 
                }
                </div>
            </div>
            </div>
        );
    }
}

const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <div>
        <Form.Item>
            <TextArea rows={4} onChange={onChange} value={value} allowClear style={{ marginBottom: 0 }} />
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary" disabled={value == null || value == ''}
                style={{ marginTop: 0 }}
            >
                发布
            </Button>
        </Form.Item>
    </div>
);

class FeedbackList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            type: '',
            feedbackId: '',
            feedbackBody: '',
        }
    }

    addFeedbackCountData() {

        Fetch.requestPost({
            url: AddFeedbackCount,
            info: 'feedbackId='+this.state.feedbackId+'&type='+this.state.type,
            timeOut: 3000,
        }).then ( 
            data => {
                if (data.status == 0) {
                    emitter.emit('refresh', '添加操作');
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

    deleteFeedbackCountData() {
        Fetch.requestPost({
            url: DeleteFeedbackCount,
            info: 'feedbackId='+this.state.feedbackId,
            timeOut: 3000,
        }).then ( 
            data => {
                if (data.status == 0) {
                    emitter.emit('refresh', '删除操作');
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

    updateFeedbackCountData() {

        Fetch.requestPost({
            url: UpdateFeedbackCount,
            info: 'feedbackId='+this.state.feedbackId+'&type='+this.state.type,
            timeOut: 3000,
        }).then ( 
            data => {
                if (data.status == 0) {
                    emitter.emit('refresh', '更新操作');
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

    handleClickLike = (item) => {
        console.log(item.type);
        if (item.type == -1) {
            this.setState({
                feedbackId: item.feedbackId,
                type: 1,
            }, () => this.updateFeedbackCountData());
        } else if (item.type == 0) {
            this.setState({
                feedbackId: item.feedbackId,
                type: 1,
            }, () => this.addFeedbackCountData());
        } else {
            this.setState({
                feedbackId: item.feedbackId,
            }, () => this.deleteFeedbackCountData());
        }
    }

    handleClickDislike = (item) => {
        // console.log(item.type);
        if (item.type == -1) {
            this.setState({
                feedbackId: item.feedbackId,
            }, () => this.deleteFeedbackCountData());
        } else if (item.type == 0) {
            this.setState({
                feedbackId: item.feedbackId,
                type: -1,
            }, () => this.addFeedbackCountData());
        } else {
            this.setState({
                feedbackId: item.feedbackId,
                type: -1,
            }, () => this.updateFeedbackCountData());
        }
    }


    render() {
        const listData = this.props.feedbacks;
        return (
            <div className="demo-loadmore-list">
                <List
                    className="comment-list"
                    itemLayout="horizontal"
                    header={`${listData.length} ${listData.length > 1 ? 'replies' : 'reply'}`}
                    size="large"
                    pagination={{
                        onChange: page => {
                            console.log(page);
                        },
                        pageSize: 5,
                    }}
                    dataSource={listData}
                    renderItem={item => (
                        <li key="item.feedbackId">
                            <Spin spinning={this.props.feedbackLoading} size="large">
                            <Comment
                                actions={
                                    [
                                        <span key="comment-basic-like">
                                            <Tooltip title="喜欢">
                                            <Icon
                                                type="like"
                                                theme={item.type == 1 ? 'filled' : 'outlined'}
                                                onClick={() => this.handleClickLike(item)}
                                            />
                                            </Tooltip>
                                            <span style={{ paddingLeft: 8, cursor: 'auto' }}>{item.like}</span>
                                        </span>,
                                        <span key=' key="comment-basic-dislike"'>
                                            <Tooltip title="不喜欢">
                                            <Icon
                                                type="dislike"
                                                theme={item.type == -1 ? 'filled' : 'outlined'}
                                                onClick={() => this.handleClickDislike(item)}
                                            />
                                            </Tooltip>
                                            <span style={{ paddingLeft: 8, cursor: 'auto' }}>{item.dislike}</span>
                                        </span>,
                                        <span>
                                            {
                                                this.props.nowUser.userId == item.feedbackUser ? <FeedbackModify item={item}/> : null
                                            } 
                                        </span>,
                                        <span>
                                            {
                                                (this.props.nowUser.auth & 1) || (this.props.nowUser.userId == item.feedbackUser) ? 
                                                <Popconfirm title="确定删除?" onConfirm={() => this.props.handleDeleteFeedback(item.feedbackId)} okText="确定" cancelText="取消">
                                                    <a className="deleteHerf">删除</a>
                                                </Popconfirm> : null
                                            }
                                            {/* 记住身份号是二进制的! */}
                                        </span>
                                    ]
                                }
                                author={item.feedbackUserRealName}
                                avatar={item.feedbackAvatar}
                                content={item.feedbackBody}
                                datetime={
                                    <Tooltip title={moment(item.feedbackTime).format('YYYY-MM-DD HH:mm:ss')}>
                                        <span>{moment(item.feedbackTime).fromNow()}</span>
                                    </Tooltip>
                                }
                            />
                            </Spin>
                        </li>
                    )}
                />
                
            </div>
        );
    }
}


class FeedbackModify extends React.Component {

    state = {
        visible: false,
        modifyLoading: false,
    }

    constructor(props) {
        super(props);

        // console.log(this.props.item.feedbackBody);
        this.state = {
            feedbackId: this.props.item.feedbackId,
            feedbackBody: this.props.item.feedbackBody,
        }
    }

    updateFeedbackData() {

        if (this.state.feedbackBody == "") {
            message.error("反馈内容不能为空!");
            return ;
        }

        this.setState({
            modifyLoading: true,
        })

        Fetch.requestPost({
            url: UpdateFeedback,
            info: 'feedbackId='+this.state.feedbackId+'&feedbackBody='+this.state.feedbackBody,
            timeOut: 3000,
        }).then ( 
            data => {
                if (data.status == 0) {
                    emitter.emit('refresh', '修改反馈');
                    this.setState({
                        visible: false,
                    })
                    message.success("修改成功");
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

        this.setState({
            modifyLoading: false,
        })
    }

    handleShowModal = () => {
        this.setState({
            visible: true,
        })
    }

    handleOkModal = (e) => {
        this.updateFeedbackData();
    }

    handleCancelModal = (e) => {
        this.setState({
            visible: false,
        });
    }

    handleModalTextArea = (e) => {
        this.setState({
            feedbackBody: e.target.value,
        })
    }

    render() {
        return (
        <span>
            <a onClick={this.handleShowModal}> 修改 </a>
            <Modal
                    title="修改反馈内容"
                    visible={this.state.visible}
                    onOk={this.handleOkModal}
                    onCancel={this.handleCancelModal}
                    okText="确认修改"
                    cancelText="取消"
                    okButtonProps={{
                        loading: this.state.modifyLoading,
                    }}
                    cancelButtonProps={{
                        disabled: this.state.modifyLoading,
                    }}
                >
                    <TextArea rows={4} value={this.state.feedbackBody} onChange={this.handleModalTextArea} />
                </Modal>
        </span>
        )
    }
}

export default class Feedback extends React.Component {
    render() {
        return (
            <div>
                <FeedbackView />
            </div>
        );
    }
}
