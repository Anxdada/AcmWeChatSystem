import React, { useContext } from 'react';
import { Button } from 'antd';

const ThemeContext = React.createContext('light');

export default class Ttest extends React.Component {
    render() {
        // 第二步：使用 Provider 提供 ThemeContext 的值，Provider所包含的子树都可以直接访问ThemeContext的值
        return (
            <div>
                <ThemeContext.Provider value="dark">
                    <Toolbar />
                </ThemeContext.Provider>
            </div>
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

class ThemedButton extends React.Component {

    constructor(props) {
        super(props);
        // const theme = useContext(ThemeContext);
    }

    // 第三步：使用共享 Context
    render() {
        return (
            <div>
                <p>{111}</p>
            </div>
        );
    }
}