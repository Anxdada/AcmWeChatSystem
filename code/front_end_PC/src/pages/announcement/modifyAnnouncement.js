import React from 'react';
import E from 'wangeditor';
import { DatePicker, Input, Button, Card, Select, Tag, Modal, Row, Col, message, Tooltip, notification } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
import './index.less';
import { connect } from 'react-redux';
import { switchMenu, addMenu } from './../../redux/actions';
import { DetailAnnouncementUrl, SelectAnnouncementTag, UploadImg, UpdateAnnouncement } from './../../config/dataAddress';
import cookie from 'react-cookies';
import Fetch from './../../fetch';


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

function getString(s) {
    s=s.replace(/\+/g, "%2B");
    s=s.replace(/&/g, "%26");

    return s;
}

class ModifyAnnouncementPublishView extends React.Component {

    state = { 
        loading: false,
    }

    constructor(props) {
        super(props);
        this.state = {
            announcementId: '',
            announcementTagId: '',
            announcementTagName: '',
            createUser: '',
            createTime: '',
            isRegister: 0,
            registerStartTime: null,
            registerEndTime: null,
            startTime: null,
            lastTime: '',
            isPublish: '',
            needStartTime: '',
            allTag: [],
        }
    }

    componentWillMount() {
        this.getTagData();
        this.getSingleAnnouncementData();
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

    getSingleAnnouncementData() {

        Fetch.requestPost({
            url: DetailAnnouncementUrl,
            info: 'announcementId='+this.props.id,
            timeOut: 3000,
        }).then(
            data => {
                // console.log(data);
                if (data.status == 0) {
                    this.setState({
                        announcementId: data.resultBean.announcementId,
                        announcementTagId: data.resultBean.announcementTagId,
                        announcementTagName: data.resultBean.announcementTagName,
                        createUser: data.resultBean.createUser,
                        createTime: data.resultBean.createTime,
                        isRegister: data.resultBean.isRegister,
                        registerStartTime: data.resultBean.registerStartTime,
                        registerEndTime: data.resultBean.registerEndTime,
                        startTime: data.resultBean.startTime,
                        lastTime: data.resultBean.lastTime,
                        isPublish: data.resultBean.isPublish,
                        needStartTime: data.resultBean.needStartTime,
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

    updateSingleAnnouncementData(type) {

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
            url: UpdateAnnouncement,
            info: 'announcementId='+this.state.announcementId+'&announcementTitle='+this.props.announcementTitle
                    +'&announcementBody='+encodeURI(getString(this.props.editorContent))
                    +'&announcementTagId='+this.state.announcementTagId+'&isRegister='+this.state.isRegister
                    +'&registerStartTime='+registerStartTime+'&registerEndTime='+registerEndTime
                    +'&startTime='+startTime+'&lastTime='+this.state.lastTime
                    +'&isPublish='+type,
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
        console.log(value);
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
        console.log(value);
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
        if (dates.length < 0) {
            this.setState({
                registerStartTime: null,
                registerEndTime: null,
            })
            return ;
        }
        this.setState({
            registerStartTime: dates[0],
            registerEndTime: dates[1],
        })
    }

    handlePublish = (type) => {
        this.updateSingleAnnouncementData(type);
    }

    // disabledDate = (current) => {
    //     console.log('xiexie');
    //     console.log(current);
    //     // 从明天开始的日期才是有效日期
    //     return registerStartTime[0] && current < moment().endOf('day') < rangeTime[0] ;
    // }

    disabledStartDate = (current) => {
        // Can not select days before today and today
        // console.log(current);
        return current && current < moment().endOf('day');
    }

    render() {

        let rangeTime;
        if (this.state.registerStartTime != null)
            rangeTime = [moment(this.state.registerStartTime), moment(this.state.registerEndTime)];
        else rangeTime = [null, null];

        return (
            <div className="publishViewAnnoun">
                <Card title="参数配置">
                <div>
                    &nbsp;&nbsp;&nbsp;类别: &nbsp;&nbsp;
                    <Select value={ this.state.announcementTagName } style={{ width: 150 }} 
                        onChange={this.handlePublishTag} >
                        {
                            this.state.allTag.map((item) =>
                                <Option value={item.announcementTagName} key={item.announcementTagId}>
                                    <Tag color={item.announcementTagColor} key={item.announcementTagName} > {item.announcementTagName} </Tag>
                                </Option>
                            )
                        }
                    </Select>
                    {
                        this.state.needStartTime == 0 ? null : 
                        <span>
                            &nbsp;&nbsp;{this.state.announcementTagName}开始时间:&nbsp;&nbsp;
                            <DatePicker
                                disabledDate={this.disabledStartDate}
                                showTime
                                format="YYYY-MM-DD HH:mm:ss"
                                value={this.state.startTime == null ? null : moment(this.state.startTime)}
                                placeholder="Start"
                                onChange={this.handleStartTime}
                            />
                            &nbsp;&nbsp;{this.state.announcementTagName}持续时间:&nbsp;&nbsp;
                            <Input value={this.state.lastTime} placeholder="以半小时为最小单位" 
                                onChange={this.handleLastTime} style={{ height: 30, width: 200 }} />
                        </span>
                    }
                </div>
                <div>
                    &nbsp;&nbsp;&nbsp;是否需要报名: &nbsp;&nbsp;
                    <Select value={this.state.isRegister} style={{ width: 150 }} 
                        onChange={this.handleIsRegister} className="modalInput">
                        <Option value={1}>是</Option>
                        <Option value={0}>否</Option>
                    </Select>
                    {
                        this.state.isRegister == 0 ? null :
                            <span>&nbsp;&nbsp;报名起止时间: &nbsp;&nbsp;
                                <RangePicker 
                                    showTime
                                    format="YYYY-MM-DD HH:mm:ss"
                                    value={rangeTime}
                                    onChange={this.handleRegisterRangeTime}
                                    style={{ width: 400 }} />
                            </span>
                    }
                </div>
                <div>
                &nbsp;&nbsp;&nbsp;状态:&nbsp;&nbsp;
                {
                    this.state.isPublish == 0 ? <Tag color="gray">未发布[草稿]</Tag> :
                        this.state.isRegister == 0 ? <Tag color="blue">已发布</Tag> :
                        moment().isAfter(this.state.registerEndTime) ? 
                                            <Tooltip title={`截止时间 ${moment(this.state.registerEndTime).format('YYYY-MM-DD HH:mm:ss')}`}>
                                                <Tag color="#f50">报名结束</Tag> 
                                            </Tooltip>
                        : <Tag color="green">正在报名</Tag>
                }
                </div>
                {
                    this.state.isPublish == 1 ? null : 
                    <Button type="dashed" onClick={() => this.handlePublish(0)} loading={this.state.loading}> 存为草稿 </Button>
                }
                <Button type="primary" onClick={() => this.handlePublish(1)} loading={this.state.loading}>
                {
                    this.state.isPublish == 1 ? <span>修改提交</span> : <span>修改并发布</span>
                }
                </Button>
                </Card>
            </div>
        );
    }
}


class ModifyAnnouncementEditView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            announcementTitle: '',
            editor: '',
            editorContent: '',
            editorContentText: '',
        }
    }

    componentWillMount() {
        this.getData();
    }

    getData() {
        Fetch.requestPost({
            url: DetailAnnouncementUrl,
            info: 'announcementId='+this.props.id,
            timeOut: 3000,
        }).then ( 
            data => {
                // console.log(data);
                if (data.status == 0) {
                    this.setState({
                        announcementTitle: data.resultBean.announcementTitle,
                        editorContent: this.state.editor.txt.html(data.resultBean.announcementBody),
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

    updataData() {

    }

    handleModifyAnnouncementTitle = (e) => {
        console.log(e);
        this.setState({
            announcementTitle: e.target.value,
        })
    }

    render() {

        // console.log(this.state.resultBean);

        return (
            <div style={{ flex: 1, padding: "10px" }}>
                <Card title="修改公告" >
                    <div>
                    <Input value={this.state.announcementTitle} size="small" placeholder="公告标题" allowClear
                        style={{ height:30, width: 400 }} onChange={this.handleModifyAnnouncementTitle } />
                    </div>
                    <br />
                    <div ref="editorElem" className="toolbar" />
                </Card>

                <ModifyAnnouncementPublishView id={this.props.id} editorContent={this.state.editorContent} 
                    editorContentText={this.state.editorContentText} announcementTitle={this.state.announcementTitle}
                />
            </div>
        );
    }

    componentDidMount() {
        const elem = this.refs.editorElem
        const editor = new E(elem)
        this.setState({editor:editor})
        editor.customConfig.uploadImgShowBase64 = true   // 使用 base64 保存图片
        editor.customConfig.uploadFileName = 'myFileName';
        editor.customConfig.uploadImgServer = UploadImg;
        editor.customConfig.uploadImgHooks = { 
            customInsert: function (insertImg, result, editor) { 
                var url =result.data; insertImg(url); 
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


class ModifyAnnouncement extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            resultBean: [],
        }
    }

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
                <ModifyAnnouncementEditView id={this.props.match.params.id} />
            </div>
        );
    }
}

export default connect()(ModifyAnnouncement);