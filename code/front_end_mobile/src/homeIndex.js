import React from 'react';
import { Divider, Icon } from 'antd';

class Head extends React.Component {
    render() {
        return (
        <div>
            <div className="head">
            <Icon type="home" style={{ fontSize: '25px',color: 'black' }} />
                <Divider type="vertical" />
                <span className="headS">CUIT-ACM</span>
            </div>
        </div>
        );
    }
}
export default Head;