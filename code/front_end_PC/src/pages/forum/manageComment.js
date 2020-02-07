import React from 'react';
import { Table, message, Pagination, Popconfirm, Card } from 'antd';
import {EventEmitter2} from 'eventemitter2';
import cookie from 'react-cookies';
import { connect } from 'react-redux';
import { switchMenu } from './../../redux/actions';


var emitter = new EventEmitter2()

class SubComment extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            all: [],
            nowPage: 1,
            totalPage: 1,
            pageSize: 1,
            data: [],
        }
        this.columns= [
            { 
                title: '回复人', 
                dataIndex: 'userName', 
                key: 'userName' 
            },
            {   
                title: '回复信息', 
                dataIndex: 'commentBody', 
                key: 'commentBody', 
                width:400,
                render:(text, record) => (
                    <span style={{ wordWrap: 'break-word', wordBreak: 'break-all' }}>
                    {record.commentBody}
                    </span>
                )
            },
            {   
                title: '回复时间', 
                dataIndex: 'createTime', 
                key: 'createTime' 
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <span>
                        <Popconfirm title="确定删除?" onConfirm={() => this.handleDeleteComment(record.commentId)} okText="确定" cancelText="取消">
                            <a  className="deleteHerf">删除</a>
                        </Popconfirm>
                    </span>
                ),
            },
        ];

        for (let i = 0; i < 103; ++i) {
            this.state.data.push({
                key: i,
                userName: '谢仁义',
                commentBody: 'iOS',
                createTime: '2014-12-24 23:12:00',
            });
        }
    }

    handleDeleteComment = (commentId) => {
        // fetch(DeleteComment,{   //Fetch方法
        //     method: 'POST',
        //     headers: {
        //     'Authorization': cookie.load('token'),
        //     'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
        //     },
        //     body: 'commentId='+commentId
        // }).then(res => res.json()).then(
        //     data => {
        //         if (data.code==0) {
        //             message.success(data.msg);
        //             emitter.emit('changeComment', 'this');
        //         }
        //         else {
        //             message.error(data.msg)
        //         }
        //     }
        // )
    }
    
    render() {
        return (
        <div>
            {
              this.state.data.length==0? <p>不存在子评论</p>:
              <div>
                <Table
                    columns={this.columns}
                    dataSource={this.state.data}
                    pagination={true}
                />
              </div>
            }
        </div>
        );
    }
}

class ManageCommentTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            postTitle: '',
            all:[],
            nowPage: 1,
            totalPage: 1,
            pageSize: 10,
            data:[],
        }
        this.columns= [
            { 
                title: '评论人', 
                dataIndex: 'userName', 
                key: 'userName' 
            },
            {   
                title: '评论信息', 
                dataIndex: 'commentBody', 
                key: 'commentBody', 
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
                sorter: (a, b) => a.createTime < b.createTime
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <span>
                        <Popconfirm title="确定删除?" onConfirm={() => this.handleDeleteComment(record.commentId)}>
                        <a className="deleteHerf">删除</a>
                        </Popconfirm>
                    </span>
                ),
            },
        ];
        // emitter.on('changeComment', this.getComment.bind(this));
        for (let i = 0; i < 3; ++i) {
            this.state.data.push({
                key: i,
                userName: '谢仁义',
                commentBody: 'iOS',
                createTime: '2014-12-24 23:12:00',
            });
        }
    }

    handleDeleteComment = (commentId) => {
        // fetch(DeleteComment,{   //Fetch方法
        //     method: 'POST',
        //     headers: {
        //         'Authorization': cookie.load('token'),
        //         'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
        //     },
        //     body: 'commentId='+commentId
        //  }).then(res => res.json()).then(
        //     data => {
        //         //window.alert('code'+data.code);
        //         if (data.code==0) {
        //             message.info(data.msg)
        //             this.getCommentData();
        //         }
        //         else {
        //             message.error(data.msg)
        //         }
        //     }
        // )
    }

    componentDidMount(){
        this.getCommentData();
    }

    getCommentData = () => {
        this.setState({
            postTitle: 'HDU 2018',
        })
        // fetch(SelectBackComment,{   //Fetch方法
        //     method: 'POST',
        //     headers: {
        //     'Authorization': cookie.load('token'),
        //     'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
        //     },
        //     body: 'invitationId='+this.props.match.params.id+'&pageNum='+this.state.nowPage+'&pageSize='+this.state.pageSize
        // }).then(res => res.json()).then(
        //     data => {
        //     //window.alert('code'+data.code);
        //         if(data.code==0) {
        //             console.log(data.resultBean.items)
        //             this.setState({all:data.resultBean.items});
        //             this.setState({nowPage: data.resultBean.currentPage});
        //             this.setState({totalPage: data.resultBean.totalItems/data.resultBean.pageSize});
        //         }
        //         else {
        //         message.error(data.msg);
        //         }
        //     }
        // )
    }

    expandedRowRender = (record) => {
        console.log(record);
        return (
            // <SubComment p_commentId={record.commentId} invitationId={this.props.match.params.id} all={record.subComment}/>
            <SubComment p_commentId={record.commentId} all={record.subComment}/>
        );
    };

    handlePageChange = (page) => {
        console.log(page);
        this.setState({ nowPage: page }, () => this.getComment());
        document.documentElement.scrollTop =0;
    }

    render() {
        return (
            <div style={{ flex: 1, padding: "10px" }}>
            <Card title="评论">
                <strong>帖子主题:&nbsp;&nbsp;{this.state.postTitle}</strong>
                <br /><br />
                <Table
                    className="components-table-demo-nested"
                    columns={this.columns}
                    expandedRowRender={record => this.expandedRowRender(record)}
                    dataSource={this.state.data}
                    pagination={false}
                />
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
                <ManageCommentTable />
            </div>
        );
    }
} 

export default connect()(ManageComment);