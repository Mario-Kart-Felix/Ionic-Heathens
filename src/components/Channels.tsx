import { IonContent, IonPage } from '@ionic/react';
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { useGetChannelsQuery } from '../generated/graphql';
import { snackbarState } from '../recoil/state';
import Preloader from './Preloader';

const Channels = () => {

    const { data, loading, error } = useGetChannelsQuery();

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
                channel
                <pre>
                    { JSON.stringify(data, null, 3) }
                </pre>
            </IonContent>
        </IonPage>
    );
};

export default Channels;
