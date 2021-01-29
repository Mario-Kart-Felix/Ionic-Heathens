import { Route, Switch } from 'react-router-dom';
import {
    IonIcon,
    IonLabel,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle } from 'ionicons/icons';

import React, { Fragment } from 'react';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import NotFound from './components/NotFound';
import PrivateRoute from './PrivateRoute';
import Channels from './components/Channels';
import { useGetMeQuery } from './generated/graphql';
import Preloader from './components/Preloader';

const Routing = () => {

    const { data, loading } = useGetMeQuery();

    if (loading) {
        return <Preloader />;
    }

    return (
        <Fragment>
            <IonReactRouter>
                <IonTabs>
                    <IonRouterOutlet>
                        <Switch>
                            <Route path="/" component={ Home } exact />
                            <Route path="/login" component={ Login } exact />
                            <Route path="/register" component={ Register } exact />
                            <PrivateRoute path="/dashboard" component={ Dashboard } exact />
                            <PrivateRoute path="/channels" component={ Channels } exact />
                            <Route path="/" render={ () => <NotFound /> } />
                        </Switch>
                    </IonRouterOutlet>
                    { data ?
                        <IonTabBar slot="bottom">
                            <IonTabButton tab="home" href="/">
                                <IonIcon icon={ ellipse } />
                                <IonLabel>Home</IonLabel>
                            </IonTabButton>
                            <IonTabButton tab="dashboard" href="/dashboard">
                                <IonIcon icon={ triangle } />
                                <IonLabel>Dashboard</IonLabel>
                            </IonTabButton>
                            <IonTabButton tab="channels" href="/channels">
                                <IonIcon icon={ square } />
                                <IonLabel>Channels</IonLabel>
                            </IonTabButton>
                        </IonTabBar> : <IonTabBar slot="bottom">
                            <IonTabButton tab="home" href="/">
                                <IonIcon icon={ ellipse } />
                                <IonLabel>Home</IonLabel>
                            </IonTabButton>
                            <IonTabButton tab="login" href="/login">
                                <IonIcon icon={ triangle } />
                                <IonLabel>Login</IonLabel>
                            </IonTabButton>
                            <IonTabButton tab="register" href="/register">
                                <IonIcon icon={ square } />
                                <IonLabel>Register</IonLabel>
                            </IonTabButton>
                        </IonTabBar> }
                </IonTabs>
            </IonReactRouter>
        </Fragment>
    );
};

export default Routing;

