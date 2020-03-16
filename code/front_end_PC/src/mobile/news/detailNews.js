import React from 'react';
import './index.less';
import { Divider, Typography, Icon, Comment, Avatar, message, notification, Tag} from 'antd';
import { Link } from "react-router-dom";
import { Modal, WingBlank, NavBar, WhiteSpace, Button, Toast } from 'antd-mobile';
import Fetch from '../../fetch';
import { DetailNewsUrl, UpdateNewsViewAndLike } from '../../config/dataAddress';
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

const { Title, Paragraph, Text } = Typography;

export default class MobileDetailNews extends React.Component {

    state = {
        visible: false,
    }

    constructor(props) {
        super(props);
        this.state = {
            newsId: '',
            newsTitle: '',
            newsBody: '',
            newsTagName: '',
            newsTagColor: '',
            createUser: '',
            createTime: '',
            view: 0,
            fromWhere: '',
            likeTotal: 0,
            isNowUserLikeThisNews: '',
        }
    }

    componentWillMount() {
        this.getData();
    }

    getData() {

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
                        createTime: data.resultBean.createTime,
                        isRegister: data.resultBean.isRegister,
                        view: data.resultBean.view+1,
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
        // console.log(this.state.avatar);

        const { isNowUserLikeThisNews } = this.state;

        return (
            <div className="mainContainer">
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() =>  window.history.back(-1)}
                >
                    新闻详情
                </NavBar>
                <Divider style={{ margin: 0}} />
                <div className="detailNews">
                    <span style={{fontSize: 5, color: '#B5B5B5' }}>首页 > 新闻 > 新闻详情 </span>
                    <Title level={3}>{this.state.newsTitle}</Title>
                    
                    <span style={{fontSize: 5, color: '#B5B5B5' }}>来源:{this.state.fromWhere} {this.state.createTime}</span>

                    <Paragraph style={{ marginTop: 5 }}>
                        <div dangerouslySetInnerHTML={{__html: this.state.newsBody}} />
                    </Paragraph>
                    <span style={{fontSize: 5, color: '#B5B5B5' }}>
                        类别: <Tag color={this.state.newsTagColor}>{this.state.newsTagName}</Tag>
                        <span className="announcer">发布者:{this.state.createUser}</span>
                    </span>
                    <WhiteSpace size="sm" />
                    <Icon type="eye" /> {this.state.view} &nbsp;&nbsp;
                    <Icon type="like" theme={isNowUserLikeThisNews ? 'filled' : 'outlined'} 
                        onClick={() => this.handleClickLike()} /> {this.state.likeTotal}
                </div>
                <br />
            </div>
            
        );
    }
    
    // 更新此公告的浏览量
    componentWillUnmount() {

        let like = this.state.isNowUserLikeThisNews ? 1 : 0; 

        Fetch.requestPost({
            url: UpdateNewsViewAndLike,
            info: 'newsId='+this.props.match.params.id+'&view='+this.state.view
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
