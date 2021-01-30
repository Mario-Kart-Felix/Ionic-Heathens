import React, { FC, useEffect } from 'react';
import { IonButton, IonCol, IonContent, IonInput, IonPage, IonRow } from '@ionic/react';
import { useForm } from 'react-hook-form';
import { IRegister } from '../../utils/interfaces';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { RouterProps } from 'react-router';
import { useRegisterMutation } from '../../generated/graphql';
import { snackbarState } from '../../recoil/state';
import { useRecoilState } from 'recoil';
import classes from './Register.module.css';
import { emailRegExp, passwordRegExp } from '../../utils/regexs';
import Preloader from '../Preloader/Preloader';

interface props extends RouterProps { }

const Register: FC<props> = ({ history }) => {

    const validationSchema = yup.object({
        name: yup.string().required('Name is required'),
        email: yup.string().required('Email is required').matches(emailRegExp, 'Not a valid email'),
        username: yup.string().required('Username is required'),
        password: yup.string().required('Password is required').matches(passwordRegExp, 'Password must be of minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character')
    });

    const { handleSubmit, errors, register, reset } = useForm<IRegister>({
        resolver: yupResolver(validationSchema)
    });

    const [ registerUser, { error, loading } ] = useRegisterMutation();
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

    const handleRegister = (formData: IRegister) => {
        registerUser({
            variables: formData
        }).then(() => {
            reset();
            setSnackbar({
                ...snackbar,
                isActive: true,
                message: 'Registered! Time to verify your email',
                severity: {
                    ...snackbar.severity,
                    type: 'success'
                }
            });
            history.push('/login');
        }).catch(err => console.error(err));
    };

    if (loading) {
        return <Preloader />;
    }

    return (
        <IonPage>
            <IonContent>
                <div className={ classes.registerContainer }>
                    <div>
                        <IonRow>
                            <IonCol size='6'>
                                <div>
                                    <h5>
                                        Register
                                    </h5>
                                </div>
                            </IonCol>
                            <IonCol size='6'>
                                <div>
                                    <form onSubmit={ handleSubmit(handleRegister) }>
                                        <IonInput color={ errors.name ? 'danger' : undefined } type='text' ref={ register } name='name' placeholder='Name' />

                                        <IonInput color={ errors.email ? 'danger' : undefined } type='text' ref={ register } name='email' placeholder='Email' />

                                        <IonInput color={ errors.username ? 'danger' : undefined } type='text' ref={ register } name='username' placeholder='Username' />

                                        <IonInput color={ errors.password ? 'danger' : undefined } ref={ register } name='password' placeholder='Password' type='password' />

                                        <IonButton type='submit' color='tertiary'>Register</IonButton>
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

export default Register;

