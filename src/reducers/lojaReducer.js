// import api from "../api";

// const lojas = api.getLojas();

const initialState = {
    list: []
}

export default (state = initialState, action) => {
    switch(action.type) {
        case 'SET_LOJAS':
            return{...state, list:action.payload.list}
        break;
        case 'EDIT_LOJAS':
            state.list = [];
            return{...state, list:action.payload.list}
        break;
        case 'DELET_LOJAS':
            state.list = [];
            return{...state, list:action.payload.list}
        break;
    }

    return state;
}