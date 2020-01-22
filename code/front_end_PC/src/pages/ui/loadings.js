import React from 'react';
import { Card, Button, Icon, Spin, Alert } from 'antd';
import './ui.less';

export default class Loadings extends React.Component {
    render() {
        const iconLoading = <Icon type="loading" style={{ fontSize: 24}} />
        return (
            <div>
                <Card title="Spin用法" className="Card">
                    <Spin />
                    <Spin size="small" style={{margin:'0 10px'}}/>
                    <Spin size="large"/>
                </Card>
                <Card title="内容遮罩">
                    <Alert 
                        message="React"
                        description="welcome meme"
                        type="info"
                    />

                    <Spin >
                        <Alert 
                            message="React"
                            description="welcome meme"
                            type="warning"
                        />
                    </Spin>
                    <Spin tip="加载中" indicator={<Icon type="loading" style={{fontSize: 24}}/>} >
                        <Alert 
                            message="React"
                            description="welcome meme"
                            type="error"
                        />
                    </Spin>
                </Card>
            </div>
        );
    }
}