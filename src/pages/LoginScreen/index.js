import React, {useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import {Container, 
        InputsArea,
        Input,
        AreaTextCadastro,
        ButtonSubmit,
        ButtonText,
        Header,
        AreaMessage,
        Main,
        TextoHeader,
        ButtonCadastro
    } from './styled.js'

import { Platform } from 'react-native';
import apii from '../../api.js';

export default () => {

    const api = apii();

    const navigation = useNavigation();
    const dispatch = useDispatch()

    const [senha, setsenha] = useState('');
    const [email, setEmail] = useState('');
    const [messageControl, setMessageControl] = useState(false);

    const submit = async () => {
        if(!senha || !email) {
            alert('Preencha todos os campos');
            return;
        }

        const userAcess = await api.login(email, senha);
        
        setMessageControl(true);
        
        if(userAcess.status && userAcess.status == true) {

            dispatch({
                type: 'SET_TOKEN',
                payload: {token: userAcess.token}
            });
            
            const lojas = await api.getLojas();

            if(lojas.error || lojas == undefined) { //Não Autorizado
                setMessageControl(false);
                alert(lojas.error);
                return;
            }

            dispatch({
                type: 'SET_LOJAS',
                payload: {list: lojas.lojas}
            })


            setTimeout(() => {
                setMessageControl(false);
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Home' }],
                  });
            }, 2000)
        } else {
            setMessageControl(false);
            alert(userAcess.error);
        }

    }

    return (
        <Container>
            <Main behavior={Platform.OS=='ios'?'padding':null}>
            <Header>
                <TextoHeader>SIShops</TextoHeader>
            </Header>
            <InputsArea>
                <Input placeholder="Email" onChangeText={e => setEmail(e) }/>
                <Input placeholder="Senha" secureTextEntry={true} onChangeText={e => setsenha(e)} />
            </InputsArea>
            <AreaTextCadastro>
                <ButtonSubmit onPress={() => submit()}>
                    <ButtonText>Entrar</ButtonText>
                </ButtonSubmit>
            </AreaTextCadastro>
            <AreaMessage>
                <ButtonCadastro 
                    onPress={() => navigation.navigate('Cadastro')}
                    underlayColor={null}
                >
                    <ButtonText color="#000" size="16px">Não tem conta ? Cadastre-se</ButtonText>
                </ButtonCadastro>
            </AreaMessage>
            {messageControl &&
            <AreaMessage>
                <ButtonText color="#000" size="16px">Por favor, aguarde...</ButtonText>
            </AreaMessage>
            }
            </Main>
        </Container>
    )


}