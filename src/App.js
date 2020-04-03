import React, { useState, useEffect } from 'react';
import GameBoard from './components/GameBoard';
import { shuffleArray } from './utils/utils';
import './App.css';

function App() {
  const gridSize = 25;
  const boardSize = 700;
  const cellSize = boardSize / gridSize;
  const peopleDensity = 0.2;
  const gameMetrics = { gridSize, boardSize, cellSize };

  const [people, setPeople] = useState([]);
  const [day, setDay] = useState(0);

  function goToNextDay() {
    setDay(day + 1);
    movePeople();
  }
  function setPersonMobility(id, mobility) {
    const newPeople = [...people];
    const personIndex = people.findIndex(person => person.id === id);
    newPeople[personIndex].mobility = mobility;
    setPeople(newPeople);
    goToNextDay();
  }

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
      if (['SOCIALLY_DISTANCED', 'QUARANTINED'].includes(person.mobility)) return newPeople;
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
    setPeople(movedInfectedPeople);
  };

  const infect = people => {
    let peopleCopy = [...people];
    const peopleToRecover = peopleCopy
      .filter(
        person => person.infectedDay !== -1 && !person.isCured && day - person.infectedDay > 19
      )
      .map(person => person.id);
    peopleCopy = peopleCopy.map(person => {
      if (peopleToRecover.includes(person.id)) person.isCured = true;
      return person;
    });

    const contagiousPeople = people.filter(
      person => person.infectedDay >= 0 && !person.isCured && person.mobility !== 'QUARANTINED'
    );
    let infectionZones = contagiousPeople.map(person => {
      const neighborLocations = getSurroundingCells(person.location)
        .filter(location => ['N', 'E', 'S', 'W'].includes(location.direction))
        .map(surroundingCell => surroundingCell.coordinates);

      return neighborLocations;
    });
    infectionZones = infectionZones.flat();
    const newlyInfectedPeople = people.map(person => {
      if (
        person.infectedDay === -1 &&
        infectionZones.some(
          infectionZone =>
            person.location.x === infectionZone.x && person.location.y === infectionZone.y
        )
      ) {
        const chanceOfGettingInfected = person.mobility === 'SOCIALLY_DISTANCED' ? 0.5 : 1;
        if (Math.random() <= chanceOfGettingInfected) person.infectedDay = day;
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
    const numberOfPeople = Math.floor(gridSize * gridSize * peopleDensity) || 4;
    const generateInitialPeople = () => {
      const allPositions = generateAllPositions();
      let shuffledLocations = shuffleArray(allPositions);
      const people = shuffledLocations.slice(0, numberOfPeople).map((location, index) => {
        return {
          id: index,
          location,
          infectedDay: -1,
          isCured: false,
          mobility: 'FREE'
        };
      });
      return people;
    };

    const initialPeople = generateInitialPeople();
    const indexToInfect = Math.floor(Math.random() * initialPeople.length);
    initialPeople[indexToInfect].infectedDay = day;
    setPeople(initialPeople);
  }, []);

  const infectedPeopleCount = people.filter(person => !person.isCured && person.infectedDay >= 0)
    .length;
  const curedPeopleCount = people.filter(person => person.isCured).length;
  return (
    <>
      <GameBoard
        {...gameMetrics}
        people={people}
        movePeople={movePeople}
        setPersonMobility={setPersonMobility}
        day={day}
      />
      <p>Infected: {infectedPeopleCount}</p>
      <p>Recovered: {curedPeopleCount}</p>
    </>
  );
}
export default App;
