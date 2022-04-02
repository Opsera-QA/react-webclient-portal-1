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

function ExternalApiIntegratorEndpointParametersVerticalTabContainer(
  {
    externalApiIntegratorModel,
    setExternalApiIntegratorModel,
  }) {
  const [activeTab, setActiveTab] = useState(externalApiIntegratorModel?.getData("requestType") === ENDPOINT_REQUEST_TYPES.GET ? "queryParameters" : "requestBody");

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
      case "queryParameters":
        return (
          <EndpointRequestBodyInputPanel
            model={externalApiIntegratorModel}
            setModel={setExternalApiIntegratorModel}
            fieldName={"queryParameterFields"}
          />
        );
      case "requestBody":
        return (
          <EndpointRequestBodyInputPanel
            model={externalApiIntegratorModel}
            setModel={setExternalApiIntegratorModel}
            fieldName={"requestBodyFields"}
          />
        );
      case "responseBody":
        return (
          <EndpointResponseBodyInputBase
            model={externalApiIntegratorModel}
            setModel={setExternalApiIntegratorModel}
            fieldName={"responseBodyFields"}
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
    />
  );
}

ExternalApiIntegratorEndpointParametersVerticalTabContainer.propTypes = {
  externalApiIntegratorModel: PropTypes.object,
  setExternalApiIntegratorModel: PropTypes.func,
};

export default ExternalApiIntegratorEndpointParametersVerticalTabContainer;