import React, {useState} from "react";
import PropTypes from "prop-types";
import {faBracketsCurly, faInfoCircle, faSync} from "@fortawesome/pro-light-svg-icons";
import InfoContainer from "components/common/containers/InfoContainer";
import InputContainer from "components/common/inputs/InputContainer";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import {hasStringValue} from "components/common/helpers/string-helpers";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import DockerCliOutputVariableCommandLineInputParameterInputRow from "./DockerCliOutputVariableCommandLineInputParameterInputRow";
import DockerCliParameterSelectListHeaderField from "../parameters/DockerCliParameterSelectListHeaderField";
import DockerCliParameterSelectListInlineField from "../parameters/DockerCliParameterSelectListInlineField";
import PipelineStepSaveEnvironmentVariablesBooleanToggle
  from "components/common/list_of_values_input/parameters/pipeline/PipelineStepSaveEnvironmentVariablesBooleanToggle";
import PipelineStepParameterInputBaseHelpText
  from "components/common/list_of_values_input/parameters/pipeline/PipelineStepParameterInputBaseHelpText";

export default function DockerCliOutputVariableCommandLineInputParameterInput(
  {
    model,
    setModel,
    disabled,
    plan,
    fieldName,
    subheaderText
  }) {
  const [error, setError] = useState(undefined);

  const getRightSideButtons = () => {
    return (
      <CenteredContentWrapper>
        <PipelineStepParameterInputBaseHelpText />
      </CenteredContentWrapper>
    );
  };
  

  const addGlobalCustomParameterFunction = (newParameter) => {
    const newArray = [];
    const parsedUpdatedData = DataParsingHelper.parseArray(model?.getData(fieldName), []);
    const field = model?.getFieldById(fieldName);

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
      outputKey: newParameter?.outputKey
    });

    parsedUpdatedData.forEach((parameter) => {
      if (hasStringValue(parameter?.parameterName) === true && isMongoDbId(parameter?.parameterId) === true) {
        newArray.push({
          parameterName: parameter?.parameterName,
          parameterId: parameter?.parameterId,
          outputKey: newParameter?.outputKey
        });
      }
    });

    model.setData(fieldName, newArray);
    setModel({...model});
    return true;
  };

  const deleteCustomParameter = (index) => {
    const currentData = model?.getArrayData("environmentVariables");
    currentData.splice(index, 1);
    model.setData(fieldName, currentData);
    setModel({...model});
  };

  const getCustomParameterFields = () => {
    const customParameters = DataParsingHelper.parseArray(model?.getData(fieldName), []);

    if (customParameters.length > 0) {
      return (
        <div className={"mb-3"}>
          <div className={"d-flex justify-content-between"}>
            <div>
              <H5FieldSubHeader
                subheaderText={subheaderText ? subheaderText : "Global Parameters"}
              />
            </div>
            <div className={"d-flex"}>
              <PipelineStepSaveEnvironmentVariablesBooleanToggle
                setModel={setModel}
                model={model}
                disabled={disabled}
                className={"my-auto"}
              />
            </div>
          </div>
          <div
            className={"content-container-border"}
            style={{
              overflowY: "hidden",
            }}
          >
            <DockerCliParameterSelectListHeaderField/>

            {customParameters.map((parameter, index) => {
              return (
                <DockerCliParameterSelectListInlineField
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

    return (
      <div className={"mb-3"}>
        <div>
          <H5FieldSubHeader
            subheaderText={subheaderText ? subheaderText : "Global Parameters"}
          />
        </div>
        <div
          className={"content-container-border mb-3"}
          style={{
            overflowY: "hidden",
          }}
        >
          <CenteredContentWrapper minHeight={"50px"}>
            <div>No parameters have been added yet</div>
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
          <DockerCliOutputVariableCommandLineInputParameterInputRow
            disabled={disabled}
            saveEnvironmentVariables={model.getData("saveEnvironmentVariables") === true}
            commandLineStepModel={model}
            plan={plan}
            error={error}
            addGlobalCustomParameterFunction={addGlobalCustomParameterFunction}
          />
        </div>
      </InfoContainer>
    </InputContainer>
  );
}

DockerCliOutputVariableCommandLineInputParameterInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  plan: PropTypes.array,
  fieldName: PropTypes.string,
  subheaderText: PropTypes.string
};
