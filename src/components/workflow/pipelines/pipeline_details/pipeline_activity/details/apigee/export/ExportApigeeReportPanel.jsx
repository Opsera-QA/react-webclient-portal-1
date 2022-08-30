import React from "react";
import PropTypes from "prop-types";
import jsPDF from "jspdf";
import ExportDataPanel from "components/common/modal/export_data/ExportDataPanel";

export default function ExportGitCustodianReportPanel({
  showExportPanel,
  setShowExportPanel,
  apigeeData,
  isLoading,
}) {
  const getRawData = () => {
    const rawData = Array.isArray(apigeeData)
      ? apigeeData?.map((item) => JSON.stringify(item))
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
      head: [["Name", "Type", "Revision", "Status", "New Asset"]],
      body: apigeeData.map((item) => [
        item.name,
        item.type,
        item.revision,
        item.state,
        item.isNew,
      ]),
    });

    return pdfExporter;
  };

  const getCsvData = () => {
    return [
      ["Name", "Type", "Revision", "Status", "New Asset"],
      ...apigeeData.map((item) => [
        item.name,
        item.type,
        item.revision,
        item.state,
        item.isNew,
      ]),
    ];
  };

  if (apigeeData == null || !Array.isArray(apigeeData)) {
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

ExportGitCustodianReportPanel.propTypes = {
  showExportPanel: PropTypes.bool,
  setShowExportPanel: PropTypes.func,
  apigeeData: PropTypes.any,
  isLoading: PropTypes.bool,
};
