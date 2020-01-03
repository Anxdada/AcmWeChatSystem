import React from 'react';
import { WingBlank, NoticeBar, WhiteSpace, Card } from 'antd-mobile';
import { Icon } from 'antd';
import './index.less';

const NoticeBarExample = () => (
  <div>
    <WhiteSpace size="lg" />
    <NoticeBar marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }}>
      Notice: The arrival time of incomes and transfers of Yu &#39;E Bao will be delayed during National Day.
    </NoticeBar>
    <WhiteSpace size="lg" />
    <NoticeBar mode="link" onClick={() => alert('1')}>
      Notice: The arrival time of incomes and transfers of Yu &#39;E Bao will be delayed during National Day.
    </NoticeBar>
    <WhiteSpace size="lg" />
    <NoticeBar mode="closable" icon={null}>Remove the default icon.</NoticeBar>
    <WhiteSpace size="lg" />
    <NoticeBar mode="closable" icon={<Icon type="check-circle-o" size="xxs" />}>
      Customized icon.
    </NoticeBar>
    <WhiteSpace size="lg" />
    <NoticeBar mode="closable" action={<span style={{ color: '#a1a1a1' }}>不再提示</span>}>
      Closable demo for `actionText`.
    </NoticeBar>
    <WhiteSpace size="lg" />
    <NoticeBar mode="link" action={<span>去看看</span>}>
      Link demo for `actionText`.
    </NoticeBar>
  </div>
);

export default class MiddleCard extends React.Component {

    state = {
        username: "Anxdada",
        days: 10
    }

    render() {
        return (
            <div>
            <WingBlank size="md">
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
                <Card.Footer content="Our Promise" extra={<div>Never leak or modify your personal infomation!</div>} />
            </Card>
            </WingBlank>
            </div>
        );
    }
}