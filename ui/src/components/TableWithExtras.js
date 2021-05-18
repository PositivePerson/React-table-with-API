import React from 'react'

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
    const numOfElements = 5

    return (
        <>
            <AboveTable>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Title>Servers</Title>
                    <TotResults>Number of elements: {numOfElements}</TotResults>
                </div>
                <SearchBar></SearchBar>
            </AboveTable>
            <Table />
        </>
    )
}

export default TableWithExtras
