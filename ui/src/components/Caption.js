import React from 'react'

import styled from 'styled-components'

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

const Caption = ({ numOfElements }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Title>Servers</Title>
            <TotResults>Number of elements: {numOfElements}</TotResults>
        </div>
    )
}

export default Caption
