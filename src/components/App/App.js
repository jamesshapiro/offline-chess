import Header from '../Header';
import React from 'react';

import DataProvider from '../DataProvider';
import WakeLocker from '../WakeLocker';
import Body from '../Body';

import styled from 'styled-components';

function App() {
  return (
    // <UserProvider>
    <DataProvider>
      <Wrapper>
        <WakeLocker />
        <Body />
      </Wrapper>
    </DataProvider>
    // </UserProvider>
  );
}

export default App;

const Wrapper = styled.div`
  background-color: #161512;
  height: 100%;
`;
