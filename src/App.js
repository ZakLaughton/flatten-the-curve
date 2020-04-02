import React, { useState, useEffect } from 'react';
import GameBoard from './components/GameBoard';
import { shuffleArray } from './utils/utils';
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
    const { x, y } = location;
    const newX = x + Math.floor(Math.random() * 3 - 1);
    const newY = y + Math.floor(Math.random() * 3 - 1);
    if (newX < 0 || newX >= gridSize || newY < 0 || newY >= gridSize) return location;
    return { x: newX, y: newY };
  };

  const movePeople = () => {
    const newPeople = people.reduce((newPeople, person, index) => {
      const newLocation = calculateMove(person.location);

      if (
        newPeople.some(
          person => person.location.x === newLocation.x && person.location.y === newLocation.y
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
        positionList.push({ x, y });
      }
    }
    return positionList;
  };

  useEffect(() => {
    const generateInitialPositions = () => {
      const allPositions = generateAllPositions();
      let shuffledLocations = shuffleArray(allPositions);
      const people = shuffledLocations.slice(0, numberOfPeople).map(location => {
        return { location };
      });
      setState({ people });
    };

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
