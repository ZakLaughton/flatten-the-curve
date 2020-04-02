import React from 'react';
import Person from './Person';
import styled from 'styled-components';

function GameBoard({ boardSize, cellSize, people, movePeople }) {
  return (
    <Board size={boardSize} onClick={movePeople}>
      {people.map((person, index) => (
        <Person
          key={index}
          size={cellSize}
          position={[person.location.x * cellSize, person.location.y * cellSize]}
        />
      ))}
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
