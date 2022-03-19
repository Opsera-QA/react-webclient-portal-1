import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import modelHelpers from "components/common/model/modelHelpers";
import EndpointRequestFieldTypeStandaloneSelectInput
  from "components/common/inputs/endpoints/endpoint/request/body/EndpointRequestFieldTypeStandaloneSelectInput";
import EndpointRequestFieldIsRequiredToggleInput
  from "components/common/inputs/endpoints/endpoint/request/body/EndpointRequestFieldIsRequiredToggleInput";
import EndpointRequestFieldIsSensitiveDataToggleInput
  from "components/common/inputs/endpoints/endpoint/request/body/EndpointRequestFieldIsSensitiveDataToggleInput";
import {
  endpointRequestParameterMetadata
} from "components/common/inputs/endpoints/endpoint/request/parameters/parameter/endpointRequestParameter.metadata";
import StandaloneTextFieldBase from "components/common/fields/text/standalone/StandaloneTextFieldBase";
import StandaloneTextInputBase from "components/common/inputs/text/standalone/StandaloneTextInputBase";
import Row from "react-bootstrap/Row";
import InfoText from "components/common/inputs/info_text/InfoText";
import {hasStringValue} from "components/common/helpers/string-helpers";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import CustomParameterSelectInput from "components/common/list_of_values_input/parameters/CustomParameterSelectInput";
import MultiTextInputBase from "components/common/inputs/text/MultiTextInputBase";
import DateTimeInputBase from "components/common/inputs/date/DateTimeInputBase";
import CustomParameterComboBoxInput
  from "components/common/list_of_values_input/parameters/CustomParameterComboBoxInput";

function EndpointRequestParameterInputRow(
  {
    disabled,
    updateFieldFunction,
    endpointBodyField,
    index,
  }) {
  const [endpointFieldModel, setEndpointFieldModel] = useState(undefined);

  useEffect(() => {
    setEndpointFieldModel(modelHelpers.parseObjectIntoModel(endpointBodyField, endpointRequestParameterMetadata));
  }, [endpointBodyField]);

  const updateMainModelFunction = (fieldName, newValue) => {
    endpointFieldModel.setData(fieldName, newValue);
    updateFieldFunction({...endpointFieldModel?.getPersistData()});
  };

  const getInfoText = () => {
    let infoText = "";

    if (endpointFieldModel?.getData("isRequired") === true) {
      infoText += `${endpointFieldModel?.getData("fieldName")} is required. `;
    }

    if (endpointFieldModel?.getData("isSensitiveData") === true) {
      infoText += `${endpointFieldModel?.getData("fieldName")} is listed as sensitive data.`;
    }

    return infoText;
  };

  const getInfoTextField = () => {
    const infoText = getInfoText();

    if (hasStringValue(infoText) === true) {
      return (
        <div className={"mx-2 mb-2"}>
          <InfoText
            customMessage={getInfoText()}
          />
        </div>
      );
    }
  };

  const getValueInput = () => {
    const type = endpointFieldModel?.getData("type");
    const isSensitiveData = endpointFieldModel?.getData("isSensitiveData");

    switch (type) {
      case "string":
        if (isSensitiveData === false) {
          return (
            <CustomParameterSelectInput
              model={endpointFieldModel}
              fieldName={"value"}
              showLabel={false}
              className={"value-parameter"}
              requireVaultSavedParameters={true}
              setDataFunction={updateMainModelFunction}
            />
          );
        }

        return (
          <CustomParameterComboBoxInput
            model={endpointFieldModel}
            fieldName={"value"}
            showLabel={false}
            className={"value-parameter"}
            allowCreate={isSensitiveData !== true}
            requireVaultSavedParameters={isSensitiveData}
            setDataFunction={updateMainModelFunction}
          />
        );
      case "array":
        return (
          <MultiTextInputBase
            model={endpointFieldModel}
            fieldName={"value"}
            showLabel={false}
            setDataFunction={updateMainModelFunction}
          />
        );
      case "date":
        return (
          <DateTimeInputBase

          />
        );
    }
  };

  if (endpointFieldModel == null) {
    return null;
  }

  return (
    <div className={"mx-2"}>
      <Row className={"d-flex py-2"}>
        <Col sm={4}>
          <StandaloneTextInputBase
            model={endpointFieldModel}
            value={endpointFieldModel?.getData("fieldName")}
            setDataFunction={updateMainModelFunction}
            disabled={true}
          />
        </Col>
        <Col sm={8}>
          {getValueInput()}
        </Col>
      </Row>
      {getInfoTextField()}
    </div>
  );
}

EndpointRequestParameterInputRow.propTypes = {
  updateFieldFunction: PropTypes.func,
  deleteFieldFunction: PropTypes.func,
  disabled: PropTypes.bool,
  endpointBodyField: PropTypes.object,
  index: PropTypes.number,
};

export default EndpointRequestParameterInputRow;