import React from 'react';
import './index.less';
import { resonPost } from './../../config/reportResonAbout';
import { Input, Icon } from 'antd';
import { List, Radio, Button, Modal, ActionSheet, NavBar, WingBlank} from 'antd-mobile';
import Fetch from '../../fetch';

const RadioItem = Radio.RadioItem;
const alert = Modal.alert;
const { TextArea } = Input;

export default class MobileReportPost extends React.Component {

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

        this.submitReportData();
    }

    submitReportData() {
        // Fetch.re
        this.props.history.push('/mobile/report/resultPage');
    }

    

    render() {

        const { reason, reportBody } = this.state;

        return (
            <div>
                <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={() => window.history.back(-1)}
                >举报帖子(回复)</NavBar>

                <List renderHeader={() => '举报类型'}>
                {
                    resonPost.map(
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
                <Button type="primary" style={{ marginTop: 15 }} onClick={this.handleSubmitReport}>提交</Button>
                </WingBlank>
            </div>
        );
    }
}