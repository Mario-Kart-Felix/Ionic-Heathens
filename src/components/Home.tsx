import { IonButton, IonContent, IonPage } from '@ionic/react';
import React, { Fragment } from 'react';
import { useGetMeQuery, useLoginMutation } from '../generated/graphql';
import Preloader from './Preloader';
import { Link } from 'react-router-dom';
import { Storage } from '@capacitor/core';
import { AUTH_TOKEN } from '../constants';
import './Home.css';

const Home = () => {

    const { data, loading } = useGetMeQuery();
    const [ login ] = useLoginMutation({
        variables: {
            username: 'ryuk',
            password: 'Aman123@'
        }
    });

    const handleLogin = () => {
        login().then(async (data) => {
            const token = data.data?.nativeLogin;
            Storage.set({ key: AUTH_TOKEN, value: token || '' });
        }).catch(err => console.error(err));
    };

    if (loading) {
        return <Preloader />;
    }

    return (
        <IonPage>
            <IonContent>
                <div className='homeContainer'>
                    { data ? <Fragment>
                        <div>
                            <p>Welcome { data.getMe.username }</p>
                            <Link to='/dashboard'>
                                <IonButton color='tertiary'>
                                    Dashboard
                                </IonButton>
                            </Link>
                        </div>
                    </Fragment> :
                        <div>
                            <p>We don't deal with outsiders very well.</p>
                            <Link to='/login'>
                                <IonButton onClick={ handleLogin } color='tertiary'>
                                    Login
                                </IonButton>
                            </Link>
                        </div>
                    }
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Home;

