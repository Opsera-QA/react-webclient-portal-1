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

const height = "calc(100vh - 650px)";

function ExternalApiIntegratorEndpointParametersVerticalTabContainer(
  {
    externalApiIntegratorModel,
    setExternalApiIntegratorModel,
    disabled,
  }) {
  const [activeTab, setActiveTab] = useState("requestHeaderConfiguration");

  const handleTabClick = (newTab) => {
    if (newTab !== activeTab) {
      setActiveTab(newTab);
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
          {/*<VanitySetVerticalTab*/}
          {/*  tabText={"Request Header"}*/}
          {/*  tabName={"requestHeaderConfiguration"}*/}
          {/*  handleTabClick={handleTabClick}*/}
          {/*  activeTab={activeTab}*/}
          {/*/>*/}
          {getDynamicTabsForRequestType()}
          <VanitySetVerticalTab
            tabText={"Response Body"}
            tabName={"responseBody"}
            handleTabClick={handleTabClick}
            activeTab={activeTab}
          />
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
      minimumHeight={height}
      maximumHeight={height}
    />
  );
}

ExternalApiIntegratorEndpointParametersVerticalTabContainer.propTypes = {
  externalApiIntegratorModel: PropTypes.object,
  setExternalApiIntegratorModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default ExternalApiIntegratorEndpointParametersVerticalTabContainer;