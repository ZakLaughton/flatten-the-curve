import { getInfectedPeopleCount, shuffleArray } from "../utils/utils";
import { initialState } from "../App";

export default function reducer(state, { type, payload }) {
  switch (type) {
    case "INCREMENT_DAY":
      const newDayNumber = state.day + 1;
      // Move people
      const movedPeople = state.people.reduce((newPeople, person, index) => {
        if (["SOCIALLY_DISTANCED", "QUARANTINED"].includes(person.mobility)) return newPeople;
        const newLocation = calculateMove(person.location, state.gridSize);

        if (
          newPeople.some(
            (person) => person.location.x === newLocation.x && person.location.y === newLocation.y
          )
        ) {
          newPeople[index] = person;
        } else {
          newPeople[index] = { ...person, location: newLocation };
        }

        return newPeople;
      }, state.people);

      // Infect
      function infect() {
        let peopleCopy = [...state.people];
        const peopleToRecover = peopleCopy
          .filter(
            (person) =>
              person.infectedDay !== -1 && !person.isCured && state.day - person.infectedDay > 19
          )
          .map((person) => person.id);
        peopleCopy = peopleCopy.map((person) => {
          if (peopleToRecover.includes(person.id)) person.isCured = true;
          return person;
        });

        const contagiousPeople = state.people.filter(
          (person) =>
            person.infectedDay >= 0 && !person.isCured && person.mobility !== "QUARANTINED"
        );
        let infectionZones = contagiousPeople.map((person) => {
          const neighborLocations = getSurroundingCells(person.location)
            .filter((location) => ["N", "E", "S", "W"].includes(location.direction))
            .map((surroundingCell) => surroundingCell.coordinates);

          return neighborLocations;
        });
        infectionZones = infectionZones.flat();
        const newlyInfectedPeople = state.people.map((person) => {
          if (
            person.infectedDay === -1 &&
            infectionZones.some(
              (infectionZone) =>
                person.location.x === infectionZone.x && person.location.y === infectionZone.y
            )
          ) {
            const chanceOfGettingInfected = person.mobility === "SOCIALLY_DISTANCED" ? 0.5 : 1;
            if (Math.random() <= chanceOfGettingInfected) person.infectedDay = state.day;
          }
          return person;
        });

        return newlyInfectedPeople;
      }
      let movedInfectedPeople = infect(movedPeople);
      const newInfectedPeopleCount = getInfectedPeopleCount(movedInfectedPeople);
      const infectedPercentage = (newInfectedPeopleCount / state.people.length) * 100;

      // Experimental: auto-quarantine symptomatic people
      movedInfectedPeople = movedInfectedPeople.map((person) => {
        const { isCured, infectedDay } = person;
        if (!isCured && infectedDay >= 0 && newDayNumber - infectedDay >= 5) {
          person.mobility = "QUARANTINED";
        }
        return person;
      });

      return {
        ...state,
        day: newDayNumber,
        people: movedInfectedPeople,
        historicalInfectedCount: [
          ...state.historicalInfectedCount,
          { day: newDayNumber, count: newInfectedPeopleCount },
        ],
        topOfTheCurve:
          infectedPercentage > state.topOfTheCurve ? infectedPercentage : state.topOfTheCurve,
      };

    case "UPDATE_PERSON_MOBILITY":
      const newPeople = [...state.people];
      const personIndex = newPeople.findIndex((person) => person.id === payload.id);
      newPeople[personIndex].mobility = payload.mobility;

      return { ...state, people: newPeople };
    case "RESTART":
      return init(initialState);
    default:
      return state;
  }
}

export function init(initialState) {
  console.log("INIT>>>");
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
        mobility: "FREE",
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

function calculateMove(location, gridSize) {
  const possibleMoves = getSurroundingCells(location, gridSize);
  const newLocation = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];

  return newLocation.coordinates;
}

function getSurroundingCells(location, gridSize) {
  const { x, y } = location;
  let surroundingCells = [
    { direction: "N", coordinates: { x: x + 0, y: y + 1 } },
    { direction: "NE", coordinates: { x: x + 1, y: y + 1 } },
    { direction: "E", coordinates: { x: x + 1, y: y + 0 } },
    { direction: "SE", coordinates: { x: x + 1, y: y - 1 } },
    { direction: "S", coordinates: { x: x + 0, y: y - 1 } },
    { direction: "SW", coordinates: { x: x - 1, y: y - 1 } },
    { direction: "W", coordinates: { x: x - 1, y: y + 0 } },
    { direction: "NW", coordinates: { x: x - 1, y: y + 1 } },
  ];

  if (isOnLeftEdge(location))
    surroundingCells = surroundingCells.filter(
      (move) => !["NW", "W", "SW"].includes(move.direction)
    );
  if (isOnBottomEdge(location))
    surroundingCells = surroundingCells.filter(
      (move) => !["SW", "S", "SE"].includes(move.direction)
    );
  if (isOnRightEdge(location))
    surroundingCells = surroundingCells.filter(
      (move) => !["SE", "E", "NE"].includes(move.direction)
    );
  if (isOnTopEdge(location))
    surroundingCells = surroundingCells.filter(
      (move) => !["NE", "N", "NW"].includes(move.direction)
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
