import React from "react";
import PropTypes from "prop-types";
import { ResponsiveBar } from "@nivo/bar";
import ErrorDialog from "../../common/error";
import config from "./avgBuildDurationBarChartConfigs";
import "./charts.css";


function AvgBuildDurationBarChart( { data, persona } ) {
  
  if (typeof data !== "object" || Object.keys(data).length == 0) {
    return (<ErrorDialog  error="Missing Data!" />);
  } else {
    const { avgBuildDuration }  =  data;
    return (
      <>
        <div className="chart-label-text">Jenkins: Average Build Duration</div>
        <ResponsiveBar
          data={avgBuildDuration ? avgBuildDuration.data : []}
          keys={config.keys}
          layout="vertical"
          indexBy="key"
          margin={config.margin}
          padding={0.3}
          colors={{ scheme: "category10" }}
          borderColor={{ theme: "background" }}
          colorBy="id"
          defs={config.defs}
          fill={config.fill}
          axisTop={null}
          axisRight={null}
          axisBottom={config.axisBottom}
          axisLeft={config.axisLeft}
          enableLabel={false}
          borderRadius={5}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor="inherit:darker(2)"
          animate={true}
          motionStiffness={90}
          motionDamping={15}
          // legends={config.legends}
          tooltip={({ indexValue, value, color }) => (
            <div>
              <strong style={{ color }}>
              User: </strong> {indexValue}<br></br>
              <strong style={{ color }}>  Average Duration: </strong> {value} minutes
            </div>
          )}
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

AvgBuildDurationBarChart.propTypes = {
  data: PropTypes.object,
  persona: PropTypes.string
};

export default AvgBuildDurationBarChart;

