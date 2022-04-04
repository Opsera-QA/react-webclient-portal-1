import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {endpointRequestFieldMetadata} from "components/common/inputs/endpoints/endpoint/request/body/endpointRequestField.metadata";
import modelHelpers from "components/common/model/modelHelpers";
import EndpointRequestFieldTypeSelectInput
  from "components/common/inputs/endpoints/endpoint/request/body/EndpointRequestFieldTypeSelectInput";
import EndpointRequestFieldIsRequiredToggleInput
  from "components/common/inputs/endpoints/endpoint/request/body/EndpointRequestFieldIsRequiredToggleInput";
import EndpointRequestFieldIsSensitiveDataToggleInput
  from "components/common/inputs/endpoints/endpoint/request/body/EndpointRequestFieldIsSensitiveDataToggleInput";
import DeleteButton from "components/common/buttons/delete/DeleteButton";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import EndpointRequestFieldNameTextInput
  from "components/common/inputs/endpoints/endpoint/request/body/EndpointRequestFieldNameTextInput";

function EndpointRequestBodyFieldInputRow(
  {
    disabled,
    updateFieldFunction,
    deleteFieldFunction,
    endpointBodyField,
    index,
  }) {
  const [endpointFieldModel, setEndpointFieldModel] = useState(undefined);

  useEffect(() => {
    setEndpointFieldModel(modelHelpers.parseObjectIntoModel(endpointBodyField, endpointRequestFieldMetadata));
  }, [endpointBodyField]);

  const updateMainModelFunction = (fieldName, newValue) => {
    endpointFieldModel.setData(fieldName, newValue);
    updateFieldFunction({...endpointFieldModel?.getPersistData()});
    return endpointFieldModel;
  };

  if (endpointFieldModel == null) {
    return null;
  }

  return (
    <div className={"mx-3 mb-3 mt-1 h-100"}>
      <Row>
        <Col xs={12}>
          <EndpointRequestFieldNameTextInput
            model={endpointFieldModel}
            setModel={setEndpointFieldModel}
            disabled={disabled}
            updateMainModelFunction={updateMainModelFunction}
          />
        </Col>
        <Col xs={12}>
          <EndpointRequestFieldTypeSelectInput
            model={endpointFieldModel}
            setModel={setEndpointFieldModel}
            fieldName={"type"}
            setDataFunction={(fieldName, selectedOption) => updateMainModelFunction(fieldName, selectedOption?.value)}
            disabled={disabled}
          />
        </Col>
        <Col xs={6}>
          <EndpointRequestFieldIsRequiredToggleInput
            model={endpointFieldModel}
            updateMainModelFunction={updateMainModelFunction}
            index={index}
            disabled={disabled}
          />
        </Col>
        <Col xs={6}>
          <EndpointRequestFieldIsSensitiveDataToggleInput
            model={endpointFieldModel}
            updateMainModelFunction={updateMainModelFunction}
            index={index}
            disabled={disabled}
          />
        </Col>
      </Row>
      <ButtonContainerBase className={"mt-2"}>
        <DeleteButton dataObject={endpointFieldModel} deleteRecord={deleteFieldFunction} />
      </ButtonContainerBase>
    </div>
  );
}

EndpointRequestBodyFieldInputRow.propTypes = {
  updateFieldFunction: PropTypes.func,
  deleteFieldFunction: PropTypes.func,
  disabled: PropTypes.bool,
  endpointBodyField: PropTypes.object,
  index: PropTypes.number,
};

export default EndpointRequestBodyFieldInputRow;