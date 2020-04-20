import React from "react";
import PropTypes from "prop-types";
import { ResponsiveLine } from "@nivo/line";
import ErrorDialog from "../../common/error";
import config from "./NewBugsCountLineChartConfigs";
import "./charts.css";


function NewBugsCountLineChart( { data, persona } ) {

  if (typeof data !== "object" || Object.keys(data).length == 0) {
    return (<ErrorDialog  error="No Data Present in the ES!" />);
  } else {
    const { new_bugs }  =  data;
    return (
      <>
        <div className="chart-label-text">Sonar: New Bugs Count</div>
        {/* additional check */}
        {new_bugs.status != "200" ? <><br></br><ErrorDialog  error="Something went wrong!" /></> :
          <ResponsiveLine
            data={new_bugs && typeof(new_bugs.data) === "object" ? new_bugs.data : []}
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
            Build Number: </strong> {point.data.x}<br></br>
                <strong style={{ color }}>  Bugs: </strong> {point.data.y}<br></br>
                <strong style={{ color }}>  Revision: </strong> {point.data.revision}
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
NewBugsCountLineChart.propTypes = {
  data: PropTypes.object,
  persona: PropTypes.string
};

export default NewBugsCountLineChart;
