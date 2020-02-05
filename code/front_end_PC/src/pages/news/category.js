import React from 'react';
import { Modal, Table, Popconfirm, Divider, Select, Input, DatePicker, Card, Button, Pagination } from 'antd';
import { SketchPicker } from 'react-color';
import './index.less';


class TagsModify extends React.Component {
    state = { 
        visibleModal: false,
        visibleColorPicker: false,
    }

    constructor(props) {
        super(props);
        this.state = {
            tagId: '',
            tagName: '',
            colorInPicker: '',
            tagColor: ''
        }
    }

    handleShowModal = () => {
        this.setState({
            visibleModal: true,
        });
    }

    handleOkModal = (e) => {
        console.log(e);
        this.updateTagData();
        this.setState({
            tagColor: this.state.colorInPicker,
        })
    }

    handleCancelModal = (e) => {
        console.log(e);
        this.setState({
            visibleModal: false,
            colorInPicker: this.state.tagColor,
            visibleColorPicker: false,
        });
    }

    componentDidMount() {
        this.getTagData();
    }

    getTagData() {
        this.setState({
            tagsId: 1,
            tagName: '样例',
            tagColor: '#3ce016',
            colorInPicker: '#3ce016',
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

    updateTagData() {

        console.log(this.state.friendUrlCreateTime);

        this.setState({
            visibleModal: false,
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
        this.setState({ colorInPicker });
    }

    render(){
        console.log(this.state.modifyUrlId)
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
            >
            <div>
                类别名称：<Input size="small" style={{ height:30 , width:300 }} onChange={this.handleModalTagName} 
                            value={this.state.tagName} />
            </div>
            <div className="modalInput">
                类别颜色: <Button style={{ width: 100, height: 30, backgroundColor: this.state.colorInPicker }} 
                            onClick={this.handleModalTagColorBtn} className="modalBtn" />(点击出颜色选择器)
                { 
                    this.state.visibleColorPicker == true ?
                        <SketchPicker color={this.state.colorInPicker}  onChange={this.handleModalColorPickerChange} />
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
        this.state = {
            
        }
        this.columns = [
            {
                title: '类别名称',
                dataIndex: 'tagName',
                key: 'tagName',
            },
            {
                title: '类别颜色',
                dataIndex: 'tagColor',
                key: 'tagColor',
                render: (text, record) => (
                    <div style={{ width: '100px', height: '30px', backgroundColor: text }} />
                ),
            },
            {
                title: '创建人',
                dataIndex: 'createStaff',
                key: 'createStaff',
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <span>
                        <TagsModify tagId={record.tagId} />
                        <Divider type="vertical" />
                        <Popconfirm title="确定删除?" onConfirm={() => this.handleDeleteTag(text)} okText="确定" cancelText="取消">
                            <a className="deleteHerf">删除</a>
                        </Popconfirm>
                    </span>
                ),
            },
        ]
        this.data = [
            {
                tagName: '时事新闻',
                tagColor: '#3ce016',
                createStaff: '超级管理员'
            },
            {
                tagName: '竞赛',
                tagColor: '#e01639',
                createStaff: '超级管理员'
            },
            {
                tagName: '获奖',
                tagColor: '#16e0c4',
                createStaff: '超级管理员'
            },
            {
                tagName: '未分类',
                tagColor: '#16c4e0',
                createStaff: '超级管理员'
            },
        ]
    }

    handleDeleteTag = (value) => {
        console.log(value);
    }

    render() {
        return (
            <div>
                <Table columns={this.columns} dataSource={this.data} pagination={false} />
            </div>
        );
    }
}


class TagsView extends React.Component {

    state = {
        visibleColorPicker: false,
    }

    constructor(props) {
        super(props);
        this.state = {
            nowPage: 1,
            totalPage: 1,
            pageSize: 10,
            tableData: [],
            tagSearchText: '',
            tagAddName: '',
            tagAddColor: '#19b8e2',
        }
    }

    handleSearchText = (e) => {
        console.log(e);
        this.setState({ 
            tagSearchText: e.target.value 
        }, () => this.getTagData());
    }

    handleSearchBtn = () => {
        this.getTagData();
    }

    handleAddTagText = (e) => {
        this.setState({ 
            tagAddName: e.target.value,
        });
    }

    handleAddTagBtn = () => {
        this.updateTagData();
        this.setState({ 
            tagAddName: '',
            tagAddColor: '#19b8e2',
            visibleColorPicker: false,
        });
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

    getTagData() {
        console.log('重新后台获取tag数据');
    }

    updateTagData() {
        console.log('新增一个tag数据');
    }


    render() {
        return (
            <div>
                <Card title="新闻类别">
                    <div>
                        <Input size="small" onChange={this.handleSearchText} placeholder="类别名称" style={{ height:30 , width:150 }}/>
                        &nbsp;&nbsp;<Button type="primary" shape="circle" icon="search" onClick={ this.handleSearchBtn }/>


                        <Button type="primary" onClick={ this.handleAddTagBtn } className="addTagBtn">添加</Button>
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
                    <TagsTable tableData={this.state.tableData} />
                    <div className="tablePage">
                        <Pagination size="small" simple onChange={this.handlePageChange} total={this.state.totalPage*this.state.pageSize}
                        pageSize={this.state.pageSize} defaultCurrent={this.state.nowPage} showQuickJumper />
                    </div>
                </Card>
            </div>
        );
    }
}

export default class CategoryNews extends React.Component {
    render() {
        return (
            <div>
                <TagsView />
            </div>
        );
    }
}