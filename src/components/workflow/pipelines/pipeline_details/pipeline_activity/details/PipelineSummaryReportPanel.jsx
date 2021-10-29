import React from "react";
import PropTypes from "prop-types";
import PipelineTaskSummaryPanelBase from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/PipelineTaskSummaryPanelBase";
import pipelineTaskMetadata from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/pipeline-task-metadata";
import Model from "core/data_model/model";
import SalesforceLogSummaryReportPanel
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/salesforce/summary/SalesforceLogSummaryReportPanel";

function PipelineSummaryReportPanel({ pipelineTaskData }) {
  const wrapObject = (metaData) => {
    return new Model(pipelineTaskData, metaData, false);
  };

  const getSummaryReportPanel = () => {
    switch (pipelineTaskData?.step_name) {
      case "sfdc unit test":
      case "sfdc xml validate job":
      case "sfdc deploy":
        return (<SalesforceLogSummaryReportPanel pipelineTaskData={pipelineTaskData}/>);
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