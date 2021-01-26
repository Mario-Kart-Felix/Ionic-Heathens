import { ApolloClient, ApolloLink, InMemoryCache } from "@apollo/client";
import { HttpLink } from '@apollo/client/link/http';
import { WebSocketLink } from '@apollo/client/link/ws';
import { onError } from '@apollo/client/link/error';
import { split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { setContext } from '@apollo/client/link/context';
import { Storage } from '@capacitor/core';
import { AUTH_TOKEN } from "../constants";

const createHttpLink = () => {

    const httpLink = new HttpLink({
        uri: `${ process.env.REACT_APP_SERVER_URL }/graphql`,
    });

    const wsUri = process.env.REACT_APP_NODE_ENV === 'production' ? `wss://${ process.env.REACT_APP_SERVER_DOMAIN }/graphql` : `ws://${ process.env.REACT_APP_SERVER_DOMAIN }/graphql`;

    const wsLink = new WebSocketLink({
        uri: wsUri,
        options: {
            reconnect: true,
            lazy: true
        },
    });

    const splitLink = split(
        ({ query }) => {
            const definition = getMainDefinition(query);
            return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
        },
        wsLink,
        httpLink,
    );
    return splitLink;
};


const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        graphQLErrors.forEach(({ message, locations, path }) => {
            // console.log(`[GraphQL error]: Message: ${ message }, Location: ${ locations }, Path: ${ path }`);
            if (message === 'Not Authenticated') {
            }
        });
    }

    if (networkError) {
        // console.log(`[Network error]: ${ networkError }`);
    }
});

const authLink = setContext(async (_, { headers }) => {

    const token = await Storage.get({ key: AUTH_TOKEN });

    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${ token.value }` : '',
        }
    };

});

const httpLink = createHttpLink();

const link = ApolloLink.from([
    errorLink,
    authLink,
    httpLink,
]);

export const useApollo = () => {

    return new ApolloClient({
        link,
        cache: new InMemoryCache(),
    });
};
