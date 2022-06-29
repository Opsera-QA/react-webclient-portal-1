import React, {useState} from "react";
import PropTypes from "prop-types";
import VanitySetVerticalTab from "components/common/tabs/vertical_tabs/VanitySetVerticalTab";
import VanitySetVerticalTabContainer from "components/common/tabs/vertical_tabs/VanitySetVerticalTabContainer";
import {
  ENDPOINT_REQUEST_TYPES
} from "components/common/list_of_values_input/tools/extermal_api_integrator/request/types/endpointRequestType.constants";
import EndpointRequestBodyInputPanel
  from "components/common/inputs/endpoints/endpoint/request/body/EndpointRequestBodyInputPanel";
import EndpointResponseBodyInputBase
  from "components/common/inputs/endpoints/endpoint/response/body/EndpointResponseBodyInputBase";
import {faBracketsCurly} from "@fortawesome/pro-light-svg-icons";
import VanitySetTabAndViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabAndViewContainer";
import EndpointRequestHeaderConfigurationInput
  from "components/common/inputs/endpoints/endpoint/request/headers/EndpointRequestHeaderConfigurationInput";
import {
  EXTERNAL_API_INTEGRATOR_ENDPOINT_PARAMETER_INPUT_HEIGHTS
} from "components/inventory/tools/details/identifiers/external_api_integrator/endpoints/externalApiIntegratorEndpointInput.heights";
import { ENDPOINT_TYPES } from "components/common/list_of_values_input/inventory/endpoints/type/endpointType.constants";
import EndpointApiConfigurationInputBase
  from "components/common/inputs/endpoints/endpoint/request/EndpointApiConfigurationInputBase";
import EndpointResponseEvaluationRulesInputBase
  from "components/common/inputs/endpoints/endpoint/response/evaluation/EndpointResponseEvaluationRulesInputBase";
import ValidateEndpointPanel from "components/common/inputs/endpoints/endpoint/response/test/ValidateEndpointPanel";

