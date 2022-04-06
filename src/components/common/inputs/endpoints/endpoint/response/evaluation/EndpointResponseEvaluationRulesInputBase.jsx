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

function EndpointResponseEvaluationRulesInputBase(
  {
    toolId,
    endpointId,
    fieldName,
    evaluationRuleFieldName,
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

  if (field == null || endpointResponseEvaluationRuleModel == null) {
    return null;
  }

  return (
    <div className={"mx-2"}>
      <EndpointResponseEvaluationRuleInput
        fieldName={evaluationRuleFieldName}
        rule={endpointResponseEvaluationRuleModel?.getData(evaluationRuleFieldName)}
        endpointResponseEvaluationRuleModel={endpointResponseEvaluationRuleModel}
        updateRuleFunction={(newRule) => updateRuleFunction(evaluationRuleFieldName, newRule)}
        endpoint={endpoint}
        disabled={disabled}
      />
      <InfoText errorMessage={error} />
    </div>
  );
}

EndpointResponseEvaluationRulesInputBase.propTypes = {
  fieldName: PropTypes.string,
  evaluationRuleFieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  toolId: PropTypes.string,
  endpointId: PropTypes.string,
};

export default EndpointResponseEvaluationRulesInputBase;
