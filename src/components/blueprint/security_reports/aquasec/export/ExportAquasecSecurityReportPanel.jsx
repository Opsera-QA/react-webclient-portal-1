import React from "react";
import PropTypes from "prop-types";
import jsPDF from "jspdf";
import ExportDataPanel from "../../../../common/modal/export_data/ExportDataPanel";

export default function ExportAquasecSecurityReportPanel({
  showExportPanel,
  setShowExportPanel,
  aquasecSecurityReportData,
  isLoading,
}) {
  const getRawData = () => {
    const rawData = Array.isArray(aquasecSecurityReportData)
      ? aquasecSecurityReportData?.map((item) => JSON.stringify(item))
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
          "Name", 
          "Description", 
          "Aqua Severity", 
          "Aqua Score", 
          "NVD URL",
        ],
      ],
      body: aquasecSecurityReportData.map((item) => [
        item.name,
        item.description,
        item.aqua_severity,
        item.aqua_score,
        item.nvd_url,
      ]),
    });

    return pdfExporter;
  };

  const getCsvData = () => {
    return [
      [
        "Name", 
        "Description", 
        "Aqua Severity", 
        "Aqua Score", 
        "NVD URL",
      ],
      ...aquasecSecurityReportData.map((item) => [
        item.name,
        item.description,
        item.aqua_severity,
        item.aqua_score,
        item.nvd_url,
      ]),
    ];
  };

  if (
    aquasecSecurityReportData == null ||
    !Array.isArray(aquasecSecurityReportData)
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

ExportAquasecSecurityReportPanel.propTypes = {
  showExportPanel: PropTypes.bool,
  setShowExportPanel: PropTypes.func,
  aquasecSecurityReportData: PropTypes.any,
  isLoading: PropTypes.bool,
};
