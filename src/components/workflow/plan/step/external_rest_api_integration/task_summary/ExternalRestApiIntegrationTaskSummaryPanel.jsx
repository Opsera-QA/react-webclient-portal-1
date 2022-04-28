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
import pipelineHelpers from "components/workflow/pipelineHelpers";
import Row from "react-bootstrap/Row";
import ExternalRestApiIntegrationEndpointResponseField
  from "components/workflow/plan/step/external_rest_api_integration/ExternalRestApiIntegrationEndpointResponseField";
import ExternalRestApiIntegrationEndpointRequestField
  from "components/workflow/plan/step/external_rest_api_integration/ExternalRestApiIntegrationEndpointRequestField";
import FieldContainer from "components/common/fields/FieldContainer";

// TODO: Make fully fleshed out report.
function ExternalRestApiIntegrationTaskSummaryPanel({ externalRestApiIntegrationStepTaskModel }) {
  const getStepConfigurationData = () => {
    const data = externalRestApiIntegrationStepTaskModel?.getPersistData();
    const stepConfigurationData = pipelineHelpers.parseSummaryLogStepConfiguration(data);
    return modelHelpers.parseObjectIntoModel(stepConfigurationData, externalRestApiIntegrationStepMetadata);
  };

  const getEndpointFields = () => {
    const data = externalRestApiIntegrationStepTaskModel?.getPersistData();
    const endpoint = pipelineHelpers.parseSummaryLogApiResponseValue(data, "endpoint");

    if (endpoint) {
     return (
       <Row>
         <Col xs={6}>
           <ExternalRestApiIntegrationEndpointRequestField
            endpointObject={endpoint}
           />
         </Col>
         <Col xs={6}>
           <ExternalRestApiIntegrationEndpointResponseField
              responseObject={endpoint?.response}
           />
         </Col>
       </Row>
     );
    }
  };

  if (externalRestApiIntegrationStepTaskModel == null) {
    return null;
  }

  return (
    <PipelineTaskSummaryPanelBase pipelineTaskData={externalRestApiIntegrationStepTaskModel}>
      <Col xs={12}>
        {getEndpointFields()}
      </Col>
      <Col xs={12}>
        <FieldContainer>
          <InfoContainer
            titleText={"External Rest API Integration Step Configuration"}
          >
            <div className={"mx-3"}>
              <ExternalRestApiIntegrationStepSummaryPanel
                externalRestApiIntegrationModel={getStepConfigurationData()}
              />
            </div>
          </InfoContainer>
        </FieldContainer>
      </Col>
    </PipelineTaskSummaryPanelBase>
  );
}

ExternalRestApiIntegrationTaskSummaryPanel.propTypes = {
  externalRestApiIntegrationStepTaskModel: PropTypes.object,
};


export default ExternalRestApiIntegrationTaskSummaryPanel;
