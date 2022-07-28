import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import EndpointResponseEvaluationRuleInput
  from "components/common/inputs/endpoints/endpoint/response/evaluation/rule/EndpointResponseEvaluationRuleInput";
import {
  endpointResponseEvaluationRulesMetadata
} from "components/common/inputs/endpoints/endpoint/response/evaluation/endpointResponseEvaluationRules.metadata";
import modelHelpers from "components/common/model/modelHelpers";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";
import CenterLoadingIndicator from "components/common/loading/CenterLoadingIndicator";

function EndpointResponseEvaluationRulesInputBase(
  {
    model,
    setModel,
    endpoint,
    fieldName,
    evaluationRuleFieldName,
    disabled,
    isLoading,
    evaluationRulesInputHeight,
    responseParameterInputHeight,
    responseParameterArrayInputHeight,
  }) {
  const [field] = useState(model?.getFieldById(fieldName));
  const [endpointResponseEvaluationRuleModel, setEndpointResponseEvaluationRuleModel] = useState(undefined);

  useEffect(() => {
    setEndpointResponseEvaluationRuleModel(modelHelpers.parseObjectIntoModel(model?.getData(fieldName), endpointResponseEvaluationRulesMetadata));
  }, [fieldName]);

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

  if (isLoading === true) {
    return (
      <CenteredContentWrapper>
        <div className={"my-5"}>
          <CenterLoadingIndicator />
        </div>
      </CenteredContentWrapper>
    );
  }

  if (endpoint == null || field == null || endpointResponseEvaluationRuleModel == null) {
    return null;
  }

  return (
    <EndpointResponseEvaluationRuleInput
      fieldName={evaluationRuleFieldName}
      rule={endpointResponseEvaluationRuleModel?.getData(evaluationRuleFieldName)}
      endpointResponseEvaluationRuleModel={endpointResponseEvaluationRuleModel}
      updateRuleFunction={(newRule) => updateRuleFunction(evaluationRuleFieldName, newRule)}
      endpoint={endpoint}
      disabled={disabled}
      evaluationRulesInputHeight={evaluationRulesInputHeight}
      responseParameterInputHeight={responseParameterInputHeight}
      responseParameterArrayInputHeight={responseParameterArrayInputHeight}
    />
  );
}

EndpointResponseEvaluationRulesInputBase.propTypes = {
  fieldName: PropTypes.string,
  endpoint: PropTypes.object,
  evaluationRuleFieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  evaluationRulesInputHeight: PropTypes.string,
  responseParameterInputHeight: PropTypes.string,
  responseParameterArrayInputHeight: PropTypes.string,
};

export default EndpointResponseEvaluationRulesInputBase;
