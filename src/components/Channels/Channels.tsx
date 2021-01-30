import { IonButton, IonCol, IonContent, IonPage, IonRow } from '@ionic/react';
import React, { FC, Fragment, useEffect, useState } from 'react';
import { useGetChannelsQuery, useJoinChannelMutation } from '../../generated/graphql';
import { snackbarState } from '../../recoil/state';
import { useRecoilState } from 'recoil';
import Preloader from '../Preloader/Preloader';
import classes from './Channels.module.css';
import { RouterProps } from 'react-router';
import { ApolloError } from '@apollo/client';

const Channels: FC<RouterProps> = ({ history }) => {

    const { data, loading, error } = useGetChannelsQuery();
    const [ joinChannel, joinChannelRes ] = useJoinChannelMutation();
    const [ snackbar, setSnackbar ] = useRecoilState(snackbarState);
    const [ isSubmitting, setIsSubmitting ] = useState(false);

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
        setIsSubmitting(true);
        joinChannel({
            variables: {
                channelId
            }
        }).then(() => {
            setIsSubmitting(false);
            setSnackbar({
                ...snackbar,
                isActive: true,
                severity: {
                    ...snackbar.severity,
                    type: 'success'
                },
                message: 'Channel Joined'
            });
            history.push('/dashboard');
        }).catch((err: ApolloError) => {
            setSnackbar({
                ...snackbar,
                isActive: true,
                severity: {
                    ...snackbar.severity,
                    type: 'error'
                },
                message: err.message
            });
        });
    };

    if (loading || joinChannelRes.loading) {
        return <Preloader />;
    }

    return (
        <IonPage>
            <IonContent>
                <div className={ classes.channelsContainer }>
                    <div>
                        <IonRow>
                            { data && data.getChannels.length > 0 ? data.getChannels.map(channel =>
                                <IonCol key={ channel.id }>
                                    <IonButton disabled={ isSubmitting } onClick={ handleJoinChannel(channel.id) } color='tertiary' size='default'>
                                        { channel.name }
                                    </IonButton>
                                </IonCol>
                            ) : <Fragment>
                                    <IonButton color='tertiary' size='default'>
                                        No channels yet
                                </IonButton>
                                </Fragment> }
                        </IonRow>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Channels;
