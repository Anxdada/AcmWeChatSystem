import React from 'react';
import { Card, Form, Input, Button, Icon } from 'antd';
import './index.less';

const FormItem = Form.Item;

class FormLogin extends React.Component {

    render() {

        const { getFieldDecorator } = this.props.form;

        return (
            <div>
                <Card title="登录页面" className="Card">
                    <Form className="login-form" >
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
                                            max:10,min:5,
                                            message: 'length not in range'
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
                                getFieldDecorator('userPwd', {
                                    initialValue:'Jack',
                                    rules: []
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
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        );
    }
}

export default Form.create()(FormLogin);