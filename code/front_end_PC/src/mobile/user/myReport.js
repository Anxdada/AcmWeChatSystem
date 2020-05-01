import React from 'react';
import { NavBar, List } from 'antd-mobile';
import { Icon, Typography, Empty, message, notification, Divider, Badge } from 'antd';
import { GetMyReport } from './../../config/dataAddress';
import Fetch from './../../fetch/index.js';

const { Title, Paragraph, Text } = Typography;

class DetailReport extends React.Component{
    render() {
        const { item } = this.props;
        return (
            <div>
                <strong>举报时间</strong>: {item.createTime}<br />
                <strong>类型(i</strong>d): {item.type}({item.typeId})<br />
                <strong>举报理由</strong>: {item.reason}<br />
                <strong>举报说明</strong>: {item.reportBody}<br />
                <strong>是否处理</strong>: <Badge status={item.isHandle == 0 ? "error" : "success"} />{item.isHandle == 0 ? "未处理" : "已处理"}<br />
                <strong>处理结果</strong>: {item.isHandle == 0 ? "无" : item.result}<br />
                <Divider style={{ marginTop: 2, marginBottom: 2}}/>
            </div>
        );
    }
}

export default class MobileUserMyReport extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            allReport: [],
        }
    }

    componentWillMount() {
        this.getReportDate();
    }

    getReportDate() {
        Fetch.requestGet({
            url: GetMyReport,
            timeOut: 3000,
        }).then ( 
            data => {
                if (data.status == 0) {
                    this.setState({
                        allReport: data.resultBean,
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
        return (
            <div>
            <NavBar
                mode="dark"
                icon={<Icon type="left" />}
                onLeftClick={() =>  window.location.href="/#/mobile/home/3"}
            >我的举报</NavBar>
            
            
            <div style={{ backgroundColor: '#FFFFFF'}}>
            {
                this.state.allReport.map((item) =>
                    <DetailReport item={item}/>
                )
            }
            </div>
            </div>
        );
    }
}
