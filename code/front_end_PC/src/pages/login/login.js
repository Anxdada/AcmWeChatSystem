import React from 'react';
import { Card, Form, Input, Button, Icon, Col, Checkbox, message, notification } from 'antd';
import './index.less';
import cookie from 'react-cookies';
import { LoginUrl } from './../../config/dataAddress';

const FormItem = Form.Item;

class FormLogin extends React.Component {

    state = {
        loading: false,
    }

    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
        }
    }

    getData() {
        const expires = new Date();
        expires.setDate(Date.now() + 1000 * 60);
        fetch(LoginUrl, {
            method: 'POST',
            headers: {
                'Authorization': cookie.load('token'),
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
            },
            body: 'userName='+this.state.userName+'&password='+this.state.password
        }).then( res => res.json() ).then (
            data => {
                if (data.status == 0) {
                    cookie.save('token', data.resultBean.token, { expires });
                    console.log(cookie.load('token'));
                    message.success("登录成功!");
                    this.props.history.push(`${this.props.match.url.replace(/\/[^/]+$/, '')}/admin/home`);
                } else {
                    if (data.status < 100) {
                        message.error(data.msg);
                    } else {
                        console.log(data.status);
                        notification.error({
                            message: data.error,
                            description: data.message
                        });
                    }
                }
                this.setState({
                    loading: false,
                })
            }
        )
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                console.log(values.userName);
                this.setState({
                    userName: values.userName,
                    password: values.password,
                    loading: true,
                }, () => this.getData());
                // this.props.history.push('/admin/home');
                // this.props.history.push(`${this.props.match.url.replace(/\/[^/]+$/, '')}/admin/home`);
                // cookie.save('userName', values.userName);
                // cookie.save('password', values.password);
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="loginPage">
                <Col span={24} className="loginPage">
                <Card title="登录页面" className="formLogin">
                    <Form className="login-form" onSubmit={this.handleSubmit}>
                    <FormItem>
                    {
                        getFieldDecorator('userName', {
                            initialValue:'',
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input your username!'
                                },
                                {
                                    max:10,min:2,
                                    message: 'Length not in range'
                                }
                            ]
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Username"
                            />
                        )
                    }
                    </FormItem>
                    <FormItem>
                    {
                        getFieldDecorator('password', {
                            initialValue:'',
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input your password!'
                                },
                                {
                                    max:15,min:6,
                                    message: 'Length not in range'
                                }
                            ]
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Password"
                            />
                        )
                    }
                    </FormItem>
                    <FormItem>
                    {/* {   getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(<Checkbox>Remember me</Checkbox>) } */}
                        <div className="btn">
                        <Button type="primary" htmlType="submit" className="login-form-button" loading={this.state.loading} >
                            Log in
                        </Button>
                        </div>
                    </FormItem>
                    </Form>
                </Card>
                </Col>
            </div>
        );
    }
}

export default Form.create()(FormLogin);