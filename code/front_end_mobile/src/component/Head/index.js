import React from 'react';
import { Carousel, WingBlank } from 'antd-mobile';
import './index.less'

export default class MyCarousel extends React.Component {
    state = {
        data: ['1', '2', '3'],
        imgHeight: 176,
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({
                data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
            });
        }, 100);
    }
    render() {
        return (
            <div className="content">
            <WingBlank>
                <Carousel
                    autoplay={true}
                    infinite={false}
                    autoplayInterval="3000"
                >
                    <img
                        /* src={require('./resource/image/acm.jpg')} */
                        src="/images/acm.jpg" 
                        alt="logo"
                        style={{ width: '100%', verticalAlign: 'top' }}
                        onLoad={() => {
                            // fire window resize event to change height
                            window.dispatchEvent(new Event('resize'));
                            this.setState({ imgHeight: 'auto' });
                        }}
                    />
                    <img
                        /* src={require('./resource/image/acm.jpg')} */
                        src="/images/family.jpg" 
                        alt="logo"
                        style={{ width: '100%', verticalAlign: 'top' }}
                        onLoad={() => {
                            // fire window resize event to change height
                            window.dispatchEvent(new Event('resize'));
                            this.setState({ imgHeight: 'auto' });
                        }}
                    />
                    <img
                        /* src={require('./resource/image/acm.jpg')} */
                        src="/images/23.png" 
                        alt="logo"
                        style={{ width: '100%', verticalAlign: 'top' }}
                        onLoad={() => {
                            // fire window resize event to change height
                            window.dispatchEvent(new Event('resize'));
                            this.setState({ imgHeight: 'auto' });
                        }}
                    />
                </Carousel>
            </WingBlank>
            </div>
        );
    }
}