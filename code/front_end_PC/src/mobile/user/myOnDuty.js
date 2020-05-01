import React from 'react';
import { NavBar, List } from 'antd-mobile';
import { Icon, Typography, Empty, message, notification, Divider } from 'antd';
import { GetMyOnDuty } from './../../config/dataAddress';
import Fetch from './../../fetch/index.js';

const { Title, Paragraph, Text } = Typography;


export default class MobileUserMyOnDuty extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            complete: [], // 完成的
            undone: [], // 未完成的
        }
    }

    componentWillMount() {
        this.getMyUndoneOnDutyData();
        this.getMyCompleteOnDutyData();
    }

    // 1 是降序, 0 是升序
    // 完成了的成降序显示, 未完成的升序显示
    getMyUndoneOnDutyData() {
        Fetch.requestPost({
            url: GetMyOnDuty,
            info: 'aOrs=0',
            timeOut: 3000,
        }).then ( 
            data => {
                if (data.status == 0) {
                    this.setState({
                        undone: data.resultBean,
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

    getMyCompleteOnDutyData() {
        Fetch.requestPost({
            url: GetMyOnDuty,
            info: 'aOrs=1',
            timeOut: 3000,
        }).then ( 
            data => {
                if (data.status == 0) {
                    this.setState({
                        complete: data.resultBean,
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

        const { undone, complete } = this.state;
		return(
            <div>
                <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={() =>  window.location.href="/#/mobile/home/3"}
                >我的值日</NavBar>
                
                <List renderHeader={() => '待完成'}>
                {
                    undone.length == 0 ? <Empty description="暂无值日安排哦"/> :
                    undone.map((item) => 
                        <div key={item.onDutyId}>
                        <div style={{ height: 30 }}>
                        <span style={{ fontSize: 16, marginLeft: 20 }} >{item.onDutyStartTime} ~ {item.onDutyEndTime}</span>
                        </div>
                        <Divider style={{ marginTop: 0, marginBottom: 0}}/>
                        </div>
                    )
                }
                </List>

                <List renderHeader={() => '已完成'}>
                {
                    complete.length == 0 ? <Empty description="无数据"/> :
                    complete.map((item) => 
                        <div key={item.onDutyId}>
                        <div style={{ height: 45 }}>
                        <span style={{ fontSize: 16, marginLeft: 20 }} >{item.onDutyStartTime} ~ {item.onDutyEndTime}</span>
                        </div>
                        <Divider style={{ marginTop: 0, marginBottom: 0}}/>
                        </div>
                    )
                }
                </List>
                    
            </div>
		);
	}
}