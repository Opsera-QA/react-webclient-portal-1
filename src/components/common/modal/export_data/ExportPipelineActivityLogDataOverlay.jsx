import React from "react";
import PropTypes from "prop-types";
import ExportDataOverlay from "./ExportDataOverlay";
import jsPDF from "jspdf";
import { format } from "date-fns";



// TODO: Should we be just sending in data and formatting in here?
function ExportPipelineActivityLogDataOverlay({ activityLogData, isLoading}) {
  const getRawData = () => {
    const rawData = Array.isArray(activityLogData) ? activityLogData.map(item => JSON.stringify(item)) : "export failure";
    return new Blob([rawData], {type: 'text/plain'});
  };

  const getFormattedLogData = () => {
    if (!Array.isArray(activityLogData)) {
      return [];
    }

    return activityLogData.map((item) => {
      return ([
        item.run_count,
        item.step_name,
        item.action,
        item.message,
        item.status,
        format(new Date(item.createdAt),
          "yyyy-MM-dd', 'hh:mm:a"),
      ]);
    });
  };

  const getPdfExporter = () => {
    if (!Array.isArray(activityLogData)) {
      return null;
    }

    const pdfExporter = new jsPDF({orientation: "landscape"});
    pdfExporter.autoTable({
      startY: 2,
      styles: {fontSize: 9, minCellWidth: 19, minCellHeight: 12, valign: 'middle'},
      showHead: "firstPage",
      headStyles: {fontSize: 8, minCellWidth: 19, fillColor: [54, 46, 84]},
      columnStyles: {0: {halign: 'center'}},
      margin: {left: 2, right: 2},
      head: [["Run", "Step", "Action", "Message", "Status", "Date"]],
      body: getFormattedLogData(),
    });

    return pdfExporter;
  };

  return (
    <ExportDataOverlay
      isLoading={isLoading}
      getRawData={getRawData}
      getPdfExporter={getPdfExporter}
    />
  );
}

ExportPipelineActivityLogDataOverlay.propTypes = {
  activityLogData: PropTypes.any,
  isLoading: PropTypes.bool,
};

export default ExportPipelineActivityLogDataOverlay;