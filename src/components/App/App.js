import Header from '../Header';
import React from 'react';

import DataProvider from '../DataProvider';
import WakeLocker from '../WakeLocker';
import Board from '../Board';
import MoveTable from '../MoveTable';

import styled from 'styled-components';

function App() {
  return (
    // <UserProvider>
    <DataProvider>
      <Wrapper>
        <WakeLocker />
        <Content>
          <BoardWrapper>
            <Board />
          </BoardWrapper>
          <BoardWrapper>
            <Board />
          </BoardWrapper>
          <MoveTableWrapper>
            <MoveTable />
          </MoveTableWrapper>
        </Content>
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

const BoardWrapper = styled.div`
  flex: 65;
  background-color: #161512;
  padding-top: 60px;
`;

const MoveTableWrapper = styled.div`
  flex: 15;
  background-color: #161512;
`;

const Content = styled.div`
  display: flex;
  height: 100%;
`;
