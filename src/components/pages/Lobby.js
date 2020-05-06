import React from 'react';

import styled from 'styled-components';

import Layout from '../helpers/Layout';

const Lobby = ({ className }) => {
  return (
    <Layout topLeft bottomLeft>
      <div className={className}>
        <h1>You're in!</h1>
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
  background: rgb(101, 191, 57);
  color: var(--color-white);
  padding: 2rem;
  font-style: italic;

  > h1 {
    font-size: 36px;
  }
`;
