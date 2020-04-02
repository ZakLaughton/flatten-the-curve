import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

function Person({ size, position, move, personData }) {
  return (
    <PersonCircle
      positionTransition
      {...personData}
      size={size}
      position={position}
      onClick={move}
    />
  );
}

const PersonCircle = styled(motion.span)`
  height: ${props => `${props.size}px`};
  width: ${props => `${props.size}px`};
  background-color: ${props => (props.isInfected ? 'green' : 'red')};
  border-radius: 50%;
  position: absolute;
  left: ${props => `${props.position[0]}px`};
  bottom: ${props => `${props.position[1]}px`};
`;

export default Person;
