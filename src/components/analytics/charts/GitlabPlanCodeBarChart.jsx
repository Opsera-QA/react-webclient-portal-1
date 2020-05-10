// Ticket Number - AN 124 & 125 Plan and Code from gitlab data
// Worked on By - Syed Faseeh Uddin
// Sprint - Analytics Mt. Rainier
// Persona - Developer/Manager/Executive

import PropTypes from "prop-types";
import { ResponsiveBar } from "@nivo/bar";
import ErrorDialog from "../../common/error";
import config from "./GitlabPlanCodeBarChartConfigs";
import "./charts.css";
import React, { useState } from "react";
import LoadingDialog from "../../common/loading";
import InfoDialog from "../../common/info";
import ModalLogs from "../../common/modalLogs";

function GitlabPlanCodeBarChart( { persona, data } ) {
  const [error, setErrors] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  if(loading) {
    return (<LoadingDialog size="sm" />);
  } else if (error) {
    return (<ErrorDialog  error={error} />);
  // } else if (typeof data !== "object" || Object.keys(data).length == 0 || data.status !== 200) {
  //   return (<ErrorDialog error="No Data is available for this chart at this time." />);
  } else {
    const stackKeys = ["planTime", "codeTime"];
    return (
      <>
        <ModalLogs header="Deployments Graph" size="lg" jsonMessage={data.graph} dataType="bar" show={showModal} setParentVisibility={setShowModal} />
              
        <div className="chart mb-3" style={{ height: "300px" }}>
          <div className="chart-label-text">Gitlab: Plan and Code Graph, Project: {data.projectDetails._source.project.name}</div>
          {(typeof data.graph !== "object" || Object.keys(data.graph).length == 0) ?
            <div className='max-content-width p-5 mt-5' style={{ display: "flex",  justifyContent:"center", alignItems:"center" }}>
              <InfoDialog message="No Data is available for this chart at this time." />
            </div>
            :
            <ResponsiveBar
              data={data && data.graph ? data.graph : []}
              onClick={() => setShowModal(true)}
              keys={config.keys}
              indexBy="branch"
              margin={{ top: 40, right: 110, bottom: 70, left: 100 }}
              xScale={{ type: "point" }}
              yScale={{ type: "linear", min: "auto", max: "auto", stacked: false, reverse: false }}
              axisTop={null}
              axisRight={null}
              enableLabel={false}
              axisBottom={config.axisBottom}
              axisLeft={config.axisLeft}
              pointSize={10}
              pointBorderWidth={8}
              pointLabel="y"
              pointLabelYOffset={-12}
              useMesh={true}
              lineWidth={3.5}
              legends={config.legends}
              padding={0.3}
              // layout={"horizontal"}
              colors={({ id, data }) => data[`${id}_color`]}
              borderColor={{ theme: "background" }}
              colorBy="id"
              defs={config.defs}
              fill={config.fill}
              theme={{
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
  }
}

GitlabPlanCodeBarChart.propTypes = {
  persona: PropTypes.string,
  data : PropTypes.Object
};

export default GitlabPlanCodeBarChart;