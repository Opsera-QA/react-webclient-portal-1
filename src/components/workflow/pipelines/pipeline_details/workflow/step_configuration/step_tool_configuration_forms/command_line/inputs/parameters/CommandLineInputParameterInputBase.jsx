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
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import LocalInputParameterInlineField
  from "components/common/list_of_values_input/parameters/local/LocalInputParameterInlineField";
import LocalInputParameterHeaderField
  from "components/common/list_of_values_input/parameters/local/LocalInputParameterHeaderField";
import ParameterSelectListHeaderField
  from "components/common/list_of_values_input/parameters/legacy/ParameterSelectListHeaderField";
import ParameterSelectListInlineField
  from "components/common/list_of_values_input/parameters/legacy/ParameterSelectListInlineField";
import EditableParameterMappingHeaderField
  from "components/common/list_of_values_input/parameters/mapping/EditableParameterMappingHeaderField";
import EditableParameterMappingInlineField
  from "components/common/list_of_values_input/parameters/mapping/EditableParameterMappingInlineField";
import CommandLineInputParameterInputBaseHelpText
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/command_line/inputs/parameters/CommandLineInputParameterInputBaseHelpText";

// TODO: This needs to be majorly cleaned up.
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
        <CommandLineInputParameterInputBaseHelpText
          showTerraformHelpText={isMongoDbId(model?.getData("terraformStepId"))}
        />
      </CenteredContentWrapper>
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
    const parsedUpdatedData = DataParsingHelper.parseArray(model?.getData("environmentVariables"), []);
    const field = model?.getFieldById("environmentVariables");

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

    model.setData("environmentVariables", newArray);
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

    model.setData("customParameters", newArray);
    setModel({...model});
    return true;
  };

  const addLocalParameterFunction = (newParameter) => {
    const newArray = [];
    const parsedUpdatedData = DataParsingHelper.parseArray(model?.getData("stepParameters"), []);
    const field = model?.getFieldById("stepParameters");
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

    model.setData("stepParameters", newArray);
    setModel({...model});
    return true;
  };

  const deleteCustomParameter = (index) => {
    const currentData = model?.getArrayData("customParameters");
    currentData.splice(index, 1);
    model.setData("customParameters", currentData);
    setModel({...model});
  };

  const deleteEnvironmentParameter = (index) => {
    const currentData = model?.getArrayData("environmentVariables");
    currentData.splice(index, 1);
    model.setData("environmentVariables", currentData);
    setModel({...model});
  };

  const getCustomParameterFields = () => {
    const customParameters = DataParsingHelper.parseArray(model?.getData("customParameters"), []);

    if (customParameters.length > 0) {
      return (
        <div className={"mb-3"}>
          <div className={"d-flex justify-content-between"}>
            <div>
              <H5FieldSubHeader
                subheaderText={"Global Parameters"}
              />
            </div>
            <div className={"d-flex"}>
              <CommandLineStepSaveEnvironmentVariablesBooleanToggle
                setModel={setModel}
                model={model}
                disabled={disabled}
                className={"my-auto"}
              />
              {getTerraformStepParameterSyncButton()}
            </div>
          </div>
          <div
            className={"content-container-border"}
            style={{
              overflowY: "hidden",
            }}
          >
            <ParameterSelectListHeaderField/>

            {customParameters.map((parameter, index) => {
              return (
                <ParameterSelectListInlineField
                  disabled={disabled}
                  parameter={parameter}
                  deleteParameterFunction={deleteCustomParameter}
                  index={index}
                  key={index}
                />
              );
            })}
          </div>
          <hr/>
        </div>
      );
    }

    const environmentVariables = DataParsingHelper.parseArray(model?.getData("environmentVariables"), []);

    if (environmentVariables.length > 0) {
      return (
        <div className={"mb-3"}>
          <div className={"d-flex justify-content-between"}>
            <div>
              <H5FieldSubHeader
                subheaderText={"Global Parameters"}
              />
            </div>
            <div className={"d-flex"}>
              <CommandLineStepSaveEnvironmentVariablesBooleanToggle
                setModel={setModel}
                model={model}
                disabled={disabled}
                className={"my-auto mr-2"}
              />
              {getTerraformStepParameterSyncButton()}
            </div>
          </div>
          <div
            className={"content-container-border"}
            style={{
              overflowY: "hidden",
            }}
          >
            <EditableParameterMappingHeaderField/>
            {environmentVariables.map((parameter, index) => {
              return (
                <EditableParameterMappingInlineField
                  disabled={disabled}
                  parameter={parameter}
                  deleteParameterFunction={deleteEnvironmentParameter}
                  index={index}
                  key={index}
                />
              );
            })}
          </div>
          <hr/>
        </div>
      );
    }

    return (
      <div className={"mb-3"}>
        <div>
          <H5FieldSubHeader
            subheaderText={"Global Parameters"}
          />
        </div>
        <div
          className={"content-container-border mb-3"}
          style={{
            overflowY: "hidden",
          }}
        >
          <CenteredContentWrapper minHeight={"50px"}>
            <div>No Global Parameters have been added yet</div>
          </CenteredContentWrapper>
        </div>
        <hr/>
      </div>
    );
  };

  const deleteLocalParameter = (index) => {
    const currentData = model?.getArrayData("stepParameters");
    currentData.splice(index, 1);
    model.setData("stepParameters", currentData);
    setModel({...model});
  };

  const getLocalParameterFields = () => {
    const stepParameters = DataParsingHelper.parseArray(model?.getData("stepParameters"), []);

    if (stepParameters.length > 0) {
      return (
        <div className={"mb-1"}>
          <H5FieldSubHeader
            subheaderText={"Local Parameters"}
          />
          <div
            className={"content-container-border mb-3"}
            style={{
              overflowY: "hidden",
            }}
          >
            <LocalInputParameterHeaderField/>
            {stepParameters.map((parameter, index) => {
              return (
                <LocalInputParameterInlineField
                  disabled={disabled}
                  parameter={parameter}
                  deleteParameterFunction={deleteLocalParameter}
                  index={index}
                  key={index}
                />
              );
            })}
          </div>
          <hr/>
        </div>
      );
    }

    return (
      <div className={"mb-3"}>
        <div>
          <H5FieldSubHeader
            subheaderText={"Local Parameters"}
          />
        </div>
        <div
          className={"content-container-border mb-3"}
          style={{
            overflowY: "hidden",
          }}
        >
          <CenteredContentWrapper minHeight={"50px"}>
            <div>No Local Parameters have been added yet</div>
          </CenteredContentWrapper>
        </div>
        <hr/>
      </div>
    );
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
            saveEnvironmentVariables={model.getData("saveEnvironmentVariables") === true}
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

CommandLineInputParameterInputBase.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  plan: PropTypes.array,
};
