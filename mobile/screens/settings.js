// code for user to be able to change their account information

import React from 'react';
import { View, Button } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const SettingsScreen = props => {
  const signOut = () => {
    SecureStore.deleteItemAsync('token').then(
      props.navigation.navigate('Auth')
    );
  };

  return (
    <View>
      <Button title="Sign Out" onPress={signOut} />
    </View>
  );
};

SettingsScreen.navigationOptions = {
  title: 'Settings'
};

export default SettingsScreen;