import React from 'react';
import './index.less';
import { Result, Icon, NavBar } from 'antd-mobile';

export default class MobileReportResultPage extends React.Component {

    // 要用this.props.history 的首先需要传递props
    // 简单点就用window.location.href="xxx", 直接跳转...
    render() {
        return (
            <div>

                <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={() => window.history.back()}
                >举报结果</NavBar>

                <Result
                    img={<Icon type="check-circle" className="spe" style={{ fill: '#1F90E6', width: 60, height: 60 }} />}
                    title="提交成功"
                    message="你的举报我们已经收到, 根据相关的规则, 你的举报将由管理员审核判定后进行处理."
                />
            </div>
        );
    }
}