import { atom } from 'recoil';
import { ISnackbarProps } from '../utils/interfaces';

export const snackbarState = atom<ISnackbarProps>({
    key: 'snackbarState',
    default: {
        isActive: false,
        message: null,
        severity: {
            type: null
        }
    }
});
