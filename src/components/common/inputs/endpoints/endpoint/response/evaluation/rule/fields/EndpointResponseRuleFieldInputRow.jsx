import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import modelHelpers from "components/common/model/modelHelpers";
import StandaloneTextInputBase from "components/common/inputs/text/standalone/StandaloneTextInputBase";
import EndpointResponseFieldEvaluationRuleFilterSelectInput
  from "components/common/list_of_values_input/tools/extermal_api_integrator/endpoints/rules/field_evaluation/EndpointResponseFieldEvaluationRuleFilterSelectInput";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import {
  endpointResponseFieldEvaluationRuleMetadata
} from "components/common/inputs/endpoints/endpoint/response/evaluation/rule/fields/endpointResponseFieldEvaluationRule.metadata";

function EndpointResponseRuleFieldInputRow(
  {
    disabled,
    updateFieldFunction,
    ruleField,
  }) {
  const [endpointFieldModel, setEndpointFieldModel] = useState(undefined);

  useEffect(() => {
    setEndpointFieldModel(modelHelpers.parseObjectIntoModel(ruleField, endpointResponseFieldEvaluationRuleMetadata));
  }, [ruleField]);

  const updateMainModelFunction = (fieldName, newValue) => {
    endpointFieldModel.setData(fieldName, newValue);
    updateFieldFunction({...endpointFieldModel?.getPersistData()});
  };
  
  if (endpointFieldModel == null) {
    return null;
  }

  return (
    <Row className={"pl-2 py-2"}>
      <Col sm={4} className={"pl-0 pr-1"}>
        <StandaloneTextInputBase
          model={endpointFieldModel}
          setDataFunction={(newValue) => updateMainModelFunction("fieldName", newValue)}
          value={endpointFieldModel?.getData("fieldName")}
          disabled={true}
        />
      </Col>
      <Col sm={4} className={"pl-0 pr-1"}>
        <EndpointResponseFieldEvaluationRuleFilterSelectInput
          model={endpointFieldModel}
          setModel={setEndpointFieldModel}
          fieldName={"filter"}
          setDataFunction={(fieldName, newValue) => updateMainModelFunction(fieldName, newValue?.value)}
          disabled={disabled}
        />
      </Col>
      <Col sm={4} className={"pl-1 pr-0 my-auto"}>
        <TextInputBase
          dataObject={endpointFieldModel}
          setDataObject={setEndpointFieldModel}
          fieldName={"value"}
          setDataFunction={updateMainModelFunction}
          disabled={disabled}
        />
      </Col>
    </Row>
  );
}

EndpointResponseRuleFieldInputRow.propTypes = {
  ruleField: PropTypes.object,
  updateFieldFunction: PropTypes.func,
  disabled: PropTypes.bool,
};

export default EndpointResponseRuleFieldInputRow;