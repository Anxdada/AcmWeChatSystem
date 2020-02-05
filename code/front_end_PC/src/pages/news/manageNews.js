import React from 'react';
import './index.less';
import { Card, Tag, Divider, Table, Button, Popconfirm, Pagination, Input, Select } from 'antd';
import { Link } from 'react-router-dom';
import {EventEmitter2} from 'eventemitter2';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

var emitter = new EventEmitter2()
var emitter2 = new EventEmitter2()
const { Search } = Input;
const { Option } = Select;

const tags = [
    {
        tagName: '时事新闻',
        tagColor: '#3ce016',
    },
    {
        tagName: '竞赛',
        tagColor: '#e01639',
    },
    {
        tagName: '获奖',
        tagColor: '#16e0c4',
    },
    {
        tagName: '未分类',
        tagColor: '#16c4e0',
    }
]

class NewsTable extends React.Component {

    constructor(props) {
        super(props);
        this.tmp = this.tmp.bind(this);
        this.columns = [
            {
                title: '新闻标题',
                dataIndex: 'NewsTitle',
                key: 'NewsTitle',
                render: (text, record) => (
                    <span>
                        <a><Link to={'/admin/News/detail'}>{text}</Link></a>
                    </span>
                ),
            }, 
            {
                title: '类别',
                dataIndex: 'NewsTag',
                key: 'NewsTag',
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
                        <a><Link to={'/updateLecture/'+record.lectureId}>修改</Link></a>
                        <Divider type="vertical" />
                        <Popconfirm title="确定删除?" onConfirm={() => this.handleDelete(record.lectureId)} okText="确定" cancelText="取消">
                            <a >删除</a>
                        </Popconfirm>
                    </span>
                ),
            },
            {
                title: '截至操作',
                key: 'stopaction',
                render: (text, record) => (
                    <span>
                    {
                        record.isDone==1?<a href="javascript:;"><Tag color="#108ee9" onClick={()=>this.handleDoneLecture(record.lectureId)}>截至报名</Tag></a>:
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

    handleDoneLecture = (key) => {
        // fetch(DoneLectureUrl,{   //Fetch方法
        //         method: 'POST',
        //         headers: {
        //           'Authorization': cookie.load('token'),
        //           'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
        //         },
        //        body: 'lectureId='+key
    
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

      handleDelete = (lectureId) => {
        console.log("------");
        // fetch(DeleteLectureUrl,{   //Fetch方法
        //         method: 'POST',
        //         headers: {
        //           'Authorization': cookie.load('token'),
        //           'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
        //         },
        //        body: 'lectureId='+lectureId
    
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


class NewsView extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            nowPage: 1,
            totalPage: 1,
            pageSize: 10,
            allNews: '',
            searchNewsTitle: '',
            searchTag: '时事新闻',
        }
    }

    componentWillMount() {
        this.getNewsData();
    }

    changeText = () => {
        this.getNewsData();
    }

    getNewsData() {
        //alert(this.state.competitionTitle);
        // fetch(SelectLectureUrl, {
        //   method: 'POST',
        //   headers: {
        //     'Authorization': cookie.load('token'),
        //     'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
        //   },
        //   body: 'lectureTitle='+this.state.lectureTitle+'&pageNum='+this.state.nowPage+'&pageSize='+this.state.pageSize
        // }).then( res=> res.json()).then(
        //   data => {
        //     if (data.code==0) {
        //       if(data.resultBean.currentPage>0) {
        //         this.setState({nowPage: data.resultBean.currentPage});
        //       }else {
        //         this.setState({nowPage: 1});
        //       }
        //       this.setState({totalPage: data.resultBean.totalItems/data.resultBean.pageSize});
        //       this.setState({allNews: data.resultBean.items});
        //     } else {
        //       this.setState({nowPage: 1});
        //       this.setState({totalPage: 1});
        //       this.setState({allNews: ''});
        //       message.error(data.msg);
        //     }
        //   }
        // )
    }

    handleSearchTitleBtn = (value) => {
        console.log(value);
        this.setState({
            searchNewsTitle: value,
        });
        this.getNewsData();
    }

    handleSearchTagBtn = () => {
        this.getNewsData();
    }

    handlePageChange = (page) => {
        console.log(page);
        // 清空搜索框的内容
        this.setState({
            nowPage: page,
        }, () => this.getNewsData());
    }

    handleSearchTags = (value) => {
        this.setState({
            searchTag: value, 
        });
    }

    render() {
        return(
            <div style={{ flex: 1, padding: "10px" }}>
                <Card title="新闻概览" >
                    <Search placeholder="新闻标题" onSearch={this.handleSearchTitleBtn} style={{ height: 30, width: 150}} className="searchF"/>
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
                    <NewsTable allNews={this.state.allNews}/>
                    <div className="tablePage">
                        <Pagination size="small" simple onChange={this.handlePageChange} total={this.state.totalPage*this.state.pageSize}
                            pageSize={this.state.pageSize} defaultCurrent={this.state.nowPage} showQuickJumper />
                    </div>
                </Card>
            </div>
        );
    }
}


export default class ManageNews extends React.Component {

    render() {
        return (
            <div>
                <NewsView />
            </div>
        );
    }
}