import React, {useState} from "react";
import PropTypes from "prop-types";
import {faBracketsCurly} from "@fortawesome/pro-light-svg-icons";
import InfoContainer from "components/common/containers/InfoContainer";
import CommandLineInputParameterInputRow
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/command_line/inputs/parameters/CommandLineInputParameterInputRow";
import InputContainer from "components/common/inputs/InputContainer";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import {hasStringValue} from "components/common/helpers/string-helpers";
import CommandLineInputParameterInputBaseHelpText
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/command_line/inputs/parameters/CommandLineInputParameterInputBaseHelpText";
import LocalInputParameterFields
  from "components/common/list_of_values_input/parameters/local/LocalInputParameterFields";
import EditableParameterMappingInlineFields
  from "components/common/list_of_values_input/parameters/mapping/EditableParameterMappingInlineFields";
import GlobalParameterFields from "components/common/list_of_values_input/parameters/global/GlobalParameterFields";

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
  const [error, setError] = useState(undefined);

  const getRightSideButtons = () => {
    return (
      <CenteredContentWrapper>
        <CommandLineInputParameterInputBaseHelpText
          showTerraformHelpText={allowTerraformParametersSync === true && isMongoDbId(model?.getData("terraformStepId"))}
        />
      </CenteredContentWrapper>
    );
  };

  const addEnvironmentParameterFunction = (newParameter) => {
    const newArray = [];
    const parsedUpdatedData = DataParsingHelper.parseArray(model?.getData(environmentVariablesFieldName), []);
    const field = model?.getFieldById(environmentVariablesFieldName);

    if (parsedUpdatedData.length > field.maxItems) {
      setError(`You have reached the maximum allowed number of Global Parameters. Please remove one to add another.`);
      return false;
    }

    if (parsedUpdatedData.find((parameter) => parameter?.parameterName === newParameter?.parameterName) != null) {
      setError(`You have already added ${newParameter?.parameterName}.`);
      return false;
    }

    newArray.push({
      parameterId: newParameter?.parameterId,
      parameterName: newParameter?.parameterName,
      outputKey: newParameter?.outputKey,
    });

    parsedUpdatedData.forEach((parameter) => {
      if (
        hasStringValue(parameter?.parameterName) === true
        && isMongoDbId(parameter?.parameterId) === true
        && hasStringValue(parameter?.outputKey) === true
      ) {
        newArray.push({
          parameterName: parameter?.parameterName,
          parameterId: parameter?.parameterId,
          outputKey: newParameter?.outputKey,
        });
      }
    });

    model.setData(environmentVariablesFieldName, newArray);
    setModel({...model});
    return true;
  };


  const addGlobalCustomParameterFunction = (newParameter) => {
    const newArray = [];
    const parsedUpdatedData = DataParsingHelper.parseArray(model?.getData(customParametersFieldName), []);
    const field = model?.getFieldById(customParametersFieldName);

    if (parsedUpdatedData.length > field.maxItems) {
      setError(`You have reached the maximum allowed number of Global Parameters. Please remove one to add another.`);
      return false;
    }

    if (parsedUpdatedData.find((parameter) => parameter?.parameterName === newParameter?.parameterName) != null) {
      setError(`You have already added ${newParameter?.parameterName}.`);
      return false;
    }

    newArray.push({
      parameterId: newParameter?.parameterId,
      parameterName: newParameter?.parameterName,
    });

    parsedUpdatedData.forEach((parameter) => {
      if (hasStringValue(parameter?.parameterName) === true && isMongoDbId(parameter?.parameterId) === true) {
        newArray.push({
          parameterName: parameter?.parameterName,
          parameterId: parameter?.parameterId,
        });
      }
    });

    model.setData(customParametersFieldName, newArray);
    setModel({...model});
    return true;
  };

  const addLocalParameterFunction = (newParameter) => {
    const newArray = [];
    const parsedUpdatedData = DataParsingHelper.parseArray(model?.getData(localParametersFieldName), []);
    const field = model?.getFieldById(localParametersFieldName);
    const newParameterName = DataParsingHelper.parseString(newParameter?.name, "");
    const newParameterValue = DataParsingHelper.parseString(newParameter?.value, "");

    if (hasStringValue(newParameterName) !== true) {
      setError(`A Local Parameter must have a name.`);
      return false;
    }

    if (parsedUpdatedData.length > field.maxItems) {
      setError(`You have reached the maximum allowed number of Local Input Parameters. Please remove one to add another.`);
      return false;
    }

    if (parsedUpdatedData.find((parameter) => parameter?.name === newParameterName) != null) {
      setError(`You have already added ${newParameterName}.`);
      return false;
    }

    parsedUpdatedData.push({
      name: newParameterName,
      value: newParameterValue,
    });

    parsedUpdatedData.forEach((parameter) => {
      const parsedParameterName = DataParsingHelper.parseString(parameter?.name, "");
      const parsedParameterValue = DataParsingHelper.parseString(parameter?.value, "");

      if (hasStringValue(parsedParameterName) === true) {
        newArray.push({
          name: parsedParameterName,
          value: parsedParameterValue,
        });
      }
    });

    model.setData(localParametersFieldName, newArray);
    setModel({...model});
    return true;
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
          <CommandLineInputParameterInputRow
            disabled={disabled}
            saveEnvironmentVariables={saveEnvironmentVariables === true}
            commandLineStepModel={model}
            plan={plan}
            error={error}
            addLocalParameterFunction={addLocalParameterFunction}
            addGlobalCustomParameterFunction={addGlobalCustomParameterFunction}
            addEnvironmentParameterFunction={addEnvironmentParameterFunction}
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
