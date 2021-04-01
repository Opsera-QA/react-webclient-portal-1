import React, { useState } from "react";
import PropTypes from "prop-types";
import { ResponsiveLine } from "@nivo/line";
import "./charts.css";
import ModalLogs from "../../common/modal/modalLogs";
import InfoDialog from "../../common/status_notifications/info";
import { defaultConfig, getColor, assignStandardColors } from '../../insights/charts/charts-views';
import ChartTooltip from '../../insights/charts/ChartTooltip';

function MaintainabilityLineChart({ data, persona }) {
  const { sonarMaintainability } = data;
  const [showModal, setShowModal] = useState(false);
  assignStandardColors(sonarMaintainability?.data, true);

  return (
    <>
      <ModalLogs
        header="Maintainability Rating"
        size="lg"
        jsonMessage={sonarMaintainability ? sonarMaintainability.data : []}
        dataType="line"
        show={showModal}
        setParentVisibility={setShowModal}
      />

      <div className="chart mb-3" style={{ height: "300px" }}>
        <div className="chart-label-text">Sonar: Maintainability Rating</div>
        {typeof data !== "object" || Object.keys(data).length === 0 || sonarMaintainability.status !== 200 ? (
          <div
            className="max-content-width p-5 mt-5"
            style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
          >
            <InfoDialog message="No Data is available for this chart at this time." />
          </div>
        ) : (
          <ResponsiveLine
            data={sonarMaintainability ? sonarMaintainability.data : []}
            {...defaultConfig("Average Quality Gate Value", "Date", 
                                false, true, "wholeNumbers", "yearMonthDate")}
            onClick={() => setShowModal(true)}
            colors={getColor}
            keys={["Maintainability Rating", ""]}
            tooltip={({ point, color }) => <ChartTooltip 
                      titles={["Timestamp", "SQALE", "Key"]}
                      values={[point.data.x, point.data.y, point.data.key]}
                      color = {color} />}
          />
        )}
      </div>
    </>
  );
}
MaintainabilityLineChart.propTypes = {
  data: PropTypes.array,
  persona: PropTypes.string,
};

export default MaintainabilityLineChart;
