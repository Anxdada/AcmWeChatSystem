import React from 'react';
import { Card, DatePicker, Tag, message, notification } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { connect } from 'react-redux';
import { switchMenu, addMenu } from './../../redux/actions'; 
import { DetailNewsUrl } from './../../config/dataAddress';
import cookie from 'react-cookies';
import Fetch from './../../fetch';

moment.locale('zh-cn');

class DetailNews extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            newsTitle: '',
            newsBody: '',
            newsTagName: '',
            newsTagColor: '',
            createUser: '',
            createTime:'',
            updateUser: '',
            updateTime: '',
            isPublish: '',
        }
    }

    componentDidMount() {
        const { dispatch } = this.props;
        const titleArray = [
            {
                title: '新闻',
                key: 'none',
            },
            {
                title: '管理新闻',
                key: '/admin/news/manage',
            },
            {
                title: '查看新闻详情',
                key: 'none',
            }
        ];
        dispatch(switchMenu(titleArray));
    }

    componentWillMount() {
        this.getSingleNewsData();
    }

    getSingleNewsData() {
        // console.log(this.props.match.params.id);
        Fetch.requestPost({
            url: DetailNewsUrl,
            info: 'newsId='+this.props.match.params.id,
            timeOut: 3000,
        }).then ( 
            data => {
                // console.log(data);
                if (data.status == 0) {
                    this.setState({
                        newsId: data.resultBean.newsId,
                        newsTitle: data.resultBean.newsTitle,
                        newsBody: data.resultBean.newsBody,
                        newsTagName: data.resultBean.newsTagName,
                        newsTagColor: data.resultBean.newsTagColor,
                        createUser: data.resultBean.createUser,
                        createTime:data.resultBean.createTime,
                        updateUser: data.resultBean.updateUser,
                        updateTime: data.resultBean.updateTime,
                        isPublish: data.resultBean.isPublish,
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

        return (
            <Card title={this.state.newsTitle}>
                <strong>创建人:&nbsp;&nbsp;{this.state.createUser}</strong>
                <br />
                <strong>创建时间:</strong>&nbsp;&nbsp;
                <DatePicker format="YYYY-MM-DD" value={moment(this.state.createTime)} disabled />
                <br /><br />
                <strong>更新人:&nbsp;&nbsp;{this.state.updateUser}</strong>
                <br />
                <strong>更新时间:</strong>&nbsp;&nbsp;
                <DatePicker style={{ width: 200 }} format="YYYY-MM-DD HH:mm:ss" value={moment(this.state.updateTime)} disabled />
                <br /><br />
                <strong>类别:</strong>&nbsp;&nbsp;
                <Tag color={this.state.newsTagColor} key={this.state.newsTagName}>{this.state.newsTagName}</Tag>
                <strong>是否发布:&nbsp;&nbsp;</strong>
                {
                    this.state.isPublish == 0 ?
                        <Tag color="gray">未发布[草稿]</Tag> 
                        : <Tag color="blue">已发布</Tag>
                }
                <br />
                <br />
                <strong>内容:</strong>&nbsp;&nbsp;
                <div dangerouslySetInnerHTML={{__html: this.state.newsBody}} />
            </Card>
        );
    }
}

export default connect()(DetailNews);