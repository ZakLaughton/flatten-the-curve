import React, { useContext } from 'react';
import Person from './Person';
import styled from 'styled-components';
import { GameContext } from '../index';

function GameBoard({ boardSize, cellSize }) {
  const [state, dispatch] = useContext(GameContext);
  const { people } = state;

  return (
    <Board size={boardSize} onClick={() => dispatch({ type: 'MOVE_PEOPLE' })}>
      {people.map((person, index) => (
        <Person
          key={index}
          size={cellSize}
          position={[person.location[0] * cellSize, person.location[1] * cellSize]}
        />
      ))}
    </Board>
  );
}

const Board = styled.div`
  width: ${props => `${props.size}px`};
  height: ${props => `${props.size}px`};
  background-color: #b7b7b7;
  position: relative;
`;

export default GameBoard;
