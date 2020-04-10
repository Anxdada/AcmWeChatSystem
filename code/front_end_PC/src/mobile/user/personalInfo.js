import React from 'react';
import { GetLoginUserMobile } from './../../config/dataAddress';
import Fetch from './../../fetch';
import { message, notification, Icon, Avatar } from 'antd';
import { Picker, List, NavBar, Modal } from 'antd-mobile'; 
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

const Item = List.Item;
const prompt = Modal.prompt;

var year = moment().year() + 1;
var gradeRows = [], i = year-9;
/**
 * TODO: 确认一下 i ++ 是不是和 ++ i 是一样的.. 目前测试来说是一样的...
 */
while (--year >= i) gradeRows.push(
    {
        label: year,
        value: year,
        key: year,
    }
);

// picker 的数据源必须是下面这种格式
// label 是显示的值, value 是选定后的值
const sexRows = [
    {
        label: '男',
        value: '男',
        key: 0,
    },
    {
        label: '女',
        value: '女',
        key: 1,
    },
];

export default class MobileUserPersonalInfo extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            nowUser: {},
            sex: 0,
            grade: '',
        };
    }

    componentWillMount() {
        Fetch.requestGet({
            url: GetLoginUserMobile,
            timeOut: 3000,
        }).then (
            data => {
                if (data.status == 0) {
                    this.setState({
                        nowUser: data.resultBean,
                        sex: data.resultBean.sex,
                        grade: data.resultBean.grade,
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
            }
        ).catch( err => {
            // console.log("err", err);
            message.error('连接超时! 请检查服务器是否启动.');
        });
    }

	render() {

        const { nowUser } = this.state;
        let pickerSex = [], pickerGrade = [];
        pickerSex.push( this.state.sex == 0 ? '男' : '女');
        pickerGrade.push( this.state.grade );

		return(
            <div>
                <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={() =>  window.location.href="/#/mobile/home/3"}
                >个人资料</NavBar>
                
                <div style={{ backgroundColor: '#fffff' }}>
                    <List>

                        <Item 
                            style={{ height: 50 }}
                            extra={<img className="personalInfoImg" src={nowUser.avatar} style={{ width: 35, height: 35 }}/>}
                        >头像</Item>

                        <Item arrow="horizontal" extra={nowUser.userName} onClick={() => prompt(
                            '修改昵称', '',
                            [
                                { text: '取消' },
                                { text: '提交', onPress: value => console.log(`昵称为:${value}`) },
                            ], 'default', `${nowUser.userName}`, ['请输入你的新昵称']
                        )}>昵称</Item>

                        <Item arrow="horizontal" extra="******" onClick={() => prompt(
                            '修改密码', '',
                            [
                                { text: '取消' },
                                { text: '提交', onPress: value => console.log(`密码为:${value}`) },
                            ], 'secure-text', null, ['请输入你的新密码']
                        )}
                        >密码</Item>

                        <Picker
                            title="选择性别"
                            data={sexRows}
                            value={pickerSex}
                            cols={1}
                            onOk={(v) => {
                                // console.log('xie' + v);
                                this.setState({
                                    sex: v == '男' ? 0 : 1,
                                })
                            }}
                        >
                            <Item arrow="horizontal" extra={nowUser.sex == 0 ? "男" : "女"}>性别</Item>
                        </Picker>
                        
                        <Item arrow="horizontal" extra={nowUser.studentId} onClick={() => prompt(
                            '修改学号', '',
                            [
                                { text: '取消' },
                                { text: '提交', onPress: value => {} },
                            ], 'default', `${nowUser.studentId}`, ['请输入你的学号']
                        )}>学号</Item>

                        <Picker
                            title="选择年级"
                            data={gradeRows}
                            value={pickerGrade}
                            cols={1}
                            onOk={(v) => {
                                // console.log('xie' + v);
                                this.setState({
                                    grade: v[0],
                                })
                            }}
                        >
                            <Item arrow="horizontal" extra={nowUser.grade}>年级</Item>
                        </Picker>

                        <Item arrow="horizontal" extra={nowUser.telephone} onClick={() => prompt(
                            '修改联系方式', '',
                            [
                                { text: '取消' },
                                { text: '提交', onPress: value => {} },
                            ], 'default', `${nowUser.telephone}`, ['请输入你的联系方式']
                        )}>联系方式</Item>

                        <Item arrow="horizontal" extra={nowUser.realName} onClick={() => prompt(
                            '修改真实姓名', '',
                            [
                                { text: '取消' },
                                { text: '提交', onPress: value => {} },
                            ], 'default', `${nowUser.realName}`, ['请输入你的真实姓名']
                        )}>真实姓名</Item>

                    </List>
                </div>
            </div>
		);
	}
}