import React from 'react';
import { Icon, message, notification } from 'antd';
import { NavBar, TextareaItem, Toast } from 'antd-mobile';
import E from 'wangeditor';
import { UpdatePost, UploadImg, DetailPostUrl } from './../../config/dataAddress';
import Fetch from './../../fetch';

function checkFirstImgIsExist(s, substr) {
    return s.indexOf(substr);
}

function replaceString(s) {
    s = s.replace(/\+/g, "%2B");
    s = s.replace(/&/g, "%26");
    return s;
}

export default class MobileModifyPostPage extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            postTitle: '',
            editorContent: '',
            editorContentText: '',
            firstImg: '',
        }
    }

    componentWillMount() {
        this.getPostData();
    }

    getPostData() {
        Fetch.requestPost({
            url: DetailPostUrl,
            info: 'postId='+this.props.match.params.id,
            timeOut: 3000,
        }).then ( 
            data => {
                if (data.status == 0) {
                    this.state.editor.txt.html(data.resultBean.postBody);
                    this.setState({
                        postTitle: data.resultBean.postTitle,
                        editorContent: data.resultBean.postBody,
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
            message.error('连接超时! 请检查服务器是否启动.');
        });
    }

    updatePostData() {
        // console.log(this.state.firstImg);
        if (this.state.postTitle == 0) {
            message.error('帖子标题不能为空!');
            return ;
        }
        if (this.state.postTitle.length > 50) {
            message.error('帖子标题过长!');
            return ;
        }

        if (this.state.editorContentText.length == 0) {
            message.error('帖子内容不能为空!');
            return ;
        }


        Fetch.requestPost({
            url: UpdatePost,
            info: 'postId='+this.props.match.params.id+'&postTitle='+this.state.postTitle
                    +'&postBody='+encodeURI(replaceString(this.state.editorContent))
                    +'&firstImg='+this.state.firstImg,
            timeOut: 3000,
        }).then(
            data => {
                if (data.status == 0) {
                    this.props.history.push('/mobile/forum/modifyResult/'+this.props.match.params.id);
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

    componentDidMount() {
        const elem = this.refs.editorElem;
        const editor = new E(elem);
        this.setState({ 
            editor 
        });
        editor.customConfig.uploadImgShowBase64 = false   // 使用 base64 保存图片
        editor.customConfig.uploadFileName = 'myFileName';
        editor.customConfig.uploadImgServer = UploadImg;
        editor.customConfig.menus = [
            'head',  // 标题
            'bold',  // 粗体
            'fontSize',  // 字号
            'italic',  // 斜体
            'foreColor',  // 文字颜色
            'list',  // 列表
            'quote',  // 引用
            'image',  // 插入图片
            'emoticon',  // 表情
            'undo',  // 撤销
            'redo'  // 重复
        ];
        
        // 只要第一张图
        let tmpFirstImg = this.state.firstImg;
        // console.log(tmpFirstImg);
        editor.customConfig.uploadImgHooks = { 
            customInsert: function (insertImg, result, editor) { 
                var url =result.data; 
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
            });
        }
        editor.create()
    }

    handleChangPostTitle = (value) => {
        this.setState({
            postTitle: value,
        })
    }

	render() {
		return(
            <div>
                <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={() =>  window.history.back(-1)}
                    rightContent={<span style={{ fontSize: 13 }} onClick={() => this.updatePostData()}>下一步</span>}
                >发表帖子</NavBar>
                
                <TextareaItem
                    placeholder="一句话描述下你的帖子~"
                    data-seed="logId"
                    ref={el => this.autoFocusInst = el}
                    autoHeight
                    value={this.state.postTitle}
                    onChange={this.handleChangPostTitle}
                />

                <div style={{ backgroundColor: '#ffffff' }}>
                    <div ref="editorElem" className="toolbar" />
                </div>
            </div>
		);
	}
}