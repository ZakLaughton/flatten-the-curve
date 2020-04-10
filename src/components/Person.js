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

  const cellSizeInPercent = 100 / gridSize

  // ! styled-components slow this movement to a crawl. Don't use them here

  const personStyle = {
    height: `${cellSizeInPercent}%`,
    width: `${cellSizeInPercent}%`,
    backgroundColor: isCured ? '#57c1ff' : isSymptomatic ? '#448844' : 'white',
    borderRadius: `50%`,
    position: `absolute`,
    left: `${(cellSizeInPercent) * location.x}%`,
    bottom: `${(cellSizeInPercent) * location.y}%`,
    border: '1px solid black',
    // Use to reveal all infected for debugging:
    // border: infectedDay >= 0 ? '3px solid green' : '1px solid black',
    boxSizing: `border-box`,
  };

  const sociallyDistancedSquareStyle = {
    height: `${cellSizeInPercent}%`,
    width: `${cellSizeInPercent}%`,
    position: `absolute`,
    left: `${(cellSizeInPercent) * location.x}%`,
    bottom: `${(cellSizeInPercent) * location.y}%`,
    border: `3px dashed #595959`,
    boxSizing: `border-box`,
  };

  const quarantinedSquareStyle = {
    height: `${cellSizeInPercent}%`,
    width: `${cellSizeInPercent}%`,
    position: `absolute`,
    left: `${(cellSizeInPercent) * location.x}%`,
    bottom: `${(cellSizeInPercent) * location.y}%`,
    border: `3px ridge #4c0000`,
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
      {personData.mobility === 'QUARANTINED' && <div style={quarantinedSquareStyle}></div>}
    </>
  );
}

export default Person;
