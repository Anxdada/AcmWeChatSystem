import React from 'react';

export default class MobileUserMyOnDuty extends React.Component{

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
                >我的值日</NavBar>
                
                <div style={{ backgroundColor: '#fffff', padding: 10 }}>

                </div>
            </div>
		);
	}
}