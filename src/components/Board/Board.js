import React from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';
import useSound from 'use-sound';
import moveSound from '../../sounds/Move.mp3';
import captureSound from '../../sounds/Capture.mp3';

import styled from 'styled-components';

import { DataContext } from '../DataProvider';
import { UserContext } from '../UserProvider';

const ENDPOINT = process.env.REACT_APP_API_URL;

function Board({ initialOrientation }) {
  const [validateMove, setValidateMove] = React.useState(true);
  const [playMoveSound] = useSound(moveSound);
  const [playCaptureSound] = useSound(captureSound);
  const [orientation, setOrientation] = React.useState(initialOrientation);
  const [triggerFirstMove, setTriggerFirstMove] = React.useState(0);
  const [plans, setPlans] = React.useState([]);

  const {
    resetAll,
    notes,
    toggle,
    tags,
    isPlanningMode,
    isMistake,
    setIsPlanningMode,
    setIsMistake,
    setPlayerSolvedExercise,
    setPlayerFailedExercise,
    setNumCorrectExercisePlan,
    exercisePlans,
    setExercisePlans,
    moveHistory,
    setMoveHistory,
    selectedMove,
    setSelectedMove,
    chess,
    positionFen,
    setPositionFen,
  } = React.useContext(DataContext);

  const [lastStateBeforePlanning, setLastStateBeforePlanning] = React.useState({
    lastFenBeforePlanning: chess.fen(),
    lastMoveBeforePlanning: null,
  });
  const [nextCorrectMove, setNextCorrectMove] = React.useState(null);
  // const { token } = React.useContext(UserContext);

  React.useEffect(() => {
    const initialFen =
      'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
  }, [orientation, tags, triggerFirstMove]);

  const resetBoard = () => {
    const newGame = new Chess();
    setPositionFen(newGame.fen());
    chess.reset();
    setTriggerFirstMove((prev) => (prev + 1) % 100);
    setPlans([]);
    setIsPlanningMode(false);
    setIsMistake(false);
    resetAll();
  };

  const flipBoard = () => {
    setOrientation((prevOrientation) => {
      return prevOrientation === 'white' ? 'black' : 'white';
    });
  };

  const handlePieceDrop = (sourceSquare, targetSquare) => {
    try {
      if (validateMove && !isPlanningMode) {
        const moveData = {
          from: sourceSquare,
          to: targetSquare,
          promotion: 'q',
        };

        setLastStateBeforePlanning({
          lastFenBeforePlanning: chess.fen(),
          lastMoveBeforePlanning: moveData,
        });
        let move = chess.move(moveData);

        if (move) {
          console.log(`move=${JSON.stringify(move)}`);
          setMoveHistory((previous) => {
            return [...previous, move.san];
          });

          if (move.flags.includes('c')) {
            playCaptureSound();
          } else {
            playMoveSound();
          }

          setPositionFen(chess.fen());
          return true;
        } else {
          return false;
        }
      }
    } catch (error) {
      console.log('Error making move:', error);
      return false;
    }
  };

  return (
    <>
      <Div>
        <Chessboard
          id='BasicBoard'
          onPieceDrop={handlePieceDrop}
          position={positionFen}
          dropOffBoardAction='snapback'
          boardOrientation={orientation}
          allowDragOutsideBoard={!validateMove}
        />
        <Button onClick={resetBoard}>Reset</Button>
        <Button onClick={flipBoard}>Flip</Button>
      </Div>
    </>
  );
}

export default Board;

const Button = styled.button`
  padding: 5px;
  background-color: lightgrey;
  margin: 2px;
  margin-top: 10px;
  margin-right: 3px;
  border-radius: 5px;
  font-weight: bold;
  border: 2px solid black;
`;

const Div = styled.div`
  margin-left: 2%;
  width: 90%;
`;
