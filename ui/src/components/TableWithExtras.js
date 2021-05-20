import React, { useContext, useState } from 'react'
import ServersContext from '../context/servers/serversContext';

import Table from './Table';
import SearchComponent from './Search';
import Caption from './Caption';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import CloseIcon from '@material-ui/icons/Close';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

import styled from 'styled-components'

const AboveTable = styled.div`
    text-align: start;
    display: flex;
    justify-content: space-between;
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

    const makeLine = ({ id, name, status }) => {
        const threeDots = (

            <PopupState variant='popover' popupId='server-popup-popover'>
                {(popupState) => (
                    <div key={id}>
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
                                    <Button onClick={() => turnOffServer(id)} key={id}>Turn off</Button>,
                                    <Button onClick={() => rebootServer(id)} key={id + 'i'}>Reboot</Button>
                                ] :
                                    <Button onClick={() => turnOnServer(id)} key={id + 'd'}>Turn on</Button>
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

    const numOfElements = servers.length || 0;
    const filteredServers = servers
        .map((server) => makeLine(server))
        .filter(server => server.name && server.name.toLowerCase().includes(filterText.toLowerCase()))
        ;

    return (
        <>
            <AboveTable>
                <Caption numOfElements={numOfElements} />
                <SearchComponent filterText={filterText} setFilterText={setFilterText} />
            </AboveTable>
            <Table filteredServers={filteredServers} />
        </>
    )
}

export default TableWithExtras
