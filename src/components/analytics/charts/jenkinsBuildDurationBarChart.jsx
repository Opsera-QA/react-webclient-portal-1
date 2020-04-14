import React from "react";
import PropTypes from "prop-types";
import { ResponsiveBar } from "@nivo/bar";
import ErrorDialog from "../../common/error";
import config from "./jenkinsBuildDurationBarChartConfigs";
import "./charts.css";


function JenkinsBuildDurationBarChart( { data, persona } ) {
  const { jenkinsBuildDuration }  =  data;

  if (typeof data !== "object" || Object.keys(data).length == 0 || jenkinsBuildDuration.status !== 200) {
    return (<ErrorDialog error="No Data is available for this chart at this time." />);
  } else {
    
    return (
      <>
        <div className="chart-label-text">Jenkins: Build Duration</div>
        <ResponsiveBar
          data={jenkinsBuildDuration ? jenkinsBuildDuration.data : []}
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
          tooltip={({ data, value, color }) => (
            <div>
              <strong style={{ color }}>  Duration: </strong> {value} minutes <br></br>
              <strong style={{ color }}>  Build Number: </strong> {data.buildNum} <br></br>
              <strong style={{ color }}>  Job Name: </strong> {data.jobName} <br></br>
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

JenkinsBuildDurationBarChart.propTypes = {
  data: PropTypes.object,
  persona: PropTypes.string
};

export default JenkinsBuildDurationBarChart;

