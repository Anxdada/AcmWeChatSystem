import React from 'react';
import './index.less';
import axios from 'axios';
import { Carousel, Timeline, Button, Statistic, Card, Row, Col, Icon, message, notification, Alert } from 'antd';
import { GetHomeData} from './../../config/dataAddress';
import Fetch from './../../fetch';

class HomeView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            like: 0,
            totData: {},
        }
    }

    componentWillMount() {
        this.getData();
    }

    getData() {
        Fetch.requestGet({
            url: GetHomeData,
            timeOut: 3000,
        }).then(
            data => {
                // console.log(data);
                if (data.status == 0) {
                    this.setState({
                        totData: data.resultBean,
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

    handleClickLike = () => {
        this.setState({
            like: this.state.like + 1,
        });
    }

    render() {
        return (
            <div>
                <Row gutter={16} className="first">
                    <Col span={6} className="first_one">
                        <Card title={<span><Icon type="like" />觉得系统好用的点个赞啊, 亲</span>}>
                        <Button type="primary" onClick={this.handleClickLike} >
                            +1
                        </Button>
                        <span className="likeNumber">{ this.state.like }</span>
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card title={<span><Icon type="team" /><span>用户数量</span></span>}>
                            <span className="otherNumber">2</span>
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card title={<span><Icon type="paper-clip" /><span>友链数量</span></span>}>
                            <span className="otherNumber">6</span>
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card title={<span><Icon type="desktop" /><span>帖子数量</span></span>}>
                            <span className="otherNumber">12</span>
                        </Card>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                    <Carousel autoplay style={{ width: 580 }}>
                        <img src="/images/acm.jpg" alt="logo" />
                        <img src="/images/family.jpg" alt="合照" />
                    </Carousel>
                    <Alert
                        message="Welcome!"
                        description="欢迎来到CUIT-ACM微信公众号后台,请严格遵守规定!"
                        type="info"
                        style={{ marginTop: 20}}
                    />
                    </Col>
                    <Col span={12}>
                    <Card title={<span>CUIT-ACM实验室大事件</span>} className="timeLineFormat">
                        <Timeline pending="To be continue ..." reverse="true">
                            <Timeline.Item color="green">2013年 成都信息工程大学ACM校队创办 </Timeline.Item>
                            <Timeline.Item color="green">2013年 我校首次进入区域赛 </Timeline.Item>
                            <Timeline.Item color="green">2014年 我校首获CCPC(国际大学生程序设计竞赛)铜奖, 赛站: 长沙</Timeline.Item>
                            <Timeline.Item color="green">2015年 我校首获ICPC(国际大学生程序设计竞赛)铜奖, 赛站: 西安</Timeline.Item>
                            <Timeline.Item color="green">2016年 我校首获ICPC(国际大学生程序设计竞赛)银奖, 赛站: 大连</Timeline.Item>
                            <Timeline.Item color="green">2017年 我校首获ICPC(国际大学生程序设计竞赛)金奖, 赛站: 青岛</Timeline.Item>
                            <Timeline.Item color="green">2018年 我校首获CCPC(中国大学生程序设计竞赛)银奖, 赛站: 桂林</Timeline.Item>
                        </Timeline>
                    </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default class Home extends React.Component {
    render() {
        return (
            <div>
                <HomeView />
            </div>
        );
    }
}