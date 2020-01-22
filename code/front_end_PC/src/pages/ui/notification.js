import React from 'react';
import { Card, Button, Icon, Spin, Alert, Radio, notification } from 'antd';
import './ui.less';

export default class Notification extends React.Component {

    openNotfication = (type) => {
        notification[type]({
            message: "meme",
            description: "爱你",
            duration: 3,
        })
    }

    render() {
        return (
            <div>
                <Card title="通知提醒框" className="Card">
                    <Button type="primary" onClick={()=>this.openNotfication('success')} >success</Button> 
                    <Button type="primary" onClick={()=>this.openNotfication('info')} >info</Button>
                    <Button type="primary" onClick={()=>this.openNotfication('warning')} >warning</Button>
                    <Button type="primary" onClick={()=>this.openNotfication('error')} >error</Button>
                </Card>
            </div>
        );
    }
}