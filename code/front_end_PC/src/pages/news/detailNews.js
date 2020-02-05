import React from 'react';
import { Card } from 'antd';

export default class DetailNews extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            NewsTitle: '',
            NewsBody: '',
        }
    }

    componentWillMount() {
        this.getData();
    }

    getData() {
        this.setState({
            NewsTitle: '我校首获ICPC金牌',
            NewsBody: '未了控股空间的巴萨咖啡酒吧开始的减肥包括节哀顺变就开始打',
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
            <Card title={this.state.NewsTitle}>
                <p> {this.state.NewsBody } </p>
            </Card>
        );
    }
}