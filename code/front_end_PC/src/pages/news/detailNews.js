import React from 'react';
import { Card, DatePicker } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { connect } from 'react-redux';
import { switchMenu, addMenu } from './../../redux/actions'; 

moment.locale('zh-cn');

class DetailNews extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            createName: '',
            createTime: '',
            newsTitle: '',
            newsBody: '',
        }
    }

    componentDidMount() {
        const { dispatch } = this.props;
        const titleArray = [
            {
                title: '新闻',
                key: 'none',
            },
            {
                title: '管理新闻',
                key: '/admin/news/manage',
            },
            {
                title: '查看新闻详情',
                key: 'none',
            }
        ];
        dispatch(switchMenu(titleArray));
    }

    componentWillMount() {
        this.getData();
    }

    getData() {
        this.setState({
            createName: '超级管理员',
            createTime: moment(),
            newsTitle: '我校首获ICPC金牌',
            newsBody: '未了控股空间的巴萨咖啡酒吧开始的减肥包括节哀顺变就开始打',
        })
        // fetch(LectureDetailUrl, {
        //     method: 'POST',
        //     headers: {
        //         'Authorization': cookie.load('token'),
        //         'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
        //     },
        //     body: 'lectureId='+this.props.match.params.id
        // }).then( res => res.json()).then(
        //     data => {
        //     //console.log('token'+cookie.load('token'));
        //    // window.alert(data);
        //    // window.alert(data.code);
        //     if (data.code==0) {
        //         this.setState({title: data.resultBean.lectureTitle});
        //         this.setState({editorContent: this.state.editor.txt.html(data.resultBean.lectureBody)});
        //         this.setState({createDate: data.resultBean.createDate});
        //     } else {
        //         message.error(data.msg)
        //     }
        //   }
      
        // )
      }

    render() {
        return (
            <Card title={this.state.newsTitle}>
                <strong>创建人:&nbsp;&nbsp;{this.state.createName}</strong>
                <br />
                <strong>创建时间:</strong>&nbsp;&nbsp;
                <DatePicker format="YYYY-MM-DD" defaultValue={this.state.createTime} disabled />
                <br /><br />
                <strong>内容:</strong>
                <p> {this.state.newsBody } </p>
            </Card>
        );
    }
}

export default connect()(DetailNews);