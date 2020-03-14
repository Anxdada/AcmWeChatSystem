import React from 'react';
import { Input, Result } from 'antd';
import { Button, Icon, WhiteSpace } from 'antd-mobile';
import { Link } from 'react-router-dom';
import './index.less';


export default class NoMatch extends React.Component {
    render() {
        return (
            <div>
                <Result
                    status="404"
                    title="404"
                    subTitle="Sorry, the page you visited does not exist."
                    extra={<Link to="/mobile/home"><Button type="primary">Back Home</Button></Link>}
                />
            </div>
        );
    }
}

const myImg = src => <img src={src} className="spe am-icon am-icon-md" alt="" />;
