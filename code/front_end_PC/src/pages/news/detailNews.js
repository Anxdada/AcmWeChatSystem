import React from 'react';
import { Card, DatePicker, Tag, message, notification, Icon, Typography } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { connect } from 'react-redux';
import { switchMenu, addMenu } from './../../redux/actions'; 
import { DetailNewsUrl, UpdateNewsViewAndLike } from './../../config/dataAddress';
import cookie from 'react-cookies';
import Fetch from './../../fetch';

moment.locale('zh-cn');

const { Title, Paragraph, Text } = Typography;

class DetailNews extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            newsTitle: '',
            newsBody: '',
            newsTagName: '',
            newsTagColor: '',
            createRealName: '',
            createTime:'',
            updateRealName: '',
            updateTime: '',
            isPublish: '',
            view: 0,
            fromWhere: '',
            likeTotal: 0,
            isNowUserLikeThisNews: '',
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
                        createRealName: data.resultBean.createRealName,
                        createTime:data.resultBean.createTime,
                        updateRealName: data.resultBean.updateRealName,
                        updateTime: data.resultBean.updateTime,
                        isPublish: data.resultBean.isPublish,
                        view: data.resultBean.view,
                        fromWhere: data.resultBean.fromWhere,
                        likeTotal: data.resultBean.like,
                        isNowUserLikeThisNews: data.resultBean.isNowUserLikeThisNews,
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

    handleClickLike = () => {
        const { likeTotal, isNowUserLikeThisNews } = this.state;
        let num = isNowUserLikeThisNews ? -1 : 1; 
        this.setState({
            likeTotal: likeTotal + num,
            isNowUserLikeThisNews: !isNowUserLikeThisNews,
        })
    }

    render() {
        let rangeTime;
        if (this.state.registerStartTime != null)
            rangeTime = [moment(this.state.registerStartTime), moment(this.state.registerEndTime)];
        else rangeTime = [null, null];

        const { isNowUserLikeThisNews } = this.state;

        return (
            <Card title={this.state.newsTitle}>
                <strong>创建人:&nbsp;&nbsp;{this.state.createRealName}</strong>
                <br />
                <strong>创建时间:</strong>&nbsp;&nbsp;
                <DatePicker style={{ width: 200 }} format="YYYY-MM-DD HH:mm:ss" value={moment(this.state.createTime)} disabled />
                <br /><br />
                <strong>更新人:&nbsp;&nbsp;{this.state.updateRealName}</strong>
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
                <Paragraph>
                    <div dangerouslySetInnerHTML={{__html: this.state.newsBody}} />
                </Paragraph>
                <Icon type="eye" /> {this.state.view}&nbsp;&nbsp;
                <Icon type="like" theme={isNowUserLikeThisNews ? 'filled' : 'outlined'} 
                        onClick={() => this.handleClickLike()} /> {this.state.likeTotal}
                <span className="newsFromWhere" style={{ fontSize: 10, color: '#9C9C9C' }}>来源: {this.state.fromWhere}</span>
            </Card>
        );
    }

    // 主要是更新点赞的情况. 因为浏览量只能在手机端增加
    // 所以这是view == -1, 不更新数据库
    componentWillUnmount() {

        let like = this.state.isNowUserLikeThisNews ? 1 : 0; 

        Fetch.requestPost({
            url: UpdateNewsViewAndLike,
            info: 'newsId='+this.props.match.params.id+'&view=-1'
                    +'&like='+like,
            timeOut: 3000,
        }).then(
            data => {
                if (data.status == 0) ;
                else if (data.status < 100) {
                    message.error(data.msg);
                } else {
                    notification.error({
                        message: data.error,
                        description: data.message
                    });
                }
            }
        ).catch( err => {
            // console.log("err", err);
            message.error('连接超时! 请检查服务器是否启动.');
        });
    }
}

export default connect()(DetailNews);