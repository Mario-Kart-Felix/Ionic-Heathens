import { ApolloError } from '@apollo/client';
import { IonButton, IonInput } from '@ionic/react';
import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { usePostMessageMutation } from 'src/generated/graphql';
import { snackbarState } from 'src/recoil/state';
import { IPostMessage } from 'src/utils/interfaces';

const Chat: FC<{ channelId: number; }> = ({ channelId }) => {

    const [ isSubmitting, setIsSubmitting ] = useState(false);
    const { handleSubmit, errors, register } = useForm<IPostMessage>({
        defaultValues: {
            content: 'knock knock'
        }
    });
    const [ postMessage ] = usePostMessageMutation();
    const [ snackbar, setSnackbar ] = useRecoilState(snackbarState);

    const handlePostMessage = ({ content }: IPostMessage) => {
        setIsSubmitting(true);
        postMessage({
            variables: {
                channelId,
                content
            }
        }).then(() => {
            console.log('message posted');
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
        setIsSubmitting(false);
    };

    return (
        <div>
            <form onSubmit={ handleSubmit(handlePostMessage) }>
                <IonInput color={ errors.content ? 'danger' : undefined } type='text' ref={ register } name='content' placeholder='Type Something...' />

                <IonButton disabled={ isSubmitting } type='submit' color='tertiary'>Post</IonButton>
            </form>
        </div>
    );
};

export default Chat;
