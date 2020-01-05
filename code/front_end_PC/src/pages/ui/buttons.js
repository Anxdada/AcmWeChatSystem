import React from 'react';
import { Card, Button, Radio } from 'antd';
import './ui.less';

export default class Buttons extends React.Component {

    state = {
        loading: true,
        size: "large",
    }


    handleChange = (e) => {
        this.setState({
            size: e.target.value,
        })
    }

    handleCloseLoading = () => {
        console.log("!!!");
        this.setState({
            loading: !this.state.loading,
        });
    }

    render() {
        return (
            <div>
                <Card title="基本按钮">
                    <Button type="primary" icon="step-forward">Primary</Button>
                    <Button>Default</Button>
                    <Button type="dashed">Dashed</Button>
                    <Button type="danger">Danger</Button>
                    <Button type="link">Link</Button>
                </Card>
                <Card title="基本按钮" className="Card"> 
                    <Button icon="plus">创建</Button>
                    <Button icon="edit">编辑</Button>
                    <Button shape="circle" icon="search"></Button>
                    <Button icon="delete">删除</Button>
                    <Button icon="search">搜索</Button>
                    <Button icon="download">下载</Button>
                </Card>
                <Card title="Loading按钮" className="Card">
                    <Button type="primary" loading={this.state.loading}>确定</Button>
                    <Button type="primary" loading={this.state.loading} shape="circle"></Button>
                    <Button loading={this.state.loading}>点击加载</Button>
                    <Button loading={this.state.loading} shape="circle"></Button>
                    <Button type="primary" onClick={this.handleCloseLoading}>关闭</Button>
                </Card>
                <Card title="按钮组" className="Card"> 
                    <Button.Group >
                        <Button type="primary" icon="left">后退</Button>
                        <Button type="primary" icon="right">前进</Button>
                    </Button.Group>
                </Card>
                <Card title="按钮尺寸" className="Card">
                    <Radio.Group value={this.state.size} onChange={this.handleChange}>
                        <Radio value="small"> 小 </Radio>
                        <Radio value="default"> 中 </Radio>
                        <Radio value="large"> 大 </Radio>
                    </Radio.Group>
                    <Button type="primary" size={this.state.size}>Default</Button>
                    <Button type="dashed" size={this.state.size}>Dashed</Button>
                    <Button type="danger" size={this.state.size}>Danger</Button>
                    <Button type="link" size={this.state.size}>Link</Button>
                </Card>
            </div>
        );
    }
}