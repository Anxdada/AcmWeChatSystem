import React from 'react';
import { Row, Col } from 'antd';
import Header from './components/Header';
import Footer from './components/Footer';
import NavLeft from './components/NavLeft';
import './style/common.less';
import cookie from 'react-cookies';
import {HashRouter as Router, Link, Redirect, Route} from 'react-router-dom';


class AdminPage extends React.Component {
    render() {
        return (
            <Row className="container">
                <Col span={3} className="nav-left">
                    <NavLeft />
                </Col>
                <Col span={21} className="main">
                    <Header />
                    <Row className="content">
                        {this.props.children}
                    </Row>
                    <Footer />
                </Col>
            </Row>
        );
    }
}

export default class Admin extends React.Component {

    constructor(props) {
        console.log(props);
        super(props);
        this.state = {
            singup: cookie.load('userName'),
        }
        console.log(cookie.load('userName'));
        console.log(cookie.load('password'));
        console.log(cookie.load('passwor'));
    }

    render() {
        return (
            // this.state.singup == null ? <Redirect to={'/login'}></Redirect>
            //     : <AdminPage > {this.props.children} </AdminPage>
            <AdminPage > {this.props.children} </AdminPage>
        );
    }
}