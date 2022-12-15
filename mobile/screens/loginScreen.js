import React from "react";
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';


const LoginScreen = ({navigation}) => {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>LOGIN</Text>
            <View style={{
            flexDirection:'row',
            borderBottomColor:'#cccc',
            borderBottomWidth: 1,
            paddingBottom: 8,
            marginBottom: 25}}>
                <MaterialIcons name='alternate-email' size={20} color='#666' />
                <TextInput placeholder="email" keyboardType="email-address" />
            </View>
            <View style={{
            flexDirection:'row',
            borderBottomColor:'#cccc',
            borderBottomWidth: 1,
            paddingBottom: 8,
            marginBottom: 25}}>
                <Ionicons name='ios-lock-closed-outline' size={20} color='#666' />
                <TextInput placeholder="password" secureTextEntry={true} />
            </View>

            <TouchableOpacity onPress={() => {}} 
            style={{backgroundColor: '#cccc', padding: 10, borderRadius: 10 }}>
                <Text>Login</Text>
            </TouchableOpacity>

            <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
            }}>
            <Text>New to the app?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={{color: '#666', fontWeight: '700'}}> Register</Text>
            </TouchableOpacity>
            </View>
            
        </View>
    )
}

export default LoginScreen;