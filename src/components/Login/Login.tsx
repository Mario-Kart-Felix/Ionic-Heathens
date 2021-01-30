import React, { FC, useEffect, useState } from 'react';
import { IonButton, IonCol, IonContent, IonInput, IonPage, IonRow } from '@ionic/react';
import { useForm } from 'react-hook-form';
import { ILogin } from '../../utils/interfaces';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { RouterProps } from 'react-router';
import { useLoginMutation } from '../../generated/graphql';
import { AUTH_HOMEPAGE, AUTH_TOKEN } from '../../utils/constants';
import { Storage } from '@capacitor/core';
import { snackbarState } from '../../recoil/state';
import { useRecoilState } from 'recoil';
import classes from './Login.module.css';
import Preloader from '../Preloader/Preloader';

interface props extends RouterProps { }

const Login: FC<props> = ({ history }) => {

    const validationSchema = yup.object({
        username: yup.string().required('Username is required'),
        password: yup.string().required('Password is required')
    });

    const { handleSubmit, errors, register, reset } = useForm<ILogin>({
        resolver: yupResolver(validationSchema), defaultValues: {
            username: 'ryuk',
            password: 'Aman123@'
        }
    });

    const [ login, { error, loading } ] = useLoginMutation();
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

    const handleLogin = (formData: ILogin) => {
        setIsSubmitting(true);
        login({
            variables: formData
        }).then(async (data) => {
            reset();
            setIsSubmitting(false);
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

    if (loading) {
        return <Preloader />;
    }

    return (
        <IonPage>
            <IonContent>
                <div className={ classes.loginContainer }>
                    <div>
                        <IonRow>
                            <IonCol size='6'>
                                <div>
                                    <h5>
                                        Login
                                    </h5>
                                </div>
                            </IonCol>
                            <IonCol size='6'>
                                <div>
                                    <form onSubmit={ handleSubmit(handleLogin) }>

                                        <IonInput color={ errors.username ? 'danger' : undefined } type='text' ref={ register } name='username' placeholder='Username' />

                                        <IonInput color={ errors.password ? 'danger' : undefined } ref={ register } name='password' placeholder='Password' type='password' />

                                        <IonButton disabled={ isSubmitting } type='submit' color='tertiary'>Login</IonButton>
                                    </form>
                                </div>
                            </IonCol>
                        </IonRow>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Login;

