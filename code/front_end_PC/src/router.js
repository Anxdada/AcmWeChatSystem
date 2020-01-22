import React from 'react';
import App from './App';
import Admin from './admin';
import Buttons from './pages/ui/buttons'
import Modals from './pages/ui/modals'
import Loadings from './pages/ui/loadings'
import Notification from './pages/ui/notification'
import Messages from './pages/ui/messages';
import myTabs from './pages/ui/tabs';
import Gallery from './pages/ui/gallery';
import Carousels from './pages/ui/carousel';
import FormLogin from './pages/form/login';
import Register from './pages/form/register'
import NoMatch from './pages/nomatch';
import BasicTable from './pages/table/basicTable';
import { HashRouter, Route, Switch } from 'react-router-dom';

export default class IRouter extends React.Component {
    render() {
        return (
            <HashRouter>
                <App>
                    <Route path='/login' component={FormLogin} />
                    <Route path='/admin' render={() => 
                        <Admin >
                            <Route path='/admin/ui/buttons' component={Buttons} />
                            <Route path='/admin/ui/modals' component={Modals} />
                            <Route path='/admin/ui/loadings' component={Loadings} />
                            <Route path='/admin/ui/notification' component={Notification} />
                            <Route path='/admin/ui/messages' component={Messages} />
                            <Route path='/admin/ui/tabs' component={myTabs} />
                            <Route path='/admin/ui/gallery' component={Gallery} />
                            <Route path='/admin/ui/carousel' component={Carousels} />
                            <Route path='/admin/form/login' component={FormLogin} />
                            <Route path='/admin/form/reg' component={Register} />
                            <Route path='/admin/table/basic' component={BasicTable} />
                            <Route component={NoMatch} />
                        </Admin>
                    } />
                    {/* <Route path='/order/detail' component={Login} /> */}
                </App>
            </HashRouter>
        );
    }
}