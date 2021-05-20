import React, { useEffect, useContext } from 'react'
import ServersContext from '../context/servers/serversContext';

import DataTable from 'react-data-table-component';

import styled from 'styled-components';

const StyledDataTable = styled(DataTable)`
    margin-top: .5em;

    & .rdt_TableHead div {
        font-size: 14px;
        font-weight: 600;
        color: #9CA7D3;
    }

    & .rdt_TableHeadRow {
        margin-top: 41px;
        padding-bottom: 21px;
        min-height: 33px;
    }

    & .rdt_TableRow div {
        font-weight: 600;
        color: #494E61;
    }

    & .rdt_TableCell {
        line-height: 61px;
    }

    & div div div div .rdt_TableCell:last-of-type {
        display: flex;
        justify-content: flex-end;    
    }

    & .rdt_TableCol:first-of-type, & .rdt_TableCell:first-of-type {
        padding-left: 42px;
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
