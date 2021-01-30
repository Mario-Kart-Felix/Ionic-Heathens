import { IonContent, IonPage } from '@ionic/react';
import React, { useEffect } from 'react';
import { useGetChannelsQuery, useJoinChannelMutation } from '../../generated/graphql';
import { snackbarState } from '../../recoil/state';
import { useRecoilState } from 'recoil';
import Preloader from '../Preloader/Preloader';

const Channels = () => {

    const { data, loading, error } = useGetChannelsQuery();
    const [ joinChannel ] = useJoinChannelMutation();
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

    const handleJoinChannel = (channelId: number) => () => {
        joinChannel({
            variables: {
                channelId
            }
        }).then(() => {
            setSnackbar({
                ...snackbar,
                isActive: true,
                severity: {
                    ...snackbar.severity,
                    type: 'success'
                },
                message: 'Channel Joined'
            });
        }).catch(err => console.error(err));
    };

    if (loading) {
        return <Preloader />;
    }

    return (
        <IonPage>
            <IonContent>
                { data && data.getChannels.length > 0 ? data.getChannels.map(channel => <button key={ channel.id } onClick={ handleJoinChannel(channel.id) }>
                    { channel.name }
                </button>) : <p>
                        No channels yet</p> }
            </IonContent>
        </IonPage>
    );
};

export default Channels;
