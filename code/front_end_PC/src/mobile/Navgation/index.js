import React from 'react';
import { WingBlank, Grid } from 'antd-mobile';
import { Icon } from 'antd';
import { Link } from 'react-router-dom';
import './index.less';



const data = [
    {
		icon: <Icon type="notification" style={{ fontSize: '25px',color: '#FF8C69', }} />,
  	    text: `公告`,
  	    href:'/mobile/announcement/showallannouncement'
    },
    {
		icon: <Icon type="desktop" style={{ fontSize: '25px',color: '#00BFFF', }} />,
  	    text: `新闻`,
  	    href:'/mobile/news/showallnews'
    },
    {
		icon: <Icon type="link"  style={{ fontSize: '25px',color: '#FF69B4', }}/>,
  	    text: `友链`,
  	    href:'/mobile/friendurl'
    },
    {
		icon: <Icon type="schedule" style={{ fontSize: '25px',color: '/mobile/newsFFA54F', }}/>,
  	    text: `值班表`,
  	    href:'/mobile/onduty/showallonduty'
	},
];


export default class MobileNavgationBar extends React.Component {
    render() {
        return (
            <div className="content">
                <div className="sub-title">去往 > </div>
                <Grid 
                    data = {data}
                    renderItem={(dataItem) => (
                        <Link to = {dataItem.href} >
                        <div>
                            { dataItem.icon }
                            <div style={{ color: '#888', fontSize: '14px', marginTop: '12px' }}>
                                <span>{ dataItem.text }</span>
                            </div>
                        </div>
                        </Link>
                    )}
                />
            </div>
        );
    }
}