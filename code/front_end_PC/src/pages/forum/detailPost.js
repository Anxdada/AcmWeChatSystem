import React from 'react';
import { Card, DatePicker, message, notification, Tag } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { connect } from 'react-redux';
import { switchMenu,addMenu } from './../../redux/actions';
import { SelectLabel, DetailPostUrl } from '../../config/dataAddress';
import Fetch from './../../fetch';

moment.locale('zh-cn');

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

class DetailPost extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            createUser: '',
            createTime: null,
            updateUser: '',
            updateTime: null,
            postTitle: '',
            postTag: '',
            postBody: '',
            isHead: 0,
            isGreat: 0,
            isHot: 0,
            labels: [],
        }
    }

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
                title: '查看帖子详情',
                key: 'none',
            }
        ];
        dispatch(switchMenu(titleArray));
    }

    componentWillMount() {
        this.getLabelData();
        this.getPostData();
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
                        labels: data.resultBean.items,
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

    getPostData() {
        Fetch.requestPost({
            url: DetailPostUrl,
            info: 'postId='+this.props.match.params.id,
            timeOut: 3000,
        }).then ( 
            data => {

                if (data.status == 0) {
                    this.setState({
                        createUser: data.resultBean.createUser,
                        createTime: data.resultBean.createTime,
                        updateUser: data.resultBean.updateUser,
                        updateTime: data.resultBean.updateTime,
                        postTitle: data.resultBean.postTitle,
                        postTag: data.resultBean.postTag,
                        postBody: data.resultBean.postBody,
                        isHead: data.resultBean.isHead,
                        isGreat: data.resultBean.isGreat,
                        isHot: data.resultBean.isHot,
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
        const { labels } = this.state;
        let postLabels = [];
        for (let i = 0 ; i < labels.length ; ++ i) {
            if (!(this.state.postTag & (1<<labels[i].flag))) continue;
            postLabels.push(labels[i]);
        }
        return (
            <Card title={
                <span>
                    {this.state.postTitle}&nbsp;&nbsp;
                    {
                        this.state.isHead == 0 ? null : <Tag color="magenta">置顶&nbsp;&nbsp;</Tag>
                    }
                    {
                        this.state.isGreat == 0 ? null : <Tag color="volcano">精&nbsp;&nbsp;</Tag>
                    }
                    {
                        this.state.isHot == 0 ? null : <Tag color="red">热&nbsp;&nbsp;</Tag>
                    }
                </span>
            }>
                <strong>创建人:&nbsp;&nbsp;{this.state.createUser}</strong>
                <br />
                <strong>创建时间:</strong>&nbsp;&nbsp;
                <DatePicker format="YYYY-MM-DD" value={moment(this.state.createTime)} disabled />
                <br /><br />
                <strong>最近一次更新人:&nbsp;&nbsp;{this.state.updateUser}</strong>
                <br />
                <strong>最近一次更新时间:</strong>&nbsp;&nbsp;
                <DatePicker  style={{ width: 200 }} format="YYYY-MM-DD HH:mm:ss" value={moment(this.state.updateTime)} disabled />
                <br /><br />
                <strong>类别:</strong>&nbsp;&nbsp;
                {
                    postLabels.map((item) => 
                            <Tag color={item.labelColor} key={item.labelId}>{item.labelName}</Tag>
                    )
                }
                <br />
                <br />
                <strong>内容:</strong>&nbsp;&nbsp;
                <div dangerouslySetInnerHTML={{__html: this.state.postBody}} />
            </Card>
        );
    }
}

// 通过connect连接组件和redux数据,传递state数据和dispatch方法
export default connect()(DetailPost);