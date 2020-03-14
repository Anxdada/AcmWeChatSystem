import React from 'react';
import E from 'wangeditor';
import { DatePicker, Input, Button, Card, Select, Tag, Modal, Row, Col, message, notification,  } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
import './index.less';
import { AddAnnouncementUrl, UploadImg, SelectAnnouncementTag } from './../../config/dataAddress';
import cookie from 'react-cookies';
import Fetch from './../../fetch';

moment.locale('zh-cn');
const { Option } = Select;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

function getString(s) {
    s = s.replace(/\+/g, "%2B");
    s = s.replace(/&/g, "%26");
    return s;
}

class AddAnnouncementPublishView extends React.Component {

    state = {
        loading: false,
    }

    constructor(props) {
        super(props);
        this.state = {
            announcementTagId: 0,
            announcementTagName: '',
            isRegister: 0,
            registerStartTime: null,
            registerEndTime: null,
            startTime: null,
            lastTime: '',
            isPublish: 0,
            needStartTime: 0,
            allTag: [],
        }
    }

    componentWillMount() {
        this.getTagData();
    }

    getTagData() {
        Fetch.requestPost({
            url: SelectAnnouncementTag,
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

    addAnnouncementData(type) {
        
        if (this.props.announcementTitle.length == 0) {
            message.error('公告标题不能为空!');
            return ;
        }
        if (this.props.announcementTitle.length > 20) {
            message.error('公告标题过长!');
            return ;
        }

        // wangediter 有个bug就是必须聚焦到内容框才能检测出由内容, 不然里面的内容就是无
        if (this.props.editorContentText.length == 0) {
            message.error('公告内容不能为空或者未点击主编辑框!');
            return ;
        }

        if (this.state.announcementTagId == 0) {
            message.error('请选择类别!');
            return ;
        }

        let startTime = '';
        if (this.state.needStartTime == 1) {
            if (this.state.startTime == null) {
                message.error(`${this.state.announcementTagName}开始时间不能为空!`);
                return ;
            }
            startTime = moment(this.state.startTime).format('YYYY-MM-DD HH:mm:ss');
            if (this.state.lastTime == null) {
                message.error(`${this.state.announcementTagName}持续时间不能为空!`);
                return ;
            }
        }

        let registerStartTime = '', registerEndTime = '';
        if (this.state.isRegister == 1) {
            if (this.state.registerStartTime == null) {
                message.error(`${this.state.announcementTagName}报名注册周期不能为空!`);
                return ;
            }
            registerStartTime = moment(this.state.registerStartTime).format('YYYY-MM-DD HH:mm:ss');
            registerEndTime = moment(this.state.registerEndTime).format('YYYY-MM-DD HH:mm:ss');
        }

        this.setState({
            loading: true,
        });

        Fetch.requestPost({
            url: AddAnnouncementUrl,
            info: 'announcementTitle='+this.props.announcementTitle
                    +'&announcementBody='+encodeURI(getString(this.props.editorContent))
                    +'&announcementTagId='+this.state.announcementTagId+'&isRegister='+this.state.isRegister
                    +'&registerStartTime='+registerStartTime+'&registerEndTime='+registerEndTime
                    +'&startTime='+startTime+'&lastTime='+this.state.lastTime+'&isPublish='+type,
            timeOut: 3000,
        }).then(
            data => {
                if (data.status == 0) {
                    if (!type) message.success('公告草稿存储成功!');
                    else message.success('发布公告成功!');
                    this.setState({
                        announcementTagId: 0,
                        announcementTagName: '',
                        isRegister: 0,
                        registerStartTime: null,
                        registerEndTime: null,
                        startTime: null,
                        lastTime: '',
                        isPublish: 0,
                        needStartTime: 0,
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
                announcementTagName: undefined,
                announcementTagId: 0,
                needStartTime: 0,
            })
            return ;
        }
        const tags = this.state.allTag;
        for (let i in tags) {
            if (tags[i].announcementTagName == value) {
                this.setState({
                    announcementTagId: tags[i].announcementTagId,
                    announcementTagName: value,
                    needStartTime: tags[i].needStartTime,
                })
                break;
            }
        }
    }

    handleStartTime = (value) => {
        this.setState({
            startTime: value,
        })
    }

    handleLastTime = (e) => {
        this.setState({
            lastTime: e.target.value,
        })
    }

    handleRegisterRangeTime = (dates) => {
        if (dates.length < 1) {
            this.setState({
                registerStartTime: null,
                registerEndTime: null,
            });
            return ;
        }
        this.setState({
            registerStartTime: dates[0],
            registerEndTime: dates[1],
        });
    }

    handlePublish = (type) => {
        this.addAnnouncementData(type);
    }

    handleIsRegister = (value) => {
        console.log(value);
        this.setState({
            isRegister: value,
        })
    }

    disabledDate = (current) => {
        // 从明天开始的日期才是有效日期
        return current && current < moment().endOf('day');
    }

    render() {
        return (
            <div className="publishViewAnnoun">
                <Card title="参数配置">
                    <div>
                        &nbsp;&nbsp;&nbsp;类别: &nbsp;&nbsp;
                        <Select value={ this.state.announcementTagName } style={{ width: 150 }} 
                            onChange={this.handlePublishTag} allowClear placeholder="选择类别" >
                            {
                                this.state.allTag.map((item) =>
                                    <Option value={item.announcementTagName} key={item.announcementTagId} >
                                        <Tag color={item.announcementTagColor} key={item.announcementTagId} > {item.announcementTagName} </Tag>
                                    </Option>
                                )
                            }
                        </Select>
                        {
                            this.state.needStartTime == 0 ? null : <span>
                                &nbsp;&nbsp;{this.state.announcementTagName}开始时间:&nbsp;&nbsp;
                                <DatePicker
                                    disabledDate={this.disabledDate}
                                    showTime
                                    format="YYYY-MM-DD HH:mm:ss"
                                    value={this.state.startTime}
                                    placeholder="Start"
                                    onChange={this.handleStartTime}
                                />
                                &nbsp;&nbsp;{this.state.announcementTagName}持续时间:&nbsp;&nbsp;
                                <Input value={this.state.lastTime} placeholder="以半小时为最小单位" onChange={this.handleLastTime} 
                                    style={{ height: 30, width: 200 }} allowClear />
                            </span>
                        }
                    </div>
                    <div>
                        &nbsp;&nbsp;&nbsp;是否报名: &nbsp;&nbsp;
                        <Select value={this.state.isRegister} style={{ width: 150 }} onChange={this.handleIsRegister} 
                            className="modalInput" >
                            <Option value={1}>是</Option>
                            <Option value={0}>否</Option>
                        </Select>
                        {
                            this.state.isRegister == 0 ? null :
                                <span>&nbsp;&nbsp;报名起止时间: 
                                    <RangePicker 
                                        showTime
                                        format="YYYY-MM-DD HH:mm:ss"
                                        onChange={this.handleRegisterRangeTime}
                                        style={{ width: 400 }} />
                                </span>
                        }
                    </div>
                    <Button type="dashed" onClick={() => this.handlePublish(0)} loading={this.state.loading}> 
                        存为草稿 
                    </Button>
                    <Button type="primary" onClick={() => this.handlePublish(1)} loading={this.state.loading}>发布</Button>
                </Card>
            </div>
        );
    }
}


class AddAnnouncementEditView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            announcementTitle: '',
            editor: '',
            editorContent: '',
            editorContentText: '',
        }
    }

    refresh = () => {
        this.state.editor.txt.clear()
        this.setState({
            announcementTitle: '',
            editor: '',
            editorContent: '',
            editorContentText: '',
        })
    }

    handleAddAnnouncementTitle = (e) => {
        this.setState({
            announcementTitle: e.target.value,
        })
    }

    render() {
        return (
        <div style={{ flex: 1 }}>
            <Card title="添加公告" >
                <div>
                <Input size="small" placeholder="公告标题" style={{ height:30, width: 400 }} allowClear
                    onChange={this.handleAddAnnouncementTitle } value={this.state.announcementTitle} />
                </div>
                <br />
                <div ref="editorElem" className="toolbar" />
            </Card>


            <AddAnnouncementPublishView announcementTitle={this.state.announcementTitle} editorContent={this.state.editorContent} 
                editorContentText={this.state.editorContentText} refresh={this.refresh}
            />
        </div>
        );
    }

    componentDidMount() {
        const elem = this.refs.editorElem
        const editor = new E(elem)
        this.setState({
            editor: editor,
        })
        editor.customConfig.uploadImgShowBase64 = true   // 使用 base64 保存图片
        editor.customConfig.uploadFileName = 'myFileName';
        editor.customConfig.uploadImgServer = UploadImg;
        editor.customConfig.uploadImgHooks = { 
            customInsert: function (insertImg, result, editor) { 
                var url =result.data; 
                insertImg(url); 
            } 
        };
    
        // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
        editor.customConfig.onchange = html => {
            this.setState({
                editorContent: html,
                editorContentText: editor.txt.text(),
            })
        }
        editor.create()
    }
}


export default class AddAnnouncement extends React.Component {
    render() {
        return (
            <div>
                <AddAnnouncementEditView />
            </div>
        );
    }
}