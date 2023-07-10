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

const STATUS_CHECK_VIEWS = {
  STATUS_CHECK_SUMMARY: "statusCheckSummary",
  STATUS_CHECK_API_TOKEN_GENERATION: "statusCheckApiTokenGeneration",
  STATUS_CHECK_CONNECTION_VALIDATION: "statusCheckConnectionValidation",
};

export default function ExternalRestApiIntegrationActivityLogStatusCheckSummaryPanel(
  {
    externalRestApiIntegrationStepTaskModel,
  }) {
  const [activeTab, setActiveTab] = useState(STATUS_CHECK_VIEWS.STATUS_CHECK_SUMMARY);
  const statusCheckEndpoints = externalRestApiIntegrationStepTaskModel?.getData("api_response.apiResponse.endpoints");
  const statusCheckConnectionCheckEndpoint = externalRestApiIntegrationStepTaskModel?.getData("api_response.apiResponse.endpoints.connectionCheckEndpoint");
  const statusCheckHeaderTokenEndpoint = externalRestApiIntegrationStepTaskModel?.getData("api_response.apiResponse.endpoints.headerTokenEndpoint");
  const statusCheckStatusCheckEndpoint = externalRestApiIntegrationStepTaskModel?.getData("api_response.apiResponse.endpoints.statusCheckEndpoint");

  const handleTabClick = (newTab) => {
    if (activeTab !== newTab) {
      setActiveTab(newTab);
    }
  };

  const getVerticalTabContainer = () => {
    return (
      <VanitySetVerticalTabContainer className={"m-2"}>
        <VanitySetVerticalTab
          tabText={"Status Check Summary"}
          tabName={STATUS_CHECK_VIEWS.STATUS_CHECK_SUMMARY}
          handleTabClick={handleTabClick}
          activeTab={activeTab}
        />
        <VanitySetVerticalTab
          tabText={"API Token Generation"}
          tabName={STATUS_CHECK_VIEWS.STATUS_CHECK_API_TOKEN_GENERATION}
          handleTabClick={handleTabClick}
          activeTab={activeTab}
          visible={statusCheckHeaderTokenEndpoint != null}
        />
        <VanitySetVerticalTab
          tabText={"Connection Validation"}
          tabName={STATUS_CHECK_VIEWS.STATUS_CHECK_CONNECTION_VALIDATION}
          handleTabClick={handleTabClick}
          activeTab={activeTab}
          visible={statusCheckConnectionCheckEndpoint != null}
        />
      </VanitySetVerticalTabContainer>
    );
  };

  const getCurrentView = () => {
    switch (activeTab) {
      case STATUS_CHECK_VIEWS.STATUS_CHECK_SUMMARY:
        return (
          <ExternalRestApiIntegrationEndpointOrchestrationSummaryBase
            endpoint={statusCheckStatusCheckEndpoint}
          />
        );
      case STATUS_CHECK_VIEWS.STATUS_CHECK_API_TOKEN_GENERATION:
        return (
          <ExternalRestApiIntegrationHeaderTokenEndpointOrchestrationSummary
            endpoint={statusCheckHeaderTokenEndpoint}
          />
        );
      case STATUS_CHECK_VIEWS.STATUS_CHECK_CONNECTION_VALIDATION:
        return (
          <ExternalRestApiIntegrationConnectionCheckEndpointOrchestrationSummary
            endpoint={statusCheckConnectionCheckEndpoint}
          />
        );
      default:
        return null;
    }
  };

  if (externalRestApiIntegrationStepTaskModel == null || statusCheckEndpoints == null) {
    return null;
  }

  return (
    <InfoContainer
      titleText={`Status Check Log`}
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
  );
}

ExternalRestApiIntegrationActivityLogStatusCheckSummaryPanel.propTypes = {
  externalRestApiIntegrationStepTaskModel: PropTypes.object,
};
