import React from 'react';
import { NavBar } from 'antd-mobile';
import { Icon, Typography, Timeline, message, notification, Empty } from 'antd';
import { GetGameExperience } from '../../config/dataAddress';
import Fetch from '../../fetch/index.js';
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

const { Title, Paragraph, Text } = Typography;


export default class MobileUserMyGameExperience extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            gameExperience: [],
        }
    }

    componentWillMount() {
        this.getGameExperienceData();
    }

    getGameExperienceData() {
        Fetch.requestGet({
            url: GetGameExperience,
            timeOut: 3000,
        }).then (
            data => {
                // console.log(data)
                if (data.status == 0) {
                    this.setState({
                        gameExperience: data.resultBean,
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

        const { gameExperience } = this.state;
        for (let i = 0 ; i < gameExperience.length ; ++ i) {
            moment().isBefore(moment(gameExperience[i].startTime), 'day');
        }
        
		return(
            <div>
                <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={() =>  window.location.href="/#/mobile/home/3"}
                >我的阅历</NavBar>
                
                <div style={{ backgroundColor: '#ffffff', padding: 10 }}>
                {
                    gameExperience.length == 0 ? <Empty description="快快去提升你的阅历吧"/> :
                    <Timeline>
                    <Timeline.Item color="gray">Create a services site 2020-09-01</Timeline.Item>
                    <Timeline.Item color="blue">Create a services site 2020-04-09</Timeline.Item>
                    {
                        gameExperience.map((item) => {
                            if (moment().isSame(moment(item.startTime), 'day')) {
                                return (
                                    <Timeline.Item color="blue" key={item.announcementId}>
                                        <p>{item.announcementTitle}</p>
                                        <p>开始时间: {item.startTime}</p>
                                    </Timeline.Item> 
                                )
                            } else if (moment().isBefore(moment(item.startTime), 'day')) {
                                return (
                                    <Timeline.Item color="gray" key={item.announcementId}>
                                        <p>{item.announcementTitle}</p>
                                        <p>开始时间: {item.startTime}</p>
                                    </Timeline.Item>
                                )
                            } else {
                                return (
                                    <Timeline.Item color="green" key={item.announcementId}>
                                        <span>{item.announcementTitle}</span><br />
                                        <span>开始时间: {item.startTime}</span>
                                    </Timeline.Item>
                                )
                            }
                        })
                    }
                    </Timeline>
                }
                <span>蓝色 正在完成, 绿色, 已经完成, 灰色, 待完成(都是报了名的, 颜色代表相应的进度)</span>
                </div>
            </div>
		);
	}
}