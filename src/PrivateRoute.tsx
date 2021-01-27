import React, { FC } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import Preloader from './components/Preloader';
import { useGetMeQuery } from './generated/graphql';

const PrivateRoute: FC<RouteProps> = ({ component, ...rest }) => {

    const { data, loading } = useGetMeQuery();

    if (loading) {
        return <Preloader />;
    }

    return (
        !data ? <Redirect to='/login' /> : <Route component={ component } { ...rest } />
    );
};

export default PrivateRoute;
