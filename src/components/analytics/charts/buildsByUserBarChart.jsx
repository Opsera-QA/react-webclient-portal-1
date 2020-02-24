import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { ResponsiveBar } from "@nivo/bar";
import ErrorDialog from "../../common/error";
import config from "./buildsByUserBarChartConfigs";
import "./charts.css";


function BuildsByUserBarChart({ data, persona }) {
  useEffect(() => {

  }, [data]);


  if (typeof data !== "object" || Object.keys(data).length == 0) {
    return (<ErrorDialog error="Missing Data!" />);
  } else {
    const result = data.buildsByUser.data;
    return (
      <>
        <div className="chart-label-text">Jenkins: Builds by User</div>
        <ResponsiveBar
          data={result}
          keys={config.keys}
          indexBy="key"
          margin={config.margin}
          padding={0.3}
          layout={"horizontal"}
          colors={{ scheme: "dark2" }}
          borderColor={{ theme: "background" }}
          colorBy="id"
          defs={config.defs}
          fill={config.fill}
          axisTop={null}
          axisRight={null}
          axisBottom={config.axisBottom}
          axisLeft={config.axisLeft}
          labelSkipWidth={12}
          labelSkipHeight={12}
          enableLabel={false}
          borderRadius={5}
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
BuildsByUserBarChart.propTypes = {
  data: PropTypes.object,
  persona: PropTypes.string
};

export default BuildsByUserBarChart;
