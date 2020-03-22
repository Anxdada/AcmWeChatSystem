import React from 'react';
import { TabBar } from 'antd-mobile';
import { Icon, Input } from 'antd';
import MobileHomePage from './mobile/home';
import MobileUserInfo from './mobile/user/myIndex';
import MobilePostList from './mobile/forum/postList';
import './style/common.less';


export default class MobileTabBarBottom extends React.Component {

    // 默认的只能通过是否选中来改变, 对应的属性就是selected
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 3,
            fullScreen: true,
        };
    }

    componentWillMount() {
        this.setState({
            selectedTab: this.props.match.params.id,
        })
    }

    render() {
        return (
            <div style={this.state.fullScreen ? { position: 'fixed', height: '100%', width: '100%', top: 0 } : { height: 400 }}>
            <TabBar
                unselectedTintColor="#949494"
                tintColor="#33A3F4"
                barTintColor="#ffffff"
                tabBarPosition="bottom"
                prerenderingSiblingsNumber={0}
            >
            <TabBar.Item
                title="首页"
                key="home"
                icon={
                    <Icon type="home" style={{ fontSize: '23px' }}/>
                }
                selectedIcon={
                    <Icon type="home" style={{ fontSize: '23px', color: '#33A3F4'}} />
                }
                selected={this.state.selectedTab == 1}
                onPress={() => {
                    this.setState({
                        selectedTab: 1,
                    });
                }}
                data-seed="logId"
            >   
                <MobileHomePage />
            </TabBar.Item>
          
            <TabBar.Item
                title="讨论区"
                key="discuss"
                icon={
                    <Icon type="wechat" style={{ fontSize: '23px' }} />
                }
                selectedIcon={
                    <Icon type="wechat" style={{ fontSize: '23px', color: '#33A3F4', }} />
                }
                selected={this.state.selectedTab == 2}
                onPress={() => {
                    this.setState({
                        selectedTab: 2,
                    });
                }}
                data-seed="logId1"
            >
                <MobilePostList {...this.props}/>
            </TabBar.Item>

            <TabBar.Item
                title="我的"
                key="my"
                icon={
                    <Icon type="user" style={{ fontSize: '23px' }} />
                }
                selectedIcon={
                    <Icon type="user" style={{ fontSize: '23px', color: '#33A3F4', }} />
                }
                selected={this.state.selectedTab == 3}
                onPress={() => {
                    this.setState({
                        selectedTab: 3,
                    });
                }}
                dot
            >
                <MobileUserInfo {...this.props}/>
            </TabBar.Item>
            </TabBar>
            </div>
        );
    }
}