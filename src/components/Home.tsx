import { IonPage, IonTitle } from '@ionic/react';
import React, { useEffect } from 'react';
import { useHelloQuery, useLoginUserMutation } from '../generated/graphql';

const Home = () => {

    const { loading, data } = useHelloQuery();
    const [ loginUser, loginUserRes ] = useLoginUserMutation();

    useEffect(() => {
        loginUser({
            variables: {
                username: 'ryuk',
                password: 'Aman123@'
            }
        }).then(() => console.log('logged in!')).catch(err => console.error(err));
        // eslint-disable-next-line
    }, []);

    if (loading || loginUserRes.loading) {
        return <h1>Loading...</h1>;
    }

    return (
        <IonPage>
            <IonTitle>
                Home
            </IonTitle>
            {loginUserRes.data ? <pre>
                { JSON.stringify(loginUserRes.data, null, 3) }
            </pre> : null }
            {data ? <pre>
                { JSON.stringify(data, null, 3) }
            </pre> : null }
        </IonPage>
    );
};

export default Home;

