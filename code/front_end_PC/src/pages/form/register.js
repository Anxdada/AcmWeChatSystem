import React from 'react';
import { Card, Form, Button, Input, Checkbox, Radio, Select, Switch, DatePicker, TimePicker, Upload, Icon, message } from 'antd';

import './index.less';
const FormItem = Form.Item;

class Register extends React.Component {

    render() {

        const { getFieldDecorator } = this.props.form;

        return (
            <div>
                <Card title="注册表单">
                    <Form layout="horizontal">
                        <FormItem label="用户名">
                            {
                                getFieldDecorator('userName', {
                                    initialValue:'',
                                    rules: [
                                        {
                                            required: true,
                                            message: '用户名不能为空!'
                                        },
                                    ]
                                })(
                                    <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="用户名"
                                    />
                                )
                            }
                        </FormItem>
                        <FormItem label="密码">
                            {
                                getFieldDecorator('userPwd', {
                                    initialValue:'',
                                    rules: [
                                        {
                                            required: true,
                                            message: '密码不能为空!'
                                        },
                                    ]
                                })(
                                    <Input
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="密码"
                                    />
                                )
                            }
                        </FormItem>
                    </Form>
                </Card>
            </div>
        );
    }
}

export default Form.create()(Register);