import React from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import SalesforceLogSummaryReportPanel
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/salesforce/summary/SalesforceLogSummaryReportPanel";

function PipelineSummaryReportPanel({ pipelineTaskData }) {
  const wrapObject = (metaData) => {
    return new Model(pipelineTaskData, metaData, false);
  };

  const getSummaryReportPanel = () => {
    // TODO : we cant restrict this based on step name, this is where i was thinking to have a unique tool identifier. Removing check for step name for now
    return (<SalesforceLogSummaryReportPanel pipelineTaskData={pipelineTaskData}/>);
  };

  return (getSummaryReportPanel());
}


PipelineSummaryReportPanel.propTypes = {
  pipelineTaskData: PropTypes.object,
};

export default PipelineSummaryReportPanel;