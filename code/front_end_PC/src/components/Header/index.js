import React from 'react'
import { Breadcrumb, Menu, Row, Col, Avatar, Dropdown, Icon } from 'antd';
import './index.less';
import Util from './../../utils/utils';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';
import { connect } from 'react-redux';

const menu = (
    <Menu>
    <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="#">
            <Link to="/login">退出系统</Link>
        </a>
    </Menu.Item>
    </Menu>
);

class Header extends React.Component {

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

    componentWillUnmount() {
        console.log(cookie.load('userName'));
        console.log(cookie.load('password'));
        cookie.remove('userName');
        cookie.remove('password');
        console.log(cookie.load('userName'));
        console.log(cookie.load('password'));
    }


    render() {
        console.log('xierenyi');
        console.log(this.props.menuName);
        // console.log(this.props.testArr);
        return (
            <div className="header">
                <Row className="header-top">
                    <Col span="24">
                        <Avatar style={{ backgroundColor: '#87d068' }} icon="user" />&nbsp;&nbsp;
                        <Dropdown overlay={menu}>
                            <span className="welcome">{this.state.userName}, 欢迎回来<Icon type="down" /></span>
                        </Dropdown>
                    </Col>
                </Row>
                <Row className="breadcrumb">
                    <Col span="10" className="breadcrumb-title">
                        <Breadcrumb>
                            <Breadcrumb.Item>
                                <Icon type="home"/>
                            </Breadcrumb.Item>
                            {
                                this.props.menuName.map((item) => 
                                    <Breadcrumb.Item key={item.key}>
                                        {
                                            item.key != "none" ? <a><Link to={item.key}>{item.title}</Link></a> : <span>{item.title}</span>
                                        }
                                    </Breadcrumb.Item>
                                )
                            }
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

const mapStateToProps = state => {
    return {
        menuName: state.menuName,
        testArr: state.testArr
    }
}

export default connect(mapStateToProps)(Header);



