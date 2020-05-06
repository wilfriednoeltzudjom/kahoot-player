import React from 'react';

import styled from 'styled-components';

import Layout from '../helpers/Layout';

const Lobby = ({ className }) => {
  return (
    <Layout topLeft topRight bottomLeft bottomRight>
      <div className={className}>
        <h1>Please wait until the other players answer ...</h1>
      </div>
    </Layout>
  );
};

export default styled(Lobby)`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--color-white);
  color: var(--color-black);
  padding: 2rem;
  font-style: italic;

  > h1 {
    font-size: 36px;
  }
`;
