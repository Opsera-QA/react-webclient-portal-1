import React from "react";
import PropTypes from "prop-types";
import jsPDF from "jspdf";
import ExportDataPanel from "components/common/modal/export_data/ExportDataPanel";

export default function ExportBlackduckReportPanel({
  showExportPanel,
  setShowExportPanel,
  blackduckData,
  isLoading,
}) {
  const getRawData = () => {
    const rawData = Array.isArray(blackduckData)
      ? blackduckData?.map((item) => JSON.stringify(item))
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
      head: [["Category", "Critical", "High", "Medium", "Low", "Ok", "Unknown"]],
      body: blackduckData.map((item) => [
        item.category,
        item.critical,
        item.high,
        item.medium,
        item.low,
        item.ok,
        item.unknown,
      ]),
    });

    return pdfExporter;
  };

  const getCsvData = () => {
    return [
      ["Category", "Critical", "High", "Medium", "Low", "Ok", "Unknown"],
      ...blackduckData.map((item) => [
        item.category,
        item.critical,
        item.high,
        item.medium,
        item.low,
        item.ok,
        item.unknown,
      ]),
    ];
  };

  if (blackduckData == null || !Array.isArray(blackduckData)) {
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

ExportBlackduckReportPanel.propTypes = {
  showExportPanel: PropTypes.bool,
  setShowExportPanel: PropTypes.func,
  blackduckData: PropTypes.any,
  isLoading: PropTypes.bool,
};
