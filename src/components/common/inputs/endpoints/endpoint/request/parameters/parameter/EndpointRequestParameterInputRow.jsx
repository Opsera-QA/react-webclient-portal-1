import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import modelHelpers from "components/common/model/modelHelpers";
import {
  endpointRequestParameterMetadata
} from "components/common/inputs/endpoints/endpoint/request/parameters/parameter/endpointRequestParameter.metadata";
import StandaloneTextInputBase from "components/common/inputs/text/standalone/StandaloneTextInputBase";
import Row from "react-bootstrap/Row";
import InfoText from "components/common/inputs/info_text/InfoText";
import {hasStringValue} from "components/common/helpers/string-helpers";
import CustomParameterSelectInput from "components/common/list_of_values_input/parameters/CustomParameterSelectInput";
import MultiTextInputBase from "components/common/inputs/text/MultiTextInputBase";
import DateTimeInputBase from "components/common/inputs/date/DateTimeInputBase";
import CustomParameterComboBoxInput
  from "components/common/list_of_values_input/parameters/CustomParameterComboBoxInput";

function EndpointRequestParameterInputRow(
  {
    disabled,
    updateParameterFunction,
    endpointBodyField,
  }) {
  const [endpointFieldModel, setEndpointFieldModel] = useState(undefined);

  useEffect(() => {
    setEndpointFieldModel(modelHelpers.parseObjectIntoModel(endpointBodyField, endpointRequestParameterMetadata));
  }, [endpointBodyField]);

  const updateMainModelFunction = (fieldName, newValue) => {
    const newModel = {...endpointFieldModel};
    newModel.setData(fieldName, newValue);
    updateParameterFunction({...newModel?.getPersistData()});
    setEndpointFieldModel({...newModel});
  };

  const getInfoText = () => {
    let infoText = "";

    if (endpointFieldModel?.getData("isRequired") === true) {
      infoText += `${endpointFieldModel?.getData("fieldName")} is required. `;
    }

    if (endpointFieldModel?.getData("isSensitiveData") === true) {
      infoText += `${endpointFieldModel?.getData("fieldName")} is listed as sensitive data. You must use an encrypted custom parameter saved in the Tool Registry`;
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
        if (isSensitiveData === true) {
          return (
            <CustomParameterSelectInput
              model={endpointFieldModel}
              fieldName={"value"}
              showLabel={false}
              className={"value-parameter"}
              requireVaultSavedParameters={true}
              setDataFunction={updateMainModelFunction}
              disabled={disabled}
            />
          );
        }

        return (
          <CustomParameterComboBoxInput
            model={endpointFieldModel}
            fieldName={"value"}
            showLabel={false}
            className={"value-parameter"}
            requireVaultSavedParameters={isSensitiveData}
            setDataFunction={updateMainModelFunction}
            disabled={disabled}
          />
        );
      case "array":
        return (
          <MultiTextInputBase
            model={endpointFieldModel}
            fieldName={"value"}
            showLabel={false}
            setDataFunction={updateMainModelFunction}
            disabled={disabled}
          />
        );
      case "date":
        return (
          <DateTimeInputBase

            disabled={disabled}
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
  updateParameterFunction: PropTypes.func,
  disabled: PropTypes.bool,
  endpointBodyField: PropTypes.object,
};

export default EndpointRequestParameterInputRow;