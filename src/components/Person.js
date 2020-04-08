import React from 'react';
import { motion } from 'framer-motion';

function Person({ gridSize, personData, dispatch, day }) {
  const { id, infectedDay, isCured, location } = personData;
  const isSymptomatic = !isCured && infectedDay >= 0 && day - infectedDay >= 5;
  const handleClick = () => {
    const newMobility = isSymptomatic ? 'QUARANTINED' : 'SOCIALLY_DISTANCED';
    dispatch({ type: 'UPDATE_PERSON_MOBILITY', payload: { id, mobility: newMobility } });
    dispatch({ type: 'INCREMENT_DAY' });
  };

  // ! styled-components slow this movement to a crawl. Don't use them here

  const personStyle = {
    height: `${100 / gridSize}%`,
    width: `${100 / gridSize}%`,
    backgroundColor: isCured ? '#57c1ff' : isSymptomatic ? '#448844' : 'white',
    borderRadius: `50%`,
    position: `absolute`,
    left: `${(100 / gridSize) * location.x}%`,
    bottom: `${(100 / gridSize) * location.y}%`,
    border: '1px solid black',
    // Use to reveal all infected for debugging:
    // border: infectedDay >= 0 ? '3px solid green' : '1px solid black',
    boxSizing: `border-box`,
  };

  const sociallyDistancedSquareStyle = {
    height: `${100 / gridSize}%`,
    width: `${100 / gridSize}%`,
    position: `absolute`,
    left: `${(100 / gridSize) * location.x}%`,
    bottom: `${(100 / gridSize) * location.y}%`,
    border: `3px dashed #595959`,
    boxSizing: `border-box`,
  };

  const quarantinedSquareStyle = {
    height: `${100 / gridSize}%`,
    width: `${100 / gridSize}%`,
    position: `absolute`,
    left: `${(100 / gridSize) * location.x}%`,
    bottom: `${(100 / gridSize) * location.y}%`,
    border: `3px solid black`,
    boxSizing: `border-box`,
  };
  return (
    <>
      <motion.span
        positionTransition={{ duration: 0.4 }}
        style={personStyle}
        onClick={handleClick}
      />
      {personData.mobility === 'SOCIALLY_DISTANCED' && <div style={sociallyDistancedSquareStyle} />}
      {personData.mobility === 'QUARANTINED' && <div style={quarantinedSquareStyle} />}
    </>
  );
}

export default Person;
