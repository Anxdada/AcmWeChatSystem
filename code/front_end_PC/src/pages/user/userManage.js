import React from 'react';
import './index.less';
import { Modal, Table, Popconfirm, Divider, Select, Input, DatePicker, Card, Button, Pagination, Avatar, Alert, message, notification } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { SelectUserPC, UpdateUserPC } from '../../config/dataAddress';
import { EventEmitter2 } from 'eventemitter2';
import Fetch from '../../fetch';
import { authArray } from '../../config/userAuthAbout';


moment.locale('zh-cn');
const { Option } = Select;
var emitter = new EventEmitter2();

// 用来修改年级用的
var year = moment().year();
var gradeRows = [], i = year-9;
while (++i <= year) gradeRows.push(i);


// 这个不会涉及到删除的过程, 所以表格的id不会变, 所以可以直接传record记录进来
class UserModify extends React.Component {

    state = { 
        visible: false,
        loading: false,
    }

    constructor(props) {
        super(props);

    }

    updateUserData() {

        this.setState({
            loading: true
        })

        Fetch.requestPost({
            url: UpdateUserPC,
            info: 'userId='+this.state.modalUserId+'&grade='+this.state.modalGrade,
            timeOut: 3000,
        }).then( 
            data => {
                if (data.status == 0) {
                    message.success('修改成功!');
                    emitter.emit('refresh', '修改成功');
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
        )

        this.setState({
            visible: false,
            loading: false,
        })
    }

    handleShowModal = () => {
        this.setState({
            modalUserId: this.props.record.userId,
            modalUserName: this.props.record.userName,
            modalStudentId: this.props.record.studentId,
            modalTelephone: this.props.record.telephone,
            modalRealName: this.props.record.realName,
            modalGrade: this.props.record.grade,
            visible: true,
        });
    }

    handleOkModal = (e) => {
        this.updateUserData();
    }

    handleCancelModal = (e) => {
        this.setState({
            visible: false,
        });
    }

    handleModalGrade = (value) => {
        this.setState({
            modalGrade: value,
        });
    }

    render(){
        return (
            <span>
            <a onClick={ this.handleShowModal }> 修改 </a>
            <Modal
                title="修改类别"
                visible={this.state.visible}
                onOk={this.handleOkModal}
                onCancel={this.handleCancelModal}
                okText="确认修改"
                cancelText="取消"
                okButtonProps={{
                    loading: this.state.loading,
                }}
                cancelButtonProps={{
                    disabled: this.state.loading,
                }}
            >
                <div>
                    用&nbsp;&nbsp;户&nbsp;&nbsp;名: &nbsp;&nbsp;
                    <Input value={this.state.modalUserName} style={{ height:30 , width:300 }} disabled/>
                </div>
                <div className="modalInput">
                    学&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号:&nbsp;&nbsp;&nbsp;
                    <Input value={this.state.modalStudentId} style={{ height:30 , width:300 }} disabled/>
                </div>
                <div className="modalInput">
                    联系电话: &nbsp;&nbsp;
                    <Input value={this.state.modalTelephone} style={{ height:30 , width:300 }} disabled/>
                </div>
                <div className="modalInput">
                    真实姓名: &nbsp;&nbsp;
                    <Input value={this.state.modalRealName} style={{ height:30 , width:300 }} disabled/>
                </div>
                <div className="modalInput">
                    年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;级:&nbsp;&nbsp;&nbsp;
                    <Select defaultValue={ this.state.modalGrade } style={{ width: 100 }} 
                        onChange={this.handleModalGrade} >
                        {
                            gradeRows.map((item) => 
                                <Option value={item} key={item}>{item}</Option>
                            )
                        }
                    </Select>
                </div>
            </Modal>
            </span>
        );
    }
}


class UserTable extends React.Component {

    state = {
        visible: false,
    }

    constructor(props) {
        super(props);
        this.state = {
            modalAvatar: '',
            modalUserName: '',
            modalStudentId: '',
            modalAuth: '',
            modalGrade: '',
            modalTelephone: '',
            modalRealName: '',
            modalCreateTime: '',
        }
        
        this.columns = [
            {
                title: '用户名',
                dataIndex: 'userName',
                key: 'userName',
                align: 'center',
                render: (text, record) => {
                    let aColor;
                    (record.auth & (1 << 5)) != 0 ? aColor = "balckList" : aColor = "";
                    return (<a className={aColor} onClick={() => this.handleShowUserDetail(record)}>{text}</a>)
                }
            },
            {
                title: '学号',
                dataIndex: 'studentId',
                key: 'studentId',
                align: 'center',
                sorter: (a, b) => a.studentId - b.studentId
            },
            {
                title: '年级',
                dataIndex: 'grade',
                key: 'grade',
                align: 'center',
            },
            {
                title: '联系电话',
                dataIndex: 'telephone',
                key: 'telephone',
                align: 'center',
            },  
            {
                title: '真实姓名',
                dataIndex: 'realName',
                key: 'realName',
                align: 'center',
            },
            {
                title: '注册时间',
                dataIndex: 'createTime',
                key: 'createTime',
                align: 'center',
            },
            {
                title: '操作',
                key: 'action',
                align: 'center',
                render: (text, record) => (
                    <span>
                    {
                        record.auth & 1 == 0 ? null : 
                        (record.auth & (1 << 5)) != 0 ?
                            <span>
                            <Popconfirm title="确定取消拉黑?" okText="确认" cancelText="取消" onConfirm={() => this.handleCancelBlockUser(record)}>
                                <a className="deleteHerf">取消拉黑</a>
                            </Popconfirm>
                            </span> : (
                                <span>
                                    <a  className="deleteHerf" onClick={()=>{this.handleBlockUser(record)}}>拉黑</a>
                                </span>
                            )
                    }
                    {
                        (record.auth & (1 << 5)) != 0 ? null :
                        record.auth & 1 == 0 ? null :
                        (record.auth & (1 << 1)) != 0 ? (
                            <span>
                            <Divider type="vertical" />
                            <Popconfirm title="确定取消管理员?" okText="确认" cancelText="取消" onConfirm={() => this.handleCancelAdmin(record)}>
                                <a className="deleteHerf">取消管理员</a>
                            </Popconfirm>
                            </span>
                        ) : (
                            <span>
                            <Divider type="vertical" />
                            <Popconfirm title="确定设为管理员?" okText="确认" cancelText="取消" onConfirm={() => this.handleBecomeAdmin(record)}>
                                <a>设为管理员</a>
                            </Popconfirm>
                            </span>
                        )
                    }
                    <Divider type="vertical" />
                    {
                        (record.auth & (1 << 5)) != 0 ? null : <UserModify record={record} />
                    }
                    </span>
                ),
            }
        ];
    }

    updateUserData(userId, auth) {
        // console.log(auth);
        Fetch.requestPost({
            url: UpdateUserPC,
            info: 'userId='+userId+'&auth='+auth,
            timeOut: 3000,
        }).then( 
            data => {
                if (data.status == 0) {
                    message.success('修改成功!');
                    emitter.emit('refresh', "修改身份");
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
        )
    }

    handleShowUserDetail = (record) => {
        // console.log(record);
        let authStr = ''; // 根据身份号组装身份字符串
        for (let i = 0 ; i < 6 ; ++ i) {
            if ((1 << i) & record.auth) {
                if (authStr === '') {
                    authStr += authArray[i];
                } else {
                    authStr += ", ";
                    authStr += authArray[i];
                }
            }
        }
        this.setState({
            modalAvatar: record.avatar,
            modalUserName: record.userName,
            modalStudentId: record.studentId,
            modalAuth: authStr,
            modalGrade: record.grade,
            modalTelephone: record.telephone,
            modalRealName: record.realName,
            modalCreateTime: record.createTime,
            visible: true,
        });
    }

    handleCancelBlockUser = (record) => {
        this.updateUserData(record.userId, record.userId & ~(1<<5));
    }

    handleBlockUser = (record) => {

        if (record.userId & (1<<1)) {
            message.error('不能拉黑管理员!请先修改身份.');
            return ;
        }

        this.updateUserData(record.userId, (1<<5));
    }

    handleBecomeAdmin = (record) => {
        this.updateUserData(record.userId, record.userId | (1<<1));
    }

    handleCancelAdmin = (record) => {
        this.updateUserData(record.userId, record.userId & ~(1<<1));
    }

    handleOkModal = () => {
        this.setState({
            visible: false,
        })
    }

    render() {
        // console.log(this.props.allUserData);
        return (
            <div>
                <Table columns={this.columns} dataSource={this.props.allUserData} pagination={false} rowKey={record => record.userId} />
                <Modal
                        title="用户详细信息"
                        visible={this.state.visible}
                        onOk={this.handleOkModal}
                        onCancel={this.handleOkModal}
                        okText="关闭"
                        ancelText=""
                >
                    <div>
                        头&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;像:&nbsp;&nbsp;&nbsp;&nbsp;
                        <Avatar src={this.state.modalAvatar} />
                    </div>
                    <div className="modalInput">
                        用&nbsp;&nbsp;户&nbsp;&nbsp;名:&nbsp;&nbsp;&nbsp;&nbsp;<strong>{this.state.modalUserName} </strong>
                    </div>
                    <div className="modalInput">
                        学&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号:&nbsp;&nbsp;&nbsp;&nbsp;<strong>{this.state.modalStudentId}</strong>
                    </div>
                    <div className="modalInput">
                        身&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;份:&nbsp;&nbsp;&nbsp;&nbsp;<strong>{this.state.modalAuth}</strong>
                    </div>
                    <div className="modalInput">
                        年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;级:&nbsp;&nbsp;&nbsp;&nbsp;<strong>{this.state.modalGrade}</strong>
                    </div>
                    <div className="modalInput">
                        联系电话:&nbsp;&nbsp;&nbsp;&nbsp;<strong>{this.state.modalTelephone} </strong>
                    </div>
                    <div className="modalInput">
                        真实姓名:&nbsp;&nbsp;&nbsp;&nbsp;<strong>{this.state.modalRealName} </strong>
                    </div>
                    <div className="modalInput">
                        注册时间:&nbsp;&nbsp;&nbsp;&nbsp;<strong>{this.state.modalCreateTime} </strong>
                    </div>
                    
                </Modal>
            </div>
        );
    }
}


class UserView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            nowPage: 1,
            totalPage: 1,
            pageSize: 10,
            allUserData: [],
            userName: '',
            realName: '',
            studentId: '',
        }
        emitter.on("refresh", this.refresh.bind(this));
    }

    componentWillMount() {
        this.getUserData();
    }

    refresh = (msg) => {
        this.setState({
            userName: '',
            realName: '',
            studentId: '',
        }, () => this.getUserData());
    }

    getUserData() {
        // auth 根据规则获取普通用户的, 0-超级管理员 1-管理员 2-队员 3-萌新 4-未完善资料的萌新 5-拉黑用户 (后面的0-5是指身份值的数字的二进制的位数)
        // 比如 anth = 6, 那么这个人既是 管理员 又是 队员 (第多少位上是1, 代表他就具有该种身份)
        // 60 就表示除了超级管理员都取出来
        Fetch.requestPost({
            url: SelectUserPC,
            info: 'userName='+this.state.userName+'&studentId='+this.state.studentId+'&realName='+this.state.realName
                    +'&auth=60'+'&pageNum='+this.state.nowPage+'&pageSize='+this.state.pageSize,
            timeOut: 3000,
        }).then( 
            data => {
                if (data.status == 0) {
                    if (data.resultBean.currentPage > 0) {
                        this.setState({nowPage: data.resultBean.currentPage});
                    } else {
                        this.setState({nowPage: 1});
                    }
                    this.setState({
                        totalPage: data.resultBean.totalItems/data.resultBean.pageSize,
                        allUserData: data.resultBean.items,
                    });
                } else {
                    this.setState({
                        nowPage: 1,
                        totalPage: 1,
                        allUrl: ''
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
        )
    }

    handleSearchUserName = (e) => {
        // console.log(e);
        this.setState({ 
            userName: e.target.value 
        });
    }

    handleSearchRealName = (e) => {
        // console.log(e);
        this.setState({ 
            realName: e.target.value 
        });
    }

    handleSearchStudentId = (e) => {
        // console.log(e);
        this.setState({ 
            studentId: e.target.value 
        });
    }

    handleSearchBtn = () => {
        this.getUserData();
    }

    handlePageChange = (page) => {
        this.setState({ 
            nowPage: page 
        }, () => this.getUserData());
    }

    render() {
        return (
            <div>
                <Alert
                    message="温馨提示"
                    description="1.请不要随便泄露用户信息
                                2. 将用户这是为管理员只有超级管理员有此权限, 有需求的请联系@Anxdada
                                3. 拉黑是个比较严重的操作, 一般都不会拉黑的, 有需求请联系@Anxdada
                                4. 用户的详细身份可以点击用户名查看详情
                                5. 修改只能修改年级, 不通过学号判断是因为有转专业或者留级的学生, 这样区分判断好一点"
                    type="warning"
                    closable
                />
                <Card title="用户管理" className="modalInput">
                    <div>
                        <Input size="small" onChange={this.handleSearchUserName} placeholder="用户名" 
                            style={{ height:30 , width:150 }} value={this.state.userName} allowClear />
                        &nbsp;&nbsp;
                        <Input size="small" onChange={this.handleSearchRealName} placeholder="真实姓名" 
                            style={{ height:30 , width:150 }} value={this.state.realName} allowClear />
                        &nbsp;&nbsp;
                        <Input size="small" onChange={this.handleSearchStudentId} placeholder="学号" 
                            style={{ height:30 , width:150 }} allowClear value={this.state.studentId} />
                        &nbsp;&nbsp;
                        <Button type="primary" shape="circle" icon="search" onClick={ this.handleSearchBtn }/>
                    </div>
                    <UserTable allUserData={this.state.allUserData} />
                    <div className="tablePage">
                        <Pagination size="small" simple onChange={this.handlePageChange} total={this.state.totalPage*this.state.pageSize}
                        pageSize={this.state.pageSize} defaultCurrent={this.state.nowPage} showQuickJumper />
                    </div>
                </Card>
            </div>
        );
    }
}

export default class UserManage extends React.Component {

    render() {
        return (
            <div>
                <UserView />
            </div>
        );
    }
}