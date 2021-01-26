import React from 'react';
import { IonContent, IonPage, IonSpinner } from '@ionic/react';
import './Preloader.css';

const Preloader = () => {
    return (
        <IonPage>
            <IonContent>
                <div className='preloaderContainer'>
                    <IonSpinner name="crescent" />
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Preloader;
