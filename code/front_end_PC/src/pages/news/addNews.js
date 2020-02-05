import React from 'react';
import E from 'wangeditor';
import './index.less';
import { DatePicker, Row, Col, Input, Button, Card, Select, Tag } from 'antd';

const { Option } = Select;

const tags = [
    {
        tagName: '情感',
        tagColor: '#3ce016',
    },
    {
        tagName: '时事新闻',
        tagColor: '#e01639',
    },
    {
        tagName: '获奖',
        tagColor: '#16e0c4',
    },
    {
        tagName: '其它',
        tagColor: '#16c4e0',
    }
]

class AddNewsPublishView extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            publishTag: '',
        }
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
            <div style={{ padding: 10 }} >
                <Card title="发布配置" >
                    &nbsp;&nbsp;&nbsp;&nbsp;类别:&nbsp;&nbsp;
                    <Select defaultValue={ this.state.publishTag } style={{ width: 150 }} 
                        onChange={this.handlePublishTag} >
                        {
                            tags.map((item) =>
                                <Option value={item.tagName}><Tag color={item.tagColor} key={item.tagName} > {item.tagName} </Tag></Option>
                            )
                        }
                    </Select>
                    <Button type="primary" onClick={this.handlePublish}>发布</Button>
                </Card>
            </div>
        );
    }
}

class AddNewsEditView extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            editorContent: '',
            newsTitle: '',
        }
    }

    handleAddNewsTitle = (e) => {
        this.setState({
            newsTitle: e.target.value,
        })
    }


    render() {
        return (
          <div style={{ flex: 1, padding: "10px" }}>
            <Card title="添加新闻" >
                <div>
                <Input size="small" placeholder="新闻标题" style={{ height:30, width: 400 }} onChange={this.handleAddNewsTitle}/>
                </div><br />
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


export default class AddNews extends React.Component {
    render() {
        return (
            <div>
            <Row>
                <Col span={18}>
                    <AddNewsEditView />
                </Col>
                <Col span={6} >
                    <AddNewsPublishView />
                </Col>
            </Row>
            </div>
        );
    }
}