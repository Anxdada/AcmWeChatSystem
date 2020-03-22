import React from 'react';
import { Avatar, Icon, Divider, Modal, Input, Pagination } from 'antd';
import { NavBar, ActionSheet, Toast  } from 'antd-mobile';
import 'moment/locale/zh-cn';
import moment from 'moment';

moment.locale('zh-cn');

const { TextArea } = Input;

// const prompt = Modal.prompt;

class MobileReplyView extends React.Component{

    state = {
        avatar: 'http://localhost:9999/avatar/zhangwei.jpg',
        userName: '张伟要你',
        commentBody: '我要你在这寡淡的世上，深情地活',
        createTime: '2020-01-03 02:32:05',
        type: 0,
    }

    constructor(props) {
        super(props);
    }

    render() {
        // console.log(this.props.showActionSheet); () => 1111
        return(
            <div>
                <div style={{ padding: 10 }}>
                    <div>
                        <Avatar src={this.state.avatar} style={{ height: 25, width: 25}}/>
                        <a style={{ fontSize: 14, paddingLeft: 5 }}>{this.state.userName}</a>
                        <span style={{ color: '#B5B5B5', float: 'right' }}><Icon type="like" theme={this.state.type == 1 ? 'filled' : 'outlined'} /> 5</span>
                    </div>
                    <div style={{ paddingLeft: 30 }} onClick={this.props.showActionSheet}>
                        <div><span style={{ color: '#B5B5B5', fontSize: 12 }}>{this.state.createTime}</span></div>
                        <div>我热爱一切不彻底的事物，琥珀里的时间，微暗的火，一生都在半途而废，一生都怀抱热望</div>
                    </div>
                </div>
                <Divider style={{ marginTop: 0, marginBottom: 0}}/>
            </div>
        );
    }

}



class MobileReplyList extends React.Component{

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div style={{ marginTop: 5, backgroundColor: '#ffffff' }}>
                <div style={{ height: 30 }} >
                    <div style={{ padding: 5 }}>{5}条回帖</div>
                </div>
                <Divider style={{ marginTop: 0, marginBottom: 0}}/>
                <div>
                    <MobileReplyView showActionSheet={this.props.showActionSheet} />
                    <MobileReplyView showActionSheet={this.props.showActionSheet} />
                </div>
            </div>
        );
    }

}

export default class MobileDetailComment extends React.Component{

    state = {
        avatar: 'http://localhost:9999/avatar/dali.jpg',
        userName: '诸葛大力',
        commentBody: '热爱可抵岁月漫长',
        createTime: '2020-01-01 02:32:05',
        type: 1,
        visible: false,
        replyBody: '',
    }

    constructor(props) {
        super(props);
    }

    handleShowActionSheet = () => {
        let BUTTONS = ['回复', '举报', '取消'];   // ordinnary
        // BUTTONS = ['回复', '删除', '取消']; // my
        ActionSheet.showActionSheetWithOptions({
            options: BUTTONS,
            cancelButtonIndex: BUTTONS.length - 1,
            maskClosable: true,
        },
        (buttonIndex) => {
            if (buttonIndex == 0) {
                // prompt('defaultValue', '', [
                //     { text: '取消' },
                //     { text: '回复', onPress: value => console.log(`输入的内容:${value}`) },
                // ], 'default', '100')
                this.setState({
                    visible: true,
                });
            } else if (buttonIndex == 1) {
                this.props.history.push('/mobile/forum/report/'+2);
            }
        });
    }

    handleOk = () => {
        this.setState({
            visible: false,
        });
    };
    
    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };

    handleChangeTextArea = (e) => {
        this.setState({
            replyBody: e.target.value,
        })
    }

	render() {
		return(
            <div>
                <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={() =>  window.history.back()}
                    rightContent={<Icon key="1" type="ellipsis" style={{ fontSize: 25 }} onClick={this.handleShowActionSheet}/>}
                >回帖</NavBar>
                
                <div style={{ backgroundColor: '#ffffff', padding: 10 }} onClick={this.handleShowActionSheet}>
                    <div>
                        <Avatar src={this.state.avatar} style={{ height: 25, width: 25}}/>
                        <a style={{ paddingLeft: 5, fontSize: 14 }}>{this.state.userName}</a>
                    </div>
                    <div style={{ paddingLeft: 30 }}>愿所有的后会无期，都是他日的别来无恙</div>
                    <span style={{ paddingLeft: 30 }}>
                        <span style={{ color: '#B5B5B5', fontSize: 12 }}>{this.state.createTime}</span>
                        <span style={{ color: '#B5B5B5', float: 'right'}}><Icon type="like" theme={this.state.type == 1 ? 'filled' : 'outlined'} /> 5</span>
                    </span>
                </div>
                <MobileReplyList showActionSheet={this.handleShowActionSheet}/>
                <div className="postPagination" style={{ marginTop: 5}}>
                    <Pagination />
                </div>
                <Modal
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText="发送"
                    cancelText="取消"
                    okButtonProps={{ disabled: false }}
                    cancelButtonProps={{ disabled: false }}
                >
                    <TextArea autoSize allowClear style={{ width: 290 }} value={this.state.replyBody}
                        onChange={this.handleChangeTextArea}
                    />
                </Modal>
            </div>
		);
	}
}