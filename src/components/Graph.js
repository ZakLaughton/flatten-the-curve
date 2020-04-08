import React from 'react';
import {
  XYPlot,
  AreaSeries,
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalGridLines,
  LineSeries,
} from 'react-vis';
export const Graph = ({ infectedPeopleData, totalPeopleCount, day }) => {
  const yDomain = [0, totalPeopleCount];
  const xDomain = [0, day];
  const setXTickValues = () => {
    let tickArray = [0];
    for (let i = 0; i < day; i++) {
      if (i % 5 === 0) {
        tickArray.push(i);
      }
    }
    return tickArray;
  };
  const xTickValues = setXTickValues();
  const setYTickValues = () => {
    const percentageArray = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];
    let tickArray = [];
    for (let percentage of percentageArray) {
      tickArray.push(percentage * totalPeopleCount);
    }
    return tickArray;
  };
  const yTickValues = setYTickValues();

  return (
    <XYPlot
      animation
      stackBy='y'
      height={400}
      width={400}
      yDomain={yDomain}
      xDomain={xDomain}
      curve='curveCardinal'
    >
      <VerticalGridLines />
      <HorizontalGridLines />
      <XAxis
        animation
        attr='x'
        attrAxis='y'
        orientation='bottom'
        tickValues={xTickValues}
        tickFormat={(n) => n}
        title='days'
        position='end'
      />
      <YAxis
        title='% infected'
        position='end'
        animation
        attr='y'
        attrAxis='x'
        orientation='left'
        tickValues={yTickValues}
        tickFormat={(n) => (n / totalPeopleCount) * 100}
      />
      <AreaSeries animation data={infectedPeopleData} opacity={0.5} style={{}} color='red' />
    </XYPlot>
  );
};

export default Graph;
