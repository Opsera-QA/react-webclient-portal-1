import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { ResponsiveLine } from "@nivo/line";
import ErrorDialog from "../../common/error";
import config from "./sonarCodeSmellsLineChartConfigs";
import "./charts.css";


function CodeSmellLineChart( { data, persona } ) {
  useEffect( () => {
    
  }, [data]);
  
  if (typeof data !== "object" || Object.keys(data).length == 0) {
    return (<ErrorDialog  error="Missing Data!" />);
  } else {
    const result = data.sonarCodeSmells.data;
    return (
      <>
        <div className="chart-label-text">Sonar: Code Smells</div>
        <ResponsiveLine
          data={result}
          margin={{ top: 50, right: 110, bottom: 65, left: 100 }}
          xScale={{ type: "point" }}
          yScale={{ type: "linear", min: "auto", max: "auto", stacked: true, reverse: false }}
          axisTop={null}
          axisRight={null}
          axisBottom={config.axisBottom}
          colors={{ scheme: "spectral" }}
          axisLeft={config.axisLeft}
          pointSize={10}
          pointBorderWidth={8}
          pointLabel="y"
          pointLabelYOffset={-12}
          useMesh={true}
          lineWidth={3.5}
          theme={{
            tooltip: {
              container: {
                fontSize: "12px",
              },
            },
          }}
        />
      </>
    );
  }
}
CodeSmellLineChart.propTypes = {
  data: PropTypes.object,
  persona: PropTypes.string
};

export default CodeSmellLineChart;
