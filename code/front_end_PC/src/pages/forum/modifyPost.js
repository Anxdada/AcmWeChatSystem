import React from 'react';
import E from 'wangeditor';
import { Select, Card, Input, Row, Col, Button } from 'antd';
import { connect } from 'react-redux';
import { switchMenu, addMenu } from './../../redux/actions';

const { Option } = Select;

const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

//<Option value={item.tagName}><Tag color={item.tagColor} key={item.tagName} > {item.tagName} </Tag></Option>

class ModifyPostPublishView extends React.Component {

    handleSelectTags = (tags) => {
        console.log(`selected ${tags}`);
        console.log(tags[0]);
    }

    updateData() {

    }

    handlePublishTag = (value) => {
        this.setState({
            publishTag: value,
        })
    }

    handlePublish = () => {
        this.updateData();
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

class ModifyPostEditView extends React.Component {

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

    componentWillMount() {
        this.getData();
    }

    getData() {
        this.setState({
            publishPostTitle: '征男友',
        })
    }

    handleModifyPostTitle = (e) => {
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
                <Input size="small" placeholder="帖子主题" style={{ height:30, width: 400 }} onChange={this.handleModifyPostTitle } />
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

class ModifyPost extends React.Component {

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

    render() {
        return (
            <div>
            <Row>
                <Col span={18}>
                    <ModifyPostEditView />
                </Col>
                <Col span={6} >
                    <ModifyPostPublishView />
                </Col>
            </Row>
            </div>
        );
    }
} 

export default connect()(ModifyPost);