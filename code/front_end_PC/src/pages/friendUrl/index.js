import React from 'react';
import './index.less';
import { Table, Divider, Tag, Button, Card, Pagination, Input, Modal, Select, message, ConfigProvider, Empty, DatePicker, Popconfirm } from 'antd';
import { tagsColorList, urlTags } from '../../config/urlTagsAbout';
import Util from './../../utils/utils';
import moment from 'moment';
import 'moment/locale/zh-cn';
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
    state = { visible: false }

    constructor(props) {
        super(props);
        this.state = {
            fridenUrlId: '',
            friendUrlName:'',
            friendUrlAddress:'',
            friendUrlTag: '',
            friendUrlCreateTime: '',
        }
    }

    handleShowModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleOkModal = (e) => {
        console.log(e);
        this.updateUrlClass();
    }

    handleCancelModal = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }

    componentWillMount(){
        this.getUrlClass();
        const urlTagsModal = this.renderUrlTagsModal(urlTags);
        
        this.setState({
            urlTagsModal,
        })
    }

    renderUrlTagsModal = (data) => {
        return data.map((item) => 
            <Option value={item}><UrlColorTag text={item} /> </Option>
        )
    }

    getUrlClass() {
        this.setState({
            friendUrlTag: '个人博客',
            friendUrlCreateTime: moment('2020-01-28'),
        });

        // fetch(DetailFriendUrl, {
        //     method: 'POST',
        //     headers:{
        //         'Authorization': cookie.load('token'),
        //         'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
        //     },
        //     body:'friendurlId='+this.props.modifyUrlId
        // }).then(res => res.json()).then(
        //     data => {
        //         if (data.code==0) {
        //             this.setState({
        //                 fridenUrlId: data.resultBean.friendurlId,
        //                 friendUrlName: data.resultBean.friendUrlName,
        //                 friendUrlAddress: data.resultBean.friendUrlAddress,
        //                 friendUrlTag: data.resultBean.friendUrlTag,
        //                 friendUrlCreateTime: data.resultBean.friendUrlCreateTime,
        //             });
        //         } else {
        //             message.error(data.msg);
        //         }
        //     }
        // )
    }

    updateUrlClass() {

        console.log(this.state.friendUrlCreateTime);

        this.setState({
            visible: false,
        });
        
        // fetch(UpdateFriendUrl, {
        //     method: 'POST',
        //     headers : {
        //         'Authorization': cookie.load('token'),
        //         'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
        //     },
        //     body:'friendurlId='+this.state.friendurlId+'&friendurlTitle='+this.state.friendurlTitle+'&friendurlBody='+this.state.friendurlBody
        // }).then(res => res.json()).then(
        //     data => {
        //         if (data.code==0) {
        //             message.success('修改成功');
        //             emitter.emit('changeFirstText', '修改')
        //         } else {
        //             message.error(data.msg);
        //         }
        //     }
        // )
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

    handleModalUrlCreateTime = (e) => {
        console.log(e.format('YYYY-MM-DD'));
        this.setState({
            friendUrlCreateTime: e.format('YYYY-MM-DD'),
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
        console.log(this.state.modifyUrlId)
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
            >
            <div>
                友链名称：<Input size="small" style={{ height:30 , width:300 }} onChange={this.handleModalUrlName} />
            </div>
            <div className="modalInput">
                友链网址：<Input size="small"  style={{ height:30 , width:300 }} onChange={this.handleModalUrlAddress} />
            </div>
            <div className="modalInput">
                类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：
                <Select defaultValue={ this.state.friendUrlTag } style={{ width: 150 }} 
                    onChange={this.handleModalTags} >
                    { this.state.urlTagsModal }
                </Select>
            </div>
            <div className="modalInput">
                创建时间：<DatePicker defaultValue={ this.state.friendUrlCreateTime } placeholder="请选择日期"
                            disabledDate={this.disabledDate} onChange={ this.handleModalUrlCreateTime } />
            </div>
            </Modal>
        </span>
        )
    }
}

const handleDeleteFriendUrl = (fridenUrlId) => {
    console.log(fridenUrlId);
}

const columns = [
    {
        title: '友链名称',
        dataIndex: 'urlName',
        key: 'urlName',
        align: 'center',
    },
    {
        title: '友链网址',
        dataIndex: 'urlAddress',
        key: 'urlAddress',
        align: 'center',
        render: text => <a href={"http://" + text}>{text}</a>,
    },
    {
        title: '类别',
        key: 'urlTag',
        dataIndex: 'urlTag',
        align: 'center',
        render: (text, record) => (
            <span>
                <UrlColorTag text={text} />
            </span>
        )
    },
    {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
        align: 'center',
        sorter: (a, b) => a.createTime < b.createTime
        // sorter: (a, b) => moment(a.createTime).isAfter(moment(b.createTime)) || moment(a.createTime).isBefore(moment(b.createTime))
        // defaultSortOrder: 'descend'
    },
    {
        title: '操作',
        key: 'action',
        align: 'center',
        render: (text, record) => (
            <span>
                <UrlModifyAction modifyUrlId={record.fridenUrlId} />
                <Divider type="vertical" />
                <Popconfirm title="确定删除?" onConfirm={() => handleDeleteFriendUrl(text)} okText="确定" cancelText="取消">
                    <a className="deleteHerf">删除</a>
                </Popconfirm>
            </span>
        ),
    },
];

// 测试数据
const data = [
    {
        key: '1',
        urlName: '陈晓宇',
        urlAddress: 'www.baidu.com',
        urlTag: '个人博客',
        createTime: Util.formateDate(),
    },
    {
        key: '2',
        urlName: '龙龙龙',
        urlAddress: 'anxdada.github.io',
        urlTag: '个人博客',
        createTime: moment().format('YYYY-MM-DD'),
    },
    {
        key: '3',
        urlName: '多校题解博客',
        urlAddress: 'www.google.com',
        urlTag: '圈内知名博客',
        createTime: moment('2020-01-03').format('YYYY-MM-DD'),
    },
    {
        key: '4',
        urlName: 'Codeforces',
        urlAddress: 'codeforces.com',
        urlTag: '竞赛网站',
        createTime: moment('2020-01-04').format('YYYY-MM-DD'),
    },
];

// 测试数据2
const data2 = [];
  
// 友链属性那个是添加需要填写的
class FriendUrlTable extends React.Component {
    state = { visible: false }

    constructor(props) {
        super(props);
        this.state={
            nowPage: 1,
            totalPage: 1,
            pageSize: 10,
            friendUrlName:'',
            friendUrlAddress:'',
            firendUrlTag: '',
            searchUrlName: '',
            allUrl: '',
        }
    }

    componentWillMount() {
        const urlTagsModal = this.renderUrlTagsModal(urlTags);
        
        this.setState({
            urlTagsModal,
        })
    }

    renderUrlTagsModal = (data) => {
        return data.map((item) => 
            <Option value={item}><UrlColorTag text={item} /> </Option>
        )
    }

    getUrlClass = () => {
        console.log("从后台重新读取数据渲染");
    }

    addUrlClass = () => {
        console.log("从后台添加数据");
        if(this.state.friendUrlName==0) {
            message.error('请输入友链名称!');
            return;
        }
        if(this.state.friendUrlName>20) {
            message.error('友链名称过长!');
            return;
        }
        if(this.state.friendUrlAddress==0) {
            message.error('请输入友链网址!');
            return;
        }

        this.setState({
            visible: false,
        })
    }

    handleSearchText = (e) => {
        this.setState({
            searchUrlName: e.target.value,
        }, () => this.getUrlClass());
    }

    handleSearchBtn = () => {
        this.getUrlClass();
    }

    handleShowModal = () => {
        console.log(moment.duration(moment('2013-02-08 09:30:26')).seconds());
        this.setState({
            visible: true,
        });
    }

    handleOkModal = () => {
        this.addUrlClass();
    }

    handleCancelModal = () => {
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

    handleModalTags = (value) => {
        console.log(value)
        this.setState({
            firendUrlTag: value
        });
    }

    handlePageChange = (page) => {
        console.log(page);
        this.setState({ nowPage: page }, () => this.getUrlClass());
    }


    render() {
        return (
        <div style={{ flex: 1, padding: "10px" }}>
            <Card title="友情链接" >
                <Input size="small" onChange={this.handleSearchText} placeholder="友链名称" style={{ height:30 , width:150 }}/>
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
                    >
                    <div>
                        友链名称：<Input size="small" style={{height:30 , width:300}} onChange={this.handleModalUrlName} />
                    </div>
                    <div className="modalInput">
                        友链网址：<Input size="small"  style={{ height:30 , width:300 }} onChange={this.handleModalUrlAddress} />
                    </div>
                    <div className="modalInput">
                        类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：
                        <Select defaultValue="个人博客" style={{ width: 150 }} 
                            onChange={this.handleModalTags} >
                            { this.state.urlTagsModal }
                        </Select>
                    </div>
                    </Modal>
                </div>
                <Table 
                    bordered
                    columns={columns}
                    dataSource={data}
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