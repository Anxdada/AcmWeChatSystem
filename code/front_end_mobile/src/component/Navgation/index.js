import React from 'react';
import { WingBlank, Grid } from 'antd-mobile';
import { Icon } from 'antd';
import { BrowserRouter as Link } from "react-router-dom";
import './index.less'




const data = [
    {
		icon: <Icon type="notification" style={{ fontSize: '25px',color: '#FF8C69', }} />,
  	    text: `公告`,
  	    href:'#'
    },
    {
		icon: <Icon type="desktop" style={{ fontSize: '25px',color: '#00BFFF', }} />,
  	    text: `新闻`,
  	    href:'#'
    },
    {
		icon: <Icon type="link"  style={{ fontSize: '25px',color: '#FF69B4', }}/>,
  	    text: `友链`,
  	    href:'#'
    },
    {
		icon: <Icon type="schedule" style={{ fontSize: '25px',color: '#FFA54F', }}/>,
  	    text: `值班表`,
  	    href:'#'
	},
];

const data1 = Array.from(new Array(9)).map(() => ({
  icon: 'https://gw.alipayobjects.com/zos/rmsportal/WXoqXTHrSnRcUwEaQgXJ.png',
}));


const GridExample = () => (
  <div>
    <div className="sub-title"> 去往 </div>
    <Grid data={data} activeStyle={false} />

    <div className="sub-title">Grid item adjust accroiding to img size </div>
    <Grid data={data} square={false} className="not-square-grid" />

    <div className="sub-title">ColumnNum=3 </div>
    <Grid data={data} columnNum={3} />

    <div className="sub-title">No border</div>
    <Grid data={data} hasLine={false} />

    <div className="sub-title">Carousel</div>
    <Grid data={data} isCarousel onClick={_el => console.log(_el)} />

    <div className="sub-title">Custom content</div>
    <Grid data={data1}
      columnNum={3}
      renderItem={dataItem => (
        <div style={{ padding: '12.5px' }}>
          <img src={dataItem.icon} style={{ width: '75px', height: '75px' }} alt="" />
          <div style={{ color: '#888', fontSize: '14px', marginTop: '12px' }}>
            <span>I am title..</span>
          </div>
        </div>
      )}
    />
    <div className="sub-title">Custom GridCell Style</div>
    <Grid data={data1} columnNum={3} itemStyle={{ height: '150px', background: 'rgba(0,0,0,.05)' }} />
  </div>
);

export default class NavgationBar extends React.Component {
    render() {
        return (
            <WingBlank size="md">
            <div className="content">
                <div className="sub-title"> 去往 </div>
                <Grid data={data}
                    renderItem={dataItem => (
                        <Link to = {dataItem.href} >
                        <div style={{ padding: '15px' }} >
                            { dataItem.icon }
                            <div style={{ color: '#888', fontSize: '14px', marginTop: '12px' }}>
                                <span>{ dataItem.text }</span>
                            </div>
                        </div>
                        </Link>
                    )}
                />
            </div>
            </WingBlank>
        );
    }
}