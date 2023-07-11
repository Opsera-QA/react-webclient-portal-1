import React, {useState} from "react";
import PropTypes from "prop-types";
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
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

const SUMMARY_LOG_VIEWS = {
  STATUS_CHECK_SUMMARY: "statusCheckSummary",
  STATUS_CHECK_API_TOKEN_GENERATION: "statusCheckApiTokenGeneration",
  STATUS_CHECK_CONNECTION_VALIDATION: "statusCheckConnectionValidation",
  CALL_OPERATION_SUMMARY: "callOperationSummary",
  CALL_OPERATION_API_TOKEN_GENERATION: "callOperationApiTokenGeneration",
  CALL_OPERATION_CONNECTION_VALIDATION: "callOperationConnectionValidation",
};


export default function ExternalRestApiIntegrationActivityLogSummaryPanelBase(
  {
    titleText,
    callOperationEndpoints,
    statusCheckEndpoints,
  }) {
  const statusCheckConnectionCheckEndpoint = DataParsingHelper.parseNestedObject(statusCheckEndpoints, "connectionCheckEndpoint");
  const statusCheckHeaderTokenEndpoint = DataParsingHelper.parseNestedObject(statusCheckEndpoints, "headerTokenEndpoint");
  const statusCheckStatusCheckEndpoint = DataParsingHelper.parseNestedObject(statusCheckEndpoints, "statusCheckEndpoint");
  const runRequestConnectionCheckEndpoint = DataParsingHelper.parseNestedObject(callOperationEndpoints, "connectionCheckEndpoint");
  const runRequestHeaderTokenEndpoint = DataParsingHelper.parseNestedObject(callOperationEndpoints, "headerTokenEndpoint");
  const runRequestCallOperationEndpoint = DataParsingHelper.parseNestedObject(callOperationEndpoints, "runTriggerEndpoint");

  // TODO: Cleanup
  const getInitialScreen = () => {
    if (statusCheckStatusCheckEndpoint) {
      return SUMMARY_LOG_VIEWS.STATUS_CHECK_SUMMARY;
    } else if (statusCheckHeaderTokenEndpoint) {
      return SUMMARY_LOG_VIEWS.STATUS_CHECK_API_TOKEN_GENERATION;
    } else if (statusCheckConnectionCheckEndpoint) {
      return SUMMARY_LOG_VIEWS.STATUS_CHECK_CONNECTION_VALIDATION;
    } else if (runRequestCallOperationEndpoint) {
      return SUMMARY_LOG_VIEWS.CALL_OPERATION_SUMMARY;
    } else if (runRequestHeaderTokenEndpoint) {
      return SUMMARY_LOG_VIEWS.CALL_OPERATION_API_TOKEN_GENERATION;
    } else if (runRequestConnectionCheckEndpoint) {
      return SUMMARY_LOG_VIEWS.CALL_OPERATION_CONNECTION_VALIDATION;
    }
  };

  const [activeTab, setActiveTab] = useState(getInitialScreen());

  const handleTabClick = (newTab) => {
    if (activeTab !== newTab) {
      setActiveTab(newTab);
    }
  };

  const getStatusCheckTabs = () => {
    if (
      statusCheckConnectionCheckEndpoint != null
      || statusCheckHeaderTokenEndpoint != null
      || statusCheckStatusCheckEndpoint != null
    ) {
      return (
        <>
          <H5FieldSubHeader
            subheaderText={"Status Check"}
            className={"mb-3"}
          />
          <VanitySetVerticalTab
            tabText={"Status Check Summary"}
            tabName={SUMMARY_LOG_VIEWS.STATUS_CHECK_SUMMARY}
            handleTabClick={handleTabClick}
            activeTab={activeTab}
            visible={statusCheckStatusCheckEndpoint != null}
          />
          <VanitySetVerticalTab
            tabText={"API Token Generation"}
            tabName={SUMMARY_LOG_VIEWS.STATUS_CHECK_API_TOKEN_GENERATION}
            handleTabClick={handleTabClick}
            activeTab={activeTab}
            visible={statusCheckHeaderTokenEndpoint != null}
          />
          <VanitySetVerticalTab
            tabText={"Connection Validation"}
            tabName={SUMMARY_LOG_VIEWS.STATUS_CHECK_CONNECTION_VALIDATION}
            handleTabClick={handleTabClick}
            activeTab={activeTab}
            visible={statusCheckConnectionCheckEndpoint != null}
          />
          <div className={"mb-4"} />
        </>
      );
    }
  };

  const getCallOperationEndpointTabs = () => {
    if (
      runRequestConnectionCheckEndpoint != null
      || runRequestHeaderTokenEndpoint != null
      || runRequestCallOperationEndpoint != null
    ) {
      return (
        <>
          <H5FieldSubHeader
            subheaderText={"Call Operation"}
            className={"mb-3"}
          />
          <VanitySetVerticalTab
            tabText={"Call Operation Summary"}
            tabName={SUMMARY_LOG_VIEWS.CALL_OPERATION_SUMMARY}
            handleTabClick={handleTabClick}
            activeTab={activeTab}
            visible={runRequestCallOperationEndpoint != null}
          />
          <VanitySetVerticalTab
            tabText={"API Token Generation"}
            tabName={SUMMARY_LOG_VIEWS.CALL_OPERATION_API_TOKEN_GENERATION}
            handleTabClick={handleTabClick}
            activeTab={activeTab}
            visible={runRequestHeaderTokenEndpoint != null}
          />
          <VanitySetVerticalTab
            tabText={"Connection Validation"}
            tabName={SUMMARY_LOG_VIEWS.CALL_OPERATION_CONNECTION_VALIDATION}
            handleTabClick={handleTabClick}
            activeTab={activeTab}
            visible={runRequestConnectionCheckEndpoint != null}
          />
        </>
      );
    }
  };

  const getVerticalTabContainer = () => {
    return (
      <VanitySetVerticalTabContainer className={"m-2"}>
        {getStatusCheckTabs()}
        {getCallOperationEndpointTabs()}
      </VanitySetVerticalTabContainer>
    );
  };

  const getCurrentView = () => {
    switch (activeTab) {
      case SUMMARY_LOG_VIEWS.STATUS_CHECK_SUMMARY:
        return (
          <ExternalRestApiIntegrationEndpointOrchestrationSummaryBase
            endpoint={statusCheckStatusCheckEndpoint}
          />
        );
      case SUMMARY_LOG_VIEWS.STATUS_CHECK_API_TOKEN_GENERATION:
        return (
          <ExternalRestApiIntegrationHeaderTokenEndpointOrchestrationSummary
            endpoint={statusCheckHeaderTokenEndpoint}
          />
        );
      case SUMMARY_LOG_VIEWS.STATUS_CHECK_CONNECTION_VALIDATION:
        return (
          <ExternalRestApiIntegrationConnectionCheckEndpointOrchestrationSummary
            endpoint={statusCheckConnectionCheckEndpoint}
          />
        );
      case SUMMARY_LOG_VIEWS.CALL_OPERATION_SUMMARY:
        return (
          <ExternalRestApiIntegrationEndpointOrchestrationSummaryBase
            endpoint={runRequestCallOperationEndpoint}
          />
        );
      case SUMMARY_LOG_VIEWS.CALL_OPERATION_API_TOKEN_GENERATION:
        return (
          <ExternalRestApiIntegrationHeaderTokenEndpointOrchestrationSummary
            endpoint={runRequestHeaderTokenEndpoint}
          />
        );
      case SUMMARY_LOG_VIEWS.CALL_OPERATION_CONNECTION_VALIDATION:
        return (
          <ExternalRestApiIntegrationConnectionCheckEndpointOrchestrationSummary
            endpoint={runRequestConnectionCheckEndpoint}
          />
        );
      default:
        return null;
    }
  };

  if (
    statusCheckConnectionCheckEndpoint == null
    && statusCheckHeaderTokenEndpoint == null
    && statusCheckStatusCheckEndpoint == null
    && runRequestConnectionCheckEndpoint == null
    && runRequestHeaderTokenEndpoint == null
    && runRequestCallOperationEndpoint == null
  ) {
    return null;
  }

  return (
    <InfoContainer
      titleText={titleText}
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

ExternalRestApiIntegrationActivityLogSummaryPanelBase.propTypes = {
  titleText: PropTypes.string,
  callOperationEndpoints: PropTypes.object,
  statusCheckEndpoints: PropTypes.object,
};
