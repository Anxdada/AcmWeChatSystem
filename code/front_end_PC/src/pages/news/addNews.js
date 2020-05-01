import React from 'react';
import E from 'wangeditor';
import './index.less';
import { DatePicker, Row, Col, Input, Button, Card, Select, Tag, message, notification } from 'antd';
import { AddNewsUrl, UploadImg, SelectNewsTag } from './../../config/dataAddress';
import Fetch from './../../fetch';
import { EventEmitter2 } from 'eventemitter2';


const { Option } = Select;
const { TextArea } = Input;

var emitter = new EventEmitter2()


// 判断第一张是否换图或者删除.. 
function checkFirstImgIsExist(s, substr) {
    return s.indexOf(substr);
}

function getString(s) {
    s = s.replace(/\+/g, "%2B");
    s = s.replace(/&/g, "%26");
    return s;
}

class AddNewsPublishView extends React.Component {

    state = {
        loading: false,
    }

    constructor(props) {
        super(props);
        this.state = {
            newsTagId: '',
            newsTagName: undefined,
            isPublish: '',
            allTag: [],
        }
    }

    componentWillMount() {
        this.getTagData();
    }

    getTagData() {
        Fetch.requestPost({
            url: SelectNewsTag,
            info: 'pageSize=100',
            timeOut: 3000,
        }).then ( 
            data => {
                // console.log(data);
                if (data.status == 0) {
                    this.setState({
                        allTag: data.resultBean.items
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
        ).catch( err => {
            // console.log("err", err);
            message.error('连接超时! 请检查服务器是否启动.');
        });
    }

    addNewsData(type) {
        
        if (this.props.newsTitle.length == 0) {
            message.error('新闻标题不能为空!');
            return ;
        }
        if (this.props.newsTitle.length > 50) {
            message.error('新闻标题过长!');
            return ;
        }

        // wangediter 有个bug就是必须聚焦到内容框才能检测出由内容, 不然里面的内容就是无
        // 添加的时候必会点进去, 所以这里可以用
        if (this.props.editorContentText.length == 0) {
            message.error('新闻内容不能为空!');
            return ;
        }

        if (this.state.newsTagId == 0) {
            message.error('请选择类别!');
            return ;
        }

        this.setState({
            loading: true,
        });

        // console.log(this.props.firstImg);

        Fetch.requestPost({
            url: AddNewsUrl,
            info: 'newsTitle='+this.props.newsTitle+'&newsBody='+encodeURI(getString(this.props.editorContent))
                    +'&newsTagId='+this.state.newsTagId+'&isPublish='+type+'&firstImg='+this.props.firstImg,
            timeOut: 3000,
        }).then(
            data => {
                if (data.status == 0) {
                    if (!type) message.success('新闻草稿存储成功!');
                    else message.success('发布新闻成功!');
                    this.setState({
                        newsTagId: '',
                        newsTagName: undefined,
                        isPublish: '',
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

    handlePublishTag = (value) => {
        if (typeof value === "undefined") {
            this.setState({
                newsTagName: undefined,
                newsTagId: '',
            })
            return ;
        }
        const tags = this.state.allTag;
        for (let i in tags) {
            if (tags[i].newsTagName == value) {
                this.setState({
                    newsTagId: tags[i].newsTagId,
                    newsTagName: value,
                })
                break;
            }
        }
    }

    handlePublish = (type) => {
        this.addNewsData(type);
    }

    render() {
        return (
            <div className="publishView" >
                <Card title="发布配置" >
                    &nbsp;&nbsp;&nbsp;&nbsp;类别:&nbsp;&nbsp;
                    <Select value={ this.state.newsTagName } style={{ width: 150 }} 
                        onChange={this.handlePublishTag} allowClear placeholder="新闻类别" >
                        {
                            this.state.allTag.map((item) =>
                                <Option value={item.newsTagName} key={item.newsTagId}>
                                    <Tag color={item.newsTagColor} key={item.newsTagName} > {item.newsTagName} </Tag>
                                </Option>
                            )
                        }
                    </Select>
                    <div style={{ marginTop: 5}} >
                        <Button style={{ marginLeft: 8}} type="primary" onClick={() => this.handlePublish(1)} loading={this.state.loading}>发布</Button>
                        <Button style={{ marginLeft: 5}} type="dashed" onClick={() => this.handlePublish(0)} loading={this.state.loading}> 
                            存为草稿 
                        </Button>
                    </div>
                </Card>
            </div>
        );
    }
}


class AddNewsEditView extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            newsTitle: '',
            editorContent: '',
            editorContentText: '',
            firstImg: '',
        }
    }

    refresh = () => {
        this.state.editor.txt.clear()
        this.setState({
            newsTitle: '',
            editorContent: '',
            editorContentText: '',
            firstImg: '',
        })
    }

    handleAddNewsTitle = (e) => {
        this.setState({
            newsTitle: e.target.value,
        })
    }

    render() {

        const {editorContent, editorContentText, firstImg } = this.state;

        return (
          <div style={{ flex: 1 }}>
            <Row>
                <Col span={18}>
                    <Card title="添加新闻" >
                        <div>
                        <TextArea style={{ width: 600 }} placeholder="新闻标题" allowClear autoSize
                             onChange={this.handleAddNewsTitle} value={this.state.newsTitle} />
                        </div><br />
                        <div ref="editorElem" className="toolbar" />
                    </Card>
                </Col>
                <Col span={6} >
                    <AddNewsPublishView newsTitle={this.state.newsTitle} editorContent={editorContent} 
                        editorContentText={editorContentText} refresh={this.refresh} firstImg={firstImg}
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

        // 只要第一张图
        let tmpFirstImg = this.state.firstImg;

        editor.customConfig.zIndex = 0;  // 防止wangeditor遮挡antd组件
        editor.customConfig.uploadImgShowBase64 = true   // 使用 base64 保存图片
        editor.customConfig.uploadFileName = 'myFileName';
        editor.customConfig.uploadImgServer = UploadImg;
        editor.customConfig.uploadImgHooks = { 
            customInsert: function (insertImg, result, editor) { 
                var url = result.data;
                insertImg(url);
                if (tmpFirstImg == '') tmpFirstImg = url;
            }
        };
    
        // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
        editor.customConfig.onchange = html => {
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


export default class AddNews extends React.Component {
    render() {
        return (
            <div>
                <AddNewsEditView />
            </div>
        );
    }
}