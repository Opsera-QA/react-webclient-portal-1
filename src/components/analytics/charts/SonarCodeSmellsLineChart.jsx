import React, { useState } from "react";
import PropTypes from "prop-types";
import { ResponsiveLine } from "@nivo/line";
import ErrorDialog from "../../common/status_notifications/error";
import "./charts.css";
import ModalLogs from "../../common/modal/modalLogs";
import InfoDialog from "../../common/status_notifications/info";
import { defaultConfig, getColor, assignStandardColors } from '../../insights/charts/charts-views';
import ChartTooltip from '../../insights/charts/ChartTooltip';

function CodeSmellLineChart({ data, persona }) {
  const { sonarCodeSmells } = data;
  const [showModal, setShowModal] = useState(false);
  assignStandardColors(sonarCodeSmells?.data, true);

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
            {...defaultConfig("Code Smells", "Date", false, true, "wholeNumbers", "yearMonthDate")}
            onClick={() => setShowModal(true)}
            colors={getColor}
            tooltip={({ point, color }) => <ChartTooltip 
                      titles={["Timestamp", "Code Smells", "Key"]}
                      values={[point.data.x, point.data.y, point.data.key]}
                      color = {color} />}
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
