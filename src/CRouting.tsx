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

const Routing = () => {
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
                            <Route path="/" render={ () => <NotFound /> } />
                        </Switch>
                    </IonRouterOutlet>
                    <IonTabBar slot="bottom">
                        <IonTabButton tab="home" href="/">
                            <IonIcon icon={ triangle } />
                            <IonLabel>Home</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="login" href="/login">
                            <IonIcon icon={ ellipse } />
                            <IonLabel>Login</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="register" href="/register">
                            <IonIcon icon={ square } />
                            <IonLabel>Register</IonLabel>
                        </IonTabButton>
                    </IonTabBar>
                </IonTabs>
            </IonReactRouter>
        </Fragment>
    );
};

export default Routing;

