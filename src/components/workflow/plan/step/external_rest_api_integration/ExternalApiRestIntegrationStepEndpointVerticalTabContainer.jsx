import React, {useState} from "react";
import PropTypes from "prop-types";
import VanitySetVerticalTab from "components/common/tabs/vertical_tabs/VanitySetVerticalTab";
import VanitySetVerticalTabContainer from "components/common/tabs/vertical_tabs/VanitySetVerticalTabContainer";
import ExternalApiIntegrationStepRunTriggerEndpointSelectInput
  from "components/workflow/plan/step/external_rest_api_integration/inputs/run_trigger/ExternalApiIntegrationStepRunTriggerEndpointSelectInput";
import ExternalApiIntegrationStepRunEndpointRequestInputBase
  from "components/workflow/plan/step/external_rest_api_integration/inputs/request/ExternalApiIntegrationStepRunEndpointRequestInputBase";
import EndpointResponseEvaluationRulesInputBase
  from "components/common/inputs/endpoints/endpoint/response/evaluation/EndpointResponseEvaluationRulesInputBase";
import ExternalApiIntegrationStepStatusCheckEndpointSelectInput
  from "components/workflow/plan/step/external_rest_api_integration/inputs/status_check/ExternalApiIntegrationStepStatusCheckEndpointSelectInput";
import VanitySetTabAndViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabAndViewContainer";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import ExternalApiIntegrationStepConnectionCheckEndpointSelectInput
  from "components/workflow/plan/step/external_rest_api_integration/inputs/connection_check/ExternalApiIntegrationStepConnectionCheckEndpointSelectInput";
import { Row } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import ExternalApiIntegrationStepUseConnectionCheckBooleanToggleInput
  from "components/workflow/plan/step/external_rest_api_integration/inputs/connection_check/ExternalApiIntegrationStepUseConnectionCheckBooleanToggleInput";
import {
  EXTERNAL_REST_API_INTEGRATION_STEP_HEIGHTS
} from "components/workflow/plan/step/external_rest_api_integration/externalRestApiIntegrationStep.heights";

const EXTERNAL_API_REST_INTEGRATION_TABS = {
  CONNECTION_CHECK_API_CONFIGURATION: "connection-check-api-configuration",
  CONNECTION_CHECK_SUCCESSFUL_EVALUATION_RULES_CONFIGURATION: "connection-check-successful-evaluation-rules-configuration",
  RUN_TRIGGER_API_CONFIGURATION: "run-trigger-api-configuration",
  // RUN_TRIGGER_IN_PROGRESS_EVALUATION_RULES_CONFIGURATION: "run-trigger-in-progress-evaluation-rules-configuration",
  RUN_TRIGGER_SUCCESSFUL_TRIGGER_EVALUATION_RULES_CONFIGURATION: "run-trigger-successful-trigger-evaluation-rules-configuration",
  STATUS_CHECK_API_CONFIGURATION: "status-check-api-configuration",
  STATUS_CHECK_IN_PROGRESS_EVALUATION_RULES_CONFIGURATION: "status-check-in-progress-evaluation-rules-configuration",
  STATUS_CHECK_SUCCESSFUL_COMPLETION_EVALUATION_RULES_CONFIGURATION: "status-check-successful-completion-evaluation-rules-configuration",
};

// TODO: Remove all Run Trigger in progress based code once verified OR in next update to API Integrator
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
          {/*<VanitySetVerticalTab*/}
          {/*  tabText={"In Progress Evaluation Rules"}*/}
          {/*  tabName={EXTERNAL_API_REST_INTEGRATION_TABS.RUN_TRIGGER_IN_PROGRESS_EVALUATION_RULES_CONFIGURATION}*/}
          {/*  handleTabClick={handleTabClick}*/}
          {/*  activeTab={activeTab}*/}
          {/*/>*/}
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
            <Row>
              <Col xs={6} sm={3}>
                <ExternalApiIntegrationStepUseConnectionCheckBooleanToggleInput
                  model={externalRestApiIntegrationModel}
                  setModel={setExternalRestApiIntegrationModel}
                  disabled={disabled}
                />
              </Col>
              <Col xs={6} md={9}>
                <ExternalApiIntegrationStepConnectionCheckEndpointSelectInput
                  model={externalRestApiIntegrationModel}
                  setModel={setExternalRestApiIntegrationModel}
                  disabled={disabled || externalRestApiIntegrationModel?.getData("useConnectionCheck") !== true}
                />
              </Col>
            </Row>
            <ExternalApiIntegrationStepRunEndpointRequestInputBase
              fieldName={"connectionCheckRequestParameters"}
              model={externalRestApiIntegrationModel}
              setModel={setExternalRestApiIntegrationModel}
              toolId={externalRestApiIntegrationModel?.getData("toolId")}
              endpointId={externalRestApiIntegrationModel?.getData("connectionCheckEndpointId")}
              disabled={disabled || externalRestApiIntegrationModel?.getData("useConnectionCheck") !== true}
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
            <ExternalApiIntegrationStepRunTriggerEndpointSelectInput
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
      // case EXTERNAL_API_REST_INTEGRATION_TABS.RUN_TRIGGER_IN_PROGRESS_EVALUATION_RULES_CONFIGURATION:
      //   return (
      //     <EndpointResponseEvaluationRulesInputBase
      //       fieldName={"runEndpointResponseEvaluationRules"}
      //       evaluationRuleFieldName={"running_rule"}
      //       model={externalRestApiIntegrationModel}
      //       setModel={setExternalRestApiIntegrationModel}
      //       toolId={externalRestApiIntegrationModel?.getData("toolId")}
      //       endpointId={externalRestApiIntegrationModel?.getData("runEndpointId")}
      //       disabled={disabled}
      //     />
      //   );
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
            <ExternalApiIntegrationStepStatusCheckEndpointSelectInput
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
        <div style={{overflowX: "hidden", minHeight: EXTERNAL_REST_API_INTEGRATION_STEP_HEIGHTS.EXTERNAL_API_INTEGRATION_STEP_ENDPOINT_VERTICAL_TAB_CONTAINER_HEIGHT}}>
          {getCurrentView()}
        </div>
      }
      minimumHeight={EXTERNAL_REST_API_INTEGRATION_STEP_HEIGHTS.EXTERNAL_API_INTEGRATION_STEP_ENDPOINT_VERTICAL_TAB_CONTAINER_HEIGHT}
      maximumHeight={EXTERNAL_REST_API_INTEGRATION_STEP_HEIGHTS.EXTERNAL_API_INTEGRATION_STEP_ENDPOINT_VERTICAL_TAB_CONTAINER_HEIGHT}
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