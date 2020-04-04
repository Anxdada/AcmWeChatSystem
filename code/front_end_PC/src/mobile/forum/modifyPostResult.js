import React from 'react';
import { Result, Icon, NavBar } from 'antd-mobile';

export default class MobileModifyPostResult extends React.Component{

    constructor(props) {
        super(props);
    }

	render() {
		return(
            <div>
                <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={() =>  window.history.back(-1)}
                >修改结果</NavBar>
                
                <Result
                    img={<Icon type="check-circle" className="spe" style={{ fill: '#1F90E6', width: 60, height: 60 }} />}
                    title="修改成功"
                    message={
                        <span>
                            点击<a onClick={() => this.props.history.push('/mobile/forum/postLabel/'+this.props.match.params.id) }>此处</a>可再修改你的帖子标签<br />    
                            或者直接<a onClick={() => this.props.history.push('/mobile/forum/detail/'+this.props.match.params.id) } >查看</a>你修改后的帖子
                        </span>
                    }
                />

            </div>
		);
	}
}