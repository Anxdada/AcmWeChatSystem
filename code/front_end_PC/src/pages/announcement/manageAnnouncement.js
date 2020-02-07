import React from 'react';
import './index.less';
import { Card, Tag, Divider, Table, Button, Popconfirm, Pagination, Input, Select } from 'antd';
import { Link } from 'react-router-dom';
import {EventEmitter2} from 'eventemitter2';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { connect } from 'react-redux';
import { switchMenu, addMenu } from './../../redux/actions';

moment.locale('zh-cn');

var emitter = new EventEmitter2()
var emitter2 = new EventEmitter2()
const { Option } = Select;
const { Search } = Input;

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
        this.state = {
            isRegister: false,
        }
        this.columns = [
            {
                title: '公告标题',
                dataIndex: 'announcementTitle',
                key: 'announcementTitle',
                render: (text, record) => (
                    <span>
                        <a><Link to={'/admin/announcement/detail/'+record.announcementId}>{text}</Link></a>
                    </span>
                ),
            }, 
            {
                title: '类别',
                dataIndex: 'announcementTag',
                key: 'announcementTag',
                render: (text, record) => (
                    <span>
                        <Tag color="red" >{text}</Tag>
                    </span>
                ),
            },
            {
                title: '创建人',
                dataIndex: 'userName',
                key: 'userName',
            }, 
            {
                title: '创建时间',
                dataIndex: 'createTime',
                key: 'createTime',
                sorter: (a, b) => a.createTime < b.createTime
            },  
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <span>
                        {
                            this.state.isRegister == false ? 
                            <span><a><Link to={'/admin/announcement/registerPerson/'+record.announcementId}>查看报名用户</Link></a> <Divider type="vertical" /></span>
                            : null
                            // record.isRegister
                        } 
                        <a><Link to={'/admin/announcement/modifyAnnouncement/'+record.announcementId}>修改</Link></a>
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
                render: (text, record) => (
                    <span>
                    {
                        record.isDone == 1 ? record.isDone == 2 ? <a><Tag color="#108ee9" onClick={()=>this.handleDoneAnnouncement(record.announcementId)}>截至报名</Tag></a>:
                        <Tag color="#f50">已结束</Tag> : <Tag color="green">正在报名</Tag>
                        //record.isDone==1?<a><Tag color="#108ee9" onClick={()=>this.handleDoneAnnouncement(record.announcementId)}>截至报名</Tag></a>:
                        //<Tag color="#f50">已结束</Tag>
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

    handleDoneAnnouncement = (key) => {
        // fetch(DoneAnnouncementUrl,{   //Fetch方法
        //         method: 'POST',
        //         headers: {
        //           'Authorization': cookie.load('token'),
        //           'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
        //         },
        //        body: 'announcementId='+key
    
        //     }).then(res => res.json()).then(
        //         data => {
        //             if(data.code==0) {
        //               emitter.emit('changeFirstText', 'Second');
        //               message.success('操作成功');
        //             }
        //             else {
        //                message.error(data.msg);
        //             }
        //         }
        //     )
      }

      tmp = (key) => {
        console.log("------"+key);
        emitter2.emit('changeShow', key);
    
      }

      handleDelete = (announcementId) => {
        console.log("------");
        // fetch(DeleteAnnouncementUrl,{   //Fetch方法
        //         method: 'POST',
        //         headers: {
        //           'Authorization': cookie.load('token'),
        //           'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
        //         },
        //        body: 'announcementId='+announcementId
    
        //     }).then(res => res.json()).then(
        //         data => {
        //             if(data.code==0) {
        //               emitter.emit('changeFirstText', 'Second');
        //               message.success('操作成功');
        //             }
        //             else {
        //                message.error(data.msg);
        //             }
        //         }
        // )
    }

    render() {
        return (
            <div>
                <Table columns={this.columns} dataSource={this.data} pagination={false} />
            </div>
        );
    }
}


class AnnouncementView extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            nowPage: 1,
            totalPage: 1,
            pageSize: 10,
            allAnnouncement: '',
            searchAnnouncementTitle: '',
            searchTag: '',
        }
    }

    componentWillMount() {
        this.getData();
    }

    changeText = () => {
        this.getData();
    }

    getData() {
        //alert(this.state.competitionTitle);
        // fetch(SelectAnnouncementUrl, {
        //   method: 'POST',
        //   headers: {
        //     'Authorization': cookie.load('token'),
        //     'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
        //   },
        //   body: 'AnnouncementTitle='+this.state.AnnouncementTitle+'&pageNum='+this.state.nowPage+'&pageSize='+this.state.pageSize
        // }).then( res=> res.json()).then(
        //   data => {
        //     if (data.code==0) {
        //       if(data.resultBean.currentPage>0) {
        //         this.setState({nowPage: data.resultBean.currentPage});
        //       }else {
        //         this.setState({nowPage: 1});
        //       }
        //       this.setState({totalPage: data.resultBean.totalItems/data.resultBean.pageSize});
        //       this.setState({allAnnouncement: data.resultBean.items});
        //     } else {
        //       this.setState({nowPage: 1});
        //       this.setState({totalPage: 1});
        //       this.setState({allAnnouncement: ''});
        //       message.error(data.msg);
        //     }
        //   }
        // )
    }

    handleSearchTitleBtn = (e) => {
        this.setState({
            searchAnnouncementTitle: e.target.value
        }, () => this.getData());
    }

    handleSearchTags = (value) => {
        this.setState({
            searchTag: value, 
        });
    }

    handleSearchTagBtn() {
        this.getData();
    }

    handlePageChange = (page) => {
        console.log(page);
        this.setState({
            nowPage: page 
        }, () => this.getData());
    }

    render() {
        return(
            <div style={{ flex: 1, padding: "10px" }}>
                <Card title="公告栏" >
                    <Search placeholder="公告标题" onSearch={this.handleSearchTitleBtn} style={{ height: 30, width: 150}} className="searchF"/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Select defaultValue={ this.state.searchTag } style={{ width: 150 }} 
                        onChange={this.handleSearchTags} >
                        {
                            tags.map((item) =>
                                <Option value={item.tagName}><Tag color={item.tagColor} key={item.tagName} > {item.tagName} </Tag></Option>
                            )
                        }
                    </Select>
                    <Button type="primary" shape="circle" icon="search" onClick={this.handleSearchTagBtn}/>
                    <AnnouncementTable allAnnouncement={this.state.allAnnouncement}/>
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