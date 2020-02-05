import React from 'react';
import './index.less';
import { Comment, Avatar, Form, Button, List, Input, Alert, Tooltip, Icon } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');
const { TextArea } = Input;

class FeedbackView extends React.Component {
    state = {
        comments: [],
        submitting: false,
        value: '',
        likes: 0,
        dislikes: 0,
        action: null,
    };

    like = () => {
        this.setState({
            likes: 1,
            dislikes: 0,
            action: 'liked',
        });
    };
    
    dislike = () => {
        this.setState({
            likes: 0,
            dislikes: 1,
            action: 'disliked',
        });
    };

    handleSubmit = () => {
        if (!this.state.value) {
            return;
        }

        this.setState({
            submitting: true,
        });

        const { likes, dislikes, action } = this.state;

        const actions = [
            <span key="comment-basic-like">
                <Tooltip title="Like">
                <Icon
                    type="like"
                    theme={action === 'liked' ? 'filled' : 'outlined'}
                    onClick={this.like}
                />
                </Tooltip>
                <span style={{ paddingLeft: 8, cursor: 'auto' }}>{likes}</span>
            </span>,
            <span key=' key="comment-basic-dislike"'>
                <Tooltip title="Dislike">
                <Icon
                    type="dislike"
                    theme={action === 'disliked' ? 'filled' : 'outlined'}
                    onClick={this.dislike}
                />
                </Tooltip>
                <span style={{ paddingLeft: 8, cursor: 'auto' }}>{dislikes}</span>
            </span>
        ];

        setTimeout(() => {
            this.setState({
            submitting: false,
            value: '',
            comments: [
                {
                    actions: {actions},
                    author: <Tooltip title='就不告诉你~'>
                                <span>匿名用户</span>
                            </Tooltip>,
                    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                    content: <p>{this.state.value}</p>,
                    datetime: <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                                <span>{moment().fromNow()}</span>
                            </Tooltip>,
                },
                ...this.state.comments,
            ],
            });
            }, 1000);
    };
    
    handleChange = e => {
        this.setState({
          value: e.target.value,
        });
    };
    
    render() {
        const { comments, submitting, value } = this.state;
        return (
            <div>
            <div>
            <Alert
                message="给出你最真实的反馈"
                description="可以是对系统的功能建议有或者是Bug反馈再或者是冒个泡也行~"
                type="info"
            />
            </div>
            <div className="commentArea">
                <div className="commentStyle">
                <Comment
                    avatar={
                        <Avatar
                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                        alt="Han Solo"
                        />
                    }
                    content={
                        <Editor
                            onChange={this.handleChange}
                            onSubmit={this.handleSubmit}
                            submitting={submitting}
                            value={value}
                        />
                    }
                />
                {comments.length > 0 && <CommentList comments={comments} />}
                </div>
            </div>
            </div>
        );
    }
}


const CommentList = ({ comments }) => (
    <List
        dataSource={comments}
        header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
        itemLayout="horizontal"
        renderItem={props => <Comment {...props} />}
    />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <div>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        Add Comment
      </Button>
    </Form.Item>
  </div>
);

export default class Feedback extends React.Component {
    render() {
        return (
            <div>
                <FeedbackView />
            </div>
        );
    }
}
