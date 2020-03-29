import React from 'react';
import { Icon } from 'antd';
import { NavBar, Toast } from 'antd-mobile';

export default class MobileAddLabelForPostPage extends React.Component{

    constructor(props) {
        super(props);
    }

    handleAddLabel = () => {
        // console.log(this.props.history);
        // this.props.history.push();
        Toast.success('贴标签成功', 1);
        this.props.history.push('/mobile/home/2');
    }

	render() {
        console.log(this.props.history);
		return(
            <div>
                <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={() =>  window.history.back(-1)}
                    rightContent={<span onClick={this.handleAddLabel}>完成</span>}
                >帖子标签选择</NavBar>
                
                <div style={{ backgroundColor: '#fffff'}}>

                </div>

            </div>
		);
	}
}