import React, { FC } from 'react';
import { RouteProps } from 'react-router';

interface props extends RouteProps {
    channelId: number;
}

const SingleChannel: FC<props> = ({ channelId }) => {
    return (
        <div>
            { channelId }
        </div>
    );
};

export default SingleChannel;

