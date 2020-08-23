import React, { useState } from "react";
import PropTypes from "prop-types";
import { ResponsiveLine } from "@nivo/line";
import ErrorDialog from "../../common/status_notifications/error";
import config from "./sonarMaintainabilityLineChartConfigs";
import "./charts.css";
import ModalLogs from "../../common/modal/modalLogs";


function MaintainabilityLineChart( { data, persona } ) {
  const { sonarMaintainability }  =  data;
  const [showModal, setShowModal] = useState(false);

  if (typeof data !== "object" || Object.keys(data).length === 0 || sonarMaintainability.status !== 200) {
    return (<ErrorDialog error="No Data is available for this chart at this time." />);
  } else {
    return (
      <>
        <ModalLogs header="Maintainability Rating" size="lg" jsonMessage={sonarMaintainability ? sonarMaintainability.data : []} dataType="line" show={showModal} setParentVisibility={setShowModal} />

        <div className="chart-label-text">Sonar: Maintainability Rating</div>
        <ResponsiveLine
          data={sonarMaintainability ? sonarMaintainability.data : []}
          onClick={() => setShowModal(true)}
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
          // legends={config.legends}
          colors={{ scheme: "category10" }}
          tooltip={({ point, color }) => (
            <div style={{
              background: "white",
              padding: "9px 12px",
              border: "1px solid #ccc",
            }}>
              <strong style={{ color }}>
              Timestamp: </strong> {point.data.x}<br></br>
              <strong style={{ color }}>  QualityGate Value: </strong> {point.data.y}
            </div>
          )}
          theme={{
            axis: {
              ticks: {
                text: {
                  fontSize: "10px"
                }
              }
            },
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
MaintainabilityLineChart.propTypes = {
  data: PropTypes.object,
  persona: PropTypes.string
};

export default MaintainabilityLineChart;
