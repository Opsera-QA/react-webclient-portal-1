import React from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import SalesforceLogSummaryReportPanel
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/salesforce/summary/SalesforceLogSummaryReportPanel";
import InformaticaLogSummaryReportPanel from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/informatica/InformaticaLogSummaryReportPanel";
import GitScraperLogSummaryReportPanel from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/gitscraper/GitScraperLogSummaryReportPanel";
import pipelineTaskMetadata from "./pipeline-task-metadata";
import PipelineTaskSummaryPanelBase from "./PipelineTaskSummaryPanelBase";

function PipelineSummaryReportPanel({ pipelineTaskData }) {
  const wrapObject = (metaData) => {
    return new Model(pipelineTaskData, metaData, false);
  };

  const getSummaryReportPanel = () => {
    console.log(pipelineTaskData);
    switch(pipelineTaskData?.api_response?.stepIdentifier) {
      case "informatica":
        return (
          <InformaticaLogSummaryReportPanel pipelineTaskData={pipelineTaskData}/>
        );
      case "gitscraper":
        return (
          <GitScraperLogSummaryReportPanel pipelineTaskData={pipelineTaskData}/>
        );
      case "jenkins":
        return (<SalesforceLogSummaryReportPanel pipelineTaskData={pipelineTaskData?.api_response?.sfdcJobDetails[0]?.deployResult}/>); // TODO make this as generic as possible
      default:
        return (<PipelineTaskSummaryPanelBase pipelineTaskData={wrapObject(pipelineTaskMetadata)}/>);
    }
  };

  return (getSummaryReportPanel());
}


PipelineSummaryReportPanel.propTypes = {
  pipelineTaskData: PropTypes.object,
};

export default PipelineSummaryReportPanel;