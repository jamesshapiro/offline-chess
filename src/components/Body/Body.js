import React from 'react';

import styled from 'styled-components';

import { DataContext } from '../DataProvider';

import Board from '../Board';
import MoveTable from '../MoveTable';

import { motion, LayoutGroup } from 'framer-motion';

function Body() {
  const { moveHistory } = React.useContext(DataContext);
  var whiteToMove = moveHistory.length % 2 === 0;

  return (
    <Content>
      {/* <ToMoveWrapper>1.0.2</ToMoveWrapper> */}
      <Wrapper2>
        <BoardWrapper
          layout
          initial={{ flex: 70, marginTop: '0', opacity: 1 }}
          animate={{
            flex: whiteToMove ? 70 : 60,
            marginTop: whiteToMove ? '0' : '50px',
            opacity: whiteToMove ? 1.0 : 0.65,
          }}
          transition={{ duration: 0.5 }}
          flex={whiteToMove ? 70 : 60}
          marginTop={whiteToMove ? '0' : '50px'}
          opacity={whiteToMove ? 1.0 : 0.65}
        >
          <Board boardId='1' initialOrientation='white' />
        </BoardWrapper>
        <BoardWrapper
          layout
          initial={{ flex: 60, marginTop: '50px', opacity: 0.65 }}
          animate={{
            flex: whiteToMove ? 60 : 70,
            marginTop: whiteToMove ? '50px' : '0',
            opacity: whiteToMove ? 0.65 : 1,
          }}
          transition={{ duration: 0.5 }}
          flex={whiteToMove ? 60 : 70}
          marginTop={whiteToMove ? '50px' : '0'}
          opacity={whiteToMove ? 0.65 : 1}
        >
          <Board boardId='2' initialOrientation='black' />
        </BoardWrapper>
      </Wrapper2>

      <MoveTableWrapper>
        <MoveTable />
      </MoveTableWrapper>
    </Content>
  );
}

const ToMoveWrapper = styled.span`
  color: white;
`;

const Wrapper2 = styled.div`
  display: flex;
  width: 100%;
`;

const BoardWrapper = styled(motion.div)`
  flex: ${(props) => props.flex};
  background-color: #161512;
  padding-top: 60px;
  padding-left: 50px;
  padding-right: 50px;
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
