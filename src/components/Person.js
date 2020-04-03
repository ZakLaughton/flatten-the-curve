import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

function Person({ size, position, move, personData, setPersonSociallyDistanced }) {
  const { id } = personData;
  const handleClick = () => {
    setPersonSociallyDistanced(id);
  };
  return (
    <>
      <PersonCircle
        positionTransition
        {...personData}
        size={size}
        position={position}
        onClick={move}
        onClick={handleClick}
      />
      {personData.mobility === 'SOCIALLY_DISTANCED' && (
        <SociallyDistancedSquare size={size} position={position} {...personData} />
      )}
    </>
  );
}

const PersonCircle = styled(motion.span)`
  height: ${props => `${props.size}px`};
  width: ${props => `${props.size}px`};
  background-color: ${props => (props.infectedDay >= 0 ? '#448844' : 'white')};
  border-radius: 50%;
  position: absolute;
  left: ${props => `${props.position[0]}px`};
  bottom: ${props => `${props.position[1]}px`};
  border: 1px solid black;
  box-sizing: border-box;
`;

const SociallyDistancedSquare = styled.div`
  height: ${props => `${props.size}px`};
  width: ${props => `${props.size}px`};
  position: absolute;
  left: ${props => `${props.position[0]}px`};
  bottom: ${props => `${props.position[1]}px`};
  border: 2px dashed black;
  box-sizing: border-box;
`;

export default Person;
