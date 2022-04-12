import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import modelHelpers from "components/common/model/modelHelpers";
import {
  endpointResponseFieldEvaluationRuleMetadata
} from "components/common/inputs/endpoints/endpoint/response/evaluation/rule/fields/endpointResponseFieldEvaluationRule.metadata";
import {faBracketsCurly} from "@fortawesome/pro-light-svg-icons";
import ExternalApiIntegratorStepEndpointResponseFieldEvaluationRuleFilterSelectInput
  from "components/workflow/plan/step/external_rest_api_integration/inputs/request/ExternalApiIntegratorStepEndpointResponseFieldEvaluationRuleFilterSelectInput";
import CustomParameterSelectInput from "components/common/list_of_values_input/parameters/CustomParameterSelectInput";
import CustomParameterComboBoxInput
  from "components/common/list_of_values_input/parameters/CustomParameterComboBoxInput";
import MultiTextListInputBase from "components/common/inputs/list/text/MultiTextListInputBase";
import DateTimeInput from "components/common/inputs/date/DateTimeInput";
import {hasStringValue} from "components/common/helpers/string-helpers";
import VanitySetTabContentContainer from "components/common/tabs/vertical_tabs/VanitySetTabContentContainer";
import {
  EXTERNAL_REST_API_INTEGRATION_STEP_HEIGHTS
} from "components/workflow/plan/step/external_rest_api_integration/externalRestApiIntegrationStep.heights";

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
              <CustomParameterSelectInput
                model={endpointFieldModel}
                setModel={setEndpointFieldModel}
                fieldName={"value"}
                className={"value-parameter"}
                requireVaultSavedParameters={true}
                setDataFunction={updateCustomParameterField}
                disabled={disabled}
              />
            );
          }

          return (
            <CustomParameterComboBoxInput
              model={endpointFieldModel}
              setModel={setEndpointFieldModel}
              fieldName={"value"}
              className={"value-parameter"}
              requireInsensitiveParameters={true}
              setDataFunction={updateCustomParameterField}
              disabled={disabled}
            />
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
              maximumHeight={`calc(${EXTERNAL_REST_API_INTEGRATION_STEP_HEIGHTS.ENDPOINT_REQUEST_PARAMETER_CONTAINER_HEIGHT} - 200px)`}
            />
          );
        case "date":
          return (
            <DateTimeInput
              dataObject={endpointFieldModel}
              setDataObject={setEndpointFieldModel}
              setDataFunction={updateMainModelFunction}
              fieldName={"value"}
              defaultToNull={true}
              disabled={disabled}
              clearDataFunction={() => updateMainModelFunction("value", undefined)}
            />
          );
      }
    }
  };

  const getBody = () => {
    return (
      <Row>
        <Col xs={12}>
          {getValueInput()}
        </Col>
      </Row>
    );
  };

  const getRuleFilterInput = () => {
    return (
        <div style={{minWidth: "400px"}}>
          <ExternalApiIntegratorStepEndpointResponseFieldEvaluationRuleFilterSelectInput
            model={endpointFieldModel}
            setModel={setEndpointFieldModel}
            fieldName={"filter"}
            showLabel={false}
            className={"px-0"}
            disabled={disabled}
            isSensitiveData={endpointBodyField?.isSensitiveData === true}
            updateMainModelFunction={updateMainModel}
          />
        </div>
    );
  };

  if (endpointFieldModel == null) {
    return null;
  }

  return (
    <VanitySetTabContentContainer
      titleIcon={faBracketsCurly}
      title={`This field will meet the requirements if ${endpointFieldModel.getData("fieldName")}`}
      titleBarInput={getRuleFilterInput()}
    >
      <div className={"mx-3 mt-2"}>
        {getBody()}
      </div>
    </VanitySetTabContentContainer>
  );
}

EndpointResponseRuleFieldInputRow.propTypes = {
  endpointBodyField: PropTypes.object,
  updateFieldFunction: PropTypes.func,
  disabled: PropTypes.bool,
};

export default EndpointResponseRuleFieldInputRow;