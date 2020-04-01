import React, { useReducer, createContext, useContext, useEffect } from 'react';
import GameBoard from './components/GameBoard';
import { shuffleArray } from './utils/utils';
import Reducer from './Reducer';
import { GameContext } from './index';
import './App.css';

function App() {
  const [state, dispatch] = useContext(GameContext);
  const gridSize = 10;
  const boardSize = 1000;
  const cellSize = boardSize / gridSize;
  const numberOfPeople = 50;

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
  const generateInitialPositions = () => {
    let shuffledLocations = shuffleArray(allPositions);
    const people = shuffledLocations.slice(0, numberOfPeople).map(location => {
      return { location };
    });
    dispatch({ type: 'SET_PEOPLE', payload: people });
  };

  useEffect(() => {
    generateInitialPositions();
  }, []);

  return <GameBoard boardSize={boardSize} cellSize={cellSize} />;
}
export default App;
