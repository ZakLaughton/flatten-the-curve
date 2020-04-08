import React from 'react';
import Person from './Person';
import styled from 'styled-components';

function GameBoard({ boardSize, cellSize, people, dispatch, day }) {
  return (
    <Board
      size={boardSize}
      onContextMenu={(e) => {
        e.preventDefault();
        // setInterval(movePeople, 400);
        dispatch({ type: 'INCREMENT_DAY' });
      }}
    >
      {people.map((person, index) => (
        <Person
          personData={person}
          key={index}
          size={cellSize}
          position={[person.location.x * cellSize, person.location.y * cellSize]}
          dispatch={dispatch}
          day={day}
        />
      ))}
    </Board>
  );
}

const Board = styled.div`
  width: ${(props) => `${props.size}px`};
  height: ${(props) => `${props.size}px`};
  background-color: #b7b7b7;
  position: relative;
  margin: auto;
`;

export default GameBoard;
