import React, { useReducer } from 'react';
import axios from 'axios';
import ServersContext from './serversContext';
import SeversReducer from './serversReducer';
import { GET_SERVER, GET_ALL_SERVERS, UPDATE_SERVERS } from '../types';

const ServersState = (props) => {
    const initialState = {
        servers: [],
        server: {}
    };

    const [state, dispatch] = useReducer(SeversReducer, initialState);

    const getAllServers = async () => {
        // const res = await api.search.getPhotos({
        //     query: text
        // });

        const res = await axios.get(
            'http://localhost:4454/servers'
        );

        // const res = await fetch('servers');

        console.log(res.data);

        dispatch({
            type: GET_ALL_SERVERS,
            payload: res.data
        });
    }

    const turnOffServer = async (serverId) => {
        const res = await axios.put(`http://localhost:4454/servers/${serverId}/off	`);

        // console.log(res);

        updateServers(serverId);
    }

    const turnOnServer = async (serverId) => {
        const res = await axios.put(`http://localhost:4454/servers/${serverId}/on	`);

        // console.log(res);

        updateServers(serverId);
    }

    const rebootServer = async (serverId) => {
        const res = await axios.put(`http://localhost:4454/servers/${serverId}/reboot	`);

        // console.log(res);

        updateServers(serverId);
    }

    const updateServers = async (serverId) => {
        const res = await axios.get(`http://localhost:4454/servers/${serverId}`);

        // console.log(res);

        dispatch({
            type: UPDATE_SERVERS,
            payload: res.data
        })
    }

    // const getServer = async (serverId) => {

    //     const res = await axios.get(
    //         `/servers/${serverId}`
    //     );

    //     dispatch({
    //         type: GET_SERVER,
    //         payload: res.response
    //     });
    // }

    return (
        <ServersContext.Provider
            value={{
                servers: state.servers,
                server: state.server,
                getAllServers,
                turnOffServer,
                turnOnServer,
                rebootServer,
                // getServer
            }}
        >
            {props.children}
        </ServersContext.Provider>
    );
};

export default ServersState;