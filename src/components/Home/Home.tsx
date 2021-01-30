import { IonButton, IonContent, IonPage } from '@ionic/react';
import React, { FC, Fragment, useEffect, useState } from 'react';
import { useGetMeQuery, useLogoutMutation } from '../../generated/graphql';
import Preloader from '../Preloader/Preloader';
import { Link, RouterProps } from 'react-router-dom';
import { Storage } from '@capacitor/core';
import { useRecoilState } from 'recoil';
import { snackbarState } from '../../recoil/state';
import { useApolloClient } from '@apollo/client';
import classes from './Home.module.css';

const Home: FC<RouterProps> = ({ history }) => {

    const { data, loading } = useGetMeQuery();
    const [ logout, { error } ] = useLogoutMutation();
    const [ isSubmitting, setIsSubmitting ] = useState(false);
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
        setIsSubmitting(true);
        logout().then(async () => {
            await Storage.clear();
            await apolloClient.resetStore();
            setIsSubmitting(false);
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
                <div >
                    <div className={ classes.homeContainer }>
                        { data ? <Fragment>

                            <p>Welcome { data.getMe.username }</p>
                            <IonButton disabled={ isSubmitting } onClick={ handleLogout } color='tertiary'>
                                Logout
                            </IonButton>

                        </Fragment> :
                            <Fragment>
                                <p>We don't deal with outsiders very well.</p>
                                <Link to='/login'>
                                    <IonButton onClick={ handleLogout } color='tertiary'>
                                        Login
                                </IonButton>
                                </Link>
                            </Fragment>
                        }
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Home;

