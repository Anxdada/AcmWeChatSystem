import React from 'react';
import './index.less';
import { resonUser } from './../../config/reportResonAbout';
import { Input, Icon, message, notification } from 'antd';
import { List, Radio, Button, Modal, ActionSheet, NavBar, WingBlank} from 'antd-mobile';
import Fetch from '../../fetch';
import { AddReport } from './../../config/dataAddress';

const RadioItem = Radio.RadioItem;
const alert = Modal.alert;
const { TextArea } = Input;

export default class MobileReportUser extends React.Component {

    state = {
        submitting: false,
    }

    constructor(props) {
        super(props);
        this.state = {
            reason: '',
            reportBody: '',
        }
    }

    handleChangeReportReson = (value) => {
        this.setState({
            reason: value,
        })
    }

    handleChangeReportDescription = (e) => {
        this.setState({
            reportBody: e.target.value,
        })
    }

    handleSubmitReport = () => {
        
        if (this.state.reason == '') {
            alert('提示', '请输入举报类型', [
                { text: '确定', onPress: () => console.log('ok') },
            ]);
            return ;
        }

        if (this.state.reportBody == '') {
            alert('提示', '请输入举报说明', [
                { text: '确定'},
            ]);
            return ;
        }

        this.setState({
            submitting: true,
        }, () => this.submitReportData());
    }

    submitReportData() {
        Fetch.requestPost({
            url: AddReport,
            info: 'type=用户'+'&typeId='+this.props.match.params.id
                    +'&reportBody='+this.state.reportBody+'&reason='+this.state.reason,
            timeOut: 3000,
        }).then ( 
            data => {
                if (data.status == 0) {
                    this.props.history.push('/mobile/report/resultPage');
                    this.setState({
                        submitting: false,
                    });
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
                })
            }
        ).catch( err => {
            // console.log("err", err);
            message.error('连接超时! 请检查服务器是否启动.');
        });
    }

    render() {

        const { reason, reportBody } = this.state;

        return (
            <div>
                <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={() => window.history.back(-1)}
                >举报用户</NavBar>

                <List renderHeader={() => '举报类型'}>
                {
                    resonUser.map(
                        item => (
                            <RadioItem key={item} checked={reason === item} onChange={() => this.handleChangeReportReson(item)}>
                                {item}
                            </RadioItem>
                        )
                    )
                }
                </List>
                <List renderHeader={() => '举报说明'}>
                    <TextArea rows={4} value={reportBody} onChange={this.handleChangeReportDescription} allowClear placeholder="请输入内容" />
                </List>
                <WingBlank size="md">
                <Button type="primary" style={{ marginTop: 15 }} onClick={this.handleSubmitReport}
                    loading={this.state.submitting}
                >提交</Button>
                </WingBlank>
            </div>
        );
    }
}