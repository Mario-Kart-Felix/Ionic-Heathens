import { ApolloClient, InMemoryCache } from "@apollo/client";

export const useApollo = () => {
    const apolloClient = new ApolloClient({
        uri: `${ process.env.REACT_APP_SERVER_URL}/graphql`,
        cache: new InMemoryCache(),
        credentials: 'include'
    });
    return apolloClient;
};
