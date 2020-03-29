import React from 'react';
import './index.less';
import { Card, Tag, Divider, Table, Button, Popconfirm, Pagination, Input, Select, message, notification, Tooltip, DatePicker } from 'antd';
import { Link } from 'react-router-dom';
import {EventEmitter2} from 'eventemitter2';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { connect } from 'react-redux';
import { switchMenu, addMenu } from './../../redux/actions';
import { DeleteAnnouncement, SelectAnnouncement, SelectAnnouncementTag } from './../../config/dataAddress';
import cookie from 'react-cookies';
import Fetch from './../../fetch';


moment.locale('zh-cn');

var emitter = new EventEmitter2()
var emitter2 = new EventEmitter2()
const { Option } = Select;
const { Search } = Input;
const { RangePicker } = DatePicker;

const tags = [
    {
        tagName: '讲座',
        tagColor: '#3ce016',
    },
    {
        tagName: '个人训练赛',
        tagColor: '#e01639',
    },
    {
        tagName: '组队训练赛',
        tagColor: '#16e0c4',
    },
    {
        tagName: '会议',
        tagColor: '#16c4e0',
    }
]

class AnnouncementTable extends React.Component {

    constructor(props) {
        super(props);
        this.columns = [
            {
                title: '公告标题',
                dataIndex: 'announcementTitle',
                key: 'announcementTitle',
                align: 'center',
                render: (text, record) => (
                    <span>
                        <Link to={'/admin/announcement/detail/'+record.announcementId}>{text}</Link>
                    </span>
                ),
            }, 
            {
                title: '类别',
                dataIndex: 'announcementTagName',
                key: 'announcementTagName',
                align: 'center',
                render: (text, record) => (
                    <span>
                        <Tag color={record.announcementTagColor} >{text}</Tag>
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
                sorter: (a, b) => a.createTime < b.createTime,
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
                        {
                            record.isRegister == 1 ? 
                            <span><Link to={'/admin/announcement/registerPerson/'+record.announcementId}>查看报名用户</Link> <Divider type="vertical" /></span>
                            : null
                        } 
                        <Link to={'/admin/announcement/modifyAnnouncement/'+record.announcementId}>修改</Link>
                        <Divider type="vertical" />
                        <Popconfirm title="确定删除?" onConfirm={() => this.handleDelete(record.announcementId)} okText="确定" cancelText="取消">
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
                        record.isPublish == 0 ? <Tag color="gray">未发布[草稿]</Tag> :
                        record.isRegister == 0 ? <Tag color="blue">已发布</Tag> :
                        moment().isAfter(record.registerEndTime) ? 
                                            <Tooltip title={`截止时间 ${moment(record.registerEndTime).format('YYYY-MM-DD HH:mm:ss')}`}>
                                                <Tag color="#f50">报名结束</Tag> 
                                            </Tooltip>
                        : <Tag color="green">正在报名</Tag>
                    }
                    
                    </span>
                ),
            }
        ];

        // 测试数据
        this.data = [
            {
                key: '1',
                announcementTitle: 'DFS新生讲座',
                announcementTag: '讲座',
                userName: '陈晓宇',
                createTime: moment().format('YYYY-MM-DD'),
            },
            {
                key: '2',
                announcementTitle: '134',
                announcementTag: '比赛',
                userName: 'longlong',
                createTime: moment().format('YYYY-MM-DD'),
            },
        ]
    }

    handleDelete = (announcementId) => {

        Fetch.requestPost({
            url: DeleteAnnouncement,
            info: 'announcementId='+announcementId,
            timeOut: 3000,
        }).then ( 
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
                <Table columns={this.columns} dataSource={this.props.allAnnouncementData} rowKey={record => record.announcementId} 
                    pagination={false} footer={() => '对于要报名的公告, 细节点请点到公告详情页查看' } />
            </div>
        );
    }
}

// loading="true"


class AnnouncementView extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            nowPage: 1,
            totalPage: 1,
            pageSize: 5,
            allAnnouncementData: [],
            allTag: [],
            searchAnnouncementTitle: '',
            searchTag: undefined,
            searchStartTime: null,
            searchEndTime: null,
        }
        emitter.on("refresh", this.refresh.bind(this));
    }

    componentWillMount() {
        this.getAnnouncementData();
        this.getTagData();
    }

    refresh = () => {
        this.getAnnouncementData();
    }

    getTagData() {

        Fetch.requestPost({
            url: SelectAnnouncementTag,
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

    getAnnouncementData() {

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
            url: SelectAnnouncement,
            info: 'announcementTitle='+this.state.searchAnnouncementTitle+'&searchTagId='+searchTag
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
                        allAnnouncementData: data.resultBean.items
                    });
                } else {
                    this.setState({
                        nowPage: 1,
                        totalPage: 1,
                        allAnnouncementData: []
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
            searchAnnouncementTitle: e.target.value
        });
        // 不再是改变就搜索, 而是三个搜索条件一起后, 再点击button搜索
    }

    handleSearchTag = (value) => {
        console.log(value);
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
        console.log("111");
        this.getAnnouncementData();
    }

    handlePageChange = (page) => {
        console.log(page);
        this.setState({
            nowPage: page 
        }, () => this.getAnnouncementData());
    }

    render() {
        let rangeTime;
        if (this.state.searchStartTime != null)
            rangeTime = [moment(this.state.searchStartTime), moment(this.state.searchEndTime)];
        else rangeTime = [null, null];

        return(
            <div style={{ flex: 1 }}>
                <Card title="公告管理" >
                    <Input value={this.state.searchAnnouncementTitle} placeholder="公告标题" allowClear
                        onChange={this.handleSearchTitle} style={{ height: 30, width: 150}} className="searchF"/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Select value={this.state.searchTag} placeholder="类别" style={{ width: 150 }} 
                        onChange={this.handleSearchTag} allowClear >
                        {
                            this.state.allTag.map((item) =>
                                <Option key={item.announcementTagId} value={item.announcementTagId}>
                                    <Tag color={item.announcementTagColor} key={item.announcementTagId} > {item.announcementTagName} </Tag>
                                </Option>
                            )
                        }
                    </Select>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <RangePicker value={rangeTime} onChange={this.handleSearchRangeTime} placeholder={["开始时间", "结束时间"]} />
                    <Button type="primary" shape="circle" icon="search" onClick={this.handleSearchBtn}/>
                    <AnnouncementTable allAnnouncementData={this.state.allAnnouncementData}/>
                    <div className="tablePage">
                        <Pagination size="small" simple onChange={this.handlePageChange} total={this.state.totalPage*this.state.pageSize}
                            pageSize={this.state.pageSize} defaultCurrent={this.state.nowPage} showQuickJumper />
                    </div>
                </Card>
            </div>
        );
    }
}


class ManageAnnouncement extends React.Component {

    componentDidMount() {
        const { dispatch } = this.props;
        const titleArray = [
            {
                title: '公告',
                key: 'none',
            },
            {
                title: '管理公告',
                key: '/admin/announcement/manage',
            },
        ];
        dispatch(switchMenu(titleArray));
    }

    render() {
        return (
            <div>
                <AnnouncementView />
            </div>
        );
    }
}

export default connect()(ManageAnnouncement);