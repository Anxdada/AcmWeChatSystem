import React from 'react';
import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';

export default class NoMatch extends React.Component {
    render() {
        return (
            {/* <div style={{ textAlign: 'center', fontSize: '24'}}> 
                404 not Found!!! 
            </div> */},
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={<Link to="/mobile/home"><Button type="primary">Back Home</Button></Link>}
            />
        );
    }
}