import React, {useState} from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import modelHelpers from "components/common/model/modelHelpers";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import VanityButtonBase from "temp-library-components/button/VanityButtonBase";
import {faPlus} from "@fortawesome/pro-light-svg-icons";
import CustomParameterSelectInput from "components/common/list_of_values_input/parameters/CustomParameterSelectInput";
import InfoText from "components/common/inputs/info_text/InfoText";
import {hasStringValue} from "components/common/helpers/string-helpers";
import {
  pipelineStepParameterMetadata
} from "components/common/list_of_values_input/parameters/pipeline/pipelineStepParameter.metadata";

export default function DockerCliCommandLineInputParameterInputRow(
  {
    error,
    className,
    disabled,
    saveEnvironmentVariables,
    addEnvironmentParameterFunction,
    addGlobalCustomParameterFunction,
    commandLineStepModel,
  }) {
  const [commandLineInputParameterModel, setCommandLineInputParameterModel] = useState(modelHelpers.parseObjectIntoModel({}, pipelineStepParameterMetadata));

  const handleAddPropertyFunction = () => {
    let successfulAdd = false;
    const newParameter = commandLineInputParameterModel?.getPersistData();

      successfulAdd = saveEnvironmentVariables !== true
        ? addGlobalCustomParameterFunction(newParameter)
        : addEnvironmentParameterFunction(newParameter);

    if (successfulAdd === true) {
      commandLineInputParameterModel.resetData();
      setCommandLineInputParameterModel({...commandLineInputParameterModel});
    }
  };

  const hasDuplicateName = () => {
    const customParameters = commandLineStepModel?.getArrayData("customParameters");
    const environmentVariables = commandLineStepModel?.getArrayData("environmentVariables");
    const parameterName = commandLineInputParameterModel?.getData("parameterName");

    return saveEnvironmentVariables !== true
      ? customParameters.find((parameter) => parameter?.parameterName === parameterName) != null
      : environmentVariables.find((parameter) => parameter?.parameterName === parameterName) != null;
  };

  // TODO: Make separate input
  const setParameterFunction = (fieldName, selectedOption) => {
    commandLineInputParameterModel.setData("parameterId", selectedOption?._id);
    commandLineInputParameterModel.setData("parameterName", selectedOption?.name);
    setCommandLineInputParameterModel({...commandLineInputParameterModel});
  };

  const isValid = commandLineInputParameterModel?.checkCurrentValidity();
  const missingOutputKey = saveEnvironmentVariables === true && hasStringValue(commandLineInputParameterModel?.getData("outputKey")) !== true;
  const isDuplicate = hasDuplicateName();

  const getInputFields = () => {
        return (
          <>
            <Col xs={5}>
              <CustomParameterSelectInput
                model={commandLineInputParameterModel}
                fieldName={"parameterId"} 
                disabled={disabled}
                setDataFunction={setParameterFunction}
              />
            </Col>
            <Col xs={5}>
              <TextInputBase
                fieldName={"outputKey"}
                dataObject={commandLineInputParameterModel}
                setDataObject={setCommandLineInputParameterModel}
                disabled={disabled}
              />
            </Col>
          </>
        );
  };

  return (
    <div className={className}>
      <Row>
        {getInputFields()}
        <Col xs={12}>
          <div className={"w-100 d-flex"}>
            <VanityButtonBase
              className={"ml-auto"}
              variant={"success"}
              icon={faPlus}
              disabled={ isValid !== true || disabled === true || missingOutputKey === true || isDuplicate === true}
              onClickFunction={handleAddPropertyFunction}
              normalText={"Add Parameter"}
            />
          </div>
        </Col>
        <Col xs={12}>
          <InfoText
            errorMessage={error ? error : isDuplicate === true ? "You have already added this Parameter." : undefined}
          />
        </Col>
      </Row>
    </div>
  );
}

DockerCliCommandLineInputParameterInputRow.propTypes = {
  addGlobalCustomParameterFunction: PropTypes.func,
  addEnvironmentParameterFunction: PropTypes.func,
  commandLineStepModel: PropTypes.object,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  saveEnvironmentVariables: PropTypes.bool,
  error: PropTypes.any,
};