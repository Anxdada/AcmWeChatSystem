import React from 'react';
import './index.less';
import { Pagination, Menu, Icon, Input, Divider, Row, Col, Table, Tag, Select, message, Tooltip, notification, } from 'antd';
import { WingBlank, NavBar, WhiteSpace, Button } from 'antd-mobile';
import Fetch from './../../fetch';
import { SelectFriendUrl } from './../../config/dataAddress';
import { tagsColorList, urlTags } from './../../config/urlTagsAbout';

const locale = {
    prevText: 'Prev',
    nextText: 'Next',
};

class UrlColorTag extends React.Component {
    render() {
        let colorId = 0;
        const tag = this.props.text; 
        //console.log(tag);
        for (var i = 0 ; i < urlTags.length ; ++ i) {
            if (tag == urlTags[i]) {
                colorId = i;
                break;
            }
        }
        //console.log(colorId);
        return (
            <Tag color={tagsColorList[colorId]} key={tag} > {tag} </Tag>
        );
    }
}

class ShowTable extends React.Component{

    constructor(props) {
        super(props);
        this.columns = [
            {
                title: '友链名称',
                dataIndex: 'friendUrlName',
                key: 'friendUrlName',
                align: 'center',
            },
            {
                title: '友链网址',
                dataIndex: 'friendUrlAddress',
                key: 'friendUrlAddress',
                align: 'center',
                width: 100,
                render: text => <a href={"http://" + text}>{text}</a>,
            },
            {
                title: '类别',
                key: 'friendUrlTag',
                dataIndex: 'friendUrlTag',
                align: 'center',
                render: (text, record) => (
                    <span>
                        <UrlColorTag text={text} />
                    </span>
                )
            },
        ];
    }

    render() {
        return(
            <div style={{ marginTop: 5}} className="tableBackground">
                <Table columns={this.columns} dataSource={this.props.allFriendUrl} pagination={false} 
                    rowKey={record => record.friendUrlId}
                />   
            </div>
        );
    }
}

class ShowFriendUrl extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            nowPage: 1,
            totalPage: 1,
            pageSize: 7,
            allFriendUrl: [],
        }
    }

    componentWillMount() {
        this.getData();
    }

    getData() {

        Fetch.requestPost({
            url: SelectFriendUrl,
            info: 'pageNum='+this.state.nowPage+'&pageSize='+this.state.pageSize,
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
                        allFriendUrl: data.resultBean.items,
                    });
                } else {
                    this.setState({
                        nowPage: 1,
                        totalPage: 1,
                        allFriendUrl: [],
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
        console.log(page);
        this.setState({ 
            nowPage: page,
        }, () => this.getData());
    }


    render() {
        return (
            <div style={{ margin: '0 auto', minHeight:400}}>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() =>  window.history.back(-1)}
                >
                    友情链接
                </NavBar>
                <Divider style={{ margin: 0}} />
                <WingBlank size="sm">
                    <span style={{fontSize: 5, color: '#B5B5B5' }}>首页 > 友情链接 </span><br />
                    <ShowTable allFriendUrl={this.state.allFriendUrl}/>
                    <div style={{ marginTop: 3 }} className="pagination">
                        <Pagination total={this.state.totalPage*this.state.pageSize} current={this.state.nowPage}
                            onChange={this.handlePageChange} pageSize={this.state.pageSize} />
                    </div>
                </WingBlank>
            </div>
        );
    }
}


export default class MobileFriendUrlPage extends React.Component {

    render() {
        return (
            <div>
                <ShowFriendUrl />
            </div>
        );
    }
}