import React from 'react';
import { Result, Icon, NavBar } from 'antd-mobile';

export default class MobilePublishPostResult extends React.Component{

    constructor(props) {
        super(props);
    }

	render() {
        // 后面好好查一下什么时候有, 什么时候没有
        // console.log(this.props.history);
		return(
            <div>
                <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={() =>  window.history.back(-1)}
                >发帖结果</NavBar>
                
                <Result
                    img={<Icon type="check-circle" className="spe" style={{ fill: '#1F90E6', width: 60, height: 60 }} />}
                    title="发帖成功"
                    message={<span>点击<a onClick={() => this.props.history.push('/mobile/forum/postLabel')}>此处</a>为你的帖子贴上一些标签吧</span>}
                />

            </div>
		);
	}
}