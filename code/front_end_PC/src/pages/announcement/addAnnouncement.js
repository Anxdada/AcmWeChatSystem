import React from 'react';
import E from 'wangeditor';
import { DatePicker, Input, Button, Card, Select, Tag, Modal, Row, Col } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';


moment.locale('zh-cn');
const { Option } = Select;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

const tags = [
    {
        tagName: '讲座',
        tagColor: '#3ce016',
    },
    {
        tagName: '比赛',
        tagColor: '#e01639',
    },
    {
        tagName: '会议',
        tagColor: '#16e0c4',
    },
    {
        tagName: '通知',
        tagColor: '#16c4e0',
    }
]

class AddAnnouncementPublishView extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            editorContent: '',
            publishTag: '',
            singUpInfo: '',
            singUpStart: '',
            singUpEnd: '',
            startTime: '',
            lastTextTime: '',
        }
    }

    addData() {

        console.log(this.state.friendUrlCreateTime);

        // this.setState({
        //     visible: false,
        // });
        
        // fetch(UpdateFriendUrl, {
        //     method: 'POST',
        //     headers : {
        //         'Authorization': cookie.load('token'),
        //         'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
        //     },
        //     body:'friendurlId='+this.state.friendurlId+'&friendurlTitle='+this.state.friendurlTitle+'&friendurlBody='+this.state.friendurlBody
        // }).then(res => res.json()).then(
        //     data => {
        //         if (data.code==0) {
        //             message.success('修改成功');
        //             emitter.emit('changeFirstText', '修改')
        //         } else {
        //             message.error(data.msg);
        //         }
        //     }
        // )
    }

    handlePublishTag = (value) => {
        console.log(value);
        this.setState({
            publishTag: value,
        })
    }

    handleStartTime = (value) => {
        this.setState({
            startTime: value,
        })
    }

    handleLastTime = (e) => {
        console.log(e.target.value);
        this.setState({
            lastTextTime: e.target.value,
        })
    }

    handleSignUpInfo = (value) => {
        console.log(value);
        this.setState({
            singUpInfo: value,
        })
    }

    handleSingUpRangeTime = (dates) => {
        console.log(dates[0]);
        console.log(dates[1]);
    }

    handlePublish = () => {
        this.addData();
    }

    disabledDate = (current) => {
        // 从明天开始的日期才是有效日期
        return current && current < moment().endOf('day');
    }

    render() {
        return (
            <div className="publishView">
                <Card title="参数配置">
                <div>
                    &nbsp;&nbsp;&nbsp;类别: &nbsp;&nbsp;
                    <Select defaultValue={ this.state.publishTag } style={{ width: 150 }} 
                        onChange={this.handlePublishTag} >
                        {
                            tags.map((item) =>
                                <Option value={item.tagName}><Tag color={item.tagColor} key={item.tagName} > {item.tagName} </Tag></Option>
                            )
                        }
                    </Select>
                    {
                        this.state.publishTag == "通知" ||  this.state.publishTag == "" ? null : <span>
                            &nbsp;&nbsp;{this.state.publishTag}开始时间:&nbsp;&nbsp;
                            <DatePicker
                                disabledDate={this.disabledDate}
                                showTime
                                format="YYYY-MM-DD HH:mm:ss"
                                value={this.state.startTime}
                                placeholder="Start"
                                onChange={this.handleStartTime}
                            />
                            &nbsp;&nbsp;{this.state.publishTag}持续时间:&nbsp;&nbsp;
                            <Input placeholder="以半小时为最小单位" onChange={this.handleLastTime} style={{ height: 30, width: 200 }} />
                        </span>
                    }
                </div>
                <div>
                    &nbsp;&nbsp;&nbsp;是否报名: &nbsp;&nbsp;
                    <Select style={{ width: 150 }} onChange={this.handleSignUpInfo} className="modalInput">
                        <Option value="是">是</Option>
                        <Option value="否">否</Option>
                    </Select>
                    {
                        this.state.singUpInfo == "是" ? <span>&nbsp;&nbsp;报名起止时间: <RangePicker onChange={this.handleSingUpRangeTime} disabledDate={this.disabledDate} />
                            </span>: null
                    }
                </div>
                <Button type="primary" onClick={this.handlePublish}>发布</Button>
                </Card>
            </div>
        );
    }
}


class AddAnnouncementEditView extends React.Component {

    state = {
        visible: false,
    }

    constructor(props) {
        super(props);
        this.state = {
            editorContent: '',
            publishNewsTitle: '',
        }
    }

    handleAddAnnouncementTitle = (e) => {
        console.log(e);
        this.setState({
            publishNewsTitle: e.target.value,
        })
    }

    render() {
        return (
          <div style={{ flex: 1, padding: "10px" }}>
            <Card title="添加新闻" >
                <div>
                <Input size="small" placeholder="公告标题" style={{ height:30, width: 400 }} onChange={this.handleAddAnnouncementTitle } />
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


export default class AddAnnouncement extends React.Component {
    render() {
        return (
            <div>
                <AddAnnouncementEditView />
                <AddAnnouncementPublishView />
            </div>
        );
    }
}