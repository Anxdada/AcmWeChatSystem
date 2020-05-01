import React from 'react';
import './index.less';
import { notification, Table, Divider, Tag, Button, Card, Pagination, Input, Modal, Select, message, Spin, ConfigProvider, Empty, DatePicker, Popconfirm } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { UpdateReport, SelectReport } from './../../config/dataAddress';
import { EventEmitter2 } from 'eventemitter2';
import Fetch from './../../fetch';

var emitter = new EventEmitter2();
// 用于刷新react, 从一个页面返回时出发最有用, on 注册, emit 修改触发


moment.locale('zh-cn');

const { Option } = Select;

class ReportModifyAction extends React.Component {

    state = { 
        visible: false,
        submitLoading: false,
    }

    constructor(props) {
        super(props);
        this.state = {
            result: '',
            isHandleText: '',
        }
    }

    componentWillMount() {
        this.setState({
            result: this.props.record.result,
            isHandleText: this.props.record.isHandle == 0 ? "否" : "是",
        })
    }

    updateReportData() {
        this.setState({
            submitLoading: true,
        });

        const isHandle = this.state.isHandleText == "是" ? 1 : 0;

        Fetch.requestPost({
            url: UpdateReport,
            info: 'reportId='+this.props.record.reportId+'&result='+this.state.result
                    +'&isHandle='+isHandle,
            timeOut: 3000,
        }).then ( 
            data => {
                if (data.status == 0) {
                    message.success('修改成功');
                    emitter.emit('refresh', '修改');
                    this.setState({
                        visible: false,
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
                    submitLoading: false,
                })
            }
        ).catch( err => {
            // console.log("err", err);
            message.error('连接超时! 请检查服务器是否启动.');
        });
    } 

    handleShowModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleOkModal = (e) => {
        // console.log(e);
        this.updateReportData();
    }

    handleCancelModal = (e) => {
        // console.log(e);
        this.setState({
            visible: false,
        });
    }

    handleResult = (e) => {
        // console.log(e)
        this.setState({
            result: e.target.value
        });
    }

    handleIsHandleText = (value) => {
        this.setState({
            isHandleText: value
        });
    }


    render(){
        const { record } = this.props;
        const handleUserName = record.isHandle == 0 ? "无" : record.handleUserDetail.realName;
        const handleTime = record.isHandle == 0 ? "无" : record.handleTime;
        return (
        <span>
            <a onClick={ this.handleShowModal }> 修改 </a>
            <Modal
                title="举报处理详情友链"
                visible={this.state.visible}
                onOk={this.handleOkModal}
                onCancel={this.handleCancelModal}
                okText="确认修改"
                cancelText="取消"
                okButtonProps={{
                    loading: this.state.submitLoading,
                }}
                cancelButtonProps={{
                    disabled: this.state.submitLoading,
                }}
            >
            <div className="modalInput">
                是否处理: &nbsp;
                <Select value={ this.state.isHandleText } style={{ width: 150 }} 
                    onChange={this.handleIsHandleText} >
                    <Option value="否" key="0">否</Option>
                    <Option value="是" key="1">是</Option>
                </Select>
            </div>
            <div>
                处&nbsp;&nbsp;理&nbsp;&nbsp;人: <strong>{handleUserName}</strong>
            </div>
            <div className="modalInput">
                处理时间: <strong>{handleTime}</strong>
            </div>
            <div>
            {
                this.state.isHandleText == "否" ? null : 
                <span>
                处理结果: &nbsp;
                <Input style={{ width: 300 }} placeholder="请输入处理结果" value={this.state.result} onChange={this.handleResult} /> 
                </span>
            }
            </div>
            </Modal>
        </span>
        )
    }
}

  
// 友链属性那个是添加需要填写的
class ReportTable extends React.Component {

    state = {
        tableLoading: false,
    }

    constructor(props) {
        super(props);
        this.state={
            nowPage: 1,
            totalPage: 1,
            pageSize: 10,
            allReport: [],
        }
        this.columns = [
            {
                title: '举报类型',
                dataIndex: 'type',
                key: 'type',
                align: 'center',
            },
            {
                title: '对应的id',
                dataIndex: 'typeId',
                key: 'typeId',
                align: 'center',
            },
            {
                title: '举报理由',
                dataIndex: 'reason',
                key: 'reason',
                align: 'center',
            },
            {
                title: '附加说明',
                dataIndex: 'reportBody',
                key: 'reportBody',
                align: 'center',
            },
            {
                title: '举报人',
                key: 'createUser',
                dataIndex: 'createUser',
                align: 'center',
            },
            {
                title: '举报时间',
                dataIndex: 'createTime',
                key: 'createTime',
                align: 'center',
                sorter: (a, b) => a.createTime < b.createTime
                // sorter: (a, b) => moment(a.createTime).isAfter(moment(b.createTime)) || moment(a.createTime).isBefore(moment(b.createTime))
                // defaultSortOrder: 'descend'
            },
            {
                title: '是否处理',
                dataIndex: 'isHandle',
                key: 'isHandle',
                align: 'center',
                render: (text, record) => (
                    <span>
                        <Tag color={record.isHandle == 1 ? "green": "red"} >{record.isHandle == 1 ? "是": "否"}</Tag>
                    </span>
                ),
            },
            {
                title: '操作',
                key: 'action',
                align: 'center',
                render: (text, record) => (
                    <ReportModifyAction record={record} />
                ),
            },
        ];
        emitter.on("refresh", this.refresh.bind(this)); 
    }

    refresh(msg) {
        // 注册emit, 这样触发emit就会刷新界面了.
        this.getReportData();
    }

    componentWillMount() {
        this.getReportData();
    }

    getReportData() {

        this.setState({
            tableLoading: true,
        })

        Fetch.requestPost({
            url: SelectReport,
            info: 'pageNum='+this.state.nowPage+'&pageSize='+this.state.pageSize,
            timeOut: 3000,
        }).then ( 
            data => {
                // console.log(data);
                // console.log(SelectFriendUrl);
                if (data.status == 0) {
                    if (data.resultBean.currentPage > 0) {
                        this.setState({nowPage: data.resultBean.currentPage});
                    } else {
                        this.setState({nowPage: 1});
                    }
                    this.setState({
                        totalPage: data.resultBean.totalItems/data.resultBean.pageSize,
                        allReport: data.resultBean.items,
                    });
                } else {
                    this.setState({
                        nowPage: 1,
                        totalPage: 1,
                        allReport: [],
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

        this.setState({
            tableLoading: false,
        })
    }

    handlePageChange = (page) => {
        console.log(page);
        this.setState({ nowPage: page }, () => this.getUrlData());
    }

    render() {
        return (
        <div style={{ flex: 1, padding: "10px" }}>
            <Card title="举报管理" >
                <Spin spinning={this.state.tableLoading}>
                    <Table 
                        bordered
                        columns={this.columns}
                        dataSource={this.state.allReport}
                        pagination={false}
                        rowKey={record => record.reportId}
                    />
                </Spin>
                <div className="tablePage">
                    <Pagination size="small" simple onChange={this.handlePageChange} total={this.state.totalPage*this.state.pageSize}
                    pageSize={this.state.pageSize} defaultCurrent={this.state.nowPage} showQuickJumper />
                </div>
            </Card>
        </div>
        );
    }
}

export default class Report extends React.Component {
    render() {
        return (
            <div>
                <ReportTable />
            </div>
        );
    }
}