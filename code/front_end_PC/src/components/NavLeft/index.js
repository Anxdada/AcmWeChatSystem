import React from 'react'
import { Menu, Icon, Mention } from 'antd';
import './index.less'
import MenuConfig from './../../config/menuConfig'
import menuListAcm from './../../config/menuConfigAcm'
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { switchMenu } from './../../redux/actions';


// 遍历数组生成左侧导航, 因为后面权限设置也必须这样, 写死很傻
const { SubMenu } = Menu;


class NavLeft extends React.Component {

    state = {
        currentKey:''
    }

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

    // 导出出面包屑数组
    handleMenuClick = ({ item, key }) => {
        console.log(item);
        console.log(key);
        const currentKey = '/' + key.split('/')[1] + '/' + key.split('/')[2];
        console.log(key.split('/'));
        console.log(currentKey);
        const { dispatch } = this.props;
        const titleArray = [];
        menuListAcm.forEach((data) => {
            if (data.key === currentKey) {
                titleArray.push({
                    title: data.title,
                    key: "none",
                });
            }
            if (data.children) {
                data.children.forEach((sdata) => {
                    if (sdata.key === key) {
                        titleArray.push({
                            title: sdata.title,
                            key: sdata.key,
                        });
                    }
                });
            }
        });
        dispatch(switchMenu(titleArray));
        this.setState({
            currentKey: key
        })
    }

    render() {
        return (
            <div>
                <div className="logo">
                    <img src="/assets/logo-ant.svg" alt="" />
                    <h1>CUIT-ACM BEMS</h1>
                </div>
                <Menu theme="light" onClick={this.handleMenuClick} ket={this.state.currentKey} >
                    { this.state.menuTreeNode }
                </Menu>
            </div>
        );
    }
}

// export default connect()(NavLeft);
export default NavLeft;

