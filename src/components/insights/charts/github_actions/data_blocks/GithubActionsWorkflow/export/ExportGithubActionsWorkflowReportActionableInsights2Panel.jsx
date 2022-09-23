import React from "react";
import PropTypes from "prop-types";
import jsPDF from "jspdf";
import ExportDataPanel from "components/common/modal/export_data/ExportDataPanel";
import ExportGithubActionWorkflowReportActionalbeInsights1Panel from "./ExportGithubActionsWorkflowReportActionableInsights1Panel";

export default function ExportGithubActionWorkflowReportActionalbeInsights2Panel({
  showExportPanel,
  setShowExportPanel,
  githubActionData,
  isLoading,
}) {
  const getRawData = () => {
    const rawData = Array.isArray(githubActionData)
      ? githubActionData?.map((item) => JSON.stringify(item))
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
          "Job Name",
          "Runs",
          "Jobs",
          "Jobs Success",
          "Jobs Failures",
          "Skipped",
          "Canceled",
        ],
      ],
      body: githubActionData.map((item) => [
        item.jobName,
        item.runs,
        item.jobs,
        item.jobsSuccess,
        item.jobsFailures,
        item.skipped,
        item.canceled,
      ]),
    });

    return pdfExporter;
  };

  const getCsvData = () => {
    return [
      [
        "Job Name",
        "Runs",
        "Jobs",
        "Jobs Success",
        "Jobs Failures",
        "Skipped",
        "Canceled",
      ],
      ...githubActionData.map((item) => [
        item.jobName,
        item.runs,
        item.jobs,
        item.jobsSuccess,
        item.jobsFailures,
        item.skipped,
        item.canceled,
      ]),
    ];
  };

  if (githubActionData == null || !Array.isArray(githubActionData)) {
    console.log(githubActionData);
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

ExportGithubActionWorkflowReportActionalbeInsights2Panel.propTypes = {
  showExportPanel: PropTypes.bool,
  setShowExportPanel: PropTypes.func,
  githubActionData: PropTypes.any,
  isLoading: PropTypes.bool,
};
