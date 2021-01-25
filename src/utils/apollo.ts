import { ApolloClient, InMemoryCache } from "@apollo/client";

export const useApollo = () => {
    const apolloClient = new ApolloClient({
        uri: process.env.REACT_APP_SERVER_URL,
        cache: new InMemoryCache()
    });
    return apolloClient;
};
