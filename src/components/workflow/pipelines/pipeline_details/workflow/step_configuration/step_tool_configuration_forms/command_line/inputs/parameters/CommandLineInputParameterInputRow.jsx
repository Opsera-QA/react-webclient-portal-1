import React, {useState} from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import modelHelpers from "components/common/model/modelHelpers";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import VanityButtonBase from "temp-library-components/button/VanityButtonBase";
import {faPlus} from "@fortawesome/pro-light-svg-icons";
import {
  commandLineInputParameterMetadata
} from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/command_line/inputs/parameters/commandLineInputParameter.metadata";
import CommandLineInputParameterTypeSelectInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/command_line/inputs/parameters/CommandLineInputParameterTypeSelectInput";
import CustomParameterSelectInput from "components/common/list_of_values_input/parameters/CustomParameterSelectInput";
import InfoText from "components/common/inputs/info_text/InfoText";

export default function CommandLineInputParameterInputRow(
  {
    addPropertyFunction,
    error,
    className,
    disabled,
    saveEnvironmentVariables,
    addLocalParameterFunction,
  }) {
  const [commandLineInputParameterModel, setCommandLineInputParameterModel] = useState(modelHelpers.parseObjectIntoModel({}, commandLineInputParameterMetadata));

  const handleAddPropertyFunction = () => {
    let successfulAdd = false;

    if (commandLineInputParameterModel?.getData("type") === "local") {
      successfulAdd = addLocalParameterFunction(commandLineInputParameterModel?.getPersistData());
    }
    // else {
    // }

    if (successfulAdd === true) {
      commandLineInputParameterModel.resetData();
      setCommandLineInputParameterModel({...commandLineInputParameterModel});
    }
  };

  // TODO: Make separate input
  const setParameterFunction = (fieldName, selectedOption) => {
    commandLineInputParameterModel.setData("parameterId", selectedOption?._id);
    commandLineInputParameterModel.setData("parameterName", selectedOption?.name);
    setCommandLineInputParameterModel({...commandLineInputParameterModel});
  };

  const getInputFields = () => {
    if (commandLineInputParameterModel?.getData("type") === "global") {
      if (saveEnvironmentVariables === true) {
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
      }

      return (
        <Col xs={10}>
          <CustomParameterSelectInput
            model={commandLineInputParameterModel}
            fieldName={"parameterId"}
            disabled={disabled}
            setDataFunction={setParameterFunction}
          />
        </Col>
      );
    }

    return (
      <>
        <Col xs={5}>
          <TextInputBase
            fieldName={"name"}
            dataObject={commandLineInputParameterModel}
            setDataObject={setCommandLineInputParameterModel}
            disabled={disabled}
          />
        </Col>
        <Col xs={5}>
          <TextInputBase
            fieldName={"value"}
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
        <Col xs={2}>
          <CommandLineInputParameterTypeSelectInput
            model={commandLineInputParameterModel}
            setModel={setCommandLineInputParameterModel}
            disabled={disabled}
          />
        </Col>
        {getInputFields()}
        <Col xs={12}>
          <div className={"w-100 d-flex"}>
            <VanityButtonBase
              className={"ml-auto"}
              variant={"success"}
              icon={faPlus}
              disabled={commandLineInputParameterModel?.checkCurrentValidity() !== true || disabled}
              onClickFunction={handleAddPropertyFunction}
              normalText={"Add Parameter"}
            />
          </div>
        </Col>
        <Col xs={12}>
          <InfoText
            errorMessage={error}
          />
        </Col>
      </Row>
    </div>
  );
}

CommandLineInputParameterInputRow.propTypes = {
  addPropertyFunction: PropTypes.func,
  addLocalParameterFunction: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  saveEnvironmentVariables: PropTypes.bool,
  error: PropTypes.any,
};