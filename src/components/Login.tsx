import React from 'react';
import { IonPage, IonTitle } from '@ionic/react';
import { } from 'react-hook-form';
import { useGetMeQuery } from '../generated/graphql';

const Login = () => {

    const { data, loading } = useGetMeQuery();

    if (loading) {
        return <h1>Loader...</h1>;
    }

    return (
        <IonPage>
            <IonTitle>
                Login
            </IonTitle>
            {data ? JSON.stringify(data, null, 3) : null }
        </IonPage>
    );
};

export default Login;

