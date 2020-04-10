import React from 'react';
import { NavBar } from 'antd-mobile';
import { Icon, Typography } from 'antd';

const { Title, Paragraph, Text } = Typography;

export default class MobileAboutUsAndApp extends React.Component{

    constructor(props) {
        super(props);
    }

	render() {
		return(
            <div>
                <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={() =>  window.history.back()}
                >关于</NavBar>
                
                <div style={{ backgroundColor: '#ffffff', padding: 10 }}>
                <Paragraph>
                    本公众号为校ACM团队所有, 主要用来更好的管理ACM团队的一些事务
                </Paragraph>
                <Paragraph>
                 同时也提供一个平台给广大想要参加ACM的新生或者是感兴趣的同学们
                    一个交流的平台. 同时希望大家可以一起维护好该公众号的风气, 做好自己的本分事情
                </Paragraph>
                <Text delete>ACM很好玩的, 大家快来参加~</Text>
                <Paragraph copyable>1349616759</Paragraph>
                </div>
            </div>
		);
	}
}