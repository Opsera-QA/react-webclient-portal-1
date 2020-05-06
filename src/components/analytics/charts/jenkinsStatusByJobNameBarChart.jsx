import React, { useState }  from "react";
import PropTypes from "prop-types";
import { ResponsiveBar } from "@nivo/bar";
import ErrorDialog from "../../common/error";
import config from "./jenkinsStatusByJobNameBarChartConfigs";
import "./charts.css";
import ModalLogs from "../../common/modalLogs";

function JenkinsStatusByJobNameBarChar( { data, persona } ) {
  const { jenkinsStatusByJobName }  =  data;

  const [showModal, setShowModal] = useState(false);

  if (typeof data !== "object" || Object.keys(data).length == 0 || jenkinsStatusByJobName.status !== 200) {
    return (<ErrorDialog error="No Data is available for this chart at this time." />);
  } else {
    
    return (
      <>
      
        <ModalLogs header="Build Status by Job Name" size="lg" jsonMessage={jenkinsStatusByJobName ? jenkinsStatusByJobName.data : []} dataType="bar" show={showModal} setParentVisibility={setShowModal} />

        <div className="chart-label-text">Jenkins: Build Status by Job Name</div>
        <ResponsiveBar
          data={jenkinsStatusByJobName ? jenkinsStatusByJobName.data : []}
          keys={config.keys}
          indexBy="key"
          onClick={() => setShowModal(true)}
          margin={config.margin}
          padding={0.3}
          layout={"horizontal"}
          colors={{ scheme: "set2" }}
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
          borderWidth={2}
          motionDamping={15}
          tooltip={({ indexValue, color, value, id }) => (
            <div>
              <strong style={{ color }}>
                Build Tag: </strong> {indexValue}<br></br>
              <strong style={{ color }}> {id} Builds: </strong> {value}
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

JenkinsStatusByJobNameBarChar.propTypes = {
  data: PropTypes.object,
  persona: PropTypes.string
};

export default JenkinsStatusByJobNameBarChar;
