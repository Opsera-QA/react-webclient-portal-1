import React, {useState} from "react";
import PropTypes from "prop-types";
import VanitySetVerticalTabContainer from "components/common/tabs/vertical_tabs/VanitySetVerticalTabContainer";
import VanitySetVerticalTab from "components/common/tabs/vertical_tabs/VanitySetVerticalTab";
import InfoContainer from "components/common/containers/InfoContainer";
import SideBySideViewBase from "components/common/tabs/SideBySideViewBase";
import ExternalRestApiIntegrationEndpointOrchestrationSummaryBase
  from "components/workflow/plan/step/external_rest_api_integration/task_summary/endpoints/ExternalRestApiIntegrationEndpointOrchestrationSummaryBase";
import ExternalRestApiIntegrationHeaderTokenEndpointOrchestrationSummary
  from "components/workflow/plan/step/external_rest_api_integration/task_summary/endpoints/ExternalRestApiIntegrationHeaderTokenEndpointOrchestrationSummary";
import ExternalRestApiIntegrationConnectionCheckEndpointOrchestrationSummary
  from "components/workflow/plan/step/external_rest_api_integration/task_summary/endpoints/ExternalRestApiIntegrationConnectionCheckEndpointOrchestrationSummary";

const START_CONFIRMATION_VIEWS = {
  CALL_OPERATION_SUMMARY: "callOperationSummary",
  CALL_OPERATION_API_TOKEN_GENERATION: "callOperationApiTokenGeneration",
  CALL_OPERATION_CONNECTION_VALIDATION: "callOperationConnectionValidation",
};

export default function ExternalRestApiIntegrationActivityLogStartConfirmationSummaryPanel(
  {
    externalRestApiIntegrationStepTaskModel,
  }) {
  const [activeTab, setActiveTab] = useState(START_CONFIRMATION_VIEWS.CALL_OPERATION_SUMMARY);
  const runRequestConnectionCheckEndpoint = externalRestApiIntegrationStepTaskModel?.getData("api_response.endpoints.connectionCheckEndpoint");
  const runRequestHeaderTokenEndpoint = externalRestApiIntegrationStepTaskModel?.getData("api_response.endpoints.headerTokenEndpoint");
  const runRequestRuleEvaluation = externalRestApiIntegrationStepTaskModel?.getData("api_response.ruleEvaluation");
  const runRequestCallOperationEndpoint = externalRestApiIntegrationStepTaskModel?.getData("api_response.endpoints.runTriggerEndpoint");

  const handleTabClick = (newTab) => {
    if (activeTab !== newTab) {
      setActiveTab(newTab);
    }
  };

  const getVerticalTabContainer = () => {
    return (
      <VanitySetVerticalTabContainer className={"m-2"}>
        <VanitySetVerticalTab
          tabText={"Call Operation Summary"}
          tabName={START_CONFIRMATION_VIEWS.CALL_OPERATION_SUMMARY}
          handleTabClick={handleTabClick}
          activeTab={activeTab}
        />
        <VanitySetVerticalTab
          tabText={"API Token Generation"}
          tabName={START_CONFIRMATION_VIEWS.CALL_OPERATION_API_TOKEN_GENERATION}
          handleTabClick={handleTabClick}
          activeTab={activeTab}
          visible={runRequestHeaderTokenEndpoint != null}
        />
        <VanitySetVerticalTab
          tabText={"Connection Validation"}
          tabName={START_CONFIRMATION_VIEWS.CALL_OPERATION_CONNECTION_VALIDATION}
          handleTabClick={handleTabClick}
          activeTab={activeTab}
          visible={runRequestConnectionCheckEndpoint != null}
        />
      </VanitySetVerticalTabContainer>
    );
  };

  const getCurrentView = () => {
    switch (activeTab) {
      case START_CONFIRMATION_VIEWS.CALL_OPERATION_SUMMARY:
        return (
          <ExternalRestApiIntegrationEndpointOrchestrationSummaryBase
            endpoint={runRequestCallOperationEndpoint}
          />
        );
      case START_CONFIRMATION_VIEWS.CALL_OPERATION_API_TOKEN_GENERATION:
        return (
          <ExternalRestApiIntegrationHeaderTokenEndpointOrchestrationSummary
            endpoint={runRequestHeaderTokenEndpoint}
          />
        );
      case START_CONFIRMATION_VIEWS.CALL_OPERATION_CONNECTION_VALIDATION:
        return (
          <ExternalRestApiIntegrationConnectionCheckEndpointOrchestrationSummary
            endpoint={runRequestConnectionCheckEndpoint}
          />
        );
      default:
        return null;
    }
  };

  if (externalRestApiIntegrationStepTaskModel == null) {
    return null;
  }

  return (
    <>
      {/*<ExternalRestApiIntegrationEndpointOrchestrationRuleEvaluationSummary*/}
      {/*  ruleEvaluation={statusCheckRuleEvaluation}*/}
      {/*  latestStatusCheckTime={lastStatusCheckTimestamp}*/}
      {/*  className={"my-2"}*/}
      {/*/>*/}
      <InfoContainer
        titleText={`Call Operation Log`}
      >
        <SideBySideViewBase
          leftSideView={getVerticalTabContainer()}
          leftSideMinimumWidth={"250px"}
          leftSideMaximumWidth={"250px"}
          rightSideView={
            <div className={"m-2"} style={{overflowX: "hidden"}}>
              {getCurrentView()}
            </div>
          }
        />
      </InfoContainer>
    </>
  );
}

ExternalRestApiIntegrationActivityLogStartConfirmationSummaryPanel.propTypes = {
  externalRestApiIntegrationStepTaskModel: PropTypes.object,
};
