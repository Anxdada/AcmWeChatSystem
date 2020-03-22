import React from 'react';

export default class MobileAppAboutUs extends React.Component{

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
                >关于我们</NavBar>
                
                <div style={{ backgroundColor: '#fffff', padding: 10 }}>

                </div>
            </div>
		);
	}
}