import React, { useState } from "react";
import PropTypes from "prop-types";
import InputContainer from "components/common/inputs/InputContainer";
import { Form } from "react-bootstrap";
import TextInputBase from "../../../../../../../../common/inputs/text/TextInputBase";
import FieldContainer from "../../../../../../../../common/fields/FieldContainer";
import AzureFunctionsStepServiceNameTextInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/azure_functions/inputs/AzureFunctionsServiceNameTextInput";

function AzureFunctionsStepDynamicNameToggleInput({ model, setModel, fieldName, disabled }) {
  const [field, setField] = useState(model?.getFieldById(fieldName));

  const handleChange = () => {
    let newDataObject = model;
    let sourceScriptFlag = !model.getData(fieldName);
    newDataObject.setData("ecsServiceName", "");
    newDataObject.setData(fieldName, sourceScriptFlag);
    setModel({ ...newDataObject });
  };

  if (field == null) {
    return null;
  }

  const getExampleName = () => {
    if (
      !model.getData("namePretext") ||
      (model.getData("namePretext") && model.getData("namePretext").length === 0)
    ) {
      return "Enter a prefix in order to view the sample format";
    }

    return (
      <label className="text-muted stepForm-data-display">
        {model?.getData("namePretext")}[runCount]
      </label>
    );
  };

  const getDynamicFields = () => {
    if (model.getData("dynamicServiceName")) {
      return (
        <>
          <TextInputBase dataObject={model} setDataObject={setModel} fieldName={"namePretext"} />
          <FieldContainer>
            <div className="w-100 d-flex">
              <label className="mb-0 mr-2">
                <span>Service Name Example:</span>
              </label>
              <span>{getExampleName()}</span>
            </div>
          </FieldContainer>
        </>
      );
    }
    else {
      return (
        <AzureFunctionsStepServiceNameTextInput
          azureFunctionsModel={model}
          setAzureFunctionsModel={setModel}
        />
      );
    }
  };

  return (
    <InputContainer fieldName={fieldName}>
      <Form.Check
        type="switch"
        id={field.id}
        checked={!!model.getData(fieldName)}
        disabled={disabled}
        label={field.label}
        onChange={() => handleChange()}
      />
      <small className="text-muted form-text">
        Generate Azure Function Names dynamically on user inputted prefix and Run Count.
      </small>
      {getDynamicFields()}
    </InputContainer>
  );
}

AzureFunctionsStepDynamicNameToggleInput.propTypes = {
  model: PropTypes.object,
  fieldName: PropTypes.string,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default AzureFunctionsStepDynamicNameToggleInput;
