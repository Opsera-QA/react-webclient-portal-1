import React from "react";
import PropTypes from "prop-types";
import jsPDF from "jspdf";
import ExportDataOverlay from "components/common/modal/export_data/ExportDataOverlay";

function ExportSonarQubeScanDataOverlay({ formattedData, rawData, isLoading }) {
  const getRawData = () => {
    return new Blob([rawData], { type: 'text/plain' });
  };

  const getPdfExporter = () => {
    const pdfExporter = new jsPDF({ orientation: "landscape" });
    pdfExporter.autoTable({
      startY: 2,
      styles: { fontSize: 9, minCellWidth: 19, minCellHeight: 12, valign: 'middle' },
      showHead: "firstPage",
      headStyles: { fontSize: 8, minCellWidth: 19, fillColor: [54, 46, 84] },
      margin: { left: 2, right: 2 },
      head: [["Project", "Severity", "Type", "Line", "Status", "Author", "Component", "Message"]],
      body: formattedData.map(item => [item.project, item.severity, item.type, item.line, item.status, item.author, item?.component.substring(item.component.lastIndexOf('/') + 1), item.message])
    });

    return pdfExporter;
  };

  const getCsvData = () => {
    return [["Project", "Severity", "Type", "Line", "Status", "Author", "Component", "Message"],
    ...formattedData.map(item =>
      [
        item.project,
        item.severity,
        item.type,
        item.line,
        item.status,
        item.author,
        item?.component.substring(item.component.lastIndexOf('/') + 1),
        item.message
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

ExportSonarQubeScanDataOverlay.propTypes = {
  dataToExport: PropTypes.any,
  rawData: PropTypes.any,
  formattedData: PropTypes.any,
  isLoading: PropTypes.bool,
  exportFrom: PropTypes.any,
};

export default ExportSonarQubeScanDataOverlay;
