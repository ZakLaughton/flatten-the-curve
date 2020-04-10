import React from "react";
import { VictoryArea, VictoryChart, VictoryContainer } from "victory";

export const Graph = ({ historicalInfectedCount, totalPeopleCount }) => {
  return (
    <VictoryArea
      interpolation='cardinal'
      data={historicalInfectedCount}
      width={700}
      height={700}
      x='day'
      y='count'
      containerComponent={<VictoryContainer responsive={false} />}
      animate={{ duration: 300 }}
      style={{ data: { fill: `rgba(255, 0, 0, 0.6)` } }}
      domain={{ y: [0, totalPeopleCount] }}
      padding={0}
    ></VictoryArea>
  );
};

export default Graph;
