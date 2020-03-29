import React from 'react';
import './index.less';
import { Card, Tag, Divider, Table, Button, Popconfirm, Pagination, Input, Select, notification, DatePicker, message } from 'antd';
import { Link } from 'react-router-dom';
import {EventEmitter2} from 'eventemitter2';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { connect } from 'react-redux';
import { switchMenu, addMenu } from './../../redux/actions';
import { DeleteNews, SelectNews, SelectNewsTag } from './../../config/dataAddress';
import cookie from 'react-cookies';
import Fetch from './../../fetch';

moment.locale('zh-cn');

var emitter = new EventEmitter2()
const { Search } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;

class NewsTable extends React.Component {

    constructor(props) {
        super(props);
        this.columns = [
            {
                title: '新闻标题',
                dataIndex: 'newsTitle',
                key: 'newsTitle',
                align: 'center',
                width: 300,
                render: (text, record) => (
                    <span>
                        <Link to={'/admin/news/detail/'+record.newsId}>{text}</Link>
                    </span>
                ),
            }, 
            {
                title: '类别',
                dataIndex: 'newsTagName',
                key: 'newsTagName',
                align: 'center',
                render: (text, record) => (
                    <span>
                        <Tag color={record.newsTagColor} >{text}</Tag>
                    </span>
                ),
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
                title: '更新人',
                dataIndex: 'updateRealName',
                key: 'updateRealName',
                align: 'center',
            }, 
            {
                title: '最近一次更新时间',
                dataIndex: 'updateTime',
                key: 'updateTime',
                align: 'center',
                sorter: (a, b) => a.updateTime < b.updateTime
            },
            {
                title: '操作',
                key: 'action',
                align: 'center',
                render: (text, record) => (
                    <span>
                        <Link to={'/admin/news/modifyNews/'+record.newsId}>修改</Link>
                        <Divider type="vertical" />
                        <Popconfirm title="确定删除?" onConfirm={() => this.handleDelete(record.newsId)} okText="确定" cancelText="取消">
                            <a className="deleteHerf">删除</a>
                        </Popconfirm>
                    </span>
                ),
            },
            {
                title: '状态',
                key: 'stopaction',
                align: 'center',
                render: (text, record) => (
                    <span>
                    {
                        record.isPublish == 0 ? (
                             <Tag color="gray">未发布[草稿]</Tag>
                        ) : ( <Tag color="blue">已发布</Tag> )
                    }
                    </span>
                ),
            }
        ];

        // 测试数据
        this.data = [
            {
                key: '1',
                NewsTitle: '我校首获ICPC金牌!',
                NewsTag: '获奖',
                userName: '超级管理员',
                createTime: moment().format('YYYY-MM-DD'),
            },
            {
                key: '2',
                NewsTitle: '招新啦~',
                NewsTag: '实验室',
                userName: '超级管理员',
                createTime: moment().format('YYYY-MM-DD'),
            },
        ]
    }

    handleDelete = (newsId) => {
        console.log(newsId);
        Fetch.requestPost({
            url: DeleteNews,
            info: 'newsId='+newsId,
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
                <Table columns={this.columns} dataSource={this.props.allNewsData} 
                    pagination={false} rowKey={record => record.newsId} />
            </div>
        );
    }
}


class NewsView extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            nowPage: 1,
            totalPage: 1,
            pageSize: 5,
            allNewsData: [],
            allTag: [],
            searchNewsTitle: '',
            searchTag: undefined,
            searchStartTime: null,
            searchEndTime: null,
        }
        emitter.on("refresh", this.refresh.bind(this));
    }

    componentWillMount() {
        this.getNewsData();
        this.getTagData();
    }

    refresh = () => {
        this.getNewsData();
    }

    getTagData() {

        Fetch.requestPost({
            url: SelectNewsTag,
            info: 'pageSize=100',
            timeOut: 3000,
        }).then ( 
            data => {
                // console.log(data);
                if (data.status == 0) {
                    this.setState({
                        allTag: data.resultBean.items
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

    getNewsData() {

        let startTime = '';
        if (this.state.searchStartTime != null) {
            startTime = moment(this.state.searchStartTime).format('YYYY-MM-DD');
        }

        let endTime = '';
        if (this.state.searchEndTime != null) {
            endTime = moment(this.state.searchEndTime).format('YYYY-MM-DD');
        }

        // console.log(this.state.searchTag);

        let searchTag = '';
        if (this.state.searchTag != undefined) {
            searchTag = this.state.searchTag;
        }

        Fetch.requestPost({
            url: SelectNews,
            info: 'newsTitle='+this.state.searchNewsTitle+'&searchTagId='+searchTag
                    +'&searchStartTime='+startTime+'&searchEndTime='+endTime
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
                        allNewsData: data.resultBean.items
                    });
                } else {
                    this.setState({
                        nowPage: 1,
                        totalPage: 1,
                        allNewsData: []
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

    handleSearchTitle = (e) => {
        this.setState({
            searchNewsTitle: e.target.value
        });
        // 不再是改变就搜索, 而是三个搜索条件一起后, 再点击button搜索
    }

    handleSearchTag = (value) => {
        // console.log(value);
        if (typeof value === "undefined") {
            this.setState({
                searchTag: undefined,
            })
            return ;
        }
        this.setState({
            searchTag: value, 
        });
    }

    handleSearchRangeTime = (dates) => {
        console.log(dates);
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
        this.getNewsData();
    }

    handlePageChange = (page) => {
        this.setState({
            nowPage: page 
        }, () => this.getNewsData());
    }

    render() {
        let rangeTime;
        if (this.state.searchStartTime != null)
            rangeTime = [moment(this.state.searchStartTime), moment(this.state.searchEndTime)];
        else rangeTime = [null, null];

        return(
            <div style={{ flex: 1 }}>
                <Card title="新闻管理" >
                    <Input value={this.state.searchNewsTitle} placeholder="新闻标题" allowClear
                        onChange={this.handleSearchTitle} style={{ height: 30, width: 150}} className="searchF"/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Select value={this.state.searchTag} placeholder="类别" style={{ width: 150 }} 
                        onChange={this.handleSearchTag} allowClear >
                        {
                            this.state.allTag.map((item) =>
                                <Option key={item.newsTagId} value={item.newsTagId}>
                                    <Tag color={item.newsTagColor} key={item.newsTagId} > {item.newsTagName} </Tag>
                                </Option>
                            )
                        }
                    </Select>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <RangePicker value={rangeTime} onChange={this.handleSearchRangeTime} placeholder={["Start", "End"]} />
                    <Button type="primary" shape="circle" icon="search" onClick={this.handleSearchBtn}/>
                    <NewsTable allNewsData={this.state.allNewsData}/>
                    <div className="tablePage">
                        <Pagination size="small" simple onChange={this.handlePageChange} total={this.state.totalPage*this.state.pageSize}
                            pageSize={this.state.pageSize} defaultCurrent={this.state.nowPage} showQuickJumper />
                    </div>
                </Card>
            </div>
        );
    }
}


class ManageNews extends React.Component {

    componentDidMount() {
        const { dispatch } = this.props;
        const titleArray = [
            {
                title: '新闻',
                key: 'none',
            },
            {
                title: '管理新闻',
                key: '/admin/news/manage',
            },
        ];
        dispatch(switchMenu(titleArray));
    }

    render() {
        return (
            <div>
                <NewsView />
            </div>
        );
    }
}

export default connect()(ManageNews);