import React from 'react';
import { Switch } from 'react-router-dom';
import Layout from './HOC/layout';

import Home from './components/Home/home';
import Articles from './components/Articles';
import Videos from './components/Articles/Videos';
import News from './components/Articles/News';
import MainVideos from './components/Articles/MainVideos';
import Dashboard from './components/Dashboard/dashboard';
import Signin from './Authentication';

//The Auth Routes...
import PublicRoute from './AuthRoutes/PublicRoutes';
import PrivateRoute from './AuthRoutes/PrivateRoutes';

///Routing Section of application...
const Routes = (props) => {
///Maked the Restricted user from Sign-in/Sign-Out cheking the user with React-Router..
        return (
            <Layout user={props.user}>
                <Switch>
                    <PublicRoute {...props} restricted={false} path='/' exact component={Home} />
                    <PublicRoute {...props} restricted={false} path='/news' exact component={News} />
                    <PublicRoute {...props} restricted={false} path='/videos' exact component={MainVideos} />
                    <PublicRoute {...props} restricted={false} path='/articles/:id' exact component={Articles} />
                    <PublicRoute {...props} restricted={false} path='/videos/:id' exact component={Videos} />
                    <PublicRoute {...props} restricted={true} path='/sign-in' exact component={Signin} />

                    <PrivateRoute {...props} path='/dashboard' exact component={Dashboard} />
                </Switch>
            </Layout>
        )
}

export default Routes;