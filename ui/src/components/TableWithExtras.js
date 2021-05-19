import React, { useContext, useState } from 'react'
import ServersContext from '../context/servers/serversContext';

import Table from './Table';

import styled from 'styled-components'

const AboveTable = styled.div`
    text-align: start;
    display: flex;
    justify-content: space-between;
`;

const Title = styled.span`
    font-size: 21px;
    font-weight: 600;
    color: #494E61;
    letter-spacing: -.5px;
`;

const TotResults = styled.span`
    font-size: 15px;
`;

const SearchBar = styled.div`
    width: 50px;
    background: grey;
`;

const TableWithExtras = () => {
    const serversContext = useContext(ServersContext);
    const { servers } = serversContext;

    const [filterText, setFilterText] = useState('');

    const numOfElements = servers.length || 0;
    // const numOfElements = 5;

    const makeLine = ({ id, name, status }) => {
        return { id, name, status, options: <span>Options</span> };
    }
    const filteredServers = servers
        .map((server) => makeLine(server))
        .filter(server => server.name && server.name.toLowerCase().includes(filterText.toLowerCase()))
        ;

    return (
        <>
            <AboveTable>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Title>Servers</Title>
                    <TotResults>Number of elements: {numOfElements}</TotResults>
                </div>
                <SearchBar>
                    <input id="search" type="text" placeholder="Filter By Name" aria-label="Search Input" value={filterText} onChange={e => setFilterText(e.target.value)} />
                </SearchBar>
            </AboveTable>
            <Table filteredServers={filteredServers} />
        </>
    )
}

export default TableWithExtras
