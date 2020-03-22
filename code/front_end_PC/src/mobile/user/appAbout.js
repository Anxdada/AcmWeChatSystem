import React from 'react';

export default class MobileUserAppAbout extends React.Component{

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
                >关于</NavBar>
                
                <div style={{ backgroundColor: '#fffff', padding: 10 }}>

                </div>
            </div>
		);
	}
}