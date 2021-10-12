import React, { useEffect } from 'react';
import {Container, Texto} from './styled.js';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { ActivityIndicator } from 'react-native';

export default () => {

    const navigation = useNavigation();
    const token = useSelector(state => state.userReducer.token);

    setTimeout(() => {
        if(token && token != "") {
            navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
              }); 
        } else {
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
              });
        }       
    }, 200); //Apenas para da o efeito de preload

    // useEffect(() => {
    //     // console.log(JSON.stringify(token));
    //     if(!token && token != "") {
    //         navigation.navigate('Home');
    //     } else {
    //         navigation.navigate('Login');
    //     }
    // }, [])

    return (
    <Container>
        <ActivityIndicator size="large" color="#000" />
        <Texto>Por favor, aguarde...</Texto>
    </Container>
    )
}