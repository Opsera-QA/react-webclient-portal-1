import React from "react";
import PropTypes from "prop-types";
import { ResponsiveScatterPlot } from "@nivo/scatterplot";
import ErrorDialog from "../../common/error";
import "./charts.css";


function SonarCodeCoverageScatterChart( { data, persona } ) {
  
  if (typeof data !== "object" || Object.keys(data).length == 0) {
    return (<ErrorDialog  error="No Data Present in the ES!" />);
  } else {
    const { sonarCodeCoverage2 }  =  data;
    return (
      <>
        <div className="chart-label-text">Sonar: Code Coverage</div>
        <ResponsiveScatterPlot
          data={sonarCodeCoverage2 ? sonarCodeCoverage2.data : []}
          margin={{ top: 60, right: 140, bottom: 70, left: 90 }}
          xScale={{ type: "linear", min: 0, max: "auto" }}
          yScale={{ type: "linear", min: 0, max: "auto" }}
          nodeSize={function(data) {return (Math.max(10, Math.round(data.size*50))); }}
          blendMode="multiply"
          tooltip={({ node, color }) => (
            <div style={{
              background: "white",
              padding: "9px 12px",
              border: "1px solid #ccc",
            }}>
              <strong style={{ color }}> Timestamp: </strong> {node.id.split("T")[0] + " " + node.id.split("T")[1].split(".")[0]}<br></br>
              <strong style={{ color }}> Complexity: </strong> {node.data.x}<br></br>
              <strong style={{ color }}> Coverage: </strong> {node.data.y} %<br></br>
              <strong style={{ color }}> Uncovered Lines: </strong> {node.data.uncovered}<br></br>
            </div>
          )}
          theme={{
            tooltip: {
              container: {
                fontSize: "16px",
              },
            },
          }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            orient: "bottom",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Complexity",
            legendPosition: "middle",
            legendOffset: 46
          }}
          axisLeft={{
            orient: "left",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Coverage %",
            legendPosition: "middle",
            legendOffset: -60
          }}
          // legends={[
          //   {
          //     anchor: "bottom-right",
          //     direction: "column",
          //     justify: false,
          //     translateX: 130,
          //     translateY: 0,
          //     itemWidth: 60,
          //     itemHeight: 8,
          //     itemsSpacing: 5,
          //     itemDirection: "left-to-right",
          //     symbolSize: 12,
          //     symbolShape: "circle",
          //     effects: [
          //       {
          //         on: "hover",
          //         style: {
          //           itemOpacity: 1
          //         }
          //       }
          //     ]
          //   }
          // ]}
        />
      </>
    );
  }
}

SonarCodeCoverageScatterChart.propTypes = {
  data: PropTypes.object,
  persona: PropTypes.string
};

export default SonarCodeCoverageScatterChart;

