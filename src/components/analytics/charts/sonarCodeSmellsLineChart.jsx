import React, { useState } from "react";
import PropTypes from "prop-types";
import { ResponsiveLine } from "@nivo/line";
import ErrorDialog from "../../common/status_notifications/error";
import config from "./sonarCodeSmellsLineChartConfigs";
import "./charts.css";
import ModalLogs from "../../common/modal/modalLogs";
import InfoDialog from "../../common/status_notifications/info";

function CodeSmellLineChart({ data, persona }) {
  const { sonarCodeSmells } = data;
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <ModalLogs
        header="Code Smells"
        size="lg"
        jsonMessage={sonarCodeSmells ? sonarCodeSmells.data : []}
        dataType="line"
        show={showModal}
        setParentVisibility={setShowModal}
      />

      <div className="chart mb-3" style={{ height: "300px" }}>
        <div className="chart-label-text">Sonar: Code Smells</div>
        {typeof data !== "object" || Object.keys(data).length === 0 || sonarCodeSmells.status !== 200 ? (
          <div
            className="max-content-width p-5 mt-5"
            style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
          >
            <InfoDialog message="No Data is available for this chart at this time." />
          </div>
        ) : (
          <ResponsiveLine
            data={sonarCodeSmells ? sonarCodeSmells.data : []}
            onClick={() => setShowModal(true)}
            margin={{ top: 50, right: 110, bottom: 65, left: 100 }}
            xScale={{ type: "point" }}
            yScale={{ type: "linear", min: "auto", max: "auto", stacked: true, reverse: false }}
            axisTop={null}
            axisRight={null}
            axisBottom={config.axisBottom}
            colors={{ scheme: "spectral" }}
            axisLeft={config.axisLeft}
            pointSize={10}
            pointBorderWidth={8}
            pointLabel="y"
            pointLabelYOffset={-12}
            useMesh={true}
            lineWidth={3.5}
            legends={config.legends}
            tooltip={({ point, color }) => (
              <div
                style={{
                  background: "white",
                  padding: "9px 12px",
                  border: "1px solid #ccc",
                }}
              >
                <strong style={{ color }}>Timestamp: </strong> {point.data.x}
                <br></br>
                <strong style={{ color }}> Code Smells: </strong> {point.data.y}<br></br>
                <strong style={{ color }}> Key: </strong> {point.data.key}
              </div>
            )}
            theme={{
              axis: {
                ticks: {
                  text: {
                    fontSize: "10px",
                  },
                },
              },
              tooltip: {
                container: {
                  fontSize: "16px",
                },
              },
            }}
          />
        )}
      </div>
    </>
  );
}

CodeSmellLineChart.propTypes = {
  data: PropTypes.array,
  persona: PropTypes.string,
};

export default CodeSmellLineChart;
