import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Layout from './HOC/layout';

import Home from './components/Home/home';
import Articles from './components/Articles';
import Videos from './components/Articles/Videos';
import News from './components/Articles/News';
import MainVideos from './components/Articles/MainVideos';
import Signin from './Authentication';

///Routing Section of application...
const Routes = () => {
        return (
            <Layout>
                <Switch>
                    <Route path='/' exact component={Home} />
                    <Route path='/news' exact component={News} />
                    <Route path='/videos' exact component={MainVideos} />
                    <Route path='/articles/:id' exact component={Articles} />
                    <Route path='/videos/:id' exact component={Videos} />
                    <Route path='/sign-in' exact component={Signin} />
                </Switch>
            </Layout>
        )
}

export default Routes;