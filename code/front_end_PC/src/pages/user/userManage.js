import React from 'react';
import './index.less';
import { Modal, Table, Popconfirm, Divider, Select, Input, DatePicker, Card, Button, Pagination } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';


moment.locale('zh-cn');
const { Option } = Select;


var year = moment().year();
var gradeRows = [], i = year-9;
while (++i <= year) gradeRows.push(i);

class UserModify extends React.Component {
    state = { 
        visible: false,
    }

    constructor(props) {
        super(props);
        this.state = {
            modalUserId: '',
            modalUserName: '',
            modalTelephone: '',
            modalStudentId: '',
            modalGrade: '',
        }
    }

    handleShowModal = () => {
        console.log('进来了');
        this.setState({
            modalUserName: '谢仁义',
            modalTelephone: '18200326751',
            modalStudentId: '2016081887',
            modalGrade: '2017',
            visible: true,
        });
        // this.setState({
        //     modalUserName: data.userName,
        //     modalTelephone: data.telephone,
        //     modalStudentId: data.studentId,
        //     modalGrade: data.grade,
        // visible: true,
        // })
    }

    handleOkModal = (e) => {
        console.log(e);
        this.updateUserData();
    }

    handleCancelModal = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }

    handleModalGrade = (value) => {
        console.log(value);
        this.setState({
            modalGrade: value,
        });
    }

    updateUserData() {

        console.log(this.state.friendUrlCreateTime);

        this.setState({
            visible: false,
        });
        
        // fetch(UpdateFriendUrl, {
        //     method: 'POST',
        //     headers : {
        //         'Authorization': cookie.load('token'),
        //         'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
        //     },
        //     body:'friendurlId='+this.state.friendurlId+'&friendurlTitle='+this.state.friendurlTitle+'&friendurlBody='+this.state.friendurlBody
        // }).then(res => res.json()).then(
        //     data => {
        //         if (data.code==0) {
        //             message.success('修改成功');
        //             emitter.emit('changeFirstText', '修改')
        //         } else {
        //             message.error(data.msg);
        //         }
        //     }
        // )
    }

    render(){
        console.log(this.state.modifyUrlId)
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
            >
                <div>
                    用&nbsp;&nbsp;户&nbsp;&nbsp;名: &nbsp;&nbsp;
                    <Input value={this.state.modalUserName} style={{ height:30 , width:300 }} disabled/>
                </div>
                <div className="modalInput">
                    联系电话: &nbsp;&nbsp;
                    <Input value={this.state.modalTelephone} style={{ height:30 , width:300 }} disabled/>
                </div>
                <div className="modalInput">
                    学&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号: &nbsp;&nbsp;
                    <Input value={this.state.modalStudentId} style={{ height:30 , width:300 }} disabled/>
                </div>
                <div className="modalInput">
                    年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;级:&nbsp;&nbsp;&nbsp;
                    <Select defaultValue={ this.state.modalGrade } style={{ width: 100 }} 
                        onChange={this.handleModalGrade} >
                        {
                            gradeRows.map((item) => 
                                <Option value={item}>{item}</Option>
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
            modalUserName: '',
            modalTelephone: '',
            modalStudentId: '',
            modalGrade: '',
        }
        this.columns = [
            {
                title: '用户名',
                dataIndex: 'userName',
                key: 'userName',
                render: (text, record) => (
                    <span>
                    <a onClick={() => this.handleShowUserDetail(record)}>{text}</a>
                    </span>
                )
            },
            {
                title: '联系电话',
                dataIndex: 'telephone',
                key: 'telephone',
            },  
            {
                title: '学号',
                dataIndex: 'studentId',
                key: 'studentId',
                
            },  
            {
                title: '年级',
                dataIndex: 'grade',
                key: 'grade',
                
            }, 
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <span>
                    {
                        record.auth==0?<Popconfirm title="确定审核通过?" okText="确认" cancelText="取消" onConfirm={() => this.handlePassUser(record.userId)}>
                            <a>审核通过</a>
                        </Popconfirm>:<a  className="deleteHerf" onClick={()=>{this.handleNotPassUser(record.userId)}}>取消审核</a>
                    }
                    <Divider type="vertical" />
                    {
                        record.auth!=4&&record.auth!=5&&record.userId!=2?<Popconfirm title="确定设为管理员?" okText="确认" cancelText="取消" onConfirm={() => this.handleBecomeAdmin(record.userId)}>
                        <a>设为管理员</a>
                        </Popconfirm>:<Popconfirm title="确定取消管理员?" okText="确认" cancelText="取消" onConfirm={() => this.handleCancelAdmin(record.userId)}>
                            <a className="deleteHerf">取消管理员</a>
                        </Popconfirm>
                    }
                    <Divider type="vertical" />
                    <UserModify data={record} />
                    </span>
                ),
            }
        ];
        this.data = [
            {
                key: '1',
                userName: '陈晓宇',
                telephone: '18293738811',
                studentId: '2015081187',
                grade: '2015',
            },
            {
                key: '2',
                userName: '谢仁义',
                telephone: '18200327851',
                studentId: '2016081187',
                grade: '2016',
            },
            {
                key: '1',
                userName: '闫国龙',
                telephone: '124332141424',
                studentId: '2017081197',
                grade: '2017',
            },
            {
                key: '2',
                userName: '左一凡',
                telephone: '9303317743',
                studentId: '2017081187',
                grade: '2017',
            },
        ]
    }

    handleShowUserDetail = (data) => {
        console.log(data);
        this.setState({
            modalUserName: '谢仁义',
            modalTelephone: '18200326751',
            modalStudentId: '2016081887',
            modalGrade: '2017',
            visible: true,
        });
        // this.setState({
        //     modalUserName: data.userName,
        //     modalTelephone: data.telephone,
        //     modalStudentId: data.studentId,
        //     modalGrade: data.grade,
        // })
    }

    handlePaddUser = () => {
        
    }

    handleNotPassUser = () => {

    }

    handleBecomeAdmin = () => {
        
    }

    handleCancelAdmin = () => {

    }

    handleOkModal = () => {
        this.setState({
            visible: false,
        })
    }

    render() {
        return (
            <div>
                <Table columns={this.columns} dataSource={this.data} pagination={false} />
                <Modal
                        title="用户详细信息"
                        visible={this.state.visible}
                        onOk={this.handleOkModal}
                        onCancel={this.handleOkModal}
                        okText="关闭"
                        ancelText=""
                >
                    <div>
                        用&nbsp;&nbsp;户&nbsp;&nbsp;名: <strong>{this.state.modalUserName} </strong>
                    </div>
                    <div className="modalInput">
                        联系电话: <strong>{this.state.modalTelephone} </strong>
                    </div>
                    <div className="modalInput">
                        学&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号: <strong>{this.state.modalStudentId} </strong>
                    </div>
                    <div className="modalInput">
                        年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;级: <strong>{this.state.modalGrade} </strong>
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
            tableData: [],
            userNameSearchText: '',
            stuNumSearchText: '',
        }
    }

    handleSearchTextUserName = (e) => {
        console.log(e);
        this.setState({ 
            userNameSearchText: e.target.value 
        }, () => this.getUserData());
    }

    handleSearchTextStuNum = (e) => {
        console.log(e);
        this.setState({ 
            stuNumSearchText: e.target.value 
        }, () => this.getUserData());
    }

    handleSearchBtn = () => {
        this.getUserData();
    }

    handlePageChange = (page) => {
        console.log(page);
        this.setState({ nowPage: page }, () => this.getTagData());
    }

    getUserData() {
        console.log('重新后台获取tag数据');
    }

    updateUserData() {
        console.log('新增一个tag数据');
    }

    render() {
        return (
            <div>
                <Card title="用户管理">
                    <div>
                        <Input size="small" onChange={this.handleSearchTextUserName} placeholder="用户名" style={{ height:30 , width:150 }}/>
                        &nbsp;&nbsp;
                        <Input size="small" onChange={this.handleSearchTextStuNum} placeholder="学号" style={{ height:30 , width:150 }}/>
                        &nbsp;&nbsp;
                        <Button type="primary" shape="circle" icon="search" onClick={ this.handleSearchBtn }/>
                    </div>
                    <UserTable tableData={this.state.tableData} />
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