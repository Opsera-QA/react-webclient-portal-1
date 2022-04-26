import React from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import PipelineTaskSummaryPanelBase
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/PipelineTaskSummaryPanelBase";
import StandaloneJsonField from "components/common/fields/json/StandaloneJsonField";
import ExternalRestApiIntegrationStepSummaryPanel
  from "components/workflow/plan/step/external_rest_api_integration/step_summary/ExternalRestApiIntegrationStepSummaryPanel";
import InfoContainer from "components/common/containers/InfoContainer";
import {
  externalRestApiIntegrationStepMetadata
} from "components/workflow/plan/step/external_rest_api_integration/externalRestApiIntegrationStep.metadata";
import modelHelpers from "components/common/model/modelHelpers";

// TODO: Make fully fleshed out report.
function ExternalRestApiIntegrationTaskSummaryPanel({ externalRestApiIntegrationStepTaskModel }) {
  const getStepConfigurationData = () => {
    const data = externalRestApiIntegrationStepTaskModel?.getPersistData();
    const stepConfigurationData = data?.api_response?.stepConfiguration ? data?.api_response?.stepConfiguration : data?.step_configuration?.tool?.configuration;
    return modelHelpers.parseObjectIntoModel(stepConfigurationData, externalRestApiIntegrationStepMetadata);
  };

  const getEndpointFields = () => {
    const data = externalRestApiIntegrationStepTaskModel?.getPersistData();
    const endpoint = data?.api_response?.endpoint;

    if (endpoint) {
     return (
       <>
         <Col xs={12}>
           <StandaloneJsonField
             className={"my-2"}
             titleText={"External API Request"}
             json={endpoint}
           />
         </Col>
         <Col xs={12}>
           <StandaloneJsonField
             className={"my-2"}
             titleText={"External API Response"}
             json={endpoint?.response}
           />
         </Col>
       </>
     );
    }
  };

  if (externalRestApiIntegrationStepTaskModel == null) {
    return null;
  }

  return (
    <PipelineTaskSummaryPanelBase pipelineTaskData={externalRestApiIntegrationStepTaskModel}>
      {getEndpointFields()}
      <Col xs={12}>
        <InfoContainer
          titleText={"External Rest API Integration Step Configuration"}
        >
          <div className={"mx-3"}>
            <ExternalRestApiIntegrationStepSummaryPanel
              externalRestApiIntegrationModel={getStepConfigurationData()}
            />
          </div>
        </InfoContainer>
      </Col>
    </PipelineTaskSummaryPanelBase>
  );
}

ExternalRestApiIntegrationTaskSummaryPanel.propTypes = {
  externalRestApiIntegrationStepTaskModel: PropTypes.object,
};


export default ExternalRestApiIntegrationTaskSummaryPanel;
