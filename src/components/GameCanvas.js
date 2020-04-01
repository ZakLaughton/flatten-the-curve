import React from 'react';
import Person from './Person';
import { Stage, Layer, Rect, Text, Circle, Line } from 'react-konva';

function GameCanvas() {
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Person />
      </Layer>
    </Stage>
  );
}

export default GameCanvas;
