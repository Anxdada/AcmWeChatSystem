import React from 'react';
import E from 'wangeditor';
import './index.less';
import { connect } from 'react-redux';
import { switchMenu, addMenu } from './../../redux/actions';
import { Row, Col, Input, Button, Card, Select, Tag, message, notification, Modal } from 'antd';
import { DetailPostUrl, UpdatePost, SelectLabel, UploadImg } from './../../config/dataAddress';
import Fetch from './../../fetch';
import { EventEmitter2 } from 'eventemitter2';
import { Prompt } from 'react-router-dom';
import {HashRouter as Router, Link, Redirect, Route} from 'react-router-dom';


const { Option } = Select;
var emitter = new EventEmitter2()


function getString(s) {
    s = s.replace(/\+/g, "%2B");
    s = s.replace(/&/g, "%26");
    return s;
}

const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

class ModifyPostPublishView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            allLabel: [],
            updateLabel: [],
        }
    }

    componentWillMount() {
        this.getLabelData();
    }

    getLabelData() {
        // 用于取出目前所有的标签
        Fetch.requestPost({
            url: SelectLabel,
            info: 'pageSize=100',
            timeOut: 3000,
        }).then ( 
            data => {
                if (data.status == 0) {
                    const allLabel = data.resultBean.items;
                    let updateLabel = [];
                    for (let i = 0 ; i < allLabel.length ; ++ i) {
                        if (!(this.props.postTag & (1<<allLabel[i].flag))) continue;
                        updateLabel.push(allLabel[i].flag);
                    }
                    this.setState({
                        allLabel,
                        updateLabel
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
        ).catch( err => {
            // console.log("err", err);
            message.error('连接超时! 请检查服务器是否启动.');
        });
    }

    updateSinglePostData() {

        if (this.props.postTitle.length == 0) {
            message.error('公告标题不能为空!');
            return ;
        }
        if (this.props.postTitle.length > 20) {
            message.error('公告标题过长!');
            return ;
        }

        // wangediter 有个bug就是必须聚焦到内容框才能检测出由内容, 不然里面的内容就是无
        if (this.props.editorContentText.length == 0) {
            message.error('公告内容不能为空或者未点击主编辑框!');
            return ;
        }

        if (this.state.updateLabel.length == 0) {
            message.error('请至少选择一个类别!');
            return ;
        }

        let labels = 0;
        for (let i = 0 ; i < this.state.updateLabel.length ; ++ i) {
            labels |= 1 << this.state.updateLabel[i];
        }

        Fetch.requestPost({
            url: UpdatePost,
            info: 'postId='+this.props.id+'&postTitle='+this.props.postTitle+'&postTag='+labels
                    +'&postBody='+encodeURI(getString(this.props.editorContent)),
            timeOut: 3000,
        }).then ( 
            data => {
                if (data.status == 0) {
                    message.success('修改成功');
                    this.props.handleIsChange(0);
                    // this.props.history.push(`${this.props.match.url.replace(/\/[^/]+$/, '')}/admin/home`);
                    // this.props.history.push(`/admin/forum/detail/${this.props.id}`);
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

    handleUpdateLabel = (value) => {
        // console.log(`selected ${value}`);
        // console.log(tags[0]);
        this.setState({
            updateLabel: value,
        }, () => this.props.handleIsChange(1));
    }

    handlePublish = () => {
        this.updateSinglePostData();
    }

    render() {
        return (
            <div className="publishView">
                <Card title="发帖参数配置">
                <Select
                        mode="multiple"
                        value={this.state.updateLabel}
                        style={{ width: '100%' }}
                        placeholder="帖子的标签"
                        onChange={this.handleUpdateLabel}
                        allowClear
                    >
                    {
                        this.state.allLabel.map((item) => 
                            <Option key={item.labelId} value={item.flag}>
                                <Tag color={item.labelColor} key={item.labelId} > {item.labelName} </Tag>
                            </Option>
                        )
                    }
                    </Select>
                    <Button type="primary" onClick={this.handlePublish}>修改并发布</Button>
                </Card>
            </div>
        );
    }
}

class ModifyPostEditView extends React.Component {

    state = {
        visible: false,
    }

    constructor(props) {
        super(props);
        this.state = {
            postTitle: '',
            editor: '',
            editorContent: '',
            editorContentText: '',
            postTag: 0,
        }
    }

    componentWillMount() {
        this.getData();
    }

    getData() {
        Fetch.requestPost({
            url: DetailPostUrl,
            info: 'postId='+this.props.id,
            timeOut: 3000,
        }).then ( 
            data => {
                // console.log(data);
                if (data.status == 0) {
                    this.setState({
                        postTitle: data.resultBean.postTitle,
                        editorContent: this.state.editor.txt.html(data.resultBean.postBody),
                        postTag: data.resultBean.postTag,
                    });
                }
                else {
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

    handleModifyPostTitle = (e) => {
        console.log(e);
        this.setState({
            postTitle: e.target.value,
        }, () => this.props.handleIsChange(1));
    }

    render() {
        return (
            <div style={{ flex: 1 }}>
            <Row>
                <Col span={18}>
                    <Card title="修改帖子" >
                        <div>
                        <Input size="small" placeholder="帖子标题" style={{ height:30, width: 400 }} allowClear
                             onChange={this.handleModifyPostTitle} value={this.state.postTitle} />
                        </div><br />
                        <div ref="editorElem" className="toolbar" />
                    </Card>
                </Col>
                <Col span={6} >
                    <ModifyPostPublishView id={this.props.id} postTitle={this.state.postTitle} editorContent={this.state.editorContent} 
                        editorContentText={this.state.editorContentText} postTag={this.state.postTag} handleIsChange={this.props.handleIsChange}
                        history={this.props.history}
                    />
                </Col>
            </Row>
            </div>
        );
    }

    componentDidMount() {
        const elem = this.refs.editorElem
        const editor = new E(elem)
        this.setState({
            editor: editor,
        })
        editor.customConfig.uploadImgShowBase64 = true   // 使用 base64 保存图片
        editor.customConfig.uploadFileName = 'myFileName';
        editor.customConfig.uploadImgServer = UploadImg;
        editor.customConfig.uploadImgHooks = { 
            customInsert: function (insertImg, result, editor) { 
                var url =result.data; 
                insertImg(url); 
            } 
        };
    
        // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
        editor.customConfig.onchange = html => {
            this.setState({
                editorContent: html,
                editorContentText: editor.txt.text(),
            }, () => this.props.handleIsChange(1));
        }
        editor.create()
    }
}

class ModifyPost extends React.Component {

    state = {
        mo: 0,
    }

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
            {
                title: '修改帖子',
                key: 'none',
            }
        ];
        dispatch(switchMenu(titleArray));
    }

    handleIsChange = (type) => {
        this.setState({
            mo: type,
        })
    }

    render() {
        return (
            <div>
                {
                    <Prompt message={"你当前的修改不会被保存, 请确认是否离开?"} />
                }
                <ModifyPostEditView id={this.props.match.params.id} handleIsChange={this.handleIsChange} 
                    history={this.props.history}
                />
            </div>
        );
    }
} 

export default connect()(ModifyPost);