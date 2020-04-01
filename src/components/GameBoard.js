import React, { useState } from 'react';
import Person from './Person';
import styled from 'styled-components';
import { shuffleArray } from '../utils/utils';

function GameBoard() {
  const gridSize = 100;
  const boardSize = 1000;
  const cellSize = boardSize / gridSize;
  const numberOfPeople = 500;

  const generateAllPositions = () => {
    let positionList = [];
    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        positionList.push([x, y]);
      }
    }
    return positionList;
  };

  const allPositions = generateAllPositions();
  const generateRandomPeople = () => {
    let shuffledLocations = shuffleArray(allPositions);
    const people = shuffledLocations.slice(0, numberOfPeople).map(location => {
      return { location };
    });
    return people;
  };

  const initialPeople = generateRandomPeople();

  const [people, setPeople] = useState(initialPeople);
  const movePeople = () => {
    const newPeople = people.map(person => {
      return { location: [person.location[0] + 5, person.location[1]] };
    });
    setPeople(newPeople);
  };

  return (
    <Board size={boardSize} onClick={movePeople}>
      {people.map((person, index) => (
        <Person
          key={index}
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
