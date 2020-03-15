import React from 'react';
import './index.less';
import { Typography, Icon, Divider, } from 'antd';
import { Pagination, WingBlank, NavBar, WhiteSpace, Button } from 'antd-mobile';
import Fetch from './../../fetch';
import { SelectAnnouncement, SelectAnnouncementTag } from './../../config/dataAddress';

const { Title, Paragraph, Text } = Typography;

class ShowNeedToDo extends React.Component {

    render() {
        return (
            <div>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() =>  window.history.back(-1)}
                >
                    值班必看事项
                </NavBar>
                <Divider style={{ margin: 0}} />
                <WingBlank size="sm">
                    <span style={{fontSize: 5, color: '#B5B5B5' }}>首页 > 值班表 > 值班必看事项 </span><br />
                    <WhiteSpace size="sm" />
                    <div className="tableBackground">
                        <div style={{ padding: 10 }}>
                            <Text strong>1. 负责实验室的卫生</Text><br />
                            <Text strong>2. 负责给有需求要的人开实验室门</Text><br />
                            <Text strong>3. 将实验室钥匙给下一个值班人员</Text><br />
                            <Text strong>4. 有什么其他补充请联系@学生教练</Text><br />
                            <Text delete>5. 测试删除线</Text><br />
                        </div>
                        <br /><br />
                    </div>
                </WingBlank>
            </div>
        );
    }
}


export default class MobileNeedToDo extends React.Component {

    render() {
        return (
            <div>
                <ShowNeedToDo />
            </div>
        );
    }
}