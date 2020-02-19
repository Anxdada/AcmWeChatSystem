import React from 'react';
import { Modal, Table, Popconfirm, Divider, Select, Input, DatePicker, Card, Button, Pagination , message, notification, Spin} from 'antd';
import { SketchPicker } from 'react-color';
import './index.less';
import { AddAnnouncementTag, DeleteAnnouncementTag, UpdateAnnouncementTag, SelectAnnouncementTag, DetailAnnouncementTag } from './../../config/dataAddress';
import cookie from 'react-cookies';
import { EventEmitter2 } from 'eventemitter2';


var emitter = new EventEmitter2(); 

class TagsModify extends React.Component {
    state = { 
        visibleModal: false,
        visibleColorPicker: false,
        submitting: false,
    }

    constructor(props) {
        super(props);
        this.state = {
            tagId: '',
            tagName: '',
            tagColor: '',
        }
    }

    handleShowModal = () => {
        this.setState({
            visibleModal: true,
        }, () => this.getSingleTagData());
    }

    handleOkModal = (e) => {
        console.log(e);
        this.setState({
            submitting: true,
        }, () => this.updateSingleTagData());
    }

    handleCancelModal = (e) => {
        console.log(e);
        this.setState({
            visibleModal: false,
            visibleColorPicker: false,
        });
    }

