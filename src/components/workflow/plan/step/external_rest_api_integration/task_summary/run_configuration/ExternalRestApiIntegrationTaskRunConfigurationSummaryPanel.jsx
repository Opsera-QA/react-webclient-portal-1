import React from "react";
import PropTypes from "prop-types";
import ExternalRestApiIntegrationStepSummaryPanel
  from "components/workflow/plan/step/external_rest_api_integration/step_summary/ExternalRestApiIntegrationStepSummaryPanel";
import InfoContainer from "components/common/containers/InfoContainer";
import {
  externalRestApiIntegrationStepMetadata,
} from "components/workflow/plan/step/external_rest_api_integration/externalRestApiIntegrationStep.metadata";
import modelHelpers from "components/common/model/modelHelpers";
import pipelineHelpers from "components/workflow/pipelineHelpers";
import FieldContainer from "components/common/fields/FieldContainer";
import InlineInformation from "components/common/status_notifications/inline/InlineInformation";

function ExternalRestApiIntegrationTaskRunConfigurationSummaryPanel({ externalRestApiIntegrationStepTaskModel }) {
  const getStepConfigurationData = () => {
    const data = externalRestApiIntegrationStepTaskModel?.getPersistData();
    const stepConfigurationData = pipelineHelpers.parseSummaryLogStepConfiguration(data);
    return modelHelpers.parseObjectIntoModel(stepConfigurationData, externalRestApiIntegrationStepMetadata);
  };

  if (externalRestApiIntegrationStepTaskModel == null) {
    return null;
  }

  return (
    <FieldContainer>
      <InlineInformation message={`
        The API Integrator service uses the configuration details stored in the Tool Registry record configured for this step.
        Listed below are the configuration details for this step broken out into the three key operations: Validate Connection, Call Operation and Status Check.
        Each step and trigger of the API Integrator could have different responses. 
        Please review each to be sure everything is as expected. 
     `} />
      <InfoContainer
        titleText={"External Rest API Integration Step Run Configuration"}
      >
        <div className={"mx-3 mb-3"}>
          <ExternalRestApiIntegrationStepSummaryPanel
            externalRestApiIntegrationModel={getStepConfigurationData()}
          />
        </div>
      </InfoContainer>
    </FieldContainer>
  );
}

ExternalRestApiIntegrationTaskRunConfigurationSummaryPanel.propTypes = {
  externalRestApiIntegrationStepTaskModel: PropTypes.object,
};


export default ExternalRestApiIntegrationTaskRunConfigurationSummaryPanel;
