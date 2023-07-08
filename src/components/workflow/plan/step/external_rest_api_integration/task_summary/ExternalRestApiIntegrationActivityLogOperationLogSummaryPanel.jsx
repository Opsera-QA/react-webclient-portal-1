import React, {useState} from "react";
import PropTypes from "prop-types";
import ExternalRestApiIntegrationEndpointsOrchestrationSummary
  from "components/workflow/plan/step/external_rest_api_integration/task_summary/endpoints/ExternalRestApiIntegrationEndpointsOrchestrationSummary";
import VanitySetVerticalTabContainer from "components/common/tabs/vertical_tabs/VanitySetVerticalTabContainer";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import VanitySetVerticalTab from "components/common/tabs/vertical_tabs/VanitySetVerticalTab";
import InfoContainer from "components/common/containers/InfoContainer";
import SideBySideViewBase from "components/common/tabs/SideBySideViewBase";
import ExternalRestApiIntegrationEndpointOrchestrationSummaryBase
  from "components/workflow/plan/step/external_rest_api_integration/task_summary/endpoints/ExternalRestApiIntegrationEndpointOrchestrationSummaryBase";
import ExternalRestApiIntegrationHeaderTokenEndpointOrchestrationSummary
  from "components/workflow/plan/step/external_rest_api_integration/task_summary/endpoints/ExternalRestApiIntegrationHeaderTokenEndpointOrchestrationSummary";
import ExternalRestApiIntegrationConnectionCheckEndpointOrchestrationSummary
  from "components/workflow/plan/step/external_rest_api_integration/task_summary/endpoints/ExternalRestApiIntegrationConnectionCheckEndpointOrchestrationSummary";
import ExternalRestApiIntegrationEndpointOrchestrationRuleEvaluationSummary
  from "components/workflow/plan/step/external_rest_api_integration/task_summary/endpoints/ExternalRestApiIntegrationEndpointOrchestrationRuleEvaluationSummary";

const OPERATION_LOG_VIEWS = {
  STATUS_CHECK_SUMMARY: "statusCheckSummary",
  STATUS_CHECK_API_TOKEN_GENERATION: "statusCheckApiTokenGeneration",
  STATUS_CHECK_CONNECTION_VALIDATION: "statusCheckConnectionValidation",
  CALL_OPERATION_SUMMARY: "callOperationSummary",
  CALL_OPERATION_API_TOKEN_GENERATION: "callOperationApiTokenGeneration",
  CALL_OPERATION_CONNECTION_VALIDATION: "callOperationConnectionValidation",
};

