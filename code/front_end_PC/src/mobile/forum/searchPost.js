import React from 'react';
import { Icon } from 'antd';
import { SearchBar } from 'antd-mobile';

export default class MobileSearchPostPage extends React.Component {

    componentDidMount() {
        this.autoFocusInst.focus();
    }

    render() {
        return (
            <div>

                <SearchBar placeholder="搜索帖子" ref={ref => this.autoFocusInst = ref} 
                    onSubmit={this.handleOnSubmit} onChange={this.handleOnChnage} 
                    onCancel={() =>  window.location.href="/#/mobile/home/2"}
                />
            </div>
        );
    }
}