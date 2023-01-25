import React from "react";
import PropTypes from "prop-types";
import jsPDF from "jspdf";
import ExportDataPanel from "components/common/modal/export_data/ExportDataPanel";

export default function ExportSnykSastReportPanel({
  showExportPanel,
  setShowExportPanel,
  sastScanReport,
  isLoading,
}) {
  const getRawData = () => {
    const rawData = Array.isArray(sastScanReport)
      ? sastScanReport?.map((item) => JSON.stringify(item))
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
      head: [
        [
          "id",
          "Severity",
          "Category",
          "Categories",
          "CWE",
          "File Path",
          "Line Number",
          "Start Line",
          "End Line",
          "Message",
          "Tags",
          "Snyk Product",
        ],
      ],
      body: sastScanReport.map((item) => [
        item.id,
        item.severity,
        item.category,
        item.categories,
        item.cwe,
        item.filePath,
        item.lineNumber,
        item.startLine,
        item.endLine,
        item.message,
        item.tags,
        item.snykProduct,
      ]),
    });

    return pdfExporter;
  };

  const getCsvData = () => {
    return [
      [
        "id",
        "Severity",
        "Category",
        "Categories",
        "CWE",
        "File Path",
        "Line Number",
        "Start Line",
        "End Line",
        "Message",
        "Tags",
        "Snyk Product",
      ],
      ...sastScanReport.map((item) => [
        item.id,
        item.severity,
        item.category,
        item.categories,
        item.cwe,
        item.filePath,
        item.lineNumber,
        item.startLine,
        item.endLine,
        item.message,
        item.tags,
        item.snykProduct,
      ]),
    ];
  };

  if (sastScanReport == null || !Array.isArray(sastScanReport)) {
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

ExportSnykSastReportPanel.propTypes = {
  showExportPanel: PropTypes.bool,
  setShowExportPanel: PropTypes.func,
  sastScanReport: PropTypes.any,
  isLoading: PropTypes.bool,
};