export default function ExternalRestApiIntegrationActivityLogOperationLogSummaryPanel(
  {
    externalRestApiIntegrationStepTaskModel,
  }) {
  const [activeTab, setActiveTab] = useState(OPERATION_LOG_VIEWS.STATUS_CHECK_SUMMARY);
  const statusCheckRuleEvaluation = externalRestApiIntegrationStepTaskModel?.getData("api_response.last_status_check_request.ruleEvaluation");
  const lastStatusCheckTimestamp = externalRestApiIntegrationStepTaskModel?.getData("api_response.last_status_check_timestamp");
  const statusCheckConnectionCheckEndpoint = externalRestApiIntegrationStepTaskModel?.getData("api_response.last_status_check_request.endpoints.connectionCheckEndpoint");
  const statusCheckHeaderTokenEndpoint = externalRestApiIntegrationStepTaskModel?.getData("api_response.last_status_check_request.endpoints.headerTokenEndpoint");
  const statusCheckStatusCheckEndpoint = externalRestApiIntegrationStepTaskModel?.getData("api_response.last_status_check_request.endpoints.statusCheckEndpoint");
  const runRequestConnectionCheckEndpoint = externalRestApiIntegrationStepTaskModel?.getData("api_response.run_request.endpoints.connectionCheckEndpoint");
  const runRequestHeaderTokenEndpoint = externalRestApiIntegrationStepTaskModel?.getData("api_response.run_request.endpoints.headerTokenEndpoint");
  const runRequestRuleEvaluation = externalRestApiIntegrationStepTaskModel?.getData("api_response.run_request.ruleEvaluation");
  const runRequestCallOperationEndpoint = externalRestApiIntegrationStepTaskModel?.getData("api_response.run_request.endpoints.runTriggerEndpoint");

  const handleTabClick = (newTab) => {
    if (activeTab !== newTab) {
      setActiveTab(newTab);
    }
  };

  const getVerticalTabContainer = () => {
    return (
      <VanitySetVerticalTabContainer className={"m-2"}>
        <H5FieldSubHeader
          subheaderText={"Status Check"}
          className={"mb-3"}
        />
        <VanitySetVerticalTab
          tabText={"Status Check Summary"}
          tabName={OPERATION_LOG_VIEWS.STATUS_CHECK_SUMMARY}
          handleTabClick={handleTabClick}
          activeTab={activeTab}
        />
        <VanitySetVerticalTab
          tabText={"API Token Generation"}
          tabName={OPERATION_LOG_VIEWS.STATUS_CHECK_API_TOKEN_GENERATION}
          handleTabClick={handleTabClick}
          activeTab={activeTab}
          visible={statusCheckHeaderTokenEndpoint != null}
        />
        <VanitySetVerticalTab
          tabText={"Connection Validation"}
          tabName={OPERATION_LOG_VIEWS.STATUS_CHECK_CONNECTION_VALIDATION}
          handleTabClick={handleTabClick}
          activeTab={activeTab}
          visible={statusCheckConnectionCheckEndpoint != null}
        />
        <H5FieldSubHeader
          subheaderText={"Call Operation"}
          className={"mt-4 mb-3"}
        />
        <VanitySetVerticalTab
          tabText={"Call Operation Summary"}
          tabName={OPERATION_LOG_VIEWS.CALL_OPERATION_SUMMARY}
          handleTabClick={handleTabClick}
          activeTab={activeTab}
        />
        <VanitySetVerticalTab
          tabText={"API Token Generation"}
          tabName={OPERATION_LOG_VIEWS.CALL_OPERATION_API_TOKEN_GENERATION}
          handleTabClick={handleTabClick}
          activeTab={activeTab}
          visible={runRequestHeaderTokenEndpoint != null}
        />
        <VanitySetVerticalTab
          tabText={"Connection Validation"}
          tabName={OPERATION_LOG_VIEWS.CALL_OPERATION_CONNECTION_VALIDATION}
          handleTabClick={handleTabClick}
          activeTab={activeTab}
          visible={runRequestConnectionCheckEndpoint != null}
        />
      </VanitySetVerticalTabContainer>
    );
  };

  const getCurrentView = () => {
    switch (activeTab) {
      case OPERATION_LOG_VIEWS.STATUS_CHECK_SUMMARY:
        return (
          <ExternalRestApiIntegrationEndpointOrchestrationSummaryBase
            endpoint={statusCheckStatusCheckEndpoint}
          />
        );
      case OPERATION_LOG_VIEWS.STATUS_CHECK_API_TOKEN_GENERATION:
        return (
          <ExternalRestApiIntegrationHeaderTokenEndpointOrchestrationSummary
            endpoint={statusCheckHeaderTokenEndpoint}
          />
        );
      case OPERATION_LOG_VIEWS.STATUS_CHECK_CONNECTION_VALIDATION:
        return (
          <ExternalRestApiIntegrationConnectionCheckEndpointOrchestrationSummary
            endpoint={statusCheckConnectionCheckEndpoint}
          />
        );
      case OPERATION_LOG_VIEWS.CALL_OPERATION_SUMMARY:
        return (
          <ExternalRestApiIntegrationEndpointOrchestrationSummaryBase
            endpoint={runRequestCallOperationEndpoint}
          />
        );
      case OPERATION_LOG_VIEWS.CALL_OPERATION_API_TOKEN_GENERATION:
        return (
          <ExternalRestApiIntegrationHeaderTokenEndpointOrchestrationSummary
            endpoint={runRequestHeaderTokenEndpoint}
          />
        );
      case OPERATION_LOG_VIEWS.CALL_OPERATION_CONNECTION_VALIDATION:
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
      <H5FieldSubHeader
        subheaderText={"Latest Status Check"}
        className={"mt-2"}
      />
      <ExternalRestApiIntegrationEndpointOrchestrationRuleEvaluationSummary
        ruleEvaluation={statusCheckRuleEvaluation}
        latestStatusCheckTime={lastStatusCheckTimestamp}
        className={"my-2"}
      />
      <InfoContainer
        titleText={`Operation Log`}
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

ExternalRestApiIntegrationActivityLogOperationLogSummaryPanel.propTypes = {
  externalRestApiIntegrationStepTaskModel: PropTypes.object,
};
