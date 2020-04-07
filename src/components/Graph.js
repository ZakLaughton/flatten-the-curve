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
export const Graph = ({ infectedPeopleData, totalPeopleCount }) => {
  const yDomain = [0, totalPeopleCount];
  return (
    <XYPlot stackBy='y' height={400} width={400} xDomain={[0, 50]} yDomain={yDomain}>
      <VerticalGridLines />
      <HorizontalGridLines />
      <XAxis title='days' position='end' />
      <YAxis title='infected' position='end' />
      <XAxis attr='x' attrAxis='y' orientation='bottom' tickTotal={10} />
      <YAxis attr='y' attrAxis='x' orientation='left' />
      <AreaSeries animation data={infectedPeopleData} opacity={0.5} style={{}} color='red' />
    </XYPlot>
  );
};

export default Graph;
