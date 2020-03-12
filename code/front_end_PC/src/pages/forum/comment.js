class SubCommentList extends React.Component {

    state = {
        visible: true,
    }

    render() {
        return (
            <List
                className="replyList"
                itemLayout="vertical"
                size="small"
                pagination={false}
                dataSource={testList}
                renderItem={item => (
                    <span>
                    <List.Item
                        className="meta"
                        key={item.title}
                        actions={[
                            <IconText type="like-o" text="156" key="list-vertical-like-o" />,
                            <IconText type="message" text="回复" key="list-vertical-message" />,
                        ]}
                    >
                        <List.Item.Meta
                            avatar={<Avatar src={item.avatar} />}
                            title={<a href={item.href}>{item.title}</a>}
                            description={item.description}
                        />
                        {item.content}
                        
                    </List.Item>
                    {
                            this.state.visible == false ? null :
                            <TextArea rows={1} onChange={this.CommentBodyChange} value={this.state.commentBody} />
                    }
                    </span>
                )}
            />
        );
    }
}

class CommentList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            submitting: '',
            feedbackBody: '',
        }
    }

    handleReply = () => {
        console.log('回复')
    }

    render() {
        const {submitting, feedbackBody } = this.state;
        return (
            <div className="commentArea">
            <Comment    
                className="addComment"
                avatar={
                    <Avatar
                        src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
                        alt="Han Solo"
                    />
                }
                content={
                    <Editor
                        onChange={this.handleEditChange}
                        onSubmit={this.handleSubmitFeedback}
                        submitting={submitting}
                        value={feedbackBody}
                    />
                }
            />
            <List
                className="comment-list"
                itemLayout="vertical"
                size="large"
                header={`全部评论 ${listData.length+testList.length}`}
                pagination={false}
                dataSource={listData}
                renderItem={item => (
                    <div>
                    <List.Item
                        className="meta"
                        key={item.title}
                        actions={[
                            <IconText type="like-o" text="233" key="list-vertical-like-o" handleReply={this.handleReply} />,
                            <IconText type="message" text="2" key="list-vertical-message" handleReply={this.handleReply} />,
                        ]}
                    >
                        <List.Item.Meta
                            avatar={<Avatar src={item.avatar} />}
                            title={<a href={item.href}>{item.title}</a>}
                            description={item.description}
                        />
                        {item.content}
                    </List.Item>
                    <SubCommentList />
                    <p className="addReply">添加新回复</p>
                    </div>
                )}
            />
            <div className="tablePage">
                <Pagination size="small" simple onChange={this.handlePageChange} total={23}
                    pageSize={10} defaultCurrent={1} showQuickJumper />
            </div>
            </div>
        );
    }
}

// 下面是react 通过context 跨级传递数据的演示
// 亲测有效
//App.js
import React from 'react';
import Son from './son';//引入子组件
// 创建一个 theme Context,
export const {Provider,Consumer} = React.createContext("默认名称");
export default class App extends React.Component {
    render() {
        let name ="小人头"
        return (
            //Provider共享容器 接收一个name属性
            <Provider value={name}>
                <div style={{border:'1px solid red',width:'30%',margin:'50px auto',textAlign:'center'}}>
                    <p>父组件定义的值:{name}</p>
                    <Son />
                </div>
            </Provider>
        );
    }
}

//son.js 子类
import React from 'react';
import { Consumer } from "./index";//引入父组件的Consumer容器
import Grandson from "./grandson.js";//引入子组件
function Son(props) {
    return (
        //Consumer容器,可以拿到上文传递下来的name属性,并可以展示对应的值
        // 执行的一个回调函数.. 不然拿不到值
        <Consumer>
            {( name ) =>
                <div style={{ border: '1px solid blue', width: '60%', margin: '20px auto', textAlign: 'center' }}>
                    <p>子组件。获取父组件的值:{name}</p>
                    {/* 孙组件内容 */}
                    <Grandson />
               </div>
            }
        </Consumer>
    );
}
export default Son;

//grandson.js 孙类
import React from 'react';
import { Consumer } from "./index";//引入父组件的Consumer容器
function Grandson(props) {
    return (
         //Consumer容器,可以拿到上文传递下来的name属性,并可以展示对应的值
        <Consumer>
            {(name ) =>
                   <div style={{border:'1px solid green',width:'60%',margin:'50px auto',textAlign:'center'}}>
                   <p>孙组件。获取传递下来的值:{name}</p>
               </div>
            }
        </Consumer>
    );
}
export default Grandson;

// 第一步：创建需要共享的context
const ThemeContext = React.createContext('light');

class App extends React.Component {
    render() {
        // 第二步：使用 Provider 提供 ThemeContext 的值，Provider所包含的子树都可以直接访问ThemeContext的值
        return (
            <ThemeContext.Provider value="dark">
                <Toolbar />
            </ThemeContext.Provider>
        );
    }
}
// Toolbar 组件并不需要透传 ThemeContext
function Toolbar(props) {
    return (
        <div>
            <ThemedButton />
        </div>
    );
}

function ThemedButton(props) {
    // 第三步：使用共享 Context
    const theme = useContext(ThemeContext);
    return (
        <div>
            <Button theme={theme} />;
        </div>
      );
}
//关于Context还有一个比较重要的点是：当Context Provider的value发生变化是，他的所有子级消费者都会rerender。