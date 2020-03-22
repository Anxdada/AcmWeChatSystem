import React from 'react';
import { Avatar, Icon, Divider } from 'antd';
import { NavBar, List } from 'antd-mobile';


const Item = List.Item;

// 粉丝列表
export default class MobileFanUserList extends React.Component{

    // App就很做, web 感觉就很垃圾, 必须写两个页面... 也许是我菜, 不知道其他写法
    constructor(props) {
        super(props);
    }

	render() {
		return(
            <div>
                <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={() => window.location.href="/#/mobile/home/3"}
                >关注我的人({2})</NavBar>
                
                <div style={{ backgroundColor: '#fffff'}}>
                <List>
                    <Item onClick={() => {this.props.history.push('/mobile/user/otherUser/'+2)}}>
                        <Avatar src="http://localhost:9999/avatar/dali.jpg" style={{ width: 22, height: 22, marginRight: 5 }}/>
                        风居住的街道wind
                    </Item>
                    <Item onClick={() => {}}>
                        <Avatar src="http://localhost:9999/avatar/touxiang2.jpg" style={{ width: 22, height: 22, marginRight: 5 }}/>
                        Axxdada
                    </Item>
                </List>
                </div>

            </div>
		);
	}
}



// 用来展示关注的用户 或者 粉丝用户的列表