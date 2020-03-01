import React from 'react';
import E from 'wangeditor';
import './index.less';
import { Row, Col, Input, Button, Card, Select, Tag, message, notification, Modal } from 'antd';
import { AddPostUrl, SelectLabel, UploadImg } from './../../config/dataAddress';
import Fetch from './../../fetch';
import { EventEmitter2 } from 'eventemitter2';
import { Prompt } from 'react-router-dom';


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

class AddPostPublishView extends React.Component {

    state = {
        loading: false,
    }

    constructor(props) {
        super(props);
        this.state = {
            postTag: [],
            allLabel: [],
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
                    this.setState({
                        allLabel: data.resultBean.items,
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

    addPostData() {
        
        if (this.props.postTitle.length == 0) {
            message.error('帖子标题不能为空!');
            return ;
        }
        if (this.props.postTitle.length > 20) {
            message.error('帖子标题过长!');
            return ;
        }

        // wangediter 有个bug就是必须聚焦到内容框才能检测出由内容, 不然里面的内容就是无
        // 添加的时候必会点进去, 所以这里可以用
        if (this.props.editorContentText.length == 0) {
            message.error('帖子内容不能为空!');
            return ;
        }

        if (this.state.postTag.length == 0) {
            message.error('请选择帖子的标签!');
            return ;
        }

        let labels = 0;
        for (let i = 0 ; i < this.state.postTag.length ; ++ i) {
            labels |= 1 << this.state.postTag[i];
        }

        this.setState({
            loading: true,
        });

        Fetch.requestPost({
            url: AddPostUrl,
            info: 'postTitle='+this.props.postTitle+'&postBody='+encodeURI(getString(this.props.editorContent))
                    +'&postTag='+labels,
            timeOut: 3000,
        }).then(
            data => {
                if (data.status == 0) {
                    message.success('发布帖子成功!');
                    this.setState({
                        postTag: [],
                    }, () => this.props.refresh());
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

        this.setState({
            loading: false,
        });
    }

    handleSelectLabel = (value) => {
        this.setState({
            postTag: value,
        })
    }

    handlePublish = () => {
        this.addPostData();       
    }
        

    render() {
        return (
            <div className="publishView">
                <Card title="发帖参数配置">
                    <Select
                        mode="multiple"
                        value={this.state.postTag}
                        style={{ width: '100%' }}
                        placeholder="帖子的标签"
                        onChange={this.handleSelectLabel}
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
                    <Button type="primary" onClick={this.handlePublish}>发布</Button>
                </Card>
            </div>
        );
    }
}

class AddPostEditView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            postTitle: '',
            editor: '',
            editorContent: '',
            editorContentText: '',
        }
    }

    refresh = () => {
        this.state.editor.txt.clear()
        this.setState({
            postTitle: '',
            editor: '',
            editorContent: '',
            editorContentText: '',
        })
    }

    handleAddPostTitle = (e) => {
        this.setState({
            postTitle: e.target.value,
        })
    }

    render() {
        return (
          <div style={{ flex: 1 }}>
            <Row>
                <Col span={18}>
                    <Card title="添加帖子" >
                        <div>
                        <Input size="small" placeholder="帖子标题" style={{ height:30, width: 400 }} allowClear
                             onChange={this.handleAddPostTitle} value={this.state.postTitle} />
                        </div><br />
                        <div ref="editorElem" className="toolbar" />
                    </Card>
                </Col>
                <Col span={6} >
                    <AddPostPublishView postTitle={this.state.postTitle} editorContent={this.state.editorContent} 
                        editorContentText={this.state.editorContentText} refresh={this.refresh}
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
                editorContent: html
            })
            this.setState({editorContentText: editor.txt.text()})
        }
        editor.create()
    }
}


export default class AddPost extends React.Component {

    render() {
        return (
            
            <div>
                <Prompt message={"离开该页面, 不会保存该页面的信息和内容. 是否离开?"} />
                <AddPostEditView />]
            </div>
            
            
        );
    }
} 