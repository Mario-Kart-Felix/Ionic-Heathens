import { IonButton, IonContent, IonPage } from '@ionic/react';
import React, { Fragment, useEffect } from 'react';
import { useGetMyChannelQuery } from '../../generated/graphql';
import { snackbarState } from '../../recoil/state';
import { useRecoilState } from 'recoil';
import Preloader from '../Preloader/Preloader';
import classes from './Dashboard.module.css';
import { Link } from 'react-router-dom';
import SingleChannel from './SingleChannel';

const Dashboard = () => {

    const { data, error, loading } = useGetMyChannelQuery();
    const [ snackbar, setSnackbar ] = useRecoilState(snackbarState);

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

    if (loading) {
        return <Preloader />;
    }

    return (
        <IonPage>
            <IonContent>
                <div className={ classes.dashboardContainer }>
                    <div>
                        { data ? <SingleChannel channelId={ data.nativeGetMyChannel.id } /> : <Fragment>
                            <Link to='/channels'>
                                <IonButton color='tertiary'>
                                    Explore Channels
                                </IonButton>
                            </Link>
                        </Fragment> }
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Dashboard;
