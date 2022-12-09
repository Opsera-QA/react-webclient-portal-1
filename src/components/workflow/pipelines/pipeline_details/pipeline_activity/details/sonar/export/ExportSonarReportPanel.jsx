import React from "react";
import PropTypes from "prop-types";
import jsPDF from "jspdf";
import ExportDataPanel from "components/common/modal/export_data/ExportDataPanel";

export default function ExportSonarReportPanel({
  showExportPanel,
  setShowExportPanel,
  sonarData,
  isLoading,
}) {
  const getRawData = () => {
    const rawData = Array.isArray(sonarData)
      ? sonarData?.map((item) => JSON.stringify(item))
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
      head: [["Name", "Actual", "Error", "Level"]],
      body: sonarData.map((item) => [
        item.name,
        item.actual,
        item.error,
        item.level,
      ]),
    });

    return pdfExporter;
  };

  const getCsvData = () => {
    return [
      ["Name", "Actual", "Error", "Level"],
      ...sonarData.map((item) => [
        item.name,
        item.actual,
        item.error,
        item.level,
      ]),
    ];
  };

  if (sonarData == null || !Array.isArray(sonarData)) {
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

ExportSonarReportPanel.propTypes = {
  showExportPanel: PropTypes.bool,
  setShowExportPanel: PropTypes.func,
  sonarData: PropTypes.any,
  isLoading: PropTypes.bool,
};
