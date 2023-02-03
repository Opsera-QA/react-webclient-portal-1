import React, {useState} from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import modelHelpers from "components/common/model/modelHelpers";
import VanityButtonBase from "temp-library-components/button/VanityButtonBase";
import {faPlus} from "@fortawesome/pro-light-svg-icons";
import CustomParameterSelectInput from "components/common/list_of_values_input/parameters/CustomParameterSelectInput";
import InfoText from "components/common/inputs/info_text/InfoText";
import {hasStringValue} from "components/common/helpers/string-helpers";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import {
  pipelineStepParameterMetadata
} from "components/common/list_of_values_input/parameters/pipeline/pipelineStepParameter.metadata";

const DOCKER_CLI_OUTPUT_VARIABLE_SELECT_OPTIONS = [
{text: "Docker Registry Name", value: "docker_registry_name"},
{text: "Docker Tag Name", value:"docker_tag_name"},
{text: "Docker Name", value:"docker_name"},
];


export default function DockerCliOutputVariableCommandLineInputParameterInputRow(
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

  const hasDuplicateValue = () => {
    const outputVariables = commandLineStepModel?.getArrayData("outputCustomParameters");
    const environmentVariables = commandLineStepModel?.getArrayData("environmentVariables");
    const outputKey = commandLineInputParameterModel?.getData("outputKey");

    return saveEnvironmentVariables !== true
      ? outputVariables.find((parameter) => parameter?.outputKey === outputKey) != null
      : environmentVariables.find((parameter) => parameter?.outputKey === outputKey) != null;
  };
  

  // TODO: Make separate input
  const setParameterFunction = (fieldName, selectedOption) => {
    commandLineInputParameterModel.setData("parameterId", selectedOption?._id);
    commandLineInputParameterModel.setData("parameterName", selectedOption?.name);
    setCommandLineInputParameterModel({...commandLineInputParameterModel});
  };

  const isValid = commandLineInputParameterModel?.checkCurrentValidity();
  const missingOutputKey = saveEnvironmentVariables === true && hasStringValue(commandLineInputParameterModel?.getData("outputKey")) !== true;
  const isDuplicateName = hasDuplicateName();
  const isDuplicateValue = hasDuplicateValue();

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
              <SelectInputBase
                fieldName={"outputKey"}
                dataObject={commandLineInputParameterModel}
                setDataObject={setCommandLineInputParameterModel}
                disabled={disabled}
                selectOptions={DOCKER_CLI_OUTPUT_VARIABLE_SELECT_OPTIONS}
                textField="text"
                valueField="value"
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
              disabled={ isValid !== true || disabled === true || missingOutputKey === true || isDuplicateName === true || isDuplicateValue === true}
              onClickFunction={handleAddPropertyFunction}
              normalText={"Add Parameter"}
            />
          </div>
        </Col>
        <Col xs={12}>
          <InfoText
            errorMessage={error ? error : isDuplicateName === true || isDuplicateValue === true? "You have already added this Parameter." : undefined}
          />
        </Col>
      </Row>
    </div>
  );
}

DockerCliOutputVariableCommandLineInputParameterInputRow.propTypes = {
  addGlobalCustomParameterFunction: PropTypes.func,
  addEnvironmentParameterFunction: PropTypes.func,
  commandLineStepModel: PropTypes.object,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  saveEnvironmentVariables: PropTypes.bool,
  error: PropTypes.any,
};