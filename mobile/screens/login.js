import React from 'react';
import { Text, StyleSheet} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useMutation, gql } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';

import LoginForm from '../components/LoginForm';
import Loading from '../components/Loading';

const LOGIN_USER = gql`
  mutation logIn($username: String!, $password: String!) {
    logIn(username: $username, password: $password)
  }
`;

const LogIn = () => {
    const navigation = useNavigation()
    const [logIn, { loading, error }] = useMutation(LOGIN_USER, {
        onCompleted: data => {
            SecureStore.setItemAsync('token', data.logIn).then(
                navigation.navigate('AuthenticatedScreens')
                );
            }
        });
        
        if (loading) return <Loading />;

        if (error) return <Text>{JSON.stringify(error)}</Text>

        return (
        <React.Fragment>
            <LoginForm
                action={logIn}
                formType="logIn"
            />
        </React.Fragment>
        );
    };

export default LogIn;

const styles = StyleSheet.create({
    container: {
        
        alignItems: 'center'
    }

});