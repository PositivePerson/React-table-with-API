import React, { useContext } from 'react'
import ServersContext from '../context/servers/serversContext';

import styled from 'styled-components'

const Nav = styled.nav`
    font-family: 'Montserrat', sans-serif;
    background: #494E61;
    color: #FFFFFF;
    justify-content: normal;
    padding: 20px 0 18px 0;
`;

const Logo = styled.div`
    box-sizing: border-box;
    height: 17px;
    width: 17px;
    border: 2px solid #7D82F7;
    border-radius: 50%;
    margin: 9px 12px 9px 27px;
`;

const LogoText = styled.span`
    font-size: 14px;
`;

const Line = styled.div`
    margin-left: 31px;
    height: 35px;
    width: 2px;
    background-color: #757B8F;
`;

const Navbar = () => {
    const serversContext = useContext(ServersContext);

    const { getAllServers } = serversContext;

    return (
        // <nav style={navStyle}>
        <Nav className='navbar'>
            <Logo></Logo>
            <LogoText onClick={() => getAllServers()}>Recruitment task</LogoText>
            <Line></Line>
        </Nav >
    )
}

export default Navbar
