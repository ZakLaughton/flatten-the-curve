import React, { useReducer } from 'react';
import styled from 'styled-components';
import GameBoard from './components/GameBoard';
import Graph from './components/Graph';
import { shuffleArray, getInfectedPeopleCount } from './utils/utils';
import reducer from './state/gameReducer';
import './App.css';

function App() {
  const initialState = {
    day: 0,
    people: [],
    historicalInfectedCount: [{ day: 0, count: 0 }],
    gridSize: 25,
    boardSize: 700,
    peopleDensity: 0.3,
  };

  function init(initialState) {
    const { gridSize, peopleDensity } = initialState;
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
          mobility: 'FREE',
        };
      });
      return people;
    };

    function generateAllPositions() {
      let positionList = [];
      for (let x = 0; x < gridSize; x++) {
        for (let y = 0; y < gridSize; y++) {
          positionList.push({ x, y });
        }
      }
      return positionList;
    }

    const initialPeople = generateInitialPeople();
    const indexToInfect = Math.floor(Math.random() * initialPeople.length);
    initialPeople[indexToInfect].infectedDay = 0;
    return { ...initialState, people: initialPeople };
  }

  const [state, dispatch] = useReducer(reducer, initialState, init);
  const { day, people, historicalInfectedCount, gridSize, boardSize, peopleDensity } = state;

  const cellSize = boardSize / gridSize;
  const gameMetrics = { gridSize, boardSize, peopleDensity };

  const infectedPeopleCount = getInfectedPeopleCount(people);
  const curedPeopleCount = people.filter((person) => person.isCured).length;
  const totalPeopleCount = people.length || 100;

  return (
    <GameGrid>
      <GameBoard
        {...gameMetrics}
        dispatch={dispatch}
        people={people}
        day={day}
        gridSize={gridSize}
        boardSize={boardSize}
      />
      <p>Infected: {infectedPeopleCount}</p>
      <p>Recovered: {curedPeopleCount}</p>
      <GraphContainer>
        <Graph
          day={day}
          historicalInfectedCount={historicalInfectedCount}
          totalPeopleCount={totalPeopleCount}
        />
      </GraphContainer>
    </GameGrid>
  );
}

const GameGrid = styled.main`
  background-color: #454545;
  color: rgba(255, 255, 255, 0.8);
  width: 100vw;
  height: 100vh;
`;

const GraphContainer = styled.div`
  width: 100vw;
  height: 100vw;
`;

export default App;
