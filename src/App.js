import React, { useState, useEffect } from 'react';
import GameBoard from './components/GameBoard';
import { shuffleArray } from './utils/utils';
import { GameContext } from './index';
import './App.css';

function App() {
  const gridSize = 10;
  const boardSize = 1000;
  const cellSize = boardSize / gridSize;
  const numberOfPeople = 50;

  const initialState = {
    people: []
  };

  const [state, setState] = useState(initialState);
  const { people } = state;

  const calculateMove = location => {
    const x = location[0];
    const y = location[1];
    const newX = x + Math.floor(Math.random() * 3 - 1);
    const newY = y + Math.floor(Math.random() * 3 - 1);
    if (
      newX < 0 ||
      newX >= gridSize ||
      newY < 0 ||
      newY >= gridSize ||
      people.some(person => person.location === [newX, newY])
    )
      return location;
    return [newX, newY];
  };

  const movePeople = () => {
    const newPeople = people.reduce((newPeople, person, index) => {
      const newLocation = calculateMove(person.location);

      if (
        newPeople.some(
          person => person.location[0] === newLocation[0] && person.location[1] === newLocation[1]
        )
      ) {
        newPeople[index] = person;
      } else {
        newPeople[index] = { location: newLocation };
      }

      return newPeople;
    }, people);
    setState({ people: newPeople });
  };

  const generateAllPositions = () => {
    let positionList = [];
    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        positionList.push([x, y]);
      }
    }
    return positionList;
  };

  const generateInitialPositions = () => {
    const allPositions = generateAllPositions();
    let shuffledLocations = shuffleArray(allPositions);
    const people = shuffledLocations.slice(0, numberOfPeople).map(location => {
      return { location };
    });
    setState({ people });
  };

  useEffect(() => {
    generateInitialPositions();
  }, []);

  return (
    <GameBoard
      boardSize={boardSize}
      cellSize={cellSize}
      movePeople={movePeople}
      people={state.people}
    />
  );
}
export default App;
