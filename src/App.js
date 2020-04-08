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
    peopleDensity: 0.25,
    topOfTheCurve: 0,
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
  const {
    day,
    people,
    historicalInfectedCount,
    gridSize,
    boardSize,
    peopleDensity,
    topOfTheCurve,
  } = state;

  const gameMetrics = { gridSize, boardSize, peopleDensity };

  const infectedPeopleCount = getInfectedPeopleCount(people);
  const symptomaticCount = people.filter(
    ({ isCured, infectedDay }) => !isCured && infectedDay >= 0 && day - infectedDay >= 5
  ).length;
  const totalPeopleCount = people.length;
  const curedPeopleCount = people.filter((person) => person.isCured).length;

  const infectedPercentage = `${Math.floor((infectedPeopleCount / totalPeopleCount) * 100)}%`;
  const symptomaticPercentage = `${Math.floor((symptomaticCount / totalPeopleCount) * 100)}%`;
  const curedPercentage = `${Math.floor((curedPeopleCount / totalPeopleCount) * 100)}%`;

  return (
    <GameGrid boardSize={boardSize}>
      <h1 style={{ fontSize: `1.3rem` }}>
        <center>FLATTEN THE CURVE (beta) – See how low you can keep the curve!</center>
      </h1>
      <p>
        <center>
          One person starts infected and contagious. Symptoms show on day 5. Recovery happens on day
          19.
        </center>
      </p>
      <p>
        <center>Select people to social distance (can't move, lower chance of infection).</center>
      </p>
      <p>
        <center>
          Select symptomatic people to quarantine (can't move, no chance of infecting others).
        </center>
      </p>
      <p>
        <center>Refresh the page to restart.</center>
      </p>
      <GameBoard
        {...gameMetrics}
        dispatch={dispatch}
        people={people}
        day={day}
        gridSize={gridSize}
        boardSize={boardSize}
      />
      <Stats>
        <div>
          Infected: <span style={{ color: `red` }}>{infectedPercentage}</span>
        </div>
        <div>
          Symptomatic: <span style={{ color: `#448844` }}>{symptomaticPercentage}</span>
        </div>
        <div>
          Recovered: <span style={{ color: `#57c1ff` }}>{curedPercentage}</span>
        </div>
      </Stats>
      <TopOfTheCurve>Top of the curve: {Math.floor(topOfTheCurve)}%</TopOfTheCurve>
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
  color: rgba(255, 255, 255, 0.8);
  width: 100vw;
  height: 100vh;
  max-width: ${(props) => `${props.boardSize}px`};
  margin: auto;
`;

const Stats = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  font-size: 2rem;
`;

const TopOfTheCurve = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  font-size: 4rem;
  font-weight: 500;
`;

const GraphContainer = styled.div`
  width: 200px;
  height: 200px;
`;

export default App;
