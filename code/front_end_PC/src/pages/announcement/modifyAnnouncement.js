import React from 'react';
import E from 'wangeditor';
import { DatePicker, Input, Button, Card, Select, Tag, Modal, Row, Col, message } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
import './index.less';
import { connect } from 'react-redux';
import { switchMenu, addMenu } from './../../redux/actions';


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

class ModifyAnnouncementPublishView extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            publishTag: '',
            isRegister: false,
            registerStartTime: '',
            registerEndTime: '',
            startTime: '',
            lastTime: '',
        }
    }

    componentWillMount() {
        this.updateData();
    }

    updateData() {

        console.log(this.state.friendUrlCreateTime);
        this.setState({
            publishTag: '讲座',
            startTime: moment(),
            lastTime: '两小时',
            isRegister: true,
            registerStartTime:  moment(),
            registerEndTime:  moment(),
        })
        // if (this.state.title.length==0) {
        //     message.error('帖子标题不为空');
        //     return;
        // }
        // if (this.state.editorContentText.length==0) {
        //     message.error('帖子内容不为空');
        //     return;
        // }
        // fetch(UpdateInvitation,{   //Fetch方法
        //     method: 'POST',
        //     headers: {
        //         'Authorization': cookie.load('token'),
        //         'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
        //     },
        //     body: 'invitationId='+this.state.id+'&invitationTitle='+this.state.title+'&invitationBody='+encodeURI(getString(this.state.editorContent))
        // }).then(res => res.json()).then(
        //     data => {
        //         if(data.code==0) {
        //             message.success('修改成功');
        //         }
        //         else if(data.code==13) {
        //             message.error(data.msg);
        //             this.props.history.push('/login');
        //         }
        //         else {
        //             message.error(data.msg);
        //         }
            // }
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
            lastTime: e.target.value,
        })
    }

    handleIsRegister = (value) => {
        console.log(value);
        this.setState({
            isRegister: value,
        })
    }

    handleRegisterRangeTime = (dates) => {
        console.log(dates[0]);
        console.log(dates[1]);
    }

    handlePublish = () => {
        this.updateData();
    }

    disabledDate = (current) => {
        // 从明天开始的日期才是有效日期
        return current && current < moment().endOf('day');
    }

    render() {
        const registerRangeTime = [this.state.registerStartTime, this.state.registerStartTime];
        return (
            <div className="publishViewAnnoun">
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
                                defaultValue={this.state.startTime}
                                format="YYYY-MM-DD HH:mm:ss"
                                value={this.state.startTime}
                                placeholder="Start"
                                onChange={this.handleStartTime}
                            />
                            &nbsp;&nbsp;{this.state.publishTag}持续时间:&nbsp;&nbsp;
                            <Input defaultValue={this.state.lastTime} placeholder="以半小时为最小单位" 
                                onChange={this.handleLastTime} style={{ height: 30, width: 200 }} />
                        </span>
                    }
                </div>
                <div>
                    &nbsp;&nbsp;&nbsp;是否报名: &nbsp;&nbsp;
                    <Select defaultValue={this.state.isRegister} style={{ width: 150 }} onChange={this.handleIsRegister} className="modalInput">
                        <Option value={true}>是</Option>
                        <Option value={false}>否</Option>
                    </Select>
                    {
                        this.state.isRegister == false ? null :
                            <span>&nbsp;&nbsp;报名起止时间: 
                                <RangePicker 
                                    showTime
                                    format="YYYY-MM-DD HH:mm:ss"
                                    defaultValue={registerRangeTime}
                                    onChange={this.handleRegisterRangeTime} 
                                    disabledDate={this.disabledDate} 
                                    style={{ width: 400 }} />
                            </span>
                    }
                </div>
                <Button type="primary" onClick={this.handlePublish}>发布</Button>
                </Card>
            </div>
        );
    }
}


class ModifyAnnouncementEditView extends React.Component {

    state = {
        visible: false,
    }

    constructor(props) {
        super(props);
        this.state = {
            editorContent: '',
            editorContentText: '放大镜可根据大快乐十分',
            publishNewsTitle: '',
        }
    }

    componentWillMount() {
        this.getData();
    }

    getData() {
        this.setState({
            editorContent: '111',
            editorContentText: '放大镜可根据大快乐十分',
            publishNewsTitle: 'DFS第一次讲座',
        })
        
    }

    handleModifyAnnouncementTitle = (e) => {
        console.log(e);
        this.setState({
            publishNewsTitle: e.target.value,
        })
    }

    render() {
        return (
          <div style={{ flex: 1, padding: "10px" }}>
            <Card title="修改公告" >
                <div>
                <Input defaultValue={this.state.publishNewsTitle} size="small" placeholder="公告标题" 
                    style={{ height:30, width: 400 }} onChange={this.handleModifyAnnouncementTitle } />
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
        this.setState({editor:editor})
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


class ModifyAnnouncement extends React.Component {

    componentDidMount() {
        const { dispatch } = this.props;
        const titleArray = [
            {
                title: '公告',
                key: 'none',
            },
            {
                title: '管理公告',
                key: '/admin/announcement/manage',
            },
            {
                title: '修改公告',
                key: 'none',
            }
        ];
        dispatch(switchMenu(titleArray));
    }

    render() {
        return (
            <div>
                <ModifyAnnouncementEditView />
                <ModifyAnnouncementPublishView />
            </div>
        );
    }
}

export default connect()(ModifyAnnouncement);