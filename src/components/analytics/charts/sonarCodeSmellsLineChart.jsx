import React from "react";
import PropTypes from "prop-types";
import { ResponsiveLine } from "@nivo/line";
import ErrorDialog from "../../common/error";
import config from "./sonarCodeSmellsLineChartConfigs";
import "./charts.css";
import InfoDialog from "../../common/info";


function CodeSmellLineChart( { data, persona } ) {
  const { sonarCodeSmells }  =  data;

  if (typeof data !== "object" || Object.keys(data).length == 0 || sonarCodeSmells.status !== 200) {
    return (<ErrorDialog error="No Data is available for this chart at this time." />);
  } else {
    return (
      <>
        <div className="chart-label-text">Sonar: Code Smells</div>
        <ResponsiveLine
          data={sonarCodeSmells ? sonarCodeSmells.data : []}
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
          tooltip={({ point, color }) => (
            <div style={{
              background: "white",
              padding: "9px 12px",
              border: "1px solid #ccc",
            }}>
              <strong style={{ color }}>
              Timestamp: </strong> {point.data.x}<br></br>
              <strong style={{ color }}>  Code Smells: </strong> {point.data.y}
            </div>
          )}
          theme={{
            axis: {
              ticks: {
                text: {
                  fontSize: "10px"
                }
              }
            },
            tooltip: {
              container: {
                fontSize: "16px",
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
