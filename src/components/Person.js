import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

function Person({ size, position, personData, setPersonMobility, day }) {
  const { id, infectedDay, isCured } = personData;
  const isSymptomatic = !isCured && infectedDay >= 0 && day - infectedDay >= 5;
  const handleClick = () => {
    if (isSymptomatic) setPersonMobility(id, 'QUARANTINED');
    if (!isSymptomatic) setPersonMobility(id, 'SOCIALLY_DISTANCED');
  };
  return (
    <>
      <PersonCircle
        positionTransition={{ duration: 1 }}
        size={size}
        position={position}
        onClick={handleClick}
        isSymptomatic={isSymptomatic}
        isCured={isCured}
      />
      {personData.mobility === 'SOCIALLY_DISTANCED' && (
        <SociallyDistancedSquare size={size} position={position} {...personData} />
      )}
      {personData.mobility === 'QUARANTINED' && (
        <QuarantinedSquare size={size} position={position} {...personData} />
      )}
    </>
  );
}

const PersonCircle = styled(motion.span)`
  height: ${props => `${props.size}px`};
  width: ${props => `${props.size}px`};
  background-color: ${props =>
    props.isCured ? '#57c1ff' : props.isSymptomatic ? '#448844' : 'white'};
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
  border: 3px dashed #595959;
  box-sizing: border-box;
`;

const QuarantinedSquare = styled.div`
  height: ${props => `${props.size}px`};
  width: ${props => `${props.size}px`};
  position: absolute;
  left: ${props => `${props.position[0]}px`};
  bottom: ${props => `${props.position[1]}px`};
  border: 3px solid black;
  box-sizing: border-box;
`;

export default Person;
