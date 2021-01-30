import { IonButton, IonContent, IonPage } from '@ionic/react';
import React, { FC, Fragment, useEffect } from 'react';
import { useGetMeQuery, useLogoutMutation } from '../../generated/graphql';
import Preloader from '../Preloader/Preloader';
import { Link, RouterProps } from 'react-router-dom';
import { Storage } from '@capacitor/core';
import './Home.css';
import { useRecoilState } from 'recoil';
import { snackbarState } from '../../recoil/state';
import { useApolloClient } from '@apollo/client';

const Home: FC<RouterProps> = ({ history }) => {

    const { data, loading } = useGetMeQuery();
    const [ logout, { error } ] = useLogoutMutation();

    const [ snackbar, setSnackbar ] = useRecoilState(snackbarState);
    const apolloClient = useApolloClient();

    useEffect(() => {
        if (error) {
            setSnackbar({
                ...snackbar,
                isActive: true,
                severity: {
                    ...snackbar.severity,
                    type: 'error'
                },
                message: error.message
            });
        }
        // eslint-disable-next-line
    }, [ error ]);

    const handleLogout = () => {
        logout().then(async () => {
            await Storage.clear();
            await apolloClient.resetStore();
            setSnackbar({
                ...snackbar,
                isActive: true,
                message: 'Logged Out',
                severity: {
                    ...snackbar.severity,
                    type: 'success'
                }
            });
            history.push('/login');
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
                                <IonButton onClick={ handleLogout } color='tertiary'>
                                    Logout
                                </IonButton>
                            </Link>
                        </div>
                    </Fragment> :
                        <div>
                            <p>We don't deal with outsiders very well.</p>
                        </div>
                    }
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Home;

