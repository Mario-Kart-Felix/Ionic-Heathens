import React from 'react';
import { Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle } from 'ionicons/icons';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from './utils/apollo';
import Dashboard from './components/Dashboard';

const App: React.FC = () => (
  <ApolloProvider client={ useApollo() }>
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route path="/" component={ Home } exact={ true } />
            <Route path="/login" component={ Login } exact={ true } />
            <Route path="/register" component={ Register } />
            <Route path="/dashboard" component={ Dashboard } />
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
    </IonApp>
  </ApolloProvider>
);

export default App;
