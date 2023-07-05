import React, {useState} from "react";
import PropTypes from "prop-types";
import ExternalRestApiIntegrationStatusCheckEndpointOrchestrationSummary
  from "components/workflow/plan/step/external_rest_api_integration/task_summary/endpoints/ExternalRestApiIntegrationStatusCheckEndpointOrchestrationSummary";
import ExternalRestApiIntegrationCallOperationEndpointOrchestrationSummary
  from "components/workflow/plan/step/external_rest_api_integration/task_summary/endpoints/ExternalRestApiIntegrationCallOperationEndpointOrchestrationSummary";
import CustomTab from "components/common/tabs/CustomTab";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import OverlayTabPanelContainer from "components/common/panels/general/OverlayTabPanelContainer";

export default function ExternalRestApiIntegrationActivityLogOperationLogSummaryPanel(
  {
    externalRestApiIntegrationStepTaskModel,
  }) {
  const [activeTab, setActiveTab] = useState("statusCheck");

  const handleTabClick = (newTab) => e => {
    e.preventDefault();

    if (activeTab !== newTab) {
      setActiveTab(newTab);
    }
  };

  const getTabContainer = () => {
    return (
      <CustomTabContainer>
        <CustomTab
          handleTabClick={handleTabClick}
          activeTab={activeTab}
          tabText={"Status Check Summary"}
          tabName={"statusCheck"}
        />
        <CustomTab
          handleTabClick={handleTabClick}
          activeTab={activeTab}
          tabText={"Call Operation Summary"}
          tabName={"callOperation"}
        />
      </CustomTabContainer>
    );
  };

  const getCurrentView = () => {
    switch (activeTab) {
      case "statusCheck":
        return (
          <ExternalRestApiIntegrationStatusCheckEndpointOrchestrationSummary
            externalRestApiIntegrationStepTaskModel={externalRestApiIntegrationStepTaskModel}
            className={"mt-2"}
          />
        );
      case "callOperation":
        return (
          <ExternalRestApiIntegrationCallOperationEndpointOrchestrationSummary
            externalRestApiIntegrationStepTaskModel={externalRestApiIntegrationStepTaskModel}
            className={"mt-2"}
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
    <OverlayTabPanelContainer
      currentView={getCurrentView()}
      tabContainer={getTabContainer()}
    />
  );
}

ExternalRestApiIntegrationActivityLogOperationLogSummaryPanel.propTypes = {
  externalRestApiIntegrationStepTaskModel: PropTypes.object,
  endpoint: PropTypes.object,
  endpoints: PropTypes.object,
};
