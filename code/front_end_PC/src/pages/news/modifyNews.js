import React from 'react';
import E from 'wangeditor';
import './index.less';
import { DatePicker, Row, Col, Input, Button, Card, Select, Tag, message, notification, } from 'antd';
import { connect } from 'react-redux';
import { switchMenu, addMenu } from './../../redux/actions'; 
import { DetailNewsUrl, SelectNewsTag, UploadImg, UpdateNews } from './../../config/dataAddress';
import cookie from 'react-cookies';
import Fetch from './../../fetch';


const { Option } = Select;


// 判断第一张是否换图或者删除.. 
function checkFirstImgIsExist(s, substr) {
    return s.indexOf(substr);
}

function getString(s) {
    s=s.replace(/\+/g, "%2B");
    s=s.replace(/&/g, "%26");

    return s;
}

class ModifyNewsPublishView extends React.Component {

    state = { 
        loading: false,
    }

    constructor(props) {
        super(props);
        this.state = {
            newsId: '',
            newsTagId: '',
            newsTagName: '',
            isPublish: '',
            allTag: [],
        }
    }

    componentWillMount() {
        this.getTagData();
        this.getSingleNewsData();
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

    getSingleNewsData() {
        Fetch.requestPost({
            url: DetailNewsUrl,
            info: 'newsId='+this.props.id,
            timeOut: 3000,
        }).then (
            data => {
                // console.log(data);
                if (data.status == 0) {
                    this.setState({
                        newsId: data.resultBean.newsId,
                        newsTagId: data.resultBean.newsTagId,
                        newsTagName: data.resultBean.newsTagName,
                        isPublish: data.resultBean.isPublish,
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

    updateSingleData(type) {
        
        if (this.props.newsTitle.length == 0) {
            message.error('新闻标题不能为空!');
            return ;
        }
        if (this.props.newsTitle.length > 20) {
            message.error('新闻标题过长!');
            return ;
        }

        if (this.props.editorContentText.length == 0) {
            message.error('公告内容不能为空!');
            return ;
        }

        this.setState({
            loading: true,
        });

        Fetch.requestPost({
            url: UpdateNews,
            info: 'newsId='+this.state.newsId+'&newsTitle='+this.props.newsTitle
                    +'&newsBody='+encodeURI(getString(this.props.editorContent))
                    +'&newsTagId='+this.state.newsTagId+'&isPublish='+type+'&firstImg='+this.props.firstImg,
            timeOut: 3000,
        }).then(
            data => {
                if (data.status == 0) {
                    message.success('修改成功');
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
        this.updateSingleData(type);
    }

    render() {
        return (
            <div className="publishView" >
                <Card title="发布配置" >
                    &nbsp;&nbsp;&nbsp;&nbsp;类别:&nbsp;&nbsp;
                    <Select value={ this.state.newsTagName } style={{ width: 150 }}
                        onChange={this.handlePublishTag} palceholder="新闻类别" >
                        {
                            this.state.allTag.map((item) =>
                                <Option value={item.newsTagName}>
                                    <Tag color={item.newsTagColor} key={item.newsTagName} > {item.newsTagName} </Tag>
                                </Option>
                            )
                        }
                    </Select>
                    {
                        this.state.isPublish == 1 ? null :
                        <Button type="dashed" onClick={() => this.handlePublish(0)} loading={this.state.loading}> 存为草稿 </Button>
                    }
                    <Button type="primary" onClick={() => this.handlePublish(1)} loading={this.state.loading}>修改并发布</Button>
                </Card>
            </div>
        );
    }
}

class ModifyNewsEditView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            newsTitle: '',
            editor: '',
            editorContent: '',
            editorContentText: '',
            firstImg: '',
        }
    }

    componentWillMount() {
        this.getData();
    }

    getData() {
        Fetch.requestPost({
            url: DetailNewsUrl,
            info: 'newsId='+this.props.id,
            timeOut: 3000,
        }).then ( 
            data => {
                if (data.status == 0) {
                    this.state.editor.txt.html(data.resultBean.newsBody)
                    this.setState({
                        newsTitle: data.resultBean.newsTitle,
                        editorContent: data.resultBean.newsBody,
                        editorContentText: this.state.editor.txt.text(),
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
            // 可能时不时会出现超时出错的情况, 实际没问题, 等几分钟再试试就行
            message.error('连接超时! 请检查服务器是否启动.');
        });
    }

    handleModifyNewsTitle = (e) => {
        this.setState({
            newsTitle: e.target.value,
        })
    }


    render() {

        const {editorContent, editorContentText, firstImg } = this.state;

        return (
          <div style={{ flex: 1, padding: "10px" }}>
            <Row>
                <Col span={18}>
                    <Card title="修改新闻" >
                    <div>
                    <Input value={this.state.newsTitle} size="small" placeholder="新闻标题" allowClear
                        style={{ height:30, width: 400 }} onChange={this.handleModifyNewsTitle}/>
                    </div><br />
                    <div ref="editorElem" className="toolbar" />
                    </Card>
                </Col>
                <Col span={6} >
                    <ModifyNewsPublishView id={this.props.id} newsTitle={this.state.newsTitle} 
                        editorContent={editorContent} editorContentText={editorContentText} firstImg={firstImg}
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
            if (tmpFirstImg == '') tmpFirstImg = this.state.firstImg;
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


class ModifyNews extends React.Component {

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
            {
                title: '修改新闻',
                key: 'none',
            }
        ];
        dispatch(switchMenu(titleArray));
    }

    render() {
        return (
            <div>
                <ModifyNewsEditView id={this.props.match.params.id} />
            </div>
        );
    }
}

export default connect()(ModifyNews);

