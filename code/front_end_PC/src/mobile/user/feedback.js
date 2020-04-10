import React from 'react';
import { NavBar } from 'antd-mobile';
import { Icon, Input, Button, message, notification, Alert } from 'antd';
import { AddFeedback } from './../../config/dataAddress';
import Fetch from './../../fetch/index.js';

const { TextArea } = Input;

export default class MobileFeedbackAndAdvice extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            feedbackBody: '',
            submitting: false,
        }
    }

    addFeedbackData() {
        // console.log('xierenyi')
        Fetch.requestPost({
            url: AddFeedback,
            info: 'feedbackBody='+this.state.feedbackBody,
            timeOut: 3000,
        }).then ( 
            data => {
                if (data.status == 0) {
                    this.setState({
                        feedbackBody: '',
                    });
                    message.success("反馈成功");
                } else {
                    if (data.status < 100) {
                        message.error(data.msg);
                    } else {
                        notification.error({
                            message: data.error,
                            description: data.message
                        });
                    }
                }
                this.setState({
                    submitting: false,
                });
            }
        ).catch( err => {
            // console.log("err", err);
            message.error('连接超时! 请检查服务器是否启动.');
            this.setState({
                submitting: false,
            });
        });
    }

    handleOnChnageTextArea = (e) => {
        this.setState({
            feedbackBody: e.target.value,
        });
    }


    handleSubmitFeedback = () => {
        this.setState({
            submitting: true,
        }, () => this.addFeedbackData());
    };

	render() {
        
        const { submitting, feedbackBody } = this.state;
		return(
            <div>
                <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={() =>  window.history.back()}
                >反馈与建议</NavBar>
                
                <div style={{ backgroundColor: '#ffffff', padding: 10 }} className="feedbackContent">
                <Alert message="禁止灌水!" type="warning" />
                <TextArea allowClear style={{ marginTop: 5 }} autoSize={{ minRows: 4, maxRows: 10 }} autoFocus 
                    value={feedbackBody} onChange={this.handleOnChnageTextArea}
                />
                <Button style={{ marginTop: 5, float: 'right' }} type="primary"
                    loading={submitting} disabled={feedbackBody == null || feedbackBody == ''}
                    onClick={this.handleSubmitFeedback}
                >发送</Button>
                </div>
            </div>
		);
	}
}