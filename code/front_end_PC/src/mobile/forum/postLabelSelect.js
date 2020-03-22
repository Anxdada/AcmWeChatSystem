import React from 'react';
import { Icon } from 'antd';
import { NavBar } from 'antd-mobile';

export default class MobilePostLabelSelectPage extends React.Component{

    constructor(props) {
        super(props);
    }

    handlePublishPost = () => {
        // console.log(this.props.history);
        // this.props.history.push();
    }

	render() {
		return(
            <div>
                <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={() =>  window.history.back(-1)}
                    rightContent={<span onClick={this.handlePublishPost}>发布</span>}
                >帖子标签选择</NavBar>
                
                <div style={{ backgroundColor: '#fffff'}}>

                </div>

            </div>
		);
	}
}