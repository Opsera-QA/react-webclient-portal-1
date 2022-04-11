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
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import ExternalApiIntegrationStepConnectionCheckEndpointSelectInput
  from "components/workflow/plan/step/external_rest_api_integration/inputs/ExternalApiIntegrationStepConnectionCheckEndpointSelectInput";

const height = "calc(100vh - 395px)";
const EXTERNAL_API_REST_INTEGRATION_TABS = {
  CONNECTION_CHECK_API_CONFIGURATION: "connection-check-api-configuration",
  CONNECTION_CHECK_SUCCESSFUL_EVALUATION_RULES_CONFIGURATION: "connection-check-successful-evaluation-rules-configuration",
  RUN_TRIGGER_API_CONFIGURATION: "run-trigger-api-configuration",
  RUN_TRIGGER_IN_PROGRESS_EVALUATION_RULES_CONFIGURATION: "run-trigger-in-progress-evaluation-rules-configuration",
  RUN_TRIGGER_SUCCESSFUL_TRIGGER_EVALUATION_RULES_CONFIGURATION: "run-trigger-successful-trigger-evaluation-rules-configuration",
  STATUS_CHECK_API_CONFIGURATION: "status-check-api-configuration",
  STATUS_CHECK_IN_PROGRESS_EVALUATION_RULES_CONFIGURATION: "status-check-in-progress-evaluation-rules-configuration",
  STATUS_CHECK_SUCCESSFUL_COMPLETION_EVALUATION_RULES_CONFIGURATION: "status-check-successful-completion-evaluation-rules-configuration",
};

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
          <H5FieldSubHeader
            subheaderText={"Connection Check"}
            className={"mb-3"}
          />
          <VanitySetVerticalTab
            tabText={"API Configuration"}
            tabName={EXTERNAL_API_REST_INTEGRATION_TABS.CONNECTION_CHECK_API_CONFIGURATION}
            handleTabClick={handleTabClick}
            activeTab={activeTab}
          />
          <VanitySetVerticalTab
            tabText={"Successful Connection Evaluation Rules"}
            tabName={EXTERNAL_API_REST_INTEGRATION_TABS.CONNECTION_CHECK_SUCCESSFUL_EVALUATION_RULES_CONFIGURATION}
            handleTabClick={handleTabClick}
            activeTab={activeTab}
          />
          <H5FieldSubHeader
            subheaderText={"Run Trigger"}
            className={"mt-4 mb-3"}
          />
          <VanitySetVerticalTab
            tabText={"API Configuration"}
            tabName={EXTERNAL_API_REST_INTEGRATION_TABS.RUN_TRIGGER_API_CONFIGURATION}
            handleTabClick={handleTabClick}
            activeTab={activeTab}
          />
          <VanitySetVerticalTab
            tabText={"In Progress Evaluation Rules"}
            tabName={EXTERNAL_API_REST_INTEGRATION_TABS.RUN_TRIGGER_IN_PROGRESS_EVALUATION_RULES_CONFIGURATION}
            handleTabClick={handleTabClick}
            activeTab={activeTab}
          />
          <VanitySetVerticalTab
            tabText={"Successful Trigger Evaluation Rules"}
            tabName={EXTERNAL_API_REST_INTEGRATION_TABS.RUN_TRIGGER_SUCCESSFUL_TRIGGER_EVALUATION_RULES_CONFIGURATION}
            handleTabClick={handleTabClick}
            activeTab={activeTab}
          />
          <H5FieldSubHeader
            subheaderText={"Status Check"}
            className={"mt-4 mb-3"}
          />
          <VanitySetVerticalTab
            tabText={"API Configuration"}
            tabName={EXTERNAL_API_REST_INTEGRATION_TABS.STATUS_CHECK_API_CONFIGURATION}
            handleTabClick={handleTabClick}
            activeTab={activeTab}
          />
          <VanitySetVerticalTab
            tabText={"In Progress Evaluation Rules"}
            tabName={EXTERNAL_API_REST_INTEGRATION_TABS.STATUS_CHECK_IN_PROGRESS_EVALUATION_RULES_CONFIGURATION}
            handleTabClick={handleTabClick}
            activeTab={activeTab}
          />
          <VanitySetVerticalTab
            tabText={"Successful Completion Evaluation Rules"}
            tabName={EXTERNAL_API_REST_INTEGRATION_TABS.STATUS_CHECK_SUCCESSFUL_COMPLETION_EVALUATION_RULES_CONFIGURATION}
            handleTabClick={handleTabClick}
            activeTab={activeTab}
          />
        </div>
      </VanitySetVerticalTabContainer>
    );
  };

  const getCurrentView = () => {
    switch (activeTab) {
      case EXTERNAL_API_REST_INTEGRATION_TABS.CONNECTION_CHECK_API_CONFIGURATION:
        return (
          <div className={"mx-2"}>
            <ExternalApiIntegrationStepConnectionCheckEndpointSelectInput
              model={externalRestApiIntegrationModel}
              setModel={setExternalRestApiIntegrationModel}
              disabled={disabled}
            />
            <ExternalApiIntegrationStepRunEndpointRequestInputBase
              fieldName={"connectionCheckEndpointRequestParameters"}
              model={externalRestApiIntegrationModel}
              setModel={setExternalRestApiIntegrationModel}
              toolId={externalRestApiIntegrationModel?.getData("toolId")}
              endpointId={externalRestApiIntegrationModel?.getData("runEndpointId")}
              disabled={disabled}
            />
          </div>
        );
      case EXTERNAL_API_REST_INTEGRATION_TABS.CONNECTION_CHECK_SUCCESSFUL_EVALUATION_RULES_CONFIGURATION:
        return (
          <EndpointResponseEvaluationRulesInputBase
            fieldName={"connectionCheckResponseEvaluationRules"}
            evaluationRuleFieldName={"success_rule"}
            model={externalRestApiIntegrationModel}
            setModel={setExternalRestApiIntegrationModel}
            toolId={externalRestApiIntegrationModel?.getData("toolId")}
            endpointId={externalRestApiIntegrationModel?.getData("connectionCheckEndpointId")}
            disabled={disabled}
          />
        );
      case EXTERNAL_API_REST_INTEGRATION_TABS.RUN_TRIGGER_API_CONFIGURATION:
        return (
          <div className={"mx-2"}>
            <ExternalApiIntegrationStepRunEndpointSelectInput
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
      case EXTERNAL_API_REST_INTEGRATION_TABS.RUN_TRIGGER_IN_PROGRESS_EVALUATION_RULES_CONFIGURATION:
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
      case EXTERNAL_API_REST_INTEGRATION_TABS.RUN_TRIGGER_SUCCESSFUL_TRIGGER_EVALUATION_RULES_CONFIGURATION:
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
      case EXTERNAL_API_REST_INTEGRATION_TABS.STATUS_CHECK_API_CONFIGURATION:
        return (
          <div className={"mx-2"}>
            <ExternalApiIntegrationStepStatusEndpointSelectInput
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
      case EXTERNAL_API_REST_INTEGRATION_TABS.STATUS_CHECK_IN_PROGRESS_EVALUATION_RULES_CONFIGURATION:
        return (
          <EndpointResponseEvaluationRulesInputBase
            fieldName={"statusEndpointResponseEvaluationRules"}
            evaluationRuleFieldName={"running_rule"}
            model={externalRestApiIntegrationModel}
            setModel={setExternalRestApiIntegrationModel}
            toolId={externalRestApiIntegrationModel?.getData("toolId")}
            endpointId={externalRestApiIntegrationModel?.getData("statusEndpointId")}
            disabled={disabled}
          />
        );
      case EXTERNAL_API_REST_INTEGRATION_TABS.STATUS_CHECK_SUCCESSFUL_COMPLETION_EVALUATION_RULES_CONFIGURATION:
        return (
          <EndpointResponseEvaluationRulesInputBase
            fieldName={"statusEndpointResponseEvaluationRules"}
            evaluationRuleFieldName={"success_rule"}
            model={externalRestApiIntegrationModel}
            setModel={setExternalRestApiIntegrationModel}
            toolId={externalRestApiIntegrationModel?.getData("toolId")}
            endpointId={externalRestApiIntegrationModel?.getData("statusEndpointId")}
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
      tabColumnSize={3}
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