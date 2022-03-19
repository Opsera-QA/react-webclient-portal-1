import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {
  faTimes,
} from "@fortawesome/pro-light-svg-icons";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import IconBase from "components/common/icons/IconBase";
import {endpointRequestFieldMetadata} from "components/common/inputs/endpoints/endpoint/request/body/endpointRequestField.metadata";
import modelHelpers from "components/common/model/modelHelpers";
import EndpointRequestFieldTypeStandaloneSelectInput
  from "components/common/inputs/endpoints/endpoint/request/body/EndpointRequestFieldTypeStandaloneSelectInput";
import StandaloneTextInputBase from "components/common/inputs/text/standalone/StandaloneTextInputBase";
import StandaloneBooleanToggleInput from "components/common/inputs/boolean/StandaloneBooleanToggleInput";
import EndpointRequestFieldIsRequiredToggleInput
  from "components/common/inputs/endpoints/endpoint/request/body/EndpointRequestFieldIsRequiredToggleInput";
import EndpointRequestFieldIsSensitiveDataToggleInput
  from "components/common/inputs/endpoints/endpoint/request/body/EndpointRequestFieldIsSensitiveDataToggleInput";

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
  };
  
  const getDeletePropertyButton = () => {
    if (disabled !== true) {
      return (
        <Button variant="link" onClick={deleteFieldFunction}>
          <span><IconBase className={"danger-red"} icon={faTimes}/></span>
        </Button>
      );
    }
  };

  if (endpointFieldModel == null) {
    return null;
  }

  return (
    <div className={"d-flex py-2"}>
      <Col sm={11}>
        <Row className={"pl-2"}>
          <Col sm={4} className={"pl-0 pr-1"}>
            <StandaloneTextInputBase
              model={endpointFieldModel}
              setDataFunction={(newValue) => updateMainModelFunction("fieldName", newValue)}
              value={endpointFieldModel?.getData("fieldName")}
              disabled={disabled}
            />
          </Col>
          <Col sm={4} className={"pl-0 pr-1"}>
            <EndpointRequestFieldTypeStandaloneSelectInput
              model={endpointFieldModel}
              updateMainModelFunction={updateMainModelFunction}
              disabled={disabled}
            />
          </Col>
          <Col sm={2} className={"pl-1 pr-0"}>
            <EndpointRequestFieldIsRequiredToggleInput
              model={endpointFieldModel}
              updateMainModelFunction={updateMainModelFunction}
              index={index}
              disabled={disabled}
            />
          </Col>
          <Col sm={2} className={"pl-1 pr-0 my-auto"}>
            <EndpointRequestFieldIsSensitiveDataToggleInput
              model={endpointFieldModel}
              updateMainModelFunction={updateMainModelFunction}
              index={index}
              disabled={disabled}
            />
          </Col>
        </Row>
      </Col>
      <Col sm={1} className={"px-0 ml-auto mr-auto delete-button"}>
        {getDeletePropertyButton()}
      </Col>
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