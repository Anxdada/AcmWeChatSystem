import React from 'react';
import { Card, Tabs, message, Icon } from 'antd';

import './ui.less';
const TabPane = Tabs.TabPane;

export default class myTabs extends React.Component {

    newTabIndex = 0;

    handleCallback = (key) => {
        // console.log();
        message.info("Hello, you choose the tab " + key);
    }

    componentWillMount() {
        const tabs = [
            {
                title: 'Tab 1',
                content: 'Tab 1',
                key: '1'
            },
            {
                title: 'Tab 2',
                content: 'Tab 2',
                key: '2'
            },
            {
                title: 'Tab 3',
                content: 'Tab 3',
                key: '3'
            },
        ]

        this.setState({
            activeKey: tabs[0].key,
            panes: tabs,
        })
    }

    onChange = (activeKey) => {
        this.setState({
            activeKey
        })
    }

    onEdit = (targetKey, action) => {
        this[action](targetKey);
    };

    add = () => {
        const { panes } = this.state;
        const activeKey = `newTab${this.newTabIndex++}`;
        panes.push({ title: activeKey, content: 'New Tab Pane', key: activeKey });
        this.setState({ panes, activeKey });
    };
    
    remove = (targetKey) => {
        let { activeKey } = this.state;
        let lastIndex; 
        this.state.panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1; 
            }
        });
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        if (panes.length && activeKey === targetKey) {
            if (lastIndex >= 0) {
                activeKey = panes[lastIndex].key;
            } else {
                activeKey = panes[0].key;
            }
        }
        this.setState({ panes, activeKey });
    };

    render() {
        const iconTabPane = <span><Icon type="plus" />加号</span>;
        return (
            <div>
                <Card title="tabs页签" className="Card">
                    <Tabs defaultActiveKey="1" onChange={this.handleCallback}>
                        <TabPane tab={iconTabPane} key="1">
                        Content of Tab Pane 1
                        </TabPane>
                        <TabPane tab="Tab 2" key="2">
                        Content of Tab Pane 2
                        </TabPane>
                        <TabPane tab="Tab 3" key="3">
                        Content of Tab Pane 3
                        </TabPane>
                    </Tabs>
                </Card>
                <Card title="tabs编辑页" className="Card">
                    <Tabs 
                        onChange={this.onChange}
                        activeKey={this.state.activeKey}
                        type="editable-card"
                        onEdit={this.onEdit}
                    >
                        {
                            this.state.panes.map((panel) => {
                                return <TabPane tab={panel.title} key={panel.key}></TabPane>
                            })
                        }
                    </Tabs>
                </Card>
            </div>
        );
    }
}