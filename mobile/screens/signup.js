import React from 'react';
import { Text } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useMutation, gql } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';

import LoginForm from '../components/LoginForm';
import Loading from '../components/Loading';

const SIGNUP_USER = gql`
  mutation signUp($username: String!, $password: String!) {
    signUp(username: $username, password: $password)
  }
`;

const SignUp = () => {
    const navigation = useNavigation()
    const [signUp, { loading, error }] = useMutation(SIGNUP_USER, {
        onCompleted: (data) => {
            SecureStore.setItemAsync('token', data.signUp).then(
                navigation.navigate('AuthenticatedScreens')
                );
            }
        });

  // if loading, return a loading indicator
  if (loading) return <Loading />;

  if (error) return <Text>{JSON.stringify(error)}</Text>

        return (
        <React.Fragment>
            <LoginForm
            action={signUp}
            formType="signUp"
            />
        </React.Fragment>
        );
    };

export default SignUp;