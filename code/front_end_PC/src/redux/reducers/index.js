/**
 * Reducer 数据处理
 */
import { type } from './../actions'
const initialState = {
    menuName: [
        { title: '首页', key: '/admin/home' }
    ],
    testArr: [],
}

export default (state = initialState, action)=>{
    console.log(state.menuName);
    console.log(action.name);
    switch (action.type) {
        case type.SWITCH_MENU:
            return {
                menuName: action.menuName
            }
        case type.ADD_MENU:
            return {
                ...state, testArr: state.menuName.push(action.name),
            }
        default:
            return {
                ...state
            };
    }
}