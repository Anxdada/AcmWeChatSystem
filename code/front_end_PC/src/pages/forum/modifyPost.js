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

// 判断第一张是否换图或者删除.. 
function checkFirstImgIsExist(s, substr) {
    return s.indexOf(substr);
}

function replaceString(s) {
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

        if (this.props.editorContentText.length == 0) {
            message.error('公告内容不能为空!');
            return ;
        }

        let labels = 0;
        for (let i = 0 ; i < this.state.updateLabel.length ; ++ i) {
            labels |= 1 << this.state.updateLabel[i];
        }

        Fetch.requestPost({
            url: UpdatePost,
            info: 'postId='+this.props.id+'&postTitle='+this.props.postTitle+'&postTag='+labels
                    +'&postBody='+encodeURI(replaceString(this.props.editorContent))+'&firstImg='+this.props.firstImg,
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
                    <Button style={{ marginTop: 5 }} type="primary" onClick={this.handlePublish}>修改并发布</Button>
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
            firstImg: '',
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
                    this.state.editor.txt.html(data.resultBean.postBody);
                    this.setState({
                        postTitle: data.resultBean.postTitle,
                        editorContent: data.resultBean.postBody,
                        editorContentText: this.state.editor.txt.text(),
                        postTag: data.resultBean.postTag,
                        firstImg: data.resultBean.firstImg,
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

        const {editorContent, editorContentText, firstImg } = this.state;

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
                    <ModifyPostPublishView id={this.props.id} postTitle={this.state.postTitle} editorContent={editorContent} 
                        editorContentText={editorContentText} postTag={this.state.postTag} handleIsChange={this.props.handleIsChange}
                        history={this.props.history} firstImg={firstImg}
                    />
                </Col>
            </Row>
            </div>
        );
    }

    componentDidMount() {
        const elem = this.refs.editorElem;
        const editor = new E(elem);
        this.setState({
            editor: editor,
        });

        // 只要第一张图
        let tmpFirstImg = this.state.firstImg; // 异步请求的原因, 初始一定为空, 后面的判断逻辑就会出问题.

        editor.customConfig.uploadImgShowBase64 = true   // 使用 base64 保存图片
        editor.customConfig.uploadFileName = 'myFileName';
        editor.customConfig.uploadImgServer = UploadImg;
        editor.customConfig.uploadImgHooks = { 
            customInsert: function (insertImg, result, editor) { 
                var url =result.data; 
                insertImg(url);
                if (tmpFirstImg == '') tmpFirstImg = url;
            } 
        };
    
        // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
        editor.customConfig.onchange = html => {
            if (tmpFirstImg == '') tmpFirstImg = this.state.firstImg; // 这个就是用来初始化时赋值的, 上面那种方法赋值有问题
            // 检测第一张图是否被替换(删除后又上传另一张)或者删除.
            let res = checkFirstImgIsExist(html, tmpFirstImg);
            if (res == -1) tmpFirstImg = '';
            this.setState({
                editorContent: html,
                editorContentText: editor.txt.text(),
                firstImg: tmpFirstImg,
            })
            // console.log('xierenyi' + this.state.firstImg);
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