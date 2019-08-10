import React from 'react';
import styled from 'styled-components';

export const Page = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    
    @media screen and (max-width: 600px) {
        flex-direction: column;
    }
`;

export const Viewport = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: row;
    flex-basis: 0;
    height: 100%;
`;