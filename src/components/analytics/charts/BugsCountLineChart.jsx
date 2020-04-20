import React from "react";
import PropTypes from "prop-types";
import { ResponsiveLine } from "@nivo/line";
import ErrorDialog from "../../common/error";
import config from "./BugsCountLineChartConfigs";
import "./charts.css";


function BugsCountLineChart( { data, persona } ) {

  if (typeof data !== "object" || Object.keys(data).length == 0) {
    return (<ErrorDialog  error="No Data Present in the ES!" />);
  } else {
    const { bugs }  =  data;
    return (
      <>
        <div className="chart-label-text">Sonar: Bugs Count</div>
        {bugs.status != "200" ? <><br></br><ErrorDialog  error="Something went wrong!" /></> :
          <ResponsiveLine
            data={bugs && typeof(bugs.data) === "object" ? bugs.data : []}
            margin={{ top: 40, right: 110, bottom: 70, left: 100 }}
            xScale={{ type: "point" }}
            yScale={{ type: "linear", min: "auto", max: "auto", stacked: true, reverse: false }}
            axisTop={null}
            axisRight={null}
            axisBottom={config.axisBottom}
            axisLeft={config.axisLeft}
            pointSize={10}
            pointBorderWidth={8}
            pointLabel="y"
            pointLabelYOffset={-12}
            useMesh={true}
            lineWidth={3.5}
            colors={{ scheme: "category10" }}
            tooltip={({ point, color }) => (
              <div style={{
                background: "white",
                padding: "9px 12px",
                border: "1px solid #ccc",
              }}>
                <strong style={{ color }}>
              Date: </strong> {new Date(point.data.x).toLocaleString()}<br></br>
                <strong style={{ color }}>  Bugs: </strong> {point.data.y}<br></br>
                <strong style={{ color }}>  Build Number: </strong> {point.data.buildNumber}
              </div>
            )}
            theme={{
              tooltip: {
                container: {
                  fontSize: "16px",
                },
              },
            }}
          />
        }
      </>
    );
  }
}
BugsCountLineChart.propTypes = {
  data: PropTypes.object,
  persona: PropTypes.string
};

export default BugsCountLineChart;
