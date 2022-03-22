import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import modelHelpers from "components/common/model/modelHelpers";
import PropertyInputContainer from "components/common/inputs/object/PropertyInputContainer";
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

function EndpointResponseEvaluationRuleInput(
  {
    disabled,
    updateRuleFunction,
    endpointResponseEvaluationRuleModel,
    responseFields,
    rule,
    fieldName,
  }) {
  const [evaluationRuleModel, setEvaluationRuleModel] = useState(undefined);

  useEffect(() => {
    setEvaluationRuleModel(modelHelpers.parseObjectIntoModel(rule, endpointResponseEvaluationRuleMetadata));
  }, [rule]);

  const updateMainModelFunction = (fieldName, newValue) => {
    evaluationRuleModel.setData(fieldName, newValue);
    updateRuleFunction({...evaluationRuleModel?.getPersistData()});
  };

  const getInputForRuleOption = () => {
    switch (evaluationRuleModel?.getData("option")) {
      case "status":
        return (
          <>
            <Col sm={4} className={"px-2"}>
              <EndpointResponseEvaluationStatusRuleFilterSelectInput
                model={evaluationRuleModel}
                setModel={(newModel) => updateMainModelFunction("filter", newModel?.getData("filter"))}
                fieldName={"filter"}
                disabled={disabled}
              />
            </Col>
            <Col sm={4} className={"px-0"}>
              <PositiveIntegerNumberTextInput
                model={evaluationRuleModel}
                setModel={(newModel) => updateMainModelFunction("value", newModel?.getData("value"))}
                fieldName={"value"}
                disabled={disabled}
              />
            </Col>
          </>
        );
      case "field":
        return (
          <EndpointResponseFieldEvaluationRulesInputBase
            fieldName={"field_rules"}
            model={evaluationRuleModel}
            setModel={(newModel) => updateMainModelFunction("field_rules", newModel?.getPersistData())}
            responseFields={responseFields}
            disabled={disabled}
          />
        );
    }
  };

  const setRuleOptionFunction = (fieldName, selectedOption) => {
    updateMainModelFunction(fieldName, selectedOption?.value);
  };

  const getBody = () => {
    return (
      <Row className={"mx-3"}>
        <Col sm={4} className={"px-0"}>
          <EndpointResponseEvaluationRuleOptionSelectInput
            model={evaluationRuleModel}
            setModel={setEvaluationRuleModel}
            fieldName={"option"}
            setDataFunction={setRuleOptionFunction}
            disabled={disabled}
            responseFields={responseFields}
          />
        </Col>
        {getInputForRuleOption()}
      </Row>
    );
  };

  if (evaluationRuleModel == null) {
    return null;
  }

  return (
    <div className={"my-2"}>
      <PropertyInputContainer
        titleText={endpointResponseEvaluationRuleModel.getLabel(fieldName)}
      >
        {getBody()}
      </PropertyInputContainer>
    </div>
  );
}

EndpointResponseEvaluationRuleInput.propTypes = {
  updateRuleFunction: PropTypes.func,
  endpointResponseEvaluationRuleModel: PropTypes.object,
  responseFields: PropTypes.array,
  rule: PropTypes.object,
  disabled: PropTypes.bool,
  fieldName: PropTypes.string,
};

export default EndpointResponseEvaluationRuleInput;