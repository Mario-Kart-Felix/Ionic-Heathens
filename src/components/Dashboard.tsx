import { IonContent, IonPage } from '@ionic/react';
import React, { useEffect } from 'react';
import { useGetMyChannelQuery } from '../generated/graphql';
import { snackbarState } from '../recoil/state';
import { useRecoilState } from 'recoil';
import Preloader from './Preloader';

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
                dashing dash
                <pre>
                    { JSON.stringify(data, null, 3) }
                </pre>
            </IonContent>
        </IonPage>
    );
};

export default Dashboard;
