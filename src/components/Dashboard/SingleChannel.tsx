import React, { FC, Fragment, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { IonButton, IonCol, IonRow } from '@ionic/react';
import { GetMyChannelQuery, useLeaveChannelMutation } from '../../generated/graphql';
import Preloader from '../Preloader/Preloader';
import { ApolloError } from '@apollo/client';
import { useRecoilState } from 'recoil';
import { snackbarState } from 'src/recoil/state';
import Chat from './Chat';
import Messages from './Messages';
import classes from './SingleChannel.module.css';

interface props extends RouteComponentProps {
    channel: GetMyChannelQuery;
}

const SingleChannel: FC<props> = ({ history, channel: { nativeGetMyChannel: { id, name } } }) => {

    const [ isSubmitting, setIsSubmitting ] = useState(false);
    const [ leaveChannel, { loading } ] = useLeaveChannelMutation();
    const [ snackbar, setSnackbar ] = useRecoilState(snackbarState);

    const handleLeaveChannel = () => {
        setIsSubmitting(true);
        leaveChannel({
            variables: {
                channelId: id
            },
            update: (cache) => {
                cache.evict({ fieldName: 'getSingleChannel' });
                cache.evict({ fieldName: 'getChannelMessages' });
                cache.evict({ fieldName: 'getChannelUsers' });
                cache.evict({ fieldName: 'getMyChannel' });
            }
        }).then(() => {
            setIsSubmitting(false);
            setSnackbar({
                ...snackbar,
                isActive: true,
                severity: {
                    ...snackbar.severity,
                    type: 'info'
                },
                message: 'You left the channel'
            });
            history.push('/channels');
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

    if (loading) {
        return <Preloader />;
    }

    return (
        <Fragment>
            <div className={ classes.singleChannelContainer }>
                <IonRow>
                    <IonCol sizeMd='4' sizeXs='12'>
                        <div>
                            <IonButton color='tertiary'>
                                { name }
                            </IonButton>
                            <IonButton disabled={ isSubmitting } onClick={ handleLeaveChannel } color='danger'>
                                Leave Channel
                            </IonButton>
                        </div>
                    </IonCol>
                    <IonCol sizeMd='4' sizeXs='12'>
                        <Chat channelId={ id } />
                    </IonCol>
                    <IonCol sizeMd='4' sizeXs='12'>
                        <Messages channelId={ id } />
                    </IonCol>
                </IonRow>
            </div>
        </Fragment>
    );
};

export default withRouter(SingleChannel);

