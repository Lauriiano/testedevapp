import styled from 'styled-components/native'

export const Container = styled.ScrollView`
`

export const Main = styled.KeyboardAvoidingView`
    flex: 1;
    align-items:center;
    justify-content:center;
`

export const Header = styled.View`
    width: 100%;
    height: 250px;
    background-color: #59A0FF;
    justify-content: center;
    align-items: center;
`

export const TextoHeader = styled.Text`
    font-size: 30px;
    color: #FFF;
`

export const InputsArea = styled.View`
    align-items:center;
    margin-top: 50px;
    width:90%;
`

export const Input = styled.TextInput`
    width: 100%;
    height: 37px;
    border: 1px solid;
    border-color: rgba(0,0,0,.4);
    border-radius: 9px;
    padding-left: 8px;
    color: rgba(0,0,0,.8);
    margin-bottom: 16px;
`

export const TextButton = styled.Text`
    color: #FFF;
    font-size:16px;
`

export const AreaTextCadastro = styled.View`
    width: 90%;
    align-items: center;
`

export const ButtonSubmit = styled.TouchableHighlight`
    width: 100%;
    height: 50px;
    border-radius: 9px;
    background-color:#59A0FF;
    align-items: center;
    justify-content:center;
`
export const ButtonText = styled.Text`
    font-size: ${props=>props.size || '23px'};
    color: ${props=>props.color || '#EEE'};
`

export const ButtonCadastro = styled.TouchableHighlight`

`

export const AreaMessage = styled.View`
    width: 90%;
    align-items: center;
    margin-top: 30px;
`