import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const MainStack = createNativeStackNavigator();

import CadastroUserScreen from '../pages/CadUserScreen';
import LoginScreen from '../pages/LoginScreen';
import PreloadScreen from '../pages/PreloadScreen';
import HomeScreen from '../pages/HomeScreen';
import CadLojasScreen from '../pages/CadLojasScreen';

export default () => (
    <MainStack.Navigator>
        <MainStack.Screen options={{headerShown: false}} name="Preload" component={PreloadScreen} />
        <MainStack.Screen options={{headerShown: false}} name="Login" component={LoginScreen} />
        <MainStack.Screen name="Home" component={HomeScreen} />
        <MainStack.Screen name="Cadastro" component={CadastroUserScreen} />
        <MainStack.Screen name="CadastroLojas" component={CadLojasScreen} />
    </MainStack.Navigator>
)