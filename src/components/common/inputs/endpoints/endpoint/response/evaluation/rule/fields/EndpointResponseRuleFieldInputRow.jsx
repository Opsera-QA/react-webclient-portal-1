import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import modelHelpers from "components/common/model/modelHelpers";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import {
  endpointResponseFieldEvaluationRuleMetadata
} from "components/common/inputs/endpoints/endpoint/response/evaluation/rule/fields/endpointResponseFieldEvaluationRule.metadata";
import {faBracketsCurly} from "@fortawesome/pro-light-svg-icons";
import InfoContainer from "components/common/containers/InfoContainer";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import ExternalApiIntegratorStepEndpointResponseFieldEvaluationRuleFilterSelectInput
  from "components/workflow/plan/step/external_rest_api_integration/inputs/request/ExternalApiIntegratorStepEndpointResponseFieldEvaluationRuleFilterSelectInput";

function EndpointResponseRuleFieldInputRow(
  {
    disabled,
    updateFieldFunction,
    endpointBodyField,
  }) {
  const [endpointFieldModel, setEndpointFieldModel] = useState(undefined);

  useEffect(() => {
    setEndpointFieldModel(modelHelpers.parseObjectIntoModel(endpointBodyField, endpointResponseFieldEvaluationRuleMetadata));
  }, [endpointBodyField]);

  const updateMainModelFunction = (fieldName, newValue) => {
    endpointFieldModel.setData(fieldName, newValue);
    updateFieldFunction({...endpointFieldModel?.getPersistData()});
  };

  const getValueInput = () => {
    const canEnterValue = ["equals", "not_equals"];
    if (canEnterValue.includes(endpointFieldModel?.getData("filter"))) {
      return (
        <Col sm={12}>
          <TextInputBase
            dataObject={endpointFieldModel}
            setDataObject={setEndpointFieldModel}
            fieldName={"value"}
            setDataFunction={updateMainModelFunction}
            disabled={disabled}
          />
        </Col>
      );
    }
  };

  const getBody = () => {
    return (
      <Row>
        <Col sm={12}>
          <H5FieldSubHeader
            subheaderText={`This field will meet the rule's criteria if ${endpointFieldModel.getData("fieldName")}`}
          />
        </Col>
        <Col sm={12}>
          <ExternalApiIntegratorStepEndpointResponseFieldEvaluationRuleFilterSelectInput
            model={endpointFieldModel}
            setModel={setEndpointFieldModel}
            fieldName={"filter"}
            showLabel={false}
            className={"px-0"}
            disabled={disabled}
            isSensitiveData={endpointBodyField?.isSensitiveData === true}
            updateMainModelFunction={updateMainModelFunction}
          />
        </Col>
        {getValueInput()}
      </Row>
    );
  };

  if (endpointFieldModel == null) {
    return null;
  }

  return (
    <InfoContainer
      titleIcon={faBracketsCurly}
      titleText={endpointFieldModel?.getData("fieldName")}
      titleClassName={"sub-input-title-bar"}
    >
      <div className={"m-3"}>
        {getBody()}
      </div>
    </InfoContainer>
  );
}

EndpointResponseRuleFieldInputRow.propTypes = {
  endpointBodyField: PropTypes.object,
  updateFieldFunction: PropTypes.func,
  disabled: PropTypes.bool,
};

export default EndpointResponseRuleFieldInputRow;