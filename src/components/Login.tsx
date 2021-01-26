import React from 'react';
import { IonContent, IonList, IonPage, IonTitle } from '@ionic/react';
import { } from 'react-hook-form';
import { useGetMeQuery } from '../generated/graphql';

const Login = () => {

    const { data, loading } = useGetMeQuery();

    if (loading) {
        return <h1>Loader...</h1>;
    }

    console.log('getMedata = ', data);

    return (
        <IonPage>
            <IonContent>
                <IonTitle>
                    Login
                 </IonTitle>
                 <IonList>
                     
                 </IonList>
            </IonContent>
        </IonPage>
    );
};

export default Login;

