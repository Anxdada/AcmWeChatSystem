import React from 'react';
import './index.less';
import { Menu, Icon, Input, Checkbox, Row, Col, Table, Tag, Select, message, Tooltip, notification, } from 'antd';
import { Link } from "react-router-dom";
import { Pagination, WingBlank, NavBar, WhiteSpace, Button } from 'antd-mobile';
import Fetch from './../../fetch';
import { SelectAnnouncement, SelectAnnouncementTag } from './../../config/dataAddress';
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

const { Option } = Select;

class ShowTable extends React.Component{

    constructor(props) {
        super(props);
        this.columns = [
            {
                title: '标题',
                dataIndex: 'announcementTitle',
                key: 'announcementTitle',
                align: 'center',
                render: (text, record) => (
                    <span>
                        <Link to={'/mobile/announcement/detail/'+record.announcementId}>{record.announcementTitle}</Link>
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
                        record.isRegister == 0 ? 
                        <Tooltip title={`发布于 ${record.createTime}`}>
                            <Tag color="blue">已发布</Tag> 
                        </Tooltip> :
                        moment().isAfter(record.registerEndTime) ? 
                                            <Tooltip title={`截止时间 ${moment(record.registerEndTime).format('YYYY-MM-DD HH:mm:ss')}`}>
                                                <Tag color="#f50">报名结束</Tag> 
                                            </Tooltip>
                        : <Tag color="green">正在报名</Tag>
                    }
                    
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
            }
        ];
    }

    render() {
        return(
            <div style={{ marginTop: 5}} className="tableBackground">
                <Table columns={this.columns} dataSource={this.props.allAnnouncement} pagination={false} 
                    rowKey={record => record.announcementId}
                />   
            </div>
        );
    }
}

class ShowAnnouncement extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            nowPage: 1,
            totalPage: 1,
            pageSize: 10,
            allTag: [],
            allAnnouncement: [],
            searchAnnouncementTitle: '',
            searchTag: undefined,
        }
    }

    componentWillMount() {
        this.getTagData();
        this.getData();
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

    getData() {

        let searchTag = '';
        if (this.state.searchTag != undefined) {
            searchTag = this.state.searchTag;
        }

        Fetch.requestPost({
            url: SelectAnnouncement,
            info: 'announcementTitle='+this.state.searchAnnouncementTitle+'&searchTagId='+searchTag
                    +'&isPublish=1'+'&pageNum='+this.state.nowPage,
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
                        totalPage: data.resultBean.totalPage,
                        allAnnouncement: data.resultBean.items,
                    });
                } else {
                    this.setState({
                        nowPage: 1,
                        totalPage: 1,
                        allAnnouncement: []
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

    handleSearchAnnouncementTitle = (e) => {
        this.setState({
            searchAnnouncementTitle: e.target.value
        }, () => this.getData());
    }

    handleSearchTag = (value) => {
        this.setState({
            searchTag: value,
        }, () => this.getData());
    }

    handlePageChange = (page) => {
        // console.log(page);
        this.setState({ 
            nowPage: page 
        }, () => this.getData());
    }

    // antd-mobile 的 Pagination 代表的是总分页数.. 不是总数了
    render() {
        return(
            <div style={{ margin: '0 auto', minHeight:400}} >

                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() =>  window.history.back(-1)}
                >
                    公告列表
                </NavBar>
            
                <WingBlank size="sm">
                <span style={{fontSize: 5, color: '#B5B5B5' }}>首页 > 公告 </span><br />
                <Input size="small" onChange={this.handleSearchAnnouncementTitle} placeholder="公告标题" 
                    style={{height:30 , width:150}} allowClear />
                <Select value={this.state.searchTag} placeholder="类别" style={{ width: 120 }} 
                    onChange={this.handleSearchTag} allowClear className="searchAnnouncementTag">
                {
                    this.state.allTag.map((item) =>
                        <Option key={item.announcementTagId} value={item.announcementTagId}>
                            <Tag color={item.announcementTagColor} key={item.announcementTagId} > {item.announcementTagName} </Tag>
                        </Option>
                    )
                }
                </Select>
                <ShowTable allAnnouncement={this.state.allAnnouncement}/>
                <div style={{ marginTop: 3 }}>
                    <Pagination total={this.state.totalPage} current={this.state.nowPage} 
                        onChange={this.handlePageChange} pageSize={this.state.pageSize} />
                </div>
                </WingBlank>
            </div>
        );
    }
}

export default class MobileAnnouncementPage extends React.Component {

    render() {
        return (
            <div>
                <ShowAnnouncement />
            </div>
        );
    }
}