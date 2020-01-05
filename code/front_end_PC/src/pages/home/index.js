import React from 'react';
import './index.less';
import { Carousel, Timeline, Button, Statistic, Card, Row, Col, Icon } from 'antd';

export default class Home extends React.Component {

    state = {
        like: 0
    }

    handleClickLike = () => {
        this.setState({
            like: this.state.like + 1,
        });
    }

    render() {
        return (
            <div className="content">
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
                    <Card title={<span><Icon type="team" /><span>用户个数</span></span>}>
                            <span className="otherNumber">2</span>
                        </Card>
                    </Col>
                    <Col span={6}>
                    <Card title={<span><Icon type="paper-clip" /><span>友链个数</span></span>}>
                            <span className="otherNumber">6</span>
                        </Card>
                    </Col>
                    <Col span={6}>
                    <Card title={<span><Icon type="desktop" /><span>帖子个数</span></span>}>
                            <span className="otherNumber">12</span>
                        </Card>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                    <Carousel autoplay>
                        <img src="/images/acm.jpg" alt="logo" />
                        <img src="/images/family.jpg" alt="合照" />
                    </Carousel>
                    <Card>
                        欢迎来到CUIT-ACM微信公众号后台,请严格遵守规定!
                    </Card>
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