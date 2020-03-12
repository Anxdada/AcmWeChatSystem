import React from 'react';
import { Table, Pagination, Popconfirm, Card, message, notification, Skeleton } from 'antd';
import {EventEmitter2} from 'eventemitter2';
import { connect } from 'react-redux';
import { switchMenu } from './../../redux/actions';
import Fetch from './../../fetch';
import { SelectComment, DeleteComment, DeleteReply, SelectReply, DetailPostUrl } from '../../config/dataAddress';

var emitter = new EventEmitter2()
var emitter2 = new EventEmitter2()

class ReplyView extends React.Component {

    state = {
        loading: true,
    }

    constructor(props) {
        super(props);
        this.state = {
            allReply: [],
        }
        this.columns= [
            { 
                title: '回复人', 
                dataIndex: 'createUser', 
                key: 'createUser',
                align: 'center',
            },
            {   
                title: '对话人', 
                dataIndex: 'replyRealName', 
                key: 'replyRealName',
                align: 'center',
                render:(text, record) => (
                    record.reverseReplyId == -1 ? <span>层主</span> :
                    <span style={{ wordWrap: 'break-word', wordBreak: 'break-all' }}>
                        {record.replyRealName}
                    </span>
                )
            },
            {   
                title: '回复信息', 
                dataIndex: 'replyBody', 
                key: 'replyBody',
                align: 'center',
                width:400,
                render:(text, record) => (
                    <span style={{ wordWrap: 'break-word', wordBreak: 'break-all' }}>
                        {record.replyBody}
                    </span>
                )
            },
            {   
                title: '回复时间', 
                dataIndex: 'createTime', 
                key: 'createTime',
                align: 'center',
            },
            {
                title: '操作',
                key: 'action',
                align: 'center',
                render: (text, record) => (
                    <span>
                        <Popconfirm title="确定删除?" onConfirm={() => this.handleDeleteReply(record.replyId)} okText="确定" cancelText="取消">
                            <a  className="deleteHerf">删除</a>
                        </Popconfirm>
                    </span>
                ),
            },
        ];

        emitter2.on("refresh2", this.refresh2.bind(this));
    }

    componentWillMount() {
        this.getReplyData();
    }

    handleDeleteReply = (id) => {
        Fetch.requestPost({
            url: DeleteReply,
            info: 'replyId='+id,
            timeOut: 3000,
        }).then ( 
            data => {
                if (data.status == 0) {
                    message.success('删除成功!');
                    emitter2.emit("refresh2", "删除评论");
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

    refresh2 = (msg) => {
        this.getReplyData();
    }

    getReplyData() {
        this.setState({
            loading: true,
        })
        // 因为使用的table自带的分页器, 所以只能全部取出喽.. 这种预期也不会很多
        // 回复的顺序按 时间升序
        Fetch.requestPost({
            url: SelectReply,
            info: 'replyCommentId='+this.props.commentId+'&pageSize=1000'+'&aOrs=0',
            timeOut: 3000,
        }).then ( 
            data => {
                console.log(data);
                if (data.status == 0) {
                    this.setState({
                        allReply: data.resultBean.items,
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

    // this.state.allReply.length == 0 ? <p>不存在子评论</p> :
    render() {
        return (
            <div>
                <Skeleton active loading={this.state.loading}>
                <Table
                    columns={this.columns}
                    dataSource={this.state.allReply}
                    pagination={true}
                    rowKey={record => record.replyId}
                />
                </Skeleton>
            </div>
        );
    }
}

class ManageCommentTable extends React.Component {

    state = {
        loading: true,
    }

    constructor(props) {
        super(props);
        this.state = {
            nowPage: 1,
            totalPage: 1,
            pageSize: 10,
            postTitle: '',
            allComment: [],
        }
        this.columns= [
            { 
                title: '评论人', 
                dataIndex: 'createUser', 
                key: 'createUser',
                align: 'center'
            },
            {   
                title: '评论信息', 
                dataIndex: 'commentBody', 
                key: 'commentBody',
                align: 'center',
                width:300,
                render:(text, record) => (
                    <span style={{ wordWrap: 'break-word', wordBreak: 'break-all' }}>
                    {record.commentBody}
                    </span>
                )
            },
            { 
                title: '评论时间', 
                dataIndex: 'createTime', 
                key: 'createTime',
                align: 'center',
                sorter: (a, b) => a.createTime < b.createTime
            },
            {
                title: '操作',
                key: 'action',
                align: 'center',
                render: (text, record) => (
                    <span>
                        <Popconfirm title="确定删除?" onConfirm={() => this.handleDeleteComment(record.commentId)}>
                        <a className="deleteHerf">删除</a>
                        </Popconfirm>
                    </span>
                ),
            },
        ];
        emitter.on("refresh", this.refresh.bind(this));
    }

    handleDeleteComment = (id) => {
        Fetch.requestPost({
            url: DeleteComment,
            info: 'commentId='+id,
            timeOut: 3000,
        }).then ( 
            data => {
                if (data.status == 0) {
                    message.success('删除成功!');
                    emitter.emit("refresh", "删除评论");
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

    componentWillMount(){
        this.getPostData();
        this.getCommentData();
    }

    refresh = (msg) => {
        this.getCommentData();
    }

    getPostData() {
        Fetch.requestPost({
            url: DetailPostUrl,
            info: 'postId='+this.props.id,
            timeOut: 3000,
        }).then ( 
            data => {
                if (data.status == 0) {
                    this.setState({
                        postTitle: data.resultBean.postTitle,
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
            info: 'replyPostId='+this.props.id+'&pageNum='+this.state.nowPage,
            timeOut: 3000,
        }).then ( 
            data => {
                // console.log(data);
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

    expandedRowRender = (record) => {
        return (
            <ReplyView commentId={record.commentId} />
        );
    };

    handlePageChange = (page) => {
        this.setState({ 
            nowPage: page 
        }, () => this.getCommentData());
    }

    render() {
        return (
            <div style={{ flex: 1, padding: "10px" }}>
            <Card title="评论">
                帖子主题:&nbsp;&nbsp;<strong>{this.state.postTitle}</strong>
                <br /><br />
                <Skeleton active loading={this.state.loading}>
                <Table
                    className="components-table-demo-nested"
                    columns={this.columns}
                    expandedRowRender={record => this.expandedRowRender(record)}
                    dataSource={this.state.allComment}
                    pagination={false}
                    rowKey={record => record.commentId}
                />
                </Skeleton>
                <div className="tablePage">
                    <Pagination size="small" simple onChange={this.handlePageChange} total={this.state.totalPage*this.state.pageSize}
                        pageSize={this.state.pageSize} defaultCurrent={this.state.nowPage} showQuickJumper />
                </div>
            </Card>
            </div>
        );
    }
    
}

class ManageComment extends React.Component {

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
                title: '查看评论',
                key: 'none',
            }
        ];
        dispatch(switchMenu(titleArray));
    }

    render() {
        return (
            <div>
                <ManageCommentTable id={this.props.match.params.id}/>
            </div>
        );
    }
} 

export default connect()(ManageComment);