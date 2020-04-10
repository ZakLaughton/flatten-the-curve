import React from "react";
import { VictoryArea, VictoryChart } from "victory";

export const Graph = ({ historicalInfectedCount, totalPeopleCount }) => {
  return (
    <VictoryChart>
      <VictoryArea
        interpolation='cardinal'
        data={historicalInfectedCount}
        x='day'
        y='count'
        animate={{ duration: 300 }}
        style={{ data: { fill: `rgba(255, 0, 0, 0.6)` } }}
        domain={{ y: [0, totalPeopleCount] }}
      ></VictoryArea>
    </VictoryChart>
  );
};

export default Graph;
