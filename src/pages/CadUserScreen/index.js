import React, {useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import {Container, 
        InputsArea,
        Input,
        AreaTextCadastro,
        ButtonSubmit,
        ButtonText,
        HeaderImage,
        AreaMessage,
        Main
    } from './styled.js'

import { ActivityIndicator, Platform } from 'react-native';
import apii from '../../api.js';
import { useDispatch } from 'react-redux';

export default () => {

    const api = apii();

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const [senha, setsenha] = useState('');
    const [email, setEmail] = useState('');
    const [nome, setNome] = useState('');
    const [messageControl, setMessageControl] = useState(false);

    const submit = async () => {
        if(!senha || !email || !nome) {
            alert('Preencha todos os campos');
            return;
        }

        let newUser = await api.cadUsers(nome, email, senha);
        
        if(!newUser.error) {
            
            const lojas = await api.getLojas();

            console.log('aqui');

            dispatch({
                type: 'SET_TOKEN',
                payload: {token: newUser.token}
            })

            dispatch({
                type: 'SET_LOJAS',
                payload: {list: lojas.lojas}
            })

            setMessageControl(true);
            setTimeout(() => {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Preload' }],
                  });
            }, 2000)
        } else {
            alert(newUser.error);
        }

    }

    return (
        <Container>
            <Main behavior={Platform.OS=='ios'?'padding':null}>
            <HeaderImage source={require("../../assets/cadastrouser.png")}></HeaderImage>
                <InputsArea>
                    <Input placeholder="Nome"  onChangeText={e => setNome(e) }/>
                    <Input placeholder="Email" onChangeText={e => setEmail(e) }/>
                    <Input placeholder="Senha" secureTextEntry={true} onChangeText={e => setsenha(e)} />
                </InputsArea>
                <AreaTextCadastro>
                    <ButtonSubmit onPress={() => submit()}>
                        <ButtonText>Cadastrar</ButtonText>
                    </ButtonSubmit>
                </AreaTextCadastro>
                {messageControl &&
                    <AreaMessage>
                    <ButtonText color="#000">Cadastrado com sucesso</ButtonText>
                    <ButtonText color="#000" size="15px;">Voce será redirecionado em breve</ButtonText>
                    <ActivityIndicator color="#000" size="large" />
                    </AreaMessage>               
                }

            </Main>
        </Container>
    )


}