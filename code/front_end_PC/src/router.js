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
import NoMatch from './pages/nomatch/computer';
import { HashRouter, Route, Switch } from 'react-router-dom';

import UserAnalysis from './pages/user/userAnalysis';
import UserManage from './pages/user/userManage';

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

import Ttest from './pages/Ttest';

// 下面是手机端的
import MobileTabBarBottom from './mobile';
// 下面是首页的四个小功能
import MobileAnnouncementList from './mobile/announcement/announcementList';
import MobileDetailAnnouncement from './mobile/announcement/detailAnnouncement';

import MobileNewsList from './mobile/news/newsList';
import MobileDetailNews from './mobile/news/detailNews';

import MobileFriendUrlPage from './mobile/friendUrl';

import MobileOnDutyList from './mobile/onDuty/onDutyList';
import MobileNeedToDo from './mobile/onDuty/needToDo';

// 讨论区相关
import MobileDetailPost from './mobile/forum/detailPost';
import MobileReportPost from './mobile/forum/reportPost';
import MobileSearchPostPage from './mobile/forum/searchPost';
import MobileDetailComment from './mobile/forum/detailComment';
import MobileAddPostPage from './mobile/forum/addPost';
import MobileModifyPostPage from './mobile/forum/modifyPost';
import MobileAddLabelForPostPage from './mobile/forum/postLabelSelect';
import MobilePublishPostResult from './mobile/forum/publishPostResult';
import MobileModifyPostResult from './mobile/forum/modifyPostResult';


// 用户相关
import MobileReportUser from './mobile/user/reportUser';
import MobileFollowUserList from './mobile/user/followUserList';
import MobileFanUserList from './mobile/user/fanUserList';
import MobileOtherUserDetailPage from './mobile/user/otherIndex';
import MobileUserPersonalInfo from './mobile/user/personalInfo';


// 手机端无法匹配网址
import MobileNoMatch from './pages/nomatch/mobile';
// 举报的结果页面
import MobileReportResultPage from './mobile/report';

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

                            <Route path='/admin/test' component={Ttest} />
                            <Route component={NoMatch} />
                            </Switch>
                        </Admin>
                    } />
                    <Route path='/mobile' render={() => 
                        <Switch>
                        <Route path='/mobile/home/:id' component={(props) => <MobileTabBarBottom {...props} /> } />
                        
                        <Route path='/mobile/announcement/showallannouncement' component={MobileAnnouncementList} />
                        <Route path='/mobile/announcement/detail/:id' component={(props) => <MobileDetailAnnouncement {...props} /> } />

                        <Route path='/mobile/news/showallnews' component={MobileNewsList} />
                        <Route path='/mobile/news/detail/:id' component={(props) => <MobileDetailNews {...props} /> } />

                        <Route path='/mobile/friendurl' component={MobileFriendUrlPage} />
                        
                        <Route path='/mobile/onduty/showallonduty' component={MobileOnDutyList} />
                        <Route path='/mobile/onduty/needtodo' component={MobileNeedToDo} />



                        <Route path='/mobile/forum/detail/:id' component={(props) => <MobileDetailPost {...props} /> } />
                        <Route path='/mobile/forum/report/:id' component={(props) => <MobileReportPost {...props} /> } />
                        <Route path='/mobile/forum/search' component={MobileSearchPostPage} />
                        <Route path='/mobile/forum/addPost' component={MobileAddPostPage} />
                        <Route path='/mobile/forum/modifyPost/:id' component={MobileModifyPostPage} />
                        <Route path='/mobile/forum/postLabel/:id' component={MobileAddLabelForPostPage} />
                        <Route path='/mobile/forum/publishResult' component={MobilePublishPostResult} />
                        <Route path='/mobile/forum/modifyResult/:id' component={MobileModifyPostResult} />
                        <Route path='/mobile/forum/comment/:id' component={(props) => <MobileDetailComment {...props} /> } />



                        <Route path='/mobile/user/report/:id' component={(props) => <MobileReportUser {...props} /> } />
                        <Route path='/mobile/user/follow/:id' component={(props) => <MobileFollowUserList {...props} /> } />
                        <Route path='/mobile/user/fan/:id' component={(props) => <MobileFanUserList {...props} /> } />
                        <Route path='/mobile/user/otherUser/:id' component={(props) => <MobileOtherUserDetailPage {...props} /> } />
                        <Route path='/mobile/user/personalInfo' component={MobileUserPersonalInfo} />
                        

                        <Route path='/mobile/report/resultPage' component={MobileReportResultPage} />
                        <Route component={MobileNoMatch} />
                        
                        </Switch>
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

                    */

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