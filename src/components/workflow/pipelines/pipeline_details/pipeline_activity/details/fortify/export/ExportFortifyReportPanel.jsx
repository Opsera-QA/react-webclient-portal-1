import React from "react";
import PropTypes from "prop-types";
import jsPDF from "jspdf";
import ExportDataPanel from "components/common/modal/export_data/ExportDataPanel";

export default function ExportFortifyReportPanel({
  showExportPanel,
  setShowExportPanel,
  fortifyData,
  isLoading,
}) {
  const getRawData = () => {
    const rawData = Array.isArray(fortifyData)
      ? fortifyData?.map((item) => JSON.stringify(item))
      : "export failure";
    return new Blob([rawData], { type: "text/plain" });
  };

  const getPdfExporter = () => {
    const pdfExporter = new jsPDF({ orientation: "landscape" });
    pdfExporter.autoTable({
      startY: 2,
      styles: {
        fontSize: 9,
        minCellWidth: 19,
        minCellHeight: 12,
        valign: "middle",
      },
      showHead: "firstPage",
      headStyles: { fontSize: 8, minCellWidth: 19, fillColor: [54, 46, 84] },
      margin: { left: 2, right: 2 },
      head: [["File Name", "File Path", "Line Number", "Category", "Severity", "Status"]],
      body: fortifyData.map((item) => [
        item.fileName,
        item.filePath,
        item.lineNumber,
        item.category,
        item.severity,
        item.status,
      ]),
    });

    return pdfExporter;
  };

  const getCsvData = () => {
    return [
      ["File Name", "File Path", "Line Number", "Category", "Severity", "Status"],
      ...fortifyData.map((item) => [
        item.fileName,
        item.filePath,
        item.lineNumber,
        item.category,
        item.severity,
        item.status,
      ]),
    ];
  };

  if (fortifyData == null || !Array.isArray(fortifyData)) {
    return null;
  }

  return (
    <ExportDataPanel
      isLoading={isLoading}
      getRawData={getRawData}
      getCsvData={getCsvData}
      getPdfExporter={getPdfExporter}
      closePanelFunction={() => setShowExportPanel(!showExportPanel)}
    />
  );
}

ExportFortifyReportPanel.propTypes = {
  showExportPanel: PropTypes.bool,
  setShowExportPanel: PropTypes.func,
  fortifyData: PropTypes.any,
  isLoading: PropTypes.bool,
};
