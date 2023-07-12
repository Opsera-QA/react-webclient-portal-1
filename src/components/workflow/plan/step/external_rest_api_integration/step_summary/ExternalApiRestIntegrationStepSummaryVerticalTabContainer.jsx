import React, {useState} from "react";
import PropTypes from "prop-types";
import VanitySetVerticalTab from "components/common/tabs/vertical_tabs/VanitySetVerticalTab";
import VanitySetVerticalTabContainer from "components/common/tabs/vertical_tabs/VanitySetVerticalTabContainer";
import VanitySetTabAndViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabAndViewContainer";
import {
  EXTERNAL_REST_API_INTEGRATION_STEP_HEIGHTS
} from "components/workflow/plan/step/external_rest_api_integration/externalRestApiIntegrationStep.heights";
import ExternalApiRestIntegrationStepConfigurationConnectionValidationSummaryPanel
  from "components/workflow/plan/step/external_rest_api_integration/step_summary/ExternalApiRestIntegrationStepConfigurationConnectionValidationSummaryPanel";
import ExternalApiRestIntegrationStepConfigurationCallOperationSummaryPanel
  from "components/workflow/plan/step/external_rest_api_integration/step_summary/ExternalApiRestIntegrationStepConfigurationCallOperationSummaryPanel";
import ExternalApiRestIntegrationStepConfigurationStatusCheckSummaryPanel
  from "components/workflow/plan/step/external_rest_api_integration/step_summary/ExternalApiRestIntegrationStepConfigurationStatusCheckSummaryPanel";

const EXTERNAL_API_REST_INTEGRATION_TABS = {
  CONNECTION_VALIDATION_CONFIGURATION: "connection-validation-configuration",
  CALL_OPERATION_CONFIGURATION: "call-operation-configuration",
  STATUS_CHECK_CONFIGURATION: "status-check-configuration",
};

function ExternalApiRestIntegrationStepSummaryVerticalTabContainer(
  {
    externalRestApiIntegrationModel,
  }) {
  const [activeTab, setActiveTab] = useState(EXTERNAL_API_REST_INTEGRATION_TABS.CONNECTION_VALIDATION_CONFIGURATION);

  const handleTabClick = (newTab) => {
    if (newTab !== activeTab) {
      setActiveTab(newTab);
    }
  };

  const getVerticalTabContainer = () => {
    return (
      <VanitySetVerticalTabContainer>
        <div className={"tab-tree scroll-y"}>
          <VanitySetVerticalTab
            tabText={"Connection Validation"}
            tabName={EXTERNAL_API_REST_INTEGRATION_TABS.CONNECTION_VALIDATION_CONFIGURATION}
            handleTabClick={handleTabClick}
            activeTab={activeTab}
            tooltipText={"This is an optional prerequisite operation that validates the connectivity of the external tool before making the call operation request."}
          />
          <VanitySetVerticalTab
            tabText={"Call Operation"}
            tabName={EXTERNAL_API_REST_INTEGRATION_TABS.CALL_OPERATION_CONFIGURATION}
            handleTabClick={handleTabClick}
            activeTab={activeTab}
            tooltipText={"This is the actual calling of the API with all of the configured settings."}
          />
          <VanitySetVerticalTab
            tabText={"Status Check"}
            tabName={EXTERNAL_API_REST_INTEGRATION_TABS.STATUS_CHECK_CONFIGURATION}
            handleTabClick={handleTabClick}
            activeTab={activeTab}
            tooltipText={`
              This status check can be called multiple times depending on how long it takes the API to complete its task. 
              The status check will return either running, successful or failed based on the configured Evaluation Rules.
            `}
          />
        </div>
      </VanitySetVerticalTabContainer>
    );
  };

  // TODO: These views should probably be separate components
  const getCurrentView = () => {
    switch (activeTab) {
      case EXTERNAL_API_REST_INTEGRATION_TABS.CONNECTION_VALIDATION_CONFIGURATION:
        return (
          <ExternalApiRestIntegrationStepConfigurationConnectionValidationSummaryPanel
            externalRestApiIntegrationModel={externalRestApiIntegrationModel}
          />
        );
      case EXTERNAL_API_REST_INTEGRATION_TABS.CALL_OPERATION_CONFIGURATION:
        return (
          <ExternalApiRestIntegrationStepConfigurationCallOperationSummaryPanel
            externalRestApiIntegrationModel={externalRestApiIntegrationModel}
          />
        );
      case EXTERNAL_API_REST_INTEGRATION_TABS.STATUS_CHECK_CONFIGURATION:
        return (
          <ExternalApiRestIntegrationStepConfigurationStatusCheckSummaryPanel
            externalRestApiIntegrationModel={externalRestApiIntegrationModel}
          />
        );
    }
  };

  if (externalRestApiIntegrationModel == null) {
    return null;
  }

  return (
    <VanitySetTabAndViewContainer
      title={`API Request Configuration`}
      verticalTabContainer={getVerticalTabContainer()}
      tabColumnSize={3}
      currentView={
        <div style={{
          overflowX: "hidden",
          minHeight: EXTERNAL_REST_API_INTEGRATION_STEP_HEIGHTS.EXTERNAL_API_INTEGRATION_STEP_ENDPOINT_VERTICAL_TAB_CONTAINER_HEIGHT
        }}>
          {getCurrentView()}
        </div>
      }
      minimumHeight={EXTERNAL_REST_API_INTEGRATION_STEP_HEIGHTS.EXTERNAL_API_INTEGRATION_STEP_ENDPOINT_VERTICAL_TAB_CONTAINER_HEIGHT}
      maximumHeight={EXTERNAL_REST_API_INTEGRATION_STEP_HEIGHTS.EXTERNAL_API_INTEGRATION_STEP_ENDPOINT_VERTICAL_TAB_CONTAINER_HEIGHT}
      defaultActiveKey={activeTab}
    />
  );
}

ExternalApiRestIntegrationStepSummaryVerticalTabContainer.propTypes = {
  externalRestApiIntegrationModel: PropTypes.object,
};

export default ExternalApiRestIntegrationStepSummaryVerticalTabContainer;