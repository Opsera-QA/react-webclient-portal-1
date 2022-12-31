import React from "react";
import PropTypes from "prop-types";
import jsPDF from "jspdf";
import ExportDataOverlay from "components/common/modal/export_data/ExportDataOverlay";

function ExportCoverityScanDataOverlay({ formattedData, rawData, isLoading }) {
  const getRawData = () => {
    return new Blob([rawData], { type: 'text/plain' });
  };

  const getPdfExporter = () => {
    const pdfExporter = new jsPDF({ orientation: "landscape" });
    pdfExporter.autoTable({
      startY: 2,
      styles: { fontSize: 8, minCellWidth: 24, minCellHeight: 12, valign: 'middle' },
      showHead: "firstPage",
      headStyles: { fontSize: 8, minCellWidth: 24, fillColor: [54, 46, 84] },
      margin: { left: 2, right: 2 },
      head: [["Project", "Severity", "Owner", "Issue Category", "Issue Type", "Action", "Status", "Date", "File"]],
      body: formattedData.map(item => [item.project, item.severity, item.owner, item.issue_category, item.issue_type, item.action, item.status, item.date, item.file])
    });

    return pdfExporter;
  };

  const getCsvData = () => {
    return [["Project", "Severity", "Owner", "Issue Category", "Issue Type", "Action", "Status", "Date", "File"],
    ...formattedData.map(item =>
      [
        item.project,
        item.severity,
        item.owner,
        item.issue_category,
        item.issue_type,
        item.action,
        item.status,
        item.date,
        item.file
      ]
    )];
  };

  return (
    <ExportDataOverlay
      isLoading={isLoading}
      getRawData={getRawData}
      getPdfExporter={getPdfExporter}
      getCsvData={getCsvData}
    />
  );
}

ExportCoverityScanDataOverlay.propTypes = {
  dataToExport: PropTypes.any,
  rawData: PropTypes.any,
  formattedData: PropTypes.any,
  isLoading: PropTypes.bool,
  exportFrom: PropTypes.any,
};

export default ExportCoverityScanDataOverlay;
