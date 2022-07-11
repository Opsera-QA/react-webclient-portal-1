import React from "react";
import PropTypes from "prop-types";
import ExportDataModalBase from "components/common/modal/export_data/ExportDataModalBase";
import jsPDF from "jspdf";
import { getTaskTypeLabel } from "components/tasks/task.types";
import { format } from "date-fns";

function ExportTaskActivityLogDataModal({showModal, closeModal, activityLogData, isLoading}) {
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
        format(new Date(activityLog.createdAt), "yyyy-MM-dd', 'hh:mm a"),
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
    <ExportDataModalBase
      showModal={showModal}
      handleCancelModal={closeModal}
      isLoading={isLoading}
      getRawData={getRawData}
      getPdfExporter={getPdfExporter}
    />
  );
}

ExportTaskActivityLogDataModal.propTypes = {
  showModal: PropTypes.bool,
  closeModal: PropTypes.func.isRequired,
  dataToExport: PropTypes.any,
  activityLogData: PropTypes.any,
  isLoading: PropTypes.bool,
  exportFrom: PropTypes.any,
};

export default ExportTaskActivityLogDataModal;


