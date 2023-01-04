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

export default function CommandLineInputParameterInputRow(
  {
    addPropertyFunction,
    className,
    disabled,
    saveEnvironmentVariables,
  }) {
  const [commandLineInputParameterModel, setCommandLineInputParameterModel] = useState(modelHelpers.parseObjectIntoModel({}, commandLineInputParameterMetadata));

  const handleAddPropertyFunction = () => {
    const newParameter = {
      ...commandLineInputParameterModel?.getPersistData()
    };
    const successfulAdd = addPropertyFunction(newParameter);

    if (successfulAdd === true) {
      commandLineInputParameterModel.resetData();
      setCommandLineInputParameterModel({...commandLineInputParameterModel});
    }
  };

  const getInputFields = () => {
    if (commandLineInputParameterModel?.getData("type") === "global") {
      if (saveEnvironmentVariables === true) {
        return "Save environment variables";
      }

      return (
        "don't save environment variables"
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
      </Row>
    </div>
  );
}

CommandLineInputParameterInputRow.propTypes = {
  addPropertyFunction: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  saveEnvironmentVariables: PropTypes.bool,
};