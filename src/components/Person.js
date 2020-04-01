import React from 'react';
import styled from 'styled-components';

function Person({ size, position }) {
  return <PersonCircle size={size} position={position} />;
}

const PersonCircle = styled.span`
  height: ${props => `${props.size}px`};
  width: ${props => `${props.size}px`};
  background-color: red;
  border-radius: 50%;
  position: absolute;
  top: ${props => `${props.position[0]}px`};
  left: ${props => `${props.position[1]}px`};
`;

export default Person;
