import { GET_SERVER, GET_ALL_SERVERS, UPDATE_SERVERS } from '../types';

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
        case UPDATE_SERVERS:
            return {
                ...state,
                servers: state.servers.map(server =>
                    server.id === action.payload.id ? action.payload : server
                ),
                loading: false
            };
        // case DISABLE_SERVER_STATUS:
        //     state.server: state.servers.filter(server =>
        //         server.id === action.payload.id
        //     )[0].status = 'UNDEFINED'
        //     const serverToDisable = state.servers.filter(server =>
        //         server.id === action.payload.id
        //     )

        //     console.log(serverToDisable);



        //     return {
        //         ...state,
        //         servers: state.servers.filter(server =>
        //             server.id === serverToDisable.id ? action.payload : server
        //         ),
        //         loading: false
        //     };
        default:
            return state;
    }
};