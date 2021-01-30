import { IonTitle, IonToolbar } from '@ionic/react';
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import classes from './Navbar.module.css';

const Navbar = () => {
    return (
        <Fragment>
            <IonToolbar>
                <Link to='/' className={ classes.link }>
                    <IonTitle>Heathens</IonTitle>
                </Link>
            </IonToolbar>
        </Fragment>
    );
};

export default Navbar;

