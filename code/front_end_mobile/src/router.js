import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import NoMatch from './pages/nomatch';

import App from './App';
import MobileTabBarBottom from './mobile';

export default class MobileRouter extends React.Component {
    render() {
        return (
            <div>
            <HashRouter>
                <App>
                <Switch>
                    <Route path='/mobile' component={MobileTabBarBottom} />
                    <Route component={NoMatch} />
                </Switch>
                </App>
            </HashRouter>
            </div>
        );
    }
}
