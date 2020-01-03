import React from 'react';
import { TabBar } from 'antd-mobile';
import { Icon } from 'antd';
import Home from './../../pages/Home';
import Platform from './../../pages/Forum';
import UserRelative from './../../pages/User';
import './index.less';

export default class TabBarBottom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        selectedTab: 'FirstTab',
        fullScreen: true,
        hidden: false,
    };
  }

  renderContent(pageText) {
    return (
      <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
        <div style={{ paddingTop: 60 }}>Clicked “{pageText}” tab， show “{pageText}” information</div>
        <a style={{ display: 'block', marginTop: 40, marginBottom: 20, color: '#108ee9' }}
          onClick={(e) => {
            e.preventDefault();
            this.setState({
              hidden: !this.state.hidden,
            });
          }}
        >
          Click to show/hide tab-bar
        </a>
        <a style={{ display: 'block', marginBottom: 600, color: '#108ee9' }}
          onClick={(e) => {
            e.preventDefault();
            this.setState({
              fullScreen: !this.state.fullScreen,
            });
          }}
        >
          Click to switch fullscreen
        </a>
      </div>
    );
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
                selected={this.state.selectedTab === 'FirstTab'}
                onPress={() => {
                    this.setState({
                        selectedTab: 'FirstTab',
                    });
                }}
                data-seed="logId"
            >
            <Home />
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
                selected={this.state.selectedTab === 'SecondTab'}
                onPress={() => {
                    this.setState({
                        selectedTab: 'SecondTab',
                    });
                }}
                data-seed="logId1"
            >
            <Platform />
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
                selected={this.state.selectedTab === 'ThirdTab'}
                onPress={() => {
                    this.setState({
                        selectedTab: 'ThirdTab',
                    });
                }}
                dot
            >
            <UserRelative />
            </TabBar.Item>
        </TabBar>
        </div>
    );
  }
}