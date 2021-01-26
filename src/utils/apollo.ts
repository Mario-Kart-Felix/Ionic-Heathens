import { ApolloClient, ApolloLink, InMemoryCache } from "@apollo/client";
import { HttpLink } from '@apollo/client/link/http';
import { WebSocketLink } from '@apollo/client/link/ws';
import { onError } from '@apollo/client/link/error';
import { split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { setContext } from '@apollo/client/link/context';
import { Storage, Plugins } from '@capacitor/core';
import { AUTH_TOKEN } from "../constants";
import '@capacitor-community/http';

const getCookies = async () => {
    const { Http } = Plugins;
    const cookies = await Http.getCookies({
        url: `${ process.env.REACT_APP_SERVER_URL }/graphql`
    });
    return cookies;
};

const createHttpLink = () => {

    console.log('connecting to apollo...');

    const httpLink = new HttpLink({
        uri: `${ process.env.REACT_APP_SERVER_URL }/graphql`,
        credentials: 'include',
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

    // const token = await Storage.get({ key: AUTH_TOKEN });

    const cookies = await getCookies();

    let myCookies = '';
    for (const key in cookies.value) {
        if (Object.prototype.hasOwnProperty.call(cookies.value, key)) {
            const element = cookies.value[ key ];
            myCookies += `${ element.key }=${ element.value }`;
        }
    }

    console.log('myCookies = ', myCookies);

    return {
        headers: {
            ...headers,
            cookie: myCookies
            // authorization: token ? `Bearer ${ token.value }` : '',
        }
    };

});

const httpLink = new HttpLink({
    uri: `${ process.env.REACT_APP_SERVER_URL }/graphql`,
    credentials: 'include',
});


const link = ApolloLink.from([
    errorLink,
    authLink,
    httpLink,
]);

export const useApollo = () => {

    return new ApolloClient({
        uri: `${ process.env.NEXT_PUBLIC_SERVER_URL }/graphql`,
        link,
        credentials: 'include',
        cache: new InMemoryCache({
            // typePolicies: {
            // PaginatedMessages: {
            //     fields: {
            //         messages: {
            //             keyArgs: [],
            //             merge (
            //                 existing = [],
            //                 incoming
            //             ) {
            //                 console.log('existing auth = ', existing);
            //                 console.log('incoming auth = ', incoming);
            //                 return [ ...existing, ...incoming ];
            //             },
            //         },
            //         hasMore: {
            //             keyArgs: [],
            //             merge (existing = false, incoming) {
            //                 console.log('existing hasmore = ', existing);
            //                 console.log('incoming hasmore = ', incoming);
            //                 return incoming;
            //             }
            //         }
            //     },
            // },
            // },
        }),
    });
};
