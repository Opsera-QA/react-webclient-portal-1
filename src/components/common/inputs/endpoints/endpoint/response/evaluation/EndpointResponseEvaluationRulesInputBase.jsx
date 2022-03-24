import React, { useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import EndpointResponseEvaluationRuleInput
  from "components/common/inputs/endpoints/endpoint/response/evaluation/rule/EndpointResponseEvaluationRuleInput";
import {
  endpointResponseEvaluationRulesMetadata
} from "components/common/inputs/endpoints/endpoint/response/evaluation/endpointResponseEvaluationRules.metadata";
import modelHelpers from "components/common/model/modelHelpers";
import InfoText from "components/common/inputs/info_text/InfoText";

function EndpointResponseEvaluationRulesInputBase(
  {
    fieldName,
    model,
    setModel,
    responseFields,
    disabled,
  }) {
  const [field] = useState(model?.getFieldById(fieldName));
  const [endpointResponseEvaluationRuleModel, setEndpointResponseEvaluationRuleModel] = useState(undefined);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    if (model) {
      loadData();
    }

    return () => {
      isMounted.current = false;
    };
  }, []);

  const loadData = () => {
    setEndpointResponseEvaluationRuleModel(modelHelpers.parseObjectIntoModel(model?.getData(fieldName), endpointResponseEvaluationRulesMetadata));
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
    <div>
      <EndpointResponseEvaluationRuleInput
        fieldName={"success_rule"}
        rule={endpointResponseEvaluationRuleModel.getData("success_rule")}
        endpointResponseEvaluationRuleModel={endpointResponseEvaluationRuleModel}
        updateRuleFunction={(newRule) => updateRuleFunction("success_rule", newRule)}
        responseFields={responseFields}
        disabled={disabled}
      />
      <InfoText
        customMessage={`
          Success rules take precedence over Running rules. 
          If the response does not match either the Success or Running rules, it will be considered a failure.
        `}
      />
      <EndpointResponseEvaluationRuleInput
        fieldName={"running_rule"}
        endpointResponseEvaluationRuleModel={endpointResponseEvaluationRuleModel}
        rule={endpointResponseEvaluationRuleModel.getData("running_rule")}
        updateRuleFunction={(newRule) => updateRuleFunction("running_rule", newRule)}
        responseFields={responseFields}
        disabled={disabled}
      />
    </div>
  );
}

EndpointResponseEvaluationRulesInputBase.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  responseFields: PropTypes.array,
  disabled: PropTypes.bool,
};

export default EndpointResponseEvaluationRulesInputBase;
