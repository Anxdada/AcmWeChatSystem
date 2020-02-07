import React from 'react';
import './index.less';
import { Card, Tag, Divider, Table, Button, Popconfirm, Pagination, Input, DatePicker, Select } from 'antd';
import { Link } from 'react-router-dom';
import {EventEmitter2} from 'eventemitter2';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { connect } from 'react-redux';
import { switchMenu,addMenu } from './../../redux/actions';

moment.locale('zh-cn');

var emitter = new EventEmitter2()
var emitter2 = new EventEmitter2()
const { Search } = Input;
const { Option } = Select;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

const children = [];
for (let i = 10; i < 36; i++) {
    children.push(<Option value={i.toString(36) + i} key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

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
                render: (text, record) => (
                    <span>
                        <a><Link to={'/admin/forum/detail/'+record.postId}>{text}</Link></a>
                    </span>
                ),
            }, 
            {
                title: '标签',
                dataIndex: 'postTags',
                key: 'postTags',
                render: postTags => ( //渲染多个时直接取当前列的名字就行
                <span>
                    {
                        postTags.map((item) => {
                            return (
                                <Tag color={item.tagColor} key={item.tagName}>{item.tagName}</Tag>
                            );
                        })
                    }
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
                        <a disable><Link to={'/admin/forum/comment/'+record.postId}>查看评论</Link></a>
                        <Divider type="vertical" />
                        <a><Link to={'/admin/forum/modifyPost/'+record.postId}>修改</Link></a>
                        <Divider type="vertical" />
                        <Popconfirm title="确定删除?" onConfirm={() => this.handleDelete(record.postId)} okText="确定" cancelText="取消">
                            <a className="deleteHerf">删除</a>
                        </Popconfirm>
                    </span>
                ),
            },
            {
                title: '精热操作',
                key: 'stopaction',
                render: (text, record) => (
                    <span>
                    {
                        this.state.isHead==false?<a><Tag color="#108ee9" onClick={()=>this.handleHead(record.postId)}>置顶</Tag></a>:
                            <a ><Tag color="#FF0000" onClick={()=>this.handleHead(record.postId)}>取消置顶</Tag></a>
                        // 暂时用state的, 实际直接用record的, 都是通过id操作的.
                    }
                    {
                        this.state.isGreat==false?<a><Tag color="#108ee9" onClick={()=>this.handleGreat(record.postId)}>加精</Tag></a>:
                            <a ><Tag color="#FF0000" onClick={()=>this.handleGreat(record.postId)}>取消加精</Tag></a>
                    }
                    {
                        this.state.isHot==false?<a><Tag color="#108ee9" onClick={()=>this.handleHot(record.postId)}>加热</Tag></a>:
                            <a ><Tag color="#FF0000" onClick={()=>this.handleHot(record.postId)}>取消加热</Tag></a>
                    }
                    </span>
                ),
            }
        ];

        // 测试数据
        this.data = [
            {
                key: '1',
                postTitle: 'HDU2018 请教',
                postTags: [{tagName:'线段树',tagColor:'green'}, {tagName:'暴力',tagColor:'red'}],
                userName: '陈晓宇',
                createTime: moment().format('YYYY-MM-DD'),
            },
            {
                key: '2',
                postTitle: '征男友',
                postTags: [{tagName:'情感',tagColor:'volcano'}, {tagName:'交友',tagColor:'orange'}],
                userName: '西瓜',
                createTime: moment().format('YYYY-MM-DD'),
            },
        ]
    }

    handleGreat = () => {
        this.setState({
            isGreat: !this.state.isGreat,
        })
    }

    handleHot = () => {
        this.setState({
            isHot: !this.state.isHot,
        })
    }

    handleHead = () => {
        this.setState({
            isHead: !this.state.isHead,
        })
    }


    handleDelete = (postId) => {
        console.log("------");
        // fetch(DeleteLectureUrl,{   //Fetch方法
        //         method: 'POST',
        //         headers: {
        //           'Authorization': cookie.load('token'),
        //           'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
        //         },
        //        body: 'postId='+postId

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


class PostView extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            nowPage: 1,
            totalPage: 1,
            pageSize: 10,
            allPost: '',
            searchPostTitle: '',
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
        //       this.setState({allPost: data.resultBean.items});
        //     } else {
        //       this.setState({nowPage: 1});
        //       this.setState({totalPage: 1});
        //       this.setState({allPost: ''});
        //       message.error(data.msg);
        //     }
        //   }
        // )
    }

    handleSearchTitleBtn = (value) => {
        this.setState({
            searchPostTitle: value,
        }, () => this.getData());
    }

    handleSearchRangeTime = (dates) => {
        console.log(dates[0]);
        console.log(dates[1]);
    }

    handleSearchRangeTimeBtn() {
        this.getData();
    }

    handleSelectTags = (datas) => {

    }

    handleSearchTagsBtn = () => {

    }

    handlePageChange = (page) => {
        console.log(page);
        this.setState({
            nowPage: page 
        }, () => this.getData());
    }

    disabledDate = (current) => {
        // 只能搜索最晚是今天的帖子
        return current > moment().endOf('day');
    }

    render() {
        return(
            <div style={{ flex: 1, padding: "10px" }}>
                <Card title="所有帖子" >
                    <Search placeholder="新闻标题" onSearch={this.handleSearchTitleBtn} style={{ height: 30, width: 150}} className="searchF"/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <RangePicker onChange={this.handleSearchRangeTime} disabledDate={this.disabledDate} />
                    <Button type="primary" shape="circle" icon="search" onClick={this.handleSearchRangeTimeBtn}/>
                    &nbsp;&nbsp;
                    <Select
                        mode="multiple"
                        style={{ width: '100%' }}
                        placeholder="帖子的标签"
                        onChange={this.handleSelectTags}
                        style={{ height: 30, width: 200}}
                    >
                        {children}
                    </Select>
                    <Button type="primary" onClick={this.handleSearchTagsBtn}>搜索</Button>
                    <PostTable allPost={this.state.allPost}/>
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