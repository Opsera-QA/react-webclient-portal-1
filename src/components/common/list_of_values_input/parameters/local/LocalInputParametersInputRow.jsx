import React, {useState} from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import modelHelpers from "components/common/model/modelHelpers";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import VanityButtonBase from "temp-library-components/button/VanityButtonBase";
import {faPlus} from "@fortawesome/pro-light-svg-icons";
import localParameterMetadata from "@opsera/definitions/constants/registry/local_parameter/localParameter.metadata";

export default function LocalInputParametersInputRow(
  {
    addPropertyFunction,
    className,
    disabled,
    localInputParameters,
  }) {
  const [localInputVariableModel, setLocalInputVariableModel] = useState(modelHelpers.parseObjectIntoModel({}, localParameterMetadata));
  const hasDuplicateName = localInputParameters?.includes(localInputVariableModel?.getData("name"));

  const handleAddPropertyFunction = () => {
    const newParameter = {
      ...localInputVariableModel?.getPersistData()
    };
    const successfulAdd = addPropertyFunction(newParameter);

    if (successfulAdd === true) {
      localInputVariableModel.resetData();
      setLocalInputVariableModel({...localInputVariableModel});
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
            disabled={disabled}
            error={hasDuplicateName === true ? "Local Parameter Names must be unique." : undefined}
          />
        </Col>
        <Col xs={6}>
          <TextInputBase
            fieldName={"value"}
            dataObject={localInputVariableModel}
            setDataObject={setLocalInputVariableModel}
            disabled={disabled}
          />
        </Col>
        <Col xs={12}>
          <div className={"w-100 d-flex"}>
            <VanityButtonBase
              className={"ml-auto"}
              variant={"success"}
              icon={faPlus}
              disabled={localInputVariableModel?.checkCurrentValidity() !== true || hasDuplicateName === true || disabled}
              onClickFunction={handleAddPropertyFunction}
              normalText={"Add Parameter"}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
}

LocalInputParametersInputRow.propTypes = {
  addPropertyFunction: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  localInputParameters: PropTypes.array,
};