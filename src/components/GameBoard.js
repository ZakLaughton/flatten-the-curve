import React from 'react';
import Person from './Person';
import styled from 'styled-components';

function GameBoard() {
  const gridSize = 100;
  const boardSize = 1000;
  const cellSize = boardSize / gridSize;

  const personLocationX = 0;
  const personLocationY = 0;

  return (
    <Board size={boardSize}>
      <Person size={cellSize} position={[personLocationX * cellSize, personLocationY * cellSize]} />
    </Board>
  );
}

const Board = styled.div`
  width: ${props => `${props.size}px`};
  height: ${props => `${props.size}px`};
  background-color: #b7b7b7;
  position: relative;
`;

export default GameBoard;
