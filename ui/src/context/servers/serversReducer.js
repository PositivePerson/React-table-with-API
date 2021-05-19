import { GET_SERVER, GET_ALL_SERVERS, UPDATE_SERVERS, PING_SERVER } from '../types';

export default (state, action) => {
    switch (action.type) {
        case GET_SERVER:
            return {
                ...state,
                server: action.payload
            };
        case GET_ALL_SERVERS:
            return {
                ...state,
                servers: action.payload
            };
        case UPDATE_SERVERS:
            return {
                ...state,
                server: state.servers.filter(server =>
                    server.id === action.payload.id
                ),
                servers: state.servers.map(server =>
                    server.id === action.payload.id ? action.payload : server
                )
            };
        // case PING_SERVER:
        //     return {
        //         ...state,
        //         servers: state.servers.filter(server =>
        //             server.id === action.payload.id ? action.payload : server
        //         )
        //     };
        default:
            return state;
    }
};