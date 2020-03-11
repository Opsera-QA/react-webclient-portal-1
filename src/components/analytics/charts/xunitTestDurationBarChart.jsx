import React from "react";
import PropTypes from "prop-types";
import { ResponsiveBar } from "@nivo/bar";
import ErrorDialog from "../../common/error";
import config from "./xunitTestDurationBarChartConfigs";
import "./charts.css";


function XUnitTestDurationBarChart( { data, persona } ) {
  
  if (typeof data !== "object" || Object.keys(data).length == 0) {
    return (<ErrorDialog  error="Missing Data!" />);
  } else {
    const { xunitTestDuration }  =  data;
    return (
      <>
        <div className="chart-label-text">X Unit: Maximum Test Durations</div>
        <ResponsiveBar
          data={xunitTestDuration ? xunitTestDuration.data : []}
          keys={config.keys}
          groupMode="stacked"
          layout="vertical"
          indexBy="buildId"
          margin={config.margin}
          padding={0.3}
          colors={{ scheme: "nivo" }}
          borderColor={{ theme: "background" }}
          colorBy="id"
          defs={config.defs}
          fill={config.fill}
          axisTop={null}
          axisRight={null}
          axisBottom={config.axisBottom}
          axisLeft={config.axisLeft}
          enableLabel={false}
          borderRadius={0}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor="inherit:darker(2)"
          animate={true}
          motionStiffness={90}
          motionDamping={15}
          // legends={config.legends}
          tooltip={({ indexValue, value, id, color }) => (
            <div>
              <strong style={{ color }}>
              Build Number: </strong> {indexValue}<br></br>
              <strong style={{ color }}> Test Name:  </strong> {id} <br></br>
              <strong style = {{ color }}> Duration: </strong> {value} Seconds
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
      </>
    );
  }
}

XUnitTestDurationBarChart.propTypes = {
  data: PropTypes.object,
  persona: PropTypes.string
};

export default XUnitTestDurationBarChart;

