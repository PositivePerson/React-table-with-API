import React, { useEffect, useContext } from 'react'
import ServersContext from '../context/servers/serversContext';

import { Grid } from 'gridjs-react';

import styled from 'styled-components';

const StyledGrid = styled(Grid)`
        text-align: start;
        background: red;
`;

const Table = () => {
    const serversContext = useContext(ServersContext);
    const { servers, getAllServers } = serversContext;

    useEffect(() => {
        getAllServers();
    }, [])

    const makeLine = ({ id, name, status }) => {
        return [name, status];
    }

    return (
        <StyledGrid
            data={servers.map(server => makeLine(server))}
            columns={['Name', 'Status', '']}
        />
    )
}

export default Table
