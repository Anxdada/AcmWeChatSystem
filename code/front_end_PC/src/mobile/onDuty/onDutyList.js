import React from 'react';
import './index.less';
import { Pagination, Icon, Divider, Card, Table, message, notification, Avatar } from 'antd';
import { WingBlank, NavBar, WhiteSpace, List } from 'antd-mobile';
import Fetch from '../../fetch';
import { SelectOnDuty } from '../../config/dataAddress';
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

const Item = List.Item;

class ShowList extends React.Component{


    render() {
        return(
            <div style={{ marginTop: 5}} className="tableBackground">
            {
                this.props.allOnDuty.map((item) => 
                    <Card key={item.onDutyId}>
                        <Card.Meta
                            avatar={
                                <Avatar src={item.avatar} />
                            }
                            title={item.onDutyUserName}
                            description={
                                <span>
                                值班周期: {item.onDutyStartTime} ~ 
                                <br />
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                {item.onDutyEndTime}
                                </span>
                            }
                        />
                    </Card>
                )
            }
            </div>
        );
    }
}

class ShowOnDutyList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            nowPage: 1,
            totalPage: 1,
            pageSize: 7,
            allOnDuty: [],
        }
    }

    componentWillMount() {
        this.getData();
    }

    getData() {

        Fetch.requestPost({
            url: SelectOnDuty,
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
                        allOnDuty: data.resultBean.items,
                    });
                } else {
                    this.setState({
                        nowPage: 1,
                        totalPage: 1,
                        allOnDuty: [],
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
        }, () => this.getData());
    }

    render() {
        return (
            <div>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() =>  window.location.href="/#/mobile/home/1"}
                >
                    值班表
                </NavBar>
                <Divider style={{ margin: 0}} />

                <WingBlank size="sm">
                <span style={{fontSize: 5, color: '#B5B5B5' }}>首页 > 值班表 </span><br />
                <List>
                    <Item
                        thumb={<Icon type="profile" theme="twoTone" />}
                        arrow="horizontal"
                        onClick={() => this.props.history.push('/mobile/onduty/needtodo')}
                    >
                        值班人员必看
                    </Item>
                </List>
                    <ShowList allOnDuty={this.state.allOnDuty}/>
                    <div style={{ marginTop: 3 }} className="pagination">
                        <Pagination simple total={this.state.totalPage*this.state.pageSize} current={this.state.nowPage}
                            onChange={this.handlePageChange} pageSize={this.state.pageSize} />
                    </div>
                </WingBlank>
            </div>
        );
    }
}


export default class MobileOnDutyList extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <ShowOnDutyList {...this.props}/>
            </div>
        );
    }
}