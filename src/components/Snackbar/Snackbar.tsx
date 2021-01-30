import { IonAlert, IonToast } from '@ionic/react';
import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { snackbarState } from '../../recoil/state';

const Snackbar = () => {

    const { isActive, message, severity: { type } } = useRecoilValue(snackbarState);

    const [ snackbar, setSnackbar ] = useRecoilState(snackbarState);

    const handleClose = () => {
        setSnackbar({
            ...snackbar,
            isActive: false,
            message: null,
            severity: {
                ...snackbar.severity,
                type: null
            }
        });
    };

    return (
        isActive ? <div>
            { type === 'error' ? <IonAlert
                isOpen={ isActive }
                onDidDismiss={ handleClose }
                header={ message! }
                buttons={ [ 'Okay' ] }
            /> : <IonToast
                    isOpen={ isActive }
                    onDidDismiss={ handleClose }
                    message={ message! }
                    duration={ 3000 }
                    position='bottom'
                /> }

        </div> : null
    );
};

export default Snackbar;
