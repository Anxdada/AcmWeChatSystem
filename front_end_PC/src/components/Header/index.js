import React from 'react'
import { Breadcrumb, Menu, Row, Col, Avatar, Dropdown, Icon } from 'antd';
import './index.less'
import Util from './../../utils/utils'

const menu = (
    <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
          1st menu item
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
          2nd menu item
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
          3rd menu item
        </a>
      </Menu.Item>
    </Menu>
  );

export default class Header extends React.Component {

    state = {};
    componentWillMount() {
        this.setState({
            userName: '谢谢',
        });
        setInterval(() => {
            let sysTime = Util.formateDate();
            this.setState({
                sysTime
            })
        }, 1000);
    }
    render() {
        return (
            <div className="header">
                <Row className="header-top">
                    <Col span="24">
                        <Avatar style={{ backgroundColor: '#87d068' }} icon="user" />
                        <Dropdown overlay={menu}>
                            <a className="ant-dropdown-link" href="#" >{this.state.userName}, 欢迎回来<Icon type="down" /></a>
                        </Dropdown>
                    </Col>
                </Row>
                <Row className="breadcrumb">
                    <Col span="10" className="breadcrumb-title">
                        <Breadcrumb>
                          <Breadcrumb.Item href="">
                            <Icon type="home" />
                          </Breadcrumb.Item>
                          <Breadcrumb.Item href="">
                            <span>首页</span>
                          </Breadcrumb.Item>
                          {/* <Breadcrumb.Item>Application</Breadcrumb.Item> */}
                        </Breadcrumb>
                    </Col>
                    <Col span="14" className="weather">
                        <span className="date"> {this.state.sysTime} </span>
                    </Col>
                </Row>
            </div>
        );
    }
}



