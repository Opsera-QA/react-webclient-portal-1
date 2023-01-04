import React, {useState} from "react";
import PropTypes from "prop-types";
import {faBracketsCurly, faInfoCircle, faSync} from "@fortawesome/pro-light-svg-icons";
import InfoContainer from "components/common/containers/InfoContainer";
import CommandLineInputParameterInputRow
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/command_line/inputs/parameters/CommandLineInputParameterInputRow";
import CommandLineStepSaveEnvironmentVariablesBooleanToggle
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/command_line/inputs/parameters/CommandLineStepSaveEnvironmentVariablesBooleanToggle";
import InputContainer from "components/common/inputs/InputContainer";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";
import OverlayIconBase from "components/common/icons/OverlayIconBase";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import {hasStringValue} from "components/common/helpers/string-helpers";

export default function CommandLineInputParameterInputBase(
  {
    model,
    setModel,
    disabled,
    plan,
  }) {
  const [error, setError] = useState(undefined);

  const getRightSideButtons = () => {
    return (
      <CenteredContentWrapper>
        <CommandLineStepSaveEnvironmentVariablesBooleanToggle
          setModel={setModel}
          model={model}
          disabled={disabled}
          className={"my-auto"}
        />
        {getTerraformStepParameterSyncButton()}
        {getHelpText()}
      </CenteredContentWrapper>
    );
  };

  const getDynamicHelpText = () => {
    if (isMongoDbId(model?.getData("terraformStepId")) === true && model.getData("saveEnvironmentVariables") !== true) {
      return (
        <div className={"mb-2"}>
          <div><strong>Pipelines with Terraform Steps</strong></div>
          If the <strong>Use Terraform Output</strong> checkbox has
          been selected, the available parameters will
          appear in the Parameter selection option with <strong>Terraform Output</strong> as the Parameter Origin.
          They use the same syntax mentioned above in order to be used in the commands.
        </div>
      );
    }
  };

  const getHelpText = () => {
    return (
      <OverlayIconBase
        overlayTitle={"ParameterSelection"}
        icon={faInfoCircle}
        className={"ml-2 my-auto"}
        overlayWidth={"500px"}
        overlayPlacement={"left"}
        overlayBody={
          <div className="text-muted mb-2">
            <div className={"mb-2"}>
              This functionality helps users use Opsera Parameters that are defined under the Parameters tab in Tool
              Registry. In order to use any of these parameters in the step - enter them in the commands with the
              following syntax: <strong>{"${parameter_name}"}</strong>, where the parameter_name is the one of the
              names derived from this list of available parameters.
            </div>
            <div className={"mb-2"}>
              You must select all parameters that you pass in the commands in the parameter selection view as well in
              order for the details to be fetched during runtime.
            </div>
            {getDynamicHelpText()}
          </div>
        }
      />
    );
  };

  const syncTerraformStepCustomParameters = () => {
    const terraformStep = plan.find((step) => step._id === model?.getData("terraformStepId"));
    const terraformStepCustomParameters = DataParsingHelper.parseNestedArray(terraformStep, "tool.configuration.customParameters", []);
    const currentParameters = model?.getArrayData("customParameters");
    const filtered = [];

    for (let index in currentParameters) {

      if (!currentParameters[index]?.outputKey) {
        filtered.push(currentParameters[index]);
      }
    }

    model.setData("customParameters", [...terraformStepCustomParameters, ...filtered]);
    setModel({...model});
  };

  const getTerraformStepParameterSyncButton = () => {
    if (isMongoDbId(model?.getData("terraformStepId")) === true && model.getData("saveEnvironmentVariables") !== true) {
      return (
        <OverlayIconBase
          overlayBody={"Sync Terraform Output Parameters"}
          icon={faSync}
          className={"ml-2 my-auto"}
          onClickFunction={() => syncTerraformStepCustomParameters()}
        />
      );
    }
  };

  const addEnvironmentParameterFunction = (newParameter) => {
    const newArray = [];
    const parsedUpdatedData = DataParsingHelper.parseArray(model?.getData("customParameters"), []);
    const field = model?.getFieldById("customParameters");

    if (parsedUpdatedData.length > field.maxItems) {
      setError(`You have reached the maximum allowed number of Global Parameters. Please remove one to add another.`);
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

    model.setData("customParameters", newArray);
    setModel({...model});
    return true;
  };


  const addGlobalCustomParameterFunction = (newParameter) => {
    const newArray = [];
    const parsedUpdatedData = DataParsingHelper.parseArray(model?.getData("customParameters"), []);
    const field = model?.getFieldById("customParameters");

    if (parsedUpdatedData.length > field.maxItems) {
      setError(`You have reached the maximum allowed number of Global Parameters. Please remove one to add another.`);
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

    model.setData("customParameters", newArray);
    setModel({...model});
    return true;
  };

  const addLocalParameterFunction = (newParameter) => {
    const newArray = [];
    const parsedUpdatedData = DataParsingHelper.parseArray(model?.getData("stepParameters"), []);
    const field = model?.getFieldById("stepParameters");

    if (parsedUpdatedData.length > field.maxItems) {
      setError(`You have reached the maximum allowed number of Local Input Parameters. Please remove one to add another.`);
      return false;
    }

    parsedUpdatedData.push({
      name: newParameter?.name,
      value: newParameter?.value,
    });

    parsedUpdatedData.forEach((parameter) => {
      if (hasStringValue(parameter?.name) === true && hasStringValue(parameter?.value) === true) {
        newArray.push({
          name: parameter?.name,
          value: parameter?.value,
        });
      }
    });

    model.setData("stepParameters", newArray);
    setModel({...model});
    return true;
  };

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

CommandLineInputParameterInputBase.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  plan: PropTypes.array,
};
