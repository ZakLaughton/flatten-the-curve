import React, { useState } from 'react';
import Person from './Person';
import styled from 'styled-components';

function GameBoard() {
  const gridSize = 100;
  const boardSize = 1000;
  const cellSize = boardSize / gridSize;

  const [personLocation, setLocation] = useState([0, 0]);
  const moveLocation = () => {
    setLocation([0, 5]);
  };

  return (
    <Board size={boardSize}>
      <Person
        size={cellSize}
        position={[personLocation[0] * cellSize, personLocation[1] * cellSize]}
        move={moveLocation}
      />
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