function ExternalApiIntegratorEndpointParametersVerticalTabContainer(
  {
    externalApiIntegratorModel,
    setExternalApiIntegratorModel,
    disabled,
    toolId,
  }) {
  const [activeTab, setActiveTab] = useState("requestHeaderConfiguration");

  const handleTabClick = (newTab) => {
    if (newTab !== activeTab) {
      setActiveTab(newTab);
    }
  };

  const getDynamicTabsForEndpointType = () => {
    switch (externalApiIntegratorModel?.getData("type")) {
      case ENDPOINT_TYPES.ACCESS_TOKEN_GENERATION:
      case ENDPOINT_TYPES.CONNECTION_VALIDATION:
        return (
          <>
            <VanitySetVerticalTab
              tabText={"API Configuration"}
              tabName={"apiConfiguration"}
              handleTabClick={handleTabClick}
              activeTab={activeTab}
            />
            <VanitySetVerticalTab
              tabText={"Evaluation Rules"}
              tabName={"evaluationRules"}
              handleTabClick={handleTabClick}
              activeTab={activeTab}
            />
            <VanitySetVerticalTab
              tabText={"Test Endpoint"}
              tabName={"endpointTest"}
              handleTabClick={handleTabClick}
              activeTab={activeTab}
              visible={externalApiIntegratorModel?.isNew() !== true}
            />
          </>
        );
    }
  };

  const getDynamicTabsForRequestType = () => {
    switch (externalApiIntegratorModel?.getData("requestType")) {
      case ENDPOINT_REQUEST_TYPES.GET:
        return (
          <VanitySetVerticalTab
            tabText={"Query Parameters"}
            tabName={"queryParameters"}
            handleTabClick={handleTabClick}
            activeTab={activeTab}
          />
        );
      case ENDPOINT_REQUEST_TYPES.PUT:
      case ENDPOINT_REQUEST_TYPES.POST:
        return (
          <VanitySetVerticalTab
            tabText={"Request Body"}
            tabName={"requestBody"}
            handleTabClick={handleTabClick}
            activeTab={activeTab}
          />
        );
    }
  };

  const getVerticalTabContainer = () => {
    return (
      <VanitySetVerticalTabContainer>
        <div className={"tab-tree"}>
          <VanitySetVerticalTab
            tabText={"Request Header"}
            tabName={"requestHeaderConfiguration"}
            handleTabClick={handleTabClick}
            activeTab={activeTab}
          />
          {getDynamicTabsForRequestType()}
          <VanitySetVerticalTab
            tabText={"Response Body"}
            tabName={"responseBody"}
            handleTabClick={handleTabClick}
            activeTab={activeTab}
          />
          {getDynamicTabsForEndpointType()}
        </div>
      </VanitySetVerticalTabContainer>
    );
  };

  const getCurrentView = () => {
    switch (activeTab) {
      case "requestHeaderConfiguration":
        return (
          <EndpointRequestHeaderConfigurationInput
            model={externalApiIntegratorModel}
            setModel={setExternalApiIntegratorModel}
            disabled={disabled}
            toolId={toolId}
          />
        );
      case "queryParameters":
        return (
          <EndpointRequestBodyInputPanel
            model={externalApiIntegratorModel}
            setModel={setExternalApiIntegratorModel}
            fieldName={"queryParameterFields"}
            disabled={disabled}
          />
        );
      case "requestBody":
        return (
          <EndpointRequestBodyInputPanel
            model={externalApiIntegratorModel}
            setModel={setExternalApiIntegratorModel}
            fieldName={"requestBodyFields"}
            disabled={disabled}
          />
        );
      case "responseBody":
        return (
          <EndpointResponseBodyInputBase
            model={externalApiIntegratorModel}
            setModel={setExternalApiIntegratorModel}
            fieldName={"responseBodyFields"}
            disabled={disabled}
          />
        );
      case "apiConfiguration":
        return (
          <div className={"mx-3 mt-3"}>
            <EndpointApiConfigurationInputBase
              fieldName={"requestParameters"}
              model={externalApiIntegratorModel}
              setModel={setExternalApiIntegratorModel}
              disabled={disabled}
              endpoint={{...externalApiIntegratorModel?.getPersistData()}}
              height={EXTERNAL_API_INTEGRATOR_ENDPOINT_PARAMETER_INPUT_HEIGHTS.ENDPOINT_CONFIGURATION_PANEL_HEIGHT}
              endpointParameterInputHeight={EXTERNAL_API_INTEGRATOR_ENDPOINT_PARAMETER_INPUT_HEIGHTS.ENDPOINT_RESPONSE_BODY_FIELD_INPUT_HEIGHT}
              endpointParameterArrayInputHeight={EXTERNAL_API_INTEGRATOR_ENDPOINT_PARAMETER_INPUT_HEIGHTS.ENDPOINT_EVALUATION_RULE_ARRAY_INPUT_HEIGHT}
            />
          </div>
        );
      case "evaluationRules":
        return (
          <div className={"mx-3"}>
            <EndpointResponseEvaluationRulesInputBase
              model={externalApiIntegratorModel}
              setModel={setExternalApiIntegratorModel}
              fieldName={"responseEvaluationRules"}
              evaluationRuleFieldName={"success_rule"}
              endpoint={{...externalApiIntegratorModel?.getPersistData()}}
              disabled={disabled}
              evaluationRulesInputHeight={EXTERNAL_API_INTEGRATOR_ENDPOINT_PARAMETER_INPUT_HEIGHTS.ENDPOINT_EVALUATION_RULE_INPUT_HEIGHT}
              responseParameterInputHeight={EXTERNAL_API_INTEGRATOR_ENDPOINT_PARAMETER_INPUT_HEIGHTS.ENDPOINT_RESPONSE_BODY_FIELD_INPUT_HEIGHT}
              responseParameterArrayInputHeight={EXTERNAL_API_INTEGRATOR_ENDPOINT_PARAMETER_INPUT_HEIGHTS.ENDPOINT_EVALUATION_RULE_ARRAY_INPUT_HEIGHT}
            />
          </div>
        );
      case "endpointTest":
        return (
          <div className={"mx-3 mt-3"}>
            <ValidateEndpointPanel
              endpoint={{...externalApiIntegratorModel?.getPersistData()}}
              endpointId={externalApiIntegratorModel?.getMongoDbId()}
              toolId={toolId}
            />
          </div>
        );
    }
  };

  if (externalApiIntegratorModel == null) {
    return null;
  }

  return (
    <VanitySetTabAndViewContainer
      icon={faBracketsCurly}
      title={`Endpoint Field Configuration`}
      verticalTabContainer={getVerticalTabContainer()}
      bodyClassName={"mx-0"}
      currentView={getCurrentView()}
      minimumHeight={EXTERNAL_API_INTEGRATOR_ENDPOINT_PARAMETER_INPUT_HEIGHTS.EXTERNAL_API_INTEGRATOR_ENDPOINT_PARAMETERS_CONTAINER_HEIGHT}
      maximumHeight={EXTERNAL_API_INTEGRATOR_ENDPOINT_PARAMETER_INPUT_HEIGHTS.EXTERNAL_API_INTEGRATOR_ENDPOINT_PARAMETERS_CONTAINER_HEIGHT}
    />
  );
}

ExternalApiIntegratorEndpointParametersVerticalTabContainer.propTypes = {
  externalApiIntegratorModel: PropTypes.object,
  setExternalApiIntegratorModel: PropTypes.func,
  disabled: PropTypes.bool,
  toolId: PropTypes.string,
};

export default ExternalApiIntegratorEndpointParametersVerticalTabContainer;