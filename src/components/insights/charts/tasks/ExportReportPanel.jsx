import React from "react";
import PropTypes from "prop-types";
import jsPDF from "jspdf";
import ExportDataPanel from "components/common/modal/export_data/ExportDataPanel";

export default function ExportReportPanel({
  showExportPanel,
  setShowExportPanel,
  taskData,
  isLoading,
  pdfHeaderList,
  pdfBodyList,
  csvHeaderList,
  csvBodyList,
}) {

  const getRawData = () => {
    const rawData = Array.isArray(taskData)
      ? taskData?.map((item) => JSON.stringify(item))
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
        pdfHeaderList,
      ],
      body: pdfBodyList,
    });

    return pdfExporter;
  };

  const getCsvData = () => {
    return [
      csvHeaderList,
      ...csvBodyList,
    ];
  };

  if (taskData == null || !Array.isArray(taskData)) {
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

ExportReportPanel.propTypes = {
  showExportPanel: PropTypes.bool,
  setShowExportPanel: PropTypes.func,
  taskData: PropTypes.any,
  isLoading: PropTypes.bool,
  pdfHeaderList: PropTypes.array,
  pdfBodyList: PropTypes.array,
  csvHeaderList: PropTypes.array,
  csvBodyList: PropTypes.array,
};
