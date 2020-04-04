import React from 'react';
import { message, notification } from 'antd';
import { Result, Icon, NavBar } from 'antd-mobile';
import { GetLastPublishPostId } from '../../config/dataAddress';
import Fetch from '../../fetch';

export default class MobilePublishPostResult extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            lastPostId: 1,
        }
    }

    componentWillMount() {
        Fetch.requestGet({
            url: GetLastPublishPostId,
            timeOut: 3000,
        }).then ( 
            data => {
                // console.log(data);
                if (data.status == 0) {
                    this.setState({
                        lastPostId: data.resultBean,
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
        // 后面好好查一下什么时候有, 什么时候没有
        // console.log(this.state.lastPostId);
		return(
            <div>
                <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={() => window.location.href="/#/mobile/home/2"}
                >发帖结果</NavBar>
                
                <Result
                    img={<Icon type="check-circle" className="spe" style={{ fill: '#1F90E6', width: 60, height: 60 }} />}
                    title="发帖成功"
                    message={
                        <span>
                            点击<a onClick={() => this.props.history.push('/mobile/forum/postLabel/'+this.state.lastPostId)}>此处</a>为你的帖子贴上一些标签吧<br />    
                            或者<a onClick={() => this.props.history.push('/mobile/forum/detail/'+this.state.lastPostId) } >查看</a>你发布的帖子
                        </span>
                    }
                />

            </div>
		);
	}
}