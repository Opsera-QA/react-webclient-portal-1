import React, {useState} from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import modelHelpers from "components/common/model/modelHelpers";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import CustomParameterSelectInput from "components/common/list_of_values_input/parameters/CustomParameterSelectInput";
import InfoText from "components/common/inputs/info_text/InfoText";
import {hasStringValue} from "components/common/helpers/string-helpers";
import TextAreaInputBase from "components/common/inputs/text/text_area/TextAreaInputBase";
import {
  pipelineStepParameterMetadata
} from "components/common/list_of_values_input/parameters/pipeline/pipelineStepParameter.metadata";
import PipelineStepAddLocalParameterButton
  from "components/common/list_of_values_input/parameters/pipeline/PipelineStepAddLocalParameterButton";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import PipelineStepAddCustomParameterButton
  from "components/common/list_of_values_input/parameters/pipeline/PipelineStepAddCustomParameterButton";
import PipelineStepInputParameterTypeSelectInput
  from "components/common/list_of_values_input/parameters/pipeline/PipelineStepInputParameterTypeSelectInput";
import PipelineStepAddEnvironmentVariableParameterButton
  from "components/common/list_of_values_input/parameters/pipeline/PipelineStepAddEnvironmentVariableParameterButton";
import PipelineStepParameterInputRowInputs
  from "components/common/list_of_values_input/parameters/pipeline/PipelineStepParameterInputRowInputs";

export default function PipelineStepInputParameterInputRow(
  {
    className,
    disabled,
    saveEnvironmentVariables,
    customParametersFieldName,
    localParametersFieldName,
    environmentVariablesFieldName,
    pipelineStepModel,
    setPipelineStepModel,
    allowLocalParameters,
  }) {
  const [error, setError] = useState(undefined);
  const [parameterModel, setParameterModel] = useState(modelHelpers.parseObjectIntoModel({}, pipelineStepParameterMetadata));

  // TODO: Make separate inpu

  const getAddButton = () => {
    const type = parameterModel?.getData("type");

    if (type === "local") {
      return (
        <PipelineStepAddLocalParameterButton
          model={pipelineStepModel}
          setModel={setPipelineStepModel}
          parameterModel={parameterModel}
          setParameterModel={setParameterModel}
          disabled={disabled}
          localParametersFieldName={localParametersFieldName}
        />
      );
    }
    
    if (saveEnvironmentVariables === true) {
      return (
        <PipelineStepAddEnvironmentVariableParameterButton
          environmentVariablesFieldName={environmentVariablesFieldName}
          parameterModel={parameterModel}
          setParameterModel={setParameterModel}
          model={pipelineStepModel}
          setModel={setPipelineStepModel}
          disabled={disabled}
          setError={setError}
        />
      );
    }

    return (
      <PipelineStepAddCustomParameterButton
        parameterModel={parameterModel}
        setParameterModel={setParameterModel}
        model={pipelineStepModel}
        setModel={setPipelineStepModel}
        disabled={disabled}
        customParametersFieldName={customParametersFieldName}
      />
    );
  };

  const getTypeSelectInput = () => {
    if (allowLocalParameters === true) {
      return (
        <Col xs={2}>
          <PipelineStepInputParameterTypeSelectInput
            model={parameterModel}
            setModel={setParameterModel}
            disabled={disabled}
          />
        </Col>
      );
    }
  };

  const hasDuplicateName = () => {
    const type = parameterModel?.getData("type");

    if (type === "local") {
      const parameterName = parameterModel?.getData("name");
      const stepParameters = pipelineStepModel?.getArrayData(localParametersFieldName);
      return stepParameters.find((parameter) => parameter?.name === parameterName) != null;
    } else if (type === "global") {
      const customParameters = pipelineStepModel?.getArrayData(customParametersFieldName);
      const environmentVariables = pipelineStepModel?.getArrayData(environmentVariablesFieldName);
      const parameterName = parameterModel?.getData("parameterName");

      return saveEnvironmentVariables !== true
        ? customParameters.find((parameter) => parameter?.parameterName === parameterName) != null
        : environmentVariables.find((parameter) => parameter?.parameterName === parameterName) != null;
    }
  };

  const isDuplicate = hasDuplicateName();

  return (
    <div className={className}>
      <Row>
        {getTypeSelectInput()}
        <PipelineStepParameterInputRowInputs
          disabled={disabled}
          parameterModel={parameterModel}
          setParameterModel={setParameterModel}
          allowLocalParameters={allowLocalParameters}
          isDuplicate={isDuplicate}
          saveEnvironmentVariables={saveEnvironmentVariables}
        />
        <Col xs={12}>
          <ButtonContainerBase>
            {getAddButton()}
          </ButtonContainerBase>
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

PipelineStepInputParameterInputRow.propTypes = {
  localParametersFieldName: PropTypes.string,
  customParametersFieldName: PropTypes.string,
  environmentVariablesFieldName: PropTypes.string,
  pipelineStepModel: PropTypes.object,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  saveEnvironmentVariables: PropTypes.bool,
  error: PropTypes.any,
  setPipelineStepModel: PropTypes.func,
  allowLocalParameters: PropTypes.bool,
};