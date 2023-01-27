import React from "react";
import PropTypes from "prop-types";
import jsPDF from "jspdf";
import ExportDataPanel from "components/common/modal/export_data/ExportDataPanel";

export default function ExportSnykOpenSourceReportPanel({
  showExportPanel,
  setShowExportPanel,
  openSourceReport,
  isLoading,
}) {
  const getRawData = () => {
    const rawData = Array.isArray(openSourceReport)
      ? openSourceReport?.map((item) => JSON.stringify(item))
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
          "Id",
          "Severity",
          "Category",
          "CWE",
          "CVE",
          "File Name",
          "Upgradable",
          "Patchable",
          "Version",
          "Introduced By",
          "Upgrade To",
          "Organization",
          "Snyk Product",
        ],
      ],
      body: openSourceReport.map((item) => [
        item.id,
        item.severity,
        item.category,
        item.cwe,
        item.cve,
        item.fileName,
        item.upgradable,
        item.patchable,
        item.version,
        item.introducedBy,
        item.upgradeTo,
        item.organization,
        item.snykProduct,
      ]),
    });

    return pdfExporter;
  };

  const getCsvData = () => {
    return [
      [
        "Id",
        "Severity",
        "Category",
        "CWE",
        "CVE",
        "File Name",
        "Upgradable",
        "Patchable",
        "Version",
        "Introduced By",
        "Upgrade To",
        "Organization",
        "Snyk Product",
      ],
      ...openSourceReport.map((item) => [
        item.id,
        item.severity,
        item.category,
        item.cwe,
        item.cve,
        item.fileName,
        item.upgradable,
        item.patchable,
        item.version,
        item.introducedBy,
        item.upgradeTo,
        item.organization,
        item.snykProduct,
      ]),
    ];
  };

  if (openSourceReport == null || !Array.isArray(openSourceReport)) {
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

ExportSnykOpenSourceReportPanel.propTypes = {
  showExportPanel: PropTypes.bool,
  setShowExportPanel: PropTypes.func,
  openSourceReport: PropTypes.any,
  isLoading: PropTypes.bool,
};
