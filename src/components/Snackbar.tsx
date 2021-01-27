import { IonAlert } from '@ionic/react';
import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { snackbarState } from '../recoil/state';

const Snackbar = () => {

    const { isActive, message } = useRecoilValue(snackbarState);

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
            <IonAlert
                isOpen={ isActive }
                onDidDismiss={ handleClose }
                header={ message! }
                buttons={ [ 'Okay' ] }
            />
        </div> : null
    );
};

export default Snackbar;
