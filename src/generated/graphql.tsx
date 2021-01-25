import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  getMe: UserEntity;
  getMyChannel: ChannelEntity;
  getChannels: Array<ChannelEntity>;
  getSingleChannel?: Maybe<ChannelEntity>;
  getChannelUsers?: Maybe<Array<UserEntity>>;
  hello: Scalars['String'];
  getChannelMessages: PaginatedMessages;
};


export type QueryGetSingleChannelArgs = {
  id: Scalars['Float'];
};


export type QueryGetChannelUsersArgs = {
  channelId: Scalars['Float'];
};


export type QueryGetChannelMessagesArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Float'];
  channelId: Scalars['Float'];
};

export type UserEntity = {
  __typename?: 'UserEntity';
  id: Scalars['Float'];
  username: Scalars['String'];
  name: Scalars['String'];
  email: Scalars['String'];
  verified: Scalars['Boolean'];
  channel?: Maybe<ChannelEntity>;
  channelId?: Maybe<Scalars['Float']>;
  messages?: Maybe<Array<MessageEntity>>;
  createdAt: Scalars['String'];
};

export type ChannelEntity = {
  __typename?: 'ChannelEntity';
  id: Scalars['Float'];
  name: Scalars['String'];
  desc: Scalars['String'];
  users?: Maybe<Array<UserEntity>>;
  messages?: Maybe<Array<MessageEntity>>;
  createdAt: Scalars['String'];
};

export type MessageEntity = {
  __typename?: 'MessageEntity';
  id: Scalars['Float'];
  content: Scalars['String'];
  ivString: Scalars['String'];
  type: Scalars['String'];
  poster: UserEntity;
  channel: ChannelEntity;
  createdAt: Scalars['String'];
};

export type PaginatedMessages = {
  __typename?: 'PaginatedMessages';
  messages: Array<MessageEntity>;
  hasMore: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  forgotPassword: Scalars['Boolean'];
  resetPassword: Scalars['Boolean'];
  verifyEmail: Scalars['Boolean'];
  registerUser: UserEntity;
  loginUser: UserEntity;
  logoutUser: Scalars['Boolean'];
  joinChannel: Scalars['Boolean'];
  leaveChannel: Scalars['Boolean'];
  deleteUser: Scalars['Boolean'];
  addChannel: ChannelEntity;
  deleteChannel: Scalars['Boolean'];
  postMessage: MessageEntity;
  deleteMessage: Scalars['Boolean'];
};


export type MutationForgotPasswordArgs = {
  recaptchaToken?: Maybe<Scalars['String']>;
  email: Scalars['String'];
};


export type MutationResetPasswordArgs = {
  recaptchaToken?: Maybe<Scalars['String']>;
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationVerifyEmailArgs = {
  token: Scalars['String'];
};


export type MutationRegisterUserArgs = {
  recaptchaToken?: Maybe<Scalars['String']>;
  password: Scalars['String'];
  email: Scalars['String'];
  name: Scalars['String'];
  username: Scalars['String'];
};


export type MutationLoginUserArgs = {
  recaptchaToken?: Maybe<Scalars['String']>;
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationJoinChannelArgs = {
  channelId: Scalars['Float'];
};


export type MutationLeaveChannelArgs = {
  channelId: Scalars['Float'];
};


export type MutationAddChannelArgs = {
  desc: Scalars['String'];
  name: Scalars['String'];
};


export type MutationDeleteChannelArgs = {
  id: Scalars['Float'];
};


export type MutationPostMessageArgs = {
  channelId: Scalars['Float'];
  content: Scalars['String'];
};


export type MutationDeleteMessageArgs = {
  id: Scalars['Float'];
};

export type Subscription = {
  __typename?: 'Subscription';
  newMessage: MessageEntity;
  removedMessage: MessageEntity;
  newNotification: Scalars['String'];
  joinedChannel: UserEntity;
  leftChannel: UserEntity;
};


export type SubscriptionNewMessageArgs = {
  channelId: Scalars['Float'];
};


export type SubscriptionRemovedMessageArgs = {
  channelId: Scalars['Float'];
};


export type SubscriptionNewNotificationArgs = {
  channelId: Scalars['Float'];
};


export type SubscriptionJoinedChannelArgs = {
  channelId: Scalars['Float'];
};


export type SubscriptionLeftChannelArgs = {
  channelId: Scalars['Float'];
};

export type HelloQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'hello'>
);


export const HelloDocument = gql`
    query Hello {
  hello
}
    `;

/**
 * __useHelloQuery__
 *
 * To run a query within a React component, call `useHelloQuery` and pass it any options that fit your needs.
 * When your component renders, `useHelloQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHelloQuery({
 *   variables: {
 *   },
 * });
 */
export function useHelloQuery(baseOptions?: Apollo.QueryHookOptions<HelloQuery, HelloQueryVariables>) {
        return Apollo.useQuery<HelloQuery, HelloQueryVariables>(HelloDocument, baseOptions);
      }
export function useHelloLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HelloQuery, HelloQueryVariables>) {
          return Apollo.useLazyQuery<HelloQuery, HelloQueryVariables>(HelloDocument, baseOptions);
        }
export type HelloQueryHookResult = ReturnType<typeof useHelloQuery>;
export type HelloLazyQueryHookResult = ReturnType<typeof useHelloLazyQuery>;
export type HelloQueryResult = Apollo.QueryResult<HelloQuery, HelloQueryVariables>;