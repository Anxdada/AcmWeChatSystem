import React from 'react';
import './index.less';
import { Row, Col, message, Icon, Card, notification } from 'antd';
import ReactHighcharts from 'react-highcharts';
import Fetch from './../../fetch';
import { SelectUserStatistic } from '../../config/dataAddress';

class LineChart extends React.Component{

constructor(props) {
    
    super(props);
        this.state = {
            configUserRegister : {
                title: {
                    text: '用户注册量'
                },

                yAxis: {
                    title: {
                        text: '总数'
                    }
                },
                credits:{
                    enabled:false
                },
                xAxis:{
                    categories:[2019, 2020]
                },
                series: [{
                    name: '注册人数',
                    data: [2, 8]
                }],
            },
            configUserActive : {
                title: {
                    text: '用户活跃度'
                },
                yAxis: {
                    title: {
                        text: '总数'
                    }
                },
                credits:{
                    enabled:false
                },
                xAxis:{
                    categories:['2010','2011','2012','2013','2014','2015','2016','2017']
                },
                series: [{
                    name: '活跃人数',
                    data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
                }],
            }
        }
    }

    componentWillMount() {

    }

    render() {
        return (
            <div style={{ margin:'10px 0'}}>
                <Row gutter={16} >
                    <Col span={12} >
                      <ReactHighcharts config={this.state.configUserRegister} />
                    </Col>
                    <Col span={12} >
                      <ReactHighcharts config={this.state.configUserActive} />
                    </Col>
                </Row>
            </div>
        );
    }
}

class UserNumberStatistics extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            totUserNum: 0,
            totManageNum: 0,
            totTeamNum: 0,
            totBlockNum: 0,
        }
    }

    componentWillMount() {
        this.getUserData();
    }

    getUserData() {
        // auth 根据规则获取普通用户的, 0-超级管理员 1-管理员 2-队员 3-萌新 4-未完善资料的萌新 5-拉黑用户 (后面的0-5是指身份值的数字的二进制的位数)
        // 比如 anth = 6, 那么这个人既是 管理员 又是 队员 (第多少位上是1, 代表他就具有该种身份)
        Fetch.requestGet({
            url: SelectUserStatistic,
            timeOut: 3000,
        }).then( 
            data => {
                console.log(data);
                if (data.status == 0) {
                    this.setState({
                        totUserNum: data.resultBean.totUserNum,
                        totManageNum: data.resultBean.totManageNum,
                        totTeamNum: data.resultBean.totTeamNum,
                        totBlockNum: data.resultBean.totBlockNum,
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
        )
    }

    render() {
        return (
            <div>
            <Row gutter={16} className="first">
            <Col span={6}>
                <Card title={<span><Icon type="team" /><span>用户总数</span></span>}>
                  <p style={{fontSize:'25px'}}><strong>{this.state.totUserNum}</strong></p>
                </Card>
            </Col>
            <Col span={6}>
                <Card title={<span><Icon type="team" /><span>管理员个数</span></span>}>
                  <p style={{fontSize:'25px'}}><strong>{this.state.totManageNum}</strong></p>
                </Card>
            </Col>
            <Col span={6}>
                <Card title={<span><Icon type="team" /><span>队员个人</span></span>}>
                  <p style={{fontSize:'25px'}}><strong>{this.state.totTeamNum}</strong></p>
                </Card>
            </Col>
            <Col span={6} >
                <Card title={<span><Icon type="team" /><span>拉黑用户个数</span></span>}>
                  <p style={{fontSize:'25px'}}><strong>{this.state.totBlockNum}</strong></p>
                </Card>
            </Col>
            </Row>
            </div>
        );
    }
}


export default class UserAnalysis extends React.Component {
    render() {
        return (
            <div>
                <UserNumberStatistics />
                <LineChart />
            </div>
        );
    }
}
