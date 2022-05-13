import React, { useState } from "react";
import PropTypes from "prop-types";
import InputContainer from "components/common/inputs/InputContainer";
import { Form } from "react-bootstrap";
import TextInputBase from "../../../../../../../../common/inputs/text/TextInputBase";
import FieldContainer from "../../../../../../../../common/fields/FieldContainer";


function DynamicNameToggleInput({ dataObject, setDataObject, fieldName, disabled, pipelineId }) {
  const [field, setField] = useState(dataObject?.getFieldById(fieldName));

  const handleChange = () => {
    let newDataObject = dataObject;
    let sourceScriptFlag = !dataObject.getData(fieldName);
    newDataObject.setData("ecsServiceName", "");
    newDataObject.setData(fieldName, sourceScriptFlag);
    setDataObject({ ...newDataObject });
  };

  if (field == null) {
    return null;
  }

  const getExampleName = () => {
    if (
      !dataObject.getData("namePretext") ||
      (dataObject.getData("namePretext") && dataObject.getData("namePretext").length === 0)
    ) {
      return "Enter a prefix in order to view the sample format";
    }

    return (
      <label className="text-muted stepForm-data-display">
        {dataObject?.getData("namePretext")}-runCount
      </label>
    );
  };

  const getDynamicFields = () => {
    if (dataObject.getData("dynamicServiceName")) {
      return (
        <>
          <TextInputBase dataObject={dataObject} setDataObject={setDataObject} fieldName={"namePretext"} />
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
  };

  return (
    <InputContainer fieldName={fieldName}>
      <Form.Check
        type="switch"
        id={field.id}
        checked={!!dataObject.getData(fieldName)}
        disabled={disabled}
        label={field.label}
        onChange={() => handleChange()}
      />
      <small className="text-muted form-text">
        Generate ECS Service Names dynamically on user inputted prefix and Run Count.
      </small>
      {getDynamicFields()}
    </InputContainer>
  );
}

DynamicNameToggleInput.propTypes = {
  dataObject: PropTypes.object,
  fieldName: PropTypes.string,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  pipelineId: PropTypes.string,
};

export default DynamicNameToggleInput;
