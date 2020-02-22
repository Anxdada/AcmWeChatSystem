import React from 'react';
import App from './App';
import Admin from './admin';
import Home from './pages/home'
import Buttons from './pages/ui/buttons'
import Modals from './pages/ui/modals'
import Loadings from './pages/ui/loadings'
import Notification from './pages/ui/notification'
import Messages from './pages/ui/messages';
import myTabs from './pages/ui/tabs';
import Gallery from './pages/ui/gallery';
import Carousels from './pages/ui/carousel';
import FormLogin from './pages/login/login';
import Register from './pages/login/register'
import NoMatch from './pages/nomatch';
import { HashRouter, Route, Switch } from 'react-router-dom';
import UserManage from './pages/user/userManage';
import UserAnalysis from './pages/user/userAnalysis';

import CategoryNews from './pages/news/category';
import AddNews from './pages/news/addNews';
import ManageNews from './pages/news/manageNews';
import DetailNews from './pages/news/detailNews';
import ModifyNews from './pages/news/modifyNews';

import CategoryAnnounce from './pages/announcement/category';
import AddAnnouncement from './pages/announcement/addAnnouncement';
import ManageAnnouncement from './pages/announcement/manageAnnouncement';
import DetailAnnouncement from './pages/announcement/detailAnnounment';
import RegisterInfo from './pages/announcement/registerInfo';
import ModifyAnnouncement from './pages/announcement/modifyAnnouncement';

import LabelsManageForum from './pages/forum/labelsManageForum';
import AddPost from './pages/forum/addPost';
import ManagePost from './pages/forum/managePost';
import DetailPost from './pages/forum/detailPost';
import ManageComment from './pages/forum/manageComment';
import ModifyPost from './pages/forum/modifyPost';


import FriendUrl from './pages/friendUrl';
import OnDuty from './pages/onDuty';
import About from './pages/about';
import Feedback from './pages/feedback';


export default class IRouter extends React.Component {
    render() {
        return (
            <div>
            <HashRouter>
                <App>
                <Switch>
                    <Route path='/login' component={FormLogin} />
                    <Route path='/admin' render={() => 
                        <Admin >
                            <Switch>
                            <Route path='/admin/home' component={Home} />

                            <Route path='/admin/user/analysis' component={UserAnalysis} />
                            <Route path='/admin/user/manage' component={UserManage} />


                            <Route path='/admin/news/category' component={CategoryNews} />
                            <Route path='/admin/news/add' component={AddNews} />
                            <Route path='/admin/news/manage' component={ManageNews} />
                            <Route path='/admin/news/detail/:id' component={(props) => <DetailNews {...props} /> } />
                            <Route path='/admin/news/modifyNews/:id' component={(props) => <ModifyNews {...props} /> } />


                            <Route path='/admin/announcement/category' component={CategoryAnnounce} />
                            <Route path='/admin/announcement/add/' component={AddAnnouncement} />
                            <Route path='/admin/announcement/manage' component={ManageAnnouncement} />
                            <Route path='/admin/announcement/detail/:id' component={(props) => <DetailAnnouncement {...props} /> } />
                            <Route path='/admin/announcement/registerPerson/:id' component={(props) => <RegisterInfo {...props} /> } />
                            <Route path='/admin/announcement/modifyAnnouncement/:id' component={(props) => <ModifyAnnouncement {...props} /> } />


                            <Route path='/admin/forum/label' component={LabelsManageForum} />
                            <Route path='/admin/forum/add' component={AddPost} />
                            <Route path='/admin/forum/manage' component={ManagePost} />
                            <Route path='/admin/forum/detail/:id' component={(props) => <DetailPost {...props} /> } />
                            <Route path='/admin/forum/comment/:id' component={(props) => <ManageComment {...props} /> } />
                            <Route path='/admin/forum/modifyPost/:id' component={(props) => <ModifyPost {...props} /> } />
                            

                            <Route path='/admin/friendurl' component={FriendUrl} />
                            <Route path='/admin/onduty' component={OnDuty} />
                            <Route path='/admin/feedback' component={Feedback} />
                            <Route path='/admin/about' component={About} />
                            <Route component={NoMatch} />
                            </Switch>
                        </Admin>
                    } />
                    <Route component={NoMatch} />
                </Switch>
                    {/* <Route path='/order/detail' component={Login} /> */}
                </App>
            </HashRouter>
            </div>
        );
    }
}

/*
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
                            */