import React from 'react';
import './index.less';
import { Card, Calendar, Badge, Modal, MonthPicker, Select, Input, DatePicker } from 'antd';
import Util from './../../utils/utils';
import moment from 'moment';
import 'moment/locale/zh-cn';
import staffOnDutyName from './../../config/staffOnDutyInfo';



moment.locale('zh-cn');
const { Option } = Select;

class OnDutyTable extends React.Component {

    state = {
        visible: false,
    }

    constructor(props) {
        super(props);
        this.state = {
            nowDate: moment(),
            dutyStaffName: '',
            dutyStaffTelephone: '',
        }
    }

    componentWillMount() {
        const staffNameModal = this.renderStaffNameModal(staffOnDutyName);
        
        this.setState({
            staffNameModal,
        })
    }

    renderStaffNameModal = (data) => {
        return data.map((item) => 
            <Option value={item}>{item}</Option>
        )
    }

    getInfoData(value) {
        console.log('根据日期从数据库中查找再渲染');
        let staffInfo;
        let name = '谢仁义';
        let telephone = '18200326751';
        return staffInfo = { name: name, telephone: telephone };
    }
      
    dateCellRender = (value) => {
        // 该同步的时候还是得同步!
        const staffInfo = this.getInfoData(value);
        
        return (
            <div className="events">
                <Badge color="#108ee9" text={staffInfo.name} />
                <Badge color='#87d068' text={staffInfo.telephone} />
            </div>
        );
    }

    disabledDate = (current) => {
        // 只能修改从明天开始的值班安排
        return current && current < moment().endOf('day');
    }

    handleOnDuty = (value) => {
        const staffInfo = this.getInfoData(value); 
        this.setState({
            visible: true,
            nowDate: value,
            dutyStaffName: staffInfo.name,
            dutyStaffTelephone: staffInfo.telephone,
        })
    }

    handleOkModal = () => {
        this.setState({
            visible: false,
        })
    }

    handleCancelModal = () => {
        this.setState({
            visible: false,
        })
    }

    handleModalStaffName = (value) => {
        console.log(value);
        this.setState({
            dutyStaffName: value,
        });
    }

    handleModalStaffTelephone = (e) => {
        console.log(e);
        this.setState({
            dutyStaffTelephone: e.target.value,
        });
    }
    

    render() {
        return (
            <div style={{ flex: 1, padding: "10px" }}>
                <Card title="值日安排">
                    <Calendar dateCellRender={this.dateCellRender} onSelect={this.handleOnDuty} 
                        disabledDate={this.disabledDate}
                    />
                    <Modal
                        title="安排值日"
                        visible={this.state.visible}
                        onOk={this.handleOkModal}
                        onCancel={this.handleCancelModal}
                        okText="确认"
                        cancelText="取消"
                    >
                        <div>
                            当前日期:&nbsp;&nbsp;&nbsp;
                            <DatePicker defaultValue={this.state.nowDate} disabled />
                        </div>  
                        <div className="modalInput">
                            值日姓名：
                            <Select defaultValue={ this.state.dutyStaffName } style={{ width: 200 }} 
                                onChange={this.handleModalStaffName} >
                                { this.state.staffNameModal }
                            </Select>
                        </div>
                        <div className="modalInput">
                            联系电话：<Input size="small"  style={{ height: 30 , width: 200 }} 
                                        onChange={this.handleModalStaffTelephone} value={this.state.dutyStaffTelephone} />
                        </div>
                    </Modal>
                </Card>
            </div>
        );
    }
}

export default class OnDuty extends React.Component {
    render() {
        return (
            <div>
                <OnDutyTable />
            </div>
        );
    }
}