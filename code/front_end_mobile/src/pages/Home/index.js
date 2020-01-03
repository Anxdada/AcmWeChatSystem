import React from 'react';
import MyCarousel from './../../component/Head'
import NavgationBar from './../../component/Navgation'
import MiddleCard from './../../component/Middle'

export default class Home extends React.Component{
    render() {
        return (
            <div>
                <MyCarousel />
                <NavgationBar />
                <MiddleCard />
            </div>
        );
    }
}