import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import modelHelpers from "components/common/model/modelHelpers";
import {
  endpointResponseFieldEvaluationRuleMetadata
} from "components/common/inputs/endpoints/endpoint/response/evaluation/rule/fields/endpointResponseFieldEvaluationRule.metadata";
import ExternalApiIntegratorStepEndpointResponseFieldEvaluationRuleFilterSelectInput
  from "components/workflow/plan/step/external_rest_api_integration/inputs/request/ExternalApiIntegratorStepEndpointResponseFieldEvaluationRuleFilterSelectInput";
import CustomParameterSelectInput from "components/common/list_of_values_input/parameters/CustomParameterSelectInput";
import CustomParameterComboBoxInput
  from "components/common/list_of_values_input/parameters/CustomParameterComboBoxInput";
import MultiTextListInputBase from "components/common/inputs/list/text/MultiTextListInputBase";
import DateTimeInput from "components/common/inputs/date/DateTimeInput";
import {hasStringValue} from "components/common/helpers/string-helpers";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";

function EndpointResponseRuleFieldInputRow(
  {
    disabled,
    updateFieldFunction,
    endpointBodyField,
    responseParameterInputHeight,
    responseParameterArrayInputHeight,
  }) {
  const [endpointFieldModel, setEndpointFieldModel] = useState(undefined);

  useEffect(() => {
    setEndpointFieldModel(modelHelpers.parseObjectIntoModel(endpointBodyField, endpointResponseFieldEvaluationRuleMetadata));
  }, [endpointBodyField]);

  const updateMainModelFunction = (fieldName, newValue) => {
    endpointFieldModel.setData(fieldName, newValue);
    updateMainModel(endpointFieldModel);
  };

  const updateMainModel = (newModel) => {
    updateFieldFunction({...newModel?.getPersistData()});
  };

  const updateCustomParameterField = (fieldName, newValue) => {
    const parsedValue = hasStringValue(newValue) === true ? newValue : newValue?.value || "";
    updateMainModelFunction(fieldName, parsedValue);
  };

  const getValueInput = () => {
    const type = endpointFieldModel?.getData("type");
    const isSensitiveData = endpointFieldModel?.getData("isSensitiveData");
    const canEnterValue = ["equals", "not_equals"];
    const filter = endpointFieldModel?.getData("filter");

    if (canEnterValue.includes(filter)) {
      switch (type) {
        case "string":
          if (isSensitiveData === true) {
            return (
              <div style={{minHeight: responseParameterInputHeight}}>
                <CustomParameterSelectInput
                  model={endpointFieldModel}
                  setModel={setEndpointFieldModel}
                  fieldName={"value"}
                  className={"value-parameter"}
                  requireVaultSavedParameters={true}
                  setDataFunction={updateCustomParameterField}
                  disabled={disabled}
                />
              </div>
            );
          }

          return (
            <div style={{minHeight: responseParameterInputHeight}}>
              <CustomParameterComboBoxInput
                model={endpointFieldModel}
                setModel={setEndpointFieldModel}
                fieldName={"value"}
                className={"value-parameter"}
                requireInsensitiveParameters={true}
                setDataFunction={updateCustomParameterField}
                disabled={disabled}
              />
            </div>
          );
        case "array":
          return (
            <MultiTextListInputBase
              model={endpointFieldModel}
              setModel={setEndpointFieldModel}
              fieldName={"value"}
              setDataFunction={updateMainModelFunction}
              disabled={disabled}
              singularTopic={"Value"}
              pluralTopic={"Values"}
              minimumHeight={responseParameterArrayInputHeight}
              maximumHeight={responseParameterArrayInputHeight}
            />
          );
        case "date":
          return (
            <div style={{minHeight: responseParameterInputHeight}}>
              <DateTimeInput
                dataObject={endpointFieldModel}
                setDataObject={setEndpointFieldModel}
                setDataFunction={updateMainModelFunction}
                fieldName={"value"}
                defaultToNull={true}
                disabled={disabled}
                clearDataFunction={() => updateMainModelFunction("value", undefined)}
              />
            </div>
          );
        case "object":
        default:
        return (
          <CenteredContentWrapper>
            <div>{`Entering this parameter type's value is not currently supported.`}</div>
          </CenteredContentWrapper>
        );
      }
    }
  };

  const getBody = () => {
    return (
      <Row>
        <Col xs={12} className={"mb-2"}>
          This field will meet the requirements if {endpointFieldModel?.getData("fieldName")}
        </Col>
        <Col xs={12} className={"mb-2"}>
          <ExternalApiIntegratorStepEndpointResponseFieldEvaluationRuleFilterSelectInput
            model={endpointFieldModel}
            setModel={setEndpointFieldModel}
            fieldName={"filter"}
            showLabel={false}
            className={"px-0"}
            disabled={disabled}
            isSensitiveData={endpointBodyField?.isSensitiveData === true || endpointBodyField?.type === "object"}
            updateMainModelFunction={updateMainModel}
          />
        </Col>
        <Col xs={12}>
          {getValueInput()}
        </Col>
      </Row>
    );
  };

  if (endpointFieldModel == null) {
    return null;
  }

  return (
    <div className={"mx-3 mt-2"}>
      {getBody()}
    </div>
  );
}

EndpointResponseRuleFieldInputRow.propTypes = {
  endpointBodyField: PropTypes.object,
  updateFieldFunction: PropTypes.func,
  disabled: PropTypes.bool,
  responseParameterInputHeight: PropTypes.string,
  responseParameterArrayInputHeight: PropTypes.string,
};

export default EndpointResponseRuleFieldInputRow;