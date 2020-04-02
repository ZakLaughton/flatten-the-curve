import React, { useState, useEffect } from 'react';
import GameBoard from './components/GameBoard';
import { shuffleArray } from './utils/utils';
import './App.css';

function App() {
  const gridSize = 35;
  const boardSize = 1000;
  const cellSize = boardSize / gridSize;
  const numberOfPeople = 500;
  const gameMetrics = { gridSize, boardSize, cellSize, numberOfPeople };

  const initialState = {
    people: []
  };

  const [state, setState] = useState(initialState);
  const { people } = state;

  function getSurroundingCells(location) {
    const { x, y } = location;
    let surroundingCells = [
      { direction: 'N', coordinates: { x: x + 0, y: y + 1 } },
      { direction: 'NE', coordinates: { x: x + 1, y: y + 1 } },
      { direction: 'E', coordinates: { x: x + 1, y: y + 0 } },
      { direction: 'SE', coordinates: { x: x + 1, y: y - 1 } },
      { direction: 'S', coordinates: { x: x + 0, y: y - 1 } },
      { direction: 'SW', coordinates: { x: x - 1, y: y - 1 } },
      { direction: 'W', coordinates: { x: x - 1, y: y + 0 } },
      { direction: 'NW', coordinates: { x: x - 1, y: y + 1 } }
    ];

    if (isOnLeftEdge(location))
      surroundingCells = surroundingCells.filter(
        move => !['NW', 'W', 'SW'].includes(move.direction)
      );
    if (isOnBottomEdge(location))
      surroundingCells = surroundingCells.filter(
        move => !['SW', 'S', 'SE'].includes(move.direction)
      );
    if (isOnRightEdge(location))
      surroundingCells = surroundingCells.filter(
        move => !['SE', 'E', 'NE'].includes(move.direction)
      );
    if (isOnTopEdge(location))
      surroundingCells = surroundingCells.filter(
        move => !['NE', 'N', 'NW'].includes(move.direction)
      );

    return surroundingCells;

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
  }

  const calculateMove = location => {
    const possibleMoves = getSurroundingCells(location);
    const newLocation = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];

    return newLocation.coordinates;
  };

  const movePeople = () => {
    const movedPeople = people.reduce((newPeople, person, index) => {
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

    const movedInfectedPeople = infect(movedPeople);
    setState({ people: movedInfectedPeople });
  };

  const infect = people => {
    const infectedPeople = people.filter(person => person.isInfected === true);
    let infectionZones = infectedPeople.map(person => {
      const neighborLocations = getSurroundingCells(person.location)
        .filter(location => ['N', 'E', 'S', 'W'].includes(location.direction))
        .map(surroundingCell => surroundingCell.coordinates);

      return neighborLocations;
    });
    infectionZones = infectionZones.flat();
    const newlyInfectedPeople = people.map(person => {
      if (
        infectionZones.some(
          infectionZone =>
            person.location.x === infectionZone.x && person.location.y === infectionZone.y
        )
      ) {
        person.isInfected = true;
      }
      return person;
    });

    return newlyInfectedPeople;
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
      const people = shuffledLocations.slice(0, numberOfPeople).map((location, index) => {
        return {
          id: index,
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
