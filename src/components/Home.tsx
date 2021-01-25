import { IonPage, IonTitle } from '@ionic/react';
import React from 'react';
import { useHelloQuery } from '../generated/graphql';

const Home = () => {

    const { loading, data } = useHelloQuery();

    if (loading) {
        return <h1>Loading...</h1>;
    }

    return (
        <IonPage>
            <IonTitle>
                Home
            </IonTitle>
            {data ? <pre>
                { JSON.stringify(data, null, 3) }
            </pre> : null }
        </IonPage>
    );
};

export default Home;

