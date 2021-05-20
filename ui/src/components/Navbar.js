import React from 'react'

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

    return (
        <Nav className='navbar'>
            <Logo></Logo>
            <LogoText>Recruitment task</LogoText>
            <Line />
        </Nav >
    )
}

export default Navbar
