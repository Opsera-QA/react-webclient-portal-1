import React from "react";
import PropTypes from "prop-types";
import jsPDF from "jspdf";
import ExportDataPanel from "../../../../common/modal/export_data/ExportDataPanel";

export default function ExportAnchoreSecurityReportPanel({
  showExportPanel,
  setShowExportPanel,
  anchoreSecurityReportData,
  isLoading,
}) {
  console.log(anchoreSecurityReportData);
  const getRawData = () => {
    const rawData = Array.isArray(anchoreSecurityReportData)
      ? anchoreSecurityReportData?.map((item) => JSON.stringify(item))
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
          "Vulnerability",
          "Package Name",
          "Severity",
          "CVSS Exploitability Score",
          "CVSS Impact Score",
          "Vulnerability URL",
        ],
      ],
      body: anchoreSecurityReportData.map((item) => [
        item.vulnerability,
        item.package_name,
        item.severity,
        item.cvss_exploitability_score,
        item.cvss_impact_score,
        item.url,
      ]),
    });

    return pdfExporter;
  };

  const getCsvData = () => {
    return [
      [
        "Vulnerability",
        "Package Name",
        "Severity",
        "CVSS Exploitability Score",
        "CVSS Impact Score",
        "Vulnerability URL",
      ],
      ...anchoreSecurityReportData.map((item) => [
        item.vulnerability,
        item.package_name,
        item.severity,
        item.cvss_exploitability_score,
        item.cvss_impact_score,
        item.url,
      ]),
    ];
  };

  if (
    anchoreSecurityReportData == null ||
    !Array.isArray(anchoreSecurityReportData)
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

ExportAnchoreSecurityReportPanel.propTypes = {
  showExportPanel: PropTypes.bool,
  setShowExportPanel: PropTypes.func,
  anchoreSecurityReportData: PropTypes.any,
  isLoading: PropTypes.bool,
};
