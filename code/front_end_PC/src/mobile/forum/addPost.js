import React from 'react';
import { Icon, message, notification, Modal, Select, Tag } from 'antd';
import { NavBar, TextareaItem, Toast } from 'antd-mobile';
import E from 'wangeditor';
import { AddPostUrl, UploadImg, SelectLabel } from './../../config/dataAddress';
import Fetch from './../../fetch';

const { Option } = Select;

function checkFirstImgIsExist(s, substr) {
    return s.indexOf(substr);
}

function replaceString(s) {
    s = s.replace(/\+/g, "%2B");
    s = s.replace(/&/g, "%26");
    return s;
}

export default class MobileAddPostPage extends React.Component{

    state = {
        visible: false,
        submitting: false,
    }

    constructor(props) {
        super(props);
        this.state = {
            postTitle: '',
            editorContent: '',
            editorContentText: '',
            firstImg: '',
            allLabel: [],
            postLabel: [],
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
        if (this.state.postTitle == 0) {
            message.error('帖子标题不能为空!');
            return ;
        }
        if (this.state.postTitle.length > 50) {
            message.error('帖子标题过长!');
            return ;
        }

        // wangediter 有个bug就是必须聚焦到内容框才能检测出由内容, 不然里面的内容就是无
        // 添加的时候必会点进去, 所以这里可以用
        if (this.state.editorContentText.length == 0) {
            message.error('帖子内容不能为空!');
            return ;
        }

        if (this.state.postLabel.length == 0) {
            message.error('请至少选择一个标签!');
            return ;
        }

        this.setState({
            submitting: true,
        })

        let labels = 0;
        for (let i = 0 ; i < this.state.postLabel.length ; ++ i) {
            labels |= 1 << this.state.postLabel[i];
        }

        Fetch.requestPost({
            url: AddPostUrl,
            info: 'postTitle='+this.state.postTitle+'&firstImg='+this.state.firstImg
                    +'&postBody='+encodeURI(replaceString(this.state.editorContent))+'&postTag='+labels,
            timeOut: 3000,
        }).then(
            data => {
                if (data.status == 0) {
                    this.props.history.push('/mobile/forum/publishResult');
                    this.setState({
                        submitting: false,
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

    componentDidMount() {
        const elem = this.refs.editorElem;
        const editor = new E(elem);
        this.setState({ 
            editor 
        });

        editor.customConfig.zIndex = 0;  // 防止wangeditor遮挡antd组件
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
        editor.customConfig.uploadImgHooks = { 
            customInsert: function (insertImg, result, editor) { 
                var url =result.data; 
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
            });
        }
        editor.create()
    }

    handleChangPostTitle = (value) => {
        this.setState({
            postTitle: value,
        })
    }

    handleSelectLabel = (value) => {
        this.setState({
            postLabel: value,
        });
    }

    handleModalOk = () => {
        this.addPostData();
    }

    handleModalCancel = () => {
        this.setState({
            visible: false,
        })
    }

	render() {
		return(
            <div>
                <NavBar
                    mode="dark"
                    // icon={<Icon type="left" />}
                    icon={<span>取消</span>}
                    onLeftClick={() =>  window.history.back(-1)}
                    // rightContent={<span style={{ fontSize: 13 }} onClick={() => this.addPostData()}>下一步</span>}
                    rightContent={<span style={{ fontSize: 13 }} onClick={() => this.setState({ visible: true })}>下一步</span>}
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

                <Modal
                    title="选择标签"
                    visible={this.state.visible}
                    onOk={this.handleModalOk}
                    onCancel={this.handleModalCancel}
                    okText="发布"
                    cancelText="取消"
                    okButtonProps={{
                        loading: this.state.submitting,
                    }}
                    cancelButtonProps={{
                        disabled: this.state.submitting,
                    }}
                >
                <Select
                    mode="multiple"
                    value={this.state.postLabel}
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
                </Modal>
            </div>
		);
	}
}