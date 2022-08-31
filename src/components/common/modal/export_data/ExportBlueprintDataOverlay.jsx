import React from "react";
import PropTypes from "prop-types";
import ExportDataOverlay from "./ExportDataOverlay";
import jsPDF from "jspdf";
import {capitalizeFirstLetter} from "components/common/helpers/string-helpers";

// TODO: Should we be just sending in data and formatting in here?
function ExportBlueprintDataOverlay({ formattedData, rawData, isLoading, summaryData, logData}) {
  const getRawData = () => {
    return new Blob([rawData], {type : 'text/plain'});
  };

  const getPdfExporter = () => {
    const pdfExporter = new jsPDF();

    if (summaryData) {
      let stepSummary = logData?.map((step, index) => {
        let toolIdentifier = step?.tool_identifier ? step.tool_identifier : "unavailable";
        let tool = step?.step_configuration?.configuration?.toolName ? step.step_configuration.configuration.toolName : toolIdentifier;
        let stepNameFromLog = formattedData[index]?.name ? formattedData[index].name : "unavailable";
        let stepNameFromTab = step?.step_configuration?.configuration?.jobType ? step.step_configuration.configuration.jobType : stepNameFromLog;

        return [`Step ${index + 1}: ${capitalizeFirstLetter(stepNameFromTab)}`, `Tool: ${capitalizeFirstLetter(tool)}`, `Action: ${step?.action}`];
      });

      pdfExporter.autoTable({
        startY: 2,
        headStyles: {fillColor: [54, 46, 84], fontSize: 12, fontStyle: 'normal', minCellHeight: 12, valign: 'middle'},
        showHead: "firstPage",
        margin: {left: 2, right: 2, bottom: 2},
        head: [{id: {content: `${summaryData?.blueprintName}`, colSpan: 3}}],
        body: [{
          id: {
            content: `View Pipeline: ${window.location.origin}/workflow/details/${logData[0]?.pipeline_id}/summary`,
            colSpan: 3
          }
        },
          [`ID: ${summaryData?.pipelineId}`, `Pipeline Run Count: ${summaryData?.runCount}`, `Number of Steps: ${summaryData?.numberOfSteps}`],
          [`Status: ${capitalizeFirstLetter(logData[0]?.status)}`, `Last Run: ${logData[0]?.createdAt}`, `Report Date: ${new Date().toLocaleDateString('en-US')}`],
          ...stepSummary],
      });

      formattedData.forEach((step, index) => {
        let stepName = logData[index]?.step_configuration?.configuration?.jobType ? logData[index].step_configuration.configuration.jobType : step.name.charAt(0).toUpperCase() + step.name.slice(1);

        return (
          pdfExporter.autoTable({
            headStyles: {fillColor: [54, 46, 84], fontStyle: 'normal', fontSize: 10, valign: 'middle'},
            showHead: "firstPage",
            margin: {top: 2, left: 2, right: 2, bottom: 2},
            head: [[stepName]],
            body: [[step.step]]
          })
        );
      });
    } else {
      pdfExporter.autoTable({
        startY: 2,
        headStyles: {fillColor: [54, 46, 84]},
        showHead: "firstPage",
        margin: {left: 2, right: 2},
        head: [["Blueprint"]],
        body: formattedData.map(result => [result])
      });
    }

    return pdfExporter;
  };

  return (
    <ExportDataOverlay
      isLoading={isLoading}
      getRawData={getRawData}
      getPdfExporter={getPdfExporter}
    />
  );
}

ExportBlueprintDataOverlay.propTypes = {
  rawData: PropTypes.any,
  formattedData: PropTypes.any,
  isLoading: PropTypes.bool,
  summaryData: PropTypes.any,
  logData: PropTypes.any,
};

export default ExportBlueprintDataOverlay;


