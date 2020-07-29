// Analytics Software Testing, Persona Manager/Developer/Executive, Node Ticket AN-147
import React, { useState } from "react";
// { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
// import { AuthContext } from "../../../contexts/AuthContext";
// import { axiosApiService } from "../../../api/apiService";
// import LoadingDialog from "../../common/loading";
import { ResponsiveBar } from "@nivo/bar";
import config from "./sonarCodeCoverageBarChartConfigs";
import "./charts.css";
import ModalLogs from "../../common/modalLogs";
import InfoDialog from "../../common/info";

function SonarLinesToCoverBarChart({ data, persona }) {
  const [showModal, setShowModal] = useState(false);

  // if (typeof data !== "object" || Object.keys(data).length === 0 || data.status !== 200) {
  //   return <ErrorDialog error="No Data Present in the ES!" />;
  // } else {
  return (
    <>
      <ModalLogs header="Lines to Cover" size="lg" jsonMessage={data ? data.data : []} dataType="bar" show={showModal} setParentVisibility={setShowModal} />

      <div className="chart mb-3" style={{ height: "300px" }}>
        <div className="chart-label-text">Sonar: Lines to Cover</div>
        {(typeof data !== "object" || Object.keys(data).length === 0 || data.status !== 200) ?
          <div className='max-content-width p-5 mt-5' style={{ display: "flex",  justifyContent:"center", alignItems:"center" }}>
            <InfoDialog message="No Data is available for this chart at this time." />
          </div>
          : 
          <ResponsiveBar
            data={data ? data.data : []}
            onClick={() => setShowModal(true)}
            keys={[
              "uncovered_lines",
              "line_coverage"
            ]}
            groupMode="stacked"
            layout="vertical"
            indexBy="buildNum"
            margin={config.margin}
            padding={0.1}
            colors={{ scheme: "set1" }}
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
            //   legends={config.legends}
            tooltip={({ indexValue, value, id, color }) => (
              <div>
                <strong style={{ color }}>
              Build Number: </strong> {indexValue}<br></br>
                <strong style={{ color }}>  {id}: </strong> {value}
              </div>
            )}
            theme={{
              axis: {
                fontSize: "8px"
              },
              tooltip: {
                container: {
                  fontSize: "16px",
                },
              },
            }}
          />
        }
      </div>
    </>
  );
  // }
}

SonarLinesToCoverBarChart.propTypes = {
  data: PropTypes.object,
  persona: PropTypes.string
};

export default SonarLinesToCoverBarChart;