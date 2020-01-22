import React from 'react';
import { Carousel, Card } from 'antd';

import './ui.less';

export default class Carousels extends React.Component {

    render() {
        return (
            <div>
                <Card title="文字背景" className="Card">
                    <Carousel autoplay={true}>
                        <div>
                            <h3>1</h3>
                        </div>
                        <div>
                            <h3>2</h3>
                        </div>
                        <div>
                            <h3>3</h3>
                        </div>
                        <div>
                            <h3>4</h3>
                        </div>
                    </Carousel>
                </Card>
                <Card title="图片背景" className="Card">
                    <Carousel autoplay={true}>
                    <img src="/images/acm.jpg" alt="logo" />
                    <img src="/images/family.jpg" alt="合照" />
                    <img scr="/images/carousel-1.jpg" alt="1"/>
                    <img scr="/carousel-img/carousel-2.jpg" alt="2"/>
                    <img scr="/carousel-img/carousel-3.jpg" alt="3"/>
                </Carousel>
                </Card>
            </div>
        );
    }
}