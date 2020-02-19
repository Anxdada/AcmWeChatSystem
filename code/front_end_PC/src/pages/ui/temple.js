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

fetch(DetailFriendUrl, {
    method: 'POST',
    headers: {
        'Authorization': cookie.load('token'),
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    },
    body:'friendurlId='+this.props.modifyUrlId
}).then(res => res.json()).then(
    data => {
        if (data.status == 0) {
            this.setState({
                fridenUrlId: data.resultBean.friendurlId,
                friendUrlName: data.resultBean.friendUrlName,
                friendUrlAddress: data.resultBean.friendUrlAddress,
                friendUrlTag: data.resultBean.friendUrlTag,
                friendUrlCreateTime: data.resultBean.friendUrlCreateTime,
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
)

Fetch.requestPost({
    url: LoginUrl,
    info: 'userName='+this.state.userName+'&password='+this.state.password,
    timeOut: 3000,
}).then ( 

).catch( err => {
    // console.log("err", err);
    message.error('连接超时! 请检查服务器是否启动.');
});