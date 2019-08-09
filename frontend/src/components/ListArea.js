import React from 'react';
import styled from 'styled-components';

export default styled.section`
    width: 400px;
    height: 100%;
    background-color: blue;
    display: flex !important;
    flex-direction: column;
    
    @media (max-width: 700px) {
      width: 100%;
    }
`;