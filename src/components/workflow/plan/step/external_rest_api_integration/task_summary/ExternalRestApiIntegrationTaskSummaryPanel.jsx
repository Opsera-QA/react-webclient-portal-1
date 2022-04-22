import React from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import PipelineTaskSummaryPanelBase
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/PipelineTaskSummaryPanelBase";
import StandaloneJsonField from "components/common/fields/json/StandaloneJsonField";
import { objectHelpers } from "components/common/helpers/object/object.helpers";
import ExternalRestApiIntegrationStepSummaryPanel
  from "components/workflow/plan/step/external_rest_api_integration/step_summary/ExternalRestApiIntegrationStepSummaryPanel";
import InfoContainer from "components/common/containers/InfoContainer";

// TODO: Make fully fleshed out report.
function ExternalRestApiIntegrationTaskSummaryPanel({ externalRestApiIntegrationStepTaskModel }) {
  const getResponseStatusJson = () => {
    const data = externalRestApiIntegrationStepTaskModel?.getPersistData();
    const apiResponse = data?.api_response?.apiResponse?.response;
    return objectHelpers.parseJson(apiResponse);
  };

  const getRequestJson = () => {
    const data = externalRestApiIntegrationStepTaskModel?.getPersistData();
    return data?.api_response?.apiResponse?.endpoint;
  };

  const getStepConfigurationData = () => {
    const data = externalRestApiIntegrationStepTaskModel?.getPersistData();
    return data?.step_configuration;
  };

  if (externalRestApiIntegrationStepTaskModel == null) {
    return null;
  }

  return (
    <PipelineTaskSummaryPanelBase pipelineTaskData={externalRestApiIntegrationStepTaskModel}>
      <Col xs={12}>
        <StandaloneJsonField
          className={"my-2"}
          titleText={"External API Request"}
          json={getRequestJson()}
        />
      </Col>
      <Col xs={12}>
        <StandaloneJsonField
          className={"my-2"}
          titleText={"External API Response"}
          json={getResponseStatusJson()}
        />
      </Col>
      <Col xs={12}>
        <InfoContainer
          titleText={"External Rest API Integration Step Configuration"}
        >
          <div className={"mx-3"}>
            <ExternalRestApiIntegrationStepSummaryPanel
              pipelineData={getStepConfigurationData()}
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
