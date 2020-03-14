import React from 'react';
import { Icon } from 'antd';
import { WingBlank, NoticeBar, WhiteSpace, Card, Carousel } from 'antd-mobile';
import MobileNavgationBar from './../Navgation';
import './index.less';


class MobileHomeCarousel extends React.Component {
    state = {
        dataPic: ['/images/acm.jpg', '/images/family.jpg', '/images/23.png'],
        imgHeight: 176,
    }

    render() {
        return (
            <div>
            <WingBlank size="md" >
                <WhiteSpace size="xs" />
                <Carousel
                    autoplay={false}
                    infinite={true}
                    autoplayInterval="3000"
                >
                {
                    this.state.dataPic.map((item) => 
                        <img
                            src={item}
                            alt="logo"
                            style={{ width: '100%', verticalAlign: 'top' }}
                        />
                    )
                }
                </Carousel>
            </WingBlank>
            </div>
        );
    }
}

class MobileHomeCard extends React.Component {

    state = {
        username: "Anxdada",
        days: 10
    }

    render() {
        return (
            <div>
            <WhiteSpace size="md" />
            <div className="cardbody">
                Welcome, {this.state.username} 
                <p>你已经连续登录 {this.state.days} 天了! </p>
            </div>
            <WhiteSpace size="md" />
            <Card>
                <Card.Header
                    title="谢仁义"
                    thumb={<Icon type="smile" theme="twoTone" style={{ fontSize: '25px' }}/>}
                    extra={<span>值班人员</span>}
                />
                <Card.Body>
                    <div className="content">You make millios of decisions that mean nothing and then one day your order takes out anbd it changes your life.
                    <p>每天都在做很多看起来毫无意义的决定,但你某个决定就能改变你的一生。</p>
                    </div>
                </Card.Body>
            </Card>
            </div>
        );
    }
}

export default class MobileHomePage extends React.Component{
    render() {
        return (
            <div className="homePage">
            <WingBlank size="md">
                <MobileHomeCarousel />
                <MobileNavgationBar />
                <MobileHomeCard />
            </WingBlank>
            </div>
        );
    }
}