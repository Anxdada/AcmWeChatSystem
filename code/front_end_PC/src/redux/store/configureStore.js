/**引入createStore创建Store */
import { createStore, compose } from 'redux';
import reducer from './../reducers';
 
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers());
 
export default store;
// 后面那个参数是配置调试工具, 方便查看redux中的状态如何变化