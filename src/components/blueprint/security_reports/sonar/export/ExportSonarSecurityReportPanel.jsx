import React from "react";
import PropTypes from "prop-types";
import jsPDF from "jspdf";
import ExportDataPanel from "../../../../common/modal/export_data/ExportDataPanel";

export default function ExportSonarSecurityReportPanel({
  showExportPanel,
  setShowExportPanel,
  sonarSecurityReportData,
  isLoading,
}) {
  const getRawData = () => {
    const rawData = Array.isArray(sonarSecurityReportData)
      ? sonarSecurityReportData?.map((item) => JSON.stringify(item))
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
      head: [["Name", "Actual", "Threshold", "Level"]],
      body: sonarSecurityReportData.map((item) => [
        item.name,
        item.actual,
        item.threshold,
        item.level,
      ]),
    });

    return pdfExporter;
  };

  const getCsvData = () => {
    return [
      ["Name", "Actual", "Threshold", "Level"],
      ...sonarSecurityReportData.map((item) => [
        item.name,
        item.actual,
        item.threshold,
        item.level,
      ]),
    ];
  };

  if (
    sonarSecurityReportData == null ||
    !Array.isArray(sonarSecurityReportData)
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

ExportSonarSecurityReportPanel.propTypes = {
  showExportPanel: PropTypes.bool,
  setShowExportPanel: PropTypes.func,
  sonarSecurityReportData: PropTypes.any,
  isLoading: PropTypes.bool,
};
