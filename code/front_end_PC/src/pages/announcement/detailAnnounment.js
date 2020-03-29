import React from 'react';
import { Card, Tag, DatePicker, Input, message, notification, BackTop, Icon } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
import './index.less';
import { connect } from 'react-redux';
import { switchMenu, addMenu } from './../../redux/actions';
import {EventEmitter2} from 'eventemitter2';
import { DetailAnnouncementUrl } from './../../config/dataAddress';
import cookie from 'react-cookies';
import Fetch from './../../fetch';


moment.locale('zh-cn');
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

class DetailAnnouncement extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            announcementId: '',
            announcementTitle: '',
            announcementBody: '',
            announcementTagName: '',
            announcementTagColor: '',
            createRealName: '',
            createTime: '',
            updateRealName: '',
            updateTime: '',
            isRegister: '讲座',
            registerStartTime: null,
            registerEndTime: null,
            needStartTime: '',
            startTime: null,
            lastTime: '',
            isPublish: '',
            view: 0,
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
                title: '查看公告详情',
                key: 'none',
            }
        ];
        dispatch(switchMenu(titleArray));
        
    }

    componentWillMount() {
        this.getSingleAnnouncementData();
    }

    getSingleAnnouncementData() {
        // console.log(this.props.match.params.id);
        Fetch.requestPost({
            url: DetailAnnouncementUrl,
            info: 'announcementId='+this.props.match.params.id,
            timeOut: 3000,
        }).then ( 
            data => {
                // console.log(data);
                if (data.status == 0) {
                    this.setState({
                        announcementId: data.resultBean.announcementId,
                        announcementTitle: data.resultBean.announcementTitle,
                        announcementBody: data.resultBean.announcementBody,
                        announcementTagName: data.resultBean.announcementTagName,
                        announcementTagColor: data.resultBean.announcementTagColor,
                        createRealName: data.resultBean.createRealName,
                        createTime: data.resultBean.createTime,
                        updateRealName: data.resultBean.updateRealName,
                        updateTime: data.resultBean.updateTime,
                        isRegister: data.resultBean.isRegister,
                        registerStartTime: data.resultBean.registerStartTime,
                        registerEndTime: data.resultBean.registerEndTime,
                        needStartTime: data.resultBean.needStartTime,
                        startTime: data.resultBean.startTime,
                        lastTime: data.resultBean.lastTime,
                        isPublish: data.resultBean.isPublish,
                        view: data.resultBean.view,
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

    render() {
        let rangeTime;
        if (this.state.registerStartTime != null)
            rangeTime = [moment(this.state.registerStartTime), moment(this.state.registerEndTime)];
        else rangeTime = [null, null];
        
        // console.log(this.state.lastTime);
        // console.log(this.state.needStartTime);

        return (
            <div>
            <BackTop />
            <Card title={this.state.announcementTitle}>
                <strong>创建人:&nbsp;&nbsp;{this.state.createRealName}</strong>
                <br />
                <strong>创建时间:</strong>&nbsp;&nbsp;
                <DatePicker style={{ width: 200 }} format="YYYY-MM-DD HH:mm:ss" value={moment(this.state.createTime)} disabled />
                <br /><br />
                <strong>更新人:&nbsp;&nbsp;{this.state.updateRealName}</strong>
                <br />
                <strong>更新时间:</strong>&nbsp;&nbsp;
                <DatePicker  style={{ width: 200 }} format="YYYY-MM-DD HH:mm:ss" value={moment(this.state.updateTime)} disabled />
                <br /><br />
                <strong>类别:</strong>&nbsp;&nbsp;
                <Tag color={this.state.announcementTagColor} key={this.state.announcementTagName}>{this.state.announcementTagName}</Tag>
                {
                    this.state.needStartTime == 0 ? null : 
                    <span>
                        &nbsp;&nbsp;<strong>{this.state.announcementTagName}开始时间:</strong>&nbsp;&nbsp;
                        <DatePicker format="YYYY-MM-DD HH:mm:ss" value={moment(this.state.startTime)} style={{width:200}} disabled />
                        &nbsp;&nbsp;<strong>{this.state.announcementTagName}持续时间:</strong>&nbsp;&nbsp;
                        <Input value={this.state.lastTime} disabled style={{ height: 30, width: 200 }} />
                    </span>
                }
                <br />
                <strong>是否需要报名:&nbsp;&nbsp;{ this.state.isRegister == true ? "是" : "否" }</strong>
                {
                    this.state.isRegister == false ? null :
                        <span><br />
                            <strong>报名起止时间:&nbsp;&nbsp;</strong>
                            <RangePicker 
                                disabled
                                format="YYYY-MM-DD HH:mm:ss"
                                value={rangeTime} 
                                style={{ width: 400 }} />
                        </span>
                }
                <br />
                <strong>是否发布:&nbsp;&nbsp;</strong>
                {
                    this.state.isPublish == 0 ?
                        <Tag color="gray">未发布[草稿]</Tag> 
                        : <Tag color="blue">已发布</Tag>
                }
                <br />
                <br />
                <strong>内容:</strong>&nbsp;&nbsp;
                <div dangerouslySetInnerHTML={{__html: this.state.announcementBody}} />
                <Icon type="eye" /> {this.state.view}
            </Card>
            </div>
        );
    }
}

export default connect()(DetailAnnouncement);