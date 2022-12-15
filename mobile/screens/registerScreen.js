import React from "react";
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';


const RegisterScreen = () => {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>REGISTER</Text>
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
            

        </View>
    )
}

export default RegisterScreen;