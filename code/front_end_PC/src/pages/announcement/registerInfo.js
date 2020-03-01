import React from 'react';
import { Table, Card, Tag, DatePicker, Input, Popconfirm, InputNumber, Form, Tooltip, message, notification, Button, Divider } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
import './index.less';
import { thisExpression } from '@babel/types';
import { connect } from 'react-redux';
import { switchMenu, addMenu } from './../../redux/actions';
import Fetch from './../../fetch';
import { DetailAnnouncementUrl, SelectRegisterTable, DeleteRegisterTable, UpdateRegisterTable } from './../../config/dataAddress';
import {EventEmitter2} from 'eventemitter2';
import * as XLSX from 'xlsx';
import { exportExcel } from 'xlsx-oc';


var emitter = new EventEmitter2();
moment.locale('zh-cn');
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const { Search } = Input;

const EditableContext = React.createContext();

class EditableCell extends React.Component {

    getInput = () => {
        if (this.props.inputType === 'number') {
            return <Input />;
        }
        return <Input />;
    };

    renderCell = ({ getFieldDecorator }) => {
        const {
            editing,
            dataIndex,
            title,
            inputType,
            record,
            index,
            children,
            ...restProps
        } = this.props;
        return (
            <td {...restProps}>
                {
                    editing ? dataIndex == "studentId" ? (
                    <Form.Item style={{ margin: 0 }}>
                        {getFieldDecorator(dataIndex, {
                            rules: [
                                {
                                    required: true,
                                    message: `请输入 ${title}!`,
                                },
                                {
                                    pattern: new RegExp("^[0-9]*$"),
                                    message: '学号只能由阿拉伯数字组成!'
                                }
                            ],
                            initialValue: record[dataIndex],
                        })(this.getInput())}
                    </Form.Item> ) : (
                    <Form.Item style={{ margin: 0 }}>
                        {getFieldDecorator(dataIndex, {
                            rules: [
                                {
                                    required: true,
                                    message: `请输入 ${title}!`,
                                },
                            ],
                            initialValue: record[dataIndex],
                        })(this.getInput())}
                    </Form.Item>
                    ) : (
                        children
                    )
                }
            </td>
        );
    };

    render() {
        return <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>;
    }
}

class EditRegisterTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = { editingKey: '' };
        this.columns = [
            {
                title: '学号',
                dataIndex: 'studentId',
                key: 'studentId',
                width: 200,
                align: 'center',
                editable: true,
                sorter: (a, b) => a.studentId - b.studentId
            },
            {
                title: '姓名',
                dataIndex: 'realName',
                key: 'realName',
                width: 200,
                align: 'center',
                editable: true,
            },
            {
                title: '操作',
                dataIndex: 'action',
                key: 'action',
                align: 'center',
                width: 50,
                render: (text, record) => {
                    const { editingKey } = this.state;
                    const editable = this.isEditing(record);
                    return editable ? (
                        <span>
                            <EditableContext.Consumer>
                                {
                                    form => (
                                        <a
                                            onClick={() => this.save(form, record.registerId)}
                                            style={{ marginRight: 8 }}
                                        >
                                        保存
                                        </a>
                                    )
                                }
                            </EditableContext.Consumer>
                            <a onClick={() => this.cancel(record.registerId)}>取消</a>
                        </span>
                    ) : (
                        <span>
                            <a disabled={editingKey !== ''} onClick={() => this.edit(record.registerId)}>修改</a>
                            <Divider type="vertical" />
                            <Popconfirm title="确定删除?" onConfirm={() => this.handleDelete(record.registerId)} okText="确定" cancelText="取消">
                                <a className="deleteHerf">删除</a>
                            </Popconfirm>
                        </span>
                    );
                },
            },
        ];
    }

    isEditing = record => {
        // console.log(record);
        return record.registerId === this.state.editingKey;
    }

    cancel = () => {
        this.setState({ editingKey: '' });
    };

    updateRegisterData(row) {
        Fetch.requestPost({
            url: UpdateRegisterTable,
            info: 'registerId='+row.registerId+'&studentId='+row.studentId
                    +'&realName='+row.realName,
            timeOut: 3000,
        }).then(
            data => {
                if (data.status == 0) {
                    message.success('修改成功!');
                    emitter.emit("refresh", "更新");
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

    save(form, key) {
        form.validateFields((error, row) => {
            if (error) {
                return;
            }
            row["registerId"] = key;
            console.log(row);
            this.setState({
                editingKey: '',
            }, () => this.updateRegisterData(row));
        });
    }

    edit = (key) => {
        this.setState({ editingKey: key });
    }

    render() {
        const components = {
            body: {
                cell: EditableCell,
            },
        };

        const columns = this.columns.map(col => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    inputType: col.dataIndex === 'studentId' ? 'number' : 'text',
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: this.isEditing(record),
                }),
            };
        });

        // console.log(this.props.data);

        return (
            <EditableContext.Provider value={this.props.form}>
                <Table
                    rowKey={record => record.registerId}
                    components={components}
                    bordered
                    dataSource={this.props.data}
                    columns={columns}
                    rowClassName="editable-row"
                    pagination={{
                        onChange: this.cancel,
                    }}
                />
            </EditableContext.Provider>
        );
    }
}

const RegisterInfoTable = Form.create()(EditRegisterTable);

class RegisterInfoView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            announcementTitle: '',
            announcementBody: '',
            announcementTagName: '讲座',
            announcementTagColor: '#3ce016',
            startTime: null,
            lastTime: '',
            isRegister: 0,
            registerStartTime: null,
            registerEndTime: null,
            needStartTime: 0,
            isPublish: 1,
            searchStudentId: '',
            allRegisterData: [],
        }
        emitter.on("refresh", this.refresh.bind(this));
    }

    refresh = (msg) => {
        this.setState({
            searchStudentId: '',
        }, () => this.getRegisterData());
    }

    componentWillMount() {
        this.getRegisterData();
        this.getAnnouncementData();
    }

    getAnnouncementData() {
        // console.log(this.props.match.params.id);
        Fetch.requestPost({
            url: DetailAnnouncementUrl,
            info: 'announcementId='+this.props.announcementId,
            timeOut: 3000,
        }).then (
            data => {
                if (data.status == 0) {
                    this.setState({
                        announcementTitle: data.resultBean.announcementTitle,
                        announcementBody: '测试2',
                        announcementTagName: data.resultBean.announcementTagName,
                        announcementTagColor: data.resultBean.announcementTagColor,
                        startTime: data.resultBean.startTime,
                        lastTime: data.resultBean.lastTime,
                        isRegister: data.resultBean.isRegister,
                        registerStartTime: data.resultBean.registerStartTime,
                        registerEndTime: data.resultBean.registerEndTime,
                        needStartTime: data.resultBean.needStartTime,
                        isPublish: data.resultBean.isPublish,
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

    getRegisterData() {
        console.log('xie')
        Fetch.requestPost({
            url: SelectRegisterTable,
            info: 'announcementId='+this.props.announcementId+'&studentId='+this.state.searchStudentId,
            timeOut: 3000,
        }).then (
            data => {
                // console.log(data);
                if (data.status == 0) {
                    this.setState({
                        allRegisterData: data.resultBean,
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
    
    handleSearchStudentIdBtn = (value) => {
        this.setState({
            searchStudentId: value,
        }, () => this.getRegisterData());
    }

    handleExportExcel = () => {
        var _header = [
            { k: 'studentId', v: '学号'},
            { k: 'realName', v: '姓名'},
        ];
        if (this.state.allRegisterData.length < 1) {
            message.warn('没有数据可以导出!');
            return ;
        }
        exportExcel(_header, this.state.allRegisterData);
    }

    render() {
        let rangeTime;
        if (this.state.registerStartTime != null)
            rangeTime = [moment(this.state.registerStartTime), moment(this.state.registerEndTime)];
        else rangeTime = [null, null];

        return (
            <div>
            <Card title={this.state.announcementTitle}>
                <strong>类别:</strong>&nbsp;&nbsp;
                <Tag color={this.state.announcementTagColor} key={this.state.announcementTagName}>
                    {this.state.announcementTagName}
                </Tag>
                {
                    this.state.needStartTime == 0 ? null : <span>
                        &nbsp;&nbsp;<strong>{this.state.announcementTagName}开始时间:</strong>&nbsp;&nbsp;
                        <DatePicker format="YYYY-MM-DD HH:mm:ss" defaultValue={moment(this.state.startTime)} style={{width:200}} disabled />
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
                                defaultValue={rangeTime} 
                                style={{ width: 400 }} />
                        </span>
                }
                <br />
                <strong>状态:&nbsp;&nbsp;</strong>
                {
                    this.state.isPublish == 0 ? <Tag color="gray">未发布[草稿]</Tag> :
                    this.state.isRegister == 0 ? <Tag color="blue">已发布</Tag> :
                        moment().isAfter(this.state.registerEndTime) ? 
                            <Tooltip title={`截止时间 ${moment(this.state.registerEndTime).format('YYYY-MM-DD HH:mm:ss')}`}>
                                <Tag color="#f50">报名结束</Tag> 
                            </Tooltip>
                        : <Tag color="green">正在报名</Tag>
                }
                <br />
                <br />
                <strong>内容:</strong>&nbsp;&nbsp;<br />
                <p> {this.state.announcementBody } </p>
                <strong>报名表:</strong>&nbsp;&nbsp;
                <br /><br />
                <Search allowClear placeholder="学号" onSearch={this.handleSearchStudentIdBtn} style={{ height: 30, width: 150}} className="searchF" />
                <Button type="primary" style={{ marginLeft:20, width: 100 }} onClick={this.handleExportExcel} >导出报名表</Button>
                <RegisterInfoTable data={this.state.allRegisterData} />
            </Card>
            </div>
        );
    }
}

//<RegisterInfoTable data={this.state.allRegisterData} /> 

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
            <RegisterInfoView announcementId={this.props.match.params.id} />
        );
    }
}

export default connect()(RegisterInfo);