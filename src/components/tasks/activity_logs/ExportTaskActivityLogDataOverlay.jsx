import React from "react";
import PropTypes from "prop-types";
import jsPDF from "jspdf";
import { getTaskTypeLabel } from "components/tasks/task.types";
import {DATE_FORMATS, getFormattedDate} from "components/common/fields/date/DateFieldBase";
import ExportDataOverlay from "components/common/modal/export_data/ExportDataOverlay";

function ExportTaskActivityLogDataOverlay({activityLogData, isLoading}) {
  const getRawData = () => {
    const rawData = Array.isArray(activityLogData) ? activityLogData.map(activityLog => JSON.stringify(activityLog)) : "export failure";
    return new Blob([rawData], {type: 'text/plain'});
  };

  const getFormattedActivityLogData = () => {
    if (!Array.isArray(activityLogData)) {
      return [];
    }

    return activityLogData.map((activityLog) => {
      return ([
        activityLog.run_count,
        activityLog.name,
        getTaskTypeLabel(activityLog.type),
        activityLog.log_type,
        activityLog.message,
        activityLog.status,
        getFormattedDate(activityLog.createdAt, DATE_FORMATS.TIMESTAMP_WITHOUT_SECONDS),
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
      head: [["Run", "Task Name", "Type", "Log Type" , "Message", "Status", "Date"]],
      body: getFormattedActivityLogData(),
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

ExportTaskActivityLogDataOverlay.propTypes = {
  activityLogData: PropTypes.any,
  isLoading: PropTypes.bool,
};

export default ExportTaskActivityLogDataOverlay;


