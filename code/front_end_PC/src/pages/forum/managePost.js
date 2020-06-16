import React from 'react';
import './index.less';
import { Card, Tag, Divider, Table, Button, Popconfirm, Pagination, Input, DatePicker, Select, message, notification, Skeleton } from 'antd';
import { Link } from 'react-router-dom';
import {EventEmitter2} from 'eventemitter2';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { connect } from 'react-redux';
import { switchMenu,addMenu } from './../../redux/actions';
import Fetch from './../../fetch';
import { SelectLabel, DeletePost, SelectPost, UpdatePost } from '../../config/dataAddress';


moment.locale('zh-cn');
var emitter = new EventEmitter2()
const { Search } = Input;
const { Option } = Select;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

const children = [];
for (let i = 10; i < 36; i++) {
    children.push(<Option value={i.toString(36) + i} key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

const orderRules = [
    {
        name: "创建时间降序",
        key: 'createTime'
    },
    {
        name: "置顶贴优先",
        key: 'isHead'
    },
    {
        name: "精贴优先",
        key: 'isGreat'
    },
    {
        name: "热贴优先",
        key: 'isHot'
    },
];


class PostTable extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            isGreat: false,
            isHot: false,
            isHead: false,
        }
        this.columns = [
            {
                title: '帖子标题',
                dataIndex: 'postTitle',
                key: 'postTitle',
                align: 'center',
                render: (text, record) => (
                    <span>
                        <Link to={'/admin/forum/detail/'+record.postId}>{text}</Link>
                    </span>
                ),
            }, 
            {
                title: '标签',
                dataIndex: 'label',
                key: 'label',
                align: 'center',
                render: (text, record) => {
                    const { allLabel } = this.props;
                    let postLabels = [];
                    // console.log(allLabel);
                    for (let i = 0 ; i < allLabel.length ; ++ i) {
                        // console.log(allLabel[i].flag)
                        if (!(record.postTag & (1<<allLabel[i].flag))) continue;
                        postLabels.push(allLabel[i]);
                    }
                    return (
                        postLabels.map((item) => {
                            return (
                                <Tag color={item.labelColor} key={item.labelId}>{item.labelName}</Tag>
                            );
                        })
                    )
                },
            },
            {
                title: '创建人',
                dataIndex: 'createRealName',
                key: 'createRealName',
                align: 'center',
            }, 
            {
                title: '创建时间',
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
                        <Link to={'/admin/forum/comment/'+record.postId}>查看评论</Link>
                        <Divider type="vertical" />
                        {
                            record.isSame == false ? null :
                                <span>
                                    <Link to={'/admin/forum/modifyPost/'+record.postId}>修改</Link>
                                    <Divider type="vertical" />
                                </span>
                        }
                        <Popconfirm title="确定删除?" onConfirm={() => this.handleDelete(record.postId)} okText="确定" cancelText="取消">
                            <a className="deleteHerf">删除</a>
                        </Popconfirm>
                    </span>
                ),
            },
            // {
            //     title: '精热操作',
            //     key: 'stopaction',
            //     align: 'center',
            //     render: (text, record) => (
            //         <span>
            //         {
            //             record.isHead == 0?<a><Tag color="#108ee9" onClick={()=>this.updatePostData("isHead", record)}>置顶</Tag></a>:
            //                 <a ><Tag color="#FF0000" onClick={()=>this.updatePostData("isHead", record)}>取消置顶</Tag></a>
            //             // 暂时用state的, 实际直接用record的, 都是通过id操作的.
            //         }
            //         {
            //             record.isGreat == 0?<a><Tag color="#108ee9" onClick={()=>this.updatePostData("isGreat", record)}>加精</Tag></a>:
            //                 <a ><Tag color="#FF0000" onClick={()=>this.updatePostData("isGreat", record)}>取消加精</Tag></a>
            //         }
            //         {
            //             record.isHot == 0?<a><Tag color="#108ee9" onClick={()=>this.updatePostData("isHot", record)}>加热</Tag></a>:
            //                 <a ><Tag color="#FF0000" onClick={()=>this.updatePostData("isHot", record)}>取消加热</Tag></a>
            //         }
            //         </span>
            //     ),
            // }
        ];
    }

    updatePostData = (type, record) => {
        record[type] = 1 - record[type];
        Fetch.requestPost({
            url: UpdatePost,
            info: 'postId='+record.postId+'&isHead='+record.isHead 
                    +'&isGreat='+record.isGreat+'&isHot='+record.isHot,
            timeOut: 3000,
        }).then( 
            data => {
                if (data.status == 0) {
                    emitter.emit("refresh", "修改");
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

    handleDelete = (postId) => {
        Fetch.requestPost({
            url: DeletePost,
            info: 'postId='+postId,
            timeOut: 3000,
        }).then(
            data => {
                if (data.status == 0) {
                    emitter.emit("refresh", "删除");
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

    render() {
        return (
            <div>
                <Skeleton active loading={this.props.loading}>
                <Table columns={this.columns} dataSource={this.props.allPost} pagination={false} rowKey={record => record.postId} />
                </Skeleton>
            </div>
        );
    }
}


class PostView extends React.Component {

    state = {
        loading: true,
    }

    constructor(props) {
        super(props);
        this.state={
            nowPage: 1,
            totalPage: 1,
            pageSize: 10,
            allPost: [],
            searchPostTitle: '',
            searchLabel: [],
            allLabel: [],
            searchStartTime: null,
            searchEndTime: null,
            order: 'createTime',
        }
        emitter.on("refresh", this.refresh.bind(this));
    }

    componentWillMount() {
        this.getPostData();
        this.getLabelData();
    }

    refresh = () => {
        this.setState({
            searchPostTitle: '',
            searchLabel: [],
            searchStartTime: null,
            searchEndTime: null,
        }, () => this.getPostData());
    }

    getLabelData() {
        // 用于取出目前所有的标签, 用于搜索
        Fetch.requestPost({
            url: SelectLabel,
            info: 'pageSize=100',
            timeOut: 3000,
        }).then ( 
            data => {
                if (data.status == 0) {
                    this.setState({
                        allLabel: data.resultBean.items,
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
        let startTime = '';
        if (this.state.searchStartTime != null) {
            startTime = this.state.searchStartTime.format('YYYY-MM-DD');
        }

        let endTime = '';
        if (this.state.searchEndTime != null) {
            endTime = this.state.searchEndTime.format('YYYY-MM-DD');
        }

        let searchTag = '-1';
        if (this.state.searchLabel.length != 0) {
            let labels = this.state.searchLabel;
            searchTag = 0;
            for (let i = 0 ; i < labels.length ; ++ i) {
                searchTag |= 1 << labels[i];
            }
        }

        this.setState({
            loading: true,
        })

        Fetch.requestPost({
            url: SelectPost,
            info: 'postTitle='+this.state.searchPostTitle+'&postTag='+searchTag
                    +'&postStartTime='+startTime+'&postEndTime='+endTime+'&order='+this.state.order
                    +'&pageNum='+this.state.nowPage+'&pageSize='+this.state.pageSize,
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
                        allPost: data.resultBean.items
                    });
                } else {
                    this.setState({
                        nowPage: 1,
                        totalPage: 1,
                        allPost: []
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

    handleSearchTitle = (e) => {
        this.setState({
            searchPostTitle: e.target.value
        });
        // 不再是改变就搜索, 而是三个搜索条件一起后, 再点击button搜索
    }

    handleSearchTag = (value) => {
        // console.log(value);
        this.setState({
            searchLabel: value, 
        });
    }

    handleSearchRangeTime = (dates) => {
        // console.log(dates);
        if (dates.length < 1) {
            this.setState({
                searchStartTime: null,
                searchEndTime: null,
            });
            return ;
        }
        this.setState({
            searchStartTime: dates[0],
            searchEndTime: dates[1],
        })
    }

    handleSearchBtn = () => {
        this.getPostData();
    }

    handleOrderRule = (value) => {
        // console.log(value);
        this.setState({
            order: value,
        }, () => this.getPostData());
    }

    handlePageChange = (page) => {
        // console.log(page);
        this.setState({
            nowPage: page 
        }, () => this.getPostData());
    }

    render() {

        let rangeTime;
        if (this.state.searchStartTime != null)
            rangeTime = [moment(this.state.searchStartTime), moment(this.state.searchEndTime)];
        else rangeTime = [null, null];

        return(
            <div style={{ flex: 1, padding: "10px" }}>
                <Card title="所有帖子" >
                    <Input value={this.state.searchPostTitle} placeholder="帖子标题" allowClear
                        onChange={this.handleSearchTitle} style={{ height: 30, width: 150}} className="searchF"/>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <RangePicker value={rangeTime} onChange={this.handleSearchRangeTime} placeholder={["开始时间", "结束时间"]} />
                    <br />
                    <Select
                        mode="multiple"
                        placeholder="帖子的标签"
                        onChange={this.handleSearchTag}
                        style={{ height: 30, width: 500 }}
                        allowClear
                        className="searcgTag"
                    >
                    {
                        this.state.allLabel.map((item) => 
                            <Option key={item.labelId} value={item.flag}>
                                <Tag color={item.labelColor} key={item.labelId} > {item.labelName} </Tag>
                            </Option>
                        )
                    }
                    </Select>
                    &nbsp;&nbsp;
                    <Button type="primary" onClick={this.handleSearchBtn}>搜索</Button>
                    <Select value={this.state.order} style={{ width: 150 }} 
                        onChange={this.handleOrderRule} className="sortRule" >
                        {
                            orderRules.map((item) =>
                                <Option key={item.key} value={item.key}>
                                    {item.name}
                                </Option>
                            )
                        }
                    </Select>
                    <PostTable allPost={this.state.allPost} allLabel={this.state.allLabel} loading={this.state.loading} />
                    <div className="tablePage">
                        <Pagination size="small" simple onChange={this.handlePageChange} total={this.state.totalPage*this.state.pageSize}
                            pageSize={this.state.pageSize} defaultCurrent={this.state.nowPage} showQuickJumper />
                    </div>
                </Card>
            </div>
        );
    }
}

class ManagePost extends React.Component {

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
        ];
        dispatch(switchMenu(titleArray));
    }

    render() {
        return (
            <div>
                <PostView />
            </div>
        );
    }
}

export default connect()(ManagePost);