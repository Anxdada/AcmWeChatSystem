import React from 'react';
import { Icon, Modal, Select } from 'antd';
import { NavBar, TextareaItem, Toast } from 'antd-mobile';
import E from 'wangeditor';
import { AddPostUrl, SelectLabel, UploadImg } from './../../config/dataAddress';

const { Option } = Select;

function checkFirstImgIsExist(s, substr) {
    return s.indexOf(substr);
}

export default class MobileAddPostPage extends React.Component{

    state = {
        visible: false,
    }

    constructor(props) {
        super(props);
        this.state={
            postTitle: '',
            editor: '',
            editorContent: '',
            editorContentText: '',
        }
    }

    componentDidMount() {
        const elem = this.refs.editorElem;
        const editor = new E(elem);
        this.setState({editor:editor});
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
        
        let simg = '';

        editor.customConfig.uploadImgHooks = {
            customInsert: function (insertImg, result, editor) {
                var url =result.data; 
                insertImg(url);
                simg = url;
            }
        };
        // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
        editor.customConfig.onchange = html => {
            //window.alert(editor.txt.text());
            this.setState({
                editorContent: html,
                editorContentText: editor.txt.text(),
            })
            // console.log(checkFirstImgIsExist(this.state.editorContent, simg));
            // console.log(simg);
            // console.log('xierenyi');
            // console.log(this.state.editorContent);
            // console.log(editor.txt.text());
        }
        editor.create();
        this.autoFocusInst.focus();
    }

    handlePublish = () => {
        Toast.loading('Loading...', 1, () => {
            console.log('Load complete !!!');
        });
        // 图片会挡掉这一部分, 只能通过结果页面显示了...
        Toast.success('Load success !!!', 1);
    }

	render() {
		return(
            <div>
                <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={() =>  window.history.back(-1)}
                    rightContent={<span style={{ fontSize: 13 }} onClick={() => this.props.history.push('/mobile/forum/result')}>下一步</span>}
                >发表帖子</NavBar>
                
                <TextareaItem
                    placeholder="一句话描述下你的帖子~"
                    data-seed="logId"
                    ref={el => this.autoFocusInst = el}
                    autoHeight
                />

                <div style={{ backgroundColor: '#ffffff' }}>
                    <div ref="editorElem" className="toolbar" />
                </div>
            </div>
		);
	}
}