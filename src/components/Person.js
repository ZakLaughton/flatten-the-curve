import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

function Person({ size, position, move }) {
  return <PersonCircle positionTransition size={size} position={position} onClick={move} />;
}

const PersonCircle = styled(motion.span)`
  height: ${props => `${props.size}px`};
  width: ${props => `${props.size}px`};
  background-color: red;
  border-radius: 50%;
  position: absolute;
  bottom: ${props => `${props.position[0]}px`};
  left: ${props => `${props.position[1]}px`};
`;

export default Person;
