import React from 'react';
import './index.less';
import { Row, Col, message, Icon, Card } from 'antd';
import ReactHighcharts from 'react-highcharts';
import cookie from 'react-cookies';

class LineChart extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
        configUserRegister : {
            title: {
                text: '用户注册量'
            },

            yAxis: {
                title: {
                  text: '总数'
                }
            },
            credits:{
                enabled:false
            },
            xAxis:{
                categories:[2019, 2020]
            },
            series: [{
                name: '注册人数',
                data: [2, 8]
            }],
        },
        configUserActive : {
            title: {
                text: '用户活跃度'
            },

            yAxis: {
              title: {
                 text: '总数'
              }
            },
            credits:{
                enabled:false
            },
            xAxis:{
                categories:['2010','2011','2012','2013','2014','2015','2016','2017']
            },
            series: [{
                name: '活跃人数',
                data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
            }],
        }
        }
      
    }
    componentWillMount(){
      this.getData();
      this.getData2();
    }
    getData() {
    //   fetch(InvitationSumUrl, {
    //     method: 'POST',
    //     headers: {
    //       'Authorization': cookie.load('token'),
    //       'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    //     }
    //   }).then( res => res.json()).then(
    //     data => {
    //       var tmp = this.state.config;
    //       //alert(data.code);
    //       if (data.code==0) {
    //         //this.setState({series:this.series[0].data.add(data.resultBean)});
    //        // this.setState({series[0].data: data.resultBean})
    //        console.log(data.resultBean);
    //        tmp.xAxis.categories = data.resultBean.data;
    //        tmp.series[0].data = data.resultBean.sum;
    //        this.setState({config: tmp}, ()=>{console.log(this.state.config)});
    //        //return data.resultBean;
    //       } else {
    //         message.error(data.msg);
    //       }
    //     }
    //   )
    }
    getData2() {
    //   fetch(ProblemSumUrl, {
    //     method: 'POST',
    //     headers: {
    //       'Authorization': cookie.load('token'),
    //       'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    //     }
    //   }).then( res => res.json()).then(
    //     data => {
    //       var tmp = this.state.config1;
    //       //alert(data.code);
    //       if (data.code==0) {
    //         //this.setState({series:this.series[0].data.add(data.resultBean)});
    //        // this.setState({series[0].data: data.resultBean})
    //        console.log(data.resultBean);
    //        tmp.xAxis.categories = data.resultBean.data;
    //        tmp.series[0].data = data.resultBean.sum;
    //        this.setState({config1: tmp}, ()=>{console.log(this.state.config1)});
    //        //return data.resultBean;
    //       } else {
    //         message.error(data.msg);
    //       }
    //     }
    //   )
    }
    render() {
        return (
            <div style={{margin:'10px 0'}}>
                <Row gutter={16} >
                    <Col span={12} >
                      <ReactHighcharts config={this.state.configUserRegister} />
                    </Col>
                    <Col span={12} >
                      <ReactHighcharts config={this.state.configUserActive} />
                    </Col>
                </Row>
            </div>
        );
  }
}

class UserNumberStatistics extends React.Component{

    constructor(props) {
      super(props);
      this.state = {
        allUserNum: '',
        managerUserNum: '',
        unCheckUserNum: '',
        failUserNum: '',
      }
  
    }
    componentWillMount(){
        this.getData();
    }
    getData() {
      this.setState({
        allUserNum: 10,
        managerUserNum: 1,
        unCheckUserNum: 2,
        failUserNum: 0,
      })
    //   fetch(GetIndexInfoUrl, {
    //     method: 'POST',
    //     headers: {
    //       'Authorization': cookie.load('token'),
    //       'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    //     }
    //   }).then( res => res.json()).then(
    //     data => {
    //       if (data.code==0) {
    //         this.setState({allFriendNum: data.resultBean.allFriendNum});
    //         this.setState({nowDuty: data.resultBean.allUserNum});
    //         this.setState({allInvitationNum: data.resultBean.allInvitationNum});
    //         this.setState({allUserNum: data.resultBean.allPhotoNum});
  
    //       } else {
    //         message.error(data.msg);
    //       }
    //     }
    
    //   )
    }
    render() {
      return(
        <div>
          <Row gutter={16} className="first">
            <Col span={6}>
                <Card title={<span><Icon type="team" /><span>用户总数</span></span>}>
                  <p style={{fontSize:'25px'}}><strong>{this.state.allUserNum}</strong></p>
                </Card>
            </Col>
            <Col span={6}>
                <Card title={<span><Icon type="team" /><span>管理员个数</span></span>}>
                  <p style={{fontSize:'25px'}}><strong>{this.state.managerUserNum}</strong></p>
                </Card>
            </Col>
            <Col span={6}>
                <Card title={<span><Icon type="team" /><span>未审核个数</span></span>}>
                  <p style={{fontSize:'25px'}}><strong>{this.state.unCheckUserNum}</strong></p>
                </Card>
            </Col>
            <Col span={6} >
                <Card title={<span><Icon type="team" /><span>未通过个数</span></span>}>
                  <p style={{fontSize:'25px'}}><strong>{this.state.failUserNum}</strong></p>
                </Card>
            </Col>
          </Row>
        </div>
      );
    }
  }


export default class UserAnalysis extends React.Component {

    render() {
        return (
            <div>
                <UserNumberStatistics />
                <LineChart />
            </div>
        );
    }
}
