import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import EndpointResponseEvaluationRuleInput
  from "components/common/inputs/endpoints/endpoint/response/evaluation/rule/EndpointResponseEvaluationRuleInput";
import {
  endpointResponseEvaluationRulesMetadata
} from "components/common/inputs/endpoints/endpoint/response/evaluation/endpointResponseEvaluationRules.metadata";
import modelHelpers from "components/common/model/modelHelpers";
import InfoText from "components/common/inputs/info_text/InfoText";
import axios from "axios";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import externalApiIntegratorEndpointsActions
  from "components/inventory/tools/details/identifiers/external_api_integrator/endpoints/externalApiIntegratorEndpoints.actions";
import {AuthContext} from "contexts/AuthContext";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import VanitySetVerticalTabContainer from "components/common/tabs/vertical_tabs/VanitySetVerticalTabContainer";
import VanitySetVerticalTab from "components/common/tabs/vertical_tabs/VanitySetVerticalTab";
import {
  ENDPOINT_REQUEST_TYPES
} from "components/common/list_of_values_input/tools/extermal_api_integrator/request/types/endpointRequestType.constants";
import EndpointRequestBodyInputPanel
  from "components/common/inputs/endpoints/endpoint/request/body/EndpointRequestBodyInputPanel";
import EndpointResponseBodyInputBase
  from "components/common/inputs/endpoints/endpoint/response/body/EndpointResponseBodyInputBase";
import {faBracketsCurly, faCheckCircle, faSync} from "@fortawesome/pro-light-svg-icons";
import VanitySetTabAndViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabAndViewContainer";

function EndpointResponseEvaluationRulesInputBase(
  {
    toolId,
    endpointId,
    fieldName,
    model,
    setModel,
    disabled,
  }) {
  const {getAccessToken} = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [field, setField] = useState(model?.getFieldById(fieldName));
  const [endpointResponseEvaluationRuleModel, setEndpointResponseEvaluationRuleModel] = useState(undefined);
  const [endpoint, setEndpoint] = useState(undefined);
  const [error, setError] = useState(undefined);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const isMounted = useRef(false);
  const [activeTab, setActiveTab] = useState("runningRule");

  const handleTabClick = (newTab) => {
    if (newTab !== activeTab) {
      setActiveTab(newTab);
    }
  };

  useEffect(() => {
    setField(model?.getFieldById(fieldName));
  }, [fieldName]);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    isMounted.current = true;
    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    setEndpoint(undefined);

    if (isMongoDbId(toolId) === true && isMongoDbId(endpointId) === true) {
      setEndpointResponseEvaluationRuleModel(modelHelpers.parseObjectIntoModel(model?.getData(fieldName), endpointResponseEvaluationRulesMetadata));

      loadData(source).catch((error) => {
        throw error;
      });
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [toolId, endpointId]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setError(undefined);
      setIsLoading(true);
      await loadExternalApiIntegratorEndpoints(cancelSource);
    } catch (error) {
      if (isMounted?.current === true) {
        setError(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const loadExternalApiIntegratorEndpoints = async (cancelSource = cancelTokenSource) => {
    const response = await externalApiIntegratorEndpointsActions.getExternalApiIntegratorEndpointByIdV2(
      getAccessToken,
      cancelSource,
      toolId,
      endpointId,
    );
    const newEndpoint = response?.data?.data;

    if (isMounted?.current === true && newEndpoint) {
      setEndpoint(newEndpoint);
    }
  };

  const validateAndSetData = (newRulesModel) => {
    const newModel = {...model};
    newModel.setData(fieldName, newRulesModel.getPersistData());
    setModel({...newModel});
    setEndpointResponseEvaluationRuleModel({...newRulesModel});
  };

  const updateRuleFunction = (fieldName, rule) => {
    endpointResponseEvaluationRuleModel.setData(fieldName, rule);
    validateAndSetData(endpointResponseEvaluationRuleModel);
  };

  const getWarningMessage = () => {
    return (
      <InfoText
        customMessage={`
          Success rules take precedence over Running rules. 
          If the response does not match either the Success or Running rule, it will be considered a failure.
        `}
      />
    );
  };

  const getVerticalTabContainer = () => {
    return (
      <VanitySetVerticalTabContainer>
        <VanitySetVerticalTab
          tabText={"Success Rule"}
          tabName={"successRule"}
          handleTabClick={handleTabClick}
          activeTab={activeTab}
          icon={faCheckCircle}
        />
        <VanitySetVerticalTab
          tabText={"Running Rule"}
          tabName={"runningRule"}
          handleTabClick={handleTabClick}
          activeTab={activeTab}
          icon={faSync}
        />
      </VanitySetVerticalTabContainer>
    );
  };

  const getCurrentView = () => {
    switch (activeTab) {
      case "successRule":
        return (
          <div className={"m-2"}>
            {getWarningMessage()}
            <EndpointResponseEvaluationRuleInput
              fieldName={"success_rule"}
              rule={endpointResponseEvaluationRuleModel?.getData("success_rule")}
              endpointResponseEvaluationRuleModel={endpointResponseEvaluationRuleModel}
              updateRuleFunction={(newRule) => updateRuleFunction("success_rule", newRule)}
              responseBodyFields={endpoint?.responseBodyFields}
              disabled={disabled}
            />
          </div>
        );
      case "runningRule":
        return (
          <div className={"m-2"}>
            {getWarningMessage()}
            <EndpointResponseEvaluationRuleInput
              fieldName={"running_rule"}
              endpointResponseEvaluationRuleModel={endpointResponseEvaluationRuleModel}
              rule={endpointResponseEvaluationRuleModel?.getData("running_rule")}
              updateRuleFunction={(newRule) => updateRuleFunction("running_rule", newRule)}
              responseBodyFields={endpoint?.responseBodyFields}
              disabled={disabled}
            />
          </div>
        );
    }
  };

  if (field == null || endpointResponseEvaluationRuleModel == null) {
    return null;
  }

  return (
    <div>
      <VanitySetTabAndViewContainer
        icon={faBracketsCurly}
        title={`Response Evaluation Rules`}
        verticalTabContainer={getVerticalTabContainer()}
        bodyClassName={"mx-0"}
        currentView={getCurrentView()}
        minimumHeight={"calc(100vh - 488px)"}
        maximumHeight={"calc(100vh - 488px)"}
      />
      <InfoText errorMessage={error} />
    </div>
  );
}

EndpointResponseEvaluationRulesInputBase.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  toolId: PropTypes.string,
  endpointId: PropTypes.string,
};

export default EndpointResponseEvaluationRulesInputBase;
