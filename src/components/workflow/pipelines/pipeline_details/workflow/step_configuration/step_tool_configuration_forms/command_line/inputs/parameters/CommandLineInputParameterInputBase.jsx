import React from "react";
import PropTypes from "prop-types";
import {faBracketsCurly, faInfoCircle} from "@fortawesome/pro-light-svg-icons";
import InfoContainer from "components/common/containers/InfoContainer";
import CommandLineInputParameterInputRow
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/command_line/inputs/parameters/CommandLineInputParameterInputRow";
import CommandLineStepSaveEnvironmentVariablesBooleanToggle
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/command_line/inputs/parameters/CommandLineStepSaveEnvironmentVariablesBooleanToggle";
import InputContainer from "components/common/inputs/InputContainer";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";
import OverlayIconBase from "components/common/icons/OverlayIconBase";

export default function CommandLineInputParameterInputBase(
  {
    model,
    setModel,
    disabled,
    plan,
  }) {
  const getRightSideButtons = () => {
    return (
      <CenteredContentWrapper>
        <CommandLineStepSaveEnvironmentVariablesBooleanToggle
          setModel={setModel}
          model={model}
          disabled={disabled}
          className={"my-auto"}
        />
        {getHelpText()}
      </CenteredContentWrapper>
    );
  };

  const getHelpText = () => {
    return (
      <OverlayIconBase
        overlayTitle={"ParameterSelection"}
        icon={faInfoCircle}
        className={"fa-pull-right pointer pr-2 mt-1 pl-0"}
        overlayWidth={"500px"}
        overlayPlacement={"left"}
        overlayBody={
          <div className="text-muted mb-2">
            This functionality helps users use Opsera Parameters that are defined under the Parameters tab in Tool
            Registry. In order to use any of these parameters in the step - enter them in the commands with the
            following syntax: <strong>{"${parameter_name}"}</strong>, where the parameter_name is the one of the
            names derived from this list of available parameters.
            <br/>
            <br/>
            You must select all parameters that you pass in the commands in the parameter selection view as well in
            order for the details to be fetched during runtime.
            <br/>
            <br/>
            <strong>Pipelines with Terraform Steps: </strong> If the <strong>Use Terraform Output</strong> checkbox has
            been selected, the available parameters will
            appear in the Parameter selection option with <strong>Terraform Output</strong> as the Parameter Origin.
            They use the same syntax mentioned above in order to be used in the commands.
          </div>
        }
      />
    );
  };

  // const getFields = () => {
  // };

  return (
    <InputContainer>
      <InfoContainer
        titleText={"Input Parameters"}
        titleIcon={faBracketsCurly}
        titleRightSideButton={getRightSideButtons()}
      >
        <div className={"m-3"}>
          <div>Show items inside</div>
          <hr/>
          <CommandLineInputParameterInputRow
            disabled={disabled}
            saveEnvironmentVariables={model.getData("saveEnvironmentVariables") === true}
            plan={plan}
          />
        </div>
      </InfoContainer>
    </InputContainer>
  );
}

CommandLineInputParameterInputBase.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  plan: PropTypes.array,
};
