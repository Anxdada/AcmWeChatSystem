import React from 'react';
import { Divider, message, notification, Icon, Avatar, Pagination, Empty } from 'antd';
import { SearchBar } from 'antd-mobile';
import moment from 'moment';
import 'moment/locale/zh-cn';
import Fetch from '../../fetch';
import { SelectPost } from '../../config/dataAddress';

moment.locale('zh-cn');

function getTextString(htmls) {
    let div = document.createElement("div");
    div.innerHTML = htmls;
    const text = div.textContent || div.innerText;
    let i = 0;
    for (; i < text.length ; ++ i) {
        if (text[i] != 0) break; 
        // 去掉前面的空格
    }
    return text.substring(i, 53);
}  // 这样可以只取html元素中的text


const HeartSvg = () => (
    <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 1024 1024">
        <path d="M923 283.6c-13.4-31.1-32.6-58.9-56.9-82.8-24.3-23.8-52.5-42.4-84-55.5-32.5-13.5-66.9-20.3-102.4-20.3-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5-24.4 23.9-43.5 51.7-56.9 82.8-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3 0.1-35.3-7-69.6-20.9-101.9z" />
    </svg>
);

const HeartIcon = props => <Icon component={HeartSvg} {...props} />;


//  css3 的样式-webkit-box 盒子模型
class PostBrief extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        const { item } = this.props;
        // console.log(this.props.history);
        // console.log(item.firstImg);

        const FirstImgComponent = <div style={{ padding: 5 }}>
            <img style={{ height: 70, width: 85 }} src={item.firstImg} alt="小图" />
        </div>

        return (
            <div style={{ backgroundColor: '#ffffff' }} >
                <div style={{ display: 'flex', marginLeft: 15, marginRight: 10, paddingTop: 10, fontSize: 12}}>
                    <Avatar src={item.avatar} style={{ height: 25, width: 25}}/>
                    <a style={{ paddingLeft: 5, paddingTop: 1, fontSize: 14, width: 260 }}>{item.createUserName}</a>
                    <div style={{ color: '#B5B5B5', paddingTop: 5, paddingRight: 10 }} className="postBriefTime">{moment(item.createTime).fromNow()}</div>
                </div>
                <div style={{ display: '-webkit-box', display: 'flex', padding: '0px 15px' }} onClick={() => this.props.history.push('/mobile/forum/detail/'+item.postId)}>
                    <div style={{ marginBottom: 8, width: 500, marginTop: 5 }}>
                        <span style={{ fontSize: 16, color: '#000000', fontWeight: 'bold' }}>{item.postTitle}</span>
                        <p style={{ fontSize: 9, color: '#828282', marginTop: 7 }}>{getTextString(item.postBody)}...</p>
                        <span>
                            <Icon type="eye" style={{ color: '#FF8C69', paddingRight: 1 }}/><span style={{ fontSize: 6 ,color: '#B5B5B5', paddingRight: 5 }}>{item.views}</span>
                            <HeartIcon style={{ color: 'hotpink', paddingRight: 1, paddingLeft: 5 }} /><span style={{ fontSize: 6 ,color: '#B5B5B5' }}>{item.like}</span>
                            <Icon type="message" theme="twoTone" style={{ paddingRight: 1, paddingLeft: 15, fontSize: 12 }}/><span style={{ fontSize: 6 ,color: '#B5B5B5'}}>{item.totComment}</span>
                        </span>
                    </div>
                    {
                        item.firstImg == undefined ? null : FirstImgComponent
                    }
                </div>
                <Divider style={{ marginTop: 0, marginBottom: 0}}/>
            </div>
        );
    }
}

export default class MobileSearchPostPage extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            nowPage: 1,
            totalPage: 1,
            pageSize: 10,
            totComment: 0,
            searchPostTitle: '',
            flag: 0,  // 用来表示一个不可能的标题字
            allPost: [],
        }
    }

    componentDidMount() {
        this.autoFocusInst.focus();
    }

    getPostData() {

        const postTitle = this.state.flag == -1 ? "魑魅" : this.state.searchPostTitle;

        Fetch.requestPost({
            url: SelectPost,
            info: 'postTitle='+postTitle+'&pageNum='+this.state.nowPage
                    +'&pageSize='+this.state.pageSize,
            timeOut: 3000,
        }).then ( 
            data => {
                console.log(data);
                if (data.status == 0) {
                    if(data.resultBean.currentPage > 0) {
                        this.setState({ nowPage: data.resultBean.currentPage });
                    } else {
                        this.setState({ nowPage: 1 });
                    }
                    this.setState({
                        totalPage: data.resultBean.totalItems/data.resultBean.pageSize,
                        allPost: data.resultBean.items,
                        totComment: data.resultBean.totComment,
                    });
                } else {
                    this.setState({
                        nowPage: 1,
                        totalPage: 1,
                        allPost: []
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
        }, () => this.getPostData());
    }

    handleChangeSearch = (value) => {
        // console.log(e);
        let flag = 0;
        if (value == 0) flag = -1; // 附一个不可能的值, 这样就没有符合的帖子
        this.setState({
            searchPostTitle: value,
            flag,
        }, () => this.getPostData());
    }
    

    render() {
        // console.log('xierenyi' + this.state.totalPage);
        return (
            <div>
                <SearchBar placeholder="搜索帖子" ref={ref => this.autoFocusInst = ref} 
                    onSubmit={this.handleOnSubmit} onChange={this.handleChangeSearch} 
                    onCancel={() =>  window.location.href="/#/mobile/home/2"}
                    value={this.state.searchPostTitle}
                />
                {
                    this.state.allPost.length == 0 ? <div style={{ backgroundColor: '#ffffff'}}><Empty description="暂无帖子" /></div> :
                    <div>
                        {
                            this.state.allPost.map((item) =>
                                <PostBrief item={item} key={item.postId} {...this.props} />
                            )
                        }
                        <div className="postPagination" style={{ marginTop: 5, marginBottom: 5 }}>
                            <Pagination total={this.state.totalPage * this.state.pageSize} current={this.state.nowPage} 
                                onChange={this.handlePageChange} pageSize={this.state.pageSize} />
                        </div>
                    </div>
                }
            </div>
        );
    }
}