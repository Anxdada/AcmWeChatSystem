import React from 'react';
import { Icon } from 'antd';
import { Avatar, message, notification } from 'antd';
import { WingBlank, NoticeBar, WhiteSpace, Card, Carousel } from 'antd-mobile';
import MobileNavgationBar from './../Navgation';
import './index.less';
import Fetch from './../../fetch';
import { GetNowDayOnDutyUser } from './../../config/dataAddress';
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

class MobileHomeCarousel extends React.Component {
    state = {
        dataPic: ['/images/acm.jpg', '/images/family.jpg', '/images/23.png'],
        imgHeight: 176,
    }

    render() {
        return (
            <div>
            <WingBlank size="lg" >
                <WhiteSpace size="xs" />
                <Carousel
                    autoplay={false}
                    infinite={true}
                    autoplayInterval="3000"
                >
                {
                    this.state.dataPic.map((item) => (
                        <img
                            key={item}
                            src={item}
                            alt="logo"
                            style={{ width: '100%', verticalAlign: 'top' }}
                            onLoad={() => {
                                // fire window resize event to change height, 不加这个返回会有bug..
                                window.dispatchEvent(new Event('resize'));
                                this.setState({ imgHeight: 'auto' });
                            }}
                        />
                    ))
                }
                </Carousel>
            </WingBlank>
            </div>
        );
    }
}

class MobileHomeCard extends React.Component {

    state = {
        visible: false,
    }

    // 查询当日的值班人员   
    // 由于可能值班的日期填写失误 而导致查询出的人员不止一个, 或者为空
    // 多余一个时 只取第一个, 为空给一定的提示..
    constructor(props) {
        super(props);
        this.state = {
            startTime: moment().format('YYYY-MM-DD'),
            endTime: moment().format('YYYY-MM-DD'),
            nowOnDutyUser: [],

            username: "Anxdada",
            days: 10,
        }
    }

    componentWillMount() {
        this.getNowOnDutyUser();
    }

    getNowOnDutyUser() {

        // 首页展示当日值班人员信息

        Fetch.requestGet({
            url: GetNowDayOnDutyUser,
            timeOut: 3000,
        }).then ( 
            data => {
                if (data.status == 0) {
                    this.setState({
                        nowOnDutyUser: data.resultBean,
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

        const { nowOnDutyUser } = this.state;
        // 这里为什么是undefined... 
        // console.log(this.state.visible);
        return (
            <div>
            <WingBlank size="sm" >
            <WhiteSpace size="md" />
            <div className="cardbody">
                Welcome, {this.state.username} 
                <p>你已经连续登录 {this.state.days} 天了! </p>
            </div>
            <WhiteSpace size="md" />
            <Card>
                <Card.Header
                    title={nowOnDutyUser.realName}
                    thumb={<Avatar src={nowOnDutyUser.avatar} />}
                    extra={<span>值班人员</span>}
                />
                <Card.Body>
                    <div className="content">You make millios of decisions that mean nothing and then one day your order takes out anbd it changes your life.
                    <p>每天都在做很多看起来毫无意义的决定,但你某个决定就能改变你的一生。</p>
                    </div>
                </Card.Body>
            </Card>
            </WingBlank>
            </div>
        );
    }
}

export default class MobileHomePage extends React.Component{
    render() {
        return (
            <div className="homePage">
                <MobileHomeCarousel />
                <MobileNavgationBar />
                <MobileHomeCard />
            </div>
        );
    }
}