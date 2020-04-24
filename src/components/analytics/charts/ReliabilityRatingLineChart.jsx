import React from "react";
import PropTypes from "prop-types";
import { ResponsiveLine } from "@nivo/line";
import ErrorDialog from "../../common/error";
import config from "./ReliabilityRatingLineChartConfigs";
import "./charts.css";


function ReliabilityRatingLineChart( { data, persona } ) {

  if (typeof data !== "object" || Object.keys(data).length == 0) {
    return (<ErrorDialog  error="No Data Present in the ES!" />);
  } else {
    const { reliability_rating }  =  data;
    return (
      <>
        <div className="chart mb-3" style={{ height: "300px" }}>
          <div className="chart-label-text">Sonar: Reliability Rating</div>
          {/* additional check */}
          {reliability_rating.status != "200" ? <><br></br><ErrorDialog  error="Something went wrong!" /></> :
            <ResponsiveLine
              data={reliability_rating && typeof(reliability_rating.data) === "object" ? reliability_rating.data : []}
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
                  <strong style={{ color }}>  Rating: </strong> {point.data.y === 1 && <>A</>} {point.data.y === 2 && <>B</>} {point.data.y === 3 && <>C</>}  {point.data.y === 4 && <>D</>}  {point.data.y === 5 && <>E</>} <br></br>
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
          }</div>
      </>
    );
  }
}
ReliabilityRatingLineChart.propTypes = {
  data: PropTypes.object,
  persona: PropTypes.string
};

export default ReliabilityRatingLineChart;
