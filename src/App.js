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
    const newLocation = [
      location[0] + Math.floor(Math.random() * 3 - 1),
      location[1] + Math.floor(Math.random() * 3 - 1)
    ];

    return newLocation;
  };

  const movePeople = () => {
    const newPeople = people.map(person => {
      return {
        location: calculateMove(person.location)
      };
    });
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
