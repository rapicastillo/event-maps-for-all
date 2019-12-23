import React from 'react';
import s from 'styled-components';

export default s.section`
    flex-basis: 0;
    flex-grow: 1;
    background-color: green;
    @media (max-width: 700px) {
      display: none;
    }
`;

