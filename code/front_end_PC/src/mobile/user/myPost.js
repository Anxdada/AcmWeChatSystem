import React from 'react';

export default class MobileUserMyPost extends React.Component{

    constructor(props) {
        super(props);
    }

	render() {
		return(
            <div>
                <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={() =>  window.location.href="/#/mobile/home/3"}
                >我的帖子</NavBar>
                
                <div style={{ backgroundColor: '#fffff', padding: 10 }}>

                </div>
            </div>
		);
	}
}