import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import modelHelpers from "components/common/model/modelHelpers";
import {
  endpointResponseEvaluationRuleMetadata
} from "components/common/inputs/endpoints/endpoint/response/evaluation/rule/endpointResponseEvaluationRule.metadata";
import EndpointResponseEvaluationRuleOptionSelectInput
  from "components/common/list_of_values_input/tools/extermal_api_integrator/endpoints/rules/options/EndpointResponseEvaluationRuleOptionSelectInput";
import EndpointResponseEvaluationStatusRuleFilterSelectInput
  from "components/common/list_of_values_input/tools/extermal_api_integrator/endpoints/rules/status/EndpointResponseEvaluationStatusRuleFilterSelectInput";
import PositiveIntegerNumberTextInput
  from "components/common/inputs/text/number/integer/PositiveIntegerNumberTextInput";
import EndpointResponseFieldEvaluationRulesInputBase
  from "components/common/inputs/endpoints/endpoint/response/evaluation/rule/fields/EndpointResponseFieldEvaluationRulesInputBase";
import EndpointResponseFieldEvaluationRulesFilterSelectInput
  from "components/common/list_of_values_input/tools/extermal_api_integrator/endpoints/rules/field_evaluation/EndpointResponseFieldEvaluationRulesFilterSelectInput";
import EndpointResponseEvaluationInput
  from "components/common/inputs/endpoints/endpoint/response/evaluation/rule/EndpointResponseValueInput";

function EndpointResponseEvaluationRuleInput(
  {
    disabled,
    updateRuleFunction,
    endpoint,
    rule,
  }) {
  const [evaluationRuleModel, setEvaluationRuleModel] = useState(undefined);

  useEffect(() => {
    setEvaluationRuleModel(modelHelpers.parseObjectIntoModel(rule, endpointResponseEvaluationRuleMetadata));
  }, [rule]);

  const updateMainModelFunction = (fieldName, newValue) => {
    evaluationRuleModel.setData(fieldName, newValue);
    updateRuleFunction({...evaluationRuleModel?.getPersistData()});
  };

  const updateModelFunction = (newModel) => {
    updateRuleFunction({...newModel?.getPersistData()});
  };

  const getInputForRuleOption = () => {
    switch (evaluationRuleModel?.getData("option")) {
      case "status":
        return (
          <>
            <Col sm={4}>
              <EndpointResponseEvaluationStatusRuleFilterSelectInput
                model={evaluationRuleModel}
                setModel={setEvaluationRuleModel}
                setDataFunction={(fieldName, selectedOption) => updateMainModelFunction(fieldName, selectedOption?.value)}
                fieldName={"filter"}
                disabled={disabled}
              />
            </Col>
            <Col sm={4}>
              <PositiveIntegerNumberTextInput
                model={evaluationRuleModel}
                setModel={setEvaluationRuleModel}
                setDataFunction={updateMainModelFunction}
                fieldName={"value"}
                disabled={disabled}
              />
            </Col>
          </>
        );
      case "field_evaluation":
        return (
          <>
            <Col xs={8}>
              <EndpointResponseFieldEvaluationRulesFilterSelectInput
                fieldName={"filter"}
                model={evaluationRuleModel}
                setModel={setEvaluationRuleModel}
                setDataFunction={(fieldName, selectOption) => updateMainModelFunction(fieldName, selectOption?.value)}
                disabled={disabled}
              />
            </Col>
            <Col xs={12}>
              <EndpointResponseFieldEvaluationRulesInputBase
                fieldName={"field_rules"}
                model={evaluationRuleModel}
                setModel={setEvaluationRuleModel}
                setDataFunction={(newFields) => updateMainModelFunction("field_rules", newFields)}
                responseBodyFields={Array.isArray(endpoint?.responseBodyFields) ? [...endpoint?.responseBodyFields] : undefined}
                disabled={disabled}
              />
            </Col>
          </>
        );
      case "response_evaluation":
        return (
          <EndpointResponseEvaluationInput
            disabled={disabled}
            updateModelFunction={updateModelFunction}
            updateMainModelFunction={updateMainModelFunction}
            evaluationRuleModel={evaluationRuleModel}
            setEvaluationRuleModel={setEvaluationRuleModel}
            responseBodyType={endpoint?.responseBodyType}
          />
        );
    }
  };

  const setRuleOptionFunction = (fieldName, newValue) => {
    const newModel = {...evaluationRuleModel};
    newModel.setData(fieldName, newValue);
    newModel.setDefaultValue("field_rules");
    newModel.setDefaultValue("value");

    if (newValue === "status" || newValue === "response_evaluation") {
      newModel.setData("filter", "equals");
    }
    else {
      newModel.setData("filter", "all");
    }

    if (newValue === "response_evaluation") {
      newModel?.setData("responseBodyType", endpoint?.responseBodyType);
      newModel.setData("value", []);
    }

    updateModelFunction(newModel);
  };

  const getBody = () => {
    return (
      <Row>
        <Col sm={4}>
          <EndpointResponseEvaluationRuleOptionSelectInput
            model={evaluationRuleModel}
            setModel={setEvaluationRuleModel}
            fieldName={"option"}
            setDataFunction={(fieldName, selectedOption) => setRuleOptionFunction(fieldName, selectedOption?.value)}
            disabled={disabled}
            endpoint={endpoint}
          />
        </Col>
        {getInputForRuleOption()}
      </Row>
    );
  };

  if (evaluationRuleModel == null || endpoint == null) {
    return null;
  }

  return (
    <div>
      {getBody()}
    </div>
  );
}

EndpointResponseEvaluationRuleInput.propTypes = {
  updateRuleFunction: PropTypes.func,
  endpoint: PropTypes.object,
  rule: PropTypes.object,
  disabled: PropTypes.bool,
};

export default EndpointResponseEvaluationRuleInput;