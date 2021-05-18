import { GET_SERVER, GET_ALL_SERVERS } from '../types';

export default (state, action) => {
    switch (action.type) {
        case GET_SERVER:
            return {
                ...state,
                server: action.payload,
                loading: false
            };
        case GET_ALL_SERVERS:
            return {
                ...state,
                servers: action.payload,
                loading: false
            };
        default:
            return state;
    }
};