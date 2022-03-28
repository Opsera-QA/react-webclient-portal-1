import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import modelHelpers from "components/common/model/modelHelpers";
import {
  endpointResponseFieldEvaluationRuleMetadata
} from "components/common/inputs/endpoints/endpoint/response/evaluation/rule/fields/endpointResponseFieldEvaluationRule.metadata";
import {faBracketsCurly} from "@fortawesome/pro-light-svg-icons";
import InfoContainer from "components/common/containers/InfoContainer";
import ExternalApiIntegratorStepEndpointResponseFieldEvaluationRuleFilterSelectInput
  from "components/workflow/plan/step/external_rest_api_integration/inputs/request/ExternalApiIntegratorStepEndpointResponseFieldEvaluationRuleFilterSelectInput";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import CustomParameterSelectInput from "components/common/list_of_values_input/parameters/CustomParameterSelectInput";
import CustomParameterComboBoxInput
  from "components/common/list_of_values_input/parameters/CustomParameterComboBoxInput";
import MultiTextListInputBase from "components/common/inputs/list/text/MultiTextListInputBase";
import DateTimeInput from "components/common/inputs/date/DateTimeInput";

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
                fieldName={"value"}
                className={"value-parameter"}
                requireVaultSavedParameters={true}
                setDataFunction={(fieldName, selectedOption) => updateMainModelFunction(fieldName, selectedOption?.value)}
                disabled={disabled}
              />
            );
          }

          return (
            <CustomParameterComboBoxInput
              model={endpointFieldModel}
              fieldName={"value"}
              className={"value-parameter"}
              requireInsensitiveParameters={true}
              setDataFunction={(fieldName, selectedOption) => updateMainModelFunction(fieldName, selectedOption?.value)}
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
        <Col sm={12}>
          <H5FieldSubHeader
            className={"mt-auto"}
            subheaderText={`This field will meet the requirements if ${endpointFieldModel.getData("fieldName")}`}
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
        <Col xs={12} className={"mt-2"}>
          {getValueInput()}
        </Col>
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