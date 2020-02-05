import React from 'react';
import './index.less';
import { Card, Timeline, Result, Button, Icon } from 'antd';


class AboutView extends React.Component {

    render() {
        return (
            <div>
                <Card title={<span>CUIT-ACM实验室大事件</span>} className="timeLineFormat">
                    <Timeline pending="等你续写传奇..." reverse="true">
                            <Timeline.Item color="green">2013年 成都信息工程大学ACM校队创办 </Timeline.Item>
                            <Timeline.Item color="green">2013年 我校首次进入区域赛 </Timeline.Item>
                            <Timeline.Item color="green">2014年 我校首获CCPC(国际大学生程序设计竞赛)铜奖, 赛站: 长沙</Timeline.Item>
                            <Timeline.Item color="green">2015年 我校首获ICPC(国际大学生程序设计竞赛)铜奖, 赛站: 西安</Timeline.Item>
                            <Timeline.Item color="green">2016年 我校首获ICPC(国际大学生程序设计竞赛)银奖, 赛站: 大连</Timeline.Item>
                            <Timeline.Item color="green">2017年 我校首获ICPC(国际大学生程序设计竞赛)金奖, 赛站: 青岛</Timeline.Item>
                            <Timeline.Item color="green">2018年 我校首获CCPC(中国大学生程序设计竞赛)银奖, 赛站: 桂林</Timeline.Item>
                    </Timeline>
                    <Result
                        icon={<Icon type="smile" theme="twoTone" />}
                        title="请你继续加油哦~ "
                        extra={<Button type="primary">Next</Button>}
                    />,
                    <Result
                        status="403"
                        title="403"
                        subTitle="Sorry, you are not authorized to access this page."
                        extra={<Button type="primary">Back Home</Button>}
                    />
                    <Result
                        status="404"
                        title="404"
                        subTitle="Sorry, the page you visited does not exist."
                        extra={<Button type="primary">Back Home</Button>}
                    />
                    <Result
                        status="500"
                        title="500"
                        subTitle="Sorry, the server is wrong."
                        extra={<Button type="primary">Back Home</Button>}
                    />
                </Card>
            </div>
        );
    }
}

export default class About extends React.Component {

    render() {
        return (
            <div>
                <AboutView />
            </div>
        );
    }
}