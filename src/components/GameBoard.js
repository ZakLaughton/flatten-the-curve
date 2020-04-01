import React, { useState } from 'react';
import Person from './Person';
import styled from 'styled-components';

function GameBoard() {
  const gridSize = 100;
  const boardSize = 1000;
  const cellSize = boardSize / gridSize;

  const [people, setPeople] = useState([{ location: [0, 0] }, { location: [0, 5] }]);
  const movePeople = () => {
    const newPeople = people.map(person => {
      return { location: [person.location[0] + 5, person.location[1]] };
    });
    console.log('newPeople:', newPeople);
    setPeople(newPeople);
  };

  return (
    <Board size={boardSize} onClick={movePeople}>
      {people.map(person => (
        <Person
          size={cellSize}
          position={[person.location[0] * cellSize, person.location[1] * cellSize]}
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
