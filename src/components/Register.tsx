import { IonPage, IonTitle } from '@ionic/react';
import React from 'react';
import { useGetMeQuery } from '../generated/graphql';

const Register = () => {

    const { data } = useGetMeQuery();

    console.log('getMeRes = ', data);

    return (
        <IonPage>
            <IonTitle>
                Register
            </IonTitle>
            {data && <pre>
                { JSON.stringify(data, null, 3) }
            </pre>
            }
        </IonPage>
    );
};

export default Register;

