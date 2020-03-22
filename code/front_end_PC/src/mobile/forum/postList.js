import React from 'react';
import './index.less';
import { Divider, message, notification, Icon, Avatar, Pagination, Empty} from 'antd';
import { Tabs, NavBar, Badge, ActionSheet } from 'antd-mobile';
import Fetch from '../../fetch';
import { SelectAnnouncement, SelectAnnouncementTag } from '../../config/dataAddress';
import moment from 'moment';
import 'moment/locale/zh-cn';
import './index.less';

moment.locale('zh-cn');

const tabs = [
    { title: <Badge text={'3'}>关注</Badge> },
    { title: <Badge text={'今日(20)'}>最新</Badge> },
];

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

        return (
            <div style={{ backgroundColor: '#ffffff' }} >
                <div style={{ display: 'flex', marginLeft: 15, marginRight: 10, paddingTop: 10, fontSize: 12}}>
                    <Avatar src={item.avatar} style={{ height: 25, width: 25}}/>
                    <a style={{ paddingLeft: 5, paddingTop: 1, fontSize: 14, width: 260 }}>{item.userName}</a>
                    <div style={{ color: '#B5B5B5', paddingTop: 5, paddingRight: 10 }} className="postBriefTime">{moment(item.createTime).fromNow()}</div>
                </div>
                <div style={{ display: '-webkit-box', display: 'flex', padding: '0px 15px' }} onClick={() => this.props.history.push('/mobile/forum/detail/'+item.postId)}>
                    <div style={{ marginBottom: 8 }}>
                        <span style={{ fontSize: 16, color: '#000000', fontWeight: 'bold' }}>{item.title}</span>
                        <p style={{ fontSize: 9, color: '#828282', marginTop: 7 }}>{item.brief}</p>
                        <span>
                            <Icon type="eye" style={{ color: '#FF8C69', paddingRight: 1 }}/><span style={{ fontSize: 6 ,color: '#B5B5B5', paddingRight: 5 }}>{item.view}</span>
                            <HeartIcon style={{ color: 'hotpink', paddingRight: 1, paddingLeft: 5 }} /><span style={{ fontSize: 6 ,color: '#B5B5B5' }}>{item.like}</span>
                            <Icon type="message" theme="twoTone" style={{ paddingRight: 1, paddingLeft: 15, fontSize: 12 }}/><span style={{ fontSize: 6 ,color: '#B5B5B5'}}>{item.comment}</span>
                        </span>
                    </div>
                    <div style={{ padding: 5 }}>
                        <img style={{ height: 70, width: 85 }} src={item.img} alt="头像" />
                    </div>
                </div>
                <Divider style={{ marginTop: 0, marginBottom: 0}}/>
            </div>
        );
    }
}


class ShowAttention extends React.Component {

    state = {
        avatar: 'http://localhost:9999/avatar/zhangwei.jpg',
        userName: '谢仁义解放后带建设方科技',
        createTime: '2020-02-01 20:23:01',
        title: '这是一个标题',
        brief: '少年就是少年，他们看春风不喜，看夏蝉不烦，看秋风不悲，看冬雪不叹，看满身富贵...',
        auth: '谢仁义',
        like: 5,
        view: 1000,
        comment: 10,
        img: 'http://localhost:9999/photo/0036bcd3-a5e9-478e-8ee4-cdc8443ba525.jpg',
    }

    render() {
        return (
            <div>
                <PostBrief item={this.state} {...this.props}/>
                <PostBrief item={this.state} />
                <div className="postPagination" style={{ marginTop: 5}}>
                    <Pagination />
                </div>
            </div>
        );
    }
}


class ShowLatest extends React.Component {

    // state =

    render() {
        let len = 0;
        return (
            <div>
                {
                    len == 0 ? <div style={{ backgroundColor: '#ffffff'}}><Empty description="暂无帖子" /></div> : null
                }
            </div>
        );
    }
}


// tabs 用div块来分割的..
class ShowPostList extends React.Component {

    render() {
        return (
            <div>
                <Tabs tabs={tabs}
                    initialPage={0}
                    onChange={(tab, index) => { console.log('onChange', index, tab); }}
                    onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
                >
                <ShowAttention {...this.props}/>
                <ShowLatest {...this.props}/>
                </Tabs>
            </div>
        );
    }
}

export default class MobilePostList extends React.Component {

    constructor(props) {
        super(props);
    }

    handleShowActionSheet = () => {
        const BUTTONS = ['较赞在前', '发布帖子', '取消'];
        ActionSheet.showActionSheetWithOptions({
            options: BUTTONS,
            cancelButtonIndex: BUTTONS.length - 1,
            maskClosable: true,
        },
        (buttonIndex) => {
            // console.log(buttonIndex)
            if (buttonIndex == 0) {
                
            } else if (buttonIndex == 1) {
                this.props.history.push('/mobile/forum/addPost');
            }
        });
    }

    render() {
        // console.log(this.props.history);
        return (
            <div>
                <NavBar
                    mode="dark"
                    rightContent={[
                        <Icon key="0" type="search" style={{ marginRight: '16px' }} onClick={() => this.props.history.push('/mobile/forum/search')} />,
                        <Icon key="1" type="ellipsis" style={{ fontSize: 23 }} onClick={this.handleShowActionSheet}/>,
                    ]}
                >讨论区</NavBar>
                <ShowPostList {...this.props}/>
            </div>
        );
    }
}