import React from "react";
import PropTypes from "prop-types";
import { ResponsiveBar } from "@nivo/bar";
import ErrorDialog from "../../common/error";
import config from "./avgBuildsByUserBarChartConfigs";
import "./charts.css";

function AvgBuildsByUserBarChart( { data, persona } ) {
  
  if (typeof data !== "object" || Object.keys(data).length == 0) {
    return (<ErrorDialog error="Missing Data!" />);
  } else {
    const { avgBuildDurationByUser }  =  data;
    return (
      <>
        <div className="chart-label-text">Jenkins: Average Build Duration by User</div>
        <ResponsiveBar
          data={avgBuildDurationByUser ? avgBuildDurationByUser.data : []}
          keys={config.keys}
          indexBy="key"
          margin={config.margin}
          padding={0.3}
          layout={"horizontal"}
          colors={{ scheme: "spectral" }}
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
          borderWidth={2}
          motionDamping={15}
          tooltip={({ indexValue, value, color }) => (
            <div>
              <strong style={{ color }}>
                User: </strong> {indexValue}<br></br>
              <strong style={{ color }}>  No. of Builds: </strong> {value} Builds
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

AvgBuildsByUserBarChart.propTypes = {
  data: PropTypes.array,
  persona: PropTypes.string
};

export default AvgBuildsByUserBarChart;
