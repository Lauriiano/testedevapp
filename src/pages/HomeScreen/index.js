import React, {useLayoutEffect, useEffect, useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import {
        Container, 
        AddButton, 
        AddImageButton,
        LojasList,
        NoList,
        NoListImage,
        NoListText
    } from './styled';

import LojaItem from '../../components/LojaItem';

export default () => {

    
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const lojas = useSelector(state => state.lojaReducer.list);

    const [lojasList, setLojasList] = useState([]);
    const [error, setError] = useState('');

    const lojaPress = (item) => {
        console.log(item)
        navigation.navigate('CadastroLojas', {
            item
        })
    }

    const logout = () => {

        setError("Por favor, aguarde...");

        dispatch({
            type: 'SET_TOKEN',
            payload: ""
        });

        dispatch({
            type: 'SET_LOJAS',
            payload: {list: []}
        });


        navigation.navigate('Preload');
        

    }

    useLayoutEffect(() => {

        if(lojas.length <= 0) {
            setError(lojas.error);
        } else {
           setLojasList(lojas);
        }
        
        navigation.setOptions({
            title: "Estabelecimentos",
            headerRight: () => (
                <>
                    <AddButton underlayColor="transparent" onPress={() => navigation.navigate('CadastroLojas')}>
                        <AddImageButton source={require('../../assets/add.png')}/>
                    </AddButton>
                    <AddButton underlayColor="transparent" onPress={() => logout()}>
                        <AddImageButton source={require('../../assets/delete.png')}/>
                    </AddButton>
                </>
            )
        });

    },[])

    useEffect(() => {
        setLojasList(lojas);
    },[lojas])

    return (
        <Container>
            {lojasList.length > 0 && error == "" &&
                <LojasList 
                    data={lojasList}
                    renderItem={({item, index})=>(
                        <LojaItem 
                            data={item}
                            index={index}
                            onPress={() => lojaPress(item)}
                        />
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
            }
            {lojasList.length == 0 && error == "" &&
                <NoList>
                    <NoListImage source={require('../../assets/noList.png')} />
                    <NoListText>Sem Estabelecimentos Cadastrados</NoListText>
                </NoList>
            }
            {error != "" &&
                <NoList>
                    <NoListText>{error}</NoListText>
                </NoList>
            }
        </Container>
        )
}

