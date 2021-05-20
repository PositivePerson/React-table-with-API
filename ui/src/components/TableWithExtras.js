import React, { Fragment, useContext, useState, useRef } from 'react'
import ServersContext from '../context/servers/serversContext';

import Table from './Table';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

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
    color: #494E61;
`;

const Search = styled.div`
//   padding: .5rem;
  position: relative;
  display: flex;  
  align-items: center;
//   width: 100%;
`

const SearchBar = styled.input`
    font-size: 14px;
    box-sizing: border-box;
    height: 38px;
    width: 263px;
    border: 2px solid #D4D7E1;
    background-color: #F2F3F6;
    border-radius: 2em;

    padding: 13px 0 14px 49px;
    outline: none;
    
    &::-webkit-input-placeholder {
        color: #A9AEC1;
      }
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

const StyledPopover = styled(Popover)`
    & .MuiButton-textPrimary {
        color: #494E61;
    }
`;

const TableWithExtras = () => {
    const serversContext = useContext(ServersContext);
    const { servers, turnOffServer, turnOnServer, rebootServer } = serversContext;

    const [filterText, setFilterText] = useState('');

    const numOfElements = servers.length || 0;

    const makeLine = ({ id, name, status }) => {
        const threeDots = (

            <PopupState variant='popover' popupId='server-popup-popover' id={name}>
                {(popupState) => (
                    <div>
                        <IconButton aria-label='options' style={{ color: '#9CA7D3' }} disabled={status === 'REBOOTING'} {...bindTrigger(popupState)}>
                            <MoreHorizIcon />
                        </IconButton>
                        <StyledPopover
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
                        </StyledPopover>
                    </div>
                )}
            </PopupState>
        )

        const styledStatus = (
            <>
                { status === 'ONLINE' && <div style={{ color: '#24A1A9', fontSize: '11px' }}><FiberManualRecordIcon style={{ width: '.5em' }} /> ONLINE</div>}
                { status === 'OFFLINE' && <div style={{ fontSize: '11px' }}><CloseIcon style={{ width: '.5em', color: '#EA5885' }} /> OFFLINE</div>}
                { status === 'REBOOTING' && <div style={{ fontSize: '11px', color: '#9CA7D3' }}>REBOOTING...</div>}
            </>
        )

        return { id, name, status: styledStatus, options: threeDots };
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
                <Search>
                    <SearchIcon style={{ marginLeft: "1rem", position: "absolute", width: "21px", color: "#A9AEC1" }} />
                    <SearchBar id='search' type='text' placeholder='Search' aria-label='Search Input' value={filterText} onChange={e => setFilterText(e.target.value)} />
                </Search>
            </AboveTable>
            <Table filteredServers={filteredServers} />
        </>
    )
}

export default TableWithExtras
