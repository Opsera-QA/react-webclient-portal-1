import React from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import ExternalApiIntegratorStepEndpointResponseFieldEvaluationRuleFilterSelectInput
  from "components/workflow/plan/step/external_rest_api_integration/inputs/request/ExternalApiIntegratorStepEndpointResponseFieldEvaluationRuleFilterSelectInput";
import MultiTextListInputBase from "components/common/inputs/list/text/MultiTextListInputBase";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import TextInputBase from "components/common/inputs/text/TextInputBase";

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
            <TextInputBase
              dataObject={evaluationRuleModel}
              setDataObject={setEvaluationRuleModel}
              fieldName={"value"}
              setDataFunction={updateMainModelFunction}
              disabled={disabled}
            />
          );
        case "array":
          return (
            <MultiTextListInputBase
              model={evaluationRuleModel}
              setModel={setEvaluationRuleModel}
              fieldName={"value"}
              setDataFunction={updateMainModelFunction}
              disabled={disabled}
              singularTopic={"Value"}
              pluralTopic={"Values"}
            />
          );
        case "boolean":
          return (
            <BooleanToggleInput
              dataObject={evaluationRuleModel}
              setDataObject={setEvaluationRuleModel}
              setDataFunction={updateModelFunction}
              fieldName={"value"}
              disabled={disabled}
            />
          );
      }
    }
  };

  if (evaluationRuleModel == null) {
    return null;
  }

  return (
    <>
      <Col xs={8}>
        <ExternalApiIntegratorStepEndpointResponseFieldEvaluationRuleFilterSelectInput
          model={evaluationRuleModel}
          setModel={setEvaluationRuleModel}
          fieldName={"filter"}
          disabled={disabled}
          updateMainModelFunction={updateModelFunction}
        />
      </Col>
      <Col xs={12}>
        {getValueInput()}
      </Col>
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