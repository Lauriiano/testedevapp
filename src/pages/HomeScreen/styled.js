import styled from 'styled-components/native';


export const Container = styled.View`
    flex: 1;
`;


export const AddButton = styled.TouchableHighlight`
    margin-right: 15px;
`;

export const AddImageButton = styled.Image`
    width: 24px;
    height: 24px;
`;


export const LojasList = styled.FlatList`
    flex:1;
    width: 100%;
`

export const NoList = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`

export const NoListImage = styled.Image`
    width: 100px;
    height: 100px;
    margin-bottom: 10px;
`

export const NoListText = styled.Text`
    font-size: 15px;
`