import { IonButton } from '@ionic/react';
import React, { FC, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { useGetChannelMessagesQuery } from 'src/generated/graphql';
import { snackbarState } from 'src/recoil/state';
import Preloader from '../Preloader/Preloader';

const Messages: FC<{ channelId: number; }> = ({ channelId }) => {

    const { data, error, loading } = useGetChannelMessagesQuery({
        variables: {
            channelId,
            limit: 10
        }
    });

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
        <div>
            {data ? <ul>
                { data.nativeGetChannelMessages.messages.map(mess => <li key={ mess.id }>
                    { mess.content }
                </li>) }
                { data.nativeGetChannelMessages.hasMore ? <IonButton>
                    Load More
                </IonButton> : <p>Thats it</p> }
            </ul> : <p>No messages yet</p> }
        </div>
    );
};

export default Messages;
