import React from "react";
import PropTypes from "prop-types";
import jsPDF from "jspdf";
import ExportDataPanel from "../../../../common/modal/export_data/ExportDataPanel";

export default function ExportCoveritySecurityReportPanel({
  showExportPanel,
  setShowExportPanel,
  coveritySecurityReportData,
  isLoading,
}) {
  const getRawData = () => {
    const rawData = Array.isArray(coveritySecurityReportData)
      ? coveritySecurityReportData?.map((item) => JSON.stringify(item))
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
      head: [["Type", "Status", "CWE", "Impact", "Issue Type", "Category", "Count", "Component", "File"]],
      body: coveritySecurityReportData.map((item) => [
        item.displayType,
        item.status,
        item.cwe.key,
        item.displayImpact,
        item.displayIssueKind,
        item.displayCategory,
        item.occurrenceCount,
        item.displayComponent,
        item.displayFile.key,
      ]),
    });

    return pdfExporter;
  };

  const getCsvData = () => {
    return [["Type", "Status", "CWE", "Impact", "Issue Type", "Category", "Count", "Component", "File"],
      ...coveritySecurityReportData.map((item) => [
        item.displayType,
        item.status,
        item.cwe.key,
        item.displayImpact,
        item.displayIssueKind,
        item.displayCategory,
        item.occurrenceCount,
        item.displayComponent,
        item.displayFile.key,
      ]),
    ];
  };

  if (
    coveritySecurityReportData == null ||
    !Array.isArray(coveritySecurityReportData)
  ) {
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

ExportCoveritySecurityReportPanel.propTypes = {
  showExportPanel: PropTypes.bool,
  setShowExportPanel: PropTypes.func,
  coveritySecurityReportData: PropTypes.any,
  isLoading: PropTypes.bool,
};
