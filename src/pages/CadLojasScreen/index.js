import React, {useEffect, useState} from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import {Container, 
        InputsArea,
        InputEmail,
        InputLocal,
        AreaTextButton,
        ButtonSubmit,
        ButtonText,
        HeaderImage,
        Main
    } from './styled.js'

import { Platform } from 'react-native';
import apii from '../../api.js';
import { ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

export default () => {

    const navigation = useNavigation();
    const route = useRoute();
    const lojas = useSelector(state => state.lojaReducer.list);
    const dispatch = useDispatch();


    const [id, setId] = useState(0);
    const [desc,  setDesc]    = useState('');
    const [local, setLocal]   = useState('');
    const [buttonControl, setButtonControl] = useState(true);
    const [messageControl, setMessageControl] = useState(false);
    const [message, setMessage] = useState('');

    const api = apii();

    const submit = async () => {
        if(!desc) {
            alert('Preencha a Descrição');
        }

        let novaLoja = await api.cadLojas(desc, local);

        if(!novaLoja.error) {
            setMessageControl(true);
            setMessage('Cadastrado');
            let newLoja = [...lojas, ...[novaLoja]];

            dispatch({
                type: 'SET_LOJAS',
                payload: {list: newLoja}
            })

            setTimeout(() => {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Home' }],
                  });
            }, 2000)
        } else {
            alert(novaLoja.error);
        }

    }

    const editar = async (id, desc, local) => {

        const editScucess = await api.editarLoja(id, desc, local);

        if(!editScucess.error) {
            setMessageControl(true);
            setMessage('Editado');

            let newLoja = lojas;

            newLoja.forEach((item, idx) => {
                if(item.id == editScucess.loja.id) {
                    console.log(`ENTROU ${newLoja[idx].descricao}`)
                    newLoja[idx].descricao = editScucess.loja.descricao;
                    newLoja[idx].localizacao = editScucess.loja.localizacao
                }
            });

            console.log(newLoja);

            let newRducer = [...lojas, ...[newLoja]];

            dispatch({
                type: 'EDIT_LOJAS',
                payload: {list: newLoja}
            })


            setTimeout(() => {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Home' }],
                  });
            }, 2000)
        } else {
            alert(editScucess.error);
        }

    }

    const excluir = async (id) => {

        let arrayLojas = lojas;

        const deletScucess = await api.excluirLoja(id);

        if(!deletScucess.error) {
            setMessageControl(true);
            setMessage('Deletado');

            arrayLojas.forEach((item, idx) => {
                if(item.id == id) {
                    arrayLojas.splice(idx, 1);
                }
            });

            console.log(arrayLojas);

            dispatch({
                type: 'DELET_LOJAS',
                payload: {list: arrayLojas}
            })

            setTimeout(() => {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Home' }],
                  });
            }, 2000)
        } else {
            alert(deletScucess.error);
        }

    }

    useEffect(() => {
        if(route.params?.item != undefined) {
            const {id, descricao, localizacao=""} = route.params?.item;
            setId(id);
            setDesc(descricao);
            setLocal(localizacao);
            setButtonControl(false);

            navigation.setOptions({
                title: descricao
            })
        }
    }, []);

    return (
        <Container>
            <Main behavior={Platform.OS=='ios'?'padding':null}>
            <HeaderImage source={require("../../assets/cadastrolojas.png")}></HeaderImage>
                {buttonControl == true &&
                    <>
                    <InputsArea>
                        <InputEmail placeholder="Nome da Loja" onChangeText={e => setDesc(e) }/>
                        <InputLocal placeholder="Local" onChangeText={e => setLocal(e)} />
                    </InputsArea>
                    <AreaTextButton>
                        <ButtonSubmit onPress={() => submit()}>
                            <ButtonText>Cadastrar</ButtonText>
                        </ButtonSubmit>
                    </AreaTextButton>
                    </>
                }
                {buttonControl == false &&
                <>
                    <InputsArea>
                        <InputEmail value={desc} placeholder="Nome da Loja" onChangeText={e => setDesc(e) }/>
                        <InputLocal value={local} placeholder="Local" onChangeText={e => setLocal(e)} />
                    </InputsArea>
                    <AreaTextButton>
                        <ButtonSubmit onPress={() => editar(id, desc, local)}>
                            <ButtonText>Editar</ButtonText>
                        </ButtonSubmit>
                        <ButtonSubmit color="#FF4444" onPress={() => excluir(id)}>
                            <ButtonText>Excluir</ButtonText>
                        </ButtonSubmit>
                    </AreaTextButton>
                </>
                }
                {messageControl &&
                    <AreaTextButton>
                        <ActivityIndicator size="large" color="#000" />
                        <ButtonText color='#000'>{message} com sucesso, você será redirecionado...</ButtonText>
                    </AreaTextButton>
                }
            </Main>
        </Container>
    )


}