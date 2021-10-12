const initialState = {
    nome: '',
    email: '',
    token: ''
}

export default (state = initialState, action) => {
    switch(action.type) {
        case 'SET_TOKEN':
            return {...state, token: action.payload.token}
        break;
    }

    return state;
}