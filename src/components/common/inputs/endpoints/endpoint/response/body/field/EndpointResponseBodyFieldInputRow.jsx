import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {endpointRequestFieldMetadata} from "components/common/inputs/endpoints/endpoint/request/body/endpointRequestField.metadata";
import modelHelpers from "components/common/model/modelHelpers";
import EndpointResponseFieldTypeSelectInput
  from "components/common/inputs/endpoints/endpoint/response/body/field/EndpointResponseFieldTypeSelectInput";
import DeleteButton from "components/common/buttons/delete/DeleteButton";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import EndpointResponseFieldNameTextInput
  from "components/common/inputs/endpoints/endpoint/response/body/field/EndpointResponseFieldNameTextInput";

function EndpointResponseBodyFieldInputRow(
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
    return updateModelFunction(endpointFieldModel);
  };

  const updateModelFunction = (newModel) => {
    updateFieldFunction({...newModel?.getPersistData()});
    return newModel;
  };

  if (endpointFieldModel == null) {
    return null;
  }

  return (
    <div className={"mx-3 mb-3 mt-1 h-100"}>
      <Row>
        <Col sm={6}>
          <EndpointResponseFieldNameTextInput
            model={endpointFieldModel}
            setModel={setEndpointFieldModel}
            disabled={disabled}
            updateMainModelFunction={updateMainModelFunction}
          />
        </Col>
        <Col sm={6}>
          <EndpointResponseFieldTypeSelectInput
            model={endpointFieldModel}
            setModel={setEndpointFieldModel}
            fieldName={"type"}
            updateModelFunction={updateModelFunction}
            disabled={disabled}
          />
        </Col>
        {/*TODO: For future enhancement if customers ask for not logging response fields*/}
        {/*<Col sm={6}>*/}
        {/*  <EndpointResponseFieldIsSensitiveDataToggleInput*/}
        {/*    model={endpointFieldModel}*/}
        {/*    updateMainModelFunction={updateMainModelFunction}*/}
        {/*    index={index}*/}
        {/*    disabled={disabled}*/}
        {/*  />*/}
        {/*</Col>*/}
      </Row>
      <ButtonContainerBase className={"mt-2"}>
        <DeleteButton dataObject={endpointFieldModel} deleteRecord={deleteFieldFunction} />
      </ButtonContainerBase>
    </div>
  );
}

EndpointResponseBodyFieldInputRow.propTypes = {
  updateFieldFunction: PropTypes.func,
  deleteFieldFunction: PropTypes.func,
  disabled: PropTypes.bool,
  endpointBodyField: PropTypes.object,
  index: PropTypes.number,
};

export default EndpointResponseBodyFieldInputRow;