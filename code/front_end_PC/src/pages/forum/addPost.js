import React from 'react';
import E from 'wangeditor';
import { Select, Card, Input, Row, Col, Button } from 'antd';

const { Option } = Select;

const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

class AddPostPublishView extends React.Component {

    handleSelectTags = (tags) => {
        console.log(`selected ${tags}`);
        console.log(tags[0]);
    }

    addData() {

    }

    handlePublishTag = (value) => {
        this.setState({
            publishTag: value,
        })
    }

    handlePublish = () => {
        this.addData();
    }

    render() {
        return (
            <div className="publishView">
                <Card title="发帖参数配置">
                    <Select
                        mode="multiple"
                        style={{ width: '100%' }}
                        placeholder="帖子的标签"
                        onChange={this.handleSelectTags}
                    >
                        {children}
                    </Select>
                    <Button type="primary" onClick={this.handlePublish}>发布</Button>
                </Card>
            </div>
        );
    }
}

class AddPostEditView extends React.Component {

    state = {
        visible: false,
    }

    constructor(props) {
        super(props);
        this.state = {
            editorContent: '',
            publishPostTitle: '',
        }
    }

    handleAddPostTitle = (e) => {
        console.log(e);
        this.setState({
            publishPostTitle: e.target.value,
        })
    }

    render() {
        return (
          <div style={{ flex: 1 }}>
            <Card title="添加帖子" >
                <div>
                <Input size="small" placeholder="帖子主题" style={{ height:30, width: 400 }} onChange={this.handleAddPostTitle } />
                </div>
                <br />
                <div ref="editorElem" className="toolbar" />
            </Card>
          </div>
        );
      }
      componentDidMount() {
        const elem = this.refs.editorElem
        const editor = new E(elem)
        editor.customConfig.uploadImgShowBase64 = true   // 使用 base64 保存图片
        editor.customConfig.uploadFileName = 'myFileName';
        // editor.customConfig.uploadImgServer = UploadImg;
        editor.customConfig.uploadImgHooks = { 
            customInsert: function (insertImg, result, editor) { 
                var url =result.data; insertImg(url); 
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
            <Row>
                <Col span={18}>
                    <AddPostEditView />
                </Col>
                <Col span={6} >
                    <AddPostPublishView />
                </Col>
            </Row>
            </div>
        );
    }
} 