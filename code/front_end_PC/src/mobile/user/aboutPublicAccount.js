import React from 'react';

export default class MobileAppAboutPublicAccount extends React.Component{

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
                >关于该公众号</NavBar>
                
                <div style={{ backgroundColor: '#fffff', padding: 10 }}>
                    
                </div>
            </div>
		);
	}
}