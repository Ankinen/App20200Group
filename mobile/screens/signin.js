import React from 'react';
import { View, Button, Text } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useMutation, gql } from '@apollo/client';

import UserForm from '../components/UserForm';
import Loading from '../components/Loading';

const LOGIN_USER = gql`
  mutation logIn($username: String!, $password: String!) {
    logIn(username: $username, password: $password)
  }
`;

const LogIn = props => {
  const [logIn, { loading, error }] = useMutation(LOGIN_USER, {
    onCompleted: data => {
      // store the token with a key value of `token`
      // after the token is stored navigate to the app's main screen
      SecureStore.setItemAsync('token', data.logIn).then(
        props.navigation.navigate('App')
      );
    }
  });

  // if loading, return a loading indicator
  if (loading) return <Loading />;
  return (
    <React.Fragment>
      {error && <Text>Error logining in!</Text>}
      <UserForm
        action={logIn}
        formType="logIn"
        navigation={props.navigation}
      />
    </React.Fragment>
  );
};

LogIn.navigationOptions = {
  title: 'Log In'
};

export default LogIn;