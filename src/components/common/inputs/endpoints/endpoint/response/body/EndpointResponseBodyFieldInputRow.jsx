import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {
  faCode,
} from "@fortawesome/pro-light-svg-icons";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {endpointRequestFieldMetadata} from "components/common/inputs/endpoints/endpoint/request/body/endpointRequestField.metadata";
import modelHelpers from "components/common/model/modelHelpers";
import EndpointResponseFieldTypeSelectInput
  from "components/common/inputs/endpoints/endpoint/response/body/EndpointResponseFieldTypeSelectInput";
import EndpointResponseFieldIsSensitiveDataToggleInput
  from "components/common/inputs/endpoints/endpoint/response/body/EndpointResponseFieldIsSensitiveDataToggleInput";
import InfoContainer from "components/common/containers/InfoContainer";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import DeleteButton from "components/common/buttons/delete/DeleteButton";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";

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
    updateFieldFunction({...endpointFieldModel?.getPersistData()});
  };
  
  if (endpointFieldModel == null) {
    return null;
  }

  return (
    <InfoContainer
      titleIcon={faCode}
      titleText={`Field: ${endpointFieldModel?.getData("fieldName")}`}
    >
      <div className={"mx-3 mb-3 mt-1"}>
        <Row>
          <Col sm={6}>
            <TextInputBase
              dataObject={endpointFieldModel}
              setDataObject={setEndpointFieldModel}
              fieldName={"fieldName"}
              setDataFunction={updateMainModelFunction}
              disabled={disabled}
            />
          </Col>
          <Col sm={6}>
            <EndpointResponseFieldTypeSelectInput
              model={endpointFieldModel}
              setModel={setEndpointFieldModel}
              fieldName={"type"}
              setDataFunction={updateMainModelFunction}
              disabled={disabled}
            />
          </Col>
          <Col sm={6}>
            <EndpointResponseFieldIsSensitiveDataToggleInput
              model={endpointFieldModel}
              updateMainModelFunction={updateMainModelFunction}
              index={index}
              disabled={disabled}
            />
          </Col>
        </Row>
        <ButtonContainerBase>
          <DeleteButton
            dataObject={endpointFieldModel}
            deleteRecord={deleteFieldFunction}
          />
        </ButtonContainerBase>
      </div>
    </InfoContainer>
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