import React from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import ExternalApiIntegratorStepEndpointResponseFieldEvaluationRuleFilterSelectInput
  from "components/workflow/plan/step/external_rest_api_integration/inputs/request/ExternalApiIntegratorStepEndpointResponseFieldEvaluationRuleFilterSelectInput";
import MultiTextListInputBase from "components/common/inputs/list/text/MultiTextListInputBase";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import BooleanSelectInput from "components/common/list_of_values_input/boolean/BooleanSelectInput";

function EndpointResponseEvaluationInput(
  {
    disabled,
    evaluationRuleModel,
    setEvaluationRuleModel,
    updateModelFunction,
    updateMainModelFunction,
    responseBodyType,
  }) {
  const getValueInput = () => {
    const canEnterValue = ["equals", "not_equals"];
    const filter = evaluationRuleModel?.getData("filter");

    if (canEnterValue.includes(filter)) {
      switch (responseBodyType) {
        case "string":
          return (
            <Col xs={12}>
              <TextInputBase
                dataObject={evaluationRuleModel}
                setDataObject={setEvaluationRuleModel}
                fieldName={"value"}
                setDataFunction={updateMainModelFunction}
                disabled={disabled}
              />
            </Col>
          );
        case "array":
          return (
            <Col xs={12}>
              <MultiTextListInputBase
                model={evaluationRuleModel}
                setModel={setEvaluationRuleModel}
                fieldName={"value"}
                setDataFunction={updateMainModelFunction}
                disabled={disabled}
                singularTopic={"Value"}
                pluralTopic={"Values"}
              />
            </Col>
          );
        case "boolean":
          return (
            <Col xs={4}>
              <BooleanSelectInput
                model={evaluationRuleModel}
                setModel={updateModelFunction}
                fieldName={"value"}
                disabled={disabled}
              />
            </Col>
          );
      }
    }
  };

  if (evaluationRuleModel == null) {
    return null;
  }

  return (
    <>
      <Col xs={responseBodyType === "boolean" ? 4 : 8}>
        <ExternalApiIntegratorStepEndpointResponseFieldEvaluationRuleFilterSelectInput
          model={evaluationRuleModel}
          setModel={setEvaluationRuleModel}
          fieldName={"filter"}
          disabled={disabled}
          updateMainModelFunction={updateModelFunction}
        />
      </Col>
      {getValueInput()}
    </>
  );
}

EndpointResponseEvaluationInput.propTypes = {
  evaluationRuleModel: PropTypes.object,
  setEvaluationRuleModel: PropTypes.func,
  updateModelFunction: PropTypes.func,
  updateMainModelFunction: PropTypes.func,
  responseBodyType: PropTypes.string,
  disabled: PropTypes.bool,
};

export default EndpointResponseEvaluationInput;