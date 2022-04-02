import React, {useState} from "react";
import PropTypes from "prop-types";
import VanitySetVerticalTab from "components/common/tabs/vertical_tabs/VanitySetVerticalTab";
import VanitySetVerticalTabContainer from "components/common/tabs/vertical_tabs/VanitySetVerticalTabContainer";
import ExternalApiIntegrationStepRunEndpointSelectInput
  from "components/workflow/plan/step/external_rest_api_integration/inputs/ExternalApiIntegrationStepRunEndpointSelectInput";
import ExternalApiIntegrationStepRunEndpointRequestInputBase
  from "components/workflow/plan/step/external_rest_api_integration/inputs/request/ExternalApiIntegrationStepRunEndpointRequestInputBase";
import EndpointResponseEvaluationRulesInputBase
  from "components/common/inputs/endpoints/endpoint/response/evaluation/EndpointResponseEvaluationRulesInputBase";
import ExternalApiIntegrationStepStatusEndpointSelectInput
  from "components/workflow/plan/step/external_rest_api_integration/inputs/ExternalApiIntegrationStepStatusEndpointSelectInput";
import VanitySetTabAndViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabAndViewContainer";

function ExternalApiRestIntegrationStepEndpointVerticalTabContainer(
  {
    externalRestApiIntegrationModel,
    setExternalRestApiIntegrationModel,
    disabled,
  }) {
  const [activeTab, setActiveTab] = useState("run-endpoint-configuration");

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
            tabText={"Run Endpoint Configuration"}
            tabName={"run-endpoint-configuration"}
            handleTabClick={handleTabClick}
            activeTab={activeTab}
          />
          <VanitySetVerticalTab
            tabText={"Run Response Evaluation"}
            tabName={"run-response-evaluation"}
            handleTabClick={handleTabClick}
            activeTab={activeTab}
          />
          <VanitySetVerticalTab
            tabText={"Status Endpoint Configuration"}
            tabName={"status-endpoint-configuration"}
            handleTabClick={handleTabClick}
            activeTab={activeTab}
          />
        </div>
        <VanitySetVerticalTab
          tabText={"Status Response Evaluation"}
          tabName={"status-response-evaluation"}
          handleTabClick={handleTabClick}
          activeTab={activeTab}
        />
      </VanitySetVerticalTabContainer>
    );
  };

  const getCurrentView = () => {
    switch (activeTab) {
      case "run-endpoint-configuration":
        return (
          <>
            <ExternalApiIntegrationStepRunEndpointSelectInput
              fieldName={"runEndpointId"}
              model={externalRestApiIntegrationModel}
              setModel={setExternalRestApiIntegrationModel}
              disabled={disabled}
            />
            <ExternalApiIntegrationStepRunEndpointRequestInputBase
              fieldName={"runEndpointRequestParameters"}
              model={externalRestApiIntegrationModel}
              setModel={setExternalRestApiIntegrationModel}
              toolId={externalRestApiIntegrationModel?.getData("toolId")}
              endpointId={externalRestApiIntegrationModel?.getData("runEndpointId")}
              disabled={disabled}
            />
          </>
        );
      case "run-response-evaluation":
        return (
          <EndpointResponseEvaluationRulesInputBase
            fieldName={"runEndpointResponseEvaluationRules"}
            model={externalRestApiIntegrationModel}
            setModel={setExternalRestApiIntegrationModel}
            toolId={externalRestApiIntegrationModel?.getData("toolId")}
            endpointId={externalRestApiIntegrationModel?.getData("runEndpointId")}
            disabled={disabled}
          />
        );
      case "status-endpoint-configuration":
        return (
          <>
            <ExternalApiIntegrationStepStatusEndpointSelectInput
              fieldName={"statusEndpointId"}
              model={externalRestApiIntegrationModel}
              setModel={setExternalRestApiIntegrationModel}
              disabled={disabled}
            />
            <ExternalApiIntegrationStepRunEndpointRequestInputBase
              fieldName={"statusEndpointRequestParameters"}
              model={externalRestApiIntegrationModel}
              setModel={setExternalRestApiIntegrationModel}
              toolId={externalRestApiIntegrationModel?.getData("toolId")}
              endpointId={externalRestApiIntegrationModel?.getData("statusEndpointId")}
              disabled={disabled}
            />
          </>
        );
      case "status-response-evaluation":
        return (
          <EndpointResponseEvaluationRulesInputBase
            fieldName={"statusEndpointResponseEvaluationRules"}
            model={externalRestApiIntegrationModel}
            setModel={setExternalRestApiIntegrationModel}
            toolId={externalRestApiIntegrationModel?.getData("toolId")}
            endpointId={externalRestApiIntegrationModel?.getData("runEndpointId")}
            disabled={disabled}
          />
        );
    }
  };

  if (externalRestApiIntegrationModel == null) {
    return null;
  }

  return (
    <VanitySetTabAndViewContainer
      title={`Endpoint Configuration`}
      verticalTabContainer={getVerticalTabContainer()}
      currentView={
        <div className={"m-3"}>
          {getCurrentView()}
        </div>
      }
      minimumHeight={"calc(100vh - 395px)"}
      maximumHeight={"calc(100vh - 395px)"}
      defaultActiveKey={activeTab}
    />
  );
}

ExternalApiRestIntegrationStepEndpointVerticalTabContainer.propTypes = {
  externalRestApiIntegrationModel: PropTypes.object,
  setExternalRestApiIntegrationModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default ExternalApiRestIntegrationStepEndpointVerticalTabContainer;