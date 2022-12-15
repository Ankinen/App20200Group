import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//import { createSwitchNavigator } from 'react-navigation-switch'
import { createStackNavigator } from '@react-navigation/stack';

import Ionicons from 'react-native-vector-icons/Ionicons';

import SettingsScreen from './screens/settings';
import Favorites from './screens/favorites';
import AuthStack from './navigation/AuthStack';
//import AuthLoading from './screens/authloading';
//import SignIn from './screens/signin';


// Apollo libraries import
//import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
      title="Log out" onPress={() => navigation.navigate('Settings')} />
    </View>
  );
};

// Bottom Tab code
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/*Put AuthStack in comments to see the main page working. 
      Uncomment tab.navigator*/}
      <AuthStack /> 
      {/*<Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'ios-home'
                : 'ios-home-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'ios-list' : 'ios-list-outline';
            } else if (route.name === 'Favorites') {
              iconName = focused ? 'ios-heart' : 'ios-heart-outline';
            } else if (route.name === 'Grocery List') {
              iconName = focused ? 'ios-cart' : 'ios-cart-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Grocery List" component={HomeScreen} />
        <Tab.Screen name="Favorites" component={Favorites} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
        
      </Tab.Navigator>*/}
    </NavigationContainer>
  );
};

/*export default SwitchNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoading,
    Auth: AuthStack,
    App: App
  }, {
    initialRouteName: 'AuthLoading'
  }
);*/