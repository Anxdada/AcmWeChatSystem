import React from 'react';
import { Icon, Select, message, notification, Tag } from 'antd';
import { NavBar, Toast, WingBlank } from 'antd-mobile';
import { SelectLabel, DetailPostUrl, UpdatePost } from './../../config/dataAddress';
import Fetch from './../../fetch';

const { Option } = Select;

export default class MobileAddLabelForPostPage extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            postLabel: [],
            allLabel: [],
            postTag: '',
        }
    }

    componentWillMount() {
        this.getLabelData();
        this.getPostData();
    }

    getLabelData() {
        // 用于取出目前所有的标签
        Fetch.requestPost({
            url: SelectLabel,
            info: 'pageSize=100',
            timeOut: 3000,
        }).then ( 
            data => {
                if (data.status == 0) {
                    this.setState({
                        allLabel: data.resultBean.items,
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

    getPostData() {
        Fetch.requestPost({
            url: DetailPostUrl,
            info: 'postId='+this.props.match.params.id,
            timeOut: 3000,
        }).then ( 
            data => {
                // console.log(data);
                if (data.status == 0) {
                    this.setState({
                        postTag: data.resultBean.postTag,
                        postLabel: data.resultBean.postLabel,
                    });
                }
                else {
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


    updatePostLabelData() {

        let labels = 0;
        for (let i = 0 ; i < this.state.postLabel.length ; ++ i) {
            labels |= 1 << this.state.postLabel[i];
        }

        Fetch.requestPost({
            url: UpdatePost,
            info: 'postId='+this.props.match.params.id+'&postTag='+labels,
            timeOut: 3000,
        }).then ( 
            data => {
                if (data.status == 0) {
                    message.success('贴标签成功');
                    this.props.history.push('/mobile/forum/detail/'+this.props.match.params.id)
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

    handleSelectLabel = (value) => {
        this.setState({
            postLabel: value,
        });
    }

	render() {
        // console.log(this.props.history);

		return(
            <div>
                <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={() =>  window.history.back(-1)}
                    rightContent={<span onClick={() => this.updatePostLabelData()}>完成</span>}
                >帖子标签选择</NavBar>
                
                <div style={{ backgroundColor: '#ffffff', height: 500 }}>
                <WingBlank size="sm">
                <strong style={{ fontSize: 20, marginTop: 5 }}>标签:</strong>
                <Select
                    mode="multiple"
                    value={this.state.postLabel}
                    style={{ width: '100%' }}
                    placeholder="帖子的标签"
                    onChange={this.handleSelectLabel}
                    allowClear
                >
                {
                    this.state.allLabel.map((item) => 
                        <Option key={item.labelId} value={item.flag}>
                            <Tag color={item.labelColor} key={item.labelId} > {item.labelName} </Tag>
                        </Option>
                    )
                }
                </Select>
                </WingBlank>
                </div>
            </div>
		);
	}
}