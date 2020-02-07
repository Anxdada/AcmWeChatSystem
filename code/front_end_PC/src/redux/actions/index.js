/**
 * Action 类型
 * 切换头部面包屑
 */
export const type = {
    SWITCH_MENU:'SWITCH_MENU',
    ADD_MENU: 'ADD_MENU'
}

export function switchMenu(menuName) {
    return {
        type: type.SWITCH_MENU,
        menuName
    }
}

export function addMenu(name) {
    return {
        type: type.ADD_MENU,
        name
    }
}

