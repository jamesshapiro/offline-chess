import React from 'react';
import styled from 'styled-components';

import { DataContext } from '../DataProvider';
import { UserContext } from '../UserProvider';

function MoveTable() {
  const { moveHistory, selectedMove, setSelectedMove } =
    React.useContext(DataContext);

  const formatMove = (move) => {
    return move
      .replace(/N/g, '♞') // Knight
      .replace(/B/g, '♝') // Bishop
      .replace(/R/g, '♜') // Rook
      .replace(/Q/g, '♛') // Queen
      .replace(/K/g, '♚'); // King
  };

  // Process moves into pairs
  const movePairs = [];
  for (let i = 0; i < moveHistory.length; i += 2) {
    movePairs.push({
      whiteDisplay: moveHistory[i] ? formatMove(moveHistory[i]) : '',
      whiteSan: moveHistory[i],
      blackDisplay: moveHistory[i + 1] ? formatMove(moveHistory[i + 1]) : '',
      blackSan: moveHistory[i + 1],
    });
  }

  return (
    <StyledTable>
      <tbody>
        {movePairs.map((pair, index) => {
          return (
            <StyledRow key={index}>
              <StyledMoveIndexCell>{index + 1}</StyledMoveIndexCell>
              <StyledCell isiconmove={/^[NBRQK]/.test(pair.whiteSan)}>
                {pair.whiteDisplay}
              </StyledCell>
              <StyledCell isiconmove={/^[NBRQK]/.test(pair.blackSan)}>
                {pair.blackDisplay}
              </StyledCell>
            </StyledRow>
          );
        })}
      </tbody>
    </StyledTable>
  );
}

export default MoveTable;

const StyledTable = styled.table`
  width: 100%;
  padding-top: 60px;
`;

const StyledRow = styled.tr`
  display: flex;
`;

const StyledMoveIndexCell = styled.td`
  flex: 1;
  background-color: #302e2c;
  color: #6b6b6b;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 20px;
  padding-right: 20px;
`;

const StyledCell = styled.td`
  flex: 10;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: ${(p) => (p.isiconmove ? '15px' : '20px')};
  background-color: #262421;
  color: #bababa;
  cursor: pointer;
  &:hover {
    background-color: #3692e7;
    color: #ffffff;
  }
  &:last-child:empty {
    cursor: default;
    background-color: #262421;
  }
`;
