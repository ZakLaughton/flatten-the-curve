import React, { useState, useEffect } from 'react';
import GameBoard from './components/GameBoard';
import { shuffleArray } from './utils/utils';
import './App.css';

function App() {
  const gridSize = 10;
  const boardSize = 1000;
  const cellSize = boardSize / gridSize;
  const numberOfPeople = 10;
  const gameMetrics = { gridSize, boardSize, cellSize, numberOfPeople };

  const initialState = {
    people: []
  };

  const [state, setState] = useState(initialState);
  const { people } = state;

  const calculateMove = location => {
    const { x, y } = location;
    let possibleMoves = [
      { direction: 'N', coordinates: [0, 1] },
      { direction: 'NE', coordinates: [1, 1] },
      { direction: 'E', coordinates: [1, 0] },
      { direction: 'SE', coordinates: [1, -1] },
      { direction: 'S', coordinates: [0, -1] },
      { direction: 'SW', coordinates: [-1, -1] },
      { direction: 'W', coordinates: [-1, 0] },
      { direction: 'NW', coordinates: [-1, 1] }
    ];

    if (isOnLeftEdge(location))
      possibleMoves = possibleMoves.filter(move => !['NW', 'W', 'SW'].includes(move.direction));
    if (isOnBottomEdge(location))
      possibleMoves = possibleMoves.filter(move => !['SW', 'S', 'SE'].includes(move.direction));
    if (isOnRightEdge(location))
      possibleMoves = possibleMoves.filter(move => !['SE', 'E', 'NE'].includes(move.direction));
    if (isOnTopEdge(location))
      possibleMoves = possibleMoves.filter(move => !['NE', 'N', 'NW'].includes(move.direction));

    const newLocation = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
    const newX = x + newLocation.coordinates[0];
    const newY = y + newLocation.coordinates[1];
    return { x: newX, y: newY };

    function isOnLeftEdge(location) {
      return location.x === 0;
    }
    function isOnBottomEdge(location) {
      return location.y === 0;
    }
    function isOnRightEdge(location) {
      return location.x === gridSize - 1;
    }
    function isOnTopEdge(location) {
      return location.y === gridSize - 1;
    }
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
        newPeople[index] = { ...person, location: newLocation };
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
    const generateInitialPeople = () => {
      const allPositions = generateAllPositions();
      let shuffledLocations = shuffleArray(allPositions);
      const people = shuffledLocations.slice(0, numberOfPeople).map(location => {
        return {
          location,
          isInfected: false,
          isImmune: false,
          isSymptomatic: false,
          mobility: 'FREE'
        };
      });
      return people;
    };

    const initialPeople = generateInitialPeople();
    const indexToInfect = Math.floor(Math.random() * initialPeople.length);
    initialPeople[indexToInfect].isInfected = true;
    setState({ people: initialPeople });
  }, []);

  return <GameBoard {...gameMetrics} people={state.people} movePeople={movePeople} />;
}
export default App;
