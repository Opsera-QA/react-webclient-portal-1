import React from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import SalesforceLogSummaryReportPanel
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/salesforce/summary/SalesforceLogSummaryReportPanel";
import InformaticaLogSummaryReportPanel from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/informatica/InformaticaLogSummaryReportPanel";
import GitScraperLogSummaryReportPanel from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/gitscraper/GitScraperLogSummaryReportPanel";
import ApigeeLogSummaryReportPanel from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/apigee/ApigeeLogSummaryReportPanel";
import pipelineTaskMetadata from "./pipeline-task-metadata";
import PipelineTaskSummaryPanelBase from "./PipelineTaskSummaryPanelBase";
import SfdxScanLogSummaryReportPanel from "./sfdx_scan/SfdxScanLogSummaryReportPanel";
import { toolIdentifierConstants } from "components/admin/tools/identifiers/toolIdentifier.constants";
import ProvarLogSummaryReportPanel
  from "../../workflow/step_configuration/step_tool_configuration_forms/provar/report/ProvarLogSummaryReportPanel";
import SapCpqLogSummaryReportPanel from "./sap_cpq/SapCpqLogSummaryReportPanel";
import BoomiLogSummaryReportPanel from "./boomi/BoomiLogSummaryReportPanel";
import InformaticaIdqLogSummaryReportPanel from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/informatica_idq/InformaticaIdqLogSummaryReportPanel";
import FortifyLogSummaryReportPanel from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/fortify/FortifyLogSummaryReportPanel";

function PipelineSummaryReportPanel(
  {
    pipelineTaskData,
    setActiveTab,
  }) {
  const wrapObject = (metaData) => {
    return new Model(pipelineTaskData, metaData, false);
  };

  const getJenkinsReport = () => {
    if(pipelineTaskData?.api_response?.sfdcJobDetails[0]?.deployResult) {
      return (<SalesforceLogSummaryReportPanel pipelineTaskData={pipelineTaskData?.api_response?.sfdcJobDetails[0]?.deployResult}/>); // TODO make this as generic as possible
    }
    return (<PipelineTaskSummaryPanelBase pipelineTaskData={wrapObject(pipelineTaskMetadata)}/>);
  };

  const getSummaryReportPanel = () => {
    // console.log(pipelineTaskData);
    switch(pipelineTaskData?.api_response?.stepIdentifier) {
      case "informatica":
        return (
          <InformaticaLogSummaryReportPanel pipelineTaskData={pipelineTaskData}/>
        );
      case "informatica-idq":
        return (
            <InformaticaIdqLogSummaryReportPanel
                pipelineTaskData={pipelineTaskData}
            />
        );
      case "gitscraper":
        return (
          <GitScraperLogSummaryReportPanel pipelineTaskData={pipelineTaskData}/>
        );
      case "apigee":
        return (
          <ApigeeLogSummaryReportPanel pipelineTaskData={pipelineTaskData}/>
        );        
      case "jenkins":
        return getJenkinsReport();
      case toolIdentifierConstants.TOOL_IDENTIFIERS.SALESFORCE_CODE_ANALYZER:
        return (
            <SfdxScanLogSummaryReportPanel pipelineTaskData={pipelineTaskData}/>
        );
      case toolIdentifierConstants.TOOL_IDENTIFIERS.PROVAR:
        return (
            <ProvarLogSummaryReportPanel pipelineTaskData={pipelineTaskData}/>
        );
      case toolIdentifierConstants.TOOL_IDENTIFIERS.SAP_CPQ:
        return (
          <SapCpqLogSummaryReportPanel pipelineTaskData={pipelineTaskData} />
        );
      case toolIdentifierConstants.TOOL_IDENTIFIERS.BOOMI:
        return (
          <BoomiLogSummaryReportPanel pipelineTaskData={pipelineTaskData} />
        );
      case toolIdentifierConstants.TOOL_IDENTIFIERS.FORTIFY:
        return (
          <FortifyLogSummaryReportPanel pipelineTaskData={pipelineTaskData}/>
        );        
      default:
          <PipelineTaskSummaryPanelBase
            pipelineTaskData={wrapObject(pipelineTaskMetadata)}
            setActiveTab={setActiveTab}
          />
        );
    }
  };

  return (getSummaryReportPanel());
}


PipelineSummaryReportPanel.propTypes = {
  pipelineTaskData: PropTypes.object,
  setActiveTab: PropTypes.func,
};

export default PipelineSummaryReportPanel;