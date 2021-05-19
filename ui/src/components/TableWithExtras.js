import React, { useContext, useState, useRef } from 'react'
import ServersContext from '../context/servers/serversContext';

import Table from './Table';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import Popover from '@material-ui/core/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

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

const StyledButtonGroup = styled(ButtonGroup)`
    & .MuiButtonGroup-groupedTextVertical:not(:last-child) {
        border-bottom: unset;
    }

    & .MuiButton-root {
        font-weight: 600;
        font-size: 13px;
        font-family: 'Open Sans', sans-serif;
        letter-spacing: -.5px;
        text-transform: none;
    }

    & .MuiButton-text {
        padding: 23px 57px 23px 28px;
    }
`;

const TableWithExtras = () => {
    const serversContext = useContext(ServersContext);
    const { servers, turnOffServer, turnOnServer, rebootServer } = serversContext;

    const [filterText, setFilterText] = useState('');

    const numOfElements = servers.length || 0;

    const makeLine = ({ id, name, status }) => {
        const threeDots = (
            <div id={id}>
                <PopupState variant='popover' popupId='server-popup-popover'>
                    {(popupState) => (
                        <div>
                            <IconButton aria-label='options' id={id} style={{ color: 'grey' }} disabled={status === 'REBOOTING'} {...bindTrigger(popupState)}>
                                <MoreHorizIcon />
                            </IconButton>
                            <Popover
                                {...bindPopover(popupState)}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center',
                                }}
                            >
                                <StyledButtonGroup
                                    orientation='vertical'
                                    color='primary'
                                    aria-label='vertical contained button group'
                                    variant='text'
                                >
                                    {status === 'ONLINE' ? [
                                        <Button onClick={() => turnOffServer(id)}>Turn off</Button>,
                                        <Button onClick={() => rebootServer(id)}>Reboot</Button>
                                    ] :
                                        <Button onClick={() => turnOnServer(id)}>Turn on</Button>

                                    }
                                </StyledButtonGroup>
                            </Popover>
                        </div>
                    )}
                </PopupState>
            </div>
        )

        return { id, name, status, options: threeDots };
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
                    <input id='search' type='text' placeholder='Filter By Name' aria-label='Search Input' value={filterText} onChange={e => setFilterText(e.target.value)} />
                </SearchBar>
            </AboveTable>
            <Table filteredServers={filteredServers} />
        </>
    )
}

export default TableWithExtras
