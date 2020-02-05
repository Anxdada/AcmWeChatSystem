import React from 'react';
import './index.less';
import { Card, Tag, Divider, Table, Button, Popconfirm, Pagination, Input } from 'antd';
import { Link } from 'react-router-dom';
import {EventEmitter2} from 'eventemitter2';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

var emitter = new EventEmitter2()
var emitter2 = new EventEmitter2()

class AnnouncementTable extends React.Component {

    constructor(props) {
        super(props);
        this.tmp = this.tmp.bind(this);
        this.columns = [
            {
                title: '公告标题',
                dataIndex: 'announcementTitle',
                key: 'announcementTitle',
                render: (text, record) => (
                    <span>
                        <a><Link to={'/admin/announcement/detail'}>{text}</Link></a>
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
            },  
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <span>
                        <a disable><Link to={'/personAnnouncement/'+record.announcementId}>查看报名用户</Link></a>
                        <Divider type="vertical" />
                        <a><Link to={'/updateAnnouncement/'+record.announcementId}>修改</Link></a>
                        <Divider type="vertical" />
                        <Popconfirm title="确定删除?" onConfirm={() => this.handleDelete(record.announcementId)} okText="确定" cancelText="取消">
                            <a >删除</a>
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
                        record.isDone==1?<a href="javascript:;"><Tag color="#108ee9" onClick={()=>this.handleDoneAnnouncement(record.announcementId)}>截至报名</Tag></a>:
                        <Tag color="#f50">已结束</Tag>
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

    handleSearchText = (e) => {
        this.setState({
            searchAnnouncementTitle: e.target.value
        }, () => this.getData());
    }

    handleSearchBtn() {
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
                    <Input size="small" onChange={this.handleSearchText} placeholder="公告标题" style={{ height:30 , width:150 }}/>
                    &nbsp;&nbsp;<Button type="primary" shape="circle" icon="search" onClick={this.handleSearchBtn}/>
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


export default class ManageAnnouncement extends React.Component {

    render() {
        return (
            <div>
                <AnnouncementView />
            </div>
        );
    }
}