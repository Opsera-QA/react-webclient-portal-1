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

const height = "calc(100vh - 395px)";
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
            tabText={"Run Response Success Evaluation"}
            tabName={"run-success-rule"}
            handleTabClick={handleTabClick}
            activeTab={activeTab}
          />
          <VanitySetVerticalTab
            tabText={"Run Response Running Evaluation"}
            tabName={"run-running-rule"}
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
          tabText={"Status Response Success Evaluation"}
          tabName={"status-success-rule"}
          handleTabClick={handleTabClick}
          activeTab={activeTab}
        />
        <VanitySetVerticalTab
          tabText={"Status Response Running Evaluation"}
          tabName={"status-running-rule"}
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
          <div className={"mx-2"}>
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
          </div>
        );
      case "run-success-rule":
        return (
          <EndpointResponseEvaluationRulesInputBase
            fieldName={"runEndpointResponseEvaluationRules"}
            evaluationRuleFieldName={"success_rule"}
            model={externalRestApiIntegrationModel}
            setModel={setExternalRestApiIntegrationModel}
            toolId={externalRestApiIntegrationModel?.getData("toolId")}
            endpointId={externalRestApiIntegrationModel?.getData("runEndpointId")}
            disabled={disabled}
          />
        );
      case "run-running-rule":
        return (
          <EndpointResponseEvaluationRulesInputBase
            fieldName={"runEndpointResponseEvaluationRules"}
            evaluationRuleFieldName={"running_rule"}
            model={externalRestApiIntegrationModel}
            setModel={setExternalRestApiIntegrationModel}
            toolId={externalRestApiIntegrationModel?.getData("toolId")}
            endpointId={externalRestApiIntegrationModel?.getData("runEndpointId")}
            disabled={disabled}
          />
        );
      case "status-endpoint-configuration":
        return (
          <div className={"mx-2"}>
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
          </div>
        );
      case "status-success-rule":
        return (
          <EndpointResponseEvaluationRulesInputBase
            fieldName={"statusEndpointResponseEvaluationRules"}
            evaluationRuleFieldName={"success_rule"}
            model={externalRestApiIntegrationModel}
            setModel={setExternalRestApiIntegrationModel}
            toolId={externalRestApiIntegrationModel?.getData("toolId")}
            endpointId={externalRestApiIntegrationModel?.getData("runEndpointId")}
            disabled={disabled}
          />
        );
      case "status-running-rule":
        return (
          <EndpointResponseEvaluationRulesInputBase
            fieldName={"statusEndpointResponseEvaluationRules"}
            evaluationRuleFieldName={"running_rule"}
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
        <div style={{overflowX: "hidden", minHeight: height}}>
          {getCurrentView()}
        </div>
      }
      minimumHeight={height}
      maximumHeight={height}
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