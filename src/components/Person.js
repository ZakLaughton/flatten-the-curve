import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

function Person({ size, position, personData, setPersonSociallyDistanced, day }) {
  const { id, infectedDay } = personData;
  const isSymptomatic = infectedDay >= 0 && day - infectedDay >= 5;
  const handleClick = () => {
    setPersonSociallyDistanced(id);
  };
  return (
    <>
      <PersonCircle
        positionTransition={{ duration: 1 }}
        size={size}
        position={position}
        onClick={handleClick}
        isSymptomatic={isSymptomatic}
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
  background-color: ${props => (props.isSymptomatic ? '#448844' : 'white')};
  border-radius: 50%;
  position: absolute;
  left: ${props => `${props.position[0]}px`};
  bottom: ${props => `${props.position[1]}px`};
  border: ${props => (props.infectedDay >= 0 ? '2px solid green' : ' 1px solid black')};
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
