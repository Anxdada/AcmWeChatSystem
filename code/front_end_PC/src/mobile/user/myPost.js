import React from 'react';
import { NavBar, WingBlank } from 'antd-mobile';
import { Icon, Typography, Empty, message, notification, Pagination, Divider } from 'antd';
import { GetMyPost, GetLoginUserMobile } from './../../config/dataAddress';
import Fetch from './../../fetch/index.js';

const { Title, Paragraph, Text } = Typography;

const HeartSvg = () => (
    <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 1024 1024">
        <path d="M923 283.6c-13.4-31.1-32.6-58.9-56.9-82.8-24.3-23.8-52.5-42.4-84-55.5-32.5-13.5-66.9-20.3-102.4-20.3-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5-24.4 23.9-43.5 51.7-56.9 82.8-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3 0.1-35.3-7-69.6-20.9-101.9z" />
    </svg>
);

const HeartIcon = props => <Icon component={HeartSvg} {...props} />;

class MyPostBrief extends React.Component{
    
    render() {
        const { item } = this.props;
        return (
        <div style={{ backgroundColor: '#ffffff' }}>
            <WingBlank size="sm" >
            <div style={{ marginBottom: 5 }} onClick={() => this.props.history.push('/mobile/forum/detail/'+item.postId)}>
                <span style={{ fontSize: 5, color: '#B5B5B5' }}>发表于 {item.createTime}</span><br />
                <span style={{ color: '#000000', fontWeight: 'bold' }}>{item.postTitle}</span><br />
                <span>
                    <Icon type="eye" style={{ color: '#FF8C69', paddingRight: 1 }}/><span style={{ fontSize: 6 ,color: '#B5B5B5', paddingRight: 5 }}>{item.views}</span>
                    <HeartIcon style={{ color: 'hotpink', paddingRight: 1, paddingLeft: 5 }} /><span style={{ fontSize: 6 ,color: '#B5B5B5' }}>{item.like}</span>
                    <Icon type="message" theme="twoTone" style={{ paddingRight: 1, paddingLeft: 15, fontSize: 12 }}/><span style={{ fontSize: 6 ,color: '#B5B5B5'}}>{item.totComment}</span>
                </span>
            </div>
            <Divider style={{ marginTop: 0, marginBottom: 0}}/>
            </WingBlank>
        </div>
        );
    }
};


export default class MobileUserMyPost extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            nowPage: 1,
            totalPage: 1,
            pageSize: 10,
            totComment: 0,
            allMyPost: [],
            nowUser: {},
        }
    }

    componentWillMount() {
        this.getNowUserInfo();
        this.getMyPostData();
    }

    getNowUserInfo() {
        Fetch.requestGet({
            url: GetLoginUserMobile,
            timeOut: 3000,
        }).then ( 
            data => {
                if (data.status == 0) {
                    this.setState({
                        nowUser: data.resultBean,
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

    getMyPostData() {
        Fetch.requestPost({
            url: GetMyPost,
            info: 'pageNum='+this.state.nowPage+'&pageSize='+this.state.pageSize
                    +'&createUser='+this.props.match.params.id,
            timeOut: 3000,
        }).then ( 
            data => {
                if (data.status == 0) {
                    if(data.resultBean.currentPage > 0) {
                        this.setState({ nowPage: data.resultBean.currentPage });
                    } else {
                        this.setState({ nowPage: 1 });
                    }
                    this.setState({
                        totalPage: data.resultBean.totalItems/data.resultBean.pageSize,
                        allMyPost: data.resultBean.items,
                        totComment: data.resultBean.totComment,
                    });
                } else {
                    this.setState({
                        nowPage: 1,
                        totalPage: 1,
                        allMyPost: []
                    });
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

    handlePageChange = (page) => {
        // console.log(page);
        this.setState({ 
            nowPage: page,
        }, () => this.getMyPostData());
    }

	render() {
        const { allMyPost, nowUser } = this.state;
        const person = nowUser.userId == this.props.match.params.id ? "我" : "TA";
        const emptyDescription = person + "还没有发过帖子呢";

		return(
            <div>
                <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={() =>  window.location.href="/#/mobile/home/3"}
                >{person}发布的帖子({this.state.totalPage * this.state.pageSize})</NavBar>
                
                <div>
                {
                    allMyPost.length == 0 ? <Empty description={emptyDescription}/> : 
                    <div>
                        {
                            allMyPost.map((item) => 
                                <MyPostBrief item={item} key={item.postId} {...this.props} />
                            )
                        }
                        <div className="postPagination" style={{ marginTop: 5, marginBottom: 5 }}>
                            <Pagination total={this.state.totalPage * this.state.pageSize} current={this.state.nowPage} 
                                onChange={this.handlePageChange} pageSize={this.state.pageSize} />
                        </div>
                    </div>
                }
                </div>
            </div>
		);
	}
}