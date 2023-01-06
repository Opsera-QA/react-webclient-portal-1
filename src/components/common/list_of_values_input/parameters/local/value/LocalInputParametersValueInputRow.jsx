import React, {useState} from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import modelHelpers from "components/common/model/modelHelpers";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import localParameterMetadata from "@opsera/definitions/constants/registry/local_parameter/localParameter.metadata";
import TextAreaInputBase from "components/common/inputs/text/text_area/TextAreaInputBase";

export default function LocalInputParametersValueInputRow(
  {
    className,
    localParameter,
    disabled,
    setDataFunction,
    index,
  }) {
  const [localInputVariableModel, setLocalInputVariableModel] = useState(modelHelpers.parseObjectIntoModel(localParameter, localParameterMetadata));

  const handleValueSetFunction = (fieldName, value) => {
    localInputVariableModel?.setData(fieldName, value);
    setLocalInputVariableModel({...localInputVariableModel});

    if (localInputVariableModel?.isFieldValid("value") === true) {
      setDataFunction(index, localInputVariableModel?.getData("value"));
    }
  };

  return (
    <div className={className}>
      <Row>
        <Col xs={6}>
          <TextInputBase
            fieldName={"name"}
            dataObject={localInputVariableModel}
            setDataObject={setLocalInputVariableModel}
            disabled={true}
          />
        </Col>
        <Col xs={6}>
          <TextAreaInputBase
            fieldName={"value"}
            model={localInputVariableModel}
            setModel={setLocalInputVariableModel}
            rowCount={1}
            disabled={disabled}
            useInfoContainer={false}
            setDataFunction={handleValueSetFunction}
          />
        </Col>
      </Row>
    </div>
  );
}

LocalInputParametersValueInputRow.propTypes = {
  className: PropTypes.string,
  localParameter: PropTypes.object,
  disabled: PropTypes.bool,
  setDataFunction: PropTypes.func,
  index: PropTypes.number,
};