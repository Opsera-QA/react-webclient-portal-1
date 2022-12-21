import React from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import SalesforceLogSummaryReportPanel
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/salesforce/summary/SalesforceLogSummaryReportPanel";
import InformaticaLogSummaryReportPanel from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/informatica/InformaticaLogSummaryReportPanel";
import InformaticaIdqLogSummaryReportPanel from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/informatica_idq/InformaticaIdqLogSummaryReportPanel";
import GitScraperLogSummaryReportPanel from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/gitscraper/GitScraperLogSummaryReportPanel";
import ApigeeLogSummaryReportPanel from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/apigee/ApigeeLogSummaryReportPanel";
import pipelineTaskMetadata from "./pipeline-task-metadata";
import PipelineTaskSummaryPanelBase from "./PipelineTaskSummaryPanelBase";
import {toolIdentifierConstants} from "components/admin/tools/identifiers/toolIdentifier.constants";
import SfdxScanLogSummaryReportPanel from "./sfdx_scan/SfdxScanLogSummaryReportPanel";
import SapCpqLogSummaryReportPanel from "./sap_cpq/SapCpqLogSummaryReportPanel";
import ProvarLogSummaryReportPanel
  from "../../workflow/step_configuration/step_tool_configuration_forms/provar/report/ProvarLogSummaryReportPanel";
import BoomiLogSummaryReportPanel from "./boomi/BoomiLogSummaryReportPanel";
import FortifyLogSummaryReportPanel
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/fortify/FortifyLogSummaryReportPanel";
import CoveritySummaryReportPanel 
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/coverity/CoveritySummaryReportPanel";
import SonarLogSummaryReportPanel 
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/sonar/SonarLogSummaryReportPanel";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import AnchoreSummaryReportPanel from "./anchore/AnchoreSummaryReportPanel";
import BlackduckLogSummaryReportPanel 
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/blackduck/BlackduckLogSummaryReportPanel";

function PipelineSummaryReportPanel(
  {
    pipelineTaskData,
    setActiveTab,
  }) {
  const wrapObject = (metaData) => {
    return new Model(pipelineTaskData, metaData, false);
  };

  const getJenkinsReport = () => {
    const sfdcJobDetails = DataParsingHelper.parseNestedArray(pipelineTaskData, "api_response.sfdcJobDetails");

    if (sfdcJobDetails && sfdcJobDetails?.length > 0) {
      const jobDetails = DataParsingHelper.parseObject(sfdcJobDetails[0], {});

      // TODO make this as generic as possible
      if (jobDetails?.deployResult) {
        return (
          <SalesforceLogSummaryReportPanel
            pipelineTaskData={jobDetails?.deployResult}
          />
        );
      }
    }

    return (
      <PipelineTaskSummaryPanelBase
        pipelineTaskData={wrapObject(pipelineTaskMetadata)}
        setActiveTab={setActiveTab}
      />
    );
  };

  const getSummaryReportPanel = () => {
    const stepIdentifier = DataParsingHelper.parseNestedString(pipelineTaskData, "api_response.stepIdentifier", "");

    switch (stepIdentifier) {
      case "informatica":
        return (
          <InformaticaLogSummaryReportPanel
            pipelineTaskData={pipelineTaskData}
          />
        );
      case "informatica-idq":
        return (
            <InformaticaIdqLogSummaryReportPanel
                pipelineTaskData={pipelineTaskData}
            />
        );
      case "gitscraper":
        return (
          <GitScraperLogSummaryReportPanel
            pipelineTaskData={pipelineTaskData}
          />
        );
      case "apigee":
        return (
          <ApigeeLogSummaryReportPanel pipelineTaskData={pipelineTaskData} />
        );
      case "jenkins":
        return getJenkinsReport();
      case toolIdentifierConstants.TOOL_IDENTIFIERS.SALESFORCE_CODE_ANALYZER:
        return (
          <SfdxScanLogSummaryReportPanel pipelineTaskData={pipelineTaskData} />
        );
      case toolIdentifierConstants.TOOL_IDENTIFIERS.SAP_CPQ:
        return (
          <SapCpqLogSummaryReportPanel pipelineTaskData={pipelineTaskData} />
        );
      case toolIdentifierConstants.TOOL_IDENTIFIERS.PROVAR:
        return (
            <ProvarLogSummaryReportPanel pipelineTaskData={pipelineTaskData}/>
        );
      case toolIdentifierConstants.TOOL_IDENTIFIERS.BOOMI:
        return (
          <BoomiLogSummaryReportPanel pipelineTaskData={pipelineTaskData} />
        );
      case toolIdentifierConstants.TOOL_IDENTIFIERS.FORTIFY:
        return (
          <FortifyLogSummaryReportPanel pipelineTaskData={pipelineTaskData}/>
        );
      case toolIdentifierConstants.TOOL_IDENTIFIERS.COVERITY:
        return (
          <CoveritySummaryReportPanel pipelineTaskData={pipelineTaskData}/>
        );
      case toolIdentifierConstants.TOOL_IDENTIFIERS.SONAR:
        return (
          <SonarLogSummaryReportPanel pipelineTaskData={pipelineTaskData}/>
        );    
      case toolIdentifierConstants.TOOL_IDENTIFIERS.ANCHORE_INTEGRATOR:
        return (
            <AnchoreSummaryReportPanel pipelineTaskData={pipelineTaskData}/>
        );
      case toolIdentifierConstants.TOOL_IDENTIFIERS.BLACKDUCK:
        return (
          <BlackduckLogSummaryReportPanel pipelineTaskData={pipelineTaskData}/>
        );        
      default:
        return (
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