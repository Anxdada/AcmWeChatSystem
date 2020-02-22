import React from 'react';
import './index.less';
import { Card } from 'antd';


export default class Temple extends React.Component {

    render() {
        return (
            <div>

            </div>
        );
    }
}

Fetch.requestPost({
    url: LoginUrl,
    info: 'userName='+this.state.userName+'&password='+this.state.password,
    timeOut: 3000,
}).then ( 

).catch( err => {
    // console.log("err", err);
    message.error('连接超时! 请检查服务器是否启动.');
});