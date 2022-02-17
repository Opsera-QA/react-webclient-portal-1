import React from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import SalesforceLogSummaryReportPanel
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/salesforce/summary/SalesforceLogSummaryReportPanel";
import InformaticaLogSummaryReportPanel from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/informatica/InformaticaLogSummaryReportPanel";

function PipelineSummaryReportPanel({ pipelineTaskData }) {
  const wrapObject = (metaData) => {
    return new Model(pipelineTaskData, metaData, false);
  };

  const getSummaryReportPanel = () => {
    switch(pipelineTaskData?.api_response?.stepIdentifier) {
      case "informatica":
        return (
          <InformaticaLogSummaryReportPanel pipelineTaskData={pipelineTaskData}/>
        );
      default:
        return (<SalesforceLogSummaryReportPanel pipelineTaskData={pipelineTaskData}/>);
    }
  };

  return (getSummaryReportPanel());
}


PipelineSummaryReportPanel.propTypes = {
  pipelineTaskData: PropTypes.object,
};

export default PipelineSummaryReportPanel;