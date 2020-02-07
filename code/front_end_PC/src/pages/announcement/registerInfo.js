import React from 'react';
import { Table, Card, Tag, DatePicker, Input } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
import './index.less';
import { thisExpression } from '@babel/types';
import { connect } from 'react-redux';
import { switchMenu, addMenu } from './../../redux/actions';


moment.locale('zh-cn');
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const { Search } = Input;

class RegisterInfoTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isRegister: false,
        }
        this.columns = [
            {
                title: '学号',
                dataIndex: 'studentId',
                key: 'studentId',
                sorter: (a, b) => a.studentId - b.studentId
            },
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
            },
        ];

        // 测试数据
        this.data = [
            {
                key: '1',
                studentId: '2018091192',
                name: '闫国龙',
            },
            {
                key: '2',
                studentId: '2017061717',
                name: '谢仁义',
            },
        ]
    }

    render() {
        return (
            <Table columns={this.columns} dataSource={this.data} bordered />
        );
    }
}

class RegisterInfoView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            announcementTitle: '',
            announcementBody: '',
            tagName: '讲座',
            tagColor: '#3ce016',
            startTime: '',
            lastTime: '',
            isRegister: false,
            registerStartTime: '',
            registerEndTime: '',
            allRegisterPerson: '',
        }
    }

    componentWillMount() {
        this.getData();
    }

    getData() {
        this.setState({
            announcementTitle: 'DFS第一次讲座',
            announcementBody: '未了控股空间的巴萨咖啡酒吧开始的减肥包括节哀顺变就开始打',
            tagName: '讲座',
            tagColor: '#3ce016',
            startTime: moment().day(-7),
            lastTime: '2小时',
            isRegister: true,
            registerStartTime: moment().day(-7).hour(19).minute(0).second(0),
            registerEndTime: moment().hour(21).minute(0).second(0),
        });
        // fetch(LectureDetailUrl, {
        //     method: 'POST',
        //     headers: {
        //         'Authorization': cookie.load('token'),
        //         'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
        //     },
        //     body: 'lectureId='+this.props.match.params.id
        // }).then( res => res.json()).then(
        //     data => {
        //     //console.log('token'+cookie.load('token'));
        //    // window.alert(data);
        //    // window.alert(data.code);
        //     if (data.code==0) {
        //         this.setState({title: data.resultBean.lectureTitle});
        //         this.setState({editorContent: this.state.editor.txt.html(data.resultBean.lectureBody)});
        //         this.setState({createDate: data.resultBean.createDate});
        //     } else {
        //         message.error(data.msg)
        //     }
        //   }
      
        // )
    }
    
    handleSearchStudentIdBtn = () => {
        
    }

    render() {
        const registerRangeTime = [this.state.registerStartTime, this.state.registerStartTime];
        return (
            <div>
            <Card title={this.state.announcementTitle}>
                <strong>类别:</strong>&nbsp;&nbsp;
                <Tag color={this.state.tagColor} key={this.state.tagName}>{this.state.tagName}</Tag>
                {
                    this.state.tagName == "通知" ||  this.state.publishTag == "" ? null : <span>
                        &nbsp;&nbsp;<strong>{this.state.tagName}开始时间:</strong>&nbsp;&nbsp;
                        <DatePicker format="YYYY-MM-DD HH:mm:ss" defaultValue={this.state.startTime} style={{width:200}} disabled />
                        &nbsp;&nbsp;<strong>{this.state.publishTag}持续时间:</strong>&nbsp;&nbsp;
                        <Input defaultValue={this.state.lastTime} disabled style={{ height: 30, width: 200 }} />
                    </span>
                }
                <br />
                <strong>是否需要报名:&nbsp;&nbsp;{ this.state.isRegister == true ? "是" : "否" }</strong>
                {
                    this.state.isRegister == false ? null :
                        <span><br />
                            <strong>报名起止时间:&nbsp;&nbsp;</strong>
                            <RangePicker 
                                disabled
                                format="YYYY-MM-DD HH:mm:ss"
                                defaultValue={registerRangeTime} 
                                style={{ width: 400 }} />
                        </span>
                }
                <br />
                <br />
                <strong>内容:</strong>&nbsp;&nbsp;<br />
                <p> {this.state.announcementBody } </p>
                <strong>报名表:</strong>&nbsp;&nbsp;
                <br /><br />
                <Search placeholder="学号" onSearch={this.handleSearchStudentIdBtn} style={{ height: 30, width: 150}} className="searchF" />
                <RegisterInfoTable data={this.state.allRegisterPerson} />
            </Card>
            </div>
        );
    }
}

class RegisterInfo extends React.Component {

    componentDidMount() {
        const { dispatch } = this.props;
        const titleArray = [
            {
                title: '公告',
                key: 'none',
            },
            {
                title: '管理公告',
                key: '/admin/announcement/manage',
            },
            {
                title: '查看公告报名信息',
                key: 'none',
            }
        ];
        dispatch(switchMenu(titleArray));
    }

    render() {
        return (
            <RegisterInfoView />
        );
    }
}

export default connect()(RegisterInfo);