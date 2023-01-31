import React, {useState} from "react";
import PropTypes from "prop-types";
import {faBracketsCurly} from "@fortawesome/pro-light-svg-icons";
import InfoContainer from "components/common/containers/InfoContainer";
import InputContainer from "components/common/inputs/InputContainer";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import CommandLineInputParameterInputBaseHelpText
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/command_line/inputs/parameters/CommandLineInputParameterInputBaseHelpText";
import LocalInputParameterFields
  from "components/common/list_of_values_input/parameters/local/LocalInputParameterFields";
import EditableParameterMappingInlineFields
  from "components/common/list_of_values_input/parameters/mapping/EditableParameterMappingInlineFields";
import GlobalParameterFields from "components/common/list_of_values_input/parameters/global/GlobalParameterFields";
import PipelineStepInputParameterInputRow
  from "components/common/list_of_values_input/parameters/pipeline/PipelineStepInputParameterInputRow";

export default function PipelineStepParameterInputBase(
  {
    model,
    setModel,
    customParametersFieldName,
    environmentVariablesFieldName,
    localParametersFieldName,
    allowLocalParameters,
    showSaveEnvironmentVariablesToggle,
    allowTerraformParametersSync,
    allowParameterMapping,
    saveEnvironmentVariables,
    disabled,
    plan,
  }) {
  const getRightSideButtons = () => {
    return (
      <CenteredContentWrapper>
        <CommandLineInputParameterInputBaseHelpText
          showTerraformHelpText={allowTerraformParametersSync === true && isMongoDbId(model?.getData("terraformStepId"))}
        />
      </CenteredContentWrapper>
    );
  };

  const getCustomParameterFields = () => {
    if (saveEnvironmentVariables === true && allowParameterMapping === true) {
      return (
        <EditableParameterMappingInlineFields
          fieldName={environmentVariablesFieldName}
          model={model}
          setModel={setModel}
          disabled={disabled}
          showSaveEnvironmentVariablesToggle={showSaveEnvironmentVariablesToggle}
          customParametersFieldName={customParametersFieldName}
        />
      );
    }

    return (
      <GlobalParameterFields
        model={model}
        setModel={setModel}
        fieldName={customParametersFieldName}
        disabled={disabled}
        plan={plan}
        allowTerraformParametersSync={allowTerraformParametersSync}
        showSaveEnvironmentVariablesToggle={showSaveEnvironmentVariablesToggle}
        environmentVariablesFieldName={environmentVariablesFieldName}
      />
    );
  };

  const getLocalParameterFields = () => {
    if (allowLocalParameters === true) {
      return (
        <LocalInputParameterFields
          model={model}
          setModel={setModel}
          fieldName={localParametersFieldName}
        />
      );
    }
  };

  return (
    <InputContainer>
      <InfoContainer
        titleText={"Input Parameters"}
        titleIcon={faBracketsCurly}
        titleRightSideButton={getRightSideButtons()}
      >
        <div className={"m-3"}>
          {getCustomParameterFields()}
          {getLocalParameterFields()}
          <PipelineStepInputParameterInputRow
            localParametersFieldName={localParametersFieldName}
            customParametersFieldName={customParametersFieldName}
            environmentVariablesFieldName={environmentVariablesFieldName}
            pipelineStepModel={model}
            setPipelineStepModel={setModel}
            disabled={disabled}
            saveEnvironmentVariables={saveEnvironmentVariables}
            plan={plan}
            allowLocalParameters={allowLocalParameters}
          />
        </div>
      </InfoContainer>
    </InputContainer>
  );
}

PipelineStepParameterInputBase.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  localParametersFieldName: PropTypes.string,
  customParametersFieldName: PropTypes.string,
  environmentVariablesFieldName: PropTypes.string,
  allowLocalParameters: PropTypes.bool,
  allowTerraformParametersSync: PropTypes.bool,
  allowParameterMapping: PropTypes.bool,
  saveEnvironmentVariables: PropTypes.bool,
  plan: PropTypes.array,
  showSaveEnvironmentVariablesToggle: PropTypes.bool,
};

PipelineStepParameterInputBase.defaultProps = {
  localParametersFieldName: "stepParameters",
  customParametersFieldName: "customParameters",
  environmentVariablesFieldName: "environmentVariables",
};
