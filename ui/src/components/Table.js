import React, { useEffect, useContext, useState } from 'react'
import ServersContext from '../context/servers/serversContext';

// import { Grid } from 'gridjs-react';
import DataTable from 'react-data-table-component';

import styled from 'styled-components';

// const StyledGrid = styled(Grid)`
//     &&& {
//         color: red;
//     }
// `;

const StyledDataTable = styled(DataTable)`
    & div div div div .rdt_TableCell:last-of-type {
        // background: red;

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

    const conditionalRowStyles = [
        {
            when: row => row.options === 'REBOOT',
            style: {
                backgroundColor: 'rgba(63, 195, 128, 0.9)',
                color: 'white',
                '&:hover': {
                    cursor: 'pointer',
                },
            },
        },
    ]

    return (
        <StyledDataTable
            columns={columns}
            data={filteredServers}
            noHeader
        />
    )
}

export default Table
