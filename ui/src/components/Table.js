import React, { useEffect, useContext } from 'react'
import ServersContext from '../context/servers/serversContext';

import DataTable from 'react-data-table-component';

import styled from 'styled-components';

const StyledDataTable = styled(DataTable)`
    & div div div div .rdt_TableCell:last-of-type {
        display: flex;
        justify-content: flex-end;    
    }
`;

const Table = ({ filteredServers }) => {
    const serversContext = useContext(ServersContext);
    const { getAllServers } = serversContext;

    useEffect(() => {
        getAllServers();
    }, [])

    const columns = [
        {
            name: 'Name',
            selector: 'name',
        },
        {
            name: 'Status',
            selector: 'status',
        },
        {
            name: '',
            selector: '',
        },
        {
            name: '',
            selector: 'options',
        },
    ];

    return (
        <StyledDataTable
            columns={columns}
            data={filteredServers}
            noHeader
        />
    )
}

export default Table
