import React from 'react';
import { Card, Table } from 'antd';
import axios from './../../axios/index';


export default class BasicTable extends React.Component {


    state = {
        dataSource2: [],
    }

    componentWillMount() {
        const data = [
             
            {
                id: '1',
                userName: 'Alice',
                sex: '1',
                state: '1',
                interest: '1',
                birthday: '2000-01-01',
                address: '谢谢',
                time: '09:00',
            },
            {
                id: '2',
                userName: 'Tom',
                sex: '1',
                state: '1',
                interest: '1',
                birthday: '2000-01-01',
                address: '谢谢',
                time: '09:00',
            },
        ]

        this.setState({
            dataSource: data,
        })

        this.request();
    }

    // 动态获取数据 from Mock
    request = () => {
        axios.ajax({
            url: '/table/list',
            data: {
                params: {
                    page: 1
                }
            }
        }).then((res) => {
            if (res.code == 0) {
                this.setState({
                    dataSource2: res.result,
                })
            }
        })
    }

    render() {

        const columns = [
            {
                title: 'id',
                dataIndex: 'id'
            },
            {
                title: '用户名',
                dataIndex: 'userName'
            },
            {
                title: '性别',
                dataIndex: 'sex'
            },
            {
                title: '状态',
                dataIndex: 'state'
            },
            {
                title: '兴趣爱好',
                dataIndex: 'interest'
            },
            {
                title: '生日',
                dataIndex: 'birthday'
            },
            {
                title: '地址',
                dataIndex: 'address'
            },
            {
                title: '注册时间',
                dataIndex: 'time'
            },
        ] 

        return (
            <div>
                <Card title="基础表格" style={{ margin: '10px, 0'}}>
                    <Table 
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource}
                        pagination={false}
                    />
                </Card>

                <Card title="Mock数据渲染" style={{ marginTop: 10 }}>
                    <Table 
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={false}
                    />
                </Card>
            </div>
        );
    }
}