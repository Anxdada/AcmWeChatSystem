import React from 'react';
import './index.less';
import { notification, Table, Divider, Tag, Button, Card, Pagination, Input, Modal, Select, message, Spin, ConfigProvider, Empty, DatePicker, Popconfirm } from 'antd';
import { tagsColorList, urlTags } from '../../config/urlTagsAbout';
import Util from './../../utils/utils';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { AddFriendUrl, DeleteFriendUrl, UpdateFriendUrl, SelectFriendUrl, DetailFriendUrl, TestFriendUrl } from './../../config/dataAddress';
import cookie from 'react-cookies';
import { EventEmitter2 } from 'eventemitter2';

var emitter = new EventEmitter2();
// 用于刷新react, 从一个页面返回时出发最有用, on 注册, emit 修改触发
var emitter2 = new EventEmitter2();


moment.locale('zh-cn');

const { Option } = Select;

class UrlColorTag extends React.Component {
    render() {
        let colorId = 0;
        const tag = this.props.text; 
        //console.log(tag);
        for (var i = 0 ; i < urlTags.length ; ++ i) {
            if (tag == urlTags[i]) {
                colorId = i;
                break;
            }
        }
        //console.log(colorId);
        return (
            <Tag color={tagsColorList[colorId]} key={tag} > {tag} </Tag>
        );
    }
}

// 修改modal中的数据
class UrlModifyAction extends React.Component {
    state = { 
        visible: false,
        submitLoading: false,
    }

    constructor(props) {
        super(props);
        this.state = {
            friendUrlId: '',
            friendUrlName:'',
            friendUrlAddress:'',
            friendUrlTag: '个人博客',
            createTime: moment(),
        }
    }

    componentWillMount(){
        const urlTagsModal = this.renderUrlTagsModal(urlTags);
        
        this.setState({
            urlTagsModal,
        })

        this.getSingleUrlData();
    }

    renderUrlTagsModal = (data) => {
        return data.map((item) => 
            <Option value={item} key={item}><UrlColorTag text={item} /> </Option>
        )
    }

    getSingleUrlData() {
        fetch(DetailFriendUrl, {
            method: 'POST',
            headers:{
                'Authorization': cookie.load('token'),
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
            },
            body:'friendUrlId='+this.props.modifyUrlId
        }).then(res => res.json()).then(
            data => {
                if (data.status == 0) {
                    this.setState({
                        friendUrlId: data.resultBean.friendUrlId,
                        friendUrlName: data.resultBean.friendUrlName,
                        friendUrlAddress: data.resultBean.friendUrlAddress,
                        friendUrlTag: data.resultBean.friendUrlTag,
                        createTime: data.resultBean.createTime,
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
        )
    }

    updateSingleUrlData() {
        if (this.state.friendUrlName == 0) {
            message.error('请输入友链名称!');
            return ;
        }
        else if (this.state.friendUrlName > 20) {
            message.error('友链名称过长!');
            return ;
        }
        else if (this.state.friendUrlAddress == 0) {
            message.error('请输入友链网址!');
            return ;
        }
        else if (this.state.createTime == null) {
            message.error('创建时间不能为空!');
            return ;
        }

        this.setState({
            submitLoading: true,
        })
        
        const createTime = new Date();
        console.log(createTime);
        console.log(this.state.createTime);

        fetch(UpdateFriendUrl, {
            method: 'POST',
            headers : {
                'Authorization': cookie.load('token'),
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
            },
            body:'friendUrlId='+this.state.friendUrlId+'&friendUrlName='+this.state.friendUrlName
                    +'&friendUrlAddress='+this.state.friendUrlAddress+'&friendUrlTag='+this.state.friendUrlTag
                    +'&createTime='+moment(this.state.createTime).format('YYYY-MM-DD HH:mm:ss')
        }).then(res => res.json()).then(
            data => {
                if (data.status == 0) {
                    message.success('修改成功');
                    emitter.emit('refresh', '修改')
                    this.setState({
                        visible: false,
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
                this.setState({
                    submitLoading: false,
                })
            }
        )
    } 

    handleShowModal = () => {
        this.setState({
            visible: true,
        }, () => this.getSingleUrlData());
    }

    handleOkModal = (e) => {
        console.log(e);
        this.updateSingleUrlData();
    }

    handleCancelModal = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }

    handleModalUrlName = (e) => {
        console.log(e)
        this.setState({
            friendUrlName: e.target.value
        });
    }

    handleModalUrlAddress = (e) => {
        console.log(e)
        this.setState({
            friendUrlAddress: e.target.value
        });
    }

    handleModalUrlCreateTime = (date, dateString) => {
        // console.log(date.format('YYYY-MM-DD'));
        // console.log(dateString);
        this.setState({
            createTime: date,
        })
    }

    handleModalTags = (value) => {
        console.log(value)
        this.setState({
            friendUrlTag: value
        });
    }

    disabledDate = (current) => {
        // Can not select days before today and today
        // return current && current < moment().endOf('day');
        // 创建时间只能选取最晚为今天的
        return current > moment().endOf('day');
    }


    render(){
        console.log(this.props.modifyUrlId)
        return (
        <span>
            <a onClick={ this.handleShowModal }> 修改 </a>
            <Modal
                title="修改友链"
                visible={this.state.visible}
                onOk={this.handleOkModal}
                onCancel={this.handleCancelModal}
                okText="确认修改"
                cancelText="取消"
                okButtonProps={{
                    loading: this.state.submitLoading,
                }}
                cancelButtonProps={{
                    disabled: this.state.submitLoading,
                }}
            >
            <div>
                友链名称：<Input size="small" value={this.state.friendUrlName} style={{ height:30 , width:300 }} 
                            onChange={this.handleModalUrlName} />
            </div>
            <div className="modalInput">
                友链网址：<Input size="small" value={this.state.friendUrlAddress} style={{ height:30 , width:300 }} 
                            onChange={this.handleModalUrlAddress} />
            </div>
            <div className="modalInput">
                类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：
                <Select value={ this.state.friendUrlTag } style={{ width: 150 }} 
                    onChange={this.handleModalTags} >
                    { this.state.urlTagsModal }
                </Select>
            </div>
            </Modal>
        </span>
        )
    }
}


// 测试数据
const data = [
    {
        key: '1',
        friendUrlName: '陈晓宇',
        friendUrlAddress: 'www.baidu.com',
        friendUrlTag: '个人博客',
        createTime: Util.formateDate(),
    },
    {
        key: '2',
        friendUrlName: '龙龙龙',
        friendUrlAddress: 'anxdada.github.io',
        friendUrlTag: '个人博客',
        createTime: moment().format('YYYY-MM-DD'),
    },
    {
        key: '3',
        friendUrlName: '多校题解博客',
        friendUrlAddress: 'www.google.com',
        friendUrlTag: '圈内知名博客',
        createTime: moment('2020-01-03').format('YYYY-MM-DD'),
    },
    {
        key: '4',
        friendUrlName: 'Codeforces',
        friendUrlAddress: 'codeforces.com',
        friendUrlTag: '竞赛网站',
        createTime: moment('2020-01-04').format('YYYY-MM-DD'),
    },
];

// 测试数据2
const data2 = [];
  
// 友链属性那个是添加需要填写的
class FriendUrlTable extends React.Component {
    state = { 
        visible: false,
        submitLoading: false,
    }

    constructor(props) {
        super(props);
        this.state={
            nowPage: 1,
            totalPage: 1,
            pageSize: 10,
            friendUrlName:'',
            addFriendUrlName: '',
            friendUrlAddress:'',
            friendUrlTag: '个人博客',
            allUrl: '',
        }
        this.columns = [
            {
                title: '友链名称',
                dataIndex: 'friendUrlName',
                key: 'friendUrlName',
                align: 'center',
            },
            {
                title: '友链网址',
                dataIndex: 'friendUrlAddress',
                key: 'friendUrlAddress',
                align: 'center',
                render: text => <a href={"http://" + text}>{text}</a>,
            },
            {
                title: '类别',
                key: 'friendUrlTag',
                dataIndex: 'friendUrlTag',
                align: 'center',
                render: (text, record) => (
                    <span>
                        <UrlColorTag text={text} />
                    </span>
                )
            },
            {
                title: '最近一次更新时间',
                dataIndex: 'updateTime',
                key: 'updateTime',
                align: 'center',
                sorter: (a, b) => a.updateTime < b.updateTime
                // sorter: (a, b) => moment(a.createTime).isAfter(moment(b.createTime)) || moment(a.createTime).isBefore(moment(b.createTime))
                // defaultSortOrder: 'descend'
            },
            {
                title: '更新人',
                dataIndex: 'updateUser',
                key: 'updateUser',
                align: 'center',
            },
            {
                title: '操作',
                key: 'action',
                align: 'center',
                render: (text, record) => (
                    <span>
                        <UrlModifyAction modifyUrlId={record.friendUrlId} />
                        <Divider type="vertical" />
                        <Popconfirm title="确定删除?" onConfirm={() => this.handleDeleteFriendUrl(record.friendUrlId)} okText="确定" cancelText="取消">
                            <a className="deleteHerf">删除</a>
                        </Popconfirm>
                    </span>
                ),
            },
        ];
        emitter.on("refresh", this.refresh.bind(this)); 
    }

    handleDeleteFriendUrl = (friendUrlId) => {
        console.log(friendUrlId);

        fetch(DeleteFriendUrl, {
            method: 'POST',
            headers: {
                'Authorization': cookie.load('token'),
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
            },
            body: 'friendUrlId='+friendUrlId
        }).then( res => res.json() ).then (
            data => {
                if (data.status == 0) {
                    message.success('删除成功');
                    emitter.emit('refresh', '删除')
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
        )
    }

    componentWillMount() {
        const urlTagsModal = this.renderUrlTagsModal(urlTags);
        
        this.setState({
            urlTagsModal,
        })

        console.log("xiexie");
        this.getUrlData();
    }

    refresh(msg) {
        // 注册emit, 这样触发emit就会刷新界面了.
        this.setState({
            friendUrlName: '',
            addFriendUrlName: '',
        }, () => this.getUrlData());
    }

    renderUrlTagsModal = (data) => {
        return data.map((item) => 
            <Option value={item} key={item}><UrlColorTag text={item} /> </Option>
        )
    }

    getUrlData() {
        console.log("从后台重新读取数据渲染");

        fetch(SelectFriendUrl, {
            method: 'POST',
            headers: {
                'Authorization': cookie.load('token'),
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
            },
            body: 'friendUrlName='+this.state.friendUrlName+'&pageNum='+this.state.nowPage
                    +'&pageSize='+this.state.pageSize
        }).then( res => res.json() ).then (
            data => {
                console.log(data);
                console.log(SelectFriendUrl);
                if (data.status == 0) {
                    if (data.resultBean.currentPage > 0) {
                        this.setState({nowPage: data.resultBean.currentPage});
                    } else {
                        this.setState({nowPage: 1});
                    }
                    this.setState({
                        totalPage: data.resultBean.totalItems/data.resultBean.pageSize,
                        allUrl: data.resultBean.items,
                    });
                } else {
                    this.setState({
                        nowPage: 1,
                        totalPage: 1,
                        allUrl: ''
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
        )
    }

    addUrlData() {
        console.log("从后台添加数据");
        if (this.state.friendUrlName == 0) {
            message.error('请输入友链名称!');
            return ;
        }
        else if (this.state.friendUrlName>20) {
            message.error('友链名称过长!');
            return ;
        }
        else if(this.state.friendUrlAddress==0) {
            message.error('请输入友链网址!');
            return ;
        }

        this.setState({
            submitLoading: true
        })

        let arrayStr = this.state.friendUrlAddress.split("//");
        let url = arrayStr[0];
        if (arrayStr.length > 1) url = arrayStr[1];

        fetch(AddFriendUrl, {
            method: 'POST',
            headers: {
                'Authorization': cookie.load('token'),
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
            },
            body: 'friendUrlName='+this.state.addFriendUrlName+'&friendUrlAddress='+url
                    +'&friendUrlTag='+this.state.friendUrlTag
        }).then( res => res.json() ).then (
            data => {
                console.log(data);
                console.log(AddFriendUrl);
                if (data.status == 0) {
                    message.success('添加成功');
                    this.setState({
                        friendUrlName: '',
                        friendUrlAddress: '',
                        friendUrlTag: '个人博客',
                        visible: false,
                    });
                    emitter.emit('refresh', '添加'); // 通知react需要刷新该页面
                } else {
                    console.log(url);
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
                    submitLoading: false,
                })
            }
        )
    }

    handleSearchText = (e) => {
        this.setState({
            friendUrlName: e.target.value,
        }, () => this.getUrlData());
    }

    handleSearchBtn = () => {
        this.getUrlData();
    }

    handleShowModal = () => {
        console.log(moment.duration(moment('2013-02-08 09:30:26')).seconds());
        this.setState({
            visible: true,
        });
    }

    handleOkModal = () => {
        this.addUrlData();
    }

    handleCancelModal = () => {
        this.setState({
            visible: false,
        });
    }

    handleModalUrlName = (e) => {
        console.log(e)
        this.setState({
            addFriendUrlName: e.target.value
        });
    }

    handleModalUrlAddress = (e) => {
        console.log(e)
        this.setState({
            friendUrlAddress: e.target.value
        });
    }

    handleModalTags = (value) => {
        console.log(value)
        this.setState({
            friendUrlTag: value
        });
    }

    handlePageChange = (page) => {
        console.log(page);
        this.setState({ nowPage: page }, () => this.getUrlData());
    }


    render() {
        return (
        <div style={{ flex: 1, padding: "10px" }}>
            <Card title="友情链接" >
                <Input size="small" value={this.state.friendUrlName} onChange={this.handleSearchText} placeholder="友链名称" style={{ height:30 , width:150 }}/>
                &nbsp;&nbsp;<Button type="primary" shape="circle" icon="search" onClick={ this.handleSearchBtn }/>
                <div className="addUrlBtn">
                    <Button type="primary" onClick={this.handleShowModal}>+添加</Button>
                    <Modal
                        title="添加友链"
                        visible={this.state.visible}
                        onOk={this.handleOkModal}
                        onCancel={this.handleCancelModal}
                        okText="确认添加"
                        cancelText="取消"
                        okButtonProps={{
                            loading: this.state.submitLoading,
                        }}
                        cancelButtonProps={{
                            disabled: this.state.submitLoading,
                        }}
                    >
                    <div>
                        友链名称：<Input size="small" value={this.state.addFriendUrlName} style={{height:30 , width:300}} 
                                    onChange={this.handleModalUrlName} />
                    </div>
                    <div className="modalInput">
                        友链网址：<Input size="small" value={this.state.friendUrlAddress} style={{ height:30 , width:300 }} 
                                    onChange={this.handleModalUrlAddress} />
                    </div>
                    <div className="modalInput">
                        类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：
                        <Select value={this.state.friendUrlTag} style={{ width: 150 }} 
                            onChange={this.handleModalTags} >
                            { this.state.urlTagsModal }
                        </Select>
                    </div>
                    </Modal>
                </div>
                <Table 
                    bordered
                    columns={this.columns}
                    dataSource={this.state.allUrl}
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

export default class FriendUrl extends React.Component {
    render() {
        return (
            <div>
                <FriendUrlTable />
            </div>
        );
    }
}