    getSingleTagData() {
        fetch(DetailAnnouncementTag, {
            method: 'POST',
            headers: {
                'Authorization': cookie.load('token'),
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
            },
            body:'announcementTagId='+this.props.tagId
        }).then(res => res.json()).then(
            data => {
                console.log(data);
                if (data.status == 0) {
                    this.setState({
                        tagId: data.resultBean.announcementTagId,
                        tagName: data.resultBean.announcementTagName,
                        tagColor: data.resultBean.announcementTagColor,
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
        )
    }

    updateSingleTagData() {

        fetch(UpdateAnnouncementTag, {
            method: 'POST',
            headers: {
                'Authorization': cookie.load('token'),
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
            },
            body:'announcementTagId='+this.state.tagId+'&announcementTagName='+this.state.tagName
                    +'&announcementTagColor='+this.state.tagColor
        }).then(res => res.json()).then(
            data => {
                if (data.status == 0) {
                    this.setState({
                        visibleModal: false,
                    })
                    message.success('更新成功');
                    emitter.emit("refresh", "更新");
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
                    submitting: false,
                })
            }
        )
    } 

    handleModalTagName = (e) => {
        console.log(e)
        this.setState({
            tagName: e.target.value
        });
    }

    handleModalTagColorBtn = (value) => {
        console.log(value);
        this.setState({
            visibleColorPicker: !this.state.visibleColorPicker,
        });
    }

    handleModalColorPickerChange = (value)=>{
        let colorInPicker = value.hex;
        console.log(colorInPicker);
        this.setState({ 
            tagColor: colorInPicker 
        });
    }

    render(){
        // console.log(this.props.tagId)
        return (
        <span>
            <a onClick={ this.handleShowModal }> 修改 </a>
            <Modal
                title="修改类别"
                visible={this.state.visibleModal}
                onOk={this.handleOkModal}
                onCancel={this.handleCancelModal}
                okText="确认修改"
                cancelText="取消"
                okButtonProps={{
                    loading: this.state.submitting,
                }}
                cancelButtonProps={{
                    disabled: this.state.submitting,
                }}
            >
            <div>
                类别名称：<Input size="small" style={{ height:30 , width:200 }} onChange={this.handleModalTagName} 
                            value={this.state.tagName} />
            </div>
            <div className="modalInput">
                类别颜色: <Button style={{ width: 100, height: 30, backgroundColor: this.state.tagColor }} 
                            onClick={this.handleModalTagColorBtn} className="modalBtn"/><span className="suggestion">(点击出颜色选择器)</span>
                { 
                    this.state.visibleColorPicker == true ?
                        <SketchPicker color={this.state.tagColor}  onChange={this.handleModalColorPickerChange} />
                        :null
                }
            </div>
            </Modal>
        </span>
        )
    }
}


class TagsTable extends React.Component {

    constructor(props) {
        super(props);
        this.columns = [
            {
                title: '类别名称',
                dataIndex: 'announcementTagName',
                key: 'announcementTagName',
            },
            {
                title: '类别颜色',
                dataIndex: 'announcementTagColor',
                key: 'announcementTagColor',
                render: (text, record) => (
                    <div style={{ width: '100px', height: '30px', backgroundColor: text }} />
                ),
            },
            {
                title: '最近一次更新时间',
                dataIndex: 'updateTime',
                key: 'updateTime',
            },
            {
                title: '更新人',
                dataIndex: 'updateUser',
                key: 'updateUser',
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <span>
                        <TagsModify tagId={record.announcementTagId} />
                        <Divider type="vertical" />
                        <Popconfirm title="确定删除?" onConfirm={() => this.handleDelete(record.announcementTagId)} okText="确定" cancelText="取消">
                            <a className="deleteHerf">删除</a>
                        </Popconfirm>
                    </span>
                ),
            },
        ]
        this.data = [
            {
                tagName: '讲座',
                tagColor: '#3ce016',
                createStaff: '超级管理员'
            },
            {
                tagName: '个人训练赛',
                tagColor: '#e01639',
                createStaff: '超级管理员'
            },
            {
                tagName: '组队训练赛',
                tagColor: '#16e0c4',
                createStaff: '超级管理员'
            },
            {
                tagName: '校赛',
                tagColor: '#16c4e0',
                createStaff: '超级管理员'
            },
            {
                tagName: '会议',
                tagColor: '#d7e016',
                createStaff: '超级管理员'
            },
        ]
    }

    handleDelete = (announcementTagId) => {
        // console.log(announcementTagId);

        fetch(DeleteAnnouncementTag, {
            method: 'POST',
            headers: {
                'Authorization': cookie.load('token'),
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
            },
            body:'announcementTagId='+announcementTagId
        }).then(res => res.json()).then(
            data => {
                if (data.status == 0) {
                    message.success("删除成功!");
                    emitter.emit("refresh", "删除")
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

    render() {
        return (
            <div>
                <Spin spinning={this.props.loading}>
                    <Table columns={this.columns} dataSource={this.props.allTagData} pagination={false} />
                </Spin>
            </div>
        );
    }
}


class TagsView extends React.Component {

    state = {
        visibleColorPicker: false,
        submitting: false,
        loading: true,
    }

    constructor(props) {
        super(props);
        this.state = {
            nowPage: 1,
            totalPage: 1,
            pageSize: 5,
            allTagData: [],
            tagSearchName: '',
            tagAddName: '',
            tagAddColor: '#19b8e2', 
        } // 初始值

        emitter.on("refresh", this.refresh.bind(this));
    }

    componentWillMount() {
        this.getTagData();
    }

    refresh = (msg) => {
        this.setState({
            tagSearchName: '',
            tagAddName: '',
            tagAddColor: '#19b8e2',
        }, () => this.getTagData());
    }

    getTagData() {

        fetch(SelectAnnouncementTag, {
            method: 'POST',
            headers: {
                'Authorization': cookie.load('token'),
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
            },
            body:'announcementTagName='+this.state.tagSearchName
                    +'&pageNum='+this.state.nowPage+'&pageSize='+this.state.pageSize
        }).then(res => res.json()).then(
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
                        allTagData: data.resultBean.items,
                    });
                } else {
                    this.setState({
                        nowPage: 1,
                        totalPage: 1,
                        allTagData: []
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
                this.setState({
                    loading: false,
                })
            }
        )
    }

    addTagData() {
        if (this.state.tagAddName == 0) {
            message.error("类别名称不能为空!");
            return ;
        }
        
        fetch(AddAnnouncementTag, {
            method: 'POST',
            headers: {
                'Authorization': cookie.load('token'),
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
            },
            body:'announcementTagName='+this.state.tagAddName+'&announcementTagColor='+this.state.tagAddColor
        }).then(res => res.json()).then(
            data => {
                if (data.status == 0) {
                    message.success("添加成功!");
                    emitter.emit("refresh", "添加")
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
                    submitting: false,
                })
            }
        )
    }


    handleSearchTagName = (e) => {
        // console.log(e.target.value);
        this.setState({ 
            tagSearchName: e.target.value 
        }, () => this.getTagData());
    }

    handleAddTagText = (e) => {
        this.setState({ 
            tagAddName: e.target.value,
        });
    }

    handleAddTagBtn = () => {
        this.setState({
            submitting: true,
        }, () => this.addTagData());
    }

    handleAddTagColorBtn = () => {
        this.setState({
            visibleColorPicker: !this.state.visibleColorPicker,
        })
    }

    handleAddColorPickerChange = (value) => {
        let tagAddColor = value.hex;
        console.log(tagAddColor);
        this.setState({ tagAddColor });
    }

    handlePageChange = (page) => {
        console.log(page);
        this.setState({ nowPage: page }, () => this.getTagData());
    }

    render() {
        return (
            <div>
                <Card title="公告类别">
                    <div>
                        <Input size="small" onChange={this.handleSearchTagName} placeholder="类别名称" style={{ height:30 , width:150 }}/>

                        <Button type="primary" onClick={ this.handleAddTagBtn } className="addTagBtn" loading={this.state.submitting} >添加</Button>
                        <Input size="small" onChange={this.handleAddTagText} placeholder="类别名称" className="addTagInput" value={this.state.tagAddName} />
                        &nbsp;&nbsp;色值
                        <Button style={{ width: 100, height: 30, backgroundColor: this.state.tagAddColor, }} 
                            onClick={this.handleAddTagColorBtn} />
                        { 
                            this.state.visibleColorPicker == true ?
                                <SketchPicker color={this.state.tagAddColor}  onChange={this.handleAddColorPickerChange} />
                                :null
                        }
                    </div>
                    <TagsTable allTagData={this.state.allTagData} loading={this.state.loading} />
                    <div className="tablePage">
                        <Pagination size="small" simple onChange={this.handlePageChange} total={this.state.totalPage*this.state.pageSize}
                        pageSize={this.state.pageSize} defaultCurrent={this.state.nowPage} showQuickJumper />
                    </div>
                </Card>
            </div>
        );
    }
}

export default class CategoryAnnounce extends React.Component {
    render() {
        return (
            <div>
                <TagsView />
            </div>
        );
    }
}