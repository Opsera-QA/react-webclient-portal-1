import React from "react";
import PropTypes from "prop-types";
import jsPDF from "jspdf";
import ExportDataPanel from "components/common/modal/export_data/ExportDataPanel";

export default function ExportGitCustodianReportPanel(
  {
    showExportPanel,
    setShowExportPanel,
    gitCustodianData,
    isLoading,
  }) {
  const getRawData = () => {
    const rawData = Array.isArray(gitCustodianData) ? gitCustodianData?.map(item => JSON.stringify(item)) : "export failure";
    return new Blob([rawData], { type: "text/plain" });
  };
console.log(gitCustodianData);
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
          "Author",
          "Commit",
          "Commit Hash",
          "Path",
          "Line Number",
          "Reason",
        ],
      ],
      body: gitCustodianData.map((item) => [
        item.author,
        item.commit,
        item.commitHash,
        item.path,
        item.lineNumber,
        item.reason,
      ]),
    });

    return pdfExporter;
  };

  const getCsvData = () => {
    return [
      [
        "Author",
        "Commit",
        "Commit Hash",
        "Path",
        "Line Number",
        "Link",
        "Reason",
      ],
      ...gitCustodianData.map((item) => [
        item.author,
        item.commit,
        item.commitHash,
        item.path,
        item.lineNumber,
        item.linkToSecret,
        item.reason,
      ]),
    ];
  };

  if (gitCustodianData == null || !Array.isArray(gitCustodianData)) {
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
  gitCustodianData: PropTypes.any,
  isLoading: PropTypes.bool,
};
