import React from 'react';
import './index.less';
import { Icon, Typography, Select, message, notification, Tag, Divider, BackTop } from 'antd';
import { List, WingBlank, NavBar, WhiteSpace, Picker } from 'antd-mobile';
import Fetch from '../../fetch';
import { SelectNews, SelectNewsTag } from '../../config/dataAddress';
import moment from 'moment';
import 'moment/locale/zh-cn';
import InfiniteScroll from 'react-infinite-scroller';


moment.locale('zh-cn');
const { Option } = Select;
const { Title, Paragraph, Text } = Typography;

function getTextString(htmls) {
    let div = document.createElement("div");
    div.innerHTML = htmls;
    const text = div.textContent || div.innerText || "";
    return text.substring(0, 50);
}  // 这样可以只取html元素中的text

class SingleNewsView extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {item} = this.props;
        // console.log(item.firstImg);
        return (
            <div onClick={() => this.props.history.push('/mobile/news/detail/'+item.newsId)}>
                <p style={{ height: 1 }} />
                <span style={{ fontSize: 16, color: '#000000' }}> {item.newsTitle} </span>
                <div style={{ marginTop: 10 }}>
                    <p style={{ fontSize: 13 }}> {getTextString(item.newsBody)}... </p>
                    {
                        item.firstImg == undefined ? null :
                        <img src={item.firstImg} style={{ width: 70, height: 50}}/>
                    }
                </div>
                <div style={{ marginTop: 6 }} >
                    <span style={{ fontSize: 3, color: '#828282'}}>{item.createUser} {moment(item.createTime).fromNow()}</span>
                </div>
                <Divider style={{ marginTop: 15, marginBottom: 0 }}/>
            </div>
        );
    }
}

class ShowNewsList extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            nowPage: 1,
            totalPage: 1,
            pageSize: 10,
            allTag: [],
            allNews: [],
            searchTag: undefined,
            colorValue: ['cyan'],
        }
    }

    componentWillMount() {
        this.getTagData();
        this.getData();
    }

    getTagData() {
        Fetch.requestPost({
            url: SelectNewsTag,
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

    getData() {

        let searchTag = '';
        if (this.state.searchTag != undefined) {
            searchTag = this.state.searchTag;
        }

        Fetch.requestPost({
            url: SelectNews,
            info: '&searchTagId='+searchTag+'&pageNum='+this.state.nowPage+'&isPublish=1',
            timeOut: 3000,
        }).then ( 
            data => {
                // console.log(data);
                if (data.status == 0) {
                    if(data.resultBean.currentPage > 0) {
                        this.setState({ nowPage: data.resultBean.currentPage });
                    } else {
                        this.setState({ nowPage: 1 });
                    }
                    this.setState({
                        totalPage: data.resultBean.totalPage,
                        allNews: data.resultBean.items,
                    });
                } else {
                    this.setState({
                        nowPage: 1,
                        totalPage: 1,
                        allNews: []
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

    onChangeColor = (color) => {
        // console.log(color);

        const { allTag } = this.state;
        let tmpSearchTag = '';
        console.log(color[0])
        for (let i = 0 ; i < allTag.length ; ++ i) {
            // console.log(allTag[i].newsTagColor);
            if(allTag[i].newsTagColor == color[0]) {
                tmpSearchTag = allTag[i].newsTagId;
                break;
            }
        }

        this.setState({
            colorValue: color,
            searchTag: tmpSearchTag,
        }, () => this.getData());
    }

    render() {

        // const data = this.state.allTag.map((item) => 
        //     <Tag color={item.newsTagColor} key={item.newsTagId}>{item.newsTagName}</Tag>
        // )

        const data = [
            {
                label:
                (<Tag color="cyan">全部</Tag>),
                value: 'cyan',
                key: -1,
            },
        ];

        const { allTag } = this.state;

        for (let i = 0 ; i < allTag.length ; ++ i) {
            data.push({
                label: (<Tag color={allTag[i].newsTagColor}>{allTag[i].newsTagName}</Tag>),
                value: allTag[i].newsTagColor,
                key: allTag[i].newsTagId,
            })
        }

        return (
            <div>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() =>  window.location.href="/#/mobile/home/1"}
                >
                    新闻列表
                </NavBar>

                <BackTop />
                <WingBlank size="sm" >
                    <span style={{ fontSize: 5, color: '#B5B5B5' }}>首页 > 新闻 </span><br />

                </WingBlank>
                <List>
                    <Picker
                        data={data}
                        value={this.state.colorValue}
                        cols={1}
                        onChange={this.onChangeColor}
                    >
                        <List.Item arrow="horizontal">筛选类型</List.Item>
                    </Picker>
                </List>
                <div style={{ marginTop: 5}} className="tableBackground">
                    <div style={{ marginLeft: 15, marginRight: 15}}>
                    {
                        this.state.allNews.map((item) => 
                            <SingleNewsView item={item} key={item.newsId} {...this.props}/>
                        )
                    }
                    </div>
                </div>
            </div>
        );
    }
}


export default class MobileNewsPage extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <ShowNewsList {...this.props}/>
            </div>
        );
    }
}