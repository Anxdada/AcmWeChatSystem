import React from 'react';
import { Card, Form, Input, Button, Icon, Col, Checkbox } from 'antd';
import './index.less';
import cookie from 'react-cookies';

const FormItem = Form.Item;

class FormLogin extends React.Component {

    constructor(props) {
        super(props);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                console.log(values.userName);
                // this.props.history.push('/admin/home');
                this.props.history.push(`${this.props.match.url.replace(/\/[^/]+$/, '')}/admin/home`);
                cookie.save('userName', values.userName);
                cookie.save('password', values.password);
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
                                    max:10,min:3,
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
                        <Button type="primary" htmlType="submit" className="login-form-button" >
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