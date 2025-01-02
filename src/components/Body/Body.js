import React from 'react';

import styled from 'styled-components';

import { DataContext } from '../DataProvider';

import Board from '../Board';
import MoveTable from '../MoveTable';

function Body() {
  const { moveHistory } = React.useContext(DataContext);
  const toMove = moveHistory.length % 2 === 0 ? 'white' : 'black';

  const FirstBoardWrapperComponent =
    toMove === 'white' ? ToMoveBoardWrapper : OffMoveBoardWrapper;
  const SecondBoardWrapperComponent =
    toMove === 'black' ? ToMoveBoardWrapper : OffMoveBoardWrapper;

  return (
    <Content>
      <ToMoveWrapper>{toMove}</ToMoveWrapper>
      <FirstBoardWrapperComponent>
        <Board boardId='1' initialOrientation='white' />
      </FirstBoardWrapperComponent>
      <SecondBoardWrapperComponent>
        <Board boardId='2' initialOrientation='black' />
      </SecondBoardWrapperComponent>
      <MoveTableWrapper>
        <MoveTable />
      </MoveTableWrapper>
    </Content>
  );
}

const ToMoveWrapper = styled.span`
  color: white;
`;

const BoardWrapper = styled.div`
  flex: 65;
  background-color: #161512;
  padding-top: 60px;
`;

const OffMoveBoardWrapper = styled.div`
  margin-top: 100px;
  flex: 60;
  background-color: #161512;
  padding-top: 60px;
`;

const ToMoveBoardWrapper = styled.div`
  flex: 70;
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

export default Body;
