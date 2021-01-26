import { IonButton, IonContent, IonPage } from '@ionic/react';
import React, { Fragment } from 'react';
import { useGetMeQuery } from '../generated/graphql';
import Preloader from './Preloader';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {

    const { data, loading } = useGetMeQuery();

    if (loading) {
        return <Preloader />;
    }

    return (
        <IonPage>
            <IonContent>
                <div className='homeContainer'>
                    { data ? <Fragment>
                        <div>
                            <p>Welcome { data.getMe.username }</p>
                            <Link to='/dashboard'>
                                <IonButton color='tertiary'>
                                    Dashboard
                                </IonButton>
                            </Link>
                        </div>
                    </Fragment> :
                        <div>
                            <p>We don't deal with outsiders very well.</p>
                            <Link to='/login'>
                                <IonButton color='tertiary'>
                                    Login
                                </IonButton>
                            </Link>
                        </div>
                    }
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Home;

