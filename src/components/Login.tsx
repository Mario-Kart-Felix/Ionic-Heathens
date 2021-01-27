import React, { FC, useEffect } from 'react';
import { IonButton, IonContent, IonInput, IonPage, IonTitle } from '@ionic/react';
import { useForm } from 'react-hook-form';
import { ILogin } from '../interfaces';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { RouterProps } from 'react-router';
import { useLoginMutation } from '../generated/graphql';
import { AUTH_HOMEPAGE, AUTH_TOKEN } from '../constants';
import { Storage } from '@capacitor/core';
import { snackbarState } from '../recoil/state';
import { useRecoilState } from 'recoil';

interface props extends RouterProps { }

const Login: FC<props> = ({ history }) => {

    const validationSchema = yup.object({
        username: yup.string().required('Username is required'),
        password: yup.string().required('Password is required')
    });

    const { handleSubmit, errors, register } = useForm<ILogin>({
        resolver: yupResolver(validationSchema), defaultValues: {
            username: 'ryuk',
            password: 'Aman123@'
        }
    });

    const [ login, { error } ] = useLoginMutation();
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

    const handleLogin = (formData: ILogin) => {
        login({
            variables: formData
        }).then(async (data) => {
            const token = data?.data?.nativeLogin;
            await Storage.set({ key: AUTH_TOKEN, value: token || '' });
            setSnackbar({
                ...snackbar,
                isActive: true,
                message: 'Logged In',
                severity: {
                    ...snackbar.severity,
                    type: 'success'
                }
            });
            history.push(AUTH_HOMEPAGE);
        }).catch(err => console.error(err));
    };

    return (
        <IonPage>
            <IonContent>
                <IonTitle>
                    Login
                 </IonTitle>
                <form onSubmit={ handleSubmit(handleLogin) }>
                    <IonInput color={ errors.username ? 'danger' : undefined } type='text' ref={ register } name='username' placeholder='Username' />
                    <IonInput color={ errors.password ? 'danger' : undefined } ref={ register } name='password' placeholder='Password' type='password' />
                    <IonButton type='submit'>Login</IonButton>
                </form>
            </IonContent>
        </IonPage>
    );
};

export default Login;

