import React from 'react';
import { Card, DatePicker } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { connect } from 'react-redux';
import { switchMenu,addMenu } from './../../redux/actions';

moment.locale('zh-cn');

class DetailPost extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            createName: '',
            createTime: '',
            newsTitle: '',
            newsBody: '',
        }
    }

    componentWillMount() {
        this.getData();
    }

    getData() {
        this.setState({
            createName: '超级管理员',
            createTime: moment(),
            newsTitle: 'HDU 2018',
            newsBody: '求第10000000000 个斐波那契数是多少 (%1e9+7) 输出答案',
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

    componentDidMount() {
        const { dispatch } = this.props;
        const titleArray = [
            {
                title: '讨论区管理',
                key: 'none',
            },
            {
                title: '管理帖子',
                key: '/admin/forum/manage',
            },
            {
                title: '查看帖子详情',
                key: 'none',
            }
        ];
        dispatch(switchMenu(titleArray));
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

// 通过connect连接组件和redux数据,传递state数据和dispatch方法
export default connect()(DetailPost);