import React from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import CustomParameterSelectInput from "components/common/list_of_values_input/parameters/CustomParameterSelectInput";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import TextAreaInputBase from "components/common/inputs/text/text_area/TextAreaInputBase";

export default function PipelineStepParameterInputRowInputs(
  {
    disabled,
    parameterModel,
    setParameterModel,
    saveEnvironmentVariables,
    allowLocalParameters,
    isDuplicate,
  }) {
  const setParameterFunction = (fieldName, selectedOption) => {
    parameterModel.setData("parameterId", selectedOption?._id);
    parameterModel.setData("parameterName", selectedOption?.name);
    setParameterModel({...parameterModel});
  };

  if (parameterModel?.getData("type") === "global") {
    if (saveEnvironmentVariables === true) {
      return (
        <>
          <Col xs={allowLocalParameters === true ? 5 : 6}>
            <CustomParameterSelectInput
              model={parameterModel}
              fieldName={"parameterId"}
              disabled={disabled}
              setDataFunction={setParameterFunction}
            />
          </Col>
          <Col xs={allowLocalParameters === true ? 5 : 6}>
            <TextInputBase
              fieldName={"outputKey"}
              dataObject={parameterModel}
              setDataObject={setParameterModel}
              disabled={disabled}
            />
          </Col>
        </>
      );
    }

    return (
      <Col xs={allowLocalParameters === true ? 10 : 12}>
        <CustomParameterSelectInput
          model={parameterModel}
          fieldName={"parameterId"}
          disabled={disabled}
          setDataFunction={setParameterFunction}
        />
      </Col>
    );
  }

  return (
    <>
      <Col xs={allowLocalParameters === true ? 5 : 6}>
        <TextInputBase
          fieldName={"name"}
          dataObject={parameterModel}
          setDataObject={setParameterModel}
          disabled={disabled}
          error={isDuplicate === true ? "Local Parameter Names must be unique." : undefined}
        />
      </Col>
      <Col xs={allowLocalParameters === true ? 5 : 6}>
        <TextAreaInputBase
          fieldName={"value"}
          model={parameterModel}
          setModel={setParameterModel}
          rowCount={1}
          disabled={disabled}
          useInfoContainer={false}
        />
      </Col>
    </>
  );
}

PipelineStepParameterInputRowInputs.propTypes = {
  disabled: PropTypes.bool,
  parameterModel: PropTypes.object,
  setParameterModel: PropTypes.func,
  isDuplicate: PropTypes.bool,
  saveEnvironmentVariables: PropTypes.bool,
  allowLocalParameters: PropTypes.bool,
};
