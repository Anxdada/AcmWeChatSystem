import React from 'react'
import { Menu, Icon, Mention } from 'antd';
import './index.less'
import MenuConfig from './../../config/menuConfig'
import menuListAcm from './../../config/menuConfigAcm'
import { NavLink } from 'react-router-dom';
// 遍历数组生成左侧导航, 因为后面权限设置也必须这样, 写死很傻
const { SubMenu } = Menu;


export default class NavLeft extends React.Component {

    componentWillMount() {
        const menuTreeNode = this.renderMenu(menuListAcm);

        this.setState({
            menuTreeNode,
        });
    }

    // 菜单渲染
    renderMenu = (data) => {
        return data.map((item) => {
            if (item.children) {
                return (
                    <SubMenu title={item.title} key={item.key} icon="step-forward">
                        { this.renderMenu(item.children) }
                    </SubMenu>
                )
            }
            return <Menu.Item title={item.title} key={item.key}>
                <NavLink to={item.key}>{item.title}</NavLink>
            </Menu.Item>
        })
    }

    render() {
        return (
            <div>
                <div className="logo">
                    <img src="/assets/logo-ant.svg" alt="" />
                    <h1>CUIT-ACM BEMS</h1>
                </div>
                <Menu theme="light">
                    { this.state.menuTreeNode }
                </Menu>
            </div>
        );
    }
}



