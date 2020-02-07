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
                        <a><Link to={'/admin/news/detail/'+record.newsId}>{text}</Link></a>
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
                sorter: (a, b) => a.createTime < b.createTime
            },  
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <span>
                        <a><Link to={'/admin/news/modifyNews/'+record.newsId}>修改</Link></a>
                        <Divider type="vertical" />
                        <Popconfirm title="确定删除?" onConfirm={() => this.handleDelete(record.newsId)} okText="确定" cancelText="取消">
                            <a className="deleteHerf">删除</a>
                        </Popconfirm>
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

    handleDonenews = (key) => {
        // fetch(DonenewsUrl,{   //Fetch方法
        //         method: 'POST',
        //         headers: {
        //           'Authorization': cookie.load('token'),
        //           'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
        //         },
        //        body: 'newsId='+key
    
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

      handleDelete = (newsId) => {
        console.log("------");
        // fetch(DeletenewsUrl,{   //Fetch方法
        //         method: 'POST',
        //         headers: {
        //           'Authorization': cookie.load('token'),
        //           'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
        //         },
        //        body: 'newsId='+newsId
    
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
            searchTag: '',
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
        // fetch(SelectnewsUrl, {
        //   method: 'POST',
        //   headers: {
        //     'Authorization': cookie.load('token'),
        //     'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
        //   },
        //   body: 'newsTitle='+this.state.newsTitle+'&pageNum='+this.state.nowPage+'&pageSize='+this.state.pageSize
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