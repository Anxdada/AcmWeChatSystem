import React from 'react';
import './index.less';
import { Card, Calendar, Badge, Modal, Select, Input, DatePicker, message, notification, Button, Pagination, Table, Tag, Divider, Popconfirm } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { AddOnDuty, DeleteOnDuty, UpdateOnDuty, SelectOnDuty, DetailOnDuty, GetTeamStaff } from './../../config/dataAddress';
import { EventEmitter2 } from 'eventemitter2';
import Fetch from './../../fetch';


var emitter = new EventEmitter2();
moment.locale('zh-cn');
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const { Option } = Select;

const getTeamStaff = () => {

    Fetch.requestGet({
        url: GetTeamStaff,
        timeOut: 3000,
    }).then ( 
        data => {
            console.log(data);

            if (data.status == 0) {
                this.setState({
                    
                })
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

class Modify extends React.Component {

    state = {
        visible: false,
    }

    constructor(props) {
        super(props);
        this.state = {
            onDutyId: '',
            onDutyUserName: '',
            telephone: '',
            startTime: null,
            endTime: null,
        }
    }

    getSingleDutyData() {  // 注册出发的时间点

        Fetch.requestPost({
            url: DetailOnDuty,
            info: 'onDutyId='+this.props.onDutyId,
            timeOut: 3000,
        }).then ( 
            data => {
                if (data.status == 0) {
                    this.setState({
                        onDutyId: data.resultBean.onDutyId,
                        onDutyUserName: data.resultBean.onDutyUserName,
                        telephone: data.resultBean.onDutyTelephone,
                        startTime: moment(data.resultBean.onDutyStartTime).format('YYYY-MM-DD'),
                        endTime: moment(data.resultBean.onDutyEndTime).format('YYYY-MM-DD'),
                        t1: moment('2015-01-10'),
                    });
                    console.log(data);
                    console.log(moment(data.resultBean.onDutyStartTime).format('YYYY-MM-DD'));
                    console.log(moment(data.resultBean.onDutyEndTime).format('YYYY-MM-DD'));
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

    updateOnDutyData() {

        if (this.state.onDutyUserName == 0) {
            message.error("请输入值班人员姓名!");
            return ;
        }

        if (this.state.telephone == 0) {
            message.error("请输入值班人员联系方式!");
            return ;
        }

        if (this.state.startTime == null) {
            message.error("请输入值班周期!");
            return ;
        }

        Fetch.requestPost({
            url: UpdateOnDuty,
            info: 'onDutyId='+this.state.onDutyId+'&onDutyUserName='+this.state.onDutyUserName
                    +'&onDutyTelephone='+this.state.telephone+'&onDutyStartTime='+moment(this.state.startTime).format('YYYY-MM-DD')
                    +'&onDutyEndTime='+moment(this.state.endTime).format('YYYY-MM-DD'),
            timeOut: 3000,
        }).then ( 
            data => {
                if (data.status == 0) {
                    message.success("修改成功");
                    emitter.emit("refresh", "修改");
                    this.setState({
                        visible: false,
                    })
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

    handleShowModal = () => {
        this.setState({
            visible: true,
        }, () => this.getSingleDutyData());
        // 必须在这里出发才行
    }

    handleOkModal = () => {
        this.updateOnDutyData()
    }

    handleCancelModal = () => {
        this.setState({
            visible: false,
        })
    }

    handleModalUserName = (value) => {
        const staff = this.props.staff;
        for (let i in staff) {
            console.log(staff[i].realName)
            if (staff[i].realName == value) {
                this.setState({
                    onDutyUserName: value,
                    telephone: staff[i].telephone,
                })
                break;
            }
        }
    }

    handleModalTelephone = (e) => {
        console.log(e);
        this.setState({
            telephone: e.target.value,
        });
    }

    handleModalRangeTime = (dates) => {
        console.log(dates);
        if (dates.length < 1) {
            this.setState({
                startTime: null,
                endTime: null,
            })
            return ;
        }
        this.setState({
            startTime: dates[0],
            endTime: dates[1],
        })
    }

    render() {
        let rangeTime;
        if (this.state.startTime != null)
            rangeTime = [moment(this.state.startTime), moment(this.state.endTime)];
        else rangeTime = [null, null];
        // console.log(this.state.t1);
        // console.log(typeof this.state.t1);
        // console.log(typeof this.state.startTime);
        return (
            <span>
                <a onClick={this.handleShowModal}>修改</a>
                <Modal
                    title="安排值日"
                    visible={this.state.visible}
                    onOk={this.handleOkModal}
                    onCancel={this.handleCancelModal}
                    okText="确认"
                    cancelText="取消"
                >
                    <div >
                        值班人员姓名: &nbsp;&nbsp;
                        <Select value={this.state.onDutyUserName} style={{ width: 150 }} 
                            onChange={this.handleModalUserName} >
                            { 
                                this.props.staff.map(item => 
                                    <Option key={item.telephone} value={item.realName}>{item.realName}</Option>
                                )
                            }
                        </Select>
                    </div>
                    <div className="modalInput">
                        联&nbsp;&nbsp;系&nbsp;&nbsp;&nbsp;&nbsp;方&nbsp;&nbsp;式：
                        <Input size="small" value={this.state.telephone} style={{ height:30 , width:150 }} 
                                    onChange={this.handleModalTelephone} />
                    </div>
                    <div className="modalInput">
                        值&nbsp;&nbsp;班&nbsp;&nbsp;&nbsp;&nbsp;周&nbsp;&nbsp;期：
                        <RangePicker value={rangeTime} 
                            onChange={this.handleModalRangeTime} placeholder={["开始时间", "结束时间"]} allowClear={false} />
                    </div>
                </Modal>
            </span>
        );
    }
}

class OnDutyTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            onDutyId: '',
        }
        this.columns = [
            {
                title: '值班人员姓名',
                dataIndex: 'onDutyUserName',
                key: 'onDutyUserName',
                align: 'center',
            }, 
            {
                title: '联系方式',
                dataIndex: 'onDutyTelephone',
                key: 'onDutyTelephone',
                align: 'center',
            },
            {
                title: '值班周期',
                children: [
                    {
                        title: '开始时间',
                        dataIndex: 'onDutyStartTime',
                        key: 'onDutyStartTime',
                        align: 'center',
                        sorter: (a, b) => a.onDutyStartTime < b.onDutyStartTime
                    },
                    {
                        title: '结束时间',
                        dataIndex: 'onDutyEndTime',
                        key: 'onDutyEndTime',
                        align: 'center',
                    }
                ]
                
            },
            {
                title: '最近一次更新时间',
                dataIndex: 'updateTime',
                key: 'updateTime',
                align: 'center',
            },
            {
                title: '更新人',
                dataIndex: 'updateUser',
                key: 'updateUser',
                align: 'center',
            },
            {
                title: '操作',
                key: 'action',
                align: 'center',
                render: (text, record) => (
                    <span>
                        <Modify onDutyId={record.onDutyId} staff={this.props.staff} />
                        <Divider type="vertical" />
                        <Popconfirm title="确定删除?" onConfirm={() => this.handleDelete(record.onDutyId)} okText="确定" cancelText="取消">
                            <a className="deleteHerf">删除</a>
                        </Popconfirm>
                    </span>
                ),
            }
        ];

        // 测试数据
        this.data = [
            {
                key: '1',
                onDutyUserName: '谢仁义',
                onDutyTelephone: '18200326751',
                onDutyStartTime: moment().format('YYYY-MM-DD'),
                onDutyEndTime: moment().format('YYYY-MM-DD'),
                updateUser: '陈晓宇',
                updateTime: moment().format('YYYY-MM-DD'),
            },
            {
                key: '2',
                onDutyUserName: '谢仁义',
                onDutyTelephone: '18200326751',
                onDutyStartTime: moment().format('YYYY-MM-DD'),
                onDutyEndTime: moment().format('YYYY-MM-DD'),
                updateUser: '陈晓宇',
                updateTime: moment().format('YYYY-MM-DD'),
            },
        ]
    }

    deleteOnDutyData() {

        Fetch.requestPost({
            url: DeleteOnDuty,
            info: 'onDutyId='+this.state.onDutyId,
            timeOut: 3000,
        }).then ( 
            data => {
                if (data.status == 0) {
                    message.success("删除成功");
                    emitter.emit("refresh", "删除");
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

    handleDelete = (id) => {
        this.setState({
            onDutyId: id
        }, () => this.deleteOnDutyData());
    }

    render() {
        return (
            <div style={{ flex: 1 }}>
                <Table bordered dataSource={this.props.allOnDutyData} columns={this.columns} pagination={false} />
            </div>
        );
    }
}

class OnDutyView extends React.Component {

    state = {
        visible: false,
        submitLoading: false,
    }

    constructor(props) {
        super(props);
        this.state={
            nowPage: 1,
            totalPage: 1,
            pageSize: 10,
            onDutyId: '',
            allOnDutyData: '',
            searchUserName: '',
            onDutyUserName: '',
            telephone: '',
            startTime: null,
            endTime: null,
            staff: [],
        }
        emitter.on("refresh", this.refresh.bind(this)); 
    }

    componentWillMount() {
        this.getTeamStaff();
        this.getOnDutyData();
    }

    refresh(msg) {
        // 注册emit, 这样触发emit就会刷新界面了.
        // console.log("!!!!!!!!!!!")
        this.setState({
            searchUserName: '',
            startTime: null,
            endTime: null,
        }, () => this.getOnDutyData());
    }

    getTeamStaff() {

        Fetch.requestGet({
            url: GetTeamStaff,
            timeOut: 3000,
        }).then ( 
            data => {
                console.log(data);

                if (data.status == 0) {
                    this.setState({
                        staff: data.resultBean
                    })
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

    getOnDutyData() {
        // console.log("从后台重新读取数据渲染");
        // console.log("!!!xiegetData");

        let startTime = '';
        if (this.state.startTime != null) {
            startTime = moment(this.state.startTime).format('YYYY-MM-DD');
        }

        let endTime = '';
        if (this.state.endTime != null) {
            endTime = moment(this.state.endTime).format('YYYY-MM-DD');
        }

        Fetch.requestPost({
            url: SelectOnDuty,
            info: 'onDutyUserName='+this.state.searchUserName
                    +'&onDutyStartTime='+startTime+'&onDutyEndTime='+endTime
                    +'&pageNum='+this.state.nowPage+'&pageSize='+this.state.pageSize,
            timeOut: 3000,
        }).then ( 
            data => {
                console.log(data);
                if (data.status == 0) {
                    if(data.resultBean.currentPage>0) {
                        this.setState({nowPage: data.resultBean.currentPage});
                    } else {
                        this.setState({nowPage: 1});
                    }
                    this.setState({
                        totalPage: data.resultBean.totalItems/data.resultBean.pageSize,
                        allOnDutyData: data.resultBean.items
                    });
                } else {
                    this.setState({
                        nowPage: 1,
                        totalPage: 1,
                        allOnDutyData: '',
                    });
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

    addOnDutyData() {

        if (this.state.onDutyUserName == 0) {
            message.error("请输入值班人员姓名!");
            return ;
        }

        if (this.state.startTime == null) {
            message.error("请输入值班周期!");
            return ;
        }

        this.setState({
            submitLoading: true,
        })

        Fetch.requestPost({
            url: AddOnDuty,
            info: 'onDutyUserName='+this.state.onDutyUserName+'&onDutyTelephone='+this.state.telephone
                    +'&onDutyStartTime='+moment(this.state.startTime).format('YYYY-MM-DD')
                    +'&onDutyEndTime='+moment(this.state.endTime).format('YYYY-MM-DD'),
            timeOut: 3000,
        }).then ( 
            data => {
                if (data.status == 0) {
                    message.success("添加成功");
                    this.setState({
                        onDutyUserName: '',
                        telephone: '',
                        visible: false,
                    })
                    emitter.emit("refresh", "添加");
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
        
        this.setState({
            submitLoading: false,
        })
    }

    handleSearchUserNameText = (e) => {
        console.log(e.target.value);
        this.setState({
            searchUserName: e.target.value,
        }, () => this.getOnDutyData());
    }

    handleSearchRangeTime = (dates) => {
        console.log(dates.length);
        if (dates.length < 1) {
            this.setState({
                startTime: null,
                endTime: null,
            }, () => this.getOnDutyData());
            return ;
        }
        // console.log(dates.length);
        // console.log(dates[0].format('YYYY-MM-DD'));
        // console.log(dates[1].format('YYYY-MM-DD'));
        this.setState({
            startTime: dates[0].format('YYYY-MM-DD'),
            endTime: dates[1].format('YYYY-MM-DD'),
        }, () => this.getOnDutyData());
    }

    handleSearchRangeTimeBtn = () => {
        console.log("!!!xie");
        this.getOnDutyData();
    }

    handlePageChange = (page) => {
        console.log(page);
        this.setState({
            nowPage: page 
        }, () => this.getOnDutyData());
    }

    disabledDate = (current) => {
        // 最晚是今天
        return current > moment().endOf('day');
    }

    handleShowModal = () => {
        // console.log(moment.duration(moment('2013-02-08 09:30:26')).seconds());
        this.setState({
            visible: true,
        });
    }

    handleOkModal = () => {
        this.addOnDutyData();
    }

    handleCancelModal = () => {
        this.setState({
            visible: false,
        });
    }

    handleModalAddUserName = (value) => {
        console.log(value);
        const staff = this.state.staff;
        for (let i in staff) {
            console.log(staff[i].realName)
            if (staff[i].realName == value) {
                this.setState({
                    onDutyUserName: value,
                    telephone: staff[i].telephone,
                })
                break;
            }
        }
    }

    handleModalAddTelephone = (e) => {
        this.setState({
            telephone: e.target.value,
        })
    }

    handleModalAddRangeTime = (dates) => {
        if (dates.length < 1) {
            this.setState({
                startTime: null,
                endTime: null,
            })
            return ;
        }
        this.setState({
            startTime: dates[0],
            endTime: dates[1],
        })
    }

    render() {
        let rangeTime;
        if (this.state.startTime != null)
            rangeTime = [moment(this.state.startTime), moment(this.state.endTime)];
        else rangeTime = [null, null];
        return(
            <div style={{ flex: 1, padding: "10px" }}>
                <Card title="值班管理" >
                    <Input placeholder="值班人姓名" value={this.state.searchUserName} onChange={this.handleSearchUserNameText} 
                        style={{ height: 30, width: 150}} className="searchF" allowClear />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <RangePicker value={rangeTime} onChange={this.handleSearchRangeTime} placeholder={["开始时间", "结束时间"]} />
                    <Button type="primary" shape="circle" icon="search" onClick={this.handleSearchRangeTimeBtn}/>
                    <div className="addUrlBtn">
                        <Button type="primary" onClick={this.handleShowModal}> 安排值班 </Button>
                        <Modal
                            title="添加值班"
                            visible={this.state.visible}
                            onOk={this.handleOkModal}
                            onCancel={this.handleCancelModal}
                            okText="确认添加"
                            cancelText="取消"
                            okButtonProps={{
                                loading: this.state.submitLoading,
                            }}
                            cancelButtonProps={{
                                disabled: this.state.submitLoading,
                            }}
                        >
                        <div >
                            值班人员姓名: &nbsp;&nbsp;
                            <Select value={this.state.onDutyUserName} style={{ width: 150 }} 
                                onChange={this.handleModalAddUserName} >
                                { 
                                    this.state.staff.map((item) => 
                                        <Option key={item.telephone} value={item.realName}>{item.realName}</Option>
                                    )
                                }
                            </Select>
                        </div>
                        <div className="modalInput">
                            联&nbsp;&nbsp;系&nbsp;&nbsp;&nbsp;&nbsp;方&nbsp;&nbsp;式：
                            <Input size="small" value={this.state.telephone} style={{ height:30 , width:150 }} 
                                        onChange={this.handleModalAddTelephone} /> 
                            <span className="suggestion">(永久修改建议修改用户信息)</span>
                        </div>
                        <div className="modalInput">
                            值&nbsp;&nbsp;班&nbsp;&nbsp;&nbsp;&nbsp;周&nbsp;&nbsp;期：
                            <RangePicker value={rangeTime} onChange={this.handleModalAddRangeTime} placeholder={["开始时间", "结束时间"]} />
                        </div>
                        </Modal>
                    </div>
                    <OnDutyTable allOnDutyData={this.state.allOnDutyData} staff={this.state.staff} />
                    <div className="tablePage">
                        <Pagination size="small" simple onChange={this.handlePageChange} total={this.state.totalPage*this.state.pageSize}
                            pageSize={this.state.pageSize} defaultCurrent={this.state.nowPage} showQuickJumper />
                    </div>
                </Card>
            </div>
        );
    }
}

export default class OnDuty extends React.Component {
    render() {
        return (
            <div>
                <OnDutyView />
            </div>
        );
    }
